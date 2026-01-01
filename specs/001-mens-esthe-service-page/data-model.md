# Data Model: メンズエステ店向けサイト制作サービスページ

**Date**: 2025-01-27  
**Phase**: Phase 1 - Design & Contracts

## Overview

このドキュメントは、メンズエステ店向けサイト制作サービスページで使用するデータモデルを定義します。初期実装では、すべてのデータはコンポーネント内にハードコードされますが、将来的なCMS統合を考慮した型定義を提供します。

## Entity Definitions

### 1. ServiceInfo (サービス情報)

サービス全体の基本情報を表すエンティティです。

```typescript
type ServiceInfo = {
  name: string                    // サービス名
  catchphrase: string             // キャッチコピー
  valueProposition: string        // 主要な価値提案
  description: string             // サービス説明
  targetAudience: string[]        // 対象顧客のリスト
}
```

**バリデーションルール**:
- `name`: 必須、1文字以上100文字以内
- `catchphrase`: 必須、1文字以上200文字以内
- `valueProposition`: 必須、1文字以上500文字以内
- `description`: 必須、1文字以上1000文字以内
- `targetAudience`: 必須、1つ以上の要素を含む配列

**実装例**:

```typescript
const serviceInfo: ServiceInfo = {
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
```

### 2. Feature (主要機能)

サービスが提供する主要機能を表すエンティティです。

```typescript
type Feature = {
  id: string                       // 一意のID
  name: string                     // 機能名
  description: string              // 簡潔な説明
  icon: string                     // アイコン名（lucide-react）
}
```

**バリデーションルール**:
- `id`: 必須、一意であること
- `name`: 必須、1文字以上50文字以内
- `description`: 必須、1文字以上200文字以内
- `icon`: 必須、lucide-reactの有効なアイコン名

**実装例**:

```typescript
const features: Feature[] = [
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
```

### 3. PricingItem (料金項目)

料金情報の各項目を表すエンティティです。

```typescript
type PricingItem = {
  id: string                       // 一意のID
  name: string                     // 項目名
  price: string                    // 価格（表示用文字列、例: "50,000円〜"）
  description: string              // 簡潔な説明
  category: 'initial' | 'monthly' | 'option'  // 料金カテゴリ
}
```

**バリデーションルール**:
- `id`: 必須、一意であること
- `name`: 必須、1文字以上50文字以内
- `price`: 必須、1文字以上50文字以内
- `description`: 必須、1文字以上200文字以内
- `category`: 必須、'initial' | 'monthly' | 'option'のいずれか

**実装例**:

```typescript
const pricingItems: PricingItem[] = [
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
```

### 4. PortfolioItem (制作実績)

過去の制作実績を表すエンティティです。

```typescript
type PortfolioItem = {
  id: string                       // 一意のID
  storeName: string                // 店舗名
  siteUrl: string                // サイトURL
  thumbnailImage?: string          // サムネイル画像のパス（オプション）
}
```

**バリデーションルール**:
- `id`: 必須、一意であること
- `storeName`: 必須、1文字以上100文字以内
- `siteUrl`: 必須、有効なURL形式
- `thumbnailImage`: オプション、有効な画像パス（`/`で始まる相対パス）

**実装例**:

```typescript
const portfolioItems: PortfolioItem[] = [
  {
    id: 'portfolio-1',
    storeName: 'サンプルエステ店A',
    siteUrl: 'https://example-esthe-a.com',
    thumbnailImage: '/portfolio/esthe-a-thumb.jpg',
  },
  {
    id: 'portfolio-2',
    storeName: 'サンプルエステ店B',
    siteUrl: 'https://example-esthe-b.com',
    // thumbnailImageはオプション
  },
]
```

**エッジケース**:
- 制作実績が空の場合: 空配列として扱い、セクションには「現在準備中です」のメッセージを表示

### 5. ProcessStep (導入ステップ)

サービス導入までの流れを表すエンティティです。

