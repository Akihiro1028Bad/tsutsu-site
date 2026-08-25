import BusinessListRow from "@/components/home/business/BusinessListRow"
import SectionShell from "@/components/home/business/SectionShell"
import type { JournalBlogItem } from "@/lib/home/adapters"

interface BusinessBlogProps {
  readonly items: ReadonlyArray<JournalBlogItem>
}

/**
 * ブログ — technical notes with their microCMS eyecatch.
 */
export default function BusinessBlog({ items }: BusinessBlogProps) {
  return (
    <SectionShell
      id="blog"
      title="ブログ"
      caption="Notes"
      moreHref="/blog"
      moreLabel="一覧を見る"
    >
      {items.length === 0 ? (
        <p className="biz-row__empty">記事はまだありません。</p>
      ) : (
        items.map((item) => (
          <BusinessListRow
            key={item.id}
            href={item.href}
            dateDisplay={item.dateDisplay}
            title={item.title}
            kind={item.category}
            image={item.image}
          />
        ))
      )}
    </SectionShell>
  )
}
