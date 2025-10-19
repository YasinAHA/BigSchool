// src/domain/value-objects/Price.ts
import { Currency } from './Currency'

// Value object representing a price with amount and currency
// TODO: implement custom Error/exceptions for invalid operations
export class Price {
    private constructor(readonly amount: number, readonly currency: Currency) { }

    static create(amount: number, currency: Currency): Price {
        if (!Number.isFinite(amount) || amount < 0) throw new Error('Invalid amount')
        const rounded = Math.round(amount * 100) / 100
        return new Price(rounded, currency)
    }
    add(other: Price): Price {
        if (this.currency !== other.currency) {
            throw new Error('Cannot add prices with different currencies')
        }
        return Price.create(this.amount + other.amount, this.currency)
    }

    multiply(qty: number): Price {
        if (!Number.isFinite(qty) || qty < 0) throw new Error('Invalid quantity')
        return Price.create(this.amount * qty, this.currency)
    }

    equals(other: Price): boolean {
        return this.amount === other.amount && this.currency === other.currency
    }
}