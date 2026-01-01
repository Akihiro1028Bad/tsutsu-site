# Test Cases: メンズエステ店向けサイト制作サービスページ

**Date**: 2025-01-27  
**Phase**: Phase 1 - Design & Contracts

## Overview

このドキュメントは、メンズエステ店向けサイト制作サービスページのテストケースを定義します。Constitution原則に従い、単体テスト（unit test）とUIテスト（React Testing Library）の両方を含め、100%カバレッジを達成することを目標とします。

## Test Coverage Requirements

すべてのテストケースは、以下のメトリクスで100%カバレッジを達成する必要があります：

- **lines**: 100%
- **functions**: 100%
- **branches**: 100%
- **statements**: 100%

## User Story 1 - サービス内容の閲覧 (Priority: P1)

### Unit Tests

| Test ID | Test Name | Description | Given | When | Then | Test File | Coverage |
|---------|-----------|-------------|-------|------|------|-----------|----------|
| TC-001-001 | サービス情報の型バリデーション | ServiceInfo型のデータが正しくバリデーションされることを検証 | 有効なServiceInfoデータと無効なServiceInfoデータ | validateServiceInfo関数を実行 | 有効なデータはtrueを返し、無効なデータはfalseを返す | `tests/unit/mens-esthe-service/utils.test.ts` | `lib/utils/mens-esthe-service.ts`の`validateServiceInfo`関数 |
| TC-001-002 | 機能情報の型バリデーション | Feature型のデータが正しくバリデーションされることを検証 | 有効なFeatureデータと無効なFeatureデータ | validateFeature関数を実行 | 有効なデータはtrueを返し、無効なデータはfalseを返す | `tests/unit/mens-esthe-service/utils.test.ts` | `lib/utils/mens-esthe-service.ts`の`validateFeature`関数 |
| TC-001-003 | 料金情報の型バリデーション | PricingItem型のデータが正しくバリデーションされることを検証 | 有効なPricingItemデータと無効なPricingItemデータ | validatePricingItem関数を実行 | 有効なデータはtrueを返し、無効なデータはfalseを返す | `tests/unit/mens-esthe-service/utils.test.ts` | `lib/utils/mens-esthe-service.ts`の`validatePricingItem`関数 |

### UI Tests (React Testing Library)

| Test ID | Test Name | Description | Given | When | Then | Test File | Accessibility | Queries Used |
|---------|-----------|-------------|-------|------|------|-----------|---------------|--------------|
| TC-001-004 | ヒーローセクションの表示 | ヒーローセクションにサービス名、キャッチコピー、価値提案が表示されることを検証 | サービス情報データが提供されている | HeroSectionコンポーネントをレンダリング | サービス名、キャッチコピー、価値提案が表示される | `tests/ui/mens-esthe-service/HeroSection.test.tsx` | `getByRole('banner')`でセクションを検出、`getByRole('heading', { level: 1 })`で見出しを検出 | `getByRole`, `getByText` |
| TC-001-005 | 主要機能セクションの表示 | 主要機能セクションに機能一覧が表示されることを検証 | 機能データの配列が提供されている | FeaturesSectionコンポーネントをレンダリング | すべての機能が表示され、各機能にアイコン、機能名、説明が含まれる | `tests/ui/mens-esthe-service/FeaturesSection.test.tsx` | `getByRole('region', { name: /主要機能/i })`でセクションを検出 | `getByRole`, `getAllByRole`, `getByText` |
| TC-001-006 | 料金情報セクションの表示 | 料金情報セクションに初期費用、月額費用、オプション料金が表示されることを検証 | 料金項目データの配列が提供されている | PricingSectionコンポーネントをレンダリング | 初期費用、月額費用、オプション料金がカテゴリごとに表示される | `tests/ui/mens-esthe-service/PricingSection.test.tsx` | `getByRole('region', { name: /料金情報/i })`でセクションを検出 | `getByRole`, `getByText`, `getAllByText` |
| TC-001-007 | スクロール連動アニメーションの動作 | スクロール時にアニメーションが正しく動作することを検証 | FeaturesSectionコンポーネントがレンダリングされている | ビューポートに要素が入る | アニメーションが実行され、要素が表示される | `tests/ui/mens-esthe-service/FeaturesSection.test.tsx` | アニメーション中も要素がアクセシブルであることを確認 | `getByRole`, `findByRole`（非同期更新の待機） |

