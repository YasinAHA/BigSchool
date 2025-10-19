// src/application/use-cases/AddItemToOrderUseCase.ts
import { Resukt, ok, fail } from "@shared/result"
import { AppError, ValidationError, NotFoundError, NotFoundError, ConflictError } from "@application/errors"
import { OrderRepository } from "@application/ports/OrderRepository"
import { PricingService } from "@application/ports/PricingService"
import { EventBus } from "@application/ports/EventBus"
import { Clock } from "@aplication/ports/Clock"
import { AddItemToOrderInput, AddItemToOrderOutput } from "@application/dto/AddItemToOrderDTO"
import { Order } from "@domain/entities/Order"
import { SKU } from "@domain/value-objects/SKU"
import { Quantity } from "@domain/value-objects/Quantity"
import { Price } from "@domain/value-objects/Price"
import { CurrencyMismatch } from "@domain/errors/CurrencyMismatch" // De Price?? 
import { AppContext } from "@application/context"

// variación

export function makeAddItemToOrder(ctx : AppContext) {
    return {
        async execute(input: AddItemToOrderInput): Promise<Result<AddItemToOrderOutput, AppError>> {
            const useCase = new AddItemToOrder(
                ctx.orders,
                ctx.pricing,
                ctx.events,
                ctx.clock
            )
            return useCase.execute(input)
        }
    }
}

export class AddItemToOrder {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly pricingService: PricingService,
        private readonly eventBus: EventBus,
        private readonly clock: Clock
    ) {}

    async execute(input: AddItemToOrderInput): Promise<Result<AddItemToOrderOutput, AppError>> {
        const v = this.validate(input)
        if (!v.ok) return v
        
        const order = await this.orderRepository.findById(input.orderId)
        if (!order) {
            const err: NotFoundError = { type: "not_found", resource: "Order", id: input.orderId }
            return fail(new NotFoundError(err))
        }

        const sku = new SKU.create(input.sku)
        const quantity = new Quantity.create(input.quantity)
        const price = await this.pricingService.getCurrentPrice(sku, input.currency)

        if (!price) {
            const err: ValidationError = { type: "validation", message: "Unknown SKU", details: { sku: input.sku } }
            return fail(err)
        }

        try {
            order.addItem(sku, price, quantity) // reglas del dominio
            // (opcional) sellar timmestamp en eventos con Clock si los eventos lo permiten
            await this.orderRepository.save(order) // persistencia tras el éxito
            const ev = order.pullDomainEvents()
            await this.eventBus.publish(ev) // publicar eventos / notificar cambios
            const total = order.total()
            return ok({ orderId: order.id, total: { amount: total.amount, currency: total.currency } })
        } catch (e) {
            if (e instanceof CurrencyMismatch) {
                const err: ConflictError = { type: "conflict", message: "Currency mismatch in order" }
                return fail(err)
            }

            // Otros DomainError → ValidationError
            const err: ValidationError = { type: "validation", message: (e as Error).message }
            return fail(err)
        }
    }

    private validate(input: AddItemToOrderInput): Result<void, ValidationError> {
        const errors: Record<string, string> = {}

        if (!input.orderId || input.orderId.trim() === "") errors.orderId = "Order ID is required"

        // require non-empty and 3-30 chars of letters, digits or hyphen
        if (!input.sku || !/^[A-Za-z0-9-]{3,30}$/.test(input.sku)) errors.sku = "Invalid SKU format"

        if (!Number.isInteger(input.qty) || input.qty <= 0) errors.qty = "Quantity must be a positive integer"

        if (!["USD", "EUR"].includes(input.currency)) errors.currency = "Unsupported currency"

        if (Object.keys(errors).length > 0) {
            const err: ValidationError = { type: "validation", message: "Invalid input", details: errors }
            return fail(err)
        }

        return ok(input)
    }
}
