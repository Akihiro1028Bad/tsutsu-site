import { getLatestAnnouncements } from '@/lib/utils/announcement-server'
import { mapAnnouncementsToCardItems } from '@/lib/utils/announcement'
import AnnouncementSectionClient from '@/components/AnnouncementSectionClient'

interface AnnouncementSectionProps {
  showHeading?: boolean
}

/**
 * お知らせセクションコンポーネント（サーバーコンポーネント）
 * トップページに最新のお知らせを表示する
 * データフェッチングをサーバー側で行い、クライアントコンポーネントにデータを渡す
 */
export default async function AnnouncementSection({
  showHeading = true,
}: AnnouncementSectionProps = {}) {
  // 最新件のお知らせを取得（表示は3件にキャップ）
  const latestAnnouncements = await getLatestAnnouncements(6)
  const announcementCards = mapAnnouncementsToCardItems(latestAnnouncements)

  // お知らせがない場合はセクションを非表示
  if (announcementCards.length === 0) {
    return null
  }

  // 表示は3件までにキャップ
  const items = announcementCards.slice(0, 3).map((a) => ({
    id: a.id,
    title: a.title,
    href: a.href,
    date: a.publishedAt.slice(0, 10),
  }))

  return <AnnouncementSectionClient items={items} showHeading={showHeading} />
}
