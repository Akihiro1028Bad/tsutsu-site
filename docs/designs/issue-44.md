# Issue #44 設計書: トップページ セクション間オーバーラップデザイン拡張

## 概要

現在ヒーローセクション→Worksセクションの境界のみに実装されている「重なるデザイン (Sticky Stack)」を、
トップページのすべてのセクション境界に拡張する。

**方針**: ユーザーの要望「言葉だけではわからないのでプロトタイプを複数提示して詰めたい」に従い、
3種のデザインバリアント (Prototype A / B / C) を `app/(home)/design/d/` に実装して比較できるようにする。
プロトタイプ確認後に本番セクションへ統合する。

---

## 現在の実装分析

### ページ構造

`app/(home)/page.tsx` の `<main data-sticky-stack="on">` 配下に以下のセクションが並ぶ。

```
<header id="top">   HeroSection
<section id="works">   WorksSection
<section id="services" data-theme="dark">   ServicesSection
<section id="about">   AboutSection
<section id="notes">   JournalSection
<section id="contact">  ContactSection
```

### 現在の Sticky Stack エフェクト一覧

| エフェクト | 説明 | 現在の適用箇所 |
|---|---|---|
| ① ガラスバンド (glass band) | `::before` 擬似要素 + `backdrop-filter: blur` で上端に霞む帯 | Hero→Works のみ (`section#works::before`) |
| ② エッジアクセント | `scaleX(0→1)` でアニメーションするアクセントライン (1px) | Works 上端のみ (`WorksEdgeAccent`) |
| ③ Hero 後退アニメーション | スクロールに連動した `scale / opacity / blur` で Hero が遠ざかる | HeroSection のみ (`HeroSection.tsx`) |
| ④ 3D チルト (Works) | `rotateX(1.2deg→0)` で Works コンテンツが着地する演出 | WorksSection のみ (`WorksTilt.tsx`) |
| ⑤ z-index 昇順スタック | 各セクションが前セクションの上に重なる | **全セクション適用済み** (CSS L.3402–3405) |
| ⑥ ヘアラインシャドウ | `box-shadow: 0 -1px 0 ...` のセクション境界線 | **全セクション適用済み** (CSS L.3327–3329) |

### 技術制約

| 制約 | 詳細 |
|---|---|
| sticky all-sections 不可 | `position: sticky` を全セクションに適用すると 100vh を超えるコンテンツが非表示になる (CSS L.3307 コメント参照)。Hero は 100vh 固定なので例外。 |
| ServicesSection は暗背景 | `data-theme="dark"` でページ内唯一の黒背景セクション。後続の About に glass band を追加すると暗→明の境界ブラーになるため、色の調整が必要。 |
| `pointer: fine` ゲート | `backdrop-filter` はモバイル GPU 負荷が高いため、デスクトップ (`pointer: fine`) のみに限定する。 |
| `prefers-reduced-motion` | モーション削減ユーザーには全アニメーション無効・静的レイアウトへの fallback が必須。 |

---

## デザインプロトタイプ案

### Prototype A: ガラスバンド全境界拡張（CSS のみ）

**対象境界**: Works→Services、Services→About、About→Journal、Journal→Contact

各セクションの `::before` 擬似要素にガラスバンドを追加する。既存の `section#works::before` と同一パターン。
DOM 追加なし・純 CSS のみで完結するため、最もリスクが低い。

**見た目**: 各セクション上端に霞んだ半透明のスリガラス帯が表示され、その下に前セクションがぼんやり透けて見える。

| 境界 | 背景色遷移 | ガラスバンド背景ベース |
|---|---|---|
| Works → Services | light → dark | `var(--ink)` ベース (暗) |
| Services → About | dark → light | `var(--bg)` ベース (明) |
| About → Journal | light → light | `var(--bg)` ベース (明) |
| Journal → Contact | light → light | `var(--bg)` ベース (明) |