## User Story 2 - 制作実績の確認 (Priority: P2)

### Unit Tests

| Test ID | Test Name | Description | Given | When | Then | Test File | Coverage |
|---------|-----------|-------------|-------|------|------|-----------|----------|
| TC-002-001 | 制作実績情報の型バリデーション | PortfolioItem型のデータが正しくバリデーションされることを検証 | 有効なPortfolioItemデータと無効なPortfolioItemデータ | validatePortfolioItem関数を実行 | 有効なデータはtrueを返し、無効なデータはfalseを返す | `tests/unit/mens-esthe-service/utils.test.ts` | `lib/utils/mens-esthe-service.ts`の`validatePortfolioItem`関数 |
| TC-002-002 | 外部リンクエラーハンドリング関数 | 外部リンクのエラーハンドリング関数が正しく動作することを検証 | 有効なURLと無効なURL | handleExternalLinkError関数を実行 | エラーが適切に検出され、エラーメッセージが返される | `tests/unit/mens-esthe-service/utils.test.ts` | `lib/utils/mens-esthe-service.ts`の`handleExternalLinkError`関数 |

### UI Tests (React Testing Library)

| Test ID | Test Name | Description | Given | When | Then | Test File | Accessibility | Queries Used |
|---------|-----------|-------------|-------|------|------|-----------|---------------|--------------|
| TC-002-003 | 制作実績セクションの表示（実績あり） | 制作実績が存在する場合、実績一覧が表示されることを検証 | 制作実績データの配列が提供されている | PortfolioSectionコンポーネントをレンダリング | すべての制作実績が表示され、各実績に店舗名とリンクが含まれる | `tests/ui/mens-esthe-service/PortfolioSection.test.tsx` | `getByRole('link')`でリンクを検出、`getByRole('img')`で画像を検出（存在する場合） | `getByRole`, `getByText`, `getAllByRole` |
| TC-002-004 | 制作実績セクションの表示（実績なし） | 制作実績が存在しない場合、「現在準備中です」のメッセージが表示されることを検証 | 空の制作実績配列が提供されている | PortfolioSectionコンポーネントをレンダリング | 「現在準備中です」のメッセージが表示される | `tests/ui/mens-esthe-service/PortfolioSection.test.tsx` | `getByText`でメッセージを検出 | `getByText`, `queryByRole`（リンクが存在しないことを確認） |
| TC-002-005 | 外部リンクのクリック（正常系） | 制作実績のリンクをクリックした場合、新しいタブで開くことを検証 | PortfolioSectionコンポーネントがレンダリングされ、制作実績データが提供されている | リンクをクリック | `window.open`が呼び出され、新しいタブでリンクが開く | `tests/ui/mens-esthe-service/PortfolioSection.test.tsx` | `getByRole('link')`でリンクを検出、`userEvent.click`でクリック | `getByRole`, `userEvent` |
| TC-002-006 | 外部リンクのクリック（エラー系） | 無効なリンクをクリックした場合、エラーメッセージが表示されることを検証 | PortfolioSectionコンポーネントがレンダリングされ、無効なURLの制作実績データが提供されている | リンクをクリック（エラーが発生する） | エラーメッセージが表示される（`role="alert"`で検出可能） | `tests/ui/mens-esthe-service/PortfolioSection.test.tsx` | `getByRole('alert')`でエラーメッセージを検出 | `getByRole`, `userEvent`, `findByRole`（非同期更新の待機） |

## User Story 3 - 導入プロセスの理解 (Priority: P2)

### Unit Tests

| Test ID | Test Name | Description | Given | When | Then | Test File | Coverage |
|---------|-----------|-------------|-------|------|------|-----------|----------|
| TC-003-001 | 導入ステップ情報の型バリデーション | ProcessStep型のデータが正しくバリデーションされることを検証 | 有効なProcessStepデータと無効なProcessStepデータ | validateProcessStep関数を実行 | 有効なデータはtrueを返し、無効なデータはfalseを返す | `tests/unit/mens-esthe-service/utils.test.ts` | `lib/utils/mens-esthe-service.ts`の`validateProcessStep`関数 |

### UI Tests (React Testing Library)

