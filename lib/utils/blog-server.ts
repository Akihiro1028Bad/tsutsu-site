/**
 * ブログ関連のサーバー専用ユーティリティ関数
 * 
 * このファイルはサーバーコンポーネントでのみ使用してください
 * クライアントコンポーネントからはインポートしないでください
 */

'use server'

import { BlogPost, BlogListResponse } from '@/lib/types/blog'
import { getListStatic } from '@/lib/microcms/server-client'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import { CONTENT_CONFIG } from '@/lib/constants/config'

/**
 * 最新のブログ記事を取得します
 * トップページのブログセクション用に、公開済みの最新記事を取得
 * 
 * @param limit - 取得する記事数（デフォルト: CONTENT_CONFIG.LATEST_POSTS_LIMIT）
 * @returns ブログ記事の配列（エラー時は空配列）
 */
export async function getLatestBlogPosts(limit: number = CONTENT_CONFIG.LATEST_POSTS_LIMIT): Promise<BlogPost[]> {
  let data: BlogListResponse

  try {
    data = await getListStatic<BlogPost>('blog', {
      filters: 'publishedAt[exists]',
      orders: '-publishedAt',
      limit,
    })
  } catch (error) {
    const errorResult = handleMicroCMSError<BlogListResponse>(error, {
      onBuildTimeNetworkError: () => {
        console.warn('ビルド時にブログ記事の取得に失敗しました。空データを返します。')
      },
      onRuntimeError: () => {
        console.error('ブログ記事の取得に失敗しました:', error)
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

