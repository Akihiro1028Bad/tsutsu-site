import { Suspense } from 'react'
import { cache } from 'react'
import { connection } from 'next/server'
import { cacheTag, cacheLife } from 'next/cache'
import { getDetailDynamic } from '@/lib/microcms/server-client'
import { Announcement } from '@/lib/types/announcement'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import AnnouncementDetail from '@/components/AnnouncementDetail'
import Breadcrumb from '@/components/Breadcrumb'
import PreviewBanner from '@/components/PreviewBanner'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

/**
 * IDでお知らせを取得するヘルパー関数（プレビュー用、メモ化）
 */
const getAnnouncementByIdWithDraft = cache(async (
  id: string,
  draftKey: string
): Promise<Announcement> => {
  'use cache: remote'
  cacheTag(`announcement:${id}:preview:${draftKey}`)
  cacheLife({ expire: 60 })

  return getDetailDynamic<Announcement>('announcements', id, {
    draftKey,
  })
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
        console.warn('ビルド時にお知らせの取得に失敗しました。notFound()を呼び出します。')
      },
      onNotFound: () => {},
      onRuntimeError: () => {
        console.error('お知らせの取得に失敗しました:', error)
      },
    })

    if (errorResult.isNotFound || errorResult.isBuildTimeNetworkError) {
      notFound()
    }

    if (errorResult.shouldThrow) {
      throw new Error('お知らせの取得に失敗しました。しばらくしてから再度お試しください。')
    }

    notFound()
  }

  return (
    <>
      <PreviewBanner />
      <main className="min-h-screen bg-white">
        <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-8 sm:py-12 md:py-24 lg:py-32">
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
            <Breadcrumb
              items={[
                { label: 'お知らせ', href: '/announcements' },
                { label: announcement.title },
              ]}
            />

            <AnnouncementDetail announcement={announcement} />
          </div>
        </section>
      </main>
    </>
  )
}

function PreviewAnnouncementLoading() {
  return (
    <>
      <PreviewBanner />
      <main className="min-h-screen bg-white">
        <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-12 md:py-32">
          <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
            <div className="mb-8">
              <div className="h-5 w-32 bg-slate-200/40 rounded animate-pulse" />
            </div>

            <article className="max-w-4xl mx-auto">
              <header className="mb-8 sm:mb-12">
                <div className="h-4 w-24 bg-slate-200/40 rounded animate-pulse mb-4" />
                <div className="h-10 sm:h-12 md:h-16 w-full bg-slate-200/40 rounded animate-pulse mb-6" />
                <div className="h-4 w-32 bg-slate-200/40 rounded animate-pulse" />
              </header>

              <div className="space-y-4">
                <div className="h-4 w-full bg-slate-200/40 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-200/40 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-slate-200/40 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-200/40 rounded animate-pulse mt-8" />
                <div className="h-4 w-full bg-slate-200/40 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-slate-200/40 rounded animate-pulse" />
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'プレビュー | お知らせ',
    robots: {
      index: false,
      follow: false,
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


