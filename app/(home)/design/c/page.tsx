import type { Metadata } from "next"
import Image from "next/image"
import HeroSection from "@/components/home/HeroSection"
import HomeFooter from "@/components/home/HomeFooter"
import ContactForm from "@/components/home/ContactForm"
import { SERVICES } from "@/lib/home/services-data"
import {
  WORKS_FEATURED,
  WORKS_INDEX_HREF,
} from "@/lib/home/works-data"
import {
  toBlogListItem,
  toNewsListItem,
} from "@/lib/home/adapters"
import { getLatestAnnouncements } from "@/lib/utils/announcement-server"
import { getLatestBlogPosts } from "@/lib/utils/blog-server"

export const metadata: Metadata = {
  title: "Design C — Magazine Spread · tsutsu",
  description: "Variant C preview — magazine chapter covers and pull-quotes.",
}

interface CoverProps {
  readonly chapter: string
  readonly title: string
  readonly ja: string
  readonly summary: string
  readonly anchor: string
  readonly page: string
  readonly dark?: boolean
}

function ChapterCover({
  chapter,
  title,
  ja,
  summary,
  anchor,
  page,
  dark,
}: CoverProps) {
  return (
    <section
      id={anchor}
      className={dark ? "variant-c__cover variant-c__cover--dark" : "variant-c__cover"}
      aria-label={`Chapter ${chapter} — ${title}`}
    >
      <div className="variant-c__cover-head">
        <span className="variant-c__cover-chapter">
          <em>§</em>CHAPTER {chapter}
        </span>
        <span>— PAGE {page}</span>
      </div>
      <h2 className="variant-c__cover-title">{title}.</h2>
      <div className="variant-c__cover-lede">
        <div className="variant-c__cover-ja">— {ja}</div>
        <p className="variant-c__cover-summary">{summary}</p>
      </div>
    </section>
  )
}

