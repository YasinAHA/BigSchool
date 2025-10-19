// src/application/ports/EventBus.ts
import { DomainEvent } from "@domain/events/"
export interface EventBus {
    publish(events: DomainEvent[]): Promise<void>
}

