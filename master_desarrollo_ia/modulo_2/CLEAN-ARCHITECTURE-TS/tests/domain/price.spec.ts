// tests/domain/order.spec.ts
import { Order, OrderId, CustomerId } from "../../src/domain/entities/Order"
import { Price } from "../../src/domain/value-objects/Price"
import { Quantity } from "../../src/domain/value-objects/Quantity"
import { SKU } from "../../src/domain/value-objects/SKU"

it("acumula total con misma moneda y emite eventos", () => {
  const o = Order.create(OrderId("o-1"), CustomerId("c-1"))
  o.addItem(SKU.create("abc-1"), Price.create(10, "EUR"), Quantity.create(2))
  o.addItem(SKU.create("abc-2"), Price.create(5, "EUR"), Quantity.create(1))
  
  expect(o.total().amount).toBe(25)
  
  const ev = o.pullDomainEvents()
  expect(ev.some(e => e.type === "order.created")).toBe(true)
  expect(ev.some(e => e.type === "order.item_added")).toBe(true)
})
