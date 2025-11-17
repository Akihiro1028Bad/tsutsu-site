import { getLatestBlogPosts } from '@/lib/utils/blog-server'
import { mapBlogPostsToCardItems } from '@/lib/utils/blog'
import BlogSectionClient from '@/components/BlogSectionClient'
import BlogList from '@/components/BlogList'

/**
 * ブログセクションコンポーネント（サーバーコンポーネント）
 * トップページに最新のブログ記事を表示する
 * データフェッチングをサーバー側で行い、クライアントコンポーネントにデータを渡す
 */
export default async function BlogSection() {
  // 最新6件のブログ記事を取得
  const latestPosts = await getLatestBlogPosts(6)
  const blogCards = mapBlogPostsToCardItems(latestPosts)

  // 記事がない場合はセクションを非表示
  if (blogCards.length === 0) {
    return null
  }

  // クライアントコンポーネントにデータを渡す
  return (
    <BlogSectionClient>
      <BlogList posts={blogCards} />
    </BlogSectionClient>
  )
}

