# Implementation Plan: メンズエステ店向けサイト制作サービスページ

**Branch**: `001-mens-esthe-service-page` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-mens-esthe-service-page/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

メンズエステ店向けサイト制作サービスの専用ページを、Next.js 16 App Routerを使用して実装します。参考サイト（esthemax-lp.com）の構造とレイアウトを参考にし、既存サイトのデザインシステム（Tailwind CSS、framer-motion）を基本として、一貫性のあるデザインで提供します。

主要な機能：
- ヒーローセクション（サービス名、キャッチコピー、価値提案、CTA）
- 主要機能セクション（機能一覧、アイコン付き）
- 料金情報セクション（初期費用、月額費用、オプション料金）
- 制作実績セクション（店舗名、URL、サムネイル画像）
- 導入プロセスセクション（ステップ形式）
- FAQセクション（アコーディオン形式）
- お問い合わせ導線（3箇所）

技術的アプローチ：
- Next.js 16 App Router（Server Components + Client Components）
- framer-motionによるスクロール連動アニメーション
- Schema.org Serviceスキーマによる構造化データ
- レスポンシブデザイン（モバイルファースト）
- error.tsx / loading.tsxによるエラーハンドリングとローディング状態

## Technical Context

**Language/Version**: TypeScript 5.2.2以上（strict mode）  
**Package Manager**: pnpm  
**Primary Dependencies**: Next.js 16.0.1以上、React 19.0.0以上、framer-motion 12.23.24以上、Tailwind CSS 3.3.5以上  
**Storage**: N/A（静的コンテンツ、ハードコード）  
**Testing**: Jest/Vitest（単体テスト）、React Testing Library（UIテスト）、100%カバレッジ要件  
**Target Platform**: Web（モバイル、タブレット、デスクトップ）  
**Project Type**: Web application（Next.js App Router）  
**Performance Goals**: 初回表示3秒以内（ブロードバンド接続環境）、LCP最適化、画像最適化  
**Constraints**: モバイル375px以上で横スクロールなし、アクセシビリティ要件（WCAG準拠）、SEO要件（メタタグ、構造化データ）  
**Scale/Scope**: 単一サービスページ、静的コンテンツ、将来的にCMS統合可能な設計

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. TypeScript型安全性 (NON-NEGOTIABLE)
✅ **PASS**: すべてのコンポーネント、props、データ構造に明示的な型定義を提供。`any`型の使用は禁止。

### II. Next.js 16 + React 19 機能の活用
✅ **PASS**: App Routerを使用し、Server ComponentsとClient Componentsを適切に分離。error.tsx、loading.tsxを実装。

### III. パフォーマンス最適化
✅ **PASS**: Next.js Imageコンポーネントを使用し、適切な`width`、`height`、`sizes`属性を設定。LCP画像には`priority`属性を付与。

### IV. SEOとアクセシビリティ
✅ **PASS**: メタタグ（title、description、OGP）を設定。Schema.org Serviceスキーマによる構造化データを実装。セマンティックHTML、ARIA属性、キーボードナビゲーションをサポート。

### V. エラーハンドリングとローディング状態
✅ **PASS**: error.tsxとloading.tsxを実装。適切なエラーメッセージと再試行機能を提供。Suspenseとスケルトンコンポーネントを使用。

### VI. レスポンシブデザイン
✅ **PASS**: モバイルファーストアプローチ。Tailwind CSSのブレークポイントを使用。375px（モバイル）、768px（タブレット）、1920px（デスクトップ）で適切に表示。

### VII. コンテンツ管理の型安全性
✅ **PASS**: 静的コンテンツ（ハードコード）に型定義を提供。将来的なCMS統合を考慮した型設計。

### VIII. コード品質と一貫性
✅ **PASS**: ESLintルールを遵守し、`--max-warnings=0`を維持。コンポーネントは再利用可能な設計。

### IX. テストケース文書化 (NON-NEGOTIABLE)
✅ **PASS**: test-case.mdを作成し、単体テストとUIテストのケースを定義。100%カバレッジ要件を満たす。

## Project Structure

### Documentation (this feature)

```text
specs/001-mens-esthe-service-page/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
├── test-case.md         # Phase 1 output (/speckit.plan command) - Unit tests and UI tests
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── services/
│   └── mens-esthe/
│       ├── page.tsx              # メインページコンポーネント（Server Component）
│       ├── error.tsx             # エラーページ（Client Component）
│       ├── loading.tsx           # ローディングページ（Server Component）
│       └── layout.tsx            # ページ固有のレイアウト（オプション）
│
components/
├── MensEstheService/
│   ├── HeroSection.tsx           # ヒーローセクション（Client Component）
│   ├── FeaturesSection.tsx       # 主要機能セクション（Client Component）
│   ├── PricingSection.tsx        # 料金情報セクション（Client Component）
│   ├── PortfolioSection.tsx     # 制作実績セクション（Client Component）
│   ├── ProcessSection.tsx        # 導入プロセスセクション（Client Component）
│   ├── FAQSection.tsx            # FAQセクション（Client Component）
│   └── ContactCTA.tsx            # お問い合わせCTAコンポーネント（Client Component）
│
lib/
├── types/
│   └── mens-esthe-service.ts    # サービスページ用の型定義
└── utils/
    └── mens-esthe-service.ts     # サービスページ用のユーティリティ関数

tests/
├── unit/
│   └── mens-esthe-service/
│       ├── utils.test.ts         # ユーティリティ関数の単体テスト
│       └── types.test.ts         # 型定義のテスト
└── ui/
    └── mens-esthe-service/
        ├── HeroSection.test.tsx  # ヒーローセクションのUIテスト
        ├── FeaturesSection.test.tsx
        ├── PricingSection.test.tsx
        ├── PortfolioSection.test.tsx
        ├── ProcessSection.test.tsx
        ├── FAQSection.test.tsx
        └── ContactCTA.test.tsx
```

**Structure Decision**: Next.js 16 App Routerの標準的な構造に従い、`app/services/mens-esthe/`配下にページファイルを配置。コンポーネントは`components/MensEstheService/`配下に機能ごとに分割。型定義とユーティリティは`lib/`配下に配置。テストは`tests/`配下に単体テストとUIテストを分離。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
