'use client'

import ContentRow from '@/components/ContentRow'

interface AnnouncementRowItem {
  id: string
  title: string
  href: string
  date: string
}

interface AnnouncementSectionClientProps {
  items: AnnouncementRowItem[]
  showHeading?: boolean
}

/**
 * お知らせセクションのクライアントコンポーネント
 * ContentRowを使用してシンプルな日付+タイトルのリストを表示
 */
export default function AnnouncementSectionClient({
  items,
  showHeading = true,
}: AnnouncementSectionClientProps) {
  return (
    <section id="announcements" className="bg-paper">
      {showHeading && (
        <h2 className="h-section mb-8 text-[clamp(2rem,6vw,4rem)]">ANNOUNCEMENTS</h2>
      )}
      <ul className="list-none">
        {items.map((item) => (
          <ContentRow
            key={item.id}
            date={item.date}
            title={item.title}
            href={item.href}
          />
        ))}
      </ul>
    </section>
  )
}
