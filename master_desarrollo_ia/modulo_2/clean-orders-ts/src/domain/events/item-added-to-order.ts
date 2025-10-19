import { DomainEvent } from './domain-event.js';

export interface ItemAddedToOrder extends DomainEvent {
  readonly type: 'ItemAddedToOrder';
  readonly orderId: string;
  readonly sku: string;
  readonly quantity: number;
}

export function createItemAddedToOrderEvent(payload: {
  orderId: string;
  sku: string;
  quantity: number;
}): ItemAddedToOrder {
  return {
    type: 'ItemAddedToOrder',
    occuredAt: new Date(),
    ...payload,
  };
}
