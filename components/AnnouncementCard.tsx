import ContentCard, { type ContentCardData } from './ContentCard'
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

  return (
    <ContentCard
      content={contentData}
      href={announcement.href}
      imageUrl={announcement.imageUrl}
      categoryName={announcement.categoryName}
      formatDate={formatDate}
    />
  )
}

