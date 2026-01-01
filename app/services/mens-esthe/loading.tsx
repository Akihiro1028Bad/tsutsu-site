function SkeletonBlock({ className }: { className: string }) {
  return <div aria-hidden className={`animate-pulse rounded-md bg-slate-200/60 ${className}`} />
}

export default function Loading() {
  return (
    <main className="bg-white">
      <section aria-label="読み込み中: ヒーロー" className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SkeletonBlock className="h-10 w-3/4" />
          <div className="mt-6 space-y-3">
            <SkeletonBlock className="h-4 w-2/3" />
            <SkeletonBlock className="h-4 w-1/2" />
          </div>
          <SkeletonBlock className="mt-8 h-10 w-32" />
        </div>
      </section>

      <section aria-label="読み込み中: 主な機能" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SkeletonBlock className="h-8 w-40" />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <SkeletonBlock className="h-24 w-full" />
            <SkeletonBlock className="h-24 w-full" />
          </div>
        </div>
      </section>

      <section aria-label="読み込み中: 料金" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SkeletonBlock className="h-8 w-24" />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <SkeletonBlock className="h-28 w-full" />
            <SkeletonBlock className="h-28 w-full" />
            <SkeletonBlock className="h-28 w-full" />
          </div>
        </div>
      </section>
    </main>
  )
}
