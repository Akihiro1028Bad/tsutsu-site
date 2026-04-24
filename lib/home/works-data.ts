import type { FeaturedWork } from "@/lib/types/home"

/**
 * Featured works rendered on the editorial home page and /works index.
 *
 * Hand-curated for now; structured so a microCMS-driven feed can later
 * shadow this constant with the same shape.
 */
export const WORKS_FEATURED: ReadonlyArray<FeaturedWork> = Object.freeze([
  Object.freeze({
    id: "pickle-bang-theory",
    indexNumber: "001",
    title: "THE PICKLE BANG THEORY.",
    titleJa: "ザピックルバンセオリー / インドアピックルボール施設",
    description:
      "クロスミントン世界王者が手がける、本八幡駅徒歩1分・24時間営業のインドアピックルボール施設。予約導線・世界観の表現まで一貫して設計・実装しました。初心者から上級者まで楽しめる空間を、Webでも体感できるかたちに。",
    summary:
      "インドア・ピックルボール施設のブランドサイト。予約導線・世界観の表現まで一貫して設計・実装。",
    year: "2026",
    category: "Web / Brand",
    client: "RST Agency株式会社",
    externalUrl: "https://www.thepicklebang.com/",
    stack: Object.freeze([
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Vercel",
    ]),
    meta: Object.freeze([
      Object.freeze({ label: "Year", value: "2026" }),
      Object.freeze({ label: "Status", value: "公開中" }),
      Object.freeze({ label: "Role", value: "デザイン・フルスタック開発" }),
      Object.freeze({ label: "Client", value: "RST Agency株式会社" }),
    ]),
    image: Object.freeze({
      src: "/works/pickleball-hero.png",
      alt: "The Pickle Bang Theory — ヒーロービジュアル",
      width: 2400,
      height: 1500,
    }),
  }),
])

/** Link to the works archive page. */
export const WORKS_INDEX_HREF = "/works"
