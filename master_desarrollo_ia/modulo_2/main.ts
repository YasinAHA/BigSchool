import { buildServer } from '@infrastructure/http/server';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
buildServer().then(app => app.listen({ port: PORT }))