export default async function DesignCPage() {
  const [news, blogs] = await Promise.all([
    getLatestAnnouncements(4),
    getLatestBlogPosts(4),
  ])
  const newsItems = news.map(toNewsListItem)
  const blogItems = blogs.map(toBlogListItem)
  const feature = WORKS_FEATURED[0]

  const CONTENTS = [
    { num: "01", title: "Works", page: "P.04", anchor: "#works" },
    { num: "02", title: "Services", page: "P.10", anchor: "#services" },
    { num: "03", title: "About", page: "P.18", anchor: "#about" },
    { num: "04", title: "Journal", page: "P.24", anchor: "#notes" },
    { num: "05", title: "Contact", page: "P.30", anchor: "#contact" },
  ]

  return (
    <main data-variant="c">
      <HeroSection />

      {/* Table of contents */}
      <nav className="variant-c__contents" aria-label="Contents">
        <div className="variant-c__contents-label">
          Issue 01 · Contents · 目次
        </div>
        <ul className="variant-c__contents-list">
          {CONTENTS.map((c) => (
            <li key={c.num}>
              <a href={c.anchor}>
                <span className="variant-c__contents-num">{c.num}</span>
                <span className="variant-c__contents-title">{c.title}.</span>
                <span className="variant-c__contents-page">{c.page}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Works Chapter */}
      <ChapterCover
        chapter="01"
        title="Works"
        ja="制作実績"
        summary="「これを、僕がつくりました」と、はっきり言える仕事を、ひとつずつ掲載します。"
        anchor="works"
        page="04"
      />

      <section className="works" aria-label="Works feature">
        <div className="variant-c__feature">
          <figure className="variant-c__feature-thumb">
            <Image
              src={feature.image.src}
              alt={feature.image.alt}
              width={feature.image.width}
              height={feature.image.height}
              sizes="(max-width: 900px) 100vw, 60vw"
              priority={false}
            />
          </figure>
          <div className="variant-c__feature-body">
            <div className="variant-c__feature-byline">
              <span className="k">Client</span>
              <span className="v">{feature.client}</span>
              <span className="k">Year</span>
              <span className="v">{feature.year}</span>
              <span className="k">Category</span>
              <span className="v">{feature.category}</span>
              <span className="k">Role</span>
              <span className="v">デザイン / フルスタック開発</span>
            </div>
            <h3 className="work-feature__title" style={{ marginTop: 8 }}>
              <em>{feature.title}</em>
              <span className="work-feature__title-ja">{feature.summary}</span>
            </h3>
            <p className="work-feature__desc">{feature.description}</p>
            <a
              className="works__all-link"
              href={feature.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 8 }}
            >
              <span className="works__all-eyebrow">Live site</span>
              <span className="works__all-label">Visit project</span>
              <span className="works__all-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <blockquote className="variant-c__quote">
          想いを、技術で、カタチに。
          <cite className="variant-c__quote-cite">— Editorial note</cite>
        </blockquote>

        <div className="works__all">
          <a className="works__all-link" href={WORKS_INDEX_HREF}>
            <span className="works__all-eyebrow">Index — all works</span>
            <span className="works__all-label">すべての制作事例を見る</span>
            <span className="works__all-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* Services Chapter (dark) */}
      <ChapterCover
        chapter="02"
        title="Services"
        ja="サービス"
        summary="Webサイト制作、Webアプリ開発、業務自動化、そしてキャリア伴走。4 つの手触りで届けます。"
        anchor="services"
        page="10"
        dark
      />

      <section className="services" data-theme="dark" aria-label="Services editorial">
        <div className="services__list">
          {SERVICES.map((svc, i) => (
            <div key={svc.id} className="variant-c__svc-page">
              <div>
                <span className="variant-c__svc-page-number">
                  § {String(i + 1).padStart(2, "0")} / {svc.meta.split(" / ")[1]}
                </span>
                <p className="variant-c__svc-page-pull">{svc.tagline}</p>
              </div>
              <div className="variant-c__svc-page-body">
                <div className="variant-c__svc-page-label">{svc.nameJa}</div>
                <p>{svc.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Chapter */}
      <ChapterCover
        chapter="03"
        title="About"
        ja="プロフィール"
        summary="東京を拠点に、Webのプロダクトをひとりで通せるエンジニア。元消防士の経歴と、AI 時代の開発観。"
        anchor="about"
        page="18"
      />

      <section className="about" aria-label="About editorial">
        <div className="variant-c__about-spread">
          <div>
            <h3 className="variant-c__about-headline">
              堤 暁寛<br />
              <em
                style={{
                  fontStyle: "italic",
                  fontFamily: "var(--f-display)",
                  fontSize: "0.4em",
                  color: "oklch(0.55 0.16 30)",
                }}
              >
                Akihiro Tsutsumi
              </em>
            </h3>
          </div>

          <div className="variant-c__about-side">
            <p>
              <span className="mark">元消防士のフリーランスエンジニア</span>。
              4年間の現場経験を経て、独学でプログラミングを学び、3年前にエンジニアへ転身しました。
            </p>
            <p>
              複数の業務システム・Webアプリケーションの設計・実装・運用を担当し、
              <span className="mark">2025年8月に独立</span>。 C# / PHP（Laravel） /
              JavaScript / React / Next.js を中心に、フルスタックで開発支援を行っています。
            </p>
            <p>
              また、自身の異業種転身の経験を活かし、
              <span className="mark">未経験者・初学者の学習とキャリアサポート</span>
              にも力を入れています。
            </p>
          </div>
        </div>

        <blockquote
          className="variant-c__quote"
          style={{ marginTop: "clamp(48px, 6vw, 80px)" }}
        >
          速く、確かに。
          <cite className="variant-c__quote-cite">— Working principle</cite>
        </blockquote>
      </section>

      {/* Journal Chapter */}
      <ChapterCover
        chapter="04"
        title="Journal"
        ja="お知らせ・ブログ"
        summary="サイトの更新情報、案件のアナウンス、そして技術とキャリアの考察を、月1ペースで。"
        anchor="notes"
        page="24"
      />

      <section className="journal" aria-label="Journal">
        <div className="journal__body">
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
        </div>
      </section>

      {/* Contact Chapter */}
      <ChapterCover
        chapter="05"
        title="Contact"
        ja="お問い合わせ"
        summary="ご相談、見積り、ちょっとした質問まで、24–48 時間以内に返信します。"
        anchor="contact"
        page="30"
      />

      <section className="contact" aria-label="Contact editorial">
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
