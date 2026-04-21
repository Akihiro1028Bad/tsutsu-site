import { Suspense } from 'react'
import { connection } from 'next/server'
import { unstable_noStore as noStore } from 'next/cache'
import { getListNoStore } from '@/lib/microcms/server-client'
import { BlogPost } from '@/lib/types/blog'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import ArticleBody from '@/components/ArticleBody'
import BlogDetail from '@/components/BlogDetail'
import PreviewBanner from '@/components/PreviewBanner'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

/**
 * slug でブログ下書きを取得（プレビュー専用、memoised）。
 */
async function getBlogPostBySlugWithDraft(
  slug: string,
  draftKey: string,
): Promise<BlogPost> {
  const data = await getListNoStore<BlogPost>('blog', {
    filters: `slug[equals]${slug}`,
    limit: 1,
    draftKey,
  })

  if (data.contents.length === 0) {
    throw new Error('Blog post not found')
  }

  return data.contents[0]
}

async function PreviewBlogContent({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ draftKey?: string }>
}) {
  await connection()
  noStore()

  const { slug } = await params
  const { draftKey } = await searchParams

  if (!draftKey) {
    notFound()
  }

  let post: BlogPost

  try {
    post = await getBlogPostBySlugWithDraft(slug, draftKey)
  } catch (error) {
    const errorResult = handleMicroCMSError(error, {
      onBuildTimeNetworkError: () => {
        console.warn('ビルド時にブログ下書きの取得に失敗しました。notFound を呼び出します。')
      },
      onNotFound: () => {},
      onRuntimeError: () => {
        console.error('ブログ下書きの取得に失敗しました:', error)
      },
    })

    if (errorResult.isNotFound || errorResult.isBuildTimeNetworkError) {
      notFound()
    }

    if (errorResult.shouldThrow) {
      throw new Error('ブログ下書きの取得に失敗しました。しばらくしてから再度お試しください。')
    }

    notFound()
  }

  return (
    <>
      <PreviewBanner />
      <ArticleBody isPreview>
        <BlogDetail post={post} isPreview />
      </ArticleBody>
    </>
  )
}

/**
 * Lightweight skeleton matching the new article-page chrome — no grid
 * background, no Tailwind min-h-screen wrapper. Keeps visual continuity
 * with the production route while the draft is fetched.
 */
function PreviewBlogLoading() {
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
    title: `プレビュー | tsutsu Blog`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
  }
}

export default function PreviewBlogDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ draftKey?: string }>
}) {
  return (
    <Suspense fallback={<PreviewBlogLoading />}>
      <PreviewBlogContent params={params} searchParams={searchParams} />
    </Suspense>
  )
}
