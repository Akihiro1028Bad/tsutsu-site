import type { Metadata } from "next"
import Image from "next/image"
import RevealOnScroll from "@/components/home/RevealOnScroll"
import HeroSection from "@/components/home/HeroSection"
import HomeFooter from "@/components/home/HomeFooter"
import ContactForm from "@/components/home/ContactForm"
import { ABOUT } from "@/lib/home/about-data"
import { SERVICES } from "@/lib/home/services-data"
import {
  WORKS_FEATURED,
  WORKS_INDEX_HREF,
} from "@/lib/home/works-data"
import {
  toBlogListItem,
  toNewsListItem,
  type JournalBlogItem,
  type JournalNewsItem,
} from "@/lib/home/adapters"
import { getLatestAnnouncements } from "@/lib/utils/announcement-server"
import { getLatestBlogPosts } from "@/lib/utils/blog-server"

export const metadata: Metadata = {
  title: "Design A — Signposted Editorial · tsutsu",
  description: "Variant A preview of the editorial home.",
}

function GlanceStrip({ items }: { items: ReadonlyArray<string> }) {
  return (
    <div className="variant-a__glance">
      {items.map((item) => (
        <span key={item} className="variant-a__glance-cell">
          {item}
        </span>
      ))}
    </div>
  )
}

function SectionHead({
  number,
  title,
  ja,
  lead,
}: {
  number: string
  title: string
  ja: string
  lead: React.ReactNode
}) {
  return (
    <div className="section-head section-head--hero">
      <div className="section-head__rule">
        <span>{number}</span>
        <em aria-hidden="true" />
        <span>{title}</span>
      </div>
      <div className="section-head__jp">
        <h2>{title}.</h2>
        <p className="section-head__en">— {ja}</p>
      </div>
      <p className="section-head__lead">{lead}</p>
    </div>
  )
}

