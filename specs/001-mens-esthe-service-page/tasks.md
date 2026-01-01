# Tasks: メンズエステ店向けサイト制作サービスページ

**入力**: `/specs/001-mens-esthe-service-page/` の設計ドキュメント
**前提条件**: plan.md（必須）、spec.md（ユーザーストーリーに必須）、research.md、data-model.md、contracts/
**テスト**: TDDアプローチ - すべてのテストは実装前に先に書かれ、失敗することを確認する必要があります

**構成**: タスクはユーザーストーリーごとにグループ化され、各ストーリーを独立して実装・テストできるようにします。

## フォーマット: `[ID] [P?] [Story] 説明`

- **[P]**: 並列実行可能（異なるファイル、依存関係なし）
- **[Story]**: このタスクが属するユーザーストーリー（例: US1、US2、US3）
- 説明には正確なファイルパスを含める

## パス規則

- **Webアプリ**: Next.js 16 App Router構造
- **コンポーネント**: `components/MensEstheService/`
- **型定義**: `lib/types/mens-esthe-service.ts`
- **ユーティリティ**: `lib/utils/mens-esthe-service.ts`
- **テスト**: `tests/unit/` と `tests/ui/`
- **ページ**: `app/services/mens-esthe/`

---

## Phase 1: セットアップ（共有インフラストラクチャ）

**目的**: プロジェクトの初期化と基本構造

- [ ] T001 サービスページのディレクトリ構造を作成: `app/services/mens-esthe/` ディレクトリを作成
- [ ] T002 コンポーネントのディレクトリ構造を作成: `components/MensEstheService/` ディレクトリを作成
- [ ] T003 テストのディレクトリ構造を作成: `tests/unit/mens-esthe-service/` と `tests/ui/mens-esthe-service/` ディレクトリを作成
- [ ] T004 [P] pnpmがインストールされ動作していることを確認: `pnpm --version` を実行してパッケージマネージャーを確認
- [ ] T005 [P] 必要な依存関係がインストールされていることを確認: `package.json` で Next.js 16.0.1+、React 19.0.0+、framer-motion 12.23.24+、Tailwind CSS 3.3.5+ を確認

---

## Phase 2: 基盤（ブロッキング前提条件）

**目的**: すべてのユーザーストーリーの実装前に完了しなければならないコアインフラストラクチャ

**⚠️ 重要**: このフェーズが完了するまで、ユーザーストーリーの作業を開始できません

- [ ] T006 型定義ファイルを作成: すべてのエンティティ型（ServiceInfo、Feature、PricingItem、PortfolioItem、ProcessStep、FAQItem、SectionId、SECTION_IDS定数）を含む `lib/types/mens-esthe-service.ts` を作成
- [ ] T007 ユーティリティ関数ファイルを作成: バリデーションとユーティリティ関数のプレースホルダー関数を含む `lib/utils/mens-esthe-service.ts` を作成
- [ ] T008 テストユーティリティとモックファイルを作成: すべてのエンティティのモックデータを含む `tests/ui/mens-esthe-service/mocks.ts` を作成
- [ ] T009 テスト環境を導入・設定: Vitest + React Testing Library + jsdom を導入し、`package.json` に `pnpm test`（`vitest run --coverage`）を追加し、カバレッジ100%が閾値で強制される設定（vitest config / setup）を作成して実行できることを確認

**チェックポイント**: 基盤準備完了 - ユーザーストーリーの実装を並列で開始できます

---

## Phase 3: User Story 1 - サービス内容の閲覧 (Priority: P1) 🎯 MVP

**Goal**: 潜在的な顧客が、サイト制作サービスの内容を理解し、提供される機能や価値を確認できる。ヒーローセクション、主要機能セクション、料金情報セクションを実装する。

**Independent Test**: サービスページ（`/services/mens-esthe`）にアクセスし、サービス概要、主要機能、料金情報が表示され、理解できることを確認できる。

### User Story 1 のテスト（TDD - 先に書く、失敗することを確認）

#### 単体テスト

- [ ] T010 [P] [US1] validateServiceInfo関数の単体テストを作成: テストケース TC-001-001（有効および無効なServiceInfoデータのバリデーション）を含む `tests/unit/mens-esthe-service/utils.test.ts` を作成
- [ ] T011 [P] [US1] validateFeature関数の単体テストを作成: テストケース TC-001-002（有効および無効なFeatureデータのバリデーション）を `tests/unit/mens-esthe-service/utils.test.ts` に追加
- [ ] T012 [P] [US1] validatePricingItem関数の単体テストを作成: テストケース TC-001-003（有効および無効なPricingItemデータのバリデーション）を `tests/unit/mens-esthe-service/utils.test.ts` に追加
- [ ] T013 [US1] 単体テストを実行し失敗することを確認: `pnpm test tests/unit/mens-esthe-service/utils.test.ts` を実行し、すべてのテストが失敗することを確認（TDD レッドフェーズ）

#### UIテスト（React Testing Library）

- [ ] T014 [P] [US1] HeroSectionコンポーネントのUIテストを作成: テストケース TC-001-004（サービス名、キャッチコピー、価値提案の表示）を含む `tests/ui/mens-esthe-service/HeroSection.test.tsx` を作成
- [ ] T015 [P] [US1] FeaturesSectionコンポーネントのUIテストを作成: テストケース TC-001-005（アイコン付き機能一覧の表示）を含む `tests/ui/mens-esthe-service/FeaturesSection.test.tsx` を作成
- [ ] T016 [P] [US1] PricingSectionコンポーネントのUIテストを作成: テストケース TC-001-006（料金カテゴリの表示）を含む `tests/ui/mens-esthe-service/PricingSection.test.tsx` を作成
- [ ] T017 [P] [US1] FeaturesSectionのスクロールアニメーションのUIテストを作成: テストケース TC-001-007（スクロールトリガーアニメーション）を `tests/ui/mens-esthe-service/FeaturesSection.test.tsx` に追加
- [ ] T018 [US1] UIテストを実行し失敗することを確認: `pnpm test tests/ui/mens-esthe-service/` を実行し、すべてのテストが失敗することを確認（TDD レッドフェーズ）

### User Story 1 の実装

#### 型定義とバリデーション関数

