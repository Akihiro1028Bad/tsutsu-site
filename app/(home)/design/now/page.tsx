import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { IBM_Plex_Mono, IBM_Plex_Sans_JP } from "next/font/google"
import { Fragment } from "react"
import RevealOnScroll from "@/components/home/RevealOnScroll"
import { toNewsListItem } from "@/lib/home/adapters"
import { WORKS_FEATURED } from "@/lib/home/works-data"
import { getLatestAnnouncements } from "@/lib/utils/announcement-server"
import "./now.css"

/**
 * 事業サイト構成を現行水準の表面処理で組んだ候補案。
 * 情報密度と実データは /design/sheet を引き継ぐ。noindex(評価用)。
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
  title: "現行水準の事業サイト — 候補案 · tsutsu",
  description: "情報密度を保ったまま表面処理を現行水準に上げた候補案。",
  robots: { index: false, follow: false },
}

interface Service {
  readonly no: string
  readonly title: string
  readonly body: string
  readonly chips: ReadonlyArray<{ readonly label: string; readonly value: string }>
}

const SERVICES: ReadonlyArray<Service> = [
  {
    no: "01",
    title: "Webサイト制作",
    body: "企画・設計から実装、公開後の運用改善まで一貫して承ります。",
    chips: [
      { label: "対象", value: "事業者・店舗" },
      { label: "期間", value: "1〜3ヶ月" },
      { label: "費用", value: "要相談" },
    ],
  },
  {
    no: "02",
    title: "AI導入支援",
    body: "業務の棚卸しから、どこにAIを適用するかの設計、定着までを支援します。",
    chips: [
      { label: "対象", value: "中小企業・個人事業主" },
      { label: "期間", value: "2週間〜" },
      { label: "費用", value: "要相談" },
    ],
  },
  {
    no: "03",
    title: "学習・キャリア支援",
    body: "未経験からエンジニアを目指す方へ、学習設計と継続的な面談を提供します。",
    chips: [
      { label: "対象", value: "未経験・初学者" },
      { label: "期間", value: "月単位" },
      { label: "費用", value: "要相談" },
    ],
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

export default async function NowDesignPage() {
  const announcements = await getLatestAnnouncements(3)
  const news = announcements.map(toNewsListItem)

  return (
    <main className={`nw ${plexJp.variable} ${plexMono.variable}`}>
      <div className="nw__wrap">
        {/* 屋号バー */}
        <div className="nw__card nw__bar">
          <div className="nw__id">
            <span className="nw__seal" aria-hidden="true">
              堤
            </span>
            <h1 className="nw__brand">
              tsutsu<span>Web · AI · Engineering</span>
            </h1>
          </div>
          <span className="nw__bar-meta">
            東京都 / hello@tsutsu.dev
          </span>
        </div>

        {/* ヒーロー */}
        <div className="nw__card nw__hero">
          <div className="nw__hero-main">
            <div className="nw__tags">
              <span className="nw__tag">Webサイト制作</span>
              <span className="nw__tag">AI導入支援</span>
              <span className="nw__tag">学習・キャリア支援</span>
            </div>
            <h2 className="nw__headline">
              想いを、<b>技術</b>で
              <br />
              カタチに。
            </h2>
            <p className="nw__lede">
              Webサイト・アプリケーションの受託開発、業務へのAI導入支援、
              エンジニアの学習・キャリア支援を行っています。
              ご相談から設計・実装・運用まで、一貫して対応します。
            </p>
            <div className="nw__actions">
              <a className="nw__cta" href="#contact">
                お問い合わせ
              </a>
              <a className="nw__cta-alt" href="#services">
                事業内容を見る
              </a>
            </div>
          </div>

          <div className="nw__shot">
            <Image
              src={work.image.src}
              alt={work.image.alt}
              width={work.image.width}
              height={work.image.height}
              priority
            />
            <div className="nw__shot-cap">
              <b>{work.title}</b>
              <span>
                {work.year} / {work.category}
              </span>
            </div>
          </div>
        </div>

        {/* 事業内容 */}
        <div className="nw__head" id="services">
          <h2>事業内容</h2>
          <span>Services</span>
        </div>
        <RevealOnScroll>
          <div className="nw__grid">
            {SERVICES.map((svc) => (
              <div className="nw__card nw__svc" key={svc.no}>
                <span className="nw__svc-no">{svc.no}</span>
                <h3 className="nw__svc-title">{svc.title}</h3>
                <p className="nw__svc-body">{svc.body}</p>
                <div className="nw__chips">
                  {svc.chips.map((chip) => (
                    <span className="nw__chip" key={chip.label}>
                      <b>{chip.label}</b>
                      {chip.value}
                    </span>
                  ))}
                </div>
                <a className="nw__svc-link" href="#contact">
                  この件で相談する →
                </a>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* お知らせ */}
        <div className="nw__head">
          <h2>お知らせ</h2>
          <span>News</span>
          <Link className="nw__more" href="/announcements">
            一覧 →
          </Link>
        </div>
        <RevealOnScroll>
          <div className="nw__card nw__news">
            {news.length === 0 ? (
              <p className="nw__news-empty">現在お知らせはありません。</p>
            ) : (
              news.map((item) => (
                <Link className="nw__news-row" href={item.href} key={item.id}>
                  <span className="nw__news-date">{item.dateDisplay}</span>
                  <span className="nw__news-kind">{item.kind}</span>
                  <span className="nw__news-title">{item.title}</span>
                  <span className="nw__news-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))
            )}
          </div>
        </RevealOnScroll>

        {/* 事業者概要 */}
        <div className="nw__head">
          <h2>事業者概要</h2>
          <span>Profile</span>
        </div>
        <RevealOnScroll>
          <div className="nw__card nw__overview">
            <dl>
              {OVERVIEW.map((row) => (
                <Fragment key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </RevealOnScroll>

        {/* 締め */}
        <RevealOnScroll>
          <div className="nw__close" id="contact">
            <div>
              <h2>まずは、話すところから。</h2>
              <p>
                かたちが決まっていないご相談でも構いません。
                現状をうかがったうえで、進め方をご提案します。
              </p>
            </div>
            <a className="nw__close-cta" href="mailto:hello@tsutsu.dev">
              お問い合わせ
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </main>
  )
}
