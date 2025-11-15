import { describe, expect, it } from 'vitest'

describe('calculateTax (RED phase)', () => {
  it('calculateTax(100, 10) should return 10', () => {
    // Arrange

    // Act
    // @ts-ignore: En la fase RED no importamos la función a propósito
    const result = calculateTax(100, 10)

    // Assert
    expect(result).toBe(10)
  })
})
