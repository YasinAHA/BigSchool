import { EventBus } from '../../application/ports/event-bus';

export class NoopEventBus implements EventBus {
  publish(): void {
    // do nothing
  }
}
