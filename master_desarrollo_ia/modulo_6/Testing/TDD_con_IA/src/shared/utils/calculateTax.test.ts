import { describe, expect, it } from 'vitest'
import { calculateTax } from './calculateTax'

describe('calculateTax (RED phase)', () => {
  it('calculateTax(100, 10) should return 10', () => {
    // Arrange

    // Act
    const result = calculateTax(100, 10)

    // Assert
    expect(result).toBe(10)
  })
})
