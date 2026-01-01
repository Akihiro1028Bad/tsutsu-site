# Component Contracts: メンズエステ店向けサイト制作サービスページ

**Date**: 2025-01-27  
**Phase**: Phase 1 - Design & Contracts

## Overview

このドキュメントは、メンズエステ店向けサイト制作サービスページのコンポーネント間のコントラクト（契約）を定義します。各コンポーネントのprops、イベントハンドラ、期待される動作を明確にすることで、実装の一貫性と保守性を確保します。

## Component Hierarchy

```
app/services/mens-esthe/page.tsx (Server Component)
├── components/MensEstheService/HeroSection.tsx (Client Component)
├── components/MensEstheService/FeaturesSection.tsx (Client Component)
├── components/MensEstheService/PricingSection.tsx (Client Component)
├── components/MensEstheService/PortfolioSection.tsx (Client Component)
├── components/MensEstheService/ProcessSection.tsx (Client Component)
├── components/MensEstheService/FAQSection.tsx (Client Component)
└── components/MensEstheService/ContactCTA.tsx (Client Component)
```

## Component Contracts

### 1. HeroSection

**Location**: `components/MensEstheService/HeroSection.tsx`

**Type**: Client Component (`'use client'`)

**Props**:

```typescript
interface HeroSectionProps {
  serviceInfo: ServiceInfo
}
```

**Responsibilities**:
- サービス名、キャッチコピー、価値提案を表示
- お問い合わせCTAボタンを表示
- スクロール連動アニメーションを実装

**Events**:
- お問い合わせCTAクリック時: `#contact`セクションにスムーズスクロール

**Accessibility**:
- `role="banner"`（セマンティックHTMLの`<section>`を使用）
- 見出しは`<h1>`タグを使用
- CTAボタンは`aria-label`で説明を提供

**実装例**:

```typescript
'use client'

import { motion } from 'framer-motion'
import { ServiceInfo } from '@/lib/types/mens-esthe-service'
import { SECTION_IDS } from '@/lib/types/mens-esthe-service'

interface HeroSectionProps {
  serviceInfo: ServiceInfo
}

export default function HeroSection({ serviceInfo }: HeroSectionProps) {
  const handleContactClick = () => {
    const contactSection = document.getElementById(SECTION_IDS.contact)
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id={SECTION_IDS.hero} role="banner" className="hero-section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>{serviceInfo.name}</h1>
        <p>{serviceInfo.catchphrase}</p>
        <p>{serviceInfo.valueProposition}</p>
        <button
          onClick={handleContactClick}
          aria-label="お問い合わせフォームへ移動"
        >
          お問い合わせ
        </button>
      </motion.div>
    </section>
  )
}
```

### 2. FeaturesSection

**Location**: `components/MensEstheService/FeaturesSection.tsx`

**Type**: Client Component (`'use client'`)

**Props**:

```typescript
interface FeaturesSectionProps {
  features: Feature[]
}
```

**Responsibilities**:
- 主要機能の一覧を表示
- 各機能にアイコンを表示
- スクロール連動アニメーションを実装

**Events**: なし

**Accessibility**:
- `aria-labelledby`でセクションの見出しを関連付け
- 各機能カードは`<article>`タグを使用

**実装例**:

```typescript
'use client'

import { motion } from 'framer-motion'
import { Feature } from '@/lib/types/mens-esthe-service'
import { SECTION_IDS } from '@/lib/types/mens-esthe-service'
import { Calendar, CalendarCheck, Users } from 'lucide-react'

interface FeaturesSectionProps {
  features: Feature[]
}

const iconMap: Record<string, React.ComponentType> = {
  Calendar,
  CalendarCheck,
  Users,
  // その他のアイコン...
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section id={SECTION_IDS.features} aria-labelledby="features-heading">
      <h2 id="features-heading">主要機能</h2>
      <div className="features-grid">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon]
          return (
            <motion.article
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="feature-card"
            >
              {Icon && <Icon className="feature-icon" />}
              <h3>{feature.name}</h3>
              <p>{feature.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
```

### 3. PricingSection

**Location**: `components/MensEstheService/PricingSection.tsx`

**Type**: Client Component (`'use client'`)

**Props**:

```typescript
interface PricingSectionProps {
  pricingItems: PricingItem[]
}
```

**Responsibilities**:
- 料金情報をカテゴリごとに表示（初期費用、月額費用、オプション料金）
- お問い合わせCTAボタンを表示（料金セクション後）

**Events**:
- お問い合わせCTAクリック時: `#contact`セクションにスムーズスクロール

**Accessibility**:
- 料金情報は`<table>`または`<dl>`タグを使用（セマンティックHTML）
- 価格は`<strong>`タグで強調

**実装例**:

