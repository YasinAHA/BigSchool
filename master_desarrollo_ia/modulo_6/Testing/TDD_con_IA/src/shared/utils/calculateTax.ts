export function calculateTax(amount: number, taxRate: number): number {
  // TRIANGULATION: implement the real formula
  return amount * (taxRate / 100)
}
