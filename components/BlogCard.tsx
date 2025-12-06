import ContentCardMobile from './ContentCardMobile'
import ContentCardDesktop from './ContentCardDesktop'
import { type ContentCardData } from './ContentCard'
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

  // Server Component側で日付をフォーマット（関数を渡さない）
  const formattedDate = formatDate(post.publishedAt)

  const commonProps = {
    content: contentData,
    href: post.href,
    imageUrl: post.imageUrl,
    categoryName: post.categoryName,
    formattedDate,
  }

  return (
    <>
      {/* モバイル: 案11（ミニマルリスト + セパレーター） */}
      <div className="md:hidden">
        <ContentCardMobile {...commonProps} />
      </div>
      {/* PC: 案4（インタラクティブ + 強化アニメーション） */}
      <div className="hidden md:block">
        <ContentCardDesktop {...commonProps} />
      </div>
    </>
  )
}

