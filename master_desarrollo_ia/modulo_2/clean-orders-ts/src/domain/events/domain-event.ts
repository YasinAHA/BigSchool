// src/domain/events/domain-event.ts
export abstract class DomainEvent {
  readonly occurredOn: Date
  readonly aggregateId: string

  constructor(aggregateId: string) {
    this.aggregateId = aggregateId
    this.occurredOn = new Date()
  }
}