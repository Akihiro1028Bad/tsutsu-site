# Quick Start Guide: メンズエステ店向けサイト制作サービスページ

**Date**: 2025-01-27  
**Phase**: Phase 1 - Design & Contracts

## Overview

このガイドは、メンズエステ店向けサイト制作サービスページの実装を開始するためのクイックスタートガイドです。初級エンジニアでも迷わないように、ステップバイステップで説明します。

## Prerequisites

実装を開始する前に、以下を確認してください：

1. **Node.js**: 18.0.0以上がインストールされていること
2. **依存関係**: `pnpm install`が完了していること
3. **開発環境**: 開発サーバーが起動できること（`pnpm run dev`）

## Step 1: 型定義の作成

まず、型定義ファイルを作成します。

**ファイル**: `lib/types/mens-esthe-service.ts`

```typescript
export type ServiceInfo = {
  name: string
  catchphrase: string
  valueProposition: string
  description: string
  targetAudience: string[]
}

export type Feature = {
  id: string
  name: string
  description: string
  icon: string
}

export type PricingItem = {
  id: string
  name: string
  price: string
  description: string
  category: 'initial' | 'monthly' | 'option'
}

export type PortfolioItem = {
  id: string
  storeName: string
  siteUrl: string
  thumbnailImage?: string
}

export type ProcessStep = {
  id: string
  stepNumber: number
  title: string
  description: string
  icon?: string
}

export type FAQItem = {
  id: string
  question: string
  answer: string
}

export const SECTION_IDS = {
  hero: 'hero',
  features: 'features',
  pricing: 'pricing',
  portfolio: 'portfolio',
  process: 'process',
  faq: 'faq',
  contact: 'contact',
} as const

export type SectionId = typeof SECTION_IDS[keyof typeof SECTION_IDS]
```

**初級エンジニア向けの説明**:
- 型定義は、データの構造を定義するものです
- `type`キーワードで型を定義します
- `?`はオプショナル（省略可能）なプロパティを表します
- `as const`は、定数をリテラル型として定義します

## Step 2: データファイルの作成

次に、ハードコードされたデータファイルを作成します。

**ファイル**: `app/services/mens-esthe/data.ts`

```typescript
import {
  ServiceInfo,
  Feature,
  PricingItem,
  PortfolioItem,
  ProcessStep,
  FAQItem,
} from '@/lib/types/mens-esthe-service'

export const serviceInfo: ServiceInfo = {
  name: 'メンズエステ店向けサイト制作サービス',
  catchphrase: '集客と予約を自動化する、メンズエステ店専用のWebサイト',
  valueProposition: 'スケジュール管理、WEB予約受付、求人ページを一元管理できるWebサイトを提供します。',
  description: 'メンズエステ店向けのWebサイト制作サービス。スケジュール管理、WEB予約受付、求人ページなどの機能を提供し、集客と予約を自動化します。',
  targetAudience: [
    'メンズエステ店の経営者',
    'メンズエステ店の運営者',
    '新規開業を検討している方',
  ],
}

export const features: Feature[] = [
  {
    id: 'schedule-management',
    name: 'スケジュール管理',
    description: 'スタッフのスケジュールを一元管理し、予約状況をリアルタイムで確認できます。',
    icon: 'Calendar',
  },
  {
    id: 'web-booking',
    name: 'WEB予約受付',
    description: '24時間365日、自動で予約を受け付けます。顧客はいつでも予約可能です。',
    icon: 'CalendarCheck',
  },
  {
    id: 'recruitment-page',
    name: '求人ページ',
    description: '採用活動に特化したページを提供し、優秀な人材の獲得をサポートします。',
    icon: 'Users',
  },
]

export const pricingItems: PricingItem[] = [
  {
    id: 'initial-fee',
    name: '初期費用',
    price: '50,000円〜',
    description: 'サイト制作の初期費用です。機能やページ数に応じて変動します。',
    category: 'initial',
  },
  {
    id: 'monthly-fee',
    name: '月額費用',
    price: '10,000円〜',
    description: 'サーバー代、保守・運用費用を含む月額費用です。',
    category: 'monthly',
  },
  {
    id: 'option-seo',
    name: 'SEO対策オプション',
    price: '5,000円/月',
    description: '検索エンジン最適化のためのオプションサービスです。',
    category: 'option',
  },
]

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'portfolio-1',
    storeName: 'サンプルエステ店A',
    siteUrl: 'https://example-esthe-a.com',
    thumbnailImage: '/portfolio/esthe-a-thumb.jpg',
  },
  // 制作実績が空の場合は空配列: []
]

export const processSteps: ProcessStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'お問い合わせ',
    description: 'お問い合わせフォームまたはメールでご連絡ください。',
    icon: 'Mail',
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'ヒアリング',
    description: 'お客様のご要望を詳しくお聞きし、最適なプランを提案します。',
    icon: 'MessageSquare',
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: '制作開始',
    description: 'ご提案内容にご了承いただいた後、制作を開始します。',
    icon: 'Code',
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: '公開・運用開始',
    description: 'サイトを公開し、運用を開始します。',
    icon: 'Rocket',
  },
]

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'どのくらいの期間で完成しますか？',
    answer: 'サイトの規模や機能によって異なりますが、基本的には2〜4週間程度で完成します。',
  },
  {
    id: 'faq-2',
    question: '既存のサイトから移行できますか？',
    answer: 'はい、既存のサイトから移行することも可能です。データ移行もサポートいたします。',
  },
]
```