| Test ID | Test Name | Description | Given | When | Then | Test File | Accessibility | Queries Used |
|---------|-----------|-------------|-------|------|------|-----------|---------------|--------------|
| TC-003-002 | 導入プロセスセクションの表示 | 導入プロセスセクションにステップ形式で表示されることを検証 | 導入ステップデータの配列が提供されている | ProcessSectionコンポーネントをレンダリング | すべてのステップが順序立てて表示され、各ステップに番号、タイトル、説明が含まれる | `tests/ui/mens-esthe-service/ProcessSection.test.tsx` | `getByRole('list')`で順序付きリストを検出、`getAllByRole('listitem')`で各ステップを検出 | `getByRole`, `getAllByRole`, `getByText` |
| TC-003-003 | ステップ番号の表示 | 各ステップに正しい番号が表示されることを検証 | 導入ステップデータの配列が提供されている | ProcessSectionコンポーネントをレンダリング | ステップ1、ステップ2、ステップ3...と順番に番号が表示される | `tests/ui/mens-esthe-service/ProcessSection.test.tsx` | `getByLabelText`でステップ番号を検出 | `getByLabelText`, `getAllByText` |

## User Story 4 - よくある質問の確認 (Priority: P3)

### Unit Tests

| Test ID | Test Name | Description | Given | When | Then | Test File | Coverage |
|---------|-----------|-------------|-------|------|------|-----------|----------|
| TC-004-001 | FAQ項目情報の型バリデーション | FAQItem型のデータが正しくバリデーションされることを検証 | 有効なFAQItemデータと無効なFAQItemデータ | validateFAQItem関数を実行 | 有効なデータはtrueを返し、無効なデータはfalseを返す | `tests/unit/mens-esthe-service/utils.test.ts` | `lib/utils/mens-esthe-service.ts`の`validateFAQItem`関数 |

### UI Tests (React Testing Library)

| Test ID | Test Name | Description | Given | When | Then | Test File | Accessibility | Queries Used |
|---------|-----------|-------------|-------|------|------|-----------|---------------|--------------|
| TC-004-002 | FAQセクションの表示 | FAQセクションに質問と回答が表示されることを検証 | FAQ項目データの配列が提供されている | FAQSectionコンポーネントをレンダリング | すべての質問が表示され、初期状態では回答は非表示 | `tests/ui/mens-esthe-service/FAQSection.test.tsx` | `getByRole('region', { name: /FAQ/i })`でセクションを検出、`getAllByRole('button')`で質問ボタンを検出 | `getByRole`, `getAllByRole`, `getByText`, `queryByText`（非表示要素の確認） |
| TC-004-003 | FAQアコーディオンの開閉（マウスクリック） | 質問をクリックした場合、回答が表示/非表示されることを検証 | FAQSectionコンポーネントがレンダリングされ、FAQ項目データが提供されている | 質問ボタンをクリック | 回答が表示される（`aria-expanded="true"`）、再度クリックすると非表示になる（`aria-expanded="false"`） | `tests/ui/mens-esthe-service/FAQSection.test.tsx` | `getByRole('button')`でボタンを検出、`getAttribute('aria-expanded')`で開閉状態を確認 | `getByRole`, `userEvent.click`, `getAttribute`, `findByText`（非同期更新の待機） |
| TC-004-004 | FAQアコーディオンの開閉（キーボード操作） | キーボード（Enter、Space）でアコーディオンを開閉できることを検証 | FAQSectionコンポーネントがレンダリングされ、FAQ項目データが提供されている | 質問ボタンにフォーカスを当て、EnterキーまたはSpaceキーを押す | 回答が表示/非表示される | `tests/ui/mens-esthe-service/FAQSection.test.tsx` | `getByRole('button')`でボタンを検出、`userEvent.keyboard`でキーボード操作をシミュレート | `getByRole`, `userEvent.keyboard`, `getAttribute` |
| TC-004-005 | 複数のFAQ項目の独立した開閉 | 複数のFAQ項目が独立して開閉できることを検証 | FAQSectionコンポーネントがレンダリングされ、複数のFAQ項目データが提供されている | 複数の質問を順番にクリック | 各質問の回答が独立して開閉される | `tests/ui/mens-esthe-service/FAQSection.test.tsx` | 各ボタンの`aria-expanded`属性が独立して更新されることを確認 | `getAllByRole`, `userEvent.click`, `getAttribute` |

