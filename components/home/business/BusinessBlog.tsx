import Link from "next/link"
import SectionShell from "@/components/home/business/SectionShell"
import type { JournalBlogItem } from "@/lib/home/adapters"

interface BusinessBlogProps {
  readonly items: ReadonlyArray<JournalBlogItem>
}

/**
 * ブログ — technical notes. Text-only rows: thumbnails would add colour,
 * and on this page colour belongs to the work screenshots alone.
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
          <Link className="biz-row" href={item.href} key={item.id}>
            <span className="biz-row__date">{item.dateDisplay}</span>
            <span className="biz-row__title">{item.title}</span>
            <span className="biz-row__kind">{item.category}</span>
          </Link>
        ))
      )}
    </SectionShell>
  )
}
