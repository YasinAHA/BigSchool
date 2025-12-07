import { describe, it, expect } from 'vitest'
import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('formats integer prices', () => {
    expect(formatPrice(10)).toBe('$10.00')
  })

  it('formats decimal prices', () => {
    expect(formatPrice(29.99)).toBe('$29.99')
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('formats large numbers with thousands separator', () => {
    expect(formatPrice(1234.56)).toBe('$1,234.56')
    expect(formatPrice(10000)).toBe('$10,000.00')
  })
})
