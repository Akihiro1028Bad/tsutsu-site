import { Suspense } from 'react'
import { getList } from '@/lib/microcms/client'
import { Announcement } from '@/lib/types/announcement'
import AnnouncementBannerClient from './AnnouncementBannerClient'

async function AnnouncementBannerContent() {
  let announcement: Announcement | null = null

  try {
    const data = await getList<Announcement>('announcements', {
      filters: 'publishedAt[exists]',
      orders: '-publishedAt',
      limit: 1,
    })

    if (data.contents.length > 0) {
      announcement = data.contents[0]
    }
  } catch (error) {
    // エラー時はバナーを表示しない（ログはサーバー側で記録）
    console.error('お知らせの取得に失敗しました:', error)
  }

  if (!announcement) {
    return null
  }

  return <AnnouncementBannerClient announcement={announcement} />
}

export default function AnnouncementBanner() {
  return (
    <Suspense
      fallback={
        <div className="backdrop-blur-md bg-white/60 border-b border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
            <div className="py-4 md:py-5">
              <div className="h-4 w-16 bg-slate-200/50 rounded mb-2 animate-pulse" />
              <div className="h-5 w-64 bg-slate-200/50 rounded animate-pulse" />
            </div>
          </div>
        </div>
      }
    >
      <AnnouncementBannerContent />
    </Suspense>
  )
}

