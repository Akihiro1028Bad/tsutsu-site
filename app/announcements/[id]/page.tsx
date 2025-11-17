import { getList, getDetail } from '@/lib/microcms/client'
import { Announcement, AnnouncementListResponse } from '@/lib/types/announcement'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import AnnouncementDetail from '@/components/AnnouncementDetail'
import Breadcrumb from '@/components/Breadcrumb'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  try {
    const data = await getList<Announcement>('announcements', {
      filters: 'publishedAt[exists]',
      limit: 100,
    })

    return data.contents.map((announcement) => ({
      id: announcement.id,
    }))
  } catch (error) {
    // 統一的なエラーハンドリングを使用
    handleMicroCMSError(error, {
      onBuildTimeNetworkError: () => {
        console.warn('ビルド時にお知らせ一覧の取得に失敗しました。空配列を返します。')
      },
      onRuntimeError: () => {
        // generateStaticParamsはビルド時のみ実行されるため、ここには到達しない
        console.error('予期しないエラー（generateStaticParams）:', error)
      },
    })

    // ビルド時のエラーは空配列を返してビルドを継続
    return []
  }
}

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let announcement: Announcement

  try {
    announcement = await getDetail<Announcement>('announcements', id)
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

