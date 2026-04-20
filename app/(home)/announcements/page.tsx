import type { Metadata } from "next"
import JournalListRow from "@/components/home/JournalListRow"
import RevealOnScroll from "@/components/home/RevealOnScroll"
import { toNewsListItem } from "@/lib/home/adapters"
import { getLatestAnnouncements } from "@/lib/utils/announcement-server"

const ARCHIVE_LIMIT = 100

export const metadata: Metadata = {
  title: "Announcements — お知らせ · tsutsu",
  description:
    "サービス更新やメンテナンス情報など、これまでのお知らせを掲載しています。",
  alternates: { canonical: "/announcements" },
  openGraph: {
    title: "Announcements — お知らせ · tsutsu",
    description:
      "サービス更新やメンテナンス情報など、これまでのお知らせを掲載しています。",
    url: "/announcements",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Announcements — お知らせ · tsutsu",
    description:
      "サービス更新やメンテナンス情報など、これまでのお知らせを掲載しています。",
  },
}

export default async function AnnouncementsPage() {
  const announcements = await getLatestAnnouncements(ARCHIVE_LIMIT)
  const items = announcements.map(toNewsListItem)

  return (
    <main className="archive-page" data-style="modern">
      <header className="archive-page__head section-head section-head--hero">
        <div className="section-head__rule">
          <span>Archive</span>
          <span>News</span>
        </div>
        <div className="section-head__jp">
          <h1>Announcements.</h1>
          <p className="section-head__en">お知らせ</p>
        </div>
        <p className="section-head__lead">
          これまでのアップデートと、ちいさなお知らせ。
        </p>
      </header>

      <RevealOnScroll className="archive-page__body">
        {items.length === 0 ? (
          <p className="journal__empty">お知らせはまだありません。</p>
        ) : (
          <ul className="journal__news-list archive-page__list">
            {items.map((n) => (
              <JournalListRow
                key={n.id}
                variant="news"
                item={{
                  id: n.id,
                  title: n.title,
                  dateDisplay: n.dateDisplay,
                  chip: n.kind,
                  href: n.href,
                  image: n.image,
                }}
              />
            ))}
          </ul>
        )}
      </RevealOnScroll>
    </main>
  )
}
