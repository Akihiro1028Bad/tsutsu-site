import Link from "next/link"
import SectionShell from "@/components/home/business/SectionShell"
import type { JournalNewsItem } from "@/lib/home/adapters"

interface BusinessNewsProps {
  readonly items: ReadonlyArray<JournalNewsItem>
}

/** お知らせ — microCMS announcements, newest first. */
export default function BusinessNews({ items }: BusinessNewsProps) {
  return (
    <SectionShell
      id="notes"
      title="お知らせ"
      caption="News"
      moreHref="/announcements"
      moreLabel="一覧を見る"
    >
      {items.length === 0 ? (
        <p className="biz-row__empty">現在お知らせはありません。</p>
      ) : (
        items.map((item) => (
          <Link className="biz-row" href={item.href} key={item.id}>
            <span className="biz-row__date">{item.dateDisplay}</span>
            <span className="biz-row__title">{item.title}</span>
            <span className="biz-row__kind">{item.kind}</span>
          </Link>
        ))
      )}
    </SectionShell>
  )
}
