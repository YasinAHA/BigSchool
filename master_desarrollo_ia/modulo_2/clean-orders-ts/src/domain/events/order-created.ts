import { DomainEvent } from './domain-event.js';

export interface OrderCreated extends DomainEvent {
  readonly type: 'OrderCreated';
  readonly orderId: string;
  readonly customerId: string;
}

export function createOrderCreatedEvent(orderId: string, customerId: string): OrderCreated {
  return {
    type: 'OrderCreated',
    occuredAt: new Date(),
    orderId,
    customerId,
  };
}