## User Story 5 - お問い合わせへの導線 (Priority: P1)

### Unit Tests

| Test ID | Test Name | Description | Given | When | Then | Test File | Coverage |
|---------|-----------|-------------|-------|------|------|-----------|----------|
| TC-005-001 | スムーズスクロール関数 | スムーズスクロール関数が正しく動作することを検証 | セクションIDが提供されている | scrollToSection関数を実行 | 指定されたセクションにスムーズスクロールする | `tests/unit/mens-esthe-service/utils.test.ts` | `lib/utils/mens-esthe-service.ts`の`scrollToSection`関数 |

### UI Tests (React Testing Library)

| Test ID | Test Name | Description | Given | When | Then | Test File | Accessibility | Queries Used |
|---------|-----------|-------------|-------|------|------|-----------|---------------|--------------|
| TC-005-002 | ヒーローセクションのCTAクリック | ヒーローセクションのお問い合わせCTAをクリックした場合、`#contact`セクションにスクロールすることを検証 | HeroSectionコンポーネントがレンダリングされている | お問い合わせCTAボタンをクリック | `#contact`セクションにスクロールする（`scrollIntoView`が呼び出される） | `tests/ui/mens-esthe-service/HeroSection.test.tsx` | `getByRole('button', { name: /お問い合わせ/i })`でボタンを検出 | `getByRole`, `userEvent.click` |
| TC-005-003 | 料金セクション後のCTAクリック | 料金セクション後のお問い合わせCTAをクリックした場合、`#contact`セクションにスクロールすることを検証 | PricingSectionコンポーネントがレンダリングされている | ContactCTAコンポーネントのお問い合わせボタンをクリック | `#contact`セクションにスクロールする | `tests/ui/mens-esthe-service/PricingSection.test.tsx` | `getByRole('button', { name: /お問い合わせ/i })`でボタンを検出 | `getByRole`, `userEvent.click` |
| TC-005-004 | お問い合わせCTAの配置確認 | お問い合わせCTAが3箇所（ヒーロー、料金後、ページ下部）に配置されていることを検証 | メインページコンポーネントがレンダリングされている | ページを確認 | お問い合わせCTAが3箇所に存在する | `tests/ui/mens-esthe-service/page.test.tsx` | `getAllByRole('button', { name: /お問い合わせ/i })`でボタンを検出 | `getAllByRole` |

## Error Handling Tests

### UI Tests (React Testing Library)

| Test ID | Test Name | Description | Given | When | Then | Test File | Accessibility | Queries Used |
|---------|-----------|-------------|-------|------|------|-----------|---------------|--------------|
| TC-ERR-001 | エラーページの表示 | エラー発生時にエラーページが表示されることを検証 | エラーが発生している | Errorコンポーネントがレンダリングされる | エラーメッセージと再試行ボタンが表示される | `tests/ui/mens-esthe-service/error.test.tsx` | `getByRole('heading')`で見出しを検出、`getByRole('button', { name: /再試行/i })`でボタンを検出 | `getByRole`, `getByText` |
| TC-ERR-002 | エラーページの再試行機能 | エラーページの再試行ボタンをクリックした場合、reset関数が呼び出されることを検証 | Errorコンポーネントがレンダリングされ、reset関数がモックされている | 再試行ボタンをクリック | reset関数が1回呼び出される | `tests/ui/mens-esthe-service/error.test.tsx` | `getByRole('button', { name: /再試行/i })`でボタンを検出 | `getByRole`, `userEvent.click` |
| TC-ERR-003 | ローディングページの表示 | ローディング中にローディングページが表示されることを検証 | ページが読み込み中 | Loadingコンポーネントがレンダリングされる | スケルトンUIが表示される | `tests/ui/mens-esthe-service/loading.test.tsx` | スケルトンUIは`aria-hidden="true"`で非表示にする | `getByRole`, `queryByText` |

## Accessibility Tests

### UI Tests (React Testing Library)

