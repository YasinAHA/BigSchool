import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CartSummary } from './CartSummary'
import { ORDER_DISCOUNT } from '@/shared/constants/businessRules'

const BULK_DISCOUNT_NAME = 'Bulk Discount'
const ORDER_DISCOUNT_NAME = 'Order Discount'

describe('CartSummary', () => {
  it('renders formatted subtotal', () => {
    render(
      <CartSummary subtotal={50} discount={0} total={50} itemCount={2} />
    )

    expect(screen.getByText('Subtotal')).toBeInTheDocument()
    expect(screen.getAllByText('$50.00')).toHaveLength(2) // subtotal and total
  })

  it('renders discount when greater than 0', () => {
    render(
      <CartSummary subtotal={100} discount={15} total={85} itemCount={3} />
    )

    expect(screen.getByText('-$15.00')).toBeInTheDocument()
  })

  it('does not render discount when it is 0', () => {
    render(
      <CartSummary subtotal={50} discount={0} total={50} itemCount={2} />
    )

    expect(screen.queryByText('-$0.00')).not.toBeInTheDocument()
    expect(screen.queryByText('Discount')).not.toBeInTheDocument()
  })

  it('renders formatted total', () => {
    render(
      <CartSummary subtotal={100} discount={15} total={85} itemCount={3} />
    )

    expect(screen.getByText('$85.00')).toBeInTheDocument()
  })

  it('shows promo message when subtotal is below threshold', () => {
    const subtotal = 75
    const amountNeeded = ORDER_DISCOUNT.MIN_SUBTOTAL - subtotal

    render(
      <CartSummary subtotal={subtotal} discount={0} total={subtotal} itemCount={2} />
    )

    expect(screen.getByText(`Add $${amountNeeded.toFixed(2)} more for 15% off!`)).toBeInTheDocument()
  })

  it('does not show promo message when subtotal meets threshold', () => {
    render(
      <CartSummary subtotal={100} discount={15} total={85} itemCount={3} />
    )

    expect(screen.queryByText(/Add .* more for 15% off!/)).not.toBeInTheDocument()
  })

  it('renders checkout button', () => {
    render(
      <CartSummary subtotal={50} discount={0} total={50} itemCount={2} />
    )

    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument()
  })

  it('renders discount breakdown when provided', () => {
    const breakdown = [
      { name: BULK_DISCOUNT_NAME, amount: 12.5 },
      { name: ORDER_DISCOUNT_NAME, amount: 16.875 },
    ]

    render(
      <CartSummary
        subtotal={125}
        discount={29.375}
        total={95.625}
        itemCount={5}
        discountBreakdown={breakdown}
      />
    )

    expect(screen.getByText(BULK_DISCOUNT_NAME)).toBeInTheDocument()
    expect(screen.getByText('-$12.50')).toBeInTheDocument()
    expect(screen.getByText(ORDER_DISCOUNT_NAME)).toBeInTheDocument()
    expect(screen.getByText('-$16.88')).toBeInTheDocument()
  })

  it('does not show promo when order discount is already applied', () => {
    const breakdown = [
      { name: ORDER_DISCOUNT_NAME, amount: 15 },
    ]

    render(
      <CartSummary
        subtotal={100}
        discount={15}
        total={85}
        itemCount={2}
        discountBreakdown={breakdown}
      />
    )

    expect(screen.queryByText(/Add .* more for 15% off!/)).not.toBeInTheDocument()
  })
})
