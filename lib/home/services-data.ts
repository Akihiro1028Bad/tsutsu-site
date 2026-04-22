import type { HomeService } from "@/lib/types/home"

export const SERVICES: ReadonlyArray<HomeService> = Object.freeze([
  Object.freeze({
    id: "web-site",
    nameJa: "Webサイト制作",
    meta: "§ 01 / Web Site",
    tagline: "ブランドの核を、Webサイトの形に。",
    body:
      "LP／コーポレート／ポートフォリオまで、コンセプトから実装まで一貫して。装飾ではなく、意味のある設計を積み重ねます。",
  }),
  Object.freeze({
    id: "web-app",
    nameJa: "Webアプリ／システム開発",
    meta: "§ 02 / Web App",
    tagline: "考えていることを、動くものに。",
    body:
      "要件整理から設計・実装・運用まで。Next.js / TypeScript / Supabase などモダンな構成で、小さく速く、運用しながら育てられる形に。",
  }),
  Object.freeze({
    id: "automation",
    nameJa: "業務改善／自動化",
    meta: "§ 03 / Automation",
    tagline: "1時間の作業を、1クリックに。",
    body:
      "Claude / GPT / Zapier / スクリプトを組み合わせて、繰り返し作業を仕組みに。“AIで何ができるか分からない”段階からでも大丈夫です。",
  }),
  Object.freeze({
    id: "mentoring",
    nameJa: "学習支援・キャリア支援",
    meta: "§ 04 / Mentoring",
    tagline: "“書ける”から、“任される”へ。",
    body:
      "未経験〜3年目エンジニアへの1on1伴走。コードレビュー・ペアプロ・ポートフォリオ・案件獲得まで、現場で通用する段階まで並走します。",
  }),
])
