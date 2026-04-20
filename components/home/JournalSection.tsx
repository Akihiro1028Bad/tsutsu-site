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
          <span>04</span>
          <span>Journal</span>
        </div>
        <div className="section-head__jp">
          <h2>Journal.</h2>
          <p className="section-head__en">お知らせ・ブログ</p>
        </div>
        <p className="section-head__lead">
          速報とじっくり、ふたつの時間軸で。
        </p>
      </div>

      <RevealOnScroll className="journal__body">
        <div className="journal__news">
          <div className="journal__news-head">
            <span className="journal__label">
              <em>News.</em>
              <span className="journal__label-ja">お知らせ</span>
            </span>
          </div>
          {newsItems.length === 0 ? (
            <p className="journal__empty" data-testid="news-empty">
              お知らせは近日公開予定です。
            </p>
          ) : (
            <ul className="journal__news-list">
              {newsItems.map((n) => (
                <li key={n.id}>
                  <a href={n.href}>
                    <span className="journal__date">{n.dateDisplay}</span>
                    <span className="journal__kind">{n.kind}</span>
                    <span className="journal__title">{n.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
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
                <li key={b.id}>
                  <a href={b.href}>
                    <span className="journal__date">{b.dateDisplay}</span>
                    <span className="journal__category">{b.category}</span>
                    <span className="journal__title">{b.title}</span>
                    <span className="journal__arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </RevealOnScroll>
    </section>
  )
}
