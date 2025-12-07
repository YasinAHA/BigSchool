import { describe, it, expect } from 'vitest'
import { calculateBulkDiscount } from './calculateBulkDiscount'
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

describe('calculateBulkDiscount', () => {
  it('returns 0 when quantity is less than minimum', () => {
    const items = [createCartItem(10, BULK_DISCOUNT.MIN_QUANTITY - 1)]

    expect(calculateBulkDiscount(items)).toBe(0)
  })

  it('calculates discount when quantity equals minimum', () => {
    const items = [createCartItem(10, BULK_DISCOUNT.MIN_QUANTITY)]
    // 10 * 5 = 50, 10% of 50 = 5

    expect(calculateBulkDiscount(items)).toBe(5)
  })

  it('calculates discount when quantity exceeds minimum', () => {
    const items = [createCartItem(10, 10)]
    // 10 * 10 = 100, 10% of 100 = 10

    expect(calculateBulkDiscount(items)).toBe(10)
  })

  it('only discounts items that qualify', () => {
    const items = [
      createCartItem(10, 5),  // qualifies: 50 * 10% = 5
      createCartItem(20, 2),  // does not qualify: 0
      createCartItem(5, 10),  // qualifies: 50 * 10% = 5
    ]

    expect(calculateBulkDiscount(items)).toBe(10)
  })

  it('returns 0 for empty array', () => {
    expect(calculateBulkDiscount([])).toBe(0)
  })
})
