import * as Sentry from '@sentry/react'
import type { ReactNode } from 'react'

interface FallbackProps {
  error: Error
  resetError: () => void
}

function ErrorFallback({ error, resetError }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-4">
          We&apos;re sorry, but something unexpected happened. Our team has been notified.
        </p>
        <details className="text-left mb-4 p-3 bg-gray-100 rounded text-sm">
          <summary className="cursor-pointer font-medium text-gray-700">
            Error details
          </summary>
          <pre className="mt-2 text-red-600 whitespace-pre-wrap break-words">
            {error.message}
          </pre>
        </details>
        <button
          onClick={resetError}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

interface SentryErrorBoundaryProps {
  children: ReactNode
}

export function SentryErrorBoundary({ children }: SentryErrorBoundaryProps) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <ErrorFallback 
          error={error instanceof Error ? error : new Error(String(error))} 
          resetError={resetError} 
        />
      )}
      onError={(error) => {
        console.error('Error caught by boundary:', error)
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  )
}
