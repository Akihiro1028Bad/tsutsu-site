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
    name: '初期費用',
    price: '¥100,000〜',
    description: '構成設計〜実装までを含みます。',
    category: 'initial',
  },
  {
    id: 'pricing-monthly',
    name: '月額費用',
    price: '¥10,000〜',
    description: '保守・軽微な更新対応を含みます。',
    category: 'monthly',
  },
  {
    id: 'pricing-option-01',
    name: '追加ページ制作',
    price: '¥20,000〜',
    description: 'メニューやアクセス等の追加ページに対応します。',
    category: 'option',
  },
]

export const portfolioItems: PortfolioItem[] = []

export const processSteps: ProcessStep[] = [
  {
    id: 'process-step-01',
    stepNumber: 1,
    title: 'ヒアリング',
    description: '現状とゴールを整理し、必要な要件を決めます。',
    icon: 'MessageSquare',
  },
  {
    id: 'process-step-02',
    stepNumber: 2,
    title: '制作',
    description: '既存デザインに合わせて実装し、確認しながら進めます。',
    icon: 'Code',
  },
  {
    id: 'process-step-03',
    stepNumber: 3,
    title: '公開',
    description: '公開後も軽微な調整や改善をサポートします。',
    icon: 'Rocket',
  },
]

export const faqItems: FAQItem[] = [
  {
    id: 'faq-01',
    question: '制作期間はどれくらいですか？',
    answer: '内容にもよりますが、通常は1〜2週間程度です。',
  },
  {
    id: 'faq-02',
    question: '素材がなくても依頼できますか？',
    answer: '可能です。必要に応じてテンプレートや代替案を提案します。',
  },
]
