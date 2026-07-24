# 設計図リニューアル フェーズ1: トークン + フォント + ナビ/フッター 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 「設計図(ブループリント)」デザインシステムの土台(カラートークン・フォント・共通ナビ/フッター)を導入し、サイト全体の配色と書体を新デザインに切り替える。

**Architecture:** 既存の `.home-root` CSS カスタムプロパティ(`--bg` / `--ink` / `--accent` 等)の**変数名を維持したまま値だけ**ブループリント・パレットに差し替える。これにより 4300 行の home.css を参照する未改修セクションも即座に新配色へ移行し、以降のフェーズでセクション単位に置き換えられる。`lib/home/tokens.ts` と `tailwind.config.js` に同じパレットを定義し、フォントは `app/(home)/layout.tsx` の next/font 4 種を入れ替える。

**Tech Stack:** Next.js 16 / React 19 / Tailwind CSS v3 / next/font (Google Fonts) / Vitest + React Testing Library

**Spec:** `docs/superpowers/specs/2026-07-24-design-renewal-blueprint-design.md`

## Global Constraints

- パレット(必ずこの hex 値): 製図紙 `#F7F5F0` / 製図インク `#1E2A3A` / 朱印 `#D43D2A` / 青図 `#3D6EA5` / 鉛筆 `#8A97A5`
- フォント: 見出し `Zen Kaku Gothic New` / 手描き注釈 `Zen Kurenaido` / 英字ラベル `Space Grotesk` / 本文 `Noto Sans JP`(すべて next/font/google、日本語フォントは `preload: false`)
- `any` 禁止・`React.FC` 禁止・type-only import は `import type`
- カバレッジ 100%(vitest.config.ts の閾値)を維持。全コミット前に `pnpm typecheck && pnpm lint && pnpm test` が通ること
- ナビ/フッターのセクション href は既存 id(`#services` `#works` `#about` `#notes` `#contact`)を維持する(セクション id の改名は後続フェーズ)
- microCMS・API・データ取得層には一切触れない

---

### Task 1: `lib/home/tokens.ts` をブループリント・パレットに書き換え

**Files:**
- Modify: `lib/home/tokens.ts`
- Test: `tests/unit/home/tokens.spec.ts`(全面書き換え)

**Interfaces:**
- Produces: `COLORS`(keys: `paper` / `paperGrid` / `ink` / `inkSoft` / `seal` / `blueprint` / `pencil`、値は hex 文字列)、`FONT_STACKS`(keys: `display` / `hand` / `label` / `body`)。後続タスクと後続フェーズはこの名前を参照する。

- [ ] **Step 1: 失敗するテストを書く** — `tests/unit/home/tokens.spec.ts` を以下で**全面置換**:

```typescript
import { describe, it, expect } from "vitest"
import { COLORS, FONT_STACKS } from "@/lib/home/tokens"

describe("Blueprint: lib/home/tokens — カラーパレット", () => {
  it("製図紙(ベース背景)を定義する", () => {
    expect(COLORS.paper).toBe("#F7F5F0")
  })

  it("方眼グリッド線の色を定義する", () => {
    expect(COLORS.paperGrid).toBe("rgba(30, 42, 58, 0.05)")
  })

  it("製図インク(本文・見出し)を定義する", () => {
    expect(COLORS.ink).toBe("#1E2A3A")
  })

  it("補助インク(淡色)を定義する", () => {
    expect(COLORS.inkSoft).toBe("#5A6A7D")
  })

  it("朱印(アクセント・CTA)を定義する", () => {
    expect(COLORS.seal).toBe("#D43D2A")
  })

  it("青図(リンク・図面線)を定義する", () => {
    expect(COLORS.blueprint).toBe("#3D6EA5")
  })

  it("鉛筆(注釈・補助線)を定義する", () => {
    expect(COLORS.pencil).toBe("#8A97A5")
  })
})

describe("Blueprint: lib/home/tokens — フォントスタック", () => {
  it("見出し: Zen Kaku Gothic New", () => {
    expect(FONT_STACKS.display).toContain("Zen Kaku Gothic New")
  })

  it("手描き注釈: Zen Kurenaido", () => {
    expect(FONT_STACKS.hand).toContain("Zen Kurenaido")
  })

  it("英字ラベル: Space Grotesk", () => {
    expect(FONT_STACKS.label).toContain("Space Grotesk")
  })

  it("本文: Noto Sans JP", () => {
    expect(FONT_STACKS.body).toContain("Noto Sans JP")
  })
})

describe("Blueprint: lib/home/tokens — 不変性", () => {
  it("COLORS は凍結されている", () => {
    expect(Object.isFrozen(COLORS)).toBe(true)
  })

  it("FONT_STACKS は凍結されている", () => {
    expect(Object.isFrozen(FONT_STACKS)).toBe(true)
  })
})
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `pnpm vitest run tests/unit/home/tokens.spec.ts`
Expected: FAIL(`COLORS.paper` が undefined)

- [ ] **Step 3: 実装** — `lib/home/tokens.ts` を以下で**全面置換**:

```typescript
/**
 * Blueprint design tokens for the (home) Route Group.
 *
 * Mirrors the CSS custom properties declared in `app/(home)/home.css`
 * so server / client modules can read the same values without parsing
 * stylesheets. Frozen at module load to enforce immutability.
 */

