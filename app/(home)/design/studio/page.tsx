import type { Metadata } from "next"
import Image from "next/image"
import { IBM_Plex_Mono, IBM_Plex_Sans_JP } from "next/font/google"
import { WORKS_FEATURED } from "@/lib/home/works-data"
import "./studio.css"

/**
 * AI 生成デザインの定型から意図的に外した方向の比較プレビュー。
 * 本番 UX ではなく方向性の目視評価用のため noindex。
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
  title: "AI感を外した方向 — 比較 · tsutsu",
  description: "定型を避けた3方向の比較プレビュー。",
  robots: { index: false, follow: false },
}

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
    body: "学習の設計と、詰まったときに相談できる継続的なメンタリングを行います。",
    target: "これから学ぶ個人",
    span: "月単位",
    how: "隔週のオンライン面談",
  },
]

const work = WORKS_FEATURED[0]

export default function StudioDesignPage() {
  return (
    <main className={`st ${plexJp.variable} ${plexMono.variable}`}>
      {/* ============ G. 品書き ============ */}
      <section className="st--grid">
        <div className="st__label">
          <span>G ─ 品書き(情報密度型)</span>
          <b>推奨:ヒーローを持たず、実務情報から始める</b>
        </div>
        <div className="st__stage">
          <div className="st__sheet">
            <div className="st__nameplate">
              <h1 className="st__name">
                堤 暁寛<span>Tsutsumi Akihiro</span>
              </h1>
              <div className="st__nameplate-right">
                フリーランスエンジニア / 東京
                <br />
                受託開発・AI導入支援・学習伴走 — 2021年より
              </div>
            </div>

            <div className="st__items">
              {ITEMS.map((item) => (
                <div className="st__item" key={item.no}>
                  <span className="st__item-no">{item.no}</span>
                  <h2 className="st__item-title">{item.title}</h2>
                  <p className="st__item-body">{item.body}</p>
                  <dl className="st__spec">
                    <dt>対象</dt>
                    <dd>{item.target}</dd>
                    <dt>期間</dt>
                    <dd>{item.span}</dd>
                    <dt>進め方</dt>
                    <dd>{item.how}</dd>
                    <dt>費用</dt>
                    <dd>要相談</dd>
                  </dl>
                  <a className="st__item-link" href="#contact">
                    この件で相談する
                  </a>
                </div>
              ))}
            </div>

            <div className="st__record">
              <span className="st__record-head">
                直近の仕事 — {work.indexNumber}
              </span>
              <h2 className="st__record-title">
                {work.title}
                <small>{work.summary}</small>
              </h2>
              <span className="st__record-meta">
                {work.year} / {work.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ H. 藍の色面 ============ */}
      <section className="st--field">
        <div className="st__label">
          <span>H ─ 藍の色面</span>
          <b>色で紙面を割る。ポスター的</b>
        </div>
        <div className="st__stage">
          <div className="st__field">
            <span className="st__field-mark">堤 / TSUTSU</span>
            <h2 className="st__field-head">
              想いを、
              <br />
              技術でカタチに。
            </h2>
            <span className="st__field-foot">
              Web Development
              <br />
              AI Implementation
              <br />
              Learning &amp; Career Support
            </span>
          </div>
          <div className="st__panel">
            <h3 className="st__panel-name">
              堤 暁寛
              <span>Freelance Engineer — Tokyo, Japan</span>
            </h3>
            <p className="st__panel-body">
              Webサイトも、業務のAI化も、エンジニアへの一歩も。
              つくるものは違っても、やることは同じです。
              まず一緒に、設計図を描くところから始めます。
            </p>
            <ul className="st__list">
              <li>
                Webサイト制作<span>1〜3ヶ月</span>
              </li>
              <li>
                AI導入支援<span>2週間〜</span>
              </li>
              <li>
                学習・キャリア伴走<span>月単位</span>
              </li>
            </ul>
            <a className="st__solid" href="#contact">
              相談する
            </a>
          </div>
        </div>
      </section>

      {/* ============ I. 実績主役 ============ */}
      <section className="st--photo">
        <div className="st__label">
          <span>I ─ 実績主役</span>
          <b>実物の仕事から始める。写真が主役</b>
        </div>
        <div className="st__stage">
          <div className="st__shot">
            <Image
              src={work.image.src}
              alt={work.image.alt}
              width={work.image.width}
              height={work.image.height}
              priority
            />
          </div>
          <div className="st__over">
            <span className="st__credit">
              {work.indexNumber} — {work.title}
              <br />
              {work.client} / {work.year}
            </span>
            <h2 className="st__over-head">
              つくったものが、そのまま名刺です。
            </h2>
            <div className="st__over-foot">
              <span className="st__over-services">
                堤 暁寛 — Webサイト制作 / AI導入支援 / 学習・キャリア伴走
              </span>
              <a className="st__over-cta" href="#contact">
                相談する
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
