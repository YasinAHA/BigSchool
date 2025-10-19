import fastify from 'fastify';
import { makeOrderController } from '@infrastructure/http/controllers/OrderControllerFactory';
import { AppContainer } from '@composition/container';

export function buildServer(container: AppContainer) {
    const app = fastify();

    // Registrar controladores
    const orderController = makeOrderController(container.useCasses.addItemToOrder, container.useCases.createOrder)
    app.post("/orders", orderController.create)
    app.post("/orders/:orderId/items", orderController.addIem)


    return app;
}