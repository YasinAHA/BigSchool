import { describe, it, expect } from 'vitest'
import { calculateSubtotal } from './calculateSubtotal'
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

describe('calculateSubtotal', () => {
  it('returns 0 for empty array', () => {
    expect(calculateSubtotal([])).toBe(0)
  })

  it('calculates subtotal for one item', () => {
    const items = [createCartItem(10, 2)]

    expect(calculateSubtotal(items)).toBe(20)
  })

  it('calculates subtotal for multiple items', () => {
    const items = [
      createCartItem(10, 2),  // 20
      createCartItem(15, 3),  // 45
      createCartItem(5, 1),   // 5
    ]

    expect(calculateSubtotal(items)).toBe(70)
  })
})