function JournalBlock({
  newsItems,
  blogItems,
}: {
  newsItems: ReadonlyArray<JournalNewsItem>
  blogItems: ReadonlyArray<JournalBlogItem>
}) {
  return (
    <RevealOnScroll className="journal__body">
      <div className="journal__news">
        <div className="journal__news-head">
          <span className="journal__label">
            <em>News.</em>
            <span className="journal__label-ja">お知らせ</span>
          </span>
        </div>
        {newsItems.length === 0 ? (
          <p className="journal__empty">お知らせは近日公開予定です。</p>
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
          <p className="journal__empty">ブログ記事は準備中です。</p>
        ) : (
          <ul className="journal__blog-list">
            {blogItems.map((b) => (
              <li key={b.id}>
                <a href={b.href}>
                  <span className="journal__date">{b.dateDisplay}</span>
                  <span className="journal__category">{b.category}</span>
                  <span className="journal__title">{b.title}</span>
                  <span className="journal__arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </RevealOnScroll>
  )
}

export default async function DesignAPage() {
  const [news, blogs] = await Promise.all([
    getLatestAnnouncements(4),
    getLatestBlogPosts(4),
  ])
  const newsItems = news.map(toNewsListItem)
  const blogItems = blogs.map(toBlogListItem)

  return (
    <main data-variant="a">
      <HeroSection />

      {/* Hero → Profile Strip */}
      <aside className="variant-a__profile-strip" aria-label="At a glance">
        <div className="variant-a__profile-cell">
          <span className="variant-a__profile-cell-label">Based in</span>
          <span className="variant-a__profile-cell-value">Tokyo, JP</span>
        </div>
        <div className="variant-a__profile-cell">
          <span className="variant-a__profile-cell-label">Freelance since</span>
          <span className="variant-a__profile-cell-value">2025</span>
        </div>
        <div className="variant-a__profile-cell">
          <span className="variant-a__profile-cell-label">Stack</span>
          <span className="variant-a__profile-cell-value">
            C# · PHP · TS · Next
          </span>
        </div>
        <div className="variant-a__profile-cell">
          <span className="variant-a__profile-cell-label">Available</span>
          <span className="variant-a__profile-cell-value">新規案件受付中</span>
        </div>
      </aside>

      {/* Works */}
      <section id="works" className="works">
        <SectionHead
          number="01"
          title="Works"
          ja="制作実績"
          lead={
            <>
              「これを、僕がつくりました」と
              <br />
              はっきり言える仕事を、ひとつずつ。
            </>
          }
        />
        <GlanceStrip
          items={["06 PROJECTS", "2021 — 2025", "JP / EN", "FULL-STACK"]}
        />
        <div className="works__list">
          {WORKS_FEATURED.map((work) => (
            <RevealOnScroll key={work.id} className="work-feature">
              <article className="work-feature__inner">
                <div className="work-feature__rail">
                  <div className="work-feature__num" aria-hidden="true">
                    {work.indexNumber}
                  </div>
                  <ul className="work-feature__meta">
                    {work.meta.map((m) => (
                      <li key={m.label}>
                        <span className="work-feature__meta-key">
                          {m.label}
                        </span>
                        <span className="work-feature__meta-value">
                          {m.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <figure className="work-feature__thumb">
                  <Image
                    src={work.image.src}
                    alt={work.image.alt}
                    width={work.image.width}
                    height={work.image.height}
                    sizes="(max-width: 900px) 100vw, 60vw"
                    loading="lazy"
                  />
                </figure>
                <div className="work-feature__body">
                  <h3 className="work-feature__title">
                    <em>{work.title}</em>
                    <span className="work-feature__title-ja">
                      {work.titleJa}
                    </span>
                  </h3>
                  <p className="work-feature__desc">{work.description}</p>
                  <div className="work-feature__stack">
                    {work.stack.map((tech) => (
                      <span key={tech} className="work-feature__chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
        <div className="works__all">
          <a className="works__all-link" href={WORKS_INDEX_HREF}>
            <span className="works__all-eyebrow">Index — all works</span>
            <span className="works__all-label">すべての制作事例を見る</span>
            <span className="works__all-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* Services (dark) */}
      <section id="services" className="services" data-theme="dark">
        <SectionHead
          number="02"
          title="Services"
          ja="サービス"
          lead={
            <>
              Webサイト、Webアプリ、自動化、
              <br />
              そしてキャリア伴走。4つの手触りで。
            </>
          }
        />
        <GlanceStrip
          items={["4 CATEGORIES", "REMOTE OK", "FROM ¥50K", "業務委託 / 単発"]}
        />
        <div className="services__list">
          {SERVICES.map((svc) => (
            <div key={svc.id} className="service-spread">
              <div className="service-spread__lhs">
                <span className="service-spread__name">
                  <em>{svc.nameJa}</em>
                </span>
                <span className="service-spread__meta">{svc.meta}</span>
              </div>
              <div className="service-spread__rhs">
                <p className="service-spread__tagline">{svc.tagline}</p>
                <p className="service-spread__body">{svc.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <SectionHead
          number="03"
          title="About"
          ja="プロフィール"
          lead={
            <>
              東京を拠点に、Webのプロダクトを
              <br />
              ひとりで通せるエンジニア。
            </>
          }
        />
        <dl className="variant-a__stats" aria-label="At a glance">
          <div className="variant-a__stat">
            <span className="variant-a__stat-value">4年</span>
            <span className="variant-a__stat-label">現場経験（消防）</span>
          </div>
          <div className="variant-a__stat">
            <span className="variant-a__stat-value">3年+</span>
            <span className="variant-a__stat-label">エンジニア経験</span>
          </div>
          <div className="variant-a__stat">
            <span className="variant-a__stat-value">2025</span>
            <span className="variant-a__stat-label">独立した年</span>
          </div>
        </dl>
        <RevealOnScroll className="about__body">
          <div className="about__name">
            <span className="about__name-ja">{ABOUT.name.ja}</span>
            <span className="about__name-en">
              {ABOUT.name.romanised} / <em>Tsutsu</em>
            </span>
          </div>
          {ABOUT.paragraphs.map((p, pi) => (
            <p key={pi} className="about-paragraph">
              {p.map((seg, si) =>
                seg.kind === "mark" ? (
                  <span key={si} className="mark">
                    {seg.value}
                  </span>
                ) : (
                  <span key={si}>{seg.value}</span>
                )
              )}
            </p>
          ))}
        </RevealOnScroll>
      </section>

      {/* Journal */}
      <section id="notes" className="journal">
        <SectionHead
          number="04"
          title="Journal"
          ja="お知らせ・ブログ"
          lead="速報とじっくり、ふたつの時間軸で。"
        />
        <GlanceStrip
          items={[
            `${newsItems.length} NEWS`,
            `${blogItems.length} POSTS`,
            "WEEKLY-ISH",
          ]}
        />
        <JournalBlock newsItems={newsItems} blogItems={blogItems} />
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <SectionHead
          number="05"
          title="Contact"
          ja="お問い合わせ"
          lead={
            <>
              ご相談、見積り、ちょっとした質問、
              <br />
              どれもお気軽にどうぞ。
            </>
          }
        />
        <GlanceStrip
          items={[
            "24 – 48H RESPONSE",
            "9 – 18 JST",
            "REMOTE OK",
            "JP / EN",
          ]}
        />
        <div className="contact__grid">
          <div className="contact__form-slot">
            <ContactForm />
          </div>
          <aside className="contact__aside">
            <dl className="contact__info">
              <div>
                <dt>
                  Services{" "}
                  <span className="contact__info-ja">事業内容</span>
                </dt>
                <dd>
                  Web開発・システム開発支援、<br />
                  エンジニア学習・キャリア支援
                </dd>
              </div>
              <div>
                <dt>
                  Area <span className="contact__info-ja">対応エリア</span>
                </dt>
                <dd>全国（リモート対応可能）</dd>
              </div>
              <div>
                <dt>
                  Location <span className="contact__info-ja">所在地</span>
                </dt>
                <dd>東京都港区六本木</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <HomeFooter />
    </main>
  )
}
