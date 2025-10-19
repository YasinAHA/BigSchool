import fastify from 'fastify';
import { OrderController } from '@infrastructure/http/OrdersController';

export async function buildServer () {
    const app = fastify();

    app.post('/orders', OrderController.create);
    app.delete('/orders/:id', OrderController.delete); // faltante implementar
    // otras rutas...
    return app;
}