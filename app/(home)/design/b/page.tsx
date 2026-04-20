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
  title: "Design B — Modular Dashboard · tsutsu",
  description: "Variant B preview — dashboard-style information blocks.",
}

const SKILLS: ReadonlyArray<{ label: string; accent?: boolean }> = [
  { label: "Next.js", accent: true },
  { label: "TypeScript" },
  { label: "React" },
  { label: "C#" },
  { label: "PHP / Laravel" },
  { label: "Supabase" },
  { label: "Cloudflare" },
  { label: "AI / LLM" },
]

const TIMELINE = [
  { year: "2018–2022", label: "消防士として現場勤務（4年）" },
  { year: "2022", label: "独学でプログラミング開始" },
  { year: "2022–2025", label: "複数の業務システム・Webアプリ開発" },
  { year: "2025.08 —", label: "フリーランスとして独立（現在）", current: true },
]

export default async function DesignBPage() {
  const [news, blogs] = await Promise.all([
    getLatestAnnouncements(4),
    getLatestBlogPosts(4),
  ])
  const newsItems = news.map(toNewsListItem)
  const blogItems = blogs.map(toBlogListItem)
  const feature = WORKS_FEATURED[0]

  return (
    <main data-variant="b">
      <HeroSection />

      {/* Hero → compact profile strip */}
      <aside className="variant-a__profile-strip" aria-label="At a glance">
        <div className="variant-a__profile-cell">
          <span className="variant-a__profile-cell-label">Name</span>
          <span className="variant-a__profile-cell-value">堤 暁寛</span>
        </div>
        <div className="variant-a__profile-cell">
          <span className="variant-a__profile-cell-label">Location</span>
          <span className="variant-a__profile-cell-value">Tokyo, JP</span>
        </div>
        <div className="variant-a__profile-cell">
          <span className="variant-a__profile-cell-label">Status</span>
          <span className="variant-a__profile-cell-value">新規案件受付中</span>
        </div>
        <div className="variant-a__profile-cell">
          <span className="variant-a__profile-cell-label">Freelance since</span>
          <span className="variant-a__profile-cell-value">2025</span>
        </div>
      </aside>

      {/* Works — hero card + coming-soon grid */}
      <section id="works" className="works">
        <div className="section-head section-head--hero">
          <div className="section-head__rule">
            <span>01</span>
            <em aria-hidden="true" />
            <span>Works</span>
          </div>
          <div className="section-head__jp">
            <h2>Works.</h2>
            <p className="section-head__en">— 制作実績</p>
          </div>
          <p className="section-head__lead">
            直近の事例と、これから掲載する案件。
          </p>
        </div>

        <div className="variant-b__works-hero">
          <figure className="variant-b__works-hero-thumb">
            <Image
              src={feature.image.src}
              alt={feature.image.alt}
              width={feature.image.width}
              height={feature.image.height}
              sizes="(max-width: 900px) 100vw, 50vw"
              priority={false}
            />
          </figure>
          <div className="variant-b__works-hero-body">
            <div className="work-feature__stack" style={{ gap: 6 }}>
              <span className="work-feature__chip">{feature.category}</span>
              <span className="work-feature__chip">{feature.year}</span>
            </div>
            <h3 className="work-feature__title">
              <em>{feature.title}</em>
              <span className="work-feature__title-ja">{feature.summary}</span>
            </h3>
            <div className="work-feature__stack">
              {feature.stack.map((tech) => (
                <span key={tech} className="work-feature__chip">
                  {tech}
                </span>
              ))}
            </div>
            <a
              className="works__all-link"
              href={feature.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 12 }}
            >
              <span className="works__all-eyebrow">Live site</span>
              <span className="works__all-label">Visit project</span>
              <span className="works__all-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="variant-b__coming-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="variant-b__coming-card">
              <span className="variant-b__coming-card-text">
                Coming soon<br />0{i + 1}
              </span>
            </div>
          ))}
        </div>

        <div className="works__all" style={{ marginTop: 40 }}>
          <a className="works__all-link" href={WORKS_INDEX_HREF}>
            <span className="works__all-eyebrow">Index — all works</span>
            <span className="works__all-label">すべての制作事例を見る</span>
            <span className="works__all-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* Services — 2x2 card grid */}
      <section id="services" className="services" data-theme="dark">
        <div className="section-head section-head--hero">
          <div className="section-head__rule">
            <span>02</span>
            <em aria-hidden="true" />
            <span>Services</span>
          </div>
          <div className="section-head__jp">
            <h2>Services.</h2>
            <p className="section-head__en">— サービス</p>
          </div>
          <p className="section-head__lead">
            ひとつずつ、手触りで選べる 4 項目。
          </p>
        </div>
        <div className="services__list">
          {SERVICES.map((svc, i) => (
            <article key={svc.id} className="variant-b__service-card">
              <span className="variant-b__service-card__num" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="variant-b__service-card__meta">{svc.meta}</span>
              <h3 className="variant-b__service-card__name">{svc.nameJa}</h3>
              <p className="variant-b__service-card__tagline">{svc.tagline}</p>
              <p className="variant-b__service-card__body">{svc.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* About — dashboard style */}
      <section id="about" className="about">
        <div className="section-head section-head--hero">
          <div className="section-head__rule">
            <span>03</span>
            <em aria-hidden="true" />
            <span>About</span>
          </div>
          <div className="section-head__jp">
            <h2>About.</h2>
            <p className="section-head__en">— プロフィール</p>
          </div>
          <p className="section-head__lead">
            この人は、こういう人です。
          </p>
        </div>

        <div className="variant-b__about-body">
          <div className="variant-b__about-name-block">
            <div className="variant-b__about-monogram" aria-hidden="true">
              T.
            </div>
            <div className="variant-b__about-name-ja">堤 暁寛</div>
            <div className="variant-b__about-name-en">
              Akihiro Tsutsumi / Tsutsu
            </div>
          </div>

          <div className="variant-b__about-panels">
            <dl className="variant-b__stats">
              <div>
                <span className="variant-b__stat-value">4年</span>
                <span className="variant-b__stat-label">消防士時代</span>
              </div>
              <div>
                <span className="variant-b__stat-value">3年+</span>
                <span className="variant-b__stat-label">エンジニア歴</span>
              </div>
              <div>
                <span className="variant-b__stat-value">20+</span>
                <span className="variant-b__stat-label">手がけた案件</span>
              </div>
            </dl>

            <div>
              <p className="variant-b__bio">
                <span className="mark">元消防士のフリーランスエンジニア</span>
                。異業種から独学でエンジニアに転身し、
                <span className="mark">2025年8月に独立</span>
                。C# / PHP（Laravel） / JavaScript / React / Next.js
                を中心にフルスタック支援を行っています。
              </p>
              <p
                className="variant-b__bio"
                style={{ fontSize: "15px", opacity: 0.85, marginTop: 16 }}
              >
                また、自身の異業種転身の経験を活かし、
                <span className="mark">未経験者・初学者の学習とキャリアサポート</span>
                にも力を入れています。最近は
                <span className="mark">AI駆動開発・テスト自動化</span>
                など、現場に効く最新のやり方にも踏み込んで取り組んでいます。
              </p>
            </div>

            <div>
              <div className="variant-b__panel-label">Skills</div>
              <div className="variant-b__skills">
                {SKILLS.map((s) => (
                  <span
                    key={s.label}
                    className={
                      s.accent
                        ? "variant-b__skill variant-b__skill--accent"
                        : "variant-b__skill"
                    }
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="variant-b__panel-label">Timeline</div>
              <div className="variant-b__timeline">
                {TIMELINE.map((t) => (
                  <div
                    key={t.year}
                    className={
                      t.current
                        ? "variant-b__tl-item variant-b__tl-item--current"
                        : "variant-b__tl-item"
                    }
                  >
                    <span className="variant-b__tl-year">{t.year}</span>
                    <span className="variant-b__tl-label">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journal */}
      <section id="notes" className="journal">
        <div className="section-head section-head--hero">
          <div className="section-head__rule">
            <span>04</span>
            <em aria-hidden="true" />
            <span>Journal</span>
          </div>
          <div className="section-head__jp">
            <h2>Journal.</h2>
            <p className="section-head__en">— お知らせ・ブログ</p>
          </div>
          <p className="section-head__lead">
            最新情報とじっくり書いた記事。
          </p>
        </div>
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

      {/* Contact — with promise card */}
      <section id="contact" className="contact">
        <div className="section-head section-head--hero">
          <div className="section-head__rule">
            <span>05</span>
            <em aria-hidden="true" />
            <span>Contact</span>
          </div>
          <div className="section-head__jp">
            <h2>Contact.</h2>
            <p className="section-head__en">— お問い合わせ</p>
          </div>
          <p className="section-head__lead">
            まずはお気軽に、ご相談から。
          </p>
        </div>

        <div className="variant-b__contact-promise">
          <div className="variant-b__contact-promise-icon">
            <em style={{ fontStyle: "italic" }}>↗</em>
          </div>
          <div className="variant-b__contact-promise-text">
            24〜48時間以内に返信、まずはヒアリングから。
          </div>
          <div className="variant-b__contact-promise-meta">
            9 – 18 JST<br />
            REMOTE OK<br />
            JP / EN
          </div>
        </div>

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
