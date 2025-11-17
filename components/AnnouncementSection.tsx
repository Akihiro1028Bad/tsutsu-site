import { getLatestAnnouncements } from '@/lib/utils/announcement-server'
import { mapAnnouncementsToCardItems } from '@/lib/utils/announcement'
import AnnouncementSectionClient from '@/components/AnnouncementSectionClient'
import AnnouncementList from '@/components/AnnouncementList'

/**
 * お知らせセクションコンポーネント（サーバーコンポーネント）
 * トップページに最新のお知らせを表示する
 * データフェッチングをサーバー側で行い、クライアントコンポーネントにデータを渡す
 */
export default async function AnnouncementSection() {
  // 最新6件のお知らせを取得
  const latestAnnouncements = await getLatestAnnouncements(6)
  const announcementCards = mapAnnouncementsToCardItems(latestAnnouncements)

  // お知らせがない場合はセクションを非表示
  if (announcementCards.length === 0) {
    return null
  }

  // クライアントコンポーネントにデータを渡す
  return (
    <AnnouncementSectionClient>
      <AnnouncementList announcements={announcementCards} />
    </AnnouncementSectionClient>
  )
}

