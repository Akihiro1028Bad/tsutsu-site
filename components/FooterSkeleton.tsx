/**
 * FooterのスケルトンUI
 * Suspenseのフォールバックとして使用
 */
export default function FooterSkeleton() {
  return (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Left: Logo Skeleton */}
          <div className="lg:col-span-1 space-y-4">
            <div className="h-20 md:h-24 lg:h-28 w-48 md:w-56 lg:w-64 bg-gray-800/50 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-800/50 rounded animate-pulse" />
          </div>

          {/* Center: Navigation Skeleton */}
          <div className="lg:col-span-1 space-y-4">
            <div className="h-5 w-24 bg-gray-800/50 rounded animate-pulse mb-4" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-32 bg-gray-800/50 rounded animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Right: Social Links Skeleton */}
          <div className="lg:col-span-1 space-y-4">
            <div className="h-5 w-24 bg-gray-800/50 rounded animate-pulse mb-4" />
            <div className="flex flex-wrap gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-12 bg-gray-800/50 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Skeleton */}
        <div className="border-t border-gray-800 pt-8">
          <div className="h-4 w-48 mx-auto bg-gray-800/50 rounded animate-pulse" />
        </div>
      </div>
    </footer>
  )
}

