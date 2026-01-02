import type {
  FAQItem,
  Feature,
  PortfolioItem,
  PricingItem,
  ProcessStep,
  ServiceInfo,
} from "@/lib/types/mens-esthe-service"

export const serviceInfoMock: ServiceInfo = {
  name: "メンズエステ店向けサイト制作",
  catchphrase: "集客に強い、即戦力のサービスページ。",
  valueProposition: "最短で魅力が伝わる構成と導線設計",
  description:
    "参考LPの構造を踏まえ、既存サイトのデザインシステムで一貫したサービスページを提供します。",
  targetAudience: "メンズエステ店の経営者・運営者",
}

export const featuresMock: Feature[] = [
  {
    id: "feature-01",
    name: "WEB予約受付",
    description: "予約導線を分かりやすく整理し、機会損失を減らします。",
    icon: "CalendarCheck",
  },
  {
    id: "feature-02",
    name: "求人ページ",
    description: "採用に必要な情報を見やすくまとめ、応募を促進します。",
    icon: "Users",
  },
]

export const pricingItemsMock: PricingItem[] = [
  {
    id: "pricing-initial",
    name: "初期費用",
    price: "¥100,000〜",
    description: "構成設計〜実装までを含みます。",
    category: "initial",
  },
  {
    id: "pricing-monthly",
    name: "月額費用",
    price: "¥10,000〜",
    description: "保守・軽微な更新対応を含みます。",
    category: "monthly",
  },
  {
    id: "pricing-option-01",
    name: "追加ページ制作",
    price: "¥20,000〜",
    description: "メニューやアクセス等の追加ページに対応します。",
    category: "option",
  },
]

export const portfolioItemsMock: PortfolioItem[] = [
  {
    id: "portfolio-01",
    storeName: "サンプル店舗A",
    siteUrl: "https://example.com/",
    thumbnailImage: {
      src: "/images/portfolio/sample-a.jpg",
      alt: "サンプル店舗Aのサイトサムネイル",
      width: 1200,
      height: 630,
    },
  },
]

export const processStepsMock: ProcessStep[] = [
  {
    id: "step-01",
    stepNumber: 1,
    title: "お問い合わせ",
    description: "お問い合わせフォームまたはメールでご連絡ください。",
    icon: "Mail",
  },
  {
    id: "step-02",
    stepNumber: 2,
    title: "ヒアリング・要件定義",
    description: "現状とゴールを整理し、必要な要件を詳しくお聞きします。",
    icon: "MessageSquare",
  },
  {
    id: "step-03",
    stepNumber: 3,
    title: "提案・見積もり",
    description: "ご要望に基づいて最適な構成と見積もりをご提案します。",
    icon: "FileText",
  },
  {
    id: "step-04",
    stepNumber: 4,
    title: "制作・実装",
    description: "既存パッケージに合わせて実装し、確認しながら進めます。",
    icon: "Code",
  },
  {
    id: "step-05",
    stepNumber: 5,
    title: "確認・修正",
    description: "完成したサイトを確認いただき、必要に応じて修正を行います。",
    icon: "CheckCircle",
  },
  {
    id: "step-06",
    stepNumber: 6,
    title: "公開・運用開始",
    description: "サイトを公開し、運用を開始します。公開後も軽微な調整や改善をサポートします。",
    icon: "Rocket",
  },
]

export const faqItemsMock: FAQItem[] = [
  {
    id: "faq-01",
    question: "スマホから更新できますか？",
    answer: "はい、スマートフォンからも更新可能です。管理画面はスマホでも使いやすい設計になっています。",
  },
  {
    id: "faq-02",
    question: "複数のスタッフで管理できますか？",
    answer: "可能です。複数のスタッフが同時に管理画面にアクセスし、更新作業を行うことができます。",
  },
  {
    id: "faq-03",
    question: "デザインイメージがなくても制作可能ですか？",
    answer: "はい、可能です。既存のサイトのデザインシステムを活用し、必要に応じてテンプレートや代替案を提案します。",
  },
  {
    id: "faq-04",
    question: "TwitterやLINEの連携はできますか？",
    answer: "はい、対応可能です。Twitterの埋め込みやLINE公式アカウントとの連携など、ご要望に応じて実装します。",
  },
  {
    id: "faq-05",
    question: "サイトに記載する文章は作ってもらえますか？",
    answer: "はい、対応可能です。ご要望に応じて、サイトに記載する文章の作成や修正のサポートを行います。",
  },
  {
    id: "faq-06",
    question: "もっと詳しくサイト制作のことを知りたい。",
    answer: "お気軽にお問い合わせください。ご要望やご質問をお聞きし、最適なご提案をさせていただきます。",
  },
]
