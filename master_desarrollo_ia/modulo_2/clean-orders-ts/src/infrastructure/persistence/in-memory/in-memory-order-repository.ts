import { Order } from '../../../../domain/entities/order';

export class InMemoryOrderRepository {
  private map = new Map<string, Order>();

  async save(order: Order) {
    this.map.set(order.id, order);
  }

  async findById(id: string) {
    return this.map.get(id) ?? null;
  }
}
