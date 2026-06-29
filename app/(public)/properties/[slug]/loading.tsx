export default function PropertyDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200" />
        <div className="h-80 animate-pulse rounded-md bg-gray-200" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-40 animate-pulse rounded-md bg-gray-200" />
          <div className="h-40 animate-pulse rounded-md bg-gray-200" />
          <div className="h-40 animate-pulse rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
