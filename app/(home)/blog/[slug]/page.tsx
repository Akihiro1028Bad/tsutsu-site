import { cache } from 'react'
import { cacheTag, cacheLife } from 'next/cache'
import { getListStatic } from '@/lib/microcms/server-client'
import { BlogPost } from '@/lib/types/blog'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import { getOptimizedImageUrl } from '@/lib/utils/blog'
import { generateMetaDescription } from '@/lib/utils/text'
import ArticleBody from '@/components/ArticleBody'
import BlogDetail from '@/components/BlogDetail'
import type { ArticleSibling } from '@/components/ContentDetail'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { IMAGE_CONFIG, CONTENT_CONFIG, METADATA_CONFIG } from '@/lib/constants/config'

/**
 * Fetches published blog slugs + titles (newest first) for sibling nav.
 */
const getBlogSiblingList = cache(async () => {
  'use cache'
  cacheTag('blog:siblings')
  cacheLife('hours')

  try {
    const data = await getListStatic<BlogPost>('blog', {
      filters: 'publishedAt[exists]',
      orders: '-publishedAt',
      fields: 'slug,title,publishedAt',
      limit: 100,
    })
    return data.contents
  } catch {
    return []
  }
})

function pickSiblings(
  list: ReadonlyArray<{ slug: string; title: string }>,
  currentSlug: string
): { older?: ArticleSibling; newer?: ArticleSibling } {
  const idx = list.findIndex((item) => item.slug === currentSlug)
  if (idx === -1) {
    return {}
  }
  const newer = idx > 0 ? list[idx - 1] : null
  const older = idx < list.length - 1 ? list[idx + 1] : null
  return {
    ...(newer
      ? { newer: { href: `/blog/${newer.slug}`, title: newer.title } }
      : {}),
    ...(older
      ? { older: { href: `/blog/${older.slug}`, title: older.title } }
      : {}),
  }
}

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

const PLACEHOLDER_SLUG = '__placeholder__' as const

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

    const params = data.contents
      .filter((post) => post.slug)
      .map((post) => ({
        slug: post.slug,
      }))

    if (params.length === 0) {
      console.warn(
        '公開済みのブログ記事が0件のため、プレースホルダーslugを返します。'
      )
      return [{ slug: PLACEHOLDER_SLUG }]
    }

    return params
  } catch (error) {
    const errorResult = handleMicroCMSError(error, {
      onBuildTimeNetworkError: () => {
        console.warn(
          'ビルド時にブログ記事一覧の取得に失敗しました。プレースホルダーslugを返します。'
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
      return [{ slug: PLACEHOLDER_SLUG }]
    }

    throw error instanceof Error
      ? error
      : new Error('ブログ記事一覧の取得に失敗しました。')
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
  if (slug === PLACEHOLDER_SLUG) {
    return {
      title: '記事が見つかりません | tsutsu Blog',
      description: 'お探しのブログ記事は見つかりませんでした。',
    }
  }
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
  if (slug === PLACEHOLDER_SLUG) {
    notFound()
  }
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

  const siblingList = await getBlogSiblingList()
  const siblings = pickSiblings(siblingList, slug)

  return (
    <ArticleBody>
      <BlogDetail post={post} siblings={siblings} />
    </ArticleBody>
  )
}

