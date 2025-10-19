export interface DomainEvent {
  readonly occuredAt: Date;
  readonly type: string;
}
