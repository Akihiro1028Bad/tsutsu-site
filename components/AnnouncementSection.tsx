import { getLatestAnnouncements } from '@/lib/utils/announcement'
import AnnouncementSectionClient from '@/components/AnnouncementSectionClient'

/**
 * お知らせセクションコンポーネント（サーバーコンポーネント）
 * トップページに最新のお知らせを表示する
 * データフェッチングをサーバー側で行い、クライアントコンポーネントにデータを渡す
 */
export default async function AnnouncementSection() {
  // 最新6件のお知らせを取得
  const latestAnnouncements = await getLatestAnnouncements(6)

  // お知らせがない場合はセクションを非表示
  if (latestAnnouncements.length === 0) {
    return null
  }

  // クライアントコンポーネントにデータを渡す
  return <AnnouncementSectionClient announcements={latestAnnouncements} />
}

