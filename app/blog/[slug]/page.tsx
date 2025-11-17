import { cache } from 'react'
import { cacheTag, cacheLife } from 'next/cache'
import { getListStatic } from '@/lib/microcms/server-client'
import { BlogPost } from '@/lib/types/blog'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import { getOptimizedImageUrl } from '@/lib/utils/blog'
import { generateMetaDescription } from '@/lib/utils/text'
import BlogDetail from '@/components/BlogDetail'
import Breadcrumb from '@/components/Breadcrumb'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { IMAGE_CONFIG, CONTENT_CONFIG, METADATA_CONFIG } from '@/lib/constants/config'

/**
 * slugでブログ記事を取得するヘルパー関数（メモ化）
 * React cacheを使用して、generateMetadataとBlogDetailPageでの重複リクエストを防止
 * microCMSではslugで直接取得できないため、フィルタリングを使用
 * 
 * @param slug - ブログ記事のスラッグ
 * @param draftKey - 下書きキー（プレビュー用、オプション）
 * @returns ブログ記事データ
 */
const getBlogPostBySlug = cache(async (
  slug: string,
  draftKey?: string
): Promise<BlogPost> => {
  'use cache'
  cacheTag(`blog:${slug}`)
  cacheLife('hours') // 1時間キャッシュ

  const queries: Parameters<typeof getListStatic>[1] = {
    filters: `slug[equals]${slug}`,
    limit: 1,
  }

  // プレビューモードの場合はdraftKeyを追加
  if (draftKey) {
    queries.draftKey = draftKey
  }

  const data = await getListStatic<BlogPost>('blog', queries)

  if (data.contents.length === 0) {
    throw new Error('Blog post not found')
  }

  return data.contents[0]
})

/**
 * 全ブログ記事のslugを取得して静的生成
 */
export async function generateStaticParams() {
  'use cache'
  cacheTag('blog:static-params')
  cacheLife('hours') // 1時間キャッシュ

  try {
    const data = await getListStatic<BlogPost>('blog', {
      filters: 'publishedAt[exists]',
      limit: CONTENT_CONFIG.LIST_PAGE_LIMIT,
      fields: 'slug', // slugのみ取得してパフォーマンス最適化
    })

    return data.contents.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    // 統一的なエラーハンドリングを使用
    handleMicroCMSError(error, {
      onBuildTimeNetworkError: () => {
        console.warn('ビルド時にブログ記事一覧の取得に失敗しました。空配列を返します。')
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

/**
 * 動的メタデータを生成
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  let post: BlogPost

  try {
    // slugで記事を取得
    post = await getBlogPostBySlug(slug)
  } catch (error) {
    return {
      title: '記事が見つかりません | tsutsu Blog',
      description: 'お探しのブログ記事は見つかりませんでした。',
    }
  }

  if (!post || !post.publishedAt) {
    return {
      title: '記事が見つかりません | tsutsu Blog',
      description: 'お探しのブログ記事は見つかりませんでした。',
    }
  }

  const canonicalPath = `/blog/${slug}`
  const title = `${post.title} | tsutsu Blog`
  // メタデータ用の説明文を生成（文の途中で切れないように調整）
  const description = generateMetaDescription(post.content, METADATA_CONFIG.DESCRIPTION_MAX_LENGTH)

  // OGP画像用のURLを生成（heroフィールドがある場合）
  const ogImageUrl = post.hero?.url
    ? getOptimizedImageUrl(post.hero.url, {
        width: IMAGE_CONFIG.OGP.width,
        height: IMAGE_CONFIG.OGP.height,
        format: IMAGE_CONFIG.OGP.format,
        quality: IMAGE_CONFIG.OGP.quality,
      })
    : undefined

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalPath,
      publishedTime: post.publishedAt,
      modifiedTime: post.revisedAt || post.updatedAt,
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: IMAGE_CONFIG.OGP.width,
            height: IMAGE_CONFIG.OGP.height,
            alt: post.hero?.alt || post.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@tsutsu_dev',
      ...(ogImageUrl && {
        images: [ogImageUrl],
      }),
    },
  }
}

/**
 * ブログ詳細ページコンポーネント
 */
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post: BlogPost

  try {
    post = await getBlogPostBySlug(slug)
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

    // エラー処理が完了したが、記事が見つからない場合はnotFound()を呼び出す
    notFound()
  }

  // 公開済みかどうかの確認
  if (!post.publishedAt) {
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
              { label: 'ブログ', href: '/blog' },
              { label: post.title },
            ]}
          />

          {/* Blog Detail */}
          <BlogDetail post={post} />
        </div>
      </section>
    </main>
  )
}

