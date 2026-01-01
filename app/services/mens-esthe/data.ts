import type {
  Feature,
  FAQItem,
  PortfolioItem,
  PricingItem,
  ProcessStep,
  ServiceInfo,
} from '@/lib/types/mens-esthe-service'

export const serviceInfo: ServiceInfo = {
  name: 'メンズエステ店向けサイト制作',
  catchphrase: '集客に強い、即戦力のサービスページ。',
  valueProposition: '最短で魅力が伝わる構成と導線設計',
  description:
    '参考LPの構造を踏まえ、既存サイトのデザインシステムで一貫したサービスページを提供します。',
  targetAudience: 'メンズエステ店の経営者・運営者',
}

export const features: Feature[] = [
  {
    id: 'feature-01',
    name: 'WEB予約受付',
    description: '予約導線を分かりやすく整理し、機会損失を減らします。',
    icon: 'CalendarCheck',
  },
  {
    id: 'feature-02',
    name: '求人ページ',
    description: '採用に必要な情報を見やすくまとめ、応募を促進します。',
    icon: 'Users',
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
