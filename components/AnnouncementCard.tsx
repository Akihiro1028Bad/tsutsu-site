'use client'

import Link from 'next/link'
import { Announcement } from '@/lib/types/announcement'

interface AnnouncementCardProps {
  announcement: Announcement
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
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
    <Link
      href={`/announcements/${announcement.id}`}
      className="block group"
    >
      <article className="bg-white border border-slate-200/40 rounded-lg p-6 sm:p-8 hover:border-slate-300 transition-colors duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-light text-slate-950 tracking-tight mb-2 group-hover:text-slate-700 transition-colors">
              {announcement.title}
            </h3>
            {categoryName && (
              <span className="inline-block text-xs text-slate-400 font-normal tracking-[0.15em] uppercase mb-2">
                {categoryName}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <time dateTime={announcement.publishedAt} className="font-light">
            {formatDate(announcement.publishedAt)}
          </time>
          <span className="text-slate-400 group-hover:text-slate-600 transition-colors">
            →
          </span>
        </div>
      </article>
    </Link>
  )
}

