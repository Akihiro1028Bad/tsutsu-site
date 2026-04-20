import type { HomeService } from "@/lib/types/home"

export const SERVICES: ReadonlyArray<HomeService> = Object.freeze([
  Object.freeze({
    id: "web-site",
    nameJa: "Webサイト制作",
    meta: "§ 01 / Web Site",
    tagline: "Webサイトを、ブランドの手触りにまで落とし込む。",
    body:
      "LP／コーポレート／ポートフォリオまで、コンセプトから実装まで一貫して。“ただ綺麗”ではなく、意図の通った手触りに仕上げます。",
  }),
  Object.freeze({
    id: "web-app",
    nameJa: "Webアプリ／システム開発",
    meta: "§ 02 / Web App",
    tagline: "機能要件を、確かなプロダクトへ変換する。",
    body:
      "要件整理から設計・実装・運用まで。Next.js / TypeScript / Supabase などモダンな構成で、小さく速く、確かな土台をつくります。",
  }),
  Object.freeze({
    id: "automation",
    nameJa: "業務改善／自動化",
    meta: "§ 03 / Automation",
    tagline: "手作業を、仕組みに置き換える。",
    body:
      "Claude / GPT / Zapier / スクリプトを組み合わせ、“AIで何ができるか分からない”段階からの相談もOK。",
  }),
  Object.freeze({
    id: "mentoring",
    nameJa: "学習支援・キャリア支援",
    meta: "§ 04 / Mentoring",
    tagline: "現場で通用する力を、一緒に育てる。",
    body:
      "未経験〜3年目エンジニアへの1on1伴走。コードレビュー、ペアプロ、ポートフォリオ、案件獲得まで。",
  }),
])
