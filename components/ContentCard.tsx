'use client'

import Link from 'next/link'
import Image from 'next/image'

/**
 * コンテンツカードの共通インターフェース
 */
export interface ContentCardData {
  id: string
  title: string
  publishedAt: string
  category?: string | { name: string }
  image?: {
    url: string
    alt?: string
  }
  excerpt?: string
}

interface ContentCardProps {
  content: ContentCardData
  href: string
  imageUrl: string | null
  categoryName: string
  formatDate: (dateString: string) => string
}

/**
 * コンテンツカードコンポーネント（Client Component）
 * 
 * ブログ記事やお知らせのカード表示に使用
 */
export default function ContentCard({
  content,
  href,
  imageUrl,
  categoryName,
  formatDate,
}: ContentCardProps) {
  return (
    <Link
      href={href}
      className="block group"
    >
      <article className="bg-white border border-slate-200/40 rounded-lg overflow-hidden hover:border-slate-300 transition-colors duration-300">
        {/* ヒーロー画像 */}
        {imageUrl && (
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={imageUrl}
              alt={content.image?.alt || content.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-4 sm:p-6 md:p-8">
          {/* カテゴリと公開日時を上部に配置（詳細画面と統一） */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            {/* カテゴリバッジ（詳細画面と統一） */}
            {categoryName && (
              <span className="inline-flex items-center px-2.5 py-1 text-xs text-slate-700 bg-slate-100 border border-slate-200 font-medium tracking-[0.05em] uppercase rounded-full w-fit">
                {categoryName}
              </span>
            )}
            
            {/* 公開日時（アイコン付き、詳細画面と統一） */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-normal">
              <svg
                className="w-3.5 h-3.5 text-slate-400 flex-shrink-0"
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
                {formatDate(content.publishedAt)}
              </time>
            </div>
          </div>
          
          {/* タイトル */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-light text-slate-950 tracking-tight mb-3 sm:mb-4 group-hover:text-slate-700 transition-colors leading-snug">
            {content.title}
          </h3>
          
          {/* 抜粋 */}
          {content.excerpt && (
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed mb-3 sm:mb-4 line-clamp-2">
              {content.excerpt}
            </p>
          )}
          
          {/* 矢印アイコン（右寄せ） */}
          <div className="flex justify-end">
            <span className="text-slate-400 group-hover:text-slate-600 transition-colors text-base sm:text-lg">
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

