/**
 * お知らせ関連のサーバー専用ユーティリティ関数
 * 
 * このファイルはサーバーコンポーネントでのみ使用してください
 * クライアントコンポーネントからはインポートしないでください
 */

'use server'

import { Announcement, AnnouncementListResponse } from '@/lib/types/announcement'
import { getListStatic } from '@/lib/microcms/server-client'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import { CONTENT_CONFIG } from '@/lib/constants/config'

/**
 * 最新のお知らせを取得します
 * トップページのお知らせセクション用に、公開済みの最新お知らせを取得
 * 
 * @param limit - 取得するお知らせ数（デフォルト: CONTENT_CONFIG.LATEST_POSTS_LIMIT）
 * @returns お知らせの配列（エラー時は空配列）
 */
export async function getLatestAnnouncements(limit: number = CONTENT_CONFIG.LATEST_POSTS_LIMIT): Promise<Announcement[]> {
  let data: AnnouncementListResponse

  try {
    data = await getListStatic<Announcement>('announcements', {
      filters: 'publishedAt[exists]',
      orders: '-publishedAt',
      limit,
    })
  } catch (error) {
    const errorResult = handleMicroCMSError<AnnouncementListResponse>(error, {
      onBuildTimeNetworkError: () => {
        console.warn('ビルド時にお知らせの取得に失敗しました。空データを返します。')
      },
      onRuntimeError: () => {
        console.error('お知らせの取得に失敗しました:', error)
      },
    })

    if (errorResult.shouldThrow) {
      // ランタイムエラーの場合は空配列を返す
      return []
    }

    // ビルド時のネットワークエラーの場合は空データを返す
    data = {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit,
    }
  }

  return data.contents
}

