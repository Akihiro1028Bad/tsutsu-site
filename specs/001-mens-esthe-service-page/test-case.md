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

#### Test Case: TC-001-001 サービス情報の型バリデーション
- **Description**: ServiceInfo型のデータが正しくバリデーションされることを検証
- **Given**: 有効なServiceInfoデータと無効なServiceInfoデータ
- **When**: validateServiceInfo関数を実行
- **Then**: 有効なデータはtrueを返し、無効なデータはfalseを返す
- **Test File**: `tests/unit/mens-esthe-service/utils.test.ts`
- **Coverage**: `lib/utils/mens-esthe-service.ts`の`validateServiceInfo`関数

#### Test Case: TC-001-002 機能情報の型バリデーション
- **Description**: Feature型のデータが正しくバリデーションされることを検証
- **Given**: 有効なFeatureデータと無効なFeatureデータ
- **When**: validateFeature関数を実行
- **Then**: 有効なデータはtrueを返し、無効なデータはfalseを返す
- **Test File**: `tests/unit/mens-esthe-service/utils.test.ts`
- **Coverage**: `lib/utils/mens-esthe-service.ts`の`validateFeature`関数

#### Test Case: TC-001-003 料金情報の型バリデーション
- **Description**: PricingItem型のデータが正しくバリデーションされることを検証
- **Given**: 有効なPricingItemデータと無効なPricingItemデータ
- **When**: validatePricingItem関数を実行
- **Then**: 有効なデータはtrueを返し、無効なデータはfalseを返す
- **Test File**: `tests/unit/mens-esthe-service/utils.test.ts`
- **Coverage**: `lib/utils/mens-esthe-service.ts`の`validatePricingItem`関数

### UI Tests (React Testing Library)

#### Test Case: TC-001-004 ヒーローセクションの表示
- **Description**: ヒーローセクションにサービス名、キャッチコピー、価値提案が表示されることを検証
- **Given**: サービス情報データが提供されている
- **When**: HeroSectionコンポーネントをレンダリング
- **Then**: サービス名、キャッチコピー、価値提案が表示される
- **Test File**: `tests/ui/mens-esthe-service/HeroSection.test.tsx`
- **Accessibility**: `getByRole('banner')`でセクションを検出、`getByRole('heading', { level: 1 })`で見出しを検出
- **Queries Used**: `getByRole`, `getByText`

#### Test Case: TC-001-005 主要機能セクションの表示
- **Description**: 主要機能セクションに機能一覧が表示されることを検証
- **Given**: 機能データの配列が提供されている
- **When**: FeaturesSectionコンポーネントをレンダリング
- **Then**: すべての機能が表示され、各機能にアイコン、機能名、説明が含まれる
- **Test File**: `tests/ui/mens-esthe-service/FeaturesSection.test.tsx`
- **Accessibility**: `getByRole('region', { name: /主要機能/i })`でセクションを検出
- **Queries Used**: `getByRole`, `getAllByRole`, `getByText`

#### Test Case: TC-001-006 料金情報セクションの表示
- **Description**: 料金情報セクションに初期費用、月額費用、オプション料金が表示されることを検証
- **Given**: 料金項目データの配列が提供されている
- **When**: PricingSectionコンポーネントをレンダリング
- **Then**: 初期費用、月額費用、オプション料金がカテゴリごとに表示される
- **Test File**: `tests/ui/mens-esthe-service/PricingSection.test.tsx`
- **Accessibility**: `getByRole('region', { name: /料金情報/i })`でセクションを検出
- **Queries Used**: `getByRole`, `getByText`, `getAllByText`

#### Test Case: TC-001-007 スクロール連動アニメーションの動作
- **Description**: スクロール時にアニメーションが正しく動作することを検証
- **Given**: FeaturesSectionコンポーネントがレンダリングされている
- **When**: ビューポートに要素が入る
- **Then**: アニメーションが実行され、要素が表示される
- **Test File**: `tests/ui/mens-esthe-service/FeaturesSection.test.tsx`
- **Accessibility**: アニメーション中も要素がアクセシブルであることを確認
- **Queries Used**: `getByRole`, `findByRole`（非同期更新の待機）

## User Story 2 - 制作実績の確認 (Priority: P2)