**初級エンジニア向けの説明**:
- データは定数として定義し、`export`でエクスポートします
- 配列は`[]`で定義します
- オブジェクトは`{}`で定義します
- コメントは`//`で記述します

## Step 3: ディレクトリ構造の作成

コンポーネント用のディレクトリを作成します。

```bash
mkdir -p components/MensEstheService
```

**初級エンジニア向けの説明**:
- `mkdir -p`は、ディレクトリが存在しない場合に作成します
- `-p`オプションは、親ディレクトリも必要に応じて作成します

## Step 4: メインページコンポーネントの作成

メインページコンポーネントを作成します。

**ファイル**: `app/services/mens-esthe/page.tsx`

```typescript
import type { Metadata } from 'next'
import HeroSection from '@/components/MensEstheService/HeroSection'
import FeaturesSection from '@/components/MensEstheService/FeaturesSection'
import PricingSection from '@/components/MensEstheService/PricingSection'
import PortfolioSection from '@/components/MensEstheService/PortfolioSection'
import ProcessSection from '@/components/MensEstheService/ProcessSection'
import FAQSection from '@/components/MensEstheService/FAQSection'
import StructuredData from '@/components/MensEstheService/StructuredData'
import Contact from '@/components/Contact'
import {
  serviceInfo,
  features,
  pricingItems,
  portfolioItems,
  processSteps,
  faqItems,
} from './data'

export const metadata: Metadata = {
  title: 'メンズエステ店向けサイト制作サービス | tsutsu',
  description: 'メンズエステ店向けのWebサイト制作サービス。スケジュール管理、WEB予約受付、求人ページなどの機能を提供します。',
  openGraph: {
    title: 'メンズエステ店向けサイト制作サービス | tsutsu',
    description: 'メンズエステ店向けのWebサイト制作サービス。',
    type: 'website',
    url: '/services/mens-esthe',
    images: [
      {
        url: '/services/mens-esthe-og.png',
        width: 1200,
        height: 630,
        alt: 'メンズエステ店向けサイト制作サービス',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'メンズエステ店向けサイト制作サービス | tsutsu',
    description: 'メンズエステ店向けのWebサイト制作サービス。',
    images: ['/services/mens-esthe-og.png'],
  },
}

export default function MensEstheServicePage() {
  return (
    <>
      <StructuredData />
      <main>
        <HeroSection serviceInfo={serviceInfo} />
        <FeaturesSection features={features} />
        <PricingSection pricingItems={pricingItems} />
        <PortfolioSection portfolioItems={portfolioItems} />
        <ProcessSection processSteps={processSteps} />
        <FAQSection faqItems={faqItems} />
        <Contact />
      </main>
    </>
  )
}
```

**初級エンジニア向けの説明**:
- `export const metadata`でメタデータを定義します
- `export default`でデフォルトエクスポート（メインコンポーネント）を定義します
- `import`で他のファイルからコンポーネントやデータをインポートします
- `<>`はReact Fragmentで、不要なDOM要素を追加せずに複数の要素を返します

## Step 5: エラーページとローディングページの作成

エラーページとローディングページを作成します。

**ファイル**: `app/services/mens-esthe/error.tsx`

既存の`app/blog/[slug]/error.tsx`を参考に、サービスページ用にカスタマイズします。

**ファイル**: `app/services/mens-esthe/loading.tsx`

既存の`app/blog/[slug]/loading.tsx`を参考に、サービスページ用にカスタマイズします。

**初級エンジニア向けの説明**:
- `error.tsx`は`'use client'`ディレクティブが必要です
- `loading.tsx`はServer Componentとして実装できます
- 既存のファイルをコピーして、メッセージを変更します

