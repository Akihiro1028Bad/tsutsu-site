'use client'

import Link from 'next/link'
import { Announcement } from '@/lib/types/announcement'

interface AnnouncementBannerClientProps {
  announcement: Announcement
}

export default function AnnouncementBannerClient({
  announcement,
}: AnnouncementBannerClientProps) {
  return (
    <div className="bg-slate-50/50 border-b border-slate-200/40">
      <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        <Link
          href={`/announcements/${announcement.id}`}
          className="block py-4 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <span className="text-xs text-slate-400 font-normal tracking-[0.15em] uppercase mb-1 block">
                お知らせ
              </span>
              <p className="text-sm sm:text-base text-slate-800 font-light">
                {announcement.title}
              </p>
            </div>
            <span className="text-slate-400 ml-4">→</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

