'use client'

import Link from 'next/link'
import { Announcement } from '@/lib/types/announcement'
import { formatDate, getCategoryName } from '@/lib/utils/announcement'

interface AnnouncementCardProps {
  announcement: Announcement
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const categoryName = getCategoryName(announcement.category)

  return (
    <Link
      href={`/announcements/${announcement.id}`}
      className="block group"
    >
      <article className="bg-white border border-slate-200/40 rounded-lg p-4 sm:p-6 md:p-8 hover:border-slate-300 transition-colors duration-300">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl md:text-2xl font-light text-slate-950 tracking-tight mb-2 group-hover:text-slate-700 transition-colors leading-snug">
              {announcement.title}
            </h3>
            {categoryName && (
              <span className="inline-block text-sm sm:text-xs text-slate-400 font-normal tracking-[0.15em] uppercase mb-2">
                {categoryName}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between text-base sm:text-sm text-slate-500">
          <time dateTime={announcement.publishedAt} className="font-light">
            {formatDate(announcement.publishedAt)}
          </time>
          <span className="text-slate-400 group-hover:text-slate-600 transition-colors text-lg sm:text-base">
            →
          </span>
        </div>
      </article>
    </Link>
  )
}

