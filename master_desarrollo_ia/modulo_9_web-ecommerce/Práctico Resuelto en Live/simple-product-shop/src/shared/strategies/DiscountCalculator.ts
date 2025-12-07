import type { CartItem } from '@/shared/types'
import type { DiscountStrategy } from './DiscountStrategy'

interface DiscountBreakdown {
  name: string
  amount: number
}

export class DiscountCalculator {
  private strategies: DiscountStrategy[]

  constructor(strategies: DiscountStrategy[]) {
    this.strategies = strategies
  }

  calculate(items: CartItem[], subtotal: number): number {
    if (items.length === 0) return 0

    let totalDiscount = 0
    let remainingSubtotal = subtotal

    for (const strategy of this.strategies) {
      if (strategy.isApplicable(items, remainingSubtotal)) {
        const discount = strategy.calculate(items, remainingSubtotal)
        totalDiscount += discount
        remainingSubtotal -= discount
      }
    }

    return totalDiscount
  }

  getBreakdown(items: CartItem[], subtotal: number): DiscountBreakdown[] {
    const breakdown: DiscountBreakdown[] = []
    let remainingSubtotal = subtotal

    for (const strategy of this.strategies) {
      if (strategy.isApplicable(items, remainingSubtotal)) {
        const amount = strategy.calculate(items, remainingSubtotal)
        breakdown.push({ name: strategy.name, amount })
        remainingSubtotal -= amount
      }
    }

    return breakdown
  }
}