- [ ] T019 [US1] ServiceInfo型定義を実装: name、catchphrase、valueProposition、description、targetAudienceフィールドを含むServiceInfo型を `lib/types/mens-esthe-service.ts` に追加
- [ ] T020 [US1] Feature型定義を実装: id、name、description、iconフィールドを含むFeature型を `lib/types/mens-esthe-service.ts` に追加
- [ ] T021 [US1] PricingItem型定義を実装: id、name、price、description、categoryフィールドを含むPricingItem型を `lib/types/mens-esthe-service.ts` に追加
- [ ] T022 [US1] SECTION_IDS定数を実装: hero、features、pricing、portfolio、process、faq、contactのIDを含むSECTION_IDS定数を `lib/types/mens-esthe-service.ts` に追加
- [ ] T023 [US1] SectionId型を実装: SECTION_IDSに基づいてSectionId型を `lib/types/mens-esthe-service.ts` に追加
- [ ] T024 [US1] validateServiceInfo関数を実装: ServiceInfo型のバリデーションロジックを含むvalidateServiceInfo関数を `lib/utils/mens-esthe-service.ts` に追加
- [ ] T025 [US1] validateFeature関数を実装: Feature型のバリデーションロジックを含むvalidateFeature関数を `lib/utils/mens-esthe-service.ts` に追加
- [ ] T026 [US1] validatePricingItem関数を実装: PricingItem型のバリデーションロジックを含むvalidatePricingItem関数を `lib/utils/mens-esthe-service.ts` に追加
- [ ] T027 [US1] 単体テストを実行し成功することを確認: `pnpm test tests/unit/mens-esthe-service/utils.test.ts` を実行し、すべてのテストが成功することを確認（TDD グリーンフェーズ）

#### コンポーネント実装

- [ ] T028 [US1] HeroSectionコンポーネントの構造を作成: 'use client'ディレクティブ、propsインターフェース、基本JSX構造を含む `components/MensEstheService/HeroSection.tsx` を作成
- [ ] T029 [US1] HeroSectionのサービス情報表示を実装: `components/MensEstheService/HeroSection.tsx` にサービス名（h1）、キャッチコピー、valuePropositionの表示を追加
- [ ] T030 [US1] HeroSectionのCTAボタンを実装: `components/MensEstheService/HeroSection.tsx` に#contactセクションにスクロールするonClickハンドラー付きの連絡先CTAボタンを追加
- [ ] T031 [US1] HeroSectionのframer-motionアニメーションを実装: `components/MensEstheService/HeroSection.tsx` にframer-motionアニメーション（初期opacity 0、y 50、アニメーションでopacity 1、y 0）を追加
- [ ] T032 [US1] HeroSectionのアクセシビリティを実装: `components/MensEstheService/HeroSection.tsx` にrole="banner"、セマンティックHTML、CTAボタンのaria-labelを追加
- [ ] T033 [US1] FeaturesSectionコンポーネントの構造を作成: 'use client'ディレクティブ、propsインターフェース、基本JSX構造を含む `components/MensEstheService/FeaturesSection.tsx` を作成
- [ ] T034 [US1] FeaturesSectionの機能一覧表示を実装: `components/MensEstheService/FeaturesSection.tsx` に機能名、説明、アイコン表示を含む機能マッピングを追加
- [ ] T035 [US1] FeaturesSectionのアイコンマッピングを実装: `components/MensEstheService/FeaturesSection.tsx` にlucide-reactアイコン（Calendar、CalendarCheck、Usersなど）を使用したiconMapを追加
- [ ] T036 [US1] FeaturesSectionのスクロールアニメーションを実装: `components/MensEstheService/FeaturesSection.tsx` に各機能カードのframer-motion whileInViewアニメーションを追加
- [ ] T037 [US1] FeaturesSectionのアクセシビリティを実装: `components/MensEstheService/FeaturesSection.tsx` にaria-labelledby、セマンティックHTML（articleタグ）、適切な見出し構造を追加
- [ ] T038 [US1] PricingSectionコンポーネントの構造を作成: 'use client'ディレクティブ、propsインターフェース、基本JSX構造を含む `components/MensEstheService/PricingSection.tsx` を作成
- [ ] T039 [US1] PricingSectionのカテゴリフィルタリングを実装: `components/MensEstheService/PricingSection.tsx` に初期、月額、オプションカテゴリのフィルタリングロジックを追加
- [ ] T040 [US1] PricingSectionの料金表示を実装: `components/MensEstheService/PricingSection.tsx` に名前、価格（strongタグ）、説明を含む料金項目の表示を追加
- [ ] T041 [US1] PricingSectionのセマンティックHTMLを実装: `components/MensEstheService/PricingSection.tsx` に料金情報のセマンティックHTML（dl、dt、ddタグ）を追加
- [ ] T042 [US1] PricingSectionのアクセシビリティを実装: `components/MensEstheService/PricingSection.tsx` にaria-labelledbyと適切な見出し構造を追加
- [ ] T043 [US1] ContactCTAコンポーネントを作成: 'use client'ディレクティブ、#contactへのスムーズスクロールのonClickハンドラー、aria-labelを含む `components/MensEstheService/ContactCTA.tsx` を作成
- [ ] T044 [US1] PricingSectionにContactCTAを追加: `components/MensEstheService/PricingSection.tsx` に料金情報の後にContactCTAコンポーネントをインポートして追加
- [ ] T045 [US1] UIテストを実行し成功することを確認: `pnpm test tests/ui/mens-esthe-service/` を実行し、すべてのテストが成功することを確認（TDD グリーンフェーズ）

#### データとページ統合

- [ ] T046 [US1] US1用のデータファイルを作成: serviceInfo、features、pricingItemsのモックデータを含む `app/services/mens-esthe/data.ts` を作成
- [ ] T047 [US1] メインページコンポーネントの構造を作成: Server Component構造、メタデータエクスポート、基本レイアウトを含む `app/services/mens-esthe/page.tsx` を作成
- [ ] T048 [US1] ページメタデータを実装: `app/services/mens-esthe/page.tsx` にtitle、description、OGPタグを含むMetadataエクスポートを追加
- [ ] T049 [US1] ページにHeroSectionを統合: `app/services/mens-esthe/page.tsx` にserviceInfoプロップ付きのHeroSectionコンポーネントをインポートして追加
- [ ] T050 [US1] ページにFeaturesSectionを統合: `app/services/mens-esthe/page.tsx` にfeaturesプロップ付きのFeaturesSectionコンポーネントをインポートして追加
- [ ] T051 [US1] ページにPricingSectionを統合: `app/services/mens-esthe/page.tsx` にpricingItemsプロップ付きのPricingSectionコンポーネントをインポートして追加
- [ ] T052 [US1] ページが正しくレンダリングされることを確認: `pnpm run dev` で開発サーバーを起動し、`/services/mens-esthe` に移動してすべてのセクションが正しく表示されることを確認
- [ ] T053 [US1] レスポンシブデザインを確認: 375px（モバイル）、768px（タブレット）、1920px（デスクトップ）のビューポート幅でページをテストし、横スクロールがないことを確認

**チェックポイント**: この時点で、User Story 1は完全に機能し、独立してテスト可能である必要があります。すべてのテストが成功し、ページはヒーロー、機能、料金セクションを正しく表示する必要があります。

