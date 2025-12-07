import { describe, it, expect } from 'vitest'
import { BulkDiscountStrategy } from './BulkDiscountStrategy'
import { BULK_DISCOUNT } from '@/shared/constants/businessRules'
import type { CartItem } from '@/shared/types'

const createCartItem = (price: number, quantity: number): CartItem => ({
  product: {
    id: 1,
    name: 'Test Product',
    price,
    image: 'test.jpg',
    description: 'Test description',
  },
  quantity,
})

describe('BulkDiscountStrategy', () => {
  const strategy = new BulkDiscountStrategy()

  it('has the correct name', () => {
    expect(strategy.name).toBe('Bulk Discount')
  })

  it('is not applicable when no items have minimum quantity', () => {
    const items = [
      createCartItem(10, BULK_DISCOUNT.MIN_QUANTITY - 1),
      createCartItem(20, 2),
    ]

    expect(strategy.isApplicable(items, 100)).toBe(false)
  })

  it('is applicable when at least one item has minimum quantity', () => {
    const items = [
      createCartItem(10, BULK_DISCOUNT.MIN_QUANTITY),
      createCartItem(20, 2),
    ]

    expect(strategy.isApplicable(items, 100)).toBe(true)
  })

  it('calculates 10% discount for qualifying items', () => {
    const items = [createCartItem(10, BULK_DISCOUNT.MIN_QUANTITY)]
    // 10 * 5 = 50, 10% of 50 = 5

    expect(strategy.calculate(items, 50)).toBe(5)
  })

  it('only discounts items that qualify', () => {
    const items = [
      createCartItem(10, 5),  // qualifies: 50 * 10% = 5
      createCartItem(20, 2),  // does not qualify: 0
      createCartItem(5, 10),  // qualifies: 50 * 10% = 5
    ]

    expect(strategy.calculate(items, 140)).toBe(10)
  })
})