### Unit Tests

#### Test Case: TC-002-001 制作実績情報の型バリデーション
- **Description**: PortfolioItem型のデータが正しくバリデーションされることを検証
- **Given**: 有効なPortfolioItemデータと無効なPortfolioItemデータ
- **When**: validatePortfolioItem関数を実行
- **Then**: 有効なデータはtrueを返し、無効なデータはfalseを返す
- **Test File**: `tests/unit/mens-esthe-service/utils.test.ts`
- **Coverage**: `lib/utils/mens-esthe-service.ts`の`validatePortfolioItem`関数

#### Test Case: TC-002-002 外部リンクエラーハンドリング関数
- **Description**: 外部リンクのエラーハンドリング関数が正しく動作することを検証
- **Given**: 有効なURLと無効なURL
- **When**: handleExternalLinkError関数を実行
- **Then**: エラーが適切に検出され、エラーメッセージが返される
- **Test File**: `tests/unit/mens-esthe-service/utils.test.ts`
- **Coverage**: `lib/utils/mens-esthe-service.ts`の`handleExternalLinkError`関数

### UI Tests (React Testing Library)

#### Test Case: TC-002-003 制作実績セクションの表示（実績あり）
- **Description**: 制作実績が存在する場合、実績一覧が表示されることを検証
- **Given**: 制作実績データの配列が提供されている
- **When**: PortfolioSectionコンポーネントをレンダリング
- **Then**: すべての制作実績が表示され、各実績に店舗名とリンクが含まれる
- **Test File**: `tests/ui/mens-esthe-service/PortfolioSection.test.tsx`
- **Accessibility**: `getByRole('link')`でリンクを検出、`getByRole('img')`で画像を検出（存在する場合）
- **Queries Used**: `getByRole`, `getByText`, `getAllByRole`

#### Test Case: TC-002-004 制作実績セクションの表示（実績なし）
- **Description**: 制作実績が存在しない場合、「現在準備中です」のメッセージが表示されることを検証
- **Given**: 空の制作実績配列が提供されている
- **When**: PortfolioSectionコンポーネントをレンダリング
- **Then**: 「現在準備中です」のメッセージが表示される
- **Test File**: `tests/ui/mens-esthe-service/PortfolioSection.test.tsx`
- **Accessibility**: `getByText`でメッセージを検出
- **Queries Used**: `getByText`, `queryByRole`（リンクが存在しないことを確認）

#### Test Case: TC-002-005 外部リンクのクリック（正常系）
- **Description**: 制作実績のリンクをクリックした場合、新しいタブで開くことを検証
- **Given**: PortfolioSectionコンポーネントがレンダリングされ、制作実績データが提供されている
- **When**: リンクをクリック
- **Then**: `window.open`が呼び出され、新しいタブでリンクが開く
- **Test File**: `tests/ui/mens-esthe-service/PortfolioSection.test.tsx`
- **Accessibility**: `getByRole('link')`でリンクを検出、`userEvent.click`でクリック
- **Queries Used**: `getByRole`, `userEvent`

#### Test Case: TC-002-006 外部リンクのクリック（エラー系）
- **Description**: 無効なリンクをクリックした場合、エラーメッセージが表示されることを検証
- **Given**: PortfolioSectionコンポーネントがレンダリングされ、無効なURLの制作実績データが提供されている
- **When**: リンクをクリック（エラーが発生する）
- **Then**: エラーメッセージが表示される（`role="alert"`で検出可能）
- **Test File**: `tests/ui/mens-esthe-service/PortfolioSection.test.tsx`
- **Accessibility**: `getByRole('alert')`でエラーメッセージを検出
- **Queries Used**: `getByRole`, `userEvent`, `findByRole`（非同期更新の待機）

## User Story 3 - 導入プロセスの理解 (Priority: P2)

### Unit Tests

#### Test Case: TC-003-001 導入ステップ情報の型バリデーション
- **Description**: ProcessStep型のデータが正しくバリデーションされることを検証
- **Given**: 有効なProcessStepデータと無効なProcessStepデータ
- **When**: validateProcessStep関数を実行
- **Then**: 有効なデータはtrueを返し、無効なデータはfalseを返す
- **Test File**: `tests/unit/mens-esthe-service/utils.test.ts`
- **Coverage**: `lib/utils/mens-esthe-service.ts`の`validateProcessStep`関数

