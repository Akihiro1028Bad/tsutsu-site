import BusinessListRow from "@/components/home/business/BusinessListRow"
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
      more={{ href: "/announcements", label: "一覧を見る" }}
    >
      {items.length === 0 ? (
        <p className="biz-row__empty">現在お知らせはありません。</p>
      ) : (
        items.map((item) => (
          <BusinessListRow
            key={item.id}
            href={item.href}
            dateDisplay={item.dateDisplay}
            title={item.title}
            kind={item.kind}
            image={item.image}
          />
        ))
      )}
    </SectionShell>
  )
}