export const COLORS = Object.freeze({
  /** 製図紙 — ベース背景 */
  paper: "#F7F5F0",
  /** 方眼グリッド線(製図インクの 5% 透過) */
  paperGrid: "rgba(30, 42, 58, 0.05)",
  /** 製図インク — 本文・見出し */
  ink: "#1E2A3A",
  /** 補助インク — 説明文・キャプション */
  inkSoft: "#5A6A7D",
  /** 朱印 — アクセント・CTA */
  seal: "#D43D2A",
  /** 青図 — リンク・図面線 */
  blueprint: "#3D6EA5",
  /** 鉛筆 — 注釈・補助線 */
  pencil: "#8A97A5",
})

export type ColorToken = keyof typeof COLORS

export const FONT_STACKS = Object.freeze({
  /** 見出し — 図面の題字 */
  display: '"Zen Kaku Gothic New", "Hiragino Kaku Gothic ProN", sans-serif',
  /** 手描き注釈 */
  hand: '"Zen Kurenaido", "Hiragino Kaku Gothic ProN", sans-serif',
  /** 英字ラベル・寸法値 */
  label: '"Space Grotesk", ui-monospace, monospace',
  /** 本文 */
  body: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
})

export type FontStack = keyof typeof FONT_STACKS
```

- [ ] **Step 4: テストが通ることを確認**

Run: `pnpm vitest run tests/unit/home/tokens.spec.ts`
Expected: PASS(全13件)

- [ ] **Step 5: 旧トークン参照の洗い出しと修正**

Run: `grep -rn "COLORS\.\(bg\|bgSoft\|inkMute\|rule\|accent\|accentSoft\)\|FONT_STACKS\.\(jpDisplay\|mono\)" --include="*.ts" --include="*.tsx" lib components app tests`

ヒットした参照(あれば)を新トークン名に置換する。対応表: `bg`→`paper` / `bgSoft`→`paper` / `inkMute`→`pencil` / `rule`→`pencil` / `accent`→`seal` / `accentSoft`→`seal` / `jpDisplay`→`display` / `mono`→`label`。置換後 `pnpm typecheck` が通ること。

- [ ] **Step 6: コミット**

```bash
git add lib/home/tokens.ts tests/unit/home/tokens.spec.ts
git commit -m "feat(tokens): ブループリント・パレットとフォントスタックに刷新"
```

---

### Task 2: Tailwind design tokens 追加

**Files:**
- Modify: `tailwind.config.js`(theme.extend.colors / fontFamily)
- Test: `tests/unit/home/tailwind-tokens.spec.ts`(新規)

**Interfaces:**
- Produces: Tailwind ユーティリティ `bg-paper` `text-ink` `text-ink-soft` `bg-seal` `text-blueprint` `text-pencil` と `font-display` `font-hand` `font-label`。後続フェーズの新セクションはこれを使う。

- [ ] **Step 1: 失敗するテストを書く** — `tests/unit/home/tailwind-tokens.spec.ts` を新規作成:

```typescript
import { describe, it, expect } from "vitest"
import config from "@/tailwind.config.js"

interface ThemeExtension {
  colors: Record<string, unknown>
  fontFamily: Record<string, string[]>
}

const extend = (config as { theme: { extend: ThemeExtension } }).theme.extend

describe("Blueprint: tailwind.config.js — カラートークン", () => {
  it("paper / ink / seal / blueprint / pencil を定義する", () => {
    expect(extend.colors.paper).toBe("#F7F5F0")
    expect(extend.colors.seal).toBe("#D43D2A")
    expect(extend.colors.blueprint).toBe("#3D6EA5")
    expect(extend.colors.pencil).toBe("#8A97A5")
  })

  it("ink は DEFAULT と soft を持つ", () => {
    expect(extend.colors.ink).toEqual({ DEFAULT: "#1E2A3A", soft: "#5A6A7D" })
  })
})

