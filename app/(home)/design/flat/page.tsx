import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { IBM_Plex_Mono, IBM_Plex_Sans_JP } from "next/font/google"
import { Fragment } from "react"
import RevealOnScroll from "@/components/home/RevealOnScroll"
import { toNewsListItem } from "@/lib/home/adapters"
import { WORKS_FEATURED } from "@/lib/home/works-data"
import { getLatestAnnouncements } from "@/lib/utils/announcement-server"
import "./flat.css"

/**
 * 事業サイト候補案。カード / 影 / 角丸 / ピルを使わず、
 * 文字の大きさ・全面ブリード写真・追従見出し・太い罫で現行感を出す。
 * 色は実績写真だけが持つ。noindex(評価用)。
 */
const plexJp = IBM_Plex_Sans_JP({
  weight: ["400", "500", "600"],
  variable: "--font-plex-jp",
  display: "swap",
  preload: false,
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "事業サイト — 候補案(面と影を使わない版) · tsutsu",
  description: "カードと影のキットを使わずに現行感を出した候補案。",
  robots: { index: false, follow: false },
}

interface Service {
  readonly no: string
  readonly title: string
  readonly body: string
  readonly target: string
  readonly span: string
  readonly cost: string
}

const SERVICES: ReadonlyArray<Service> = [
  {
    no: "01",
    title: "Webサイト制作",
    body: "企画・設計から実装、公開後の運用改善まで一貫して承ります。事業の目的から逆算して、必要なものだけをつくります。",
    target: "事業者・店舗",
    span: "1〜3ヶ月",
    cost: "要相談",
  },
  {
    no: "02",
    title: "AI導入支援",
    body: "業務の棚卸しから始め、どこにAIを適用すれば効くのかを設計し、現場に定着するまで伴走します。ツールを入れて終わりにはしません。",
    target: "中小企業・個人事業主",
    span: "2週間〜",
    cost: "要相談",
  },
  {
    no: "03",
    title: "学習・キャリア支援",
    body: "未経験からエンジニアを目指す方へ、学習の設計と継続的な面談を提供します。コードだけでなく、進み方ごと支えます。",
    target: "未経験・初学者",
    span: "月単位",
    cost: "要相談",
  },
]

const OVERVIEW: ReadonlyArray<{ readonly label: string; readonly value: string }> = [
  { label: "屋号", value: "tsutsu" },
  { label: "代表者", value: "堤 暁寛(つつみ あきひろ)" },
  { label: "開業", value: "2025年8月" },
  { label: "所在地", value: "東京都" },
  {
    label: "事業内容",
    value:
      "Webサイト・アプリケーションの受託開発 / 業務へのAI導入支援 / エンジニアの学習・キャリア支援",
  },
  {
    label: "対応技術",
    value: "C# / PHP(Laravel) / JavaScript / React / Next.js",
  },
]

const work = WORKS_FEATURED[0]

export default async function FlatDesignPage() {
  const announcements = await getLatestAnnouncements(3)
  const news = announcements.map(toNewsListItem)

  return (
    <main className={`fl ${plexJp.variable} ${plexMono.variable}`}>
      {/* 屋号 */}
      <div className="fl__bar">
        <h1 className="fl__brand">
          tsutsu<span>Web · AI · Engineering</span>
        </h1>
        <span className="fl__bar-meta">東京都 / hello@tsutsu.dev</span>
      </div>

      {/* ヒーロー */}
      <div className="fl__hero">
        <div className="fl__hero-type">
          <h2 className="fl__headline">想いを、技術でカタチに。</h2>
          <div className="fl__sub">
            <p className="fl__lede">
              Webサイト・アプリケーションの受託開発、業務へのAI導入支援、
              エンジニアの学習・キャリア支援を行っています。
              ご相談から設計・実装・運用まで、一貫して対応します。
            </p>
            <div className="fl__hero-actions">
              <a className="fl__cta" href="#contact">
                お問い合わせ
              </a>
              <a className="fl__link" href="#services">
                事業内容を見る
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* 事業内容 */}
      <section className="fl__sec" id="services">
        <div className="fl__sec-label">
          <div>
            <h2>事業内容</h2>
            <p>Services</p>
          </div>
        </div>
        <div className="fl__sec-body">
          {SERVICES.map((svc) => (
            <RevealOnScroll key={svc.no}>
              <div className="fl__svc">
                <span className="fl__svc-no">{svc.no}</span>
                <div>
                  <h3 className="fl__svc-title">{svc.title}</h3>
                  <p className="fl__svc-body">{svc.body}</p>
                  <a className="fl__svc-link" href="#contact">
                    この件で相談する
                  </a>
                </div>
                <dl className="fl__svc-meta">
                  <dt>対象</dt>
                  <dd>{svc.target}</dd>
                  <dt>期間</dt>
                  <dd>{svc.span}</dd>
                  <dt>費用</dt>
                  <dd>{svc.cost}</dd>
                </dl>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 実績 */}
      <section className="fl__sec">
        <div className="fl__sec-label">
          <div>
            <h2>実績</h2>
            <p>Works</p>
            <Link className="fl__sec-more" href="/works">
              一覧を見る
            </Link>
          </div>
        </div>
        <div className="fl__sec-body">
          <RevealOnScroll>
            <div className="fl__work">
              <div className="fl__work-media">
                <Image
                  src={work.image.src}
                  alt={work.image.alt}
                  width={work.image.width}
                  height={work.image.height}
                />
              </div>
              <div className="fl__work-head">
                <span className="fl__work-no">{work.indexNumber}</span>
                <h3 className="fl__work-title">{work.title}</h3>
              </div>
              <p className="fl__work-body">{work.summary}</p>
              <div className="fl__work-foot">
                <span>
                  {work.client} / {work.year} / {work.category}
                </span>
                <a
                  className="fl__work-link"
                  href={work.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  サイトを見る ↗
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* お知らせ */}
      <section className="fl__sec">
        <div className="fl__sec-label">
          <div>
            <h2>お知らせ</h2>
            <p>News</p>
            <Link className="fl__sec-more" href="/announcements">
              一覧を見る
            </Link>
          </div>
        </div>
        <div className="fl__sec-body">
          {news.length === 0 ? (
            <p className="fl__news-empty">現在お知らせはありません。</p>
          ) : (
            news.map((item) => (
              <Link className="fl__news-row" href={item.href} key={item.id}>
                <span className="fl__news-date">{item.dateDisplay}</span>
                <span className="fl__news-title">{item.title}</span>
                <span className="fl__news-kind">{item.kind}</span>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* 事業者概要 */}
      <section className="fl__sec">
        <div className="fl__sec-label">
          <div>
            <h2>事業者概要</h2>
            <p>Profile</p>
          </div>
        </div>
        <div className="fl__sec-body">
          <dl className="fl__overview">
            {OVERVIEW.map((row) => (
              <Fragment key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </section>

      {/* 締め */}
      <div className="fl__close" id="contact">
        <h2>まずは、話すところから。</h2>
        <p>
          かたちが決まっていないご相談でも構いません。
          現状をうかがったうえで、進め方をご提案します。
        </p>
        <div className="fl__hero-actions">
          <a className="fl__cta" href="mailto:hello@tsutsu.dev">
            お問い合わせ
          </a>
          <span className="fl__bar-meta">hello@tsutsu.dev</span>
        </div>
      </div>
    </main>
  )
}
