'use client'

import { BlogPost } from '@/lib/types/blog'
import { formatDate, getCategoryName, getCardImageUrl, getExcerpt } from '@/lib/utils/blog'
import ContentCard, { type ContentCardData } from './ContentCard'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const categoryName = getCategoryName(post.category)
  const cardImageUrl = getCardImageUrl(post.hero)

  const contentData: ContentCardData = {
    id: post.id,
    title: post.title,
    publishedAt: post.publishedAt,
    category: post.category,
    image: post.hero,
    excerpt: getExcerpt(post.content),
  }

  return (
    <ContentCard
      content={contentData}
      href={`/blog/${post.slug}`}
      imageUrl={cardImageUrl}
      categoryName={categoryName}
      formatDate={formatDate}
    />
  )
}

