import { Suspense } from 'react'
import { cache } from 'react'
import { connection } from 'next/server'
import { cacheTag, cacheLife } from 'next/cache'
import { getDetailDynamic } from '@/lib/microcms/server-client'
import { Announcement } from '@/lib/types/announcement'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import ArticleBody from '@/components/ArticleBody'
import AnnouncementDetail from '@/components/AnnouncementDetail'
import PreviewBanner from '@/components/PreviewBanner'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const getAnnouncementByIdWithDraft = cache(async (
  id: string,
  draftKey: string,
): Promise<Announcement> => {
  'use cache: remote'
  cacheTag(`announcement:${id}:preview:${draftKey}`)
  cacheLife({ expire: 60 })

  return getDetailDynamic<Announcement>('announcements', id, { draftKey })
})

async function PreviewAnnouncementContent({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ draftKey?: string }>
}) {
  await connection()

  const { id } = await params
  const { draftKey } = await searchParams

  if (!draftKey) {
    notFound()
  }

  let announcement: Announcement

  try {
    announcement = await getAnnouncementByIdWithDraft(id, draftKey)
  } catch (error) {
    const errorResult = handleMicroCMSError(error, {
      onBuildTimeNetworkError: () => {
        console.warn('ビルド時にお知らせ下書きの取得に失敗しました。notFound を呼び出します。')
      },
      onNotFound: () => {},
      onRuntimeError: () => {
        console.error('お知らせ下書きの取得に失敗しました:', error)
      },
    })

    if (errorResult.isNotFound || errorResult.isBuildTimeNetworkError) {
      notFound()
    }

    if (errorResult.shouldThrow) {
      throw new Error('お知らせ下書きの取得に失敗しました。しばらくしてから再度お試しください。')
    }

    notFound()
  }

  return (
    <>
      <PreviewBanner />
      <ArticleBody isPreview>
        <AnnouncementDetail announcement={announcement} />
      </ArticleBody>
    </>
  )
}

function PreviewAnnouncementLoading() {
  return (
    <>
      <PreviewBanner />
      <ArticleBody isPreview>
        <div className="article-skeleton" aria-hidden="true">
          <div className="article-skeleton__kicker" />
          <div className="article-skeleton__title" />
          <div className="article-skeleton__meta" />
          <div className="article-skeleton__row" />
          <div className="article-skeleton__row" />
          <div className="article-skeleton__row article-skeleton__row--short" />
        </div>
      </ArticleBody>
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'プレビュー | お知らせ',
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
  }
}

export default function PreviewAnnouncementDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ draftKey?: string }>
}) {
  return (
    <Suspense fallback={<PreviewAnnouncementLoading />}>
      <PreviewAnnouncementContent params={params} searchParams={searchParams} />
    </Suspense>
  )
}
