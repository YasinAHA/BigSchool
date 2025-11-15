// src/shared/utils/calculateSubtotal.test.ts
import { describe, expect, it } from 'vitest';
import { calculateSubtotal } from './calculateSubtotal';

describe('calculateSubtotal', () => {
  it('suma price × quantity para cada item (AAA)', () => {
    // Arrange
    const items = [
      { price: 10, quantity: 2 },
      { price: 5.5, quantity: 1 },
    ];

    // Act
    const result = calculateSubtotal(items);

    // Assert
    expect(result).toBeCloseTo(25.5, 2);
  });
});
