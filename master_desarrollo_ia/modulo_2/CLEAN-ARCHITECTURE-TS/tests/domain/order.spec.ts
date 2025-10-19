// tests/domain/price.spec.ts
import { describe, it, expect } from "vitest"
import { Price } from "../../src/domain/value-objects/Price"

describe("Price", () => {
  it("no permite negativos y redondea a 2 decimales", () => {
    expect(() => Price.create(-1, "EUR")).toThrow()
    const p = Price.create(12.345, "EUR")
    expect(p.amount).toBe(12.35)
  })
})