describe("Blueprint: tailwind.config.js — フォントファミリー", () => {
  it("display / hand / label を定義する", () => {
    expect(extend.fontFamily.display.join(",")).toContain("--font-zen-kaku")
    expect(extend.fontFamily.hand.join(",")).toContain("--font-zen-kurenaido")
    expect(extend.fontFamily.label.join(",")).toContain("--font-space-grotesk")
  })

  it("sans は Noto Sans JP 変数を先頭に持つ(本文)", () => {
    expect(extend.fontFamily.sans[0]).toBe("var(--font-noto-sans-jp)")
  })
})
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `pnpm vitest run tests/unit/home/tailwind-tokens.spec.ts`
Expected: FAIL(`colors.paper` が undefined)

- [ ] **Step 3: 実装** — `tailwind.config.js` の `theme.extend` 内 `colors` に以下エントリを**追加**し(既存 primary/accent/gold は残す — 未改修ページが参照中。最終クリーンアップのフェーズ5で削除)、`fontFamily` を以下で**置換**:

```js
      colors: {
        // Blueprint design tokens (spec: 2026-07-24-design-renewal-blueprint)
        paper: '#F7F5F0',
        ink: { DEFAULT: '#1E2A3A', soft: '#5A6A7D' },
        seal: '#D43D2A',
        blueprint: '#3D6EA5',
        pencil: '#8A97A5',
        // …既存の primary / accent / gold はそのまま残す…
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', 'sans-serif'],
        display: ['var(--font-zen-kaku)', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
        hand: ['var(--font-zen-kurenaido)', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
        label: ['var(--font-space-grotesk)', 'ui-monospace', 'monospace'],
      },
```

注意: 既存の `fontFamily.serif`(--font-noto-serif-jp)は削除する。削除前に `grep -rn "font-serif" app components` を実行し、ヒットした箇所は `font-display` に置換すること。

- [ ] **Step 4: テストが通ることを確認**

Run: `pnpm vitest run tests/unit/home/tailwind-tokens.spec.ts`
Expected: PASS

- [ ] **Step 5: コミット**

```bash
git add tailwind.config.js tests/unit/home/tailwind-tokens.spec.ts
git commit -m "feat(tailwind): ブループリント design tokens を追加"
```

---

### Task 3: (home) レイアウトのフォントを4種入れ替え

**Files:**
- Modify: `app/(home)/layout.tsx`
- Test: `tests/ui/home-fonts.test.tsx`

**Interfaces:**
- Produces: CSS 変数 `--font-zen-kaku` / `--font-zen-kurenaido` / `--font-space-grotesk` / `--font-noto-sans-jp`(`.home-root` に付与)。Task 4 の home.css と Task 2 の Tailwind fontFamily はこの変数名を参照する。

- [ ] **Step 1: テストを新デザインに合わせて書き換え** — `tests/ui/home-fonts.test.tsx` の `vi.mock("next/font/google", ...)` ブロックと assertion を以下で置換:

```typescript
// Mock next/font/google so the font loader returns deterministic CSS variable
// class names. We assert on those class names below.
vi.mock("next/font/google", () => ({
  Zen_Kaku_Gothic_New: () => ({
    className: "__f-zen-kaku",
    variable: "__v-f-display",
  }),
  Zen_Kurenaido: () => ({
    className: "__f-zen-kurenaido",
    variable: "__v-f-hand",
  }),
  Space_Grotesk: () => ({
    className: "__f-space-grotesk",
    variable: "__v-f-label",
  }),
  Noto_Sans_JP: () => ({
    className: "__f-noto-sans-jp",
    variable: "__v-f-body",
  }),
}))
```

describe ブロック内の assertion は:

```typescript
    expect(wrapper.className).toContain("__v-f-display")
    expect(wrapper.className).toContain("__v-f-hand")
    expect(wrapper.className).toContain("__v-f-label")
    expect(wrapper.className).toContain("__v-f-body")
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `pnpm vitest run tests/ui/home-fonts.test.tsx`
Expected: FAIL(layout が古いフォントを import しているため mock が合わない)

- [ ] **Step 3: 実装** — `app/(home)/layout.tsx` の font 定義部(import 〜 `fontVariableClass`)を以下で置換。`HomeLayout` 本体は変更しない:

```typescript
import {
  Noto_Sans_JP,
  Space_Grotesk,
  Zen_Kaku_Gothic_New,
  Zen_Kurenaido,
} from "next/font/google"
import HomeNav from "@/components/home/HomeNav"
import HomeFooter from "@/components/home/HomeFooter"
import MotionProvider from "@/components/motion/MotionProvider"
import "./home.css"

