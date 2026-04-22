import Script from 'next/script'
import { BlogPost } from '@/lib/types/blog'
import { formatDate, getCategoryName, getHeroImageUrl } from '@/lib/utils/blog'
import { estimateReadingTimeMin } from '@/lib/utils/reading-time'
import { generateMetaDescription } from '@/lib/utils/text'
import ContentDetail, {
  type ArticleSibling,
  type ContentDetailData,
} from './ContentDetail'

interface BlogDetailProps {
  post: BlogPost
  siblings?: {
    readonly older?: ArticleSibling
    readonly newer?: ArticleSibling
  }
  /**
   * Draft-preview surface — when true the JSON-LD BlogPosting structured
   * data is suppressed so crawlers that bypass meta robots cannot index
   * unpublished content via the structured data sidecar.
   */
  isPreview?: boolean
}

/**
 * ブログ記事詳細コンポーネント（Server Component）
 *
 * 機能:
 * - microCMSのHTMLコンテンツを表示
 * - コードブロックのシンタックスハイライト処理
 * - XSS対策（DOMPurify）
 */
export default async function BlogDetail({ post, siblings, isPreview }: BlogDetailProps) {
  const categoryName = getCategoryName(post.category)
  const heroImageUrl = getHeroImageUrl(post.hero)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tsutsu.dev'
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`
  
  const contentData: ContentDetailData = {
    id: post.id,
    title: post.title,
    content: post.content,
    publishedAt: post.publishedAt,
    category: post.category,
    image: post.hero,
    embedHtml: post.embedHtml,
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: canonicalUrl,
    headline: post.title,
    description: generateMetaDescription(contentData.content, 160),
    image: heroImageUrl || `${siteUrl}/logo.png`,
    author: {
      '@type': 'Person',
      name: '堤 暁寛',
    },
    publisher: {
      '@type': 'Organization',
      name: 'tsutsu',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.revisedAt || post.updatedAt || post.publishedAt,
  }

  return (
    <>
      {!isPreview && <Script
        id={`blog-post-structured-data-${post.id}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />}
      <ContentDetail
        content={contentData}
        imageUrl={heroImageUrl}
        categoryName={categoryName}
        formatDate={formatDate}
        kicker="Notes."
        archive={{ href: "/blog", label: "記事一覧へ戻る" }}
        siblings={siblings}
        readingTimeMin={estimateReadingTimeMin(post.content)}
      />
    </>
  )
}