```typescript
type ProcessStep = {
  id: string                       // 一意のID
  stepNumber: number              // ステップ番号（1から始まる）
  title: string                    // タイトル
  description: string              // 説明文
  icon?: string                    // アイコン名（lucide-react、オプション）
}
```

**バリデーションルール**:
- `id`: 必須、一意であること
- `stepNumber`: 必須、1以上の整数
- `title`: 必須、1文字以上50文字以内
- `description`: 必須、1文字以上300文字以内
- `icon`: オプション、lucide-reactの有効なアイコン名

**実装例**:

```typescript
const processSteps: ProcessStep[] = [
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
```

### 6. FAQItem (FAQ項目)

よくある質問とその回答を表すエンティティです。

```typescript
type FAQItem = {
  id: string                       // 一意のID
  question: string                 // 質問文
  answer: string                   // 回答文
}
```

**バリデーションルール**:
- `id`: 必須、一意であること
- `question`: 必須、1文字以上200文字以内
- `answer`: 必須、1文字以上1000文字以内

**実装例**:

```typescript
const faqItems: FAQItem[] = [
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

## Type Definitions

すべての型定義は`lib/types/mens-esthe-service.ts`に配置します。

```typescript
// lib/types/mens-esthe-service.ts

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

// セクションIDの定数定義
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

## Data Relationships

初期実装では、すべてのデータは独立した配列として管理されます。将来的なCMS統合を考慮すると、以下のような関係が考えられます：

- `ServiceInfo` → 1対多 → `Feature`（サービスに複数の機能が紐づく）
- `ServiceInfo` → 1対多 → `PricingItem`（サービスに複数の料金項目が紐づく）
- `ServiceInfo` → 1対多 → `PortfolioItem`（サービスに複数の制作実績が紐づく）
- `ServiceInfo` → 1対多 → `ProcessStep`（サービスに複数の導入ステップが紐づく）
- `ServiceInfo` → 1対多 → `FAQItem`（サービスに複数のFAQ項目が紐づく）

## State Management

初期実装では、状態管理ライブラリ（Redux、Zustandなど）は使用せず、Reactの`useState`と`useReducer`のみを使用します。

- FAQセクションのアコーディオン開閉状態: `useState<boolean>`
- 外部リンクのエラー状態: `useState<string | null>`
- その他のUI状態: 各コンポーネント内で`useState`を使用

## Data Flow

1. **データ定義**: 各セクションコンポーネント内にハードコードされたデータを定義
2. **型チェック**: TypeScriptの型定義により、データの整合性を保証
3. **レンダリング**: コンポーネントがデータを受け取り、UIをレンダリング
4. **ユーザー操作**: ユーザーの操作（クリック、スクロールなど）に応じて状態を更新

## Future Considerations

将来的なCMS統合を考慮した設計：

1. **データフェッチ**: 現在はハードコードされたデータを、将来的にはAPIから取得
2. **型定義の拡張**: CMSのレスポンス形式に合わせて型定義を拡張
3. **キャッシュ戦略**: Next.jsの`fetch` APIを使用したキャッシュ戦略の実装
4. **ISR（Incremental Static Regeneration）**: 定期的にデータを再生成する仕組み

## Validation Functions

データのバリデーション関数は`lib/utils/mens-esthe-service.ts`に配置します。

```typescript
// lib/utils/mens-esthe-service.ts

export function validateServiceInfo(data: unknown): data is ServiceInfo {
  // バリデーションロジック
}

export function validateFeature(data: unknown): data is Feature {
  // バリデーションロジック
}

// その他のバリデーション関数...
```

**初級エンジニア向けの説明**:
- 型ガード関数（`data is ServiceInfo`）を使用することで、TypeScriptの型チェックを活用できます
- バリデーション関数は、データの整合性を保証するために使用します
- 将来的なCMS統合時には、APIレスポンスのバリデーションに使用します

