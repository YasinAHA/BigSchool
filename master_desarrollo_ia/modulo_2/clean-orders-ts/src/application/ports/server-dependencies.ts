import { Clock } from './clock.ts';
import { EventBus } from './event-bus.ts';
import { OrderRepository } from './order-repository.ts';
import { PricingService } from './pricing-service.ts';

export type ServerDependencies = {
  clock: Clock;
  eventBus: EventBus;
  orderRepository: OrderRepository;
  pricingService: PricingService;
};
