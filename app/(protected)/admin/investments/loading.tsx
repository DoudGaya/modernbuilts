import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function InvestmentsLoading() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">Investment Management</h1>
          <p className="text-gray-600 text-sm md:text-base">Loading investments...</p>
        </div>
        <div className="flex gap-2 justify-center sm:justify-end">
          <Skeleton className="h-8 md:h-10 w-16 md:w-20" />
          <Skeleton className="h-8 md:h-10 w-24 md:w-32" />
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg md:text-xl">
            <Skeleton className="w-4 md:w-5 h-4 md:h-5 mr-2 rounded" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <Skeleton className="h-9 md:h-10" />
            <Skeleton className="h-9 md:h-10" />
            <Skeleton className="h-9 md:h-10" />
            <Skeleton className="h-9 md:h-10" />
          </div>
        </CardContent>
      </Card>

      {/* Investments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-5 md:h-6 w-24 md:w-32 mb-2" />
                  <div className="flex items-center">
                    <Skeleton className="w-3 md:w-4 h-3 md:h-4 mr-1 rounded" />
                    <Skeleton className="h-3 md:h-4 w-32 md:w-40" />
                  </div>
                </div>
                <Skeleton className="h-5 md:h-6 w-12 md:w-16 rounded-full" />
              </div>
            </CardHeader>

            <CardContent className="space-y-3 md:space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Skeleton className="w-3 md:w-4 h-3 md:h-4 mr-2 rounded" />
                  <Skeleton className="h-3 md:h-4 w-36 md:w-48" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="w-3 md:w-4 h-3 md:h-4 mr-2 rounded" />
                  <Skeleton className="h-3 md:h-4 w-28 md:w-36" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="w-3 md:w-4 h-3 md:h-4 mr-2 rounded" />
                  <Skeleton className="h-3 md:h-4 w-32 md:w-40" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <Skeleton className="h-3 md:h-4 w-20 md:w-24 mb-1" />
                  <Skeleton className="h-4 md:h-6 w-16 md:w-20" />
                </div>
                <div>
                  <Skeleton className="h-3 md:h-4 w-16 md:w-20 mb-1" />
                  <Skeleton className="h-4 md:h-6 w-12 md:w-16" />
                </div>
              </div>

              <div className="bg-gray-50 p-2 md:p-3 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 md:h-4 w-20 md:w-24" />
                  <Skeleton className="h-3 md:h-4 w-6 md:w-8" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 md:h-4 w-16 md:w-20" />
                  <Skeleton className="h-3 md:h-4 w-12 md:w-16" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 md:h-4 w-10 md:w-12" />
                  <Skeleton className="h-3 md:h-4 w-4 md:w-6" />
                </div>
              </div>

              <div className="border-t pt-3">
                <Skeleton className="h-3 w-32 md:w-40 mb-2" />
                <div className="flex gap-1 md:gap-2">
                  <Skeleton className="h-7 md:h-8 flex-1" />
                  <Skeleton className="h-7 md:h-8 w-12 md:w-16" />
                  <Skeleton className="h-7 md:h-8 w-8 md:w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <Card>
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Skeleton className="h-4 w-40 md:w-48" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 md:h-10 w-16 md:w-20" />
              <Skeleton className="h-8 md:h-10 w-20 md:w-24" />
              <Skeleton className="h-8 md:h-10 w-12 md:w-16" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center">
                <Skeleton className="w-6 md:w-8 h-6 md:h-8 rounded flex-shrink-0" />
                <div className="ml-2 md:ml-3 flex-1 min-w-0">
                  <Skeleton className="h-3 md:h-4 w-20 md:w-24 mb-1" />
                  <Skeleton className="h-4 md:h-6 w-16 md:w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
