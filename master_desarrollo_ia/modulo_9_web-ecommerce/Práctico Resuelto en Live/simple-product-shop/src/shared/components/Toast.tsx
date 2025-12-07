import { useEffect } from 'react'

type ToastVariant = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  variant?: ToastVariant
  onClose: () => void
  autoClose?: boolean
}

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
}

const AUTO_CLOSE_DELAY = 3000

export function Toast({ message, variant = 'info', onClose, autoClose = true }: ToastProps) {
  useEffect(() => {
    if (!autoClose) return

    const timer = setTimeout(() => {
      onClose()
    }, AUTO_CLOSE_DELAY)

    return () => clearTimeout(timer)
  }, [autoClose, onClose])

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`px-4 py-3 rounded-lg shadow-lg text-white flex items-center gap-3 ${VARIANT_CLASSES[variant]}`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        aria-label="Close"
        className="hover:opacity-80 transition-opacity cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