---

## Phase 4: User Story 2 - 制作実績の確認 (Priority: P2)

**Goal**: 潜在的な顧客が、過去の制作実績を確認し、サービスの信頼性と実績を評価できる。制作実績セクションを実装し、外部リンクのエラーハンドリングを含める。

**Independent Test**: 制作実績セクションにアクセスし、過去の制作事例が表示され、各事例の詳細（店舗名、リンクなど）を確認できる。無効なリンクの場合はエラーメッセージが表示される。

### User Story 2 のテスト（TDD - 先に書く、失敗することを確認）

#### 単体テスト

- [ ] T054 [P] [US2] validatePortfolioItem関数の単体テストを作成: テストケース TC-002-001（有効および無効なPortfolioItemデータのバリデーション）を `tests/unit/mens-esthe-service/utils.test.ts` に追加
- [ ] T055 [P] [US2] handleExternalLinkError関数の単体テストを作成: テストケース TC-002-002（URL形式不正、またはwindow.open失敗（null）時のエラーハンドリング）を `tests/unit/mens-esthe-service/utils.test.ts` に追加
- [ ] T056 [US2] 単体テストを実行し失敗することを確認: `pnpm test tests/unit/mens-esthe-service/utils.test.ts` を実行し、新しいテストが失敗することを確認（TDD レッドフェーズ）

#### UIテスト（React Testing Library）

- [ ] T057 [P] [US2] アイテム付きPortfolioSectionのUIテストを作成: テストケース TC-002-003（店舗名とリンク付きの制作実績アイテムの表示）を `tests/ui/mens-esthe-service/PortfolioSection.test.tsx` に追加
- [ ] T058 [P] [US2] PortfolioSectionの空状態のUIテストを作成: テストケース TC-002-004（空の制作実績が「現在準備中です」メッセージを表示）を `tests/ui/mens-esthe-service/PortfolioSection.test.tsx` に追加
- [ ] T059 [P] [US2] 外部リンククリック（成功）のUIテストを作成: テストケース TC-002-005（リンクが新しいタブで開く）を `tests/ui/mens-esthe-service/PortfolioSection.test.tsx` に追加
- [ ] T060 [P] [US2] 外部リンククリック（エラー）のUIテストを作成: テストケース TC-002-006（URL形式不正、またはwindow.open失敗（null）でエラーメッセージを表示）を `tests/ui/mens-esthe-service/PortfolioSection.test.tsx` に追加
- [ ] T061 [US2] UIテストを実行し失敗することを確認: `pnpm test tests/ui/mens-esthe-service/PortfolioSection.test.tsx` を実行し、すべてのテストが失敗することを確認（TDD レッドフェーズ）

### User Story 2 の実装

#### 型定義とバリデーション関数

- [ ] T062 [US2] PortfolioItem型定義を実装: id、storeName、siteUrl、thumbnailImage?フィールドを含むPortfolioItem型を `lib/types/mens-esthe-service.ts` に追加
- [ ] T063 [US2] validatePortfolioItem関数を実装: PortfolioItem型のバリデーションロジックを含むvalidatePortfolioItem関数を `lib/utils/mens-esthe-service.ts` に追加
- [ ] T064 [US2] handleExternalLinkError関数を実装: エラー検出とメッセージ生成ロジックを含むhandleExternalLinkError関数を `lib/utils/mens-esthe-service.ts` に追加
- [ ] T065 [US2] 単体テストを実行し成功することを確認: `pnpm test tests/unit/mens-esthe-service/utils.test.ts` を実行し、新しいテストが成功することを確認（TDD グリーンフェーズ）

#### コンポーネント実装

- [ ] T066 [US2] PortfolioSectionコンポーネントの構造を作成: 'use client'ディレクティブ、propsインターフェース、エラー用のuseState、基本JSX構造を含む `components/MensEstheService/PortfolioSection.tsx` を作成
- [ ] T067 [US2] PortfolioSectionの空状態を実装: `components/MensEstheService/PortfolioSection.tsx` に空のportfolioItems配列に対する条件付きレンダリングと「現在準備中です」メッセージを追加
- [ ] T068 [US2] PortfolioSectionの制作実績アイテム表示を実装: `components/MensEstheService/PortfolioSection.tsx` に店舗名、サムネイル画像（存在する場合）、リンクを含む制作実績アイテムのマッピングを追加
- [ ] T069 [US2] PortfolioSectionのサムネイル画像を実装: `components/MensEstheService/PortfolioSection.tsx` に適切なwidth、height、sizes、altテキストを含むNext.js Imageコンポーネントを追加
- [ ] T070 [US2] PortfolioSectionの外部リンクハンドラーを実装: `components/MensEstheService/PortfolioSection.tsx` にwindow.open、エラー検出、エラー状態管理を含むhandleLinkClick関数を追加
- [ ] T071 [US2] PortfolioSectionのエラーメッセージ表示を実装: `components/MensEstheService/PortfolioSection.tsx` に各制作実績アイテムのrole="alert"付きエラーメッセージ表示を追加
- [ ] T072 [US2] PortfolioSectionのアクセシビリティを実装: `components/MensEstheService/PortfolioSection.tsx` にaria-labelledby、セマンティックHTML（articleタグ）、外部リンクのrel="noopener noreferrer"、リンクのaria-labelを追加
- [ ] T073 [US2] UIテストを実行し成功することを確認: `pnpm test tests/ui/mens-esthe-service/PortfolioSection.test.tsx` を実行し、すべてのテストが成功することを確認（TDD グリーンフェーズ）

#### データとページ統合

- [ ] T074 [US2] データファイルにportfolioItemsを追加: portfolioItems配列（最初は空でも可）を `app/services/mens-esthe/data.ts` に追加
- [ ] T075 [US2] ページにPortfolioSectionを統合: `app/services/mens-esthe/page.tsx` にportfolioItemsプロップ付きのPortfolioSectionコンポーネントをインポートして追加
- [ ] T076 [US2] 制作実績セクションが正しくレンダリングされることを確認: 空のportfolioItems配列でページをテストし、「現在準備中です」メッセージが表示されることを確認
- [ ] T077 [US2] アイテム付きの制作実績セクションを確認: データファイルにサンプルのportfolioItemsを追加し、アイテムがリンク付きで正しく表示されることを確認
- [ ] T078 [US2] 外部リンクエラーハンドリングを確認: 無効なリンクをクリックしてテストし、エラーメッセージが正しく表示されることを確認

**チェックポイント**: この時点で、User Story 2は完全に機能し、独立してテスト可能である必要があります。制作実績セクションは空状態とアイテム状態で正しく表示され、エラーハンドリングが動作する必要があります。