## Step 6: セクションコンポーネントの実装順序

セクションコンポーネントは、以下の順序で実装することを推奨します：

1. **HeroSection**: 最も重要なセクションなので、最初に実装
2. **FeaturesSection**: 比較的シンプルな構造
3. **PricingSection**: データ構造が明確
4. **PortfolioSection**: エラーハンドリングが必要
5. **ProcessSection**: ステップ形式の表示
6. **FAQSection**: アコーディオン機能が必要

**初級エンジニア向けの説明**:
- 簡単なコンポーネントから実装することで、段階的に学習できます
- 各コンポーネントを実装したら、ブラウザで確認しながら進めます

## Step 7: コンポーネント実装のテンプレート

各セクションコンポーネントは、以下のテンプレートを使用します：

```typescript
'use client'

import { motion } from 'framer-motion'
import { SECTION_IDS } from '@/lib/types/mens-esthe-service'
// 必要な型をインポート

interface ComponentProps {
  // propsの型定義
}

export default function Component({ /* props */ }: ComponentProps) {
  return (
    <section id={SECTION_IDS.xxx} aria-labelledby="xxx-heading">
      <h2 id="xxx-heading">セクションタイトル</h2>
      {/* コンテンツ */}
    </section>
  )
}
```

**初級エンジニア向けの説明**:
- `'use client'`は、クライアントコンポーネントであることを示します
- `interface`でpropsの型を定義します
- `export default`でコンポーネントをエクスポートします

## Step 8: 構造化データの実装

構造化データコンポーネントを作成します。

**ファイル**: `components/MensEstheService/StructuredData.tsx`

`research.md`の実装例を参考に、Schema.org Serviceスキーマを実装します。

## Step 9: テストの実装

各コンポーネントのテストを実装します。

**ファイル**: `tests/ui/mens-esthe-service/HeroSection.test.tsx`

```typescript
import { render, screen } from '@testing-library/react'
import HeroSection from '@/components/MensEstheService/HeroSection'
import { serviceInfo } from '@/app/services/mens-esthe/data'

describe('HeroSection', () => {
  it('サービス名が表示される', () => {
    render(<HeroSection serviceInfo={serviceInfo} />)
    expect(screen.getByText(serviceInfo.name)).toBeInTheDocument()
  })
})
```

**初級エンジニア向けの説明**:
- `describe`でテストスイートを定義します
- `it`で個別のテストケースを定義します
- `render`でコンポーネントをレンダリングします
- `screen.getByText`でテキストを検索します
- `expect`でアサーション（期待値の検証）を行います

## 実装チェックリスト

実装を進める際は、以下のチェックリストを確認してください：

- [ ] 型定義ファイルを作成した
- [ ] データファイルを作成した
- [ ] メインページコンポーネントを作成した
- [ ] エラーページとローディングページを作成した
- [ ] 各セクションコンポーネントを実装した
- [ ] 構造化データを実装した
- [ ] テストを実装した
- [ ] レスポンシブデザインを確認した
- [ ] アクセシビリティを確認した
- [ ] SEOを確認した

## トラブルシューティング

### エラー: モジュールが見つからない

**原因**: インポートパスが間違っている

**解決方法**: 
- `@/`エイリアスが正しく設定されているか確認
- ファイルパスが正しいか確認

### エラー: 型エラー

**原因**: 型定義が一致していない

**解決方法**:
- TypeScriptのエラーメッセージを確認
- 型定義ファイルを確認

### エラー: アニメーションが動作しない

**原因**: framer-motionの設定が間違っている

**解決方法**:
- `'use client'`ディレクティブが設定されているか確認
- `viewport`プロップが正しく設定されているか確認

## 次のステップ

実装が完了したら、以下を確認してください：

1. **コードレビュー**: Constitution原則に準拠しているか確認
2. **テスト**: すべてのテストが通過するか確認
3. **パフォーマンス**: Lighthouseでパフォーマンススコアを確認
4. **アクセシビリティ**: アクセシビリティツールで確認
5. **SEO**: 構造化データが正しく実装されているか確認

## 参考資料

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Schema.org Service Schema](https://schema.org/Service)
- [React Testing Library Documentation](https://testing-library.com/react)

**初級エンジニア向けの説明**:
- わからないことがあったら、上記の参考資料を確認してください
- エラーが発生したら、エラーメッセージをよく読んで、原因を特定してください
- 実装中に不明な点があれば、チームメンバーに質問してください

