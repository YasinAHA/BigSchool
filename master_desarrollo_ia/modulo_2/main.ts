// main.ts
import { buildContainer } from '@composition/buildContainer';
import { buildServer } from '@infrastructure/http/server';

async function main() {
    const container = buildContainer();
    const app = buildServer(container); // inyectamos el container

    const port = Number(container.cfg.PORT);
    const address = await app.listen({ port })
    container.ports?.events && container.cfg.USE_IN_MEMORY_DB === false && console.log('Event bus connected to the database. (Outbox ready)')
    console.log(`Server running at http://${address.hostname}:${address.port}/`)

    const shutdown = async (signal: string) => {
        container.logger.info(`Received ${signal}. Shutting down server...`);
        await app.close();
        if (container.pool) await container.pool.end();
        process.exit(0);
    }

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

}

main().catch((error) => {
    console.error('Failed to start application:', error);
    process.exit(1);
});