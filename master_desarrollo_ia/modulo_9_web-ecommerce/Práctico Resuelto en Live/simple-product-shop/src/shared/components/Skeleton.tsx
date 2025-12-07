interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular'
  width?: number | string
  height?: number | string
}

const VARIANT_CLASSES = {
  text: 'h-4 rounded',
  rectangular: 'rounded-md',
  circular: 'rounded-full',
}

export function Skeleton({ variant = 'text', width, height }: SkeletonProps) {
  const variantClass = VARIANT_CLASSES[variant]

  const style: React.CSSProperties = {}
  if (width !== undefined) {
    style.width = typeof width === 'number' ? `${width}px` : width
  }
  if (height !== undefined) {
    style.height = typeof height === 'number' ? `${height}px` : height
  }

  return (
    <div
      role="status"
      aria-label="Loading..."
      className={`animate-pulse bg-gray-200 ${variantClass}`}
      style={style}
    />
  )
}
