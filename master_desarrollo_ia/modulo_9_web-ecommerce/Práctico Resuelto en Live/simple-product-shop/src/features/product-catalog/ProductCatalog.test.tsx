import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ProductCatalog } from './ProductCatalog'

vi.mock('../../shared/data/products', () => ({
  products: [
    {
      id: 1,
      name: 'Product One',
      price: 19.99,
      image: 'https://example.com/one.jpg',
      description: 'First test product',
    },
    {
      id: 2,
      name: 'Product Two',
      price: 29.99,
      image: 'https://example.com/two.jpg',
      description: 'Second test product',
    },
  ],
}))

describe('ProductCatalog', () => {
  it('renders the heading', () => {
    render(<ProductCatalog onAddToCart={() => {}} />)

    expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument()
  })

  it('renders all products', () => {
    render(<ProductCatalog onAddToCart={() => {}} />)

    expect(screen.getByText('Product One')).toBeInTheDocument()
    expect(screen.getByText('Product Two')).toBeInTheDocument()
  })

  it('renders product prices', () => {
    render(<ProductCatalog onAddToCart={() => {}} />)

    expect(screen.getByText('$19.99')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
  })
})
