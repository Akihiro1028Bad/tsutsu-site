# Research: メンズエステ店向けサイト制作サービスページ

**Date**: 2025-01-27  
**Phase**: Phase 0 - Outline & Research

## Research Summary

このドキュメントは、メンズエステ店向けサイト制作サービスページの実装に必要な技術的な決定事項をまとめたものです。Context7のMCPツールを使用して、Next.js 16、framer-motion、Schema.org Serviceスキーマに関する最新のベストプラクティスを調査しました。

## 1. Next.js 16 App Router - メタデータとSEO

### Decision: Metadata APIを使用したメタタグ設定

**Rationale**: Next.js 16のApp Routerでは、`metadata`オブジェクトをエクスポートすることで、ページごとにメタタグを設定できます。これは`next/head`よりも型安全で、Server Componentsで使用可能です。

**Alternatives considered**:
- `next/head`（Pages Routerの方法）: App Routerでは非推奨
- 手動での`<head>`タグ: 型安全性が低く、推奨されない

**実装例**:

```typescript
// app/services/mens-esthe/page.tsx
import type { Metadata } from 'next'

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
```

**初級エンジニア向けの説明**:
- `metadata`オブジェクトをエクスポートすることで、Next.jsが自動的に`<head>`タグにメタタグを追加します
- `title`と`description`は必須です
- `openGraph`と`twitter`は、SNSでのシェア時に表示される情報を設定します
- 画像は`/public`ディレクトリに配置し、相対パスで指定します

### Decision: error.tsxとloading.tsxの実装

**Rationale**: Next.js 16のApp Routerでは、`error.tsx`と`loading.tsx`を配置することで、エラーハンドリングとローディング状態を自動的に処理できます。

**実装例**:

```typescript
// app/services/mens-esthe/error.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('サービスページでエラーが発生しました:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-white">
      <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-12 md:py-32">
        <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-slate-950 tracking-tight">
              エラーが発生しました
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal mb-8">
              ページの読み込み中に問題が発生しました。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-slate-950 text-white font-light hover:bg-slate-800 transition-colors"
              >
                再試行
              </button>
              <Link
                href="/"
                className="px-6 py-3 border border-slate-300 text-slate-950 font-light hover:bg-slate-50 transition-colors"
              >
                ホームに戻る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
```

```typescript
// app/services/mens-esthe/loading.tsx
export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-12 md:py-32">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
          {/* Hero Skeleton */}
          <div className="mb-8 sm:mb-12">
            <div className="h-10 sm:h-12 md:h-16 w-full bg-slate-200/40 rounded animate-pulse mb-4" />
            <div className="h-6 w-3/4 mx-auto bg-slate-200/40 rounded animate-pulse mb-6" />
            <div className="h-12 w-48 mx-auto bg-slate-200/40 rounded animate-pulse" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 w-full bg-slate-200/40 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
```

**初級エンジニア向けの説明**:
- `error.tsx`は`'use client'`ディレクティブが必要です（クライアントコンポーネント）
- `error`プロップにはエラー情報が、`reset`プロップには再試行関数が渡されます
- `loading.tsx`はServer Componentとして実装できます
- スケルトンUIは、実際のコンテンツの構造に合わせて作成します

## 2. Framer Motion - スクロール連動アニメーション

### Decision: useScrollとuseTransformを使用したスクロール連動アニメーション

**Rationale**: framer-motionの`useScroll``と`useTransform`を使用することで、スクロール位置に応じたアニメーションを実装できます。既存サイト（`components/Services.tsx`）でも同様のパターンが使用されています。

**実装例**:

```typescript
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  return (
    <section ref={ref} id="features" className="py-12 md:py-24">
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-6"
      >
        {/* コンテンツ */}
      </motion.div>
    </section>
  )
}
```

**初級エンジニア向けの説明**:
- `useRef`で要素への参照を取得します
- `useScroll`でスクロール位置を監視します（`target`で監視対象を指定）
- `useTransform`でスクロール位置を別の値（opacity、yなど）に変換します
- `offset`は`['start end', 'end start']`のように、要素の表示範囲を指定します

### Decision: whileInViewとviewportを使用したビューポート連動アニメーション

**Rationale**: 要素がビューポートに入ったときにアニメーションを開始するパターンは、既存サイトでも使用されています。`whileInView`と`viewport`プロップを使用します。

**実装例**:

```typescript
'use client'

