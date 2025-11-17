export default function BlogSectionSkeleton() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-[600px] py-16 md:py-32">
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
        {/* Header Skeleton */}
        <div className="text-center mb-12 md:mb-16">
          <div className="h-12 md:h-16 bg-slate-200/40 rounded w-48 mx-auto mb-6 animate-pulse" />
          <div className="h-[1px] bg-slate-200/40 w-[100px] mx-auto mb-6" />
          <div className="h-6 bg-slate-200/40 rounded w-64 mx-auto animate-pulse" />
        </div>

        {/* Blog Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-slate-200/40 rounded-lg p-4 sm:p-6 md:p-8"
            >
              <div className="space-y-4">
                <div className="h-6 bg-slate-200/40 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-slate-200/40 rounded w-1/2 animate-pulse" />
                <div className="h-4 bg-slate-200/40 rounded w-1/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

