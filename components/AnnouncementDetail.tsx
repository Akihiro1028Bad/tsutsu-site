'use client'

import { Announcement } from '@/lib/types/announcement'
import { formatDate, getCategoryName } from '@/lib/utils/announcement'
import { sanitizeHtml } from '@/lib/utils/sanitize'

interface AnnouncementDetailProps {
  announcement: Announcement
}

export default function AnnouncementDetail({ announcement }: AnnouncementDetailProps) {
  const categoryName = getCategoryName(announcement.category)
  // XSS対策: HTMLコンテンツをサニタイズ
  const sanitizedContent = sanitizeHtml(announcement.content)

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-6 sm:mb-8 md:mb-12">
        {categoryName && (
          <span className="inline-block text-sm sm:text-xs text-slate-400 font-normal tracking-[0.15em] uppercase mb-3 sm:mb-4">
            {categoryName}
          </span>
        )}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-950 tracking-tight mb-4 sm:mb-6 leading-tight">
          {announcement.title}
        </h1>
        <div className="flex items-center text-base sm:text-sm text-slate-500 font-light">
          <time dateTime={announcement.publishedAt}>
            {formatDate(announcement.publishedAt)}
          </time>
        </div>
      </header>

      <div
        className="prose prose-sm sm:prose-base md:prose-lg prose-slate max-w-none
          prose-headings:font-light prose-headings:text-slate-950 prose-headings:tracking-tight
          prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-light prose-p:text-base sm:prose-p:text-lg
          prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-950 prose-strong:font-normal
          prose-ul:text-slate-700 prose-ol:text-slate-700
          prose-li:font-light
          prose-blockquote:border-l-slate-300 prose-blockquote:text-slate-600
          prose-code:text-slate-800 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-pre:bg-slate-950 prose-pre:text-slate-100 prose-pre:text-sm
          prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6 sm:prose-img:my-8
          prose-figure:my-6 sm:prose-figure:my-8
          prose-figcaption:text-slate-500 prose-figcaption:text-xs sm:prose-figcaption:text-sm prose-figcaption:text-center prose-figcaption:mt-2
          prose-table:w-full prose-table:border-collapse prose-table:my-6 sm:prose-table:my-8 prose-table:text-sm
          prose-thead:border-b prose-thead:border-slate-300
          prose-th:border prose-th:border-slate-300 prose-th:bg-slate-50 prose-th:px-2 sm:prose-th:px-4 prose-th:py-2 sm:prose-th:py-3 prose-th:text-left prose-th:font-normal prose-th:text-slate-950 prose-th:text-sm
          prose-tbody:border-b prose-tbody:border-slate-200
          prose-td:border prose-td:border-slate-300 prose-td:px-2 sm:prose-td:px-4 prose-td:py-2 sm:prose-td:py-3 prose-td:text-slate-700 prose-td:text-sm
          prose-hr:border-slate-300 prose-hr:my-6 sm:prose-hr:my-8
          prose-em:italic prose-em:font-light
          prose-u:underline prose-u:decoration-slate-400
          prose-s:line-through prose-s:text-slate-500"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </article>
  )
}

