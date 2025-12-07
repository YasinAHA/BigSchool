import { useState, useCallback, type ReactNode } from 'react'
import { Toast } from '@/shared/components/Toast'
import { ToastContext } from './ToastContextValue'

type ToastVariant = 'success' | 'error' | 'info'

interface ToastData {
  id: number
  message: string
  variant: ToastVariant
}

let toastId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const showToast = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, variant }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            style={{ transform: `translateY(-${index * 60}px)` }}
            className="transition-transform"
          >
            <Toast
              message={toast.message}
              variant={toast.variant}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
