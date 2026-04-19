/**
 * HeaderのスケルトンUI
 * Suspenseのフォールバックとして使用
 */
export default function HeaderSkeleton() {
  return <div aria-hidden className="sticky top-0 z-50 h-16 bg-paper/70" />
}
