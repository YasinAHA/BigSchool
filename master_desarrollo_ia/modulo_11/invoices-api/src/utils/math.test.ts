import { describe, it, expect } from 'vitest';

function suma(a: number, b: number): number {
  return a + b;
}

describe('Matemáticas básicas', () => {
  it('debería sumar dos números correctamente', () => {
    expect(suma(2, 3)).toBe(5);
    expect(suma(-1, 1)).toBe(0);
    expect(suma(0, 0)).toBe(0);
    expect(suma(10, 20)).toBe(30);
  });
});