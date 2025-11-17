'use client'

import { Announcement } from '@/lib/types/announcement'
import { formatDate, getCategoryName, getCardImageUrl, getExcerpt } from '@/lib/utils/announcement'
import ContentCard, { type ContentCardData } from './ContentCard'

interface AnnouncementCardProps {
  announcement: Announcement
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const categoryName = getCategoryName(announcement.category)
  const cardImageUrl = getCardImageUrl(announcement.read)

  const contentData: ContentCardData = {
    id: announcement.id,
    title: announcement.title,
    publishedAt: announcement.publishedAt,
    category: announcement.category,
    image: announcement.read,
    excerpt: getExcerpt(announcement.content),
  }

  return (
    <ContentCard
      content={contentData}
      href={`/announcements/${announcement.id}`}
      imageUrl={cardImageUrl}
      categoryName={categoryName}
      formatDate={formatDate}
    />
  )
}