```typescript
'use client'

import { PricingItem } from '@/lib/types/mens-esthe-service'
import { SECTION_IDS } from '@/lib/types/mens-esthe-service'
import ContactCTA from './ContactCTA'

interface PricingSectionProps {
  pricingItems: PricingItem[]
}

export default function PricingSection({ pricingItems }: PricingSectionProps) {
  const initialFees = pricingItems.filter(item => item.category === 'initial')
  const monthlyFees = pricingItems.filter(item => item.category === 'monthly')
  const optionFees = pricingItems.filter(item => item.category === 'option')

  return (
    <section id={SECTION_IDS.pricing} aria-labelledby="pricing-heading">
      <h2 id="pricing-heading">料金情報</h2>
      
      <div className="pricing-categories">
        <div className="pricing-category">
          <h3>初期費用</h3>
          {initialFees.map(item => (
            <div key={item.id} className="pricing-item">
              <dt>{item.name}</dt>
              <dd>
                <strong>{item.price}</strong>
                <p>{item.description}</p>
              </dd>
            </div>
          ))}
        </div>
        
        {/* 月額費用、オプション料金も同様 */}
      </div>

      <ContactCTA />
    </section>
  )
}
```

### 4. PortfolioSection

**Location**: `components/MensEstheService/PortfolioSection.tsx`

**Type**: Client Component (`'use client'`)

**Props**:

```typescript
interface PortfolioSectionProps {
  portfolioItems: PortfolioItem[]
}
```

**Responsibilities**:
- 制作実績の一覧を表示
- 各実績にサムネイル画像を表示（オプション）
- 外部リンクのエラーハンドリングを実装

**Events**:
- リンククリック時: 新しいタブで開く、エラー時はエラーメッセージを表示

**Accessibility**:
- 外部リンクには`rel="noopener noreferrer"`を設定
- エラーメッセージは`role="alert"`を使用

**実装例**:

```typescript
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PortfolioItem } from '@/lib/types/mens-esthe-service'
import { SECTION_IDS } from '@/lib/types/mens-esthe-service'

interface PortfolioSectionProps {
  portfolioItems: PortfolioItem[]
}

export default function PortfolioSection({ portfolioItems }: PortfolioSectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleLinkClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: PortfolioItem
  ) => {
    e.preventDefault()
    setErrors(prev => ({ ...prev, [item.id]: '' }))

    try {
      const newWindow = window.open(item.siteUrl, '_blank', 'noopener,noreferrer')
      if (!newWindow) {
        setErrors(prev => ({
          ...prev,
          [item.id]: 'リンクを開くことができませんでした。ポップアップブロッカーを確認してください。',
        }))
        return
      }

      setTimeout(() => {
        if (newWindow.closed) {
          setErrors(prev => ({
            ...prev,
            [item.id]: 'リンクが無効な可能性があります。しばらくしてから再度お試しください。',
          }))
        }
      }, 1000)
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        [item.id]: 'リンクを開くことができませんでした。しばらくしてから再度お試しください。',
      }))
    }
  }

  if (portfolioItems.length === 0) {
    return (
      <section id={SECTION_IDS.portfolio} aria-labelledby="portfolio-heading">
        <h2 id="portfolio-heading">制作実績</h2>
        <p>現在準備中です。</p>
      </section>
    )
  }

  return (
    <section id={SECTION_IDS.portfolio} aria-labelledby="portfolio-heading">
      <h2 id="portfolio-heading">制作実績</h2>
      <div className="portfolio-grid">
        {portfolioItems.map(item => (
          <article key={item.id} className="portfolio-card">
            {item.thumbnailImage && (
              <Image
                src={item.thumbnailImage}
                alt={`${item.storeName}のサムネイル画像`}
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
            )}
            <h3>{item.storeName}</h3>
            {errors[item.id] && (
              <div role="alert" className="error-message">
                {errors[item.id]}
              </div>
            )}
            <a
              href={item.siteUrl}
              onClick={(e) => handleLinkClick(e, item)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.storeName}のサイトを新しいタブで開く`}
            >
              サイトを見る
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
```

### 5. ProcessSection

**Location**: `components/MensEstheService/ProcessSection.tsx`

**Type**: Client Component (`'use client'`)

**Props**:

```typescript
interface ProcessSectionProps {
  processSteps: ProcessStep[]
}
```

**Responsibilities**:
- 導入プロセスをステップ形式で表示
- 各ステップにアイコンを表示（オプション）
- スクロール連動アニメーションを実装

**Events**: なし

**Accessibility**:
- ステップ番号は`aria-label`で説明を提供
- 各ステップは`<article>`タグを使用

**実装例**:

```typescript
'use client'

import { motion } from 'framer-motion'
import { ProcessStep } from '@/lib/types/mens-esthe-service'
import { SECTION_IDS } from '@/lib/types/mens-esthe-service'
import { Mail, MessageSquare, Code, Rocket } from 'lucide-react'

interface ProcessSectionProps {
  processSteps: ProcessStep[]
}

