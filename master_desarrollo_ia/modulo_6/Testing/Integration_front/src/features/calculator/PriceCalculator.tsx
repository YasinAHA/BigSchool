import { useState } from 'react'

export default function PriceCalculator() {
  const [quantity, setQuantity] = useState('')
  const [unitPrice, setUnitPrice] = useState('')

  const q = Number(quantity) || 0
  const p = Number(unitPrice) || 0
  const total = (q * p).toFixed(2)

  return (
    <div>
      <label>
        Quantity
        <input aria-label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </label>

      <label>
        Unit Price
        <input aria-label="Unit Price" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
      </label>

      <div>Total: ${total}</div>
    </div>
  )
}
