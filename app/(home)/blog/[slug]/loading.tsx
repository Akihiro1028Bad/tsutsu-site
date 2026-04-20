export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-12 md:py-32">
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

        <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
          {/* Breadcrumb Skeleton */}
          <div className="mb-8">
            <div className="h-5 w-32 bg-slate-200/40 rounded animate-pulse" />
          </div>

          {/* Article Skeleton */}
          <article className="max-w-4xl mx-auto">
            <header className="mb-8 sm:mb-12">
              <div className="h-4 w-24 bg-slate-200/40 rounded animate-pulse mb-4" />
              <div className="h-10 sm:h-12 md:h-16 w-full bg-slate-200/40 rounded animate-pulse mb-6" />
              <div className="h-4 w-32 bg-slate-200/40 rounded animate-pulse" />
            </header>

            {/* Content Skeleton */}
            <div className="space-y-4">
              <div className="h-4 w-full bg-slate-200/40 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-200/40 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-slate-200/40 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-200/40 rounded animate-pulse mt-8" />
              <div className="h-4 w-full bg-slate-200/40 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-slate-200/40 rounded animate-pulse" />
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

