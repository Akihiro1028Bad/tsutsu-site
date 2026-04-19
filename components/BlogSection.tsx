import { getLatestBlogPosts } from '@/lib/utils/blog-server'
import { mapBlogPostsToCardItems } from '@/lib/utils/blog'
import BlogSectionClient from '@/components/BlogSectionClient'

interface BlogSectionProps {
  showHeading?: boolean
}

/**
 * ブログセクションコンポーネント（サーバーコンポーネント）
 * トップページに最新のブログ記事を表示する
 * データフェッチングをサーバー側で行い、クライアントコンポーネントにデータを渡す
 */
export default async function BlogSection({
  showHeading = true,
}: BlogSectionProps = {}) {
  // 最新件のブログ記事を取得（表示は3件にキャップ）
  const latestPosts = await getLatestBlogPosts(6)
  const blogCards = mapBlogPostsToCardItems(latestPosts)

  // 記事がない場合はセクションを非表示
  if (blogCards.length === 0) {
    return null
  }

  // 表示は3件までにキャップ
  const items = blogCards.slice(0, 3).map((p) => ({
    id: p.id,
    title: p.title,
    href: p.href,
    date: p.publishedAt.slice(0, 10),
  }))

  return <BlogSectionClient items={items} showHeading={showHeading} />
}
