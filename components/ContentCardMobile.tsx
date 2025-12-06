'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { ContentCardData } from './ContentCard'

interface ContentCardMobileProps {
  content: ContentCardData
  href: string
  imageUrl: string | null
  categoryName: string
  formattedDate: string
}

/**
 * 案11: ミニマルリスト + セパレーター（モバイル用）
 * 
 * Context7ベストプラクティス適用:
 * - Fitts's Law: タッチターゲットを80-100px高さに確保
 * - Law of Proximity: 関連情報を近接配置
 * - Chunking: 情報を視覚的にグループ化
 * - Touch Optimization: touch-action: manipulation
 */
export default function ContentCardMobile({
  content,
  href,
  imageUrl,
  categoryName,
  formattedDate,
}: ContentCardMobileProps) {
  return (
    <Link
      href={href}
      className="block group"
      style={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <article
        className="
          flex gap-4 sm:gap-6 py-4 sm:py-5
          border-b border-slate-200 last:border-b-0
          hover:bg-slate-50 active:bg-slate-100
          transition-colors duration-200
          min-h-[80px] sm:min-h-[100px]
        "
      >
        {/* 画像（左側） */}
        {imageUrl && (
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
            <Image
              src={imageUrl}
              alt={content.image?.alt || content.title}
              fill
              sizes="(max-width: 768px) 80px, 96px"
              className="object-cover group-active:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* テキストコンテンツ（右側） */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          {/* カテゴリと公開日時 */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
            {categoryName && (
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 tracking-[0.05em] uppercase rounded-full">
                {categoryName}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-normal">
              <svg
                className="w-3 h-3 text-slate-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={content.publishedAt}>
                {formattedDate}
              </time>
            </div>
          </div>

          {/* タイトル */}
          <h3 className="text-base sm:text-lg font-medium text-slate-950 tracking-tight mb-1.5 line-clamp-2 group-active:text-slate-700 transition-colors duration-200">
            {content.title}
          </h3>

          {/* 抜粋 */}
          {content.excerpt && (
            <p className="text-sm text-slate-600 font-light leading-relaxed line-clamp-2">
              {content.excerpt}
            </p>
          )}
        </div>

        {/* 矢印アイコン */}
        <div className="flex items-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-slate-400 group-active:text-slate-600 transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </article>
    </Link>
  )
}