### UI Tests (React Testing Library)

#### Test Case: TC-003-002 導入プロセスセクションの表示
- **Description**: 導入プロセスセクションにステップ形式で表示されることを検証
- **Given**: 導入ステップデータの配列が提供されている
- **When**: ProcessSectionコンポーネントをレンダリング
- **Then**: すべてのステップが順序立てて表示され、各ステップに番号、タイトル、説明が含まれる
- **Test File**: `tests/ui/mens-esthe-service/ProcessSection.test.tsx`
- **Accessibility**: `getByRole('list')`で順序付きリストを検出、`getAllByRole('listitem')`で各ステップを検出
- **Queries Used**: `getByRole`, `getAllByRole`, `getByText`

#### Test Case: TC-003-003 ステップ番号の表示
- **Description**: 各ステップに正しい番号が表示されることを検証
- **Given**: 導入ステップデータの配列が提供されている
- **When**: ProcessSectionコンポーネントをレンダリング
- **Then**: ステップ1、ステップ2、ステップ3...と順番に番号が表示される
- **Test File**: `tests/ui/mens-esthe-service/ProcessSection.test.tsx`
- **Accessibility**: `getByLabelText`でステップ番号を検出
- **Queries Used**: `getByLabelText`, `getAllByText`

## User Story 4 - よくある質問の確認 (Priority: P3)

### Unit Tests

#### Test Case: TC-004-001 FAQ項目情報の型バリデーション
- **Description**: FAQItem型のデータが正しくバリデーションされることを検証
- **Given**: 有効なFAQItemデータと無効なFAQItemデータ
- **When**: validateFAQItem関数を実行
- **Then**: 有効なデータはtrueを返し、無効なデータはfalseを返す
- **Test File**: `tests/unit/mens-esthe-service/utils.test.ts`
- **Coverage**: `lib/utils/mens-esthe-service.ts`の`validateFAQItem`関数

### UI Tests (React Testing Library)

#### Test Case: TC-004-002 FAQセクションの表示
- **Description**: FAQセクションに質問と回答が表示されることを検証
- **Given**: FAQ項目データの配列が提供されている
- **When**: FAQSectionコンポーネントをレンダリング
- **Then**: すべての質問が表示され、初期状態では回答は非表示
- **Test File**: `tests/ui/mens-esthe-service/FAQSection.test.tsx`
- **Accessibility**: `getByRole('region', { name: /FAQ/i })`でセクションを検出、`getAllByRole('button')`で質問ボタンを検出
- **Queries Used**: `getByRole`, `getAllByRole`, `getByText`, `queryByText`（非表示要素の確認）

#### Test Case: TC-004-003 FAQアコーディオンの開閉（マウスクリック）
- **Description**: 質問をクリックした場合、回答が表示/非表示されることを検証
- **Given**: FAQSectionコンポーネントがレンダリングされ、FAQ項目データが提供されている
- **When**: 質問ボタンをクリック
- **Then**: 回答が表示される（`aria-expanded="true"`）、再度クリックすると非表示になる（`aria-expanded="false"`）
- **Test File**: `tests/ui/mens-esthe-service/FAQSection.test.tsx`
- **Accessibility**: `getByRole('button')`でボタンを検出、`getAttribute('aria-expanded')`で開閉状態を確認
- **Queries Used**: `getByRole`, `userEvent.click`, `getAttribute`, `findByText`（非同期更新の待機）

#### Test Case: TC-004-004 FAQアコーディオンの開閉（キーボード操作）
- **Description**: キーボード（Enter、Space）でアコーディオンを開閉できることを検証
- **Given**: FAQSectionコンポーネントがレンダリングされ、FAQ項目データが提供されている
- **When**: 質問ボタンにフォーカスを当て、EnterキーまたはSpaceキーを押す
- **Then**: 回答が表示/非表示される
- **Test File**: `tests/ui/mens-esthe-service/FAQSection.test.tsx`
- **Accessibility**: `getByRole('button')`でボタンを検出、`userEvent.keyboard`でキーボード操作をシミュレート
- **Queries Used**: `getByRole`, `userEvent.keyboard`, `getAttribute`