| Test ID | Test Name | Description | Given | When | Then | Test File | Accessibility | Queries Used |
|---------|-----------|-------------|-------|------|------|-----------|---------------|--------------|
| TC-A11Y-001 | セマンティックHTMLの使用 | すべてのセクションがセマンティックHTMLを使用していることを検証 | メインページコンポーネントがレンダリングされている | ページの構造を確認 | `<section>`, `<article>`, `<nav>`などのセマンティックHTMLが適切に使用されている | `tests/ui/mens-esthe-service/accessibility.test.tsx` | `getByRole`でセマンティックな要素を検出 | `getByRole`, `getAllByRole` |
| TC-A11Y-002 | ARIA属性の使用 | すべてのインタラクティブ要素に適切なARIA属性が設定されていることを検証 | メインページコンポーネントがレンダリングされている | インタラクティブ要素を確認 | `aria-label`, `aria-expanded`, `aria-controls`などのARIA属性が適切に設定されている | `tests/ui/mens-esthe-service/accessibility.test.tsx` | `getByRole`で要素を検出、`getAttribute`でARIA属性を確認 | `getByRole`, `getAttribute` |
| TC-A11Y-003 | キーボードナビゲーション | すべてのインタラクティブ要素がキーボードで操作できることを検証 | メインページコンポーネントがレンダリングされている | Tabキーでフォーカスを移動 | すべてのインタラクティブ要素にフォーカスが当たる | `tests/ui/mens-esthe-service/accessibility.test.tsx` | `userEvent.tab`でフォーカスを移動、`getByRole`で要素を検出 | `getByRole`, `userEvent.tab` |

## Responsive Design Tests

### UI Tests (React Testing Library)

| Test ID | Test Name | Description | Given | When | Then | Test File | Accessibility | Queries Used |
|---------|-----------|-------------|-------|------|------|-----------|---------------|--------------|
| TC-RESP-001 | モバイル表示（375px） | モバイルサイズ（375px）で適切に表示されることを検証 | メインページコンポーネントがレンダリングされている | ビューポートを375pxに設定 | すべてのコンテンツが適切に表示され、横スクロールが発生しない | `tests/ui/mens-esthe-service/responsive.test.tsx` | モバイルでもアクセシビリティ要件を満たす | `getByRole`, `window.matchMedia`（ビューポートサイズの設定） |
| TC-RESP-002 | タブレット表示（768px） | タブレットサイズ（768px）で適切に表示されることを検証 | メインページコンポーネントがレンダリングされている | ビューポートを768pxに設定 | すべてのコンテンツが適切に表示され、レイアウトが調整される | `tests/ui/mens-esthe-service/responsive.test.tsx` | タブレットでもアクセシビリティ要件を満たす | `getByRole`, `window.matchMedia` |
| TC-RESP-003 | デスクトップ表示（1920px） | デスクトップサイズ（1920px）で適切に表示されることを検証 | メインページコンポーネントがレンダリングされている | ビューポートを1920pxに設定 | すべてのコンテンツが適切に表示され、最大幅が制限される | `tests/ui/mens-esthe-service/responsive.test.tsx` | デスクトップでもアクセシビリティ要件を満たす | `getByRole`, `window.matchMedia` |

## SEO Tests

### Unit Tests

| Test ID | Test Name | Description | Given | When | Then | Test File | Coverage |
|---------|-----------|-------------|-------|------|------|-----------|----------|
| TC-SEO-001 | 構造化データの生成 | Schema.org Serviceスキーマの構造化データが正しく生成されることを検証 | サービス情報データが提供されている | generateStructuredData関数を実行 | 有効なJSON-LD形式の構造化データが生成される | `tests/unit/mens-esthe-service/utils.test.ts` | `lib/utils/mens-esthe-service.ts`の`generateStructuredData`関数 |

### UI Tests (React Testing Library)

| Test ID | Test Name | Description | Given | When | Then | Test File | Accessibility | Queries Used |
|---------|-----------|-------------|-------|------|------|-----------|---------------|--------------|
| TC-SEO-002 | 構造化データの埋め込み | 構造化データがページに正しく埋め込まれていることを検証 | StructuredDataコンポーネントがレンダリングされている | ページのHTMLを確認 | `<script type="application/ld+json">`タグが存在し、有効なJSON-LDが含まれる | `tests/ui/mens-esthe-service/StructuredData.test.tsx` | 構造化データはスクリーンリーダーには影響しない | `container.querySelector` |
| TC-SEO-003 | メタタグの設定 | メタタグ（title、description、OGP）が正しく設定されていることを検証 | メインページコンポーネントがレンダリングされている | ページのメタタグを確認 | title、description、OGPタグが正しく設定されている | `tests/ui/mens-esthe-service/page.test.tsx` | メタタグはSEO用であり、アクセシビリティには直接影響しない | `container.querySelector`（メタタグの確認） |

