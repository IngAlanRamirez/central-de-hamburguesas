'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-cream p-8 text-center">
      <div className="rounded-full bg-primary/10 p-6">
        <svg
          className="h-12 w-12 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h1 className="font-display text-3xl uppercase tracking-wider text-text">
        Algo salió mal
      </h1>
      <p className="max-w-md font-body text-text-muted">
        Hubo un error inesperado. No te preocupes, tu carrito está guardado.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-primary px-8 py-3 font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-hover"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
