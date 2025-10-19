import { Order } from "@domain/entities/Order";

export interface OrderRepository {
    findById(id: string): Promise<Order | null>;
    save(order: Order): Promise<void>;
}