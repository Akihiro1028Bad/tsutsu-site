import AnnouncementCard from './AnnouncementCard'
import type { AnnouncementCardItem } from '@/lib/utils/announcement'

interface AnnouncementListProps {
  announcements: AnnouncementCardItem[]
}

export default function AnnouncementList({ announcements }: AnnouncementListProps) {
  if (announcements.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 font-light">お知らせはありません</p>
      </div>
    )
  }

  return (
    <>
      {/* モバイル: リスト形式（案11） */}
      <div className="flex flex-col md:hidden">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
      {/* PC: グリッド形式（案4） */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </>
  )
}