---

## Phase 5: User Story 3 - 導入プロセスの理解 (Priority: P2)

**Goal**: 潜在的な顧客が、サービス導入までの流れを理解し、次のステップを把握できる。導入プロセスセクションをステップ形式で実装する。

**Independent Test**: 導入までの流れセクションを閲覧し、各ステップが順序立てて表示され、理解できることを確認できる。

### User Story 3 のテスト（TDD - 先に書く、失敗することを確認）

#### Unit Tests

- [ ] T079 [P] [US3] validateProcessStep関数の単体テストを作成: テストケース TC-003-001（有効および無効なProcessStepデータのバリデーション）を `tests/unit/mens-esthe-service/utils.test.ts` に追加
- [ ] T080 [US3] 単体テストを実行し失敗することを確認: `pnpm test tests/unit/mens-esthe-service/utils.test.ts` を実行し、新しいテストが失敗することを確認（TDD レッドフェーズ）

#### UIテスト（React Testing Library）

- [ ] T081 [P] [US3] ProcessSection表示のUIテストを作成: テストケース TC-003-002（ステップ番号、タイトル、説明付きで順序通りに表示される導入ステップ）を含む `tests/ui/mens-esthe-service/ProcessSection.test.tsx` を作成
- [ ] T082 [P] [US3] ProcessSectionのステップ番号のUIテストを作成: テストケース TC-003-003（ステップ番号が正しく表示される: 1、2、3...）を `tests/ui/mens-esthe-service/ProcessSection.test.tsx` に追加
- [ ] T083 [US3] UIテストを実行し失敗することを確認: `pnpm test tests/ui/mens-esthe-service/ProcessSection.test.tsx` を実行し、すべてのテストが失敗することを確認（TDD レッドフェーズ）

### User Story 3 の実装

#### Type Definitions and Validation Functions

- [ ] T084 [US3] ProcessStep型定義を実装: id、stepNumber、title、description、icon?フィールドを含むProcessStep型を `lib/types/mens-esthe-service.ts` に追加
- [ ] T085 [US3] validateProcessStep関数を実装: ProcessStep型のバリデーションロジックを含むvalidateProcessStep関数を `lib/utils/mens-esthe-service.ts` に追加
- [ ] T086 [US3] 単体テストを実行し成功することを確認: `pnpm test tests/unit/mens-esthe-service/utils.test.ts` を実行し、新しいテストが成功することを確認（TDD グリーンフェーズ）

#### コンポーネント実装

- [ ] T087 [US3] ProcessSectionコンポーネントの構造を作成: 'use client'ディレクティブ、propsインターフェース、基本JSX構造を含む `components/MensEstheService/ProcessSection.tsx` を作成
- [ ] T088 [US3] ProcessSectionの順序付きリストを実装: `components/MensEstheService/ProcessSection.tsx` に導入ステップのマッピングを含む順序付きリスト（ol）を追加
- [ ] T089 [US3] ProcessSectionのステップ表示を実装: `components/MensEstheService/ProcessSection.tsx` に各ステップのステップ番号、アイコン（存在する場合）、タイトル、説明を追加
- [ ] T090 [US3] ProcessSectionのアイコンマッピングを実装: `components/MensEstheService/ProcessSection.tsx` にlucide-reactアイコン（Mail、MessageSquare、Code、Rocketなど）を使用したiconMapを追加
- [ ] T091 [US3] ProcessSectionのスクロールアニメーションを実装: `components/MensEstheService/ProcessSection.tsx` に各ステップのframer-motion whileInViewアニメーションを追加
- [ ] T092 [US3] ProcessSectionのアクセシビリティを実装: `components/MensEstheService/ProcessSection.tsx` にaria-labelledby、セマンティックHTML（ol、li、articleタグ）、ステップ番号のaria-labelを追加
- [ ] T093 [US3] UIテストを実行し成功することを確認: `pnpm test tests/ui/mens-esthe-service/ProcessSection.test.tsx` を実行し、すべてのテストが成功することを確認（TDD グリーンフェーズ）

#### データとページ統合

- [ ] T094 [US3] データファイルにprocessStepsを追加: ステップデータを含むprocessSteps配列を `app/services/mens-esthe/data.ts` に追加
- [ ] T095 [US3] ページにProcessSectionを統合: `app/services/mens-esthe/page.tsx` にprocessStepsプロップ付きのProcessSectionコンポーネントをインポートして追加
- [ ] T096 [US3] 導入プロセスセクションが正しくレンダリングされることを確認: ページをテストし、導入ステップがステップ番号付きで正しい順序で表示されることを確認

**チェックポイント**: この時点で、User Story 3は完全に機能し、独立してテスト可能である必要があります。導入プロセスセクションは適切な番号付けで順序通りにステップを表示する必要があります。

---

## Phase 6: User Story 4 - よくある質問の確認 (Priority: P3)

**Goal**: 潜在的な顧客が、よくある質問を確認し、疑問点を解消できる。FAQセクションをアコーディオン形式で実装する。

**Independent Test**: FAQセクションにアクセスし、質問と回答が表示され、必要な情報を見つけられることを確認できる。アコーディオンの開閉が正常に動作する。

### User Story 4 のテスト（TDD - 先に書く、失敗することを確認）

#### Unit Tests

- [ ] T097 [P] [US4] validateFAQItem関数の単体テストを作成: テストケース TC-004-001（有効および無効なFAQItemデータのバリデーション）を `tests/unit/mens-esthe-service/utils.test.ts` に追加
- [ ] T098 [US4] 単体テストを実行し失敗することを確認: `pnpm test tests/unit/mens-esthe-service/utils.test.ts` を実行し、新しいテストが失敗することを確認（TDD レッドフェーズ）

#### UIテスト（React Testing Library）

- [ ] T099 [P] [US4] FAQSection表示のUIテストを作成: テストケース TC-004-002（FAQアイテムが表示され、回答は最初は非表示）を含む `tests/ui/mens-esthe-service/FAQSection.test.tsx` を作成
- [ ] T100 [P] [US4] FAQアコーディオンのトグル（マウス）のUIテストを作成: テストケース TC-004-003（クリックで回答表示が切り替わり、aria-expandedが更新される）を `tests/ui/mens-esthe-service/FAQSection.test.tsx` に追加
- [ ] T101 [P] [US4] FAQアコーディオンのトグル（キーボード）のUIテストを作成: テストケース TC-004-004（Enter/Spaceキーで回答が切り替わる）を `tests/ui/mens-esthe-service/FAQSection.test.tsx` に追加
- [ ] T102 [P] [US4] FAQの独立したトグルのUIテストを作成: テストケース TC-004-005（複数のFAQアイテムが独立して切り替わる）を `tests/ui/mens-esthe-service/FAQSection.test.tsx` に追加
- [ ] T103 [US4] UIテストを実行し失敗することを確認: `pnpm test tests/ui/mens-esthe-service/FAQSection.test.tsx` を実行し、すべてのテストが失敗することを確認（TDD レッドフェーズ）

