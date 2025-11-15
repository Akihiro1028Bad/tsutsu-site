import { client } from '@/lib/microcms/client'
import { AnnouncementListResponse } from '@/lib/types/announcement'
import AnnouncementBannerClient from './AnnouncementBannerClient'

export default async function AnnouncementBanner() {
  'use cache'
  
  let announcement: AnnouncementListResponse['contents'][0] | null = null

  try {
    const data = await client.get({
      endpoint: 'announcements',
      queries: {
        filters: 'publishedAt[exists]',
        orders: '-publishedAt',
        limit: 1,
      },
    })

    if (data.contents.length > 0) {
      announcement = data.contents[0]
    }
  } catch (error) {
    // エラー時はバナーを表示しない（ログはサーバー側で記録）
    console.error('お知らせの取得に失敗しました:', error)
  }

  if (!announcement) {
    return null
  }

  return <AnnouncementBannerClient announcement={announcement} />
}

