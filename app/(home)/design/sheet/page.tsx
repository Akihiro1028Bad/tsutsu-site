import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans_JP } from "next/font/google"
import { WORKS_FEATURED } from "@/lib/home/works-data"
import "./sheet.css"

/**
 * G(品書き)にヒーローを足した候補案。
 * ヒーローを余白に浮かせず、帳票の最初の帯として組み込むことで
 * 情報密度と第一印象を両立させる。noindex(方向性の評価用)。
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
  title: "品書き + ヒーロー — 候補案 · tsutsu",
  description: "情報密度型のレイアウトにヒーローを組み込んだ候補案。",
  robots: { index: false, follow: false },
}

interface Fact {
  readonly label: string
  readonly value: string
}

/** すべて lib/home/about-data.ts の実データに基づく。 */
const FACTS: ReadonlyArray<Fact> = [
  { label: "前職", value: "消防士(4年)" },
  { label: "独立", value: "2025年8月" },
  { label: "主な技術", value: "C# / Laravel / React / Next.js" },
  { label: "拠点", value: "東京(オンライン対応可)" },
]

interface Item {
  readonly no: string
  readonly title: string
  readonly body: string
  readonly target: string
  readonly span: string
  readonly how: string
}

const ITEMS: ReadonlyArray<Item> = [
  {
    no: "01",
    title: "Webサイト制作",
    body: "企画から設計・実装・公開、その後の運用改善まで一貫して担当します。",
    target: "事業者・店舗",
    span: "1〜3ヶ月",
    how: "週次で進捗を共有",
  },
  {
    no: "02",
    title: "AI導入支援",
    body: "業務の棚卸しから始め、どこにAIを効かせるかを設計し、定着まで見届けます。",
    target: "中小企業・個人事業主",
    span: "2週間〜",
    how: "まず現場のヒアリング",
  },
  {
    no: "03",
    title: "学習・キャリア伴走",
    body: "異業種から転身した経験をもとに、学習設計と継続的なメンタリングを行います。",
    target: "未経験・初学者",
    span: "月単位",
    how: "隔週のオンライン面談",
  },
]

const work = WORKS_FEATURED[0]

export default function SheetDesignPage() {
  return (
    <main className={`sh ${plexJp.variable} ${plexMono.variable}`}>
      <div className="sh__stage">
        <div className="sh__sheet">
          <div className="sh__nameplate">
            <div className="sh__id">
              <span className="sh__seal" aria-hidden="true">
                堤
              </span>
              <h1 className="sh__name">
                堤 暁寛<span>Tsutsumi Akihiro</span>
              </h1>
            </div>
            <span className="sh__nameplate-right">
              フリーランスエンジニア / 東京
            </span>
          </div>

          <div className="sh__hero">
            <div className="sh__hero-main">
              <h2 className="sh__headline">
                想いを、<b>技術</b>でカタチに。
              </h2>
              <p className="sh__hook">
                消防車を降りて、エンジニアになりました。
              </p>
              <p className="sh__lede">
                4年間の消防士を経て独学でプログラミングを学び、2025年8月に独立。
                Webサイトも、業務のAI化も、エンジニアへの一歩も。
                つくるものは違っても、やることは同じです。
                まず一緒に、設計図を描くところから始めます。
              </p>
              <div className="sh__actions">
                <a className="sh__cta" href="#contact">
                  無料で相談する
                </a>
                <a className="sh__cta-alt" href="#works">
                  仕事を見る
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

          <div className="sh__items">
            {ITEMS.map((item) => (
              <div className="sh__item" key={item.no}>
                <div className="sh__item-head">
                  <span className="sh__item-no">{item.no}</span>
                  <h3 className="sh__item-title">{item.title}</h3>
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

          <div className="sh__record">
            <span className="sh__record-head">
              直近の仕事 — {work.indexNumber}
            </span>
            <h3 className="sh__record-title">
              {work.title}
              <small>{work.summary}</small>
            </h3>
            <span className="sh__record-meta">
              {work.year} / {work.category}
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