## Edge Cases Tests

### UI Tests (React Testing Library)

| Test ID | Test Name | Description | Given | When | Then | Test File | Accessibility | Queries Used |
|---------|-----------|-------------|-------|------|------|-----------|---------------|--------------|
| TC-EDGE-001 | 制作実績が空の場合 | 制作実績が空の場合、「現在準備中です」のメッセージが表示されることを検証 | 空の制作実績配列が提供されている | PortfolioSectionコンポーネントをレンダリング | 「現在準備中です」のメッセージが表示され、実績一覧は表示されない | `tests/ui/mens-esthe-service/PortfolioSection.test.tsx` | メッセージは`getByText`で検出可能 | `getByText`, `queryByRole`（実績一覧が存在しないことを確認） |
| TC-EDGE-002 | 外部リンクが無効な場合 | 無効な外部リンクをクリックした場合、エラーメッセージが表示されることを検証 | PortfolioSectionコンポーネントがレンダリングされ、無効なURLの制作実績データが提供されている | リンクをクリック（エラーが発生する） | エラーメッセージが表示される（`role="alert"`で検出可能） | `tests/ui/mens-esthe-service/PortfolioSection.test.tsx` | エラーメッセージは`getByRole('alert')`で検出可能 | `getByRole`, `userEvent.click`, `findByRole` |
| TC-EDGE-003 | 長いページでのナビゲーション | ページが非常に長い場合でも、ナビゲーションリンクが正常に機能することを検証 | メインページコンポーネントがレンダリングされ、すべてのセクションが存在する | ナビゲーションリンクをクリック | 該当セクションにスムーズスクロールする | `tests/ui/mens-esthe-service/navigation.test.tsx` | ナビゲーションリンクは`getByRole('link')`で検出可能 | `getByRole`, `userEvent.click` |

## Performance Tests

### Unit Tests

| Test ID | Test Name | Description | Given | When | Then | Test File | Coverage |
|---------|-----------|-------------|-------|------|------|-----------|----------|
| TC-PERF-001 | 画像最適化関数 | 画像最適化関数が正しく動作することを検証 | 画像URLとサイズパラメータが提供されている | optimizeImageUrl関数を実行 | 最適化された画像URLが返される | `tests/unit/mens-esthe-service/utils.test.ts` | `lib/utils/mens-esthe-service.ts`の`optimizeImageUrl`関数 |

## Test Implementation Guidelines

### テストファイルの構造

各テストファイルは以下の構造に従います：

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Component from '@/components/MensEstheService/Component'
import { mockData } from './mocks'

describe('Component', () => {
  beforeEach(() => {
    // テスト前のセットアップ
  })

  afterEach(() => {
    // テスト後のクリーンアップ
  })

  it('should ...', () => {
    // テストケースの実装
  })
})
```

### モックデータの作成

テスト用のモックデータは、`tests/ui/mens-esthe-service/mocks.ts`に定義します。

```typescript
export const mockServiceInfo: ServiceInfo = {
  // モックデータ
}

export const mockFeatures: Feature[] = [
  // モックデータ
]
```

### カバレッジ設定

Jest/Vitestの設定で、100%カバレッジを強制します。

```typescript
// jest.config.js または vitest.config.ts
{
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    './components/MensEstheService/**/*.tsx': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}
```

## まとめ

このテストケースドキュメントにより、以下のことが保証されます：

1. **機能の完全性**: すべての機能要件がテストされる
2. **エッジケースの網羅**: エッジケースも適切にテストされる
3. **アクセシビリティ**: アクセシビリティ要件がテストされる
4. **パフォーマンス**: パフォーマンス要件がテストされる
5. **100%カバレッジ**: コードカバレッジ100%を達成

**初級エンジニア向けの説明**:
- テストケースは、実装前に作成することで、要件の明確化とテスト可能性の検証に活用できます
- 各テストケースは、独立して実行可能で、他のテストに依存しません
- テスト名は、「何をテストするか」が明確に分かる命名規則に従います
- AAAパターン（Arrange、Act、Assert）を明確に分離します
