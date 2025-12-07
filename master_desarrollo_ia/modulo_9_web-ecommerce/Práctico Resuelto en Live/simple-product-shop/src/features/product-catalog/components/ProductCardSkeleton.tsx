import { Skeleton } from '@/shared/components/Skeleton'

export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-md">
      {/* Image placeholder */}
      <Skeleton variant="rectangular" height={192} width="100%" />

      {/* Title placeholder */}
      <div className="mt-4">
        <Skeleton variant="text" width="70%" />
      </div>

      {/* Description placeholder (2 lines) */}
      <div className="mt-1 space-y-1">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
      </div>

      {/* Price placeholder */}
      <div className="mt-2">
        <Skeleton variant="text" width="30%" />
      </div>

      {/* Button placeholder */}
      <div className="mt-4">
        <Skeleton variant="rectangular" height={40} width="100%" />
      </div>
    </div>
  )
}