// Latin-only label font: cheap to preload.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

// Japanese fonts: large subsets, never preload — let the browser swap.
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-kaku",
  display: "swap",
  preload: false,
})

const zenKurenaido = Zen_Kurenaido({
  weight: "400",
  variable: "--font-zen-kurenaido",
  display: "swap",
  preload: false,
})

const notoSansJp = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false,
})

const fontVariableClass = [
  zenKaku.variable,
  zenKurenaido.variable,
  spaceGrotesk.variable,
  notoSansJp.variable,
].join(" ")
```

- [ ] **Step 4: テストが通ることを確認**

Run: `pnpm vitest run tests/ui/home-fonts.test.tsx tests/ui/home-layout.test.tsx`
Expected: PASS(home-layout.test.tsx が旧フォント名を mock している場合は同様に4種へ更新する)

- [ ] **Step 5: コミット**

```bash
git add app/\(home\)/layout.tsx tests/ui/home-fonts.test.tsx tests/ui/home-layout.test.tsx
git commit -m "feat(fonts): ブループリント4書体(Zen Kaku/Zen Kurenaido/Space Grotesk/Noto Sans JP)に入れ替え"
```

---

### Task 4: home.css トークンブロックの差し替え + 方眼紙ベース

**Files:**
- Modify: `app/(home)/home.css`(先頭の Design tokens ブロック、行7〜70付近)
- Test: `tests/ui/home-css.test.ts`

**Interfaces:**
- Produces: `.home-root` の CSS 変数 `--bg` `--bg-soft` `--ink` `--ink-soft` `--ink-mute` `--rule` `--accent` `--accent-soft`(**名前は既存のまま値だけ刷新** — 未改修の全セクションが参照)+ 新規 `--grid-line` `--f-hand` `--f-label`。

- [ ] **Step 1: テストを書き換え** — `tests/ui/home-css.test.ts` の「CSS custom properties」describe を以下で置換:

```typescript
  describe("CSS custom properties (blueprint palette)", () => {
    it("declares --bg with the paper hex", () => {
      expect(source).toMatch(/--bg:\s*#F7F5F0/i)
    })

    it("declares --ink with the drafting-ink hex", () => {
      expect(source).toMatch(/--ink:\s*#1E2A3A/i)
    })

    it("declares --accent with the seal hex", () => {
      expect(source).toMatch(/--accent:\s*#D43D2A/i)
    })

    it("declares --blueprint and --grid-line tokens", () => {
      expect(source).toMatch(/--blueprint:\s*#3D6EA5/i)
      expect(source).toMatch(/--grid-line:/)
    })

    it("declares font-family variables for all four roles", () => {
      expect(source).toMatch(/--f-display:/)
      expect(source).toMatch(/--f-hand:/)
      expect(source).toMatch(/--f-label:/)
      expect(source).toMatch(/--f-body:/)
    })
  })
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `pnpm vitest run tests/ui/home-css.test.ts`
Expected: FAIL(旧 oklch 値のため)

- [ ] **Step 3: 実装** — home.css 先頭の `.home-root { ... }` トークン宣言ブロック(「Design tokens + base typography」ヘッダ直下)の**変数宣言部分だけ**を以下で置換(同ブロック内のその他の base ルールは維持):

```css
.home-root {
  /* Blueprint palette (spec: 2026-07-24-design-renewal-blueprint) */
  --bg: #F7F5F0;               /* 製図紙 */
  --bg-soft: #EFECE4;          /* 製図紙の影 */
  --ink: #1E2A3A;              /* 製図インク */
  --ink-soft: #5A6A7D;         /* 補助インク */
  --ink-mute: #8A97A5;         /* 鉛筆 */
  --rule: #D8D3C8;             /* 罫線(紙上のヘアライン) */
  --accent: #D43D2A;           /* 朱印 */
  --accent-soft: #F7E2DE;      /* 朱印の淡色 */
  --blueprint: #3D6EA5;        /* 青図 */
  --grid-line: rgba(30, 42, 58, 0.05); /* 方眼 */

  --f-display: var(--font-zen-kaku), "Hiragino Kaku Gothic ProN", sans-serif;
  --f-jp-display: var(--font-zen-kaku), "Hiragino Kaku Gothic ProN", sans-serif;
  --f-hand: var(--font-zen-kurenaido), "Hiragino Kaku Gothic ProN", sans-serif;
  --f-label: var(--font-space-grotesk), ui-monospace, monospace;
  --f-mono: var(--font-space-grotesk), ui-monospace, monospace;
  --f-body: var(--font-noto-sans-jp), "Hiragino Kaku Gothic ProN", sans-serif;

  /* 方眼紙ベース */
  background-color: var(--bg);
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 28px 28px;
}
```

注意1: `--f-jp-display` と `--f-mono` は旧名の**エイリアス**として残す(未改修セクションが参照中。フェーズ5で削除)。
注意2: 既存ブロック内に `background` 指定が既にある場合は上記で上書きし、重複宣言を残さないこと。

- [ ] **Step 4: テスト + 全体回帰を確認**

Run: `pnpm vitest run tests/ui/home-css.test.ts && pnpm test`
Expected: PASS(他テストが旧 oklch 値に依存して落ちる場合は、その expect 値を新 hex に更新)

- [ ] **Step 5: コミット**

```bash
git add app/\(home\)/home.css tests/ui/home-css.test.ts
git commit -m "feat(css): home.css トークンをブループリント・パレットへ差し替え、方眼紙ベース追加"
```

---

### Task 5: HomeNav を「製図紙 + 朱印ロゴ + 相談CTA」に刷新

**Files:**
- Modify: `components/home/HomeNav.tsx`
- Modify: `app/(home)/home.css`(Nav ブロック、行72〜239付近)
- Test: `tests/ui/home/HomeNav.test.tsx`

**Interfaces:**
- Consumes: Task 4 の CSS 変数
- Produces: ナビ構造 — ブランド(朱印 `堤` + `TSUTSU`)/ 項目 `Services #services` `Works #works` `About #about` `Journal #notes` / CTA `相談する #contact`。class 名は `.home-nav` `.home-nav__brand` `.home-nav__seal` `.home-nav__toggle` `.home-nav__list` `.home-nav__cta` を使用。scroll spy・モバイル開閉・非ホーム時の `/#id` 書き換えは既存挙動を維持。

- [ ] **Step 1: テストを新仕様に書き換え** — `tests/ui/home/HomeNav.test.tsx` に以下の変更を加える:

1. 「renders the brand logo image inside the anchor」の it を以下で置換:

```typescript
  it("renders the seal mark (堤) inside the brand anchor instead of an image", () => {
    render(<HomeNav />)
    const brand = screen.getByRole("link", { name: /tsutsu/i })
    expect(brand.querySelector("img")).toBeNull()
    expect(brand.textContent).toContain("堤")
    expect(brand.textContent).toContain("TSUTSU")
  })
```

2. 「renders all five section anchors」の expected 配列を以下で置換(it 名は "renders the four section anchors and the consult CTA" に変更):

```typescript
    const expected = [
      { name: /^services$/i, href: "#services" },
      { name: /^works$/i, href: "#works" },
      { name: /^about$/i, href: "#about" },
      { name: /^journal$/i, href: "#notes" },
      { name: /相談する/, href: "#contact" },
    ]
```

3. theme switching describe(Phase 10 / C-3)を以下で置換(dark 対象が Services→Contact に変わる):

```typescript
describe("Blueprint: HomeNav — theme switching", () => {
  it("starts with the light theme when no section is active", () => {
    render(<HomeNav />)
    expect(screen.getByRole("navigation")).toHaveAttribute("data-theme", "light")
  })

  it("switches to the dark theme when the Contact section becomes active", () => {
    const contact = placeSection("contact")
    render(<HomeNav />)
    fireIntersection(contact)
    expect(screen.getByRole("navigation")).toHaveAttribute("data-theme", "dark")
    contact.remove()
  })

  it("stays on the light theme when a non-dark section is active", () => {
    const services = placeSection("services")
    render(<HomeNav />)
    fireIntersection(services)
    expect(screen.getByRole("navigation")).toHaveAttribute("data-theme", "light")
    services.remove()
  })
})
```

4. scroll-spy describe 内の rootMargin テスト(「sticky-stack aware」)はコメントを「top-biased band」に変え、値の assertion(`-15% 0px -80% 0px`)はそのまま維持。
5. cross-page describe の expectations 配列を新5項目(`/#services` `/#works` `/#about` `/#notes` `/#contact`)に更新。Escape / disclosure テストの `aboutLink` 参照はそのまま動く。

- [ ] **Step 2: テストが失敗することを確認**

Run: `pnpm vitest run tests/ui/home/HomeNav.test.tsx`
Expected: FAIL(brand が img / 項目が旧5件のため)

- [ ] **Step 3: 実装** — `components/home/HomeNav.tsx` に以下の変更(scroll spy・Escape・disclosure のロジックは既存のまま):

```typescript
const NAV_ITEMS: readonly NavItem[] = [
  { id: "services", label: "Services" },
  { id: "works", label: "Works" },
  { id: "about", label: "About" },
  { id: "notes", label: "Journal" },
]

/** Sections rendered on dark surfaces; nav switches to light text over them. */
const DARK_SECTIONS: ReadonlySet<string> = new Set(["contact"])

/** All observed section ids: nav items + the contact section (theme driver). */
const OBSERVED_IDS: readonly string[] = [...NAV_ITEMS.map((i) => i.id), "contact"]
```

useEffect 冒頭の `NAV_ITEMS.map((item) => ...)` は `OBSERVED_IDS.map((id) => ({ id, el: document.getElementById(id) }))` に変更。JSX のブランドと CTA:

```tsx
      <a className="home-nav__brand" href={brandHref} aria-label="tsutsu">
        <span className="home-nav__seal" aria-hidden="true">堤</span>
        <span className="home-nav__brand-name">TSUTSU</span>
      </a>
```

`</ul>` の直後(nav 閉じタグ前)に CTA を追加:

```tsx
      <a
        className="home-nav__cta"
        href={sectionHref("contact")}
        onClick={() => setIsOpen(false)}
      >
        相談する
      </a>
```

`next/image` の import は削除する(未使用になるため lint が落ちる)。

- [ ] **Step 4: CSS 差し替え** — home.css の Nav ブロック(「Nav (fixed, theme-driven...)」ヘッダから Hero ヘッダ直前まで)を以下で置換:

```css
/* ============================================================
   Nav — 製図紙の題字ブロック(fixed, theme-driven)
   ============================================================ */
.home-root .home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: clamp(16px, 2.4vw, 32px);
  padding: 14px clamp(16px, 4vw, 40px);
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--rule);
  color: var(--ink);
  transition: background 0.3s ease, color 0.3s ease;
}

.home-root .home-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
  margin-right: auto;
}

.home-root .home-nav__seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--accent);
  color: var(--bg);
  font-family: var(--f-display);
  font-weight: 700;
  font-size: 15px;
  border-radius: 3px;
}

.home-root .home-nav__brand-name {
  font-family: var(--f-label);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.08em;
}

.home-root .home-nav__list {
  display: flex;
  align-items: center;
  gap: clamp(14px, 2vw, 26px);
  list-style: none;
  margin: 0;
  padding: 0;
}

.home-root .home-nav__list a {
  font-family: var(--f-label);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink-soft);
  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.home-root .home-nav__list a:hover,
.home-root .home-nav__list a[aria-current="true"] {
  color: var(--ink);
  border-bottom-color: var(--accent);
}

.home-root .home-nav__cta {
  font-family: var(--f-body);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-decoration: none;
  color: var(--bg);
  background: var(--ink);
  padding: 9px 20px;
  border-radius: 2px;
  transition: background 0.2s ease;
}

.home-root .home-nav__cta:hover {
  background: var(--accent);
}

.home-root .home-nav__toggle {
  display: none;
  background: none;
  border: 1px solid var(--rule);
  border-radius: 2px;
  color: inherit;
  font-size: 20px;
  line-height: 1;
  padding: 6px 10px;
  cursor: pointer;
}

/* Dark surface (Contact = 青焼き) */
.home-root .home-nav[data-theme="dark"] {
  background: color-mix(in srgb, var(--ink) 88%, transparent);
  border-bottom-color: color-mix(in srgb, var(--bg) 25%, transparent);
  color: var(--bg);
}

.home-root .home-nav[data-theme="dark"] .home-nav__list a {
  color: color-mix(in srgb, var(--bg) 70%, transparent);
}

.home-root .home-nav[data-theme="dark"] .home-nav__list a:hover,
.home-root .home-nav[data-theme="dark"] .home-nav__list a[aria-current="true"] {
  color: var(--bg);
}

.home-root .home-nav[data-theme="dark"] .home-nav__cta {
  background: var(--accent);
}

/* Mobile disclosure */
@media (max-width: 767px) {
  .home-root .home-nav {
    flex-wrap: wrap;
  }

  .home-root .home-nav__toggle {
    display: inline-flex;
    order: 3;
  }

  .home-root .home-nav__cta {
    order: 2;
    margin-left: auto;
    padding: 7px 14px;
  }

  .home-root .home-nav__brand {
    order: 1;
    margin-right: 0;
  }

  .home-root .home-nav__list {
    order: 4;
    flex-basis: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease;
  }

  .home-root .home-nav__list[data-open="true"] {
    max-height: 60vh;
    padding-top: 12px;
  }

  .home-root .home-nav__list li {
    width: 100%;
    border-top: 1px dashed var(--rule);
  }

  .home-root .home-nav__list a {
    display: block;
    padding: 12px 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-root .home-nav,
  .home-root .home-nav__list {
    transition: none;
  }
}
```

置換後、旧 Nav ブロック専用だった class(`.home-nav__lang-muted` 等)が component から参照されていないことを `grep -n "lang-muted\|home-nav__logo" components app` で確認し、残参照があれば削除する。

- [ ] **Step 5: テストが通ることを確認**

Run: `pnpm vitest run tests/ui/home/HomeNav.test.tsx && pnpm test`
Expected: PASS(page.test.tsx 等が nav 構造に依存して落ちる場合は同仕様で更新)

- [ ] **Step 6: コミット**

```bash
git add components/home/HomeNav.tsx app/\(home\)/home.css tests/ui/home/HomeNav.test.tsx
git commit -m "feat(nav): 朱印ロゴ+相談CTAのブループリント・ナビに刷新"
```

---

### Task 6: HomeFooter を「青焼きタイトルブロック」に刷新

**Files:**
- Modify: `components/home/HomeFooter.tsx`
- Modify: `app/(home)/home.css`(Footer ブロック、行3175〜3256付近)
- Test: `tests/ui/home/HomeFooter.test.tsx`

**Interfaces:**
- Consumes: Task 4 の CSS 変数、既存 `FooterYear`
- Produces: フッター構造 — 朱印ブランド / Site 列(`Services` `Works` `About` `Journal`→`#notes`)/ Contact 列(mailto + `#contact`)/ 図面タイトルブロック風メタ行。class 名は `.home-footer` `.home-footer__grid` `.home-footer__brand` `.home-footer__seal` `.home-footer__cols` `.home-footer__meta`。

- [ ] **Step 1: テストを新仕様に書き換え** — `tests/ui/home/HomeFooter.test.tsx` に以下の変更:

1. 「renders the brand logo image」の it を以下で置換:

```typescript
  it("renders the seal mark instead of a logo image", () => {
    render(<HomeFooter />)
    const footer = screen.getByRole("contentinfo")
    expect(within(footer).queryByRole("img")).toBeNull()
    expect(footer.textContent).toContain("堤")
    expect(footer.textContent).toContain("TSUTSU")
  })
```

2. Site 列の it 2件(home / 非home)の `Notes` assertion を `Journal` に変更(href は `#notes` / `/#notes` のまま)。`Services` を先頭にした4件で検証:

```typescript
    expect(
      within(footer).getByRole("link", { name: /^services$/i })
    ).toHaveAttribute("href", "#services")
    expect(
      within(footer).getByRole("link", { name: /^works$/i })
    ).toHaveAttribute("href", "#works")
    expect(
      within(footer).getByRole("link", { name: /^about$/i })
    ).toHaveAttribute("href", "#about")
    expect(
      within(footer).getByRole("link", { name: /^journal$/i })
    ).toHaveAttribute("href", "#notes")
```

3. タイトルブロック行の it を追加:

```typescript
  it("renders the drawing title-block meta row", () => {
    render(<HomeFooter />)
    const footer = screen.getByRole("contentinfo")
    expect(footer.textContent).toContain("SCALE 1:1")
    expect(footer.textContent).toContain("DRAWN & BUILT IN TOKYO")
  })
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `pnpm vitest run tests/ui/home/HomeFooter.test.tsx`
Expected: FAIL

- [ ] **Step 3: 実装** — `components/home/HomeFooter.tsx` の変更点:

1. `SITE_LINKS.links` を以下に置換:

```typescript
const SITE_LINKS: FooterColumn = {
  heading: "Site",
  links: [
    { label: "Services", target: { kind: "section", id: "services" } },
    { label: "Works", target: { kind: "section", id: "works" } },
    { label: "About", target: { kind: "section", id: "about" } },
    { label: "Journal", target: { kind: "section", id: "notes" } },
  ],
}
```

2. ブランド部の `<Image ... />` を以下に置換し、`next/image` import を削除:

```tsx
        <div className="home-footer__brand">
          <span className="home-footer__seal" aria-hidden="true">堤</span>
          <span className="home-footer__brand-name">TSUTSU</span>
          <div className="home-footer__tag">Freelance engineer — Tokyo</div>
        </div>
```

3. メタ行の2つ目の span を以下に置換:

```tsx
          <span>SCALE 1:1 — DRAWN &amp; BUILT IN TOKYO / JP</span>
```

- [ ] **Step 4: CSS 差し替え** — home.css の Footer ブロック(`.home-root .home-footer` から次のセクションヘッダ直前まで)を以下で置換:

```css
/* ============================================================
   Footer — 青焼きタイトルブロック
   ============================================================ */
.home-root .home-footer {
  background: var(--ink);
  background-image:
    linear-gradient(rgba(247, 245, 240, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(247, 245, 240, 0.05) 1px, transparent 1px);
  background-size: 28px 28px;
  color: var(--bg);
  padding: clamp(48px, 8vh, 80px) clamp(16px, 4vw, 40px) 28px;
}

.home-root .home-footer__grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  border: 1px solid color-mix(in srgb, var(--bg) 30%, transparent);
  padding: clamp(24px, 4vw, 40px);
}

.home-root .home-footer__brand {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  align-self: start;
}

.home-root .home-footer__seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--accent);
  color: var(--bg);
  font-family: var(--f-display);
  font-weight: 700;
  font-size: 19px;
  border-radius: 3px;
}

.home-root .home-footer__brand-name {
  font-family: var(--f-label);
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 0.1em;
}

.home-root .home-footer__tag {
  flex-basis: 100%;
  font-family: var(--f-label);
  font-size: 11px;
  letter-spacing: 0.18em;
  color: color-mix(in srgb, var(--bg) 55%, transparent);
}

.home-root .home-footer__cols {
  display: flex;
  gap: clamp(32px, 6vw, 72px);
}

.home-root .home-footer__cols h3 {
  font-family: var(--f-label);
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--bg) 55%, transparent);
  margin: 0 0 14px;
}

