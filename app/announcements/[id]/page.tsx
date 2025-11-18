import { cache } from 'react'
import { cacheTag, cacheLife } from 'next/cache'
import { getListStatic, getDetailStatic } from '@/lib/microcms/server-client'
import { Announcement } from '@/lib/types/announcement'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import AnnouncementDetail from '@/components/AnnouncementDetail'
import Breadcrumb from '@/components/Breadcrumb'
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

  return (
    <main className="min-h-screen bg-white">
      <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-8 sm:py-12 md:py-24 lg:py-32">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'お知らせ', href: '/announcements' },
              { label: announcement.title },
            ]}
          />

          {/* Announcement Detail */}
          <AnnouncementDetail announcement={announcement} />
        </div>
      </section>
    </main>
  )
}