#### Test Case: TC-004-005 複数のFAQ項目の独立した開閉
- **Description**: 複数のFAQ項目が独立して開閉できることを検証
- **Given**: FAQSectionコンポーネントがレンダリングされ、複数のFAQ項目データが提供されている
- **When**: 複数の質問を順番にクリック
- **Then**: 各質問の回答が独立して開閉される
- **Test File**: `tests/ui/mens-esthe-service/FAQSection.test.tsx`
- **Accessibility**: 各ボタンの`aria-expanded`属性が独立して更新されることを確認
- **Queries Used**: `getAllByRole`, `userEvent.click`, `getAttribute`

## User Story 5 - お問い合わせへの導線 (Priority: P1)

### Unit Tests

#### Test Case: TC-005-001 スムーズスクロール関数
- **Description**: スムーズスクロール関数が正しく動作することを検証
- **Given**: セクションIDが提供されている
- **When**: scrollToSection関数を実行
- **Then**: 指定されたセクションにスムーズスクロールする
- **Test File**: `tests/unit/mens-esthe-service/utils.test.ts`
- **Coverage**: `lib/utils/mens-esthe-service.ts`の`scrollToSection`関数

### UI Tests (React Testing Library)

#### Test Case: TC-005-002 ヒーローセクションのCTAクリック
- **Description**: ヒーローセクションのお問い合わせCTAをクリックした場合、`#contact`セクションにスクロールすることを検証
- **Given**: HeroSectionコンポーネントがレンダリングされている
- **When**: お問い合わせCTAボタンをクリック
- **Then**: `#contact`セクションにスクロールする（`scrollIntoView`が呼び出される）
- **Test File**: `tests/ui/mens-esthe-service/HeroSection.test.tsx`
- **Accessibility**: `getByRole('button', { name: /お問い合わせ/i })`でボタンを検出
- **Queries Used**: `getByRole`, `userEvent.click`

#### Test Case: TC-005-003 料金セクション後のCTAクリック
- **Description**: 料金セクション後のお問い合わせCTAをクリックした場合、`#contact`セクションにスクロールすることを検証
- **Given**: PricingSectionコンポーネントがレンダリングされている
- **When**: ContactCTAコンポーネントのお問い合わせボタンをクリック
- **Then**: `#contact`セクションにスクロールする
- **Test File**: `tests/ui/mens-esthe-service/PricingSection.test.tsx`
- **Accessibility**: `getByRole('button', { name: /お問い合わせ/i })`でボタンを検出
- **Queries Used**: `getByRole`, `userEvent.click`

#### Test Case: TC-005-004 お問い合わせCTAの配置確認
- **Description**: お問い合わせCTAが3箇所（ヒーロー、料金後、ページ下部）に配置されていることを検証
- **Given**: メインページコンポーネントがレンダリングされている
- **When**: ページを確認
- **Then**: お問い合わせCTAが3箇所に存在する
- **Test File**: `tests/ui/mens-esthe-service/page.test.tsx`
- **Accessibility**: `getAllByRole('button', { name: /お問い合わせ/i })`でボタンを検出
- **Queries Used**: `getAllByRole`

## Error Handling Tests

### UI Tests (React Testing Library)

#### Test Case: TC-ERR-001 エラーページの表示
- **Description**: エラー発生時にエラーページが表示されることを検証
- **Given**: エラーが発生している
- **When**: Errorコンポーネントがレンダリングされる
- **Then**: エラーメッセージと再試行ボタンが表示される
- **Test File**: `tests/ui/mens-esthe-service/error.test.tsx`
- **Accessibility**: `getByRole('heading')`で見出しを検出、`getByRole('button', { name: /再試行/i })`でボタンを検出
- **Queries Used**: `getByRole`, `getByText`

#### Test Case: TC-ERR-002 エラーページの再試行機能
- **Description**: エラーページの再試行ボタンをクリックした場合、reset関数が呼び出されることを検証
- **Given**: Errorコンポーネントがレンダリングされ、reset関数がモックされている
- **When**: 再試行ボタンをクリック
- **Then**: reset関数が1回呼び出される
- **Test File**: `tests/ui/mens-esthe-service/error.test.tsx`
- **Accessibility**: `getByRole('button', { name: /再試行/i })`でボタンを検出
- **Queries Used**: `getByRole`, `userEvent.click`

