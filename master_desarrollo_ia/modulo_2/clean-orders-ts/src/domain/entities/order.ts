import { Money } from '../value-objects/money.ts';
import { OrderItem } from '../value-objects/order-item.ts';

export type OrderId = string;

export class Order {
  constructor(
    public id: OrderId,
    public customerId: string,
    public items: OrderItem[] = [],
    public total: Money = new Money(0, 'USD')
  ) {}

  addItem(item: OrderItem) {
    this.items.push(item);
    this.recalculateTotal();
  }

  private recalculateTotal() {
    const sum = this.items.reduce((acc, i) => acc + i.subtotal().amount, 0);
    this.total = new Money(sum, this.total.currency);
  }
}
