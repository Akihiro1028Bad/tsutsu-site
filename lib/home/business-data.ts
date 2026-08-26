/**
 * 事業サイトの静的コンテンツ。
 *
 * 事業者概要は `lib/home/about-data.ts` の実績と整合する実データのみを置く。
 * 費用は確定していないため全て「要相談」。
 */

export interface BusinessService {
  readonly no: string
  readonly title: string
  readonly body: string
  readonly target: string
  readonly span: string
  readonly cost: string
}

export const BUSINESS_SERVICES: ReadonlyArray<BusinessService> = Object.freeze([
  Object.freeze({
    no: "01",
    title: "Webサイト制作",
    body: "企画・設計から実装、公開後の運用改善まで一貫して承ります。事業の目的から逆算して、必要なものだけをつくります。",
    target: "事業者・店舗",
    span: "1〜3ヶ月",
    cost: "要相談",
  }),
  Object.freeze({
    no: "02",
    title: "AI導入支援",
    body: "業務の棚卸しから始め、どこにAIを適用すれば効くのかを設計し、現場に定着するまで伴走します。ツールを入れて終わりにはしません。",
    target: "中小企業・個人事業主",
    span: "2週間〜",
    cost: "要相談",
  }),
  Object.freeze({
    no: "03",
    title: "学習・キャリア支援",
    body: "未経験からエンジニアを目指す方へ、学習の設計と継続的な面談を提供します。コードだけでなく、進み方ごと支えます。",
    target: "未経験・初学者",
    span: "月単位",
    cost: "要相談",
  }),
])

export interface OverviewRow {
  readonly label: string
  readonly value: string
}

export const BUSINESS_OVERVIEW: ReadonlyArray<OverviewRow> = Object.freeze([
  Object.freeze({ label: "屋号", value: "tsutsu" }),
  Object.freeze({ label: "代表者", value: "堤 暁寛(つつみ あきひろ)" }),
  Object.freeze({ label: "開業", value: "2025年8月" }),
  Object.freeze({ label: "所在地", value: "東京都" }),
  Object.freeze({
    label: "事業内容",
    value:
      "Webサイト・アプリケーションの受託開発 / 業務へのAI導入支援 / エンジニアの学習・キャリア支援",
  }),
  Object.freeze({
    label: "対応技術",
    value: "C# / PHP(Laravel) / JavaScript / React / Next.js",
  }),
])
