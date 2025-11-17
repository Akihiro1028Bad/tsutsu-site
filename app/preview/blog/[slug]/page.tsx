import { Suspense } from 'react'
import { connection } from 'next/server'
import { getList } from '@/lib/microcms/client'
import { BlogPost } from '@/lib/types/blog'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import BlogDetail from '@/components/BlogDetail'
import Breadcrumb from '@/components/Breadcrumb'
import PreviewBanner from '@/components/PreviewBanner'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

/**
 * slugでブログ記事を取得するヘルパー関数（プレビュー用）
 * microCMSではslugで直接取得できないため、フィルタリングを使用
 * 
 * @param slug - ブログ記事のスラッグ
 * @param draftKey - 下書きキー（必須）
 * @returns ブログ記事データ
 */
async function getBlogPostBySlugWithDraft(
  slug: string,
  draftKey: string
): Promise<BlogPost> {
  const data = await getList<BlogPost>('blog', {
    filters: `slug[equals]${slug}`,
    limit: 1,
    draftKey, // 下書きキーを指定
  })

  if (data.contents.length === 0) {
    throw new Error('Blog post not found')
  }

  return data.contents[0]
}

/**
 * プレビューコンテンツコンポーネント（動的データフェッチ用）
 * Suspenseでラップされる
 * paramsとsearchParamsをPromiseとして受け取り、内部でawaitする
 * connection()を呼び出して動的レンダリングを明示的にマーク
 */
async function PreviewBlogContent({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ draftKey?: string }>
}) {
  // 動的レンダリングを明示的にマーク
  await connection()
  
  const { slug } = await params
  const { draftKey } = await searchParams

  // draftKeyが必須
  if (!draftKey) {
    notFound()
  }
  let post: BlogPost

  try {
    post = await getBlogPostBySlugWithDraft(slug, draftKey)
  } catch (error) {
    const errorResult = handleMicroCMSError(error, {
      onBuildTimeNetworkError: () => {
        console.warn('ビルド時にブログ記事の取得に失敗しました。notFound()を呼び出します。')
      },
      onNotFound: () => {
        // 404エラーの場合はnotFound()を呼び出す
      },
      onRuntimeError: () => {
        console.error('ブログ記事の取得に失敗しました:', error)
      },
    })

    // 404エラーまたはビルド時のネットワークエラーの場合
    if (errorResult.isNotFound || errorResult.isBuildTimeNetworkError) {
      notFound()
    }

    // その他のエラーはthrowしてerror.tsxで処理
    if (errorResult.shouldThrow) {
      throw new Error('ブログ記事の取得に失敗しました。しばらくしてから再度お試しください。')
    }

    notFound()
  }

  return (
    <>
      <PreviewBanner />
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
                { label: 'ブログ', href: '/blog' },
                { label: post.title },
              ]}
            />

            {/* Blog Detail */}
            <BlogDetail post={post} />
          </div>
        </section>
      </main>
    </>
  )
}

/**
 * ローディングフォールバック
 */
function PreviewBlogLoading() {
  return (
    <>
      <PreviewBanner />
      <main className="min-h-screen bg-white">
        <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-12 md:py-32">
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

          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
            {/* Breadcrumb Skeleton */}
            <div className="mb-8">
              <div className="h-5 w-32 bg-slate-200/40 rounded animate-pulse" />
            </div>

            {/* Article Skeleton */}
            <article className="max-w-4xl mx-auto">
              <header className="mb-8 sm:mb-12">
                <div className="h-4 w-24 bg-slate-200/40 rounded animate-pulse mb-4" />
                <div className="h-10 sm:h-12 md:h-16 w-full bg-slate-200/40 rounded animate-pulse mb-6" />
                <div className="h-4 w-32 bg-slate-200/40 rounded animate-pulse" />
              </header>

              {/* Content Skeleton */}
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

/**
 * 動的メタデータを生成（プレビュー用）
 * プレビューページは常に動的レンダリングのため、シンプルなメタデータを返す
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `プレビュー | tsutsu Blog`,
    robots: {
      index: false, // プレビューページはインデックスしない
      follow: false,
    },
  }
}

/**
 * ブログプレビューページコンポーネント
 * paramsとsearchParamsへのアクセスをSuspenseでラップして動的レンダリングを許可
 */
export default function PreviewBlogDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ draftKey?: string }>
}) {
  // Suspenseでラップして動的データフェッチを許可
  // paramsとsearchParamsはPromiseとして子コンポーネントに渡す
  return (
    <Suspense fallback={<PreviewBlogLoading />}>
      <PreviewBlogContent params={params} searchParams={searchParams} />
    </Suspense>
  )
}