import { motion } from 'framer-motion'

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="feature-card"
    >
      {/* コンテンツ */}
    </motion.div>
  )
}
```

**初級エンジニア向けの説明**:
- `initial`は初期状態（非表示、下に50px）
- `whileInView`はビューポートに入ったときの状態（表示、元の位置）
- `viewport.once: true`は、一度アニメーションが実行されたら再実行しない
- `viewport.margin: '-100px'`は、要素がビューポートから100px手前でアニメーションを開始

## 3. Schema.org Serviceスキーマ - 構造化データ

### Decision: Serviceスキーマを使用したJSON-LD構造化データ

**Rationale**: Schema.orgのServiceスキーマは、サービス提供に関する情報を構造化データとして提供するために最適です。既存サイトでは`LocalBusiness`と`BlogPosting`が使用されていますが、サービスページには`Service`スキーマが適切です。

**実装例**:

```typescript
// components/MensEstheService/StructuredData.tsx
import Script from 'next/script'

export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tsutsu.dev'
  const serviceUrl = `${baseUrl}/services/mens-esthe`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: 'メンズエステ店向けサイト制作サービス',
    description: 'メンズエステ店向けのWebサイト制作サービス。スケジュール管理、WEB予約受付、求人ページなどの機能を提供します。',
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}#organization`,
      name: 'tsutsu',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
    },
    serviceType: [
      'Webサイト制作',
      'スケジュール管理システム',
      'WEB予約受付システム',
      '求人ページ制作',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: serviceUrl,
      availableLanguage: ['Japanese'],
    },
    offers: {
      '@type': 'Offer',
      url: `${serviceUrl}#contact`,
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <Script
      id="mens-esthe-service-structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

**初級エンジニア向けの説明**:
- `@context`はSchema.orgのコンテキストを指定
- `@type`は`Service`を指定（サービス提供に関する情報）
- `provider`はサービス提供者（既存の`LocalBusiness`を参照）
- `serviceType`は提供するサービスの種類
- `offers`はサービス提供のオファー情報
- `Script`コンポーネントの`strategy="afterInteractive"`は、ページがインタラクティブになった後にスクリプトを読み込みます

## 4. 外部リンクのエラーハンドリング

### Decision: クライアントサイドでのエラー検出とトースト通知

**Rationale**: 制作実績の外部リンクが無効な場合、クライアントサイドでエラーを検出し、ユーザーに分かりやすいメッセージを表示します。トースト通知ライブラリは使用せず、シンプルなアラートまたはインラインエラーメッセージを使用します。

**実装例**:

```typescript
'use client'

import { useState } from 'react'

export default function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const [error, setError] = useState<string | null>(null)

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setError(null)

    try {
      // リンクの有効性をチェック（HEADリクエスト）
      const response = await fetch(portfolio.url, {
        method: 'HEAD',
        mode: 'no-cors', // CORSエラーを回避
      })

      // no-corsモードではresponse.statusが0になるため、
      // 実際のエラーハンドリングはwindow.openの結果で判断
      const newWindow = window.open(portfolio.url, '_blank', 'noopener,noreferrer')
      
      if (!newWindow) {
        // ポップアップブロッカーなどで開けない場合
        setError('リンクを開くことができませんでした。ポップアップブロッカーを確認してください。')
        return
      }

      // 新しいウィンドウが開かれたことを確認
      setTimeout(() => {
        if (newWindow.closed) {
          setError('リンクが無効な可能性があります。しばらくしてから再度お試しください。')
        }
      }, 1000)
    } catch (err) {
      setError('リンクを開くことができませんでした。しばらくしてから再度お試しください。')
    }
  }

  return (
    <div className="portfolio-card">
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      <a
        href={portfolio.url}
        onClick={handleLinkClick}
        target="_blank"
        rel="noopener noreferrer"
        className="portfolio-link"
      >
        {portfolio.storeName}
      </a>
    </div>
  )
}
```

**初級エンジニア向けの説明**:
- `useState`でエラー状態を管理します
- `handleLinkClick`でリンククリック時の処理を行います
- `fetch`の`HEAD`リクエストでリンクの有効性をチェック（ただし、CORS制限があるため完全ではない）
- `window.open`で新しいタブを開き、開けない場合はエラーメッセージを表示
- `role="alert"`でスクリーンリーダーにエラーを通知

**代替案**: より確実な方法として、サーバーサイドでリンクの有効性をチェックするAPIエンドポイントを作成することも可能ですが、初期実装ではクライアントサイドでの処理で十分です。

## 5. セクションIDとアンカーリンク

### Decision: セマンティックなID命名規則

**Rationale**: 既存サイトでは`home`、`services`、`about`、`contact`などのセマンティックなIDが使用されています。サービスページでも同様の命名規則に従います。

**実装例**:

```typescript
// セクションIDの定義
const SECTION_IDS = {
  hero: 'hero',
  features: 'features',
  pricing: 'pricing',
  portfolio: 'portfolio',
  process: 'process',
  faq: 'faq',
  contact: 'contact',
} as const

// セクションコンポーネントでの使用
<section id={SECTION_IDS.hero} className="hero-section">
  {/* コンテンツ */}
</section>

// アンカーリンクでの使用
<a href={`#${SECTION_IDS.hero}`} className="nav-link">
  ヒーロー
</a>
```

**初級エンジニア向けの説明**:
- セクションIDは定数として定義し、型安全性を確保
- `as const`でリテラル型として定義
- アンカーリンクは`#` + セクションIDの形式
- スムーズスクロールは、既存サイトの`html`タグに`data-scroll-behavior="smooth"`が設定されているため、自動的に適用されます

## 6. 画像最適化

### Decision: Next.js Imageコンポーネントの使用

**Rationale**: Next.js Imageコンポーネントは、自動的な画像最適化、遅延読み込み、レスポンシブ画像を提供します。既存サイトでも同様のパターンが使用されています。

**実装例**:

```typescript
import Image from 'next/image'

export default function PortfolioCard({ portfolio }: PortfolioCardProps) {
  return (
    <div className="portfolio-card">
      {portfolio.thumbnailImage && (
        <Image
          src={portfolio.thumbnailImage}
          alt={`${portfolio.storeName}のサムネイル画像`}
          width={400}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className="portfolio-thumbnail"
        />
      )}
    </div>
  )
}
```

**初級エンジニア向けの説明**:
- `width`と`height`は必須です（アスペクト比を維持するため）
- `sizes`は、画面サイズに応じた画像サイズを指定します
- `alt`はアクセシビリティのために必須です
- LCP画像には`priority`属性を追加します

## 7. レスポンシブデザイン

### Decision: モバイルファーストアプローチとTailwind CSSブレークポイント

**Rationale**: 既存サイトではモバイルファーストアプローチが採用されており、Tailwind CSSのブレークポイント（`sm:`、`md:`、`lg:`など）が使用されています。

**実装例**:

```typescript
<div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
    タイトル
  </h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
    {/* コンテンツ */}
  </div>
</div>
```

**初級エンジニア向けの説明**:
- モバイルファーストでは、基本スタイルをモバイル用に設定し、`md:`、`lg:`などのプレフィックスでデスクトップ用のスタイルを追加
- `px-4`はモバイル用のパディング、`md:px-12`はタブレット以上でのパディング
- `grid-cols-1`はモバイルで1列、`md:grid-cols-2`はタブレットで2列、`lg:grid-cols-3`はデスクトップで3列

## 8. アクセシビリティ

### Decision: セマンティックHTMLとARIA属性の使用

**Rationale**: 既存サイトではセマンティックHTMLとARIA属性が適切に使用されています。サービスページでも同様のパターンに従います。

**実装例**:

```typescript
<section id="faq" aria-labelledby="faq-heading">
  <h2 id="faq-heading" className="section-title">
    よくある質問
  </h2>
  <div role="region" aria-label="FAQ項目">
    {faqItems.map((item, index) => (
      <div key={index} className="faq-item">
        <button
          aria-expanded={item.isOpen}
          aria-controls={`faq-answer-${index}`}
          className="faq-question"
        >
          {item.question}
        </button>
        <div
          id={`faq-answer-${index}`}
          role="region"
          aria-labelledby={`faq-question-${index}`}
          className="faq-answer"
        >
          {item.answer}
        </div>
      </div>
    ))}
  </div>
</section>
```

**初級エンジニア向けの説明**:
- `aria-labelledby`でセクションの見出しを関連付け
- `aria-expanded`でアコーディオンの開閉状態を通知
- `aria-controls`で制御対象の要素を指定
- `role="region"`でセマンティックな領域を定義

## まとめ

この調査により、以下の技術的な決定事項が明確になりました：

1. **Next.js 16 App Router**: Metadata API、error.tsx、loading.tsxを使用
2. **Framer Motion**: useScroll、useTransform、whileInViewを使用したスクロール連動アニメーション
3. **Schema.org Serviceスキーマ**: JSON-LD形式で構造化データを実装
4. **外部リンクエラーハンドリング**: クライアントサイドでのエラー検出とユーザーフレンドリーなメッセージ表示
5. **セクションID**: セマンティックな命名規則に従う
6. **画像最適化**: Next.js Imageコンポーネントを使用
7. **レスポンシブデザイン**: モバイルファーストアプローチとTailwind CSSブレークポイント
8. **アクセシビリティ**: セマンティックHTMLとARIA属性の適切な使用

これらの決定事項に基づいて、Phase 1の設計と実装を進めます。