#### Test Case: TC-ERR-003 ローディングページの表示
- **Description**: ローディング中にローディングページが表示されることを検証
- **Given**: ページが読み込み中
- **When**: Loadingコンポーネントがレンダリングされる
- **Then**: スケルトンUIが表示される
- **Test File**: `tests/ui/mens-esthe-service/loading.test.tsx`
- **Accessibility**: スケルトンUIは`aria-hidden="true"`で非表示にする
- **Queries Used**: `getByRole`, `queryByText`

## Accessibility Tests

### UI Tests (React Testing Library)

#### Test Case: TC-A11Y-001 セマンティックHTMLの使用
- **Description**: すべてのセクションがセマンティックHTMLを使用していることを検証
- **Given**: メインページコンポーネントがレンダリングされている
- **When**: ページの構造を確認
- **Then**: `<section>`, `<article>`, `<nav>`などのセマンティックHTMLが適切に使用されている
- **Test File**: `tests/ui/mens-esthe-service/accessibility.test.tsx`
- **Accessibility**: `getByRole`でセマンティックな要素を検出
- **Queries Used**: `getByRole`, `getAllByRole`

#### Test Case: TC-A11Y-002 ARIA属性の使用
- **Description**: すべてのインタラクティブ要素に適切なARIA属性が設定されていることを検証
- **Given**: メインページコンポーネントがレンダリングされている
- **When**: インタラクティブ要素を確認
- **Then**: `aria-label`, `aria-expanded`, `aria-controls`などのARIA属性が適切に設定されている
- **Test File**: `tests/ui/mens-esthe-service/accessibility.test.tsx`
- **Accessibility**: `getByRole`で要素を検出、`getAttribute`でARIA属性を確認
- **Queries Used**: `getByRole`, `getAttribute`

#### Test Case: TC-A11Y-003 キーボードナビゲーション
- **Description**: すべてのインタラクティブ要素がキーボードで操作できることを検証
- **Given**: メインページコンポーネントがレンダリングされている
- **When**: Tabキーでフォーカスを移動
- **Then**: すべてのインタラクティブ要素にフォーカスが当たる
- **Test File**: `tests/ui/mens-esthe-service/accessibility.test.tsx`
- **Accessibility**: `userEvent.tab`でフォーカスを移動、`getByRole`で要素を検出
- **Queries Used**: `getByRole`, `userEvent.tab`

## Responsive Design Tests

### UI Tests (React Testing Library)

#### Test Case: TC-RESP-001 モバイル表示（375px）
- **Description**: モバイルサイズ（375px）で適切に表示されることを検証
- **Given**: メインページコンポーネントがレンダリングされている
- **When**: ビューポートを375pxに設定
- **Then**: すべてのコンテンツが適切に表示され、横スクロールが発生しない
- **Test File**: `tests/ui/mens-esthe-service/responsive.test.tsx`
- **Accessibility**: モバイルでもアクセシビリティ要件を満たす
- **Queries Used**: `getByRole`, `window.matchMedia`（ビューポートサイズの設定）

#### Test Case: TC-RESP-002 タブレット表示（768px）
- **Description**: タブレットサイズ（768px）で適切に表示されることを検証
- **Given**: メインページコンポーネントがレンダリングされている
- **When**: ビューポートを768pxに設定
- **Then**: すべてのコンテンツが適切に表示され、レイアウトが調整される
- **Test File**: `tests/ui/mens-esthe-service/responsive.test.tsx`
- **Accessibility**: タブレットでもアクセシビリティ要件を満たす
- **Queries Used**: `getByRole`, `window.matchMedia`

#### Test Case: TC-RESP-003 デスクトップ表示（1920px）
- **Description**: デスクトップサイズ（1920px）で適切に表示されることを検証
- **Given**: メインページコンポーネントがレンダリングされている
- **When**: ビューポートを1920pxに設定
- **Then**: すべてのコンテンツが適切に表示され、最大幅が制限される
- **Test File**: `tests/ui/mens-esthe-service/responsive.test.tsx`
- **Accessibility**: デスクトップでもアクセシビリティ要件を満たす
- **Queries Used**: `getByRole`, `window.matchMedia`

