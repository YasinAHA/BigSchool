// src/application/context.ts
import type { OrderRepository } from "./ports/OrderRepository";
import type { PricingService } from "./ports/PricingService";
import type { EventBus } from "./ports/EventBus";
import { Clock } from "./ports/Clock";

export type AppContext = {
    orders: OrderRepository;
    pricing: PricingService;
    events: EventBus;
    clock: Clock;
}

/* export interface AppContext {
    orders: OrderRepository;
    pricing: PricingService;
    events: EventBus;
    clock: Clock;
}

export function createAppContext(
    orders: OrderRepository,
    pricing: PricingService,
    events: EventBus
): AppContext {
    return {
        orders,
        pricing,
        events,
    };
}

export type AppContextType = ReturnType<typeof createAppContext>; */