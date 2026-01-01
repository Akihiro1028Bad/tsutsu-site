import type {
  Feature,
  FAQItem,
  PortfolioItem,
  PricingItem,
  ProcessStep,
  ServiceInfo,
} from '@/lib/types/mens-esthe-service'

export const serviceInfo: ServiceInfo = {
  name: `メンズエステ特化サイト制作`,
  catchphrase: '集客に強い、即戦力のサービスページ。',
  valueProposition: '最短で魅力が伝わる構成と導線設計',
  description: `メンズエステ店向けに、集客と問い合わせに強いサービスページを制作します。`,
  targetAudience: 'メンズエステ店の経営者・運営者',
}

export const features: Feature[] = [
  {
    id: 'feature-03',
    name: 'セラピスト一覧ページ',
    description:
      'セラピストのプロフィールや得意分野を紹介し、お客様が自分に合ったセラピストを選べるようにします。',
    icon: 'UserCircle',
    image: {
      src: '/services/therapist-list-page.png',
      alt: 'セラピスト一覧ページのスクリーンショット',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'feature-04',
    name: '料金システム',
    description:
      'コース料金やオプション料金を分かりやすく表示し、お客様が予算に合わせてプランを選びやすくします。',
    icon: 'CreditCard',
    image: {
      src: '/services/pricing-system.png',
      alt: '料金システムのスクリーンショット',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'feature-05',
    name: 'スケジュール',
    description:
      '営業時間や休業日、セラピストの勤務スケジュールを公開し、お客様が予約しやすい環境を整えます。',
    icon: 'Calendar',
    image: {
      src: '/services/schedule.png',
      alt: 'スケジュールページのスクリーンショット',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'feature-06',
    name: '新着情報',
    description:
      'キャンペーン情報やお知らせをタイムリーに発信し、リピーター獲得や集客促進につなげます。',
    icon: 'Bell',
    image: {
      src: '/services/news.png',
      alt: '新着情報ページのスクリーンショット',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'feature-01',
    name: 'WEB予約受付',
    description: '予約導線を分かりやすく整理し、機会損失を減らします。',
    icon: 'CalendarCheck',
    image: {
      src: '/services/web-booking.png',
      alt: 'WEB予約受付ページのスクリーンショット',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'feature-02',
    name: '求人ページ',
    description: '採用に必要な情報を見やすくまとめ、応募を促進します。',
    icon: 'Users',
    image: {
      src: '/services/recruitment-page.png',
      alt: '求人ページのスクリーンショット',
      width: 1200,
      height: 800,
    },
  },
]

export const pricingItems: PricingItem[] = [
  {
    id: 'pricing-initial',
    name: '制作費',
    price: '¥100,000〜',
    description: '構成設計〜実装までを含みます。',
    category: 'initial',
  },
  {
    id: 'pricing-monthly',
    name: '管理費',
    price: '¥10,000〜',
    description: '保守・軽微な更新対応を含みます。',
    category: 'monthly',
  },
  {
    id: 'pricing-option-01',
    name: 'サイト修正（月3回まで）',
    price: '¥5,000',
    description: 'サイトの軽微な修正作業を行います。1ヶ月あたり3回まで対応可能です。',
    category: 'option',
  },
  {
    id: 'pricing-option-02',
    name: 'バナー制作',
    price: '¥5,000',
    description: 'キャンペーンやお知らせに使用するバナー画像の制作を行います。',
    category: 'option',
  },
  {
    id: 'pricing-option-03',
    name: 'バナー制作3点セット',
    price: '¥12,000',
    description: 'バナーを3点セットで制作する場合の特別価格です。',
    category: 'option',
  },
  {
    id: 'pricing-option-04',
    name: 'メインビジュアル制作',
    price: '¥5,000',
    description: 'トップページなどのメインビジュアル画像の制作を行います。',
    category: 'option',
  },
  {
    id: 'pricing-option-05',
    name: '追加ページ制作',
    price: '¥20,000〜',
    description: 'メニューページやアクセスページなど、新しいページの追加に対応します。',
    category: 'option',
  },
]

export const portfolioItems: PortfolioItem[] = []

export const processSteps: ProcessStep[] = [
  {
    id: 'process-step-01',
    stepNumber: 1,
    title: 'お問い合わせ',
    description: 'お問い合わせフォームまたはメールでご連絡ください。',
    icon: 'Mail',
  },
  {
    id: 'process-step-02',
    stepNumber: 2,
    title: 'ヒアリング・要件定義',
    description: '現状とゴールを整理し、必要な要件を詳しくお聞きします。',
    icon: 'MessageSquare',
  },
  {
    id: 'process-step-03',
    stepNumber: 3,
    title: '提案・見積もり',
    description: 'ご要望に基づいて最適な構成と見積もりをご提案します。',
    icon: 'FileText',
  },
  {
    id: 'process-step-04',
    stepNumber: 4,
    title: '制作・実装',
    description: '既存デザインに合わせて実装し、確認しながら進めます。',
    icon: 'Code',
  },
  {
    id: 'process-step-05',
    stepNumber: 5,
    title: '確認・修正',
    description: '完成したサイトを確認いただき、必要に応じて修正を行います。',
    icon: 'CheckCircle',
  },
  {
    id: 'process-step-06',
    stepNumber: 6,
    title: '公開・運用開始',
    description: 'サイトを公開し、運用を開始します。公開後も軽微な調整や改善をサポートします。',
    icon: 'Rocket',
  },
]

export const faqItems: FAQItem[] = [
  {
    id: 'faq-01',
    question: 'スマホから更新できますか？',
    answer: 'はい、スマートフォンからも更新可能です。管理画面はスマホでも使いやすい設計になっています。',
  },
  {
    id: 'faq-02',
    question: '複数のスタッフで管理できますか？',
    answer: '可能です。複数のスタッフが同時に管理画面にアクセスし、更新作業を行うことができます。',
  },
  {
    id: 'faq-03',
    question: 'デザインイメージがなくても制作可能ですか？',
    answer: 'はい、可能です。既存のサイトのデザインシステムを活用し、必要に応じてテンプレートや代替案を提案します。',
  },
  {
    id: 'faq-04',
    question: 'TwitterやLINEの連携はできますか？',
    answer: 'はい、対応可能です。Twitterの埋め込みやLINE公式アカウントとの連携など、ご要望に応じて実装します。',
  },
  {
    id: 'faq-05',
    question: 'サイトに記載する文章は作ってもらえますか？',
    answer: 'はい、対応可能です。ご要望に応じて、サイトに記載する文章の作成や修正のサポートを行います。',
  },
  {
    id: 'faq-06',
    question: 'もっと詳しくサイト制作のことを知りたい。',
    answer: 'お気軽にお問い合わせください。ご要望やご質問をお聞きし、最適なご提案をさせていただきます。',
  },
]
