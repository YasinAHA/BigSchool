import type { Product } from '@/shared/types'
import { products } from '@/shared/data/products'
import { ProductCard } from './components/ProductCard'

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void
}

export function ProductCatalog({ onAddToCart }: ProductCatalogProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  )
}
