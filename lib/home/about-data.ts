import type { AboutPayload } from "@/lib/types/home"

const t = (value: string) =>
  Object.freeze({ kind: "text" as const, value })
const m = (value: string) =>
  Object.freeze({ kind: "mark" as const, value })

export const ABOUT: AboutPayload = Object.freeze({
  name: Object.freeze({
    ja: "堤 暁寛",
    romanised: "Akihiro Tsutsumi",
  }),
  paragraphs: Object.freeze([
    Object.freeze([
      m("元消防士のフリーランスエンジニア"),
      t(
        "。4年間の消防士経験を経て、独学でプログラミングを学び、3年前にエンジニアへ転身しました。"
      ),
    ]),
    Object.freeze([
      t(
        "複数の業務システム・Webアプリケーションの設計・実装・運用を担当し、"
      ),
      m("2025年8月に独立"),
      t(
        "。C# / PHP（Laravel） / JavaScript / React / Next.js を中心に、フルスタックで開発支援を行っています。"
      ),
    ]),
    Object.freeze([
      t("また、自身の異業種転身の経験を活かし、"),
      m("未経験者・初学者の学習とキャリアサポート"),
      t(
        "にも力を入れています。コードだけでなく、“進み方”ごと伴走できるのが強みです。"
      ),
    ]),
    Object.freeze([
      t("最近は"),
      m("AIを取り入れた仕様駆動開発・AI駆動開発・テスト自動化"),
      t(
        "など、現場に効く最新のやり方にも踏み込んで取り組んでいます。“速く、確かに”をアップデートし続けるのが、いまの自分のテーマです。"
      ),
    ]),
  ]),
})
