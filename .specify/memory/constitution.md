<!--
Sync Impact Report:
Version change: 1.3.0 → 1.3.1 (Table format template added for test-case.md)
Modified principles: IX. Test Case Documentation (expanded with table format template)
Added sections: Table Format Template for test-case.md
Removed sections: None
Templates requiring updates:
  ✅ Updated: .specify/templates/plan-template.md (test-case.md creation requirement maintained)
  ✅ Updated: .specify/templates/spec-template.md (Constitution alignment maintained)
  ✅ Updated: .specify/templates/tasks-template.md (Constitution-driven task types maintained)
Follow-up TODOs: None
-->

# tsutsu-site Constitution

## Core Principles

### I. TypeScript型安全性 (NON-NEGOTIABLE)

すべてのコードはTypeScriptで記述し、strict modeを有効化する。型定義は必須であり、`any`型の使用は禁止。microCMS APIレスポンス、コンポーネントprops、ユーティリティ関数のすべてに明示的な型定義を提供する。型安全性は実行時エラーを防ぎ、開発体験を向上させる。

### II. Next.js 16 + React 19 機能の活用

Next.js 16のCache Components機能を積極的に活用し、パフォーマンスを最適化する。App Routerの機能（Suspense、error.tsx、loading.tsx）を適切に使用する。React 19の新機能を活用し、最新のベストプラクティスに従う。サーバーコンポーネントとクライアントコンポーネントを適切に分離する。

### III. パフォーマンス最適化

画像はNext.js Imageコンポーネントを使用し、適切な`width`、`height`、`sizes`属性を設定する。LCP画像には`priority`属性を付与する。コード分割とSuspenseを活用して初期読み込み時間を最小化する。Cache Componentsを活用して不要な再レンダリングを防ぐ。

### IV. SEOとアクセシビリティ

すべてのページに適切なメタタグ（title、description、OGP）を設定する。構造化データ（JSON-LD）を使用して検索エンジン最適化を行う。セマンティックHTMLを使用し、ARIA属性を適切に配置する。キーボードナビゲーションをサポートし、WCAG基準を満たす。

### V. エラーハンドリングとローディング状態

すべての動的ルートに`error.tsx`と`loading.tsx`を実装する。エラー発生時は適切なエラーメッセージと再試行機能を提供する。ローディング状態ではSuspenseとスケルトンコンポーネントを使用する。APIエラーは適切にキャッチし、ユーザーフレンドリーなメッセージを表示する。

### VI. レスポンシブデザイン

モバイルファーストのアプローチを採用する。Tailwind CSSのブレークポイントを使用し、375px（モバイル）、768px（タブレット）、1920px（デスクトップ）で適切に表示されることを確認する。横スクロールが発生しないことを保証する。

### VII. コンテンツ管理の型安全性

microCMS APIとの統合において、すべてのAPIレスポンスに型定義を提供する。クエリパラメータ、エラーレスポンス、コンテンツ型を明示的に定義する。型安全性により、コンテンツ構造の変更を早期に検出できる。

### VIII. コード品質と一貫性

ESLintルールを遵守し、`--max-warnings=0`を維持する。コンポーネントは再利用可能な設計とし、適切なディレクトリ構造に配置する。命名規則は一貫性を保ち、ファイル名とコンポーネント名を明確に対応させる。

### IX. テストケース文書化 (NON-NEGOTIABLE)

`/speckit.plan`コマンド実行時、すべての機能仕様に対して`test-case.md`を作成する。テストケースには単体テスト（unit test）とUIテスト（React Testing Library）の両方を含める。各ユーザーストーリーに対して、独立してテスト可能なテストケースを定義する。テストケースは実装前に作成し、要件の明確化とテスト可能性の検証に活用する。テストケースファイルは`specs/[###-feature-name]/test-case.md`に配置する。

#### テストケースフォーマット

`test-case.md`は以下の構造に従う。箇条書き形式と表形式の両方を使用可能。表形式は複数のテストケースを一覧で管理する際に推奨。

**基本構造（箇条書き形式）**:

```markdown
# Test Cases: [Feature Name]

## User Story [N] - [Title] (Priority: P[N])

### Unit Tests

#### Test Case: [TC-XXX] [Test Name]
- **Description**: [テストの目的と検証内容]
- **Given**: [初期状態]
- **When**: [実行する操作]
- **Then**: [期待される結果]
- **Test File**: `tests/unit/[path]/[file].test.ts`
- **Coverage**: [対象の関数/モジュール]

### UI Tests (React Testing Library)

#### Test Case: [TC-XXX] [Test Name]
- **Description**: [テストの目的と検証内容]
- **Given**: [初期状態]
- **When**: [ユーザー操作]
- **Then**: [期待されるUI状態/動作]
- **Test File**: `tests/ui/[path]/[file].test.tsx`
- **Accessibility**: [アクセシビリティ要件]
- **Queries Used**: [使用するReact Testing Libraryクエリ]
```