```css
/* 例: Services → About 境界（暗→明） */
@media (pointer: fine) {
  .home-root main[data-sticky-stack="on"] > section#about::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 140px;
    pointer-events: none;
    z-index: 2;
    backdrop-filter: blur(16px) saturate(120%);
    background: linear-gradient(
      to bottom,
      color-mix(in oklch, var(--bg) 22%, transparent) 0%,
      color-mix(in oklch, var(--bg) 14%, transparent) 55%,
      transparent 100%
    );
    mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 100%);
  }
}
```

**特記**: `section#services::before` (Works→Services) は背景が暗いため、ガラスバンドの不透明度を低く抑え、
暗背景に干渉しないよう調整する。

---

### Prototype B: エッジアクセント全境界拡張

**対象境界**: Works→Services、Services→About、About→Journal、Journal→Contact

`WorksEdgeAccent` を **`SectionEdgeAccent`** として汎用化し、各セクションの上端に配置する。
`sectionId` prop でセクションごとに異なるスタイルを CSS 側で制御できるようにする。

**見た目**: 各セクションが画面に入った瞬間、上端にアクセントカラーのヘアラインが `scaleX(0→1)` でスライン・インする。
セクション間の「境界を跨ぐ」感覚を視覚的に強調する。

```tsx
// SectionEdgeAccent.tsx (汎用化)
interface SectionEdgeAccentProps {
  readonly className?: string
}
// 既存の works__edge-accent CSS を section__edge-accent に汎用化
// 各セクションに <SectionEdgeAccent /> を追加する
```

CSS 側では各セクション（services, about, notes, contact）にそれぞれ `section__edge-accent` クラスのスタイルを定義する。

---

### Prototype C: スクロール連動セクション後退アニメーション

**対象**: Works、Services、About（コンテンツ量が比較的少ないセクション優先）

**アイデア**: HeroSection の後退アニメーション（`scale / opacity / blur`）と同じパターンを各セクションに適用する。
セクションを `sticky` にはできないが、`useScroll({ offset: ["start start", "end start"] })` で
「セクション上端が画面上端に到達してから、下端が画面上端を通過するまで」を追跡し、
この間にセクションが後退していく演出ができる。

```tsx
// SectionDepthWrapper.tsx
// HeroSection の scale/opacity/blur ロジックを抽出・汎用化したコンポーネント
interface SectionDepthWrapperProps {
  readonly children: React.ReactNode
  readonly scaleRange?: [number, number]     // default: [1, 0.95]
  readonly opacityRange?: [number, number]   // default: [1, 0.5]
  readonly blurRange?: [number, number]      // default: [0, 4]
}
```

**注意点**:
- `position: sticky` なしのため、セクション自体は通常フローで流れる。
  後退アニメーションは「コンテンツがスクロールアウトしていく際に縮小・フェード・ぼかす」演出になる。
- Journal / Contact のような長いセクションは `end start` が遅くなるため、
  ユーザーがコンテンツを読み終える前にアニメーションが始まる。適用は短いセクション推奨。

---

### 推奨組み合わせ（プロトタイプ確認後に選択）

プロトタイプ確認前の初期推奨案:

| セクション境界 | Prototype A (ガラスバンド) | Prototype B (エッジアクセント) | Prototype C (後退アニメ) |
|---|:---:|:---:|:---:|
| Hero → Works | ✅ 実装済み | ✅ 実装済み | ✅ 実装済み |
| Works → Services | ✅ | ✅ | — |
| Services → About | ✅ (暗→明調整) | ✅ | — |
| About → Journal | ✅ | ✅ | — |
| Journal → Contact | ✅ | ✅ | — |

---

## アーキテクチャ設計

### 新規コンポーネント

```
components/home/
  SectionEdgeAccent.tsx   ← WorksEdgeAccent を汎用化した置き換え
  SectionDepthWrapper.tsx ← HeroSection の inline アニメーションを汎用抽出
```

### CSS 変更箇所

`app/(home)/home.css` の Sticky Stack ブロック（L.3300〜L.3470）に追記:

