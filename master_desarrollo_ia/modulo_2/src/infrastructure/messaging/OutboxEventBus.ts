// src/infrastructure/messaging/OutboxEventBus.ts
import { EventBus } from "@application/ports/EventBus"
import { DomainEvent } from "@domain/events/"
import { randomUUID } from "crypto"

type Queryable = {
    query: (
        q: string,
        params: any[]
    ) => Promise<unknown>
}

export class OutboxEventBus implements EventBus {
    constructor(private readonly db: Queryable) {}

    async publish(events: DomainEvent[]): Promise<void> {
        const insertEventQuery = `
            INSERT INTO outbox_events (id, type, payload, occurred_at, published_at)
            VALUES ($1, $2, $3, $4, NULL)
        `

        for (const event of events) {
            const id = randomUUID()
            const type = event.constructor.name
            const payload = JSON.stringify(event)
            const occurredAt = event.occurredAt.toISOString()

            await this.db.query(insertEventQuery, [
                id,
                type,
                payload,
                occurredAt
            ])
        }
    }
}