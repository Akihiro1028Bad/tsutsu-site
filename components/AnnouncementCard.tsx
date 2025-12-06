import ContentCardMobile from './ContentCardMobile'
import ContentCardDesktop from './ContentCardDesktop'
import { type ContentCardData } from './ContentCard'
import { formatDate, type AnnouncementCardItem } from '@/lib/utils/announcement'

interface AnnouncementCardProps {
  announcement: AnnouncementCardItem
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const contentData: ContentCardData = {
    id: announcement.id,
    title: announcement.title,
    publishedAt: announcement.publishedAt,
    image: announcement.imageUrl
      ? {
          url: announcement.imageUrl,
          alt: announcement.title,
        }
      : undefined,
    excerpt: announcement.excerpt,
  }

  // Server Component側で日付をフォーマット（関数を渡さない）
  const formattedDate = formatDate(announcement.publishedAt)

  const commonProps = {
    content: contentData,
    href: announcement.href,
    imageUrl: announcement.imageUrl,
    categoryName: announcement.categoryName,
    formattedDate,
  }

  return (
    <>
      {/* モバイル: 案11（ミニマルリスト + セパレーター） */}
      <div className="md:hidden">
        <ContentCardMobile {...commonProps} />
      </div>
      {/* PC: 案4（インタラクティブ + 強化アニメーション） */}
      <div className="hidden md:block">
        <ContentCardDesktop {...commonProps} />
      </div>
    </>
  )
}