const iconMap: Record<string, React.ComponentType> = {
  Mail,
  MessageSquare,
  Code,
  Rocket,
  // その他のアイコン...
}

export default function ProcessSection({ processSteps }: ProcessSectionProps) {
  return (
    <section id={SECTION_IDS.process} aria-labelledby="process-heading">
      <h2 id="process-heading">導入までの流れ</h2>
      <ol className="process-steps">
        {processSteps.map((step, index) => {
          const Icon = step.icon ? iconMap[step.icon] : null
          return (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <article className="process-step">
                <div className="step-number" aria-label={`ステップ${step.stepNumber}`}>
                  {step.stepNumber}
                </div>
                {Icon && <Icon className="step-icon" />}
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
```

### 6. FAQSection

**Location**: `components/MensEstheService/FAQSection.tsx`

**Type**: Client Component (`'use client'`)

**Props**:

```typescript
interface FAQSectionProps {
  faqItems: FAQItem[]
}
```

**Responsibilities**:
- FAQ項目をアコーディオン形式で表示
- 質問と回答の開閉を管理

**Events**:
- 質問クリック時: 回答の表示/非表示を切り替え

**Accessibility**:
- `aria-expanded`で開閉状態を通知
- `aria-controls`で制御対象の要素を指定
- キーボード操作（Enter、Space）をサポート

**実装例**:

```typescript
'use client'

import { useState } from 'react'
import { FAQItem } from '@/lib/types/mens-esthe-service'
import { SECTION_IDS } from '@/lib/types/mens-esthe-service'

interface FAQSectionProps {
  faqItems: FAQItem[]
}

export default function FAQSection({ faqItems }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section id={SECTION_IDS.faq} aria-labelledby="faq-heading">
      <h2 id="faq-heading">よくある質問</h2>
      <div role="region" aria-label="FAQ項目">
        {faqItems.map((item, index) => {
          const isOpen = openItems.has(item.id)
          return (
            <div key={item.id} className="faq-item">
              <button
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                className="faq-question"
              >
                {item.question}
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`faq-answer ${isOpen ? 'open' : ''}`}
              >
                {item.answer}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

### 7. ContactCTA

**Location**: `components/MensEstheService/ContactCTA.tsx`

**Type**: Client Component (`'use client'`)

**Props**: なし

**Responsibilities**:
- お問い合わせへの導線を提供
- 統一されたCTAデザインを提供

**Events**:
- ボタンクリック時: `#contact`セクションにスムーズスクロール

**Accessibility**:
- `aria-label`でボタンの説明を提供

**実装例**:

```typescript
'use client'

import { SECTION_IDS } from '@/lib/types/mens-esthe-service'

export default function ContactCTA() {
  const handleClick = () => {
    const contactSection = document.getElementById(SECTION_IDS.contact)
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="contact-cta">
      <button
        onClick={handleClick}
        aria-label="お問い合わせフォームへ移動"
        className="cta-button"
      >
        お問い合わせ
      </button>
    </div>
  )
}
```

## Page Component Contract

### app/services/mens-esthe/page.tsx

**Type**: Server Component

**Responsibilities**:
- すべてのセクションコンポーネントを統合
- メタデータを設定
- 構造化データを追加

**実装例**:

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
import { serviceInfo, features, pricingItems, portfolioItems, processSteps, faqItems } from './data'

export const metadata: Metadata = {
  title: 'メンズエステ店向けサイト制作サービス | tsutsu',
  description: 'メンズエステ店向けのWebサイト制作サービス。スケジュール管理、WEB予約受付、求人ページなどの機能を提供します。',
  // ... その他のメタデータ
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

## Error Handling Contracts

### Error Boundary

**Location**: `app/services/mens-esthe/error.tsx`

**Type**: Client Component (`'use client'`)

**Props**:

```typescript
interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}
```

**Responsibilities**:
- エラー発生時にエラーメッセージを表示
- 再試行機能を提供
- ホームへのリンクを提供

## Loading State Contracts

### Loading Component

**Location**: `app/services/mens-esthe/loading.tsx`

**Type**: Server Component

**Props**: なし

**Responsibilities**:
- ページ読み込み中のスケルトンUIを表示
- 実際のコンテンツ構造に合わせたスケルトンを提供

## まとめ

このコントラクトにより、以下のことが保証されます：

1. **型安全性**: すべてのpropsに型定義を提供
2. **一貫性**: 各コンポーネントの責務と動作が明確
3. **アクセシビリティ**: ARIA属性とセマンティックHTMLの適切な使用
4. **保守性**: 明確なコントラクトにより、将来の変更が容易

**初級エンジニア向けの説明**:
- コントラクトは、コンポーネント間の「約束事」を定義します
- 各コンポーネントは、定義されたpropsを受け取り、期待される動作を実装します
- コントラクトに従うことで、コードの一貫性と保守性が向上します

