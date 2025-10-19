import { InMemoryOrderRerpository } from "@infrastructure/persistence/in-memory/InMemoryOrderRepository";
import { CreateOrder } from "@application/use-cases/CreateOrderUseCase";

const orderRepository = new InMemoryOrderRerpository();
export const createOrder = new CreateOrder(orderRepository);
// export other composed use-cases here as needed
// e.g., export const getOrder = new GetOrder(orderRepository);