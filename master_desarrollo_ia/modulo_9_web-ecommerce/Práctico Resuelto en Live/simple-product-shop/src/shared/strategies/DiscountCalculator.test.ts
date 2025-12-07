import { describe, it, expect } from 'vitest'
import { DiscountCalculator } from './DiscountCalculator'
import { BulkDiscountStrategy } from './BulkDiscountStrategy'
import { OrderDiscountStrategy } from './OrderDiscountStrategy'
import type { CartItem } from '@/shared/types'

const createCartItem = (id: number, price: number, quantity: number): CartItem => ({
  product: {
    id,
    name: `Product ${id}`,
    price,
    image: 'test.jpg',
    description: 'Test description',
  },
  quantity,
})

describe('DiscountCalculator', () => {
  const calculator = new DiscountCalculator([
    new BulkDiscountStrategy(),
    new OrderDiscountStrategy(),
  ])

  it('returns 0 for empty cart', () => {
    expect(calculator.calculate([], 0)).toBe(0)
  })

  it('applies only bulk discount when subtotal is below order threshold', () => {
    // 5 items at $10 = $50 subtotal (below $100)
    // Bulk: 10% of $50 = $5
    const items = [createCartItem(1, 10, 5)]

    expect(calculator.calculate(items, 50)).toBe(5)
  })

  it('applies only order discount when no items qualify for bulk', () => {
    // 2 items at $60 = $120 subtotal (above $100, but qty < 5)
    // Order: 15% of $120 = $18
    const items = [createCartItem(1, 60, 2)]

    expect(calculator.calculate(items, 120)).toBe(18)
  })

  it('applies both discounts sequentially when both apply', () => {
    // 5 items at $25 = $125 subtotal
    // Bulk: 10% of $125 = $12.50 → remaining: $112.50
    // Order: 15% of $112.50 = $16.875
    // Total discount: $12.50 + $16.875 = $29.375
    const items = [createCartItem(1, 25, 5)]

    expect(calculator.calculate(items, 125)).toBeCloseTo(29.375)
  })

  it('getBreakdown returns details of each applied discount', () => {
    const items = [createCartItem(1, 25, 5)]
    const breakdown = calculator.getBreakdown(items, 125)

    expect(breakdown).toHaveLength(2)
    expect(breakdown[0].name).toBe('Bulk Discount')
    expect(breakdown[0].amount).toBeCloseTo(12.5)
    expect(breakdown[1].name).toBe('Order Discount')
    expect(breakdown[1].amount).toBeCloseTo(16.875)
  })

  it('getBreakdown returns empty array when no discounts apply', () => {
    // 2 items at $10 = $20 (below order threshold, qty < 5)
    const items = [createCartItem(1, 10, 2)]
    const breakdown = calculator.getBreakdown(items, 20)

    expect(breakdown).toHaveLength(0)
  })
})