.home-root .home-footer__cols ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.home-root .home-footer__cols a {
  color: var(--bg);
  text-decoration: none;
  font-size: 13px;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.home-root .home-footer__cols a:hover {
  border-bottom-color: var(--accent);
}

.home-root .home-footer__meta {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  border-top: 1px dashed color-mix(in srgb, var(--bg) 30%, transparent);
  padding-top: 16px;
  font-family: var(--f-label);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: color-mix(in srgb, var(--bg) 55%, transparent);
}

@media (max-width: 767px) {
  .home-root .home-footer__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
```

- [ ] **Step 5: テストが通ることを確認**

Run: `pnpm vitest run tests/ui/home/HomeFooter.test.tsx && pnpm test`
Expected: PASS

- [ ] **Step 6: コミット**

```bash
git add components/home/HomeFooter.tsx app/\(home\)/home.css tests/ui/home/HomeFooter.test.tsx
git commit -m "feat(footer): 青焼きタイトルブロックのブループリント・フッターに刷新"
```

---

### Task 7: 全体検証と目視確認

**Files:**
- なし(検証のみ。回帰修正が出た場合は該当ファイル)

- [ ] **Step 1: 4点セットを実行**

Run: `pnpm typecheck && pnpm lint && pnpm test && pnpm build`
Expected: すべて成功、カバレッジ 100%。失敗した場合は失敗ごとに原因を修正し(実装を直す。テストを弱めない)、修正コミットを作る

- [ ] **Step 2: 開発サーバで目視確認**

Run: `pnpm dev` を起動し、`/`・`/blog`・`/works` を確認
Expected: 全ページで方眼紙背景・新ナビ(朱印 + 相談CTA)・青焼きフッターが表示される。未改修セクションも新パレットで崩れなく表示される(多少の色調不整合は許容 — 後続フェーズで置換)

- [ ] **Step 3: コミット(修正があれば)**

```bash
git add -A
git commit -m "fix(phase1): 回帰修正"
```

---

## フェーズ全体の残り(別計画書)

- フェーズ2: Hero(シグネチャ演出)
- フェーズ3: ホーム各セクション(お困りごと/Services/Works/Process/About/Journal/Contact)
- フェーズ4: 下層ページ(一覧・詳細・Works)
- フェーズ5: 旧デザイン資産クリーンアップ(primary/accent/gold トークン・旧フォント変数エイリアス・不要CSS削除)
