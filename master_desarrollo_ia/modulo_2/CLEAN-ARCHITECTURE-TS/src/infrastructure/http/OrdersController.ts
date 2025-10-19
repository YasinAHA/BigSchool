// src/infrastructure/http/OrdersController.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import { createOrder } from "@composition/createOrder" // inyectado ya compuesto
import { AddItemToOrder } from "@application/use-cases/AddItemToOrderUseCase"
import { AppError } from "@application/errors"

export const OrderController = {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { orderId, customerId } = request.body as any
        const out = await createOrder.execute({ orderId, customerId })
        reply.code(201).send(out)
    }
}

export const makeOrdersController = (uc: AddItemToOrder) => ({
    addItem: async (request: FastifyRequest, reply: FastifyReply) => {
        const { orderId, item } = request.body as any
        try {
            const output = await uc.execute({ orderId, item })
            reply.code(200).send(output)
        } catch (error) {
            if (error instanceof AppError) {
                reply.code(400).send({ error: (error as Error).message })
            } else {
                reply.code(500).send({ error: 'Internal Server Error' })
            }
        }
    }
})

function mapAppErrorToHttp(e: AppError) {
    switch (e.type) {
        case 'NOT_FOUND':
            return { statusCode: 404, body: { error: e } }
        case 'INVALID_ARGUMENT':
            return { statusCode: 400, body: { error: e } }
        default:
            return { statusCode: 500, body: { error: 'Internal Server Error' } }
    }
}