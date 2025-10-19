// src/domain/entities/Order.ts

import { Price } = require('../value-objects/Price');
import { SKU } from '../value-objects/SKU'
import { Quantity } from '../value-objects/Quantity'


type OrderItem = Readonly<{ sku: SKU; unit: Price; qty: Quantity }>

export class Order {
    private readonly items: OrderItem[] = []
    private readonly domainEvents: DomainEvent[] = []
    constructor(readonly id: OrderId, readonly customerId: CustomerId) { }

    static create(id: OrderId, customerId: CustomerId): Order {
        const order = new Order(id, customerId)
        order.record(new OrderCreated(id, customerId))
        return order
    }

    addItem(sku: SKU, unit: Price, qty: Quantity): void {
        if (this.items.length > 0) {
           const currency = this.items[0].unit.currency
              if (unit.currency !== currency) {
                throw new CurrencyMismatch()
              }
        }
        this.items.push(Object.freeze({ sku, unit, qty }))
        this.record(new OrderItemAdded({ orderId: this.id, sku:sku.value, qty:qty.value, unit:unit.amount}))
    }

    total(): Price {
        if (this.items.length === 0) { // convención, o lanzar si procede
            return Price.create(0, 'EUR') // default currency 
        }
        const currency = this.items[0].unit.currency
        return this.items.reduce((acc, item) => acc.add(item.unit.multiply(item.qty.value)), Price.create(0, currency))
    }

    pullDomainEvents(): DomainEvent[] {
        const events = [...this.domainEvents]
        // this.domainEvents.length = 0
        (this as any).domainEvents = [] // vacia (truco controlado)
        return events
    }

    private record(event: DomainEvent): void { this.domainEvents.push(event) }

}
