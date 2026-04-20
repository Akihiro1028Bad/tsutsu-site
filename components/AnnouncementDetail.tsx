import { Announcement } from "@/lib/types/announcement"
import {
  formatDate,
  getCategoryName,
  getReadImageUrl,
} from "@/lib/utils/announcement"
import { estimateReadingTimeMin } from "@/lib/utils/reading-time"
import ContentDetail, {
  type ArticleSibling,
  type ContentDetailData,
} from "./ContentDetail"

interface AnnouncementDetailProps {
  announcement: Announcement
  siblings?: {
    readonly older?: ArticleSibling
    readonly newer?: ArticleSibling
  }
}

/**
 * Announcement detail wrapper — reshapes the microCMS record into the
 * shared ContentDetail (Linear) layout.
 */
export default async function AnnouncementDetail({
  announcement,
  siblings,
}: AnnouncementDetailProps) {
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
      kicker="Announcements."
      archive={{ href: "/announcements", label: "お知らせ一覧へ戻る" }}
      siblings={siblings}
      readingTimeMin={estimateReadingTimeMin(announcement.content)}
    />
  )
}
