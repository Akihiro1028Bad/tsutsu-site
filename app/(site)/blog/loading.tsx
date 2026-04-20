export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-8 sm:py-12 md:py-24 lg:py-32">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
          {/* Breadcrumb Skeleton */}
          <div className="mb-8">
            <div className="h-5 w-32 bg-slate-200/40 rounded animate-pulse" />
          </div>

          {/* Header Skeleton */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="h-10 sm:h-12 md:h-16 w-48 mx-auto bg-slate-200/40 rounded animate-pulse mb-4 sm:mb-6" />
            <div className="h-[1px] w-[100px] mx-auto mb-4 sm:mb-6 bg-slate-200/40" />
            <div className="h-6 w-64 mx-auto bg-slate-200/40 rounded animate-pulse" />
          </div>

          {/* Blog List Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/40 rounded-lg p-4 sm:p-6 md:p-8"
              >
                <div className="h-6 w-3/4 bg-slate-200/40 rounded animate-pulse mb-4" />
                <div className="h-4 w-1/2 bg-slate-200/40 rounded animate-pulse mb-4" />
                <div className="h-4 w-1/3 bg-slate-200/40 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