1. `section#services::before` — Works→Services ガラスバンド（暗背景向け色調整）
2. `section#about::before` — Services→About ガラスバンド
3. `section#notes::before` — About→Journal ガラスバンド
4. `section#contact::before` — Journal→Contact ガラスバンド
5. `.section__edge-accent` CSS — 汎用エッジアクセントスタイル
6. `prefers-reduced-motion` fallback に上記 `::before` 非表示を追記

### プロトタイプ比較ページ

`app/(home)/design/d/` に比較ページを作成し、URL クエリパラメータまたはタブ UI で A/B/C を切り替え確認できるようにする:

```
/design/d?variant=a  → ガラスバンドのみ
/design/d?variant=b  → エッジアクセントのみ
/design/d?variant=c  → 後退アニメーションのみ
/design/d?variant=ab → A + B 組み合わせ
```

`<main data-sticky-stack="on" data-prototype-variant={variant}>` のようにデータ属性で切り替え、
CSS セレクターで各バリアントのスタイルを制御する。

### セクションコンポーネントへの統合

プロトタイプ確認後、各セクションコンポーネントに以下を追加:

```tsx
// 例: AboutSection.tsx
export default function AboutSection() {
  return (
    <section id="about" className="about">
      <SectionEdgeAccent />   {/* 追加 */}
      ...
    </section>
  )
}
```

`ServicesSection.tsx` のみ `data-theme="dark"` への考慮が必要（`SectionEdgeAccent` のアクセントカラーを反転）。

---

## テスト戦略

### 新規テスト対象

| テスト対象 | ファイル | テスト内容 |
|---|---|---|
| `SectionEdgeAccent` | `tests/ui/home/SectionEdgeAccent.test.tsx` | デスクトップでレンダリング、タッチ/減少モーションで null |
| `SectionDepthWrapper` | `tests/ui/home/SectionDepthWrapper.test.tsx` | children の描画、アニメーション prop、motion gate |
| home.css (新ルール) | `tests/ui/home-css.test.ts` | 各 section の `::before` セレクターが CSS に存在するか文字列マッチ |

### 既存テスト更新対象

| ファイル | 変更内容 |
|---|---|
| `tests/ui/home/ServicesSection.test.tsx` | `SectionEdgeAccent` の有無テスト追加 |
| `tests/ui/home/AboutSection.test.tsx` | 同上 |
| `tests/ui/home/JournalSection.test.tsx` | 同上 |
| `tests/ui/home/ContactSection.test.tsx` | 同上 |
| `tests/ui/home/WorksEdgeAccent.test.tsx` | `SectionEdgeAccent` に置き換わる場合は更新 |

### カバレッジ目標

プロジェクト規約に従い **ステートメント / ブランチ / ファンクション / ライン すべて 100%** を維持する。
新規コンポーネント (`SectionEdgeAccent`, `SectionDepthWrapper`) については以下のブランチを必ずカバーする:

- `isDesktop && !reduced` が true の場合 → コンポーネントをレンダリング
- `!isDesktop` の場合 → `null` を返す
- `reduced === true` の場合 → `null` を返す

### テストパターン（既存の WorksEdgeAccent.test.tsx を踏襲）

```ts
// SectionEdgeAccent.test.tsx 骨格
describe("SectionEdgeAccent", () => {
  it("renders decorative accent on desktop with motion allowed")
  it("renders nothing on touch devices")
  it("renders nothing under prefers-reduced-motion")
})
```

---

## セキュリティ考慮事項

本 Issue は純粋な UI/CSS 変更であり、外部入力処理・認証・API 通信は含まない。
ただし以下の点に留意する:

- **外部入力なし**: プロトタイプページの `variant` クエリパラメータは CSS クラス切り替えのみに使用し、
  HTML の innerHTML 等に直接埋め込まない（XSS 対策）。
- **秘密情報なし**: CSS・コンポーネント実装に環境変数・API キーは不要。
- **エラー露出なし**: 新規コンポーネントにはエラーバウンダリは不要（純粋な装飾 UI）。