### User Story 4 の実装

#### Type Definitions and Validation Functions

- [ ] T104 [US4] FAQItem型定義を実装: id、question、answerフィールドを含むFAQItem型を `lib/types/mens-esthe-service.ts` に追加
- [ ] T105 [US4] validateFAQItem関数を実装: FAQItem型のバリデーションロジックを含むvalidateFAQItem関数を `lib/utils/mens-esthe-service.ts` に追加
- [ ] T106 [US4] 単体テストを実行し成功することを確認: `pnpm test tests/unit/mens-esthe-service/utils.test.ts` を実行し、新しいテストが成功することを確認（TDD グリーンフェーズ）

#### コンポーネント実装

- [ ] T107 [US4] FAQSectionコンポーネントの構造を作成: 'use client'ディレクティブ、propsインターフェース、openItems用のuseState（Set<string>）、基本JSX構造を含む `components/MensEstheService/FAQSection.tsx` を作成
- [ ] T108 [US4] FAQSectionのアコーディオン構造を実装: `components/MensEstheService/FAQSection.tsx` にボタン（質問）とdiv（回答）構造を含むFAQアイテムのマッピングを追加
- [ ] T109 [US4] FAQSectionのトグル関数を実装: `components/MensEstheService/FAQSection.tsx` にopenItems Setを更新するtoggleItem関数を追加
- [ ] T110 [US4] FAQSectionの回答表示を実装: `components/MensEstheService/FAQSection.tsx` にopenItems Setに基づく回答表示の条件付きレンダリングを追加
- [ ] T111 [US4] FAQSectionのキーボードサポートを実装: `components/MensEstheService/FAQSection.tsx` にEnterキーとSpaceキー用のonKeyDownハンドラーを追加
- [ ] T112 [US4] FAQSectionのアクセシビリティを実装: `components/MensEstheService/FAQSection.tsx` にaria-expanded、aria-controls、role="region"、適切なボタンセマンティクスを追加
- [ ] T113 [US4] UIテストを実行し成功することを確認: `pnpm test tests/ui/mens-esthe-service/FAQSection.test.tsx` を実行し、すべてのテストが成功することを確認（TDD グリーンフェーズ）

#### データとページ統合

- [ ] T114 [US4] データファイルにfaqItemsを追加: FAQデータを含むfaqItems配列を `app/services/mens-esthe/data.ts` に追加
- [ ] T115 [US4] ページにFAQSectionを統合: `app/services/mens-esthe/page.tsx` にfaqItemsプロップ付きのFAQSectionコンポーネントをインポートして追加
- [ ] T116 [US4] FAQセクションが正しくレンダリングされることを確認: ページをテストし、FAQアイテムが表示され、アコーディオンのトグルがマウスとキーボードで動作することを確認

**チェックポイント**: この時点で、User Story 4は完全に機能し、独立してテスト可能である必要があります。FAQセクションは動作するアコーディオン機能で正しく表示される必要があります。

---

## Phase 7: User Story 5 - お問い合わせへの導線 (Priority: P1)

**Goal**: 潜在的な顧客が、サービスに興味を持った際に、簡単にお問い合わせできる。お問い合わせCTAを3箇所（ヒーロー、料金後、ページ下部）に配置する。

**Independent Test**: サービスページからお問い合わせフォームまたは問い合わせリンクにアクセスし、問い合わせが可能であることを確認できる。3箇所すべてのCTAが正常に動作する。

### User Story 5 のテスト（TDD - 先に書く、失敗することを確認）

#### Unit Tests

- [ ] T117 [P] [US5] scrollToSection関数の単体テストを作成: テストケース TC-005-001（任意のSectionId（hero/features/pricing/portfolio/process/faq/contact）へのスクロール）を `tests/unit/mens-esthe-service/utils.test.ts` に追加
- [ ] T118 [US5] 単体テストを実行し失敗することを確認: `pnpm test tests/unit/mens-esthe-service/utils.test.ts` を実行し、新しいテストが失敗することを確認（TDD レッドフェーズ）

#### UIテスト（React Testing Library）

- [ ] T119 [P] [US5] HeroSectionのCTAクリックのUIテストを作成: テストケース TC-005-002（CTAクリックで#contactにスクロール）を `tests/ui/mens-esthe-service/HeroSection.test.tsx` に追加
- [ ] T120 [P] [US5] PricingSectionのCTAクリックのUIテストを作成: テストケース TC-005-003（ContactCTAクリックで#contactにスクロール）を `tests/ui/mens-esthe-service/PricingSection.test.tsx` に追加
- [ ] T121 [P] [US5] CTA配置のUIテストを作成: テストケース TC-005-004（ページに3つのCTAが存在）を含む `tests/ui/mens-esthe-service/page.test.tsx` を作成
- [ ] T122 [US5] UIテストを実行し失敗することを確認: `pnpm test tests/ui/mens-esthe-service/` を実行し、新しいテストが失敗することを確認（TDD レッドフェーズ）

- [ ] T182 [P] [US5] SectionNavのUIテストを作成: hero/features/pricing/portfolio/process/faq/contact へのリンクが存在することを検証する `tests/ui/mens-esthe-service/SectionNav.test.tsx` を作成

### User Story 5 の実装

#### ユーティリティ関数

- [ ] T123 [US5] scrollToSection関数を実装: 任意のSectionIdにスクロールできるscrollToSection関数を `lib/utils/mens-esthe-service.ts` に追加
- [ ] T124 [US5] 単体テストを実行し成功することを確認: `pnpm test tests/unit/mens-esthe-service/utils.test.ts` を実行し、新しいテストが成功することを確認（TDD グリーンフェーズ）

#### コンポーネント更新

- [ ] T125 [US5] HeroSectionのCTAをscrollToSectionを使用するように更新: `components/MensEstheService/HeroSection.tsx` のhandleContactClickをscrollToSectionユーティリティ関数を使用するように更新
- [ ] T126 [US5] ContactCTAをscrollToSectionを使用するように更新: `components/MensEstheService/ContactCTA.tsx` のhandleClickをscrollToSectionユーティリティ関数を使用するように更新
- [ ] T127 [US5] ページ下部にContactCTAを追加: `app/services/mens-esthe/page.tsx` にContactコンポーネントの前にContactCTAコンポーネントをインポートして追加
- [ ] T128 [US5] UIテストを実行し成功することを確認: `pnpm test tests/ui/mens-esthe-service/` を実行し、すべてのCTAテストが成功することを確認（TDD グリーンフェーズ）

