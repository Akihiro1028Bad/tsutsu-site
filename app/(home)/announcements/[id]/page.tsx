import { cache } from 'react'
import { cacheTag, cacheLife } from 'next/cache'
import { getListStatic, getDetailStatic } from '@/lib/microcms/server-client'
import { Announcement } from '@/lib/types/announcement'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import ArticleBody from '@/components/ArticleBody'
import AnnouncementDetail from '@/components/AnnouncementDetail'
import type { ArticleSibling } from '@/components/ContentDetail'
import { notFound } from 'next/navigation'

/**
 * お知らせ詳細を取得する関数（メモ化）
 * React cacheを使用して、同じリクエスト内での重複取得を防止
 */
const getAnnouncementById = cache(async (id: string): Promise<Announcement> => {
  'use cache'
  cacheTag(`announcement:${id}`)
  cacheLife('hours') // 1時間キャッシュ

  return getDetailStatic<Announcement>('announcements', id)
})

/**
 * Fetches all announcement ids + titles (newest first) so the detail
 * page can resolve older / newer neighbours for the sibling nav.
 */
const getAnnouncementSiblingList = cache(async () => {
  'use cache'
  cacheTag('announcements:siblings')
  cacheLife('hours')

  try {
    const data = await getListStatic<Announcement>('announcements', {
      filters: 'publishedAt[exists]',
      orders: '-publishedAt',
      fields: 'id,title,publishedAt',
      limit: 100,
    })
    return data.contents
  } catch {
    return []
  }
})

function pickSiblings(
  list: ReadonlyArray<{ id: string; title: string }>,
  currentId: string
): { older?: ArticleSibling; newer?: ArticleSibling } {
  const idx = list.findIndex((item) => item.id === currentId)
  if (idx === -1) {
    return {}
  }
  const newer = idx > 0 ? list[idx - 1] : null
  const older = idx < list.length - 1 ? list[idx + 1] : null
  return {
    ...(newer
      ? { newer: { href: `/announcements/${newer.id}`, title: newer.title } }
      : {}),
    ...(older
      ? { older: { href: `/announcements/${older.id}`, title: older.title } }
      : {}),
  }
}

const PLACEHOLDER_ID = '__placeholder__' as const

export async function generateStaticParams() {
  'use cache'
  cacheTag('announcements:static-params')
  cacheLife('hours') // 1時間キャッシュ

  try {
    const data = await getListStatic<Announcement>('announcements', {
      filters: 'publishedAt[exists]',
      limit: 100,
    })

    const params = data.contents
      .filter((announcement) => announcement.id)
      .map((announcement) => ({
        id: announcement.id,
      }))

    if (params.length === 0) {
      console.warn(
        '公開済みのお知らせが0件のため、プレースホルダーIDを返します。'
      )
      return [{ id: PLACEHOLDER_ID }]
    }

    return params
  } catch (error) {
    const errorResult = handleMicroCMSError(error, {
      onBuildTimeNetworkError: () => {
        console.warn(
          'ビルド時にお知らせ一覧の取得に失敗しました。プレースホルダーIDを返します。'
        )
      },
      onRuntimeError: () => {
        // generateStaticParamsはビルド時のみ実行されるため、ここには到達しない
        console.error('予期しないエラー（generateStaticParams）:', error)
      },
    })

    if (
      errorResult.isBuildTimeNetworkError ||
      errorResult.isNotFound ||
      !errorResult.shouldThrow
    ) {
      return [{ id: PLACEHOLDER_ID }]
    }

    throw error instanceof Error
      ? error
      : new Error('お知らせ一覧の取得に失敗しました。')
  }
}

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (id === PLACEHOLDER_ID) {
    notFound()
  }
  let announcement: Announcement

  try {
    announcement = await getAnnouncementById(id)
  } catch (error) {
    const errorResult = handleMicroCMSError(error, {
      onBuildTimeNetworkError: () => {
        console.warn('ビルド時にお知らせの取得に失敗しました。notFound()を呼び出します。')
      },
      onNotFound: () => {
        // 404エラーの場合はnotFound()を呼び出す
      },
      onRuntimeError: () => {
        console.error('お知らせの取得に失敗しました:', error)
      },
    })

    // 404エラーまたはビルド時のネットワークエラーの場合
    if (errorResult.isNotFound || errorResult.isBuildTimeNetworkError) {
      notFound()
    }

    // その他のエラーはthrowしてerror.tsxで処理
    if (errorResult.shouldThrow) {
      throw new Error('お知らせの取得に失敗しました。しばらくしてから再度お試しください。')
    }

    // エラー処理が完了したが、お知らせが見つからない場合はnotFound()を呼び出す
    notFound()
  }

  // 公開済みかどうかの確認
  if (!announcement.publishedAt) {
    notFound()
  }

  const siblingList = await getAnnouncementSiblingList()
  const siblings = pickSiblings(siblingList, id)

  return (
    <ArticleBody>
      <AnnouncementDetail announcement={announcement} siblings={siblings} />
    </ArticleBody>
  )
}

