import { loadConfig } from "./config";
import { InMemoryOrderRerpository } from "@infrastructure/persistence/in-memory/InMemoryOrderRepository";
import { PostgresOrderRepository } from "@infrastructure/persistence/postgres/PostgresOrderRepository";
import { HttpPricingService } from "@infrastructure/http/HttpPricingService";
import { OutboxEventBus } from "@infrastructure/messaging/OutboxEventBus";
import { AddItemToOrder } from "@application/use-cases/AddItemToOrderUseCase";
import { PinoLogger } from "@infrastructure/observability/PinoLogger";
import { Pool } from "@infrastructure/persistence/postgres/pg";

export function buildContainer() {
    const cfg = loadConfig();
    const logger = new PinoLogger();

    const pool =
        cfg.USE_IN_MEMORY_DB === true
            ? null
            : new Pool({ connectionString: cfg.DATABASE_URL });

    // Cambio aquí para in-memory o Postgres
    const orders =
        cfg.USE_IN_MEMORY_DB
            ? new InMemoryOrderRerpository()
            : new PostgresOrderRepository(pool);

    const pricing = new HttpPricingService(cfg.PRICING_BASE_URL);
    const events =
        cfg.USE_IN_MEMORY_DB === true
            ? { publish: async (event: any) => { /* no-op */ } }
            : new OutboxEventBus(pool);
    const clock = { now: () => new Date() }

    // Casos de uso
    const createOrder = createOrder(orders, events)
    const addItemToOrder = new AddItemToOrder(orders, pricing, events, { bow: () => new Date() });
    return {
        cfg, logger, pool,
        ports: { orders, pricing, events, clock },
        useCases: { createOrder, addItemToOrder }
    }
}

export type AppContainer = ReturnType<typeof buildContainer>

// Instancia única del contenedor
// export const container = buildContainer();
