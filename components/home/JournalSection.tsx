import Link from "next/link"
import CountUp from "@/components/motion/CountUp"
import MagneticLink from "@/components/motion/MagneticLink"
import JournalListRow from "@/components/home/JournalListRow"
import RevealOnScroll from "@/components/home/RevealOnScroll"
import type {
  JournalBlogItem,
  JournalNewsItem,
} from "@/lib/home/adapters"

interface JournalSectionProps {
  readonly newsItems: ReadonlyArray<JournalNewsItem>
  readonly blogItems: ReadonlyArray<JournalBlogItem>
}

export default function JournalSection({
  newsItems,
  blogItems,
}: JournalSectionProps) {
  return (
    <section id="notes" className="journal">
      <div className="section-head section-head--hero">
        <div className="section-head__rule">
          <span>
            <CountUp end={4} pad={2} duration={900} />
          </span>
          <span>Journal</span>
        </div>
        <div className="section-head__jp">
          <h2>Journal.</h2>
          <p className="section-head__en">お知らせ・ブログ</p>
        </div>
        <p className="section-head__lead">
          お知らせと、ブログの記事一覧。
        </p>
      </div>

      <RevealOnScroll className="journal__body">
        <div className="journal__news">
          <div className="journal__news-head">
            <span className="journal__label">
              <em>News.</em>
            </span>
            <span className="journal__label-ja">お知らせ</span>
          </div>
          {newsItems.length === 0 ? (
            <p className="journal__empty" data-testid="news-empty">
              お知らせは近日公開予定です。
            </p>
          ) : (
            <ul className="journal__news-list">
              {newsItems.map((n) => (
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
          <div className="journal__more">
            <MagneticLink strength={0.2} max={10}>
              <Link className="journal__more-link" href="/announcements">
                <span className="journal__more-eyebrow">Archive</span>
                <span className="journal__more-label">すべてのお知らせを見る</span>
                <span className="journal__more-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </MagneticLink>
          </div>
        </div>

        <div className="journal__blog">
          <div className="journal__blog-head">
            <span className="journal__label">
              <em>Blog.</em>
            </span>
            <span className="journal__label-ja">ブログ</span>
          </div>
          {blogItems.length === 0 ? (
            <p className="journal__empty" data-testid="blog-empty">
              ブログ記事は準備中です。
            </p>
          ) : (
            <ul className="journal__blog-list">
              {blogItems.map((b) => (
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
          <div className="journal__more">
            <MagneticLink strength={0.2} max={10}>
              <Link className="journal__more-link" href="/blog">
                <span className="journal__more-eyebrow">Archive</span>
                <span className="journal__more-label">すべての記事を見る</span>
                <span className="journal__more-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </MagneticLink>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
