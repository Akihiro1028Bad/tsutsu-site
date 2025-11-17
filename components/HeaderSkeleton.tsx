/**
 * HeaderのスケルトンUI
 * Suspenseのフォールバックとして使用
 */
export default function HeaderSkeleton() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto px-8 py-3 md:py-4">
        <div className="flex items-center justify-between border-b border-slate-200/30 pb-2">
          {/* Logo Skeleton */}
          <div className="h-16 md:h-20 lg:h-24 w-48 md:w-56 lg:w-64 bg-slate-200/40 rounded animate-pulse" />

          {/* Navigation Items Skeleton */}
          <div className="hidden md:flex items-center space-x-12">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-16 bg-slate-200/40 rounded animate-pulse"
              />
            ))}
          </div>

          {/* Mobile Menu Button Skeleton */}
          <div className="md:hidden h-6 w-6 bg-slate-200/40 rounded animate-pulse" />
        </div>
      </nav>
    </header>
  )
}

