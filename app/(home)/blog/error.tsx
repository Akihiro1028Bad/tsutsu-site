"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("ブログページでエラーが発生しました:", error)
  }, [error])

  return (
    <main className="archive-page" data-style="modern">
      <header className="archive-page__head section-head section-head--hero">
        <div className="section-head__rule">
          <span>Error</span>
          <span>Notes</span>
        </div>
        <div className="section-head__jp">
          <h1>Notes.</h1>
          <p className="section-head__en">ブログ</p>
        </div>
        <p className="section-head__lead">
          読み込み中に問題が発生しました。
        </p>
      </header>
      <div className="archive-page__body">
        <div className="archive-page__error">
          <button type="button" onClick={reset} className="archive-page__btn">
            再試行
          </button>
          <Link href="/" className="archive-page__btn archive-page__btn--ghost">
            ホームに戻る
          </Link>
        </div>
      </div>
    </main>
  )
}
