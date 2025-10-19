import { FastifyRequest, FastifyReply } from 'fastify'
import { createOrder } from "@composition/createOrder" // inyectado ya compuesto

export const OrderController = {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { orderId, customerId } = request.body as any
        const out = await createOrder.execute({ orderId, customerId })
        reply.code(201).send(out)
    }
}