## SEO Tests

### Unit Tests

#### Test Case: TC-SEO-001 構造化データの生成
- **Description**: Schema.org Serviceスキーマの構造化データが正しく生成されることを検証
- **Given**: サービス情報データが提供されている
- **When**: generateStructuredData関数を実行
- **Then**: 有効なJSON-LD形式の構造化データが生成される
- **Test File**: `tests/unit/mens-esthe-service/utils.test.ts`
- **Coverage**: `lib/utils/mens-esthe-service.ts`の`generateStructuredData`関数

### UI Tests (React Testing Library)

#### Test Case: TC-SEO-002 構造化データの埋め込み
- **Description**: 構造化データがページに正しく埋め込まれていることを検証
- **Given**: StructuredDataコンポーネントがレンダリングされている
- **When**: ページのHTMLを確認
- **Then**: `<script type="application/ld+json">`タグが存在し、有効なJSON-LDが含まれる
- **Test File**: `tests/ui/mens-esthe-service/StructuredData.test.tsx`
- **Accessibility**: 構造化データはスクリーンリーダーには影響しない
- **Queries Used**: `container.querySelector`

#### Test Case: TC-SEO-003 メタタグの設定
- **Description**: メタタグ（title、description、OGP）が正しく設定されていることを検証
- **Given**: メインページコンポーネントがレンダリングされている
- **When**: ページのメタタグを確認
- **Then**: title、description、OGPタグが正しく設定されている
- **Test File**: `tests/ui/mens-esthe-service/page.test.tsx`
- **Accessibility**: メタタグはSEO用であり、アクセシビリティには直接影響しない
- **Queries Used**: `container.querySelector`（メタタグの確認）

## Edge Cases Tests

### UI Tests (React Testing Library)

#### Test Case: TC-EDGE-001 制作実績が空の場合
- **Description**: 制作実績が空の場合、「現在準備中です」のメッセージが表示されることを検証
- **Given**: 空の制作実績配列が提供されている
- **When**: PortfolioSectionコンポーネントをレンダリング
- **Then**: 「現在準備中です」のメッセージが表示され、実績一覧は表示されない
- **Test File**: `tests/ui/mens-esthe-service/PortfolioSection.test.tsx`
- **Accessibility**: メッセージは`getByText`で検出可能
- **Queries Used**: `getByText`, `queryByRole`（実績一覧が存在しないことを確認）

#### Test Case: TC-EDGE-002 外部リンクが無効な場合
- **Description**: 無効な外部リンクをクリックした場合、エラーメッセージが表示されることを検証
- **Given**: PortfolioSectionコンポーネントがレンダリングされ、無効なURLの制作実績データが提供されている
- **When**: リンクをクリック（エラーが発生する）
- **Then**: エラーメッセージが表示される（`role="alert"`で検出可能）
- **Test File**: `tests/ui/mens-esthe-service/PortfolioSection.test.tsx`
- **Accessibility**: エラーメッセージは`getByRole('alert')`で検出可能
- **Queries Used**: `getByRole`, `userEvent.click`, `findByRole`

#### Test Case: TC-EDGE-003 長いページでのナビゲーション
- **Description**: ページが非常に長い場合でも、ナビゲーションリンクが正常に機能することを検証
- **Given**: メインページコンポーネントがレンダリングされ、すべてのセクションが存在する
- **When**: ナビゲーションリンクをクリック
- **Then**: 該当セクションにスムーズスクロールする
- **Test File**: `tests/ui/mens-esthe-service/navigation.test.tsx`
- **Accessibility**: ナビゲーションリンクは`getByRole('link')`で検出可能
- **Queries Used**: `getByRole`, `userEvent.click`

## Performance Tests

### Unit Tests

#### Test Case: TC-PERF-001 画像最適化関数
- **Description**: 画像最適化関数が正しく動作することを検証
- **Given**: 画像URLとサイズパラメータが提供されている
- **When**: optimizeImageUrl関数を実行
- **Then**: 最適化された画像URLが返される
- **Test File**: `tests/unit/mens-esthe-service/utils.test.ts`
- **Coverage**: `lib/utils/mens-esthe-service.ts`の`optimizeImageUrl`関数

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