---

## サブタスク

### subtask-1: CSS 全境界ガラスバンド拡張 (Prototype A)
- files: [`app/(home)/home.css`, `tests/ui/home-css.test.ts`]
- depends_on: []
- description: >
    `home.css` の Sticky Stack ブロックに `section#services::before`、`section#about::before`、
    `section#notes::before`、`section#contact::before` のガラスバンドスタイルを追加する。
    Works→Services 境界は暗背景のため `var(--ink)` ベースの色を使用。
    `prefers-reduced-motion` fallback にも `::before { display: none }` を追記する。
    `home-css.test.ts` に各セレクターの存在確認テストを追加する。

### subtask-2: SectionEdgeAccent 汎用コンポーネント (Prototype B)
- files: [`components/home/SectionEdgeAccent.tsx`, `tests/ui/home/SectionEdgeAccent.test.tsx`]
- depends_on: []
- description: >
    `WorksEdgeAccent` のロジックを `SectionEdgeAccent` として汎用化する。
    `className?: string` prop でセクションごとの CSS クラスを受け取れるようにし、
    既存の `works__edge-accent` CSS クラスを拡張して `section__edge-accent` 汎用クラスを定義する。
    `SectionEdgeAccent.test.tsx` では desktop/touch/reduced-motion の 3 ブランチを全カバーする。

### subtask-3: SectionDepthWrapper スクロール後退アニメーション (Prototype C)
- files: [`components/home/SectionDepthWrapper.tsx`, `tests/ui/home/SectionDepthWrapper.test.tsx`]
- depends_on: []
- description: >
    `HeroSection.tsx` のインライン `useScroll + useTransform` ロジックを
    `SectionDepthWrapper` コンポーネントとして抽出・汎用化する。
    `scaleRange / opacityRange / blurRange` をオプション prop として受け取りデフォルト値を設定する。
    Desktop + motion-allowed 以外では children をそのままレンダリングする（アニメーションなし）。
    テストでは children の描画確認・gate 動作確認を行う。

### subtask-4: プロトタイプ比較ページ (design/d)
- files: [`app/(home)/design/d/page.tsx`, `app/(home)/design/d/layout.tsx`]
- depends_on: [1, 2, 3]
- description: >
    `app/(home)/design/d/` に Prototype A/B/C/AB の切り替えが可能な比較ページを作成する。
    URL クエリパラメータ `?variant=a|b|c|ab` で切り替え、
    `<main data-sticky-stack="on" data-prototype-variant={variant}>` のデータ属性経由でスタイルを制御する。
    レイアウトは既存の `app/(home)/design/layout.tsx` を流用または最小 layout を追加する。

### subtask-5: 本番セクションへの統合
- files: [`components/home/ServicesSection.tsx`, `components/home/AboutSection.tsx`, `components/home/JournalSection.tsx`, `components/home/ContactSection.tsx`]
- depends_on: [1, 2, 3]
- description: >
    プロトタイプ確認で選定されたデザインを各セクションコンポーネントに統合する。
    `ServicesSection`・`AboutSection`・`JournalSection`・`ContactSection` の各セクション先頭に
    `<SectionEdgeAccent />` を追加する。
    `ServicesSection` は `data-theme="dark"` のため、エッジアクセントのアクセントカラーを
    明色に切り替えるための prop または CSS カスタムプロパティを追加する。

### subtask-6: 既存テスト更新
- files: [`tests/ui/home/ServicesSection.test.tsx`, `tests/ui/home/AboutSection.test.tsx`, `tests/ui/home/JournalSection.test.tsx`, `tests/ui/home/ContactSection.test.tsx`]
- depends_on: [5]
- description: >
    subtask-5 で各セクションコンポーネントに追加された `SectionEdgeAccent` の
    レンダリング有無テストを追加する。
    また、`SectionDepthWrapper` を採用した場合はラッパー div の存在確認テストを追加する。
    既存テストが壊れていないことを確認し、100% カバレッジを維持する。
