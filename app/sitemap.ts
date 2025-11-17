import type { MetadataRoute } from 'next'
import { getList } from '@/lib/microcms/client'
import { BlogPost } from '@/lib/types/blog'
import { handleMicroCMSError } from '@/lib/utils/error-handler'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tsutsu.dev'
  let latestContentDate: Date | null = null
  const dynamicEntries: MetadataRoute.Sitemap = []

  // ブログ記事を追加
  try {
    const blogData = await getList<BlogPost>('blog', {
      filters: 'publishedAt[exists]',
      limit: 100,
      fields: 'slug,publishedAt,revisedAt',
    })

    blogData.contents.forEach((post) => {
      const lastModified = new Date(post.revisedAt || post.publishedAt)
      if (!latestContentDate || lastModified > latestContentDate) {
        latestContentDate = lastModified
      }

      dynamicEntries.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  } catch (error) {
    // 統一的なエラーハンドリングを使用
    handleMicroCMSError(error, {
      onBuildTimeNetworkError: () => {
        console.warn('サイトマップ生成時にブログ記事の取得に失敗しました（ビルド時）。ブログ記事はサイトマップに含まれません。')
      },
      onRuntimeError: () => {
        console.error('サイトマップ生成時にブログ記事の取得に失敗しました:', error)
      },
    })
    // エラーが発生してもサイトマップ生成は継続（ブログ記事なしで）
  }

  const referenceDate = latestContentDate ?? new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: referenceDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: referenceDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/announcements`,
      lastModified: referenceDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  return [...staticEntries, ...dynamicEntries]
}

