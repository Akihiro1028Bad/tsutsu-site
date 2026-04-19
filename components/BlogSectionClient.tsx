'use client'

import ContentRow from '@/components/ContentRow'

interface BlogRowItem {
  id: string
  title: string
  href: string
  date: string
}

interface BlogSectionClientProps {
  items: BlogRowItem[]
  showHeading?: boolean
}

/**
 * ブログセクションのクライアントコンポーネント
 * ContentRowを使用してシンプルな日付+タイトルのリストを表示
 */
export default function BlogSectionClient({
  items,
  showHeading = true,
}: BlogSectionClientProps) {
  return (
    <section id="blog" className="bg-paper">
      {showHeading && <h2 className="h-section mb-8 text-[clamp(2rem,6vw,4rem)]">BLOG</h2>}
      <ul className="list-none">
        {items.map((item) => (
          <ContentRow
            key={item.id}
            date={item.date}
            title={item.title}
            href={item.href}
          />
        ))}
      </ul>
    </section>
  )
}
