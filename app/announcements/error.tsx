'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // エラーをログに記録
    console.error('お知らせページでエラーが発生しました:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-white">
      <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-12 md:py-32">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-slate-950 tracking-tight">
              エラーが発生しました
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal mb-8">
              お知らせの読み込み中に問題が発生しました。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-slate-950 text-white font-light hover:bg-slate-800 transition-colors"
              >
                再試行
              </button>
              <Link
                href="/"
                className="px-6 py-3 border border-slate-300 text-slate-950 font-light hover:bg-slate-50 transition-colors"
              >
                ホームに戻る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

