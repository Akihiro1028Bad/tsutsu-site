'use client'

import { Announcement } from '@/lib/types/announcement'

interface AnnouncementDetailProps {
  announcement: Announcement
}

export default function AnnouncementDetail({ announcement }: AnnouncementDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // categoryがオブジェクト（参照フィールド）の場合はnameプロパティを取得
  const getCategoryName = (category: typeof announcement.category): string => {
    if (!category) return ''
    if (typeof category === 'string') return category
    return category.name
  }

  const categoryName = getCategoryName(announcement.category)

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8 sm:mb-12">
        {categoryName && (
          <span className="inline-block text-xs text-slate-400 font-normal tracking-[0.15em] uppercase mb-4">
            {categoryName}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-950 tracking-tight mb-6">
          {announcement.title}
        </h1>
        <div className="flex items-center text-sm text-slate-500 font-light">
          <time dateTime={announcement.publishedAt}>
            {formatDate(announcement.publishedAt)}
          </time>
        </div>
      </header>

      <div
        className="prose prose-slate max-w-none
          prose-headings:font-light prose-headings:text-slate-950 prose-headings:tracking-tight
          prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-light
          prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-950 prose-strong:font-normal
          prose-ul:text-slate-700 prose-ol:text-slate-700
          prose-li:font-light
          prose-blockquote:border-l-slate-300 prose-blockquote:text-slate-600
          prose-code:text-slate-800 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-slate-950 prose-pre:text-slate-100"
        dangerouslySetInnerHTML={{ __html: announcement.content }}
      />
    </article>
  )
}

