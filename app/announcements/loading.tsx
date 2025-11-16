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

        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
          {/* Header Section Skeleton */}
          <div className="text-center mb-12 md:mb-16">
            <div className="h-12 sm:h-16 md:h-20 lg:h-24 w-48 mx-auto bg-slate-200/40 rounded animate-pulse mb-6" />
            <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-6 w-[100px]" />
            <div className="h-5 sm:h-6 md:h-7 w-64 mx-auto bg-slate-200/40 rounded animate-pulse" />
          </div>

          {/* Announcements List Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/40 rounded-lg p-6 sm:p-8"
              >
                <div className="h-6 w-3/4 bg-slate-200/40 rounded animate-pulse mb-4" />
                <div className="h-4 w-1/2 bg-slate-200/40 rounded animate-pulse mb-4" />
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 bg-slate-200/40 rounded animate-pulse" />
                  <div className="h-4 w-4 bg-slate-200/40 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