- [ ] T183 [US5] SectionNavコンポーネントを作成: ページ内のセクションナビ（nav/アンカーリンク）を持つ `components/MensEstheService/SectionNav.tsx` を作成
- [ ] T184 [US5] ページにSectionNavを統合: `app/services/mens-esthe/page.tsx` にSectionNavを追加（表示位置も明記）

#### 統合と検証

- [ ] T129 [US5] すべてのCTAが正しく動作することを確認: 3つのCTA位置（ヒーロー、料金後、ページ下部）すべてをテストし、#contactセクションへのスムーズスクロールが動作することを確認
- [ ] T130 [US5] Contactコンポーネントが存在することを確認: CTAナビゲーションのために既存のContactコンポーネントが#contactセクションでアクセス可能であることを確認

**チェックポイント**: この時点で、User Story 5は完全に機能し、独立してテスト可能である必要があります。3つのCTAすべてが正しく動作し、連絡先セクションにスクロールする必要があります。

---

## Phase 8: エラーハンドリングとローディング状態

**目的**: 適切なエラーハンドリングとローディング状態のためにerror.tsxとloading.tsxを実装

### エラーハンドリングのテスト（TDD - 先に書く、失敗することを確認）

- [ ] T131 [P] エラーページ表示のUIテストを作成: テストケース TC-ERR-001（エラーメッセージと再試行ボタンの表示）を含む `tests/ui/mens-esthe-service/error.test.tsx` を作成
- [ ] T132 [P] エラーページの再試行のUIテストを作成: テストケース TC-ERR-002（再試行ボタンがreset関数を呼び出す）を `tests/ui/mens-esthe-service/error.test.tsx` に追加
- [ ] T133 [P] ローディングページ表示のUIテストを作成: テストケース TC-ERR-003（スケルトンUIの表示）を含む `tests/ui/mens-esthe-service/loading.test.tsx` を作成
- [ ] T134 エラー/ローディングテストを実行し失敗することを確認: `pnpm test tests/ui/mens-esthe-service/error.test.tsx loading.test.tsx` を実行し、すべてのテストが失敗することを確認（TDD レッドフェーズ）

### エラーハンドリングの実装

- [ ] T135 error.tsxコンポーネントを作成: 'use client'ディレクティブ、ErrorPropsインターフェース、エラーメッセージ表示、再試行ボタン、ホームリンクを含む `app/services/mens-esthe/error.tsx` を作成
- [ ] T136 error.tsxのreset機能を実装: `app/services/mens-esthe/error.tsx` に再試行ボタンクリック時のreset関数呼び出しを追加
- [ ] T137 loading.tsxコンポーネントを作成: Server Component構造とページ構造に一致するスケルトンUIを含む `app/services/mens-esthe/loading.tsx` を作成
- [ ] T138 loading.tsxのスケルトンを実装: `app/services/mens-esthe/loading.tsx` にヒーロー、機能、料金セクションのスケルトンコンポーネントを追加
- [ ] T139 エラー/ローディングテストを実行し成功することを確認: `pnpm test tests/ui/mens-esthe-service/error.test.tsx loading.test.tsx` を実行し、すべてのテストが成功することを確認（TDD グリーンフェーズ）

---

## Phase 9: SEOと構造化データ

**目的**: 検索エンジン最適化のためにSEOメタデータと構造化データ（JSON-LD）を実装

### SEOのテスト（TDD - 先に書く、失敗することを確認）

- [ ] T140 [P] generateStructuredData関数の単体テストを作成: テストケース TC-SEO-001（有効なJSON-LD生成）を `tests/unit/mens-esthe-service/utils.test.ts` に追加
- [ ] T141 [P] 構造化データ埋め込みのUIテストを作成: テストケース TC-SEO-002（JSON-LDを含むscriptタグが存在）を含む `tests/ui/mens-esthe-service/StructuredData.test.tsx` を作成
- [ ] T142 [P] メタタグのUIテストを作成: テストケース TC-SEO-003（title、description、OGPタグが存在）を `tests/ui/mens-esthe-service/page.test.tsx` に追加
- [ ] T143 SEOテストを実行し失敗することを確認: `pnpm test tests/unit/mens-esthe-service/utils.test.ts tests/ui/mens-esthe-service/` を実行し、SEOテストが失敗することを確認（TDD レッドフェーズ）

### SEOの実装

- [ ] T144 generateStructuredData関数を実装: Schema.org ServiceスキーマのJSON-LDを生成するgenerateStructuredData関数を `lib/utils/mens-esthe-service.ts` に追加
- [ ] T145 StructuredDataコンポーネントを作成: Server Component構造とJSON-LDを含むscriptタグを含む `components/MensEstheService/StructuredData.tsx` を作成
- [ ] T146 ページメタデータを更新: `app/services/mens-esthe/page.tsx` のMetadataエクスポートを完全なtitle、description、OGPタグで更新
- [ ] T147 ページにStructuredDataを統合: `app/services/mens-esthe/page.tsx` にStructuredDataコンポーネントをインポートして追加
- [ ] T148 SEOテストを実行し成功することを確認: `pnpm test tests/unit/mens-esthe-service/utils.test.ts tests/ui/mens-esthe-service/` を実行し、SEOテストが成功することを確認（TDD グリーンフェーズ）

---

## Phase 10: アクセシビリティとレスポンシブデザインのテスト

**目的**: 包括的なアクセシビリティとレスポンシブデザインのテストを実装

### アクセシビリティのテスト（TDD - 先に書く、失敗することを確認）

- [ ] T149 [P] セマンティックHTMLのUIテストを作成: テストケース TC-A11Y-001（セマンティックHTML要素が使用されている）を含む `tests/ui/mens-esthe-service/accessibility.test.tsx` を作成
- [ ] T150 [P] ARIA属性のUIテストを作成: テストケース TC-A11Y-002（ARIA属性が存在）を `tests/ui/mens-esthe-service/accessibility.test.tsx` に追加
- [ ] T151 [P] キーボードナビゲーションのUIテストを作成: テストケース TC-A11Y-003（キーボードナビゲーションが動作）を `tests/ui/mens-esthe-service/accessibility.test.tsx` に追加
- [ ] T152 [P] モバイルレスポンシブのUIテストを作成: テストケース TC-RESP-001（375px表示が動作）を含む `tests/ui/mens-esthe-service/responsive.test.tsx` を作成
- [ ] T153 [P] タブレットレスポンシブのUIテストを作成: テストケース TC-RESP-002（768px表示が動作）を `tests/ui/mens-esthe-service/responsive.test.tsx` に追加
- [ ] T154 [P] デスクトップレスポンシブのUIテストを作成: テストケース TC-RESP-003（1920px表示が動作）を `tests/ui/mens-esthe-service/responsive.test.tsx` に追加
- [ ] T155 アクセシビリティ/レスポンシブテストを実行し失敗することを確認: `pnpm test tests/ui/mens-esthe-service/accessibility.test.tsx responsive.test.tsx` を実行し、テストが失敗することを確認（TDD レッドフェーズ）

