import { AddItemToOrder } from '../use-cases/add-item-to-order.js'
import { CreateOrder } from '../use-cases/create-order.js'
import { Logger } from './logger.js'

export interface ServerDependencies {
    createOrderUseCase: CreateOrder
    addItemToOrderUseCase: AddItemToOrder
    logger: Logger
}