import { Currency } from './currency.ts';

export class Money {
  constructor(public amount: number, public currency: Currency) {}

  add(other: Money) {
    if (other.currency !== this.currency) throw new Error('Currency mismatch');
    return new Money(this.amount + other.amount, this.currency);
  }
}
