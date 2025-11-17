import ContentCard, { type ContentCardData } from './ContentCard'
import { formatDate, type BlogCardItem } from '@/lib/utils/blog'

interface BlogCardProps {
  post: BlogCardItem
}

export default function BlogCard({ post }: BlogCardProps) {
  const contentData: ContentCardData = {
    id: post.id,
    title: post.title,
    publishedAt: post.publishedAt,
    image: post.imageUrl
      ? {
          url: post.imageUrl,
          alt: post.title,
        }
      : undefined,
    excerpt: post.excerpt,
  }

  return (
    <ContentCard
      content={contentData}
      href={post.href}
      imageUrl={post.imageUrl}
      categoryName={post.categoryName}
      formatDate={formatDate}
    />
  )
}

