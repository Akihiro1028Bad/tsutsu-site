import type { Metadata } from "next"
import Link from "next/link"
import { Fragment } from "react"
import { IBM_Plex_Mono, IBM_Plex_Sans_JP } from "next/font/google"
import { toNewsListItem } from "@/lib/home/adapters"
import { WORKS_FEATURED } from "@/lib/home/works-data"
import { getLatestAnnouncements } from "@/lib/utils/announcement-server"
import "./sheet.css"

/**
 * 事業サイト方向の候補案。情報密度型の帳票レイアウトに
 * メインビジュアルを組み込み、主役を「事業内容」に置く。
 * 代表者の情報は事業者概要に集約する。noindex(方向性の評価用)。
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
  title: "事業サイト方向 — 候補案 · tsutsu",
  description: "事業内容を主役に据えた情報密度型レイアウトの候補案。",
  robots: { index: false, follow: false },
}

interface Fact {
  readonly label: string
  readonly value: string
}

const FACTS: ReadonlyArray<Fact> = [
  { label: "事業内容", value: "Web制作 / AI導入支援 / 学習・キャリア支援" },
  { label: "所在地", value: "東京都" },
  { label: "開業", value: "2025年8月" },
  { label: "対応地域", value: "オンラインにて全国" },
]

interface Service {
  readonly no: string
  readonly title: string
  readonly body: string
  readonly target: string
  readonly span: string
  readonly how: string
}

const SERVICES: ReadonlyArray<Service> = [
  {
    no: "01",
    title: "Webサイト制作",
    body: "企画・設計から実装、公開後の運用改善まで一貫して承ります。",
    target: "事業者・店舗",
    span: "1〜3ヶ月",
    how: "週次で進捗を共有",
  },
  {
    no: "02",
    title: "AI導入支援",
    body: "業務の棚卸しから、どこにAIを適用するかの設計、定着までを支援します。",
    target: "中小企業・個人事業主",
    span: "2週間〜",
    how: "現場のヒアリングから",
  },
  {
    no: "03",
    title: "学習・キャリア支援",
    body: "未経験からエンジニアを目指す方へ、学習設計と継続的な面談を提供します。",
    target: "未経験・初学者",
    span: "月単位",
    how: "隔週のオンライン面談",
  },
]

const OVERVIEW: ReadonlyArray<Fact> = [
  { label: "屋号", value: "tsutsu" },
  { label: "代表者", value: "堤 暁寛(つつみ あきひろ)" },
  { label: "開業", value: "2025年8月" },
  { label: "所在地", value: "東京都" },
  {
    label: "事業内容",
    value:
      "Webサイト・アプリケーションの受託開発 / 業務へのAI導入支援 / エンジニアの学習・キャリア支援",
  },
  { label: "対応技術", value: "C# / PHP(Laravel) / JavaScript / React / Next.js" },
]

const work = WORKS_FEATURED[0]

export default async function SheetDesignPage() {
  const announcements = await getLatestAnnouncements(3)
  const news = announcements.map(toNewsListItem)

  return (
    <main className={`sh ${plexJp.variable} ${plexMono.variable}`}>
      <div className="sh__stage">
        <div className="sh__sheet">
          {/* 屋号 */}
          <div className="sh__nameplate">
            <div className="sh__id">
              <span className="sh__seal" aria-hidden="true">
                堤
              </span>
              <h1 className="sh__name">
                tsutsu<span>Web · AI · Engineering</span>
              </h1>
            </div>
            <span className="sh__nameplate-right">
              東京都 / お問い合わせ hello@tsutsu.dev
            </span>
          </div>

          {/* メインビジュアル */}
          <div className="sh__hero">
            <div className="sh__hero-main">
              <h2 className="sh__headline">
                想いを、<b>技術</b>でカタチに。
              </h2>
              <p className="sh__hook">
                つくって終わりにしない、運用まで見届ける開発を。
              </p>
              <p className="sh__lede">
                Webサイト・アプリケーションの受託開発、業務へのAI導入支援、
                エンジニアの学習・キャリア支援を行っています。
                ご相談から設計・実装・運用まで、一貫して対応します。
              </p>
              <div className="sh__actions">
                <a className="sh__cta" href="#contact">
                  お問い合わせ
                </a>
                <a className="sh__cta-alt" href="#services">
                  事業内容を見る
                </a>
              </div>
            </div>

            <div className="sh__facts">
              {FACTS.map((fact) => (
                <dl className="sh__fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </dl>
              ))}
            </div>
          </div>

          {/* 事業内容 */}
          <div className="sh__band" id="services">
            <h3>事業内容</h3>
            <span>Services</span>
          </div>
          <div className="sh__items">
            {SERVICES.map((item) => (
              <div className="sh__item" key={item.no}>
                <div className="sh__item-head">
                  <span className="sh__item-no">{item.no}</span>
                  <h4 className="sh__item-title">{item.title}</h4>
                </div>
                <p className="sh__item-body">{item.body}</p>
                <dl className="sh__spec">
                  <dt>対象</dt>
                  <dd>{item.target}</dd>
                  <dt>期間</dt>
                  <dd>{item.span}</dd>
                  <dt>進め方</dt>
                  <dd>{item.how}</dd>
                  <dt>費用</dt>
                  <dd>要相談</dd>
                </dl>
                <a className="sh__item-link" href="#contact">
                  この件で相談する
                </a>
              </div>
            ))}
          </div>

          {/* 実績 */}
          <div className="sh__band">
            <h3>実績</h3>
            <span>Works</span>
            <Link className="sh__band-more" href="/works">
              一覧 →
            </Link>
          </div>
          <div className="sh__record">
            <span className="sh__record-head">{work.indexNumber}</span>
            <h4 className="sh__record-title">
              {work.title}
              <small>{work.summary}</small>
            </h4>
            <span className="sh__record-meta">
              {work.client} / {work.year}
            </span>
          </div>

          {/* お知らせ */}
          <div className="sh__band">
            <h3>お知らせ</h3>
            <span>News</span>
            <Link className="sh__band-more" href="/announcements">
              一覧 →
            </Link>
          </div>
          <div className="sh__news">
            {news.length === 0 ? (
              <p className="sh__news-empty">現在お知らせはありません。</p>
            ) : (
              news.map((item) => (
                <Link className="sh__news-row" href={item.href} key={item.id}>
                  <span className="sh__news-date">{item.dateDisplay}</span>
                  <span className="sh__news-kind">{item.kind}</span>
                  <span className="sh__news-title">{item.title}</span>
                </Link>
              ))
            )}
          </div>

          {/* 事業者概要 */}
          <div className="sh__band">
            <h3>事業者概要</h3>
            <span>Profile</span>
          </div>
          <dl className="sh__overview">
            {OVERVIEW.map((row) => (
              <Fragment key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </div>
    </main>
  )
}
