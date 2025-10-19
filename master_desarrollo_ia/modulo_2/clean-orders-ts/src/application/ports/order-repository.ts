import { Order } from '../../domain/entities/order.ts';

export interface OrderRepository {
  save(order: Order): Promise<void> | void;
  findById(id: string): Promise<Order | null> | Order | null;
}
