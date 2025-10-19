import { Money } from './money.js';
import { Quantity } from './quantity.js';

export class OrderItem {
  constructor(
    public sku: string,
    public quantity: Quantity,
    public unitPrice: Money
  ) {}

  subtotal() {
    return new Money(this.unitPrice.amount * this.quantity.value, this.unitPrice.currency);
  }
}
