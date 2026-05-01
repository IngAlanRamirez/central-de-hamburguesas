import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-cream px-6">
      <h1 className="font-display text-6xl text-primary mb-4">404</h1>
      <h2 className="font-display text-2xl text-accent mb-6">Página no encontrada</h2>
      <p className="text-text-muted mb-8">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-body font-medium hover:bg-primary/90 transition-colors"
      >
        Volver al inicio
      </Link>
    </main>
  )
}