**表形式テンプレート（推奨）**:

```markdown
# Test Cases: [Feature Name]

## User Story [N] - [Title] (Priority: P[N])

### Unit Tests

| Test ID | Test Name | Description | Given | When | Then | Test File | Coverage |
|---------|-----------|-------------|-------|------|------|-----------|----------|
| TC-XXX-001 | [テスト名] | [テストの目的と検証内容] | [初期状態] | [実行する操作] | [期待される結果] | `tests/unit/[path]/[file].test.ts` | [対象の関数/モジュール] |
| TC-XXX-002 | [テスト名] | [テストの目的と検証内容] | [初期状態] | [実行する操作] | [期待される結果] | `tests/unit/[path]/[file].test.ts` | [対象の関数/モジュール] |

### UI Tests (React Testing Library)

| Test ID | Test Name | Description | Given | When | Then | Test File | Accessibility | Queries Used |
|---------|-----------|-------------|-------|------|------|-----------|---------------|--------------|
| TC-XXX-003 | [テスト名] | [テストの目的と検証内容] | [初期状態] | [ユーザー操作] | [期待されるUI状態/動作] | `tests/ui/[path]/[file].test.tsx` | [アクセシビリティ要件] | [使用するReact Testing Libraryクエリ] |
| TC-XXX-004 | [テスト名] | [テストの目的と検証内容] | [初期状態] | [ユーザー操作] | [期待されるUI状態/動作] | `tests/ui/[path]/[file].test.tsx` | [アクセシビリティ要件] | [使用するReact Testing Libraryクエリ] |
```

**表形式の利点**:
- 複数のテストケースを一覧で管理しやすい
- テストケース間の比較が容易
- テストIDによる追跡が明確
- カバレッジ要件の確認が効率的
- レビュー時の可読性が向上

**表形式の記述ガイドライン**:
- Test IDは`TC-[UserStory]-[Sequence]`形式（例: `TC-001-001`）
- Descriptionは簡潔に、テストの目的を明確に記述
- Given/When/ThenはAAAパターンに従い、具体的に記述
- Test Fileは実際のファイルパスを正確に記述
- Coverageは対象の関数名やモジュール名を明記
- Accessibilityは使用するARIA属性やセマンティックHTMLを記述
- Queries Usedは使用するReact Testing Libraryのクエリメソッドを列挙

#### テストケース作成時の観点

**単体テストの観点**:
1. **関数の入出力**: 正常系・異常系の入力に対する出力を検証
2. **エッジケース**: 境界値、null/undefined、空配列などの特殊ケース
3. **エラーハンドリング**: エラー発生時の適切な処理を検証
4. **型安全性**: TypeScriptの型定義に基づくテストデータの使用
5. **モックの使用**: 外部依存（API、ファイルシステムなど）の適切なモック化

**UIテスト（React Testing Library）の観点**:
1. **ユーザー中心のテスト**: 実装詳細ではなく、ユーザーが実際に行う操作をテスト
2. **アクセシビリティ**: `getByRole`、`getByLabelText`など、アクセシビリティを考慮したクエリの使用
3. **非同期処理**: `findBy*`クエリを使用した非同期更新の適切な待機
4. **ユーザーイベント**: `userEvent`を使用した実際のユーザー操作のシミュレーション
5. **ARIA属性**: セマンティックHTMLとARIA属性による要素の検出
6. **エラーバウンダリ**: エラー発生時のフォールバックUIの検証
7. **ローディング状態**: Suspenseとローディング表示の適切な検証

**共通の観点**:
1. **独立性**: 各テストケースは独立して実行可能で、他のテストに依存しない
2. **明確な命名**: テスト名は「何をテストするか」が明確に分かる命名規則
3. **AAAパターン**: Arrange（準備）、Act（実行）、Assert（検証）の明確な分離
4. **テストデータ**: テストデータは明確に定義し、再利用可能な形式で管理
5. **カバレッジ**: 主要な機能パスとエッジケースの網羅的なカバレッジ（100%カバレッジ要件を参照）
6. **パフォーマンス**: テスト実行時間の最適化と、不要な重複テストの回避

#### テストカバレッジ要件 (NON-NEGOTIABLE)

すべてのテストケースは、コードカバレッジ100%を達成することを必須とする。カバレッジは、lines（行）、functions（関数）、branches（分岐）、statements（文）のすべてのメトリクスで100%を要求する。

