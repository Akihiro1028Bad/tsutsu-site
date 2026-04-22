import type { Metadata } from "next"
import JournalListRow from "@/components/home/JournalListRow"
import RevealOnScroll from "@/components/home/RevealOnScroll"
import { toBlogListItem } from "@/lib/home/adapters"
import { getLatestBlogPosts } from "@/lib/utils/blog-server"

const ARCHIVE_LIMIT = 100

export const metadata: Metadata = {
  title: "Notes — ブログ · tsutsu",
  description:
    "Web・システム開発や業務改善に関するノウハウ、ふだん考えていることの記録。",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Notes — ブログ · tsutsu",
    description:
      "Web・システム開発や業務改善に関するノウハウ、ふだん考えていることの記録。",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Notes — ブログ · tsutsu",
    description:
      "Web・システム開発や業務改善に関するノウハウ、ふだん考えていることの記録。",
  },
}

export default async function BlogPage() {
  const posts = await getLatestBlogPosts(ARCHIVE_LIMIT)
  const items = posts.map(toBlogListItem)

  return (
    <main className="archive-page" data-style="modern">
      <header className="archive-page__head section-head section-head--hero">
        <div className="section-head__rule">
          <span>Archive</span>
          <span>Notes</span>
        </div>
        <div className="section-head__jp">
          <h1>Notes.</h1>
          <p className="section-head__en">ブログ</p>
        </div>
        <p className="section-head__lead">
          ふだん考えていること、書き留めたもの。
        </p>
      </header>

      <RevealOnScroll className="archive-page__body">
        {items.length === 0 ? (
          <p className="journal__empty">記事はまだありません。</p>
        ) : (
          <ul className="journal__blog-list archive-page__list">
            {items.map((b) => (
              <JournalListRow
                key={b.id}
                variant="blog"
                item={{
                  id: b.id,
                  title: b.title,
                  dateDisplay: b.dateDisplay,
                  chip: b.category,
                  href: b.href,
                  image: b.image,
                }}
              />
            ))}
          </ul>
        )}
      </RevealOnScroll>
    </main>
  )
}
