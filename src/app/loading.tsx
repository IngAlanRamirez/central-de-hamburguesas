export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="text-center">
        <div className="mx-auto h-12 w-48 animate-pulse rounded bg-cream-dark" />
        <div className="mt-4 mx-auto h-4 w-32 animate-pulse rounded bg-cream-dark" />
        <div className="mt-12 mx-auto h-64 w-full max-w-md animate-pulse rounded-2xl bg-cream-dark" />
      </div>
    </div>
  )
}
