import { Announcement } from '@/lib/types/announcement'
import { formatDate, getCategoryName, getReadImageUrl } from '@/lib/utils/announcement'
import ContentDetail, { type ContentDetailData } from './ContentDetail'

interface AnnouncementDetailProps {
  announcement: Announcement
}

/**
 * お知らせ詳細コンポーネント（Server Component）
 * 
 * 機能:
 * - microCMSのHTMLコンテンツを表示
 * - コードブロックのシンタックスハイライト処理
 * - XSS対策（DOMPurify）
 */
export default async function AnnouncementDetail({ announcement }: AnnouncementDetailProps) {
  const categoryName = getCategoryName(announcement.category)
  const readImageUrl = getReadImageUrl(announcement.read)
  
  const contentData: ContentDetailData = {
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    publishedAt: announcement.publishedAt,
    category: announcement.category,
    image: announcement.read,
  }

  return (
    <ContentDetail
      content={contentData}
      imageUrl={readImageUrl}
      categoryName={categoryName}
      formatDate={formatDate}
    />
  )
}

