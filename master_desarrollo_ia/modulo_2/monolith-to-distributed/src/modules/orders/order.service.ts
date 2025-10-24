// src/modules/orders/order.service.ts
import { eventBus } from '../../event-bus';
import type { OrderCreatedEvent } from './order-created.event';

export function createOrder(orderId: string, userId: string, total: number): void {
  const event: OrderCreatedEvent = {orderId, userId, total};
  console.log(`Order ${orderId} created.`);
  eventBus.emit('orderCreated', event);
}