import { eventBus } from './event-bus';
import type { OrderCreatedEvent } from './events/order-created.event';

eventBus.on('order.created', (event: OrderCreatedEvent) => {
  console.log(`Processing payment for order ${event.orderId}...`);
});