### アクセシビリティの実装

- [ ] T156 セマンティックHTMLの使用を確認: すべてのコンポーネントをレビューし、セマンティックHTML（section、article、navなど）が正しく使用されていることを確認
- [ ] T157 ARIA属性を確認: すべてのコンポーネントをレビューし、ARIA属性（aria-label、aria-expanded、aria-controlsなど）が必要な場所に存在することを確認
- [ ] T158 キーボードナビゲーションを確認: すべてのインタラクティブ要素をキーボード（Tab、Enter、Space）でテストし、正しく動作することを確認
- [ ] T159 レスポンシブデザインを確認: すべてのブレークポイント（375px、768px、1920px）でテストし、横スクロールがないこと、適切なレイアウト調整を確認
- [ ] T160 アクセシビリティ/レスポンシブテストを実行し成功することを確認: `pnpm test tests/ui/mens-esthe-service/accessibility.test.tsx responsive.test.tsx` を実行し、すべてのテストが成功することを確認（TDD グリーンフェーズ）

---

## Phase 11: エッジケースとパフォーマンス

**目的**: エッジケースの処理とパフォーマンス最適化を実装

### エッジケースのテスト（TDD - 先に書く、失敗することを確認）

- [ ] T161 [P] 空の制作実績のUIテストを作成: テストケース TC-EDGE-001（空の制作実績がメッセージを表示）を `tests/ui/mens-esthe-service/PortfolioSection.test.tsx` に追加
- [ ] T162 [P] 無効な外部リンクのUIテストを作成: テストケース TC-EDGE-002（無効なリンクがエラーを表示）を `tests/ui/mens-esthe-service/PortfolioSection.test.tsx` に追加
- [ ] T163 [P] 長いページのナビゲーションのUIテストを作成: テストケース TC-EDGE-003（長いページでナビゲーションが動作）を含む `tests/ui/mens-esthe-service/navigation.test.tsx` を作成
- [ ] T164 [P] 画像最適化の単体テストを作成: テストケース TC-PERF-001（画像URL最適化）を `tests/unit/mens-esthe-service/utils.test.ts` に追加
- [ ] T165 エッジケース/パフォーマンステストを実行し失敗することを確認: `pnpm test tests/ui/mens-esthe-service/ tests/unit/mens-esthe-service/utils.test.ts` を実行し、エッジケーステストが失敗することを確認（TDD レッドフェーズ）

### エッジケースとパフォーマンスの実装

- [ ] T166 optimizeImageUrl関数を実装: 画像URL最適化のためのoptimizeImageUrl関数を `lib/utils/mens-esthe-service.ts` に追加
- [ ] T167 空の制作実績の処理を確認: PortfolioSectionが空配列を「現在準備中です」メッセージで正しく処理することを確認
- [ ] T168 無効なリンクの処理を確認: PortfolioSectionが無効なリンクをエラーメッセージで正しく処理することを確認
- [ ] T169 長いページのナビゲーションを確認: 長いページでスムーズスクロールナビゲーションをテストし、正しく動作することを確認
- [ ] T170 画像を最適化: すべての画像が適切なwidth、height、sizes、priority属性を含むNext.js Imageコンポーネントを使用することを確認
- [ ] T171 エッジケース/パフォーマンステストを実行し成功することを確認: `pnpm test tests/ui/mens-esthe-service/ tests/unit/mens-esthe-service/utils.test.ts` を実行し、すべてのテストが成功することを確認（TDD グリーンフェーズ）

---

## Phase 12: 最終調整と横断的関心事

**目的**: 最終調整、コードクリーンアップ、検証

- [ ] T172 [P] 完全なテストスイートを実行: `pnpm test` を実行し、100%のテストカバレッジ（行、関数、分岐、ステートメント）を確認
- [ ] T173 [P] リンターを実行: `pnpm run lint` を実行し、警告やエラーがないことを確認（--max-warnings=0）
- [ ] T174 [P] TypeScriptコンパイルを確認: `pnpm run build` を実行し、型エラーがないことを確認
- [ ] T175 コードクリーンアップとリファクタリング: すべてのコンポーネントとユーティリティをコード品質についてレビューし、未使用のコードを削除
- [ ] T176 パフォーマンス最適化: パフォーマンスのボトルネック（画像読み込み、アニメーションパフォーマンスなど）をレビューして最適化（Chrome DevTools Lighthouse（Mobile）で計測し、LCP <= 3.0s を目標に調整）
- [ ] T177 アクセシビリティ監査: アクセシビリティ監査ツールを実行し、見つかった問題を修正
- [ ] T178 SEO検証: GoogleのRich Results Testで構造化データを検証し、問題があれば修正
- [ ] T179 レスポンシブデザイン検証: 実際のデバイス（モバイル、タブレット、デスクトップ）でテストし、問題があれば修正
- [ ] T180 quickstart.mdの検証を実行: quickstart.mdの手順に従い、すべての手順が正しく動作することを確認
- [ ] T181 最終統合テスト: ページ読み込みからお問い合わせフォーム送信までの完全なユーザージャーニーをテスト

---

## 依存関係と実行順序

### フェーズ依存関係

- **セットアップ（Phase 1）**: 依存関係なし - すぐに開始可能
- **基盤（Phase 2）**: セットアップ完了に依存 - すべてのユーザーストーリーをブロック
- **ユーザーストーリー（Phase 3-7）**: すべて基盤フェーズの完了に依存
  - その後、ユーザーストーリーは並列で進行可能（人員が確保されている場合）
  - または優先順位順に順次進行（US1 → US5 → US2 → US3 → US4）
- **エラーハンドリング（Phase 8）**: US1完了後に開始可能
- **SEO（Phase 9）**: US1完了後に開始可能
- **アクセシビリティ（Phase 10）**: すべてのユーザーストーリー完了後に開始可能
- **エッジケース（Phase 11）**: すべてのユーザーストーリー完了後に開始可能
- **最終調整（Phase 12）**: すべての前のフェーズの完了に依存

### ユーザーストーリー依存関係

