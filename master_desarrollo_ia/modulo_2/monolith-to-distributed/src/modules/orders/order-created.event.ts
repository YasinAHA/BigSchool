// src/modules/orders/order-created.event.ts
export interface OrderCreatedEvent {
  orderId: string;
  userId: string;
  total: number;
}