**カバレッジ設定**:
- Jest/Vitestの`coverageThreshold`設定で、すべてのメトリクスを100%に設定
- グローバル閾値: `lines: 100, functions: 100, branches: 100, statements: 100`
- 特定パスの閾値: 重要モジュール（API、ユーティリティ、コンポーネント）は個別に100%を要求
- カバレッジレポートは`coverage/`ディレクトリに生成し、CI/CDで検証

**カバレッジ除外の基準**:
以下のファイルのみカバレッジから除外可能:
- 設定ファイル（`*.config.{js,ts}`, `next.config.js`など）
- 型定義ファイル（`*.d.ts`）
- エントリーポイント（`app/layout.tsx`など、テスト不可能な構造のみ）
- 自動生成ファイル
- 除外する場合は、`coverage.exclude`に明示的にパターンを定義し、理由を文書化

**カバレッジ検証プロセス**:
1. **実装前**: `test-case.md`でカバレッジ目標を明確化
2. **実装中**: テスト実行時にカバレッジレポートを確認
3. **実装後**: CI/CDパイプラインでカバレッジ100%を強制
4. **レビュー時**: カバレッジレポートを確認し、未カバー行がないことを検証

**カバレッジレポートの確認**:
- HTMLレポート（`coverage/index.html`）で未カバー行を視覚的に確認
- LCOVレポート（`coverage/lcov.info`）をCI/CDで解析
- カバレッジが100%未満の場合、テスト実行は失敗とする
- カバレッジ除外が必要な場合は、PRレビューで明確に理由を説明

**カバレッジツール設定例**:
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
    // 重要モジュールは個別に100%を要求
    './src/lib/utils/**/*.ts': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.config.{ts,js}',
  ],
  coverageReporters: ['text', 'html', 'lcov', 'json'],
}
```

## Technology Stack

**必須技術スタック**:
- Next.js 16.0.1以上（Cache Components対応）
- React 19.0.0以上
- TypeScript 5.2.2以上（strict mode）
- Tailwind CSS 3.3.5以上
- microCMS JS SDK 3.2.0以上

**推奨ライブラリ**:
- Framer Motion（アニメーション）
- Lucide React（アイコン）
- Shiki（コードハイライト）
- sanitize-html（HTMLサニタイズ）

**禁止事項**:
- `any`型の使用（型安全性の破壊）
- クライアントコンポーネントでの不要な`'use client'`宣言
- 画像最適化を無視した`<img>`タグの直接使用
- エラーハンドリングの欠如

## Development Workflow

**必須チェックポイント**:
1. 新機能実装前: Constitution Checkを実行し、原則違反がないことを確認
2. テストケース作成: `/speckit.plan`実行時に`test-case.md`を作成し、単体テストとUIテストのケースを定義
3. 型定義: すべての新規API、コンポーネント、ユーティリティに型定義を追加
4. エラーハンドリング: 動的ルートには`error.tsx`と`loading.tsx`を実装
5. パフォーマンス: 画像最適化、コード分割、Cache Componentsの活用を確認
6. SEO: メタタグ、構造化データ、セマンティックHTMLの実装を確認
7. レスポンシブ: モバイル、タブレット、デスクトップでの表示を確認

**コードレビュー要件**:
- Constitution原則への準拠を確認
- 型安全性の維持
- パフォーマンスへの影響評価
- アクセシビリティ要件の満足

**品質ゲート**:
- ESLintエラー・警告ゼロ
- TypeScriptコンパイルエラーゼロ
- すべての動的ルートにエラーハンドリング実装
- レスポンシブデザインの検証完了
- コードカバレッジ100%（lines、functions、branches、statementsすべて）

## Governance

このConstitutionは、プロジェクトのすべての開発活動において最優先される。原則違反は、明確な理由と代替案の検討なしには許可されない。

**修正手順**:
1. Constitution修正の提案と理由を文書化
2. 影響を受けるテンプレートファイル（plan-template.md、spec-template.md、tasks-template.md）の更新を確認
3. バージョン番号をセマンティックバージョニングに従って更新
4. Sync Impact Reportを更新

**バージョニングポリシー**:
- MAJOR: 後方互換性のない原則の削除または再定義
- MINOR: 新規原則の追加または既存原則の大幅な拡張
- PATCH: 明確化、文言修正、非意味的な改善

**コンプライアンスレビュー**:
すべてのPR/レビューはConstitution準拠を確認する必要がある。複雑性の追加は正当化が必要。開発時のガイダンスはREADME.mdおよびdocs/ディレクトリを参照。

**Version**: 1.3.1 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27
