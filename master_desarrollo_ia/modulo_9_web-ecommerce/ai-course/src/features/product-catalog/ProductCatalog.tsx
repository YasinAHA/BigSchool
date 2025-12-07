import { ProductCard } from './components/ProductCard'
import type { Product } from '@shared/types'

interface ProductCatalogProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  isLoading?: boolean
}

// 💫 Skeleton screen for perceived performance
function ProductCardSkeleton() {
  return (
    <article className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Product emoji skeleton */}
          <div className="w-12 h-12 bg-gray-200 rounded-lg mb-3"></div>
          {/* Product name skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          {/* Product description skeleton */}
          <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
      {/* Price skeleton */}
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      {/* Button skeleton */}
      <div className="h-12 bg-gray-200 rounded w-full"></div>
    </article>
  )
}

export function ProductCatalog({ products, onAddToCart, isLoading = false }: ProductCatalogProps) {
  return (
    <section className="lg:col-span-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          // Show skeleton screens while loading
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : (
          // Show actual products when loaded
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))
        )}
      </div>
    </section>
  )
}
