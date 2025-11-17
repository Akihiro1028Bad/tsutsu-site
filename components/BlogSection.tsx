import { getLatestBlogPosts } from '@/lib/utils/blog'
import BlogSectionClient from '@/components/BlogSectionClient'

/**
 * ブログセクションコンポーネント（サーバーコンポーネント）
 * トップページに最新のブログ記事を表示する
 * データフェッチングをサーバー側で行い、クライアントコンポーネントにデータを渡す
 */
export default async function BlogSection() {
  // 最新6件のブログ記事を取得
  const latestPosts = await getLatestBlogPosts(6)

  // 記事がない場合はセクションを非表示
  if (latestPosts.length === 0) {
    return null
  }

  // クライアントコンポーネントにデータを渡す
  return <BlogSectionClient posts={latestPosts} />
}