- **User Story 1 (P1)**: 基盤（Phase 2）完了後に開始可能 - 他のストーリーへの依存なし
- **User Story 2 (P2)**: 基盤（Phase 2）完了後に開始可能 - 独立、US1と並列実行可能
- **User Story 3 (P2)**: 基盤（Phase 2）完了後に開始可能 - 独立、US1/US2と並列実行可能
- **User Story 4 (P3)**: 基盤（Phase 2）完了後に開始可能 - 独立、他のストーリーと並列実行可能
- **User Story 5 (P1)**: US1（HeroSection）とUS1（PricingSection）に依存 - US1完了後に完了すべき

### 各ユーザーストーリー内（TDDワークフロー）

1. **テストを先に書く** - すべてのテストは実装前に書かれ、失敗する必要がある
2. **型を実装** - バリデーション関数の前に型定義を作成する必要がある
3. **バリデーションを実装** - コンポーネントの前にバリデーション関数を実装する必要がある
4. **コンポーネントを実装** - テストが書かれた後にコンポーネントを実装する必要がある
5. **テストが成功することを確認** - 次のストーリーに進む前にすべてのテストが成功する必要がある
6. **統合** - すべてのテストが成功した後にコンポーネントをページに統合

### 並列実行の機会

- [P]マークされたすべてのセットアップタスクは並列実行可能
- [P]マークされたすべての基盤タスクは並列実行可能（Phase 2内）
- 基盤フェーズが完了すると、ユーザーストーリーは並列で開始可能（チームの容量が許す場合）
- [P]マークされたユーザーストーリーのすべてのテストは並列実行可能
- [P]マークされたストーリー内の型定義は並列実行可能
- 異なるユーザーストーリーは異なるチームメンバーによって並列で作業可能（US5はUS1に依存するため除く）

---

## 並列実行例: User Story 1

```bash
# User Story 1のすべての単体テストを一緒に実行:
タスク: "validateServiceInfo関数の単体テストを作成"
タスク: "validateFeature関数の単体テストを作成"
タスク: "validatePricingItem関数の単体テストを作成"

# User Story 1のすべてのUIテストを一緒に実行:
タスク: "HeroSectionコンポーネントのUIテストを作成"
タスク: "FeaturesSectionコンポーネントのUIテストを作成"
タスク: "PricingSectionコンポーネントのUIテストを作成"
タスク: "FeaturesSectionのスクロールアニメーションのUIテストを作成"

# すべての型定義を一緒に実行:
タスク: "ServiceInfo型定義を実装"
タスク: "Feature型定義を実装"
タスク: "PricingItem型定義を実装"
タスク: "SECTION_IDS定数を実装"
タスク: "SectionId型を実装"

# すべてのバリデーション関数を一緒に実行（型の後）:
タスク: "validateServiceInfo関数を実装"
タスク: "validateFeature関数を実装"
タスク: "validatePricingItem関数を実装"

# すべてのコンポーネントを一緒に実行（テストの後）:
タスク: "HeroSectionコンポーネントの構造を作成"
タスク: "FeaturesSectionコンポーネントの構造を作成"
タスク: "PricingSectionコンポーネントの構造を作成"
```

---

## 実装戦略

### MVP優先（User Story 1のみ）

1. Phase 1を完了: セットアップ
2. Phase 2を完了: 基盤（重要 - すべてのストーリーをブロック）
3. Phase 3を完了: User Story 1（TDDアプローチ）
   - まずすべてのテストを書く（レッドフェーズ）
   - 型とバリデーションを実装（グリーンフェーズ）
   - コンポーネントを実装（グリーンフェーズ）
   - すべてのテストが成功することを確認
4. **停止して検証**: User Story 1を独立してテスト
5. 準備ができたらデプロイ/デモ

### 段階的配信（TDDアプローチ）

1. セットアップ + 基盤を完了 → 基盤準備完了
2. **User Story 1 (P1)**:
   - テストを書く → テストが失敗（レッド）
   - 型を実装 → テストはまだ失敗
   - バリデーションを実装 → 単体テストが成功（グリーン）
   - コンポーネントを実装 → UIテストが成功（グリーン）
   - 独立してテスト → デプロイ
3. **User Story 5 (P1)**:
   - テストを書く → テストが失敗（レッド）
   - ユーティリティを実装 → テストが成功（グリーン）
   - コンポーネントを更新 → すべてのテストが成功（グリーン）
   - 独立してテスト → デプロイ
4. **User Story 2 (P2)**:
   - テストを書く → テストが失敗（レッド）
   - 型を実装 → テストはまだ失敗
   - バリデーションを実装 → 単体テストが成功（グリーン）
   - コンポーネントを実装 → UIテストが成功（グリーン）
   - 独立してテスト → デプロイ
5. **User Story 3 (P2)**:
   - テストを書く → テストが失敗（レッド）
   - 型を実装 → テストはまだ失敗
   - バリデーションを実装 → 単体テストが成功（グリーン）
   - コンポーネントを実装 → UIテストが成功（グリーン）
   - 独立してテスト → デプロイ
6. **User Story 4 (P3)**:
   - テストを書く → テストが失敗（レッド）
   - 型を実装 → テストはまだ失敗
   - バリデーションを実装 → 単体テストが成功（グリーン）
   - コンポーネントを実装 → UIテストが成功（グリーン）
   - 独立してテスト → デプロイ
7. 各ストーリーは前のストーリーを壊すことなく価値を追加

### 並列チーム戦略（TDDアプローチ）

複数の開発者で:

1. チームがセットアップ + 基盤を一緒に完了
2. 基盤が完了したら:
   - **開発者A**: User Story 1（TDD: テスト → 実装）
   - **開発者B**: User Story 2（TDD: テスト → 実装） - 並列で開始可能
   - **開発者C**: User Story 3（TDD: テスト → 実装） - 並列で開始可能
3. **開発者A**: User Story 5（US1完了後）
4. **開発者D**: User Story 4（TDD: テスト → 実装） - 並列で開始可能
5. ストーリーは独立して完了し統合

---

## 注意事項

- **[P]タスク** = 異なるファイル、依存関係なし - 並列実行可能
- **[Story]ラベル** = トレーサビリティのためにタスクを特定のユーザーストーリーにマッピング
- **TDDアプローチ**: すべてのテストは実装前に先に書かれ、失敗する必要がある
- 各ユーザーストーリーは独立して完了可能でテスト可能であるべき
- 実装前にテストが失敗することを確認（TDD レッドフェーズ）
- 実装後にテストが成功することを確認（TDD グリーンフェーズ）
- 各タスクまたは論理的なグループの後にコミット
- 任意のチェックポイントで停止し、ストーリーを独立して検証
- 100%テストカバレッジ要件（行、関数、分岐、ステートメント）
- 避けるべきこと: 曖昧なタスク、同じファイルの競合、独立性を壊すストーリー間の依存関係
- すべてのファイルパスは正確で、plan.mdのプロジェクト構造と一致する必要がある
