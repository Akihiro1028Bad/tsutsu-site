# モバイル Hero リバランス Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** モバイル (≤640px) ヒーローのデッドスペース 323px を 80px に圧縮し、stagger reveal + scroll hint で「呼吸する間」に転化する。デスクトップ表示は不変。

**Architecture:** `HeroSection.tsx` の `<h1>` を 3 行 `<span>` に分割し、`<aside>` で scroll hint を追加。`home.css` の Hero ブロックに `@media (max-width: 640px)` を追加し、stagger 用 `animation-delay` を span 別に設定。`prefers-reduced-motion` 既存ブロックを拡張。

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, vitest + @testing-library/react, Chrome DevTools MCP（モバイル emulation）

**Spec:** [docs/superpowers/specs/2026-04-21-mobile-hero-rebalance-design.md](../specs/2026-04-21-mobile-hero-rebalance-design.md)

---

## File Structure

| File | 役割 | 変更種別 |
|---|---|---|
| `components/home/HeroSection.tsx` | h1 を 3 span 化、scroll hint 要素追加 | Modify |
| `tests/ui/home/HeroSection.test.tsx` | 新 DOM 構造の assertion 追加 | Modify |
| `app/(home)/home.css` | mobile media query, stagger delay, scroll hint, reduced-motion 拡張 | Modify (L246-385 周辺) |

---

## Task 1: HeroSection.tsx の title 3-span 化（テスト先行）

**Files:**
- Modify: `tests/ui/home/HeroSection.test.tsx`
- Modify: `components/home/HeroSection.tsx`

- [ ] **Step 1.1: 失敗テストを追加**

`tests/ui/home/HeroSection.test.tsx` の最後の `it(...)` の後に挿入:

```tsx
  it("splits the title into three spans for stagger animation", () => {
    render(<HeroSection />)
    const heading = screen.getByRole("heading", { level: 1 })
    const lines = heading.querySelectorAll(".hero__main-line")
    expect(lines).toHaveLength(3)
    expect(lines[0].textContent).toMatch(/想いを/)
    expect(lines[1].textContent).toMatch(/技術で/)
    expect(lines[2].textContent).toMatch(/カタチに/)
  })
```

- [ ] **Step 1.2: テストが落ちることを確認**

```bash
cd /Users/tsutsumi.akihiro/dev/private/tsutsu-site
npx vitest run tests/ui/home/HeroSection.test.tsx
```

Expected: 上記 it だけ FAIL（`toHaveLength(3)` に対し 0 が返る）。他は PASS。

- [ ] **Step 1.3: HeroSection.tsx を編集して span 3 行化**

`components/home/HeroSection.tsx` の `<h1>...</h1>` 全体（L9-13）を以下に置換:

```tsx
          <h1 className="hero__main">
            <span className="hero__main-line">想いを</span>
            <span className="hero__main-line">
              <em className="hero__em">技術</em>で
            </span>
            <span className="hero__main-line">カタチに。</span>
          </h1>
```

注意: 既存の `<br />` は削除し、行分割は span のブロック化（CSS で後ほど `display: block`）に委ねる。

- [ ] **Step 1.4: テストが通ることを確認**

```bash
npx vitest run tests/ui/home/HeroSection.test.tsx
```

Expected: 全テスト PASS（既存 5 件 + 新規 1 件 = 6 件）。`em` の存在テストも PASS することを確認。

- [ ] **Step 1.5: コミット**

```bash
git add tests/ui/home/HeroSection.test.tsx components/home/HeroSection.tsx
git commit -m "refactor(hero): split title into three spans for stagger reveal"
```

---

## Task 2: scroll hint 要素を HeroSection.tsx に追加

**Files:**
- Modify: `tests/ui/home/HeroSection.test.tsx`
- Modify: `components/home/HeroSection.tsx`

- [ ] **Step 2.1: 失敗テストを追加**

`tests/ui/home/HeroSection.test.tsx` の Task 1 で追加した it の後に挿入:

```tsx
  it("renders a mobile-only scroll hint marked aria-hidden", () => {
    render(<HeroSection />)
    const banner = screen.getByRole("banner")
    const hint = banner.querySelector(".hero__scroll-hint")
    expect(hint).not.toBeNull()
    expect(hint).toHaveAttribute("aria-hidden", "true")
    expect(hint?.textContent).toMatch(/SCROLL/)
  })
```

- [ ] **Step 2.2: テストが落ちることを確認**

```bash
npx vitest run tests/ui/home/HeroSection.test.tsx
```

Expected: 新 it が FAIL（`expect(null).not.toBeNull()`）。

- [ ] **Step 2.3: HeroSection.tsx に hint 要素を追加**

`components/home/HeroSection.tsx` を編集。`</div>` （`hero__sub-row` の閉じ）の後、かつ `</header>` の前に以下を挿入:

```tsx
        <div className="hero__scroll-hint" aria-hidden="true">
          <span className="hero__scroll-hint__line" />
          <span className="hero__scroll-hint__label">SCROLL</span>
        </div>
```

最終的な HeroSection.tsx の return は以下の形:

```tsx
  return (
    <header id="top" className="hero hero--wrap">
      <div className="hero__grid">
        <div className="hero__title-block">
          <h1 className="hero__main">
            <span className="hero__main-line">想いを</span>
            <span className="hero__main-line">
              <em className="hero__em">技術</em>で
            </span>
            <span className="hero__main-line">カタチに。</span>
          </h1>
        </div>
        <div className="hero__sub-row">
          <p className="hero__sub">
            <span className="hero__services-inline">
              WEBサイト制作 ／ アプリ開発 ／ AIソリューション ／
              学習・開発支援
            </span>
            一人ひとりの
            <span className="hero__mark">アイデアに寄り添い</span>、
            <br />
            最新技術でその実現をサポートします。
          </p>
        </div>
      </div>
      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-hint__line" />
        <span className="hero__scroll-hint__label">SCROLL</span>
      </div>
    </header>
  )
```

- [ ] **Step 2.4: テストが通ることを確認**

```bash
npx vitest run tests/ui/home/HeroSection.test.tsx
```

Expected: 全 7 件 PASS。

- [ ] **Step 2.5: コミット**

```bash
git add tests/ui/home/HeroSection.test.tsx components/home/HeroSection.tsx
git commit -m "feat(hero): add mobile-only scroll hint element"
```

---

## Task 3: モバイル用 layout 数値を home.css に追加

CSS-only 変更のため visual verification 中心。Chrome DevTools MCP でモバイル emulation して確認する。

**Files:**
- Modify: `app/(home)/home.css`（L373-380 の既存 `@media (max-width: 900px)` ブロックの直後に挿入）

- [ ] **Step 3.1: dev server が起動済みか確認**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
```

Expected: `200`。落ちていれば `npm run dev` を別 shell で起動。

- [ ] **Step 3.2: 変更前のスクリーンショットを取得（before）**

Chrome DevTools MCP を使って:
- viewport を `375x812x3,mobile,touch` に emulate
- `http://localhost:3000/` に navigate
- `/tmp/hero-before-375.png` に保存
- viewport を `360x640x3,mobile,touch` に変えて `/tmp/hero-before-360.png` に保存
- viewport を `414x896x3,mobile,touch` に変えて `/tmp/hero-before-414.png` に保存

- [ ] **Step 3.3: home.css にモバイル media query を追加**

`app/(home)/home.css` の **L380** （既存 `@media (max-width: 900px) { ... }` ブロックの閉じ括弧の直後、`/* hero -> first section seam */` のコメントの直前）に以下を挿入:

```css
@media (max-width: 640px) {
  .home-root .hero {
    padding-top: 88px;
    padding-bottom: 56px;
  }
  .home-root .hero__grid {
    flex-grow: 0;
    align-items: start;
  }
  .home-root .hero__title-block {
    align-self: start;
  }
  .home-root .hero__main {
    font-size: clamp(56px, 14vw, 72px);
    line-height: 1.05;
  }
  .home-root .hero__sub-row {
    margin-top: 40px;
  }
  .home-root .hero__services-inline {
    font-size: 12px;
    letter-spacing: 0.14em;
    padding-bottom: 16px;
  }
  .home-root .hero__sub {
    line-height: 1.7;
  }
}
```

- [ ] **Step 3.4: 変更後のスクリーンショットを取得（after）**

ブラウザを reload してから:
- `375x812` で `/tmp/hero-after-375.png`
- `360x640` で `/tmp/hero-after-360.png`
- `414x896` で `/tmp/hero-after-414.png`

- [ ] **Step 3.5: 計測値で成功基準を確認**

Chrome DevTools MCP で `evaluate_script` を実行:

```js
() => {
  const main = document.querySelector('.hero__main');
  const subRow = document.querySelector('.hero__sub-row');
  const mainBottom = main.getBoundingClientRect().bottom;
  const subTop = subRow.getBoundingClientRect().top;
  return { gap: Math.round(subTop - mainBottom), viewport: innerWidth };
}
```

Expected: `gap` が 60–100px の範囲（375 viewport で 60-100 内、360/414 でも妥当値）。

- [ ] **Step 3.6: 既存テストが壊れていないか確認**

```bash
npx vitest run
```

Expected: 全テスト PASS。

- [ ] **Step 3.7: コミット**

```bash
git add app/\(home\)/home.css
git commit -m "feat(hero): add mobile layout media query (≤640px)"
```

---

## Task 4: title 3-span に stagger animation-delay を設定

**Files:**
- Modify: `app/(home)/home.css`

- [ ] **Step 4.1: 既存の hero__main animation を span に移すための準備**

現状 `.home-root .hero__main` (L271-280) に `animation: tsutsu-hero-rise 900ms ... 80ms backwards` が設定されている。これを span 単位に移動する。

`app/(home)/home.css` L271-280 の `.home-root .hero__main` ブロックから `animation` 行を削除:

```css
.home-root .hero__main {
  font-family: var(--f-jp-display);
  font-style: normal;
  font-weight: 500;
  font-size: clamp(56px, 12vw, 200px);
  line-height: 0.98;
  letter-spacing: -0.02em;
  margin: 0;
  /* animation 行を削除 */
}
```

- [ ] **Step 4.2: span を block 化 + stagger animation を設定**

`app/(home)/home.css` の `.home-root .hero__main {...}` ブロックの直後（L281 の `.home-root .hero__em` の直前）に以下を挿入:

```css
.home-root .hero__main-line {
  display: block;
  animation: tsutsu-hero-rise 700ms cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
}
.home-root .hero__main-line:nth-child(1) { animation-delay: 80ms; }
.home-root .hero__main-line:nth-child(2) { animation-delay: 240ms; }
.home-root .hero__main-line:nth-child(3) { animation-delay: 400ms; }
```

- [ ] **Step 4.3: sub の animation-delay を後ろ倒し（既存 320ms → 560ms）**

`app/(home)/home.css` L306-316 の `.home-root .hero__sub` の `animation` 行を変更:

```css
  animation: tsutsu-hero-rise 900ms cubic-bezier(0.2, 0.7, 0.2, 1) 560ms backwards;
```

- [ ] **Step 4.4: prefers-reduced-motion ブロックを拡張**

`app/(home)/home.css` L331-336 の既存ブロックを以下に置換:

```css
@media (prefers-reduced-motion: reduce) {
  .home-root .hero__main,
  .home-root .hero__main-line,
  .home-root .hero__sub {
    animation: none;
  }
}
```

- [ ] **Step 4.5: 視覚確認**

Chrome DevTools MCP で reload し、375 viewport でページを開き直して stagger reveal が見えるか確認。

具体: `evaluate_script` で `performance.now()` を測りつつ、3 spans が時間差で fade-in するか目視確認（スクショは 1 枚で OK）。

- [ ] **Step 4.6: テスト実行**

```bash
npx vitest run
```

Expected: 全 PASS。

- [ ] **Step 4.7: コミット**

```bash
git add app/\(home\)/home.css
git commit -m "feat(hero): add stagger reveal animation for title lines"
```

---

## Task 5: scroll hint の CSS を追加

**Files:**
- Modify: `app/(home)/home.css`

- [ ] **Step 5.1: scroll hint base styles + 呼吸 keyframe を追加**

`app/(home)/home.css` の Task 3 で追加した `@media (max-width: 640px) { ... }` ブロックの **閉じ括弧の前** に以下を追加:

```css
  .home-root .hero__scroll-hint {
    position: absolute;
    right: var(--pad-x);
    bottom: clamp(20px, 4vh, 36px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    pointer-events: none;
    animation: tsutsu-hero-rise 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 800ms backwards;
  }
  .home-root .hero__scroll-hint__line {
    display: block;
    width: 1px;
    height: 20px;
    background: var(--ink-mute);
    opacity: 0.55;
  }
  .home-root .hero__scroll-hint__label {
    font-family: var(--f-mono);
    font-size: 10px;
    letter-spacing: 0.24em;
    color: var(--ink-mute);
    opacity: 0.55;
  }
  .home-root .hero__scroll-hint {
    animation: tsutsu-hero-rise 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 800ms backwards,
               tsutsu-scroll-breathe 2400ms ease-in-out 1400ms infinite;
  }
```

- [ ] **Step 5.2: 呼吸 keyframe を home.css の最下部か既存 keyframes 近傍に追加**

`app/(home)/home.css` の `@keyframes tsutsu-hero-rise { ... }` （L321-330 周辺）の直後に追加:

```css
@keyframes tsutsu-scroll-breathe {
  0%, 100% { opacity: 0.45; }
  50%      { opacity: 0.9; }
}
```

- [ ] **Step 5.3: デスクトップで非表示にする default style を追加**

`app/(home)/home.css` の `/* hero -> first section seam */` コメント（L383 付近）の **直前** に以下を 1 ブロック追加。これにより mobile media query 外（641px↑）では非表示、media query 内では Step 5.1 の `display: flex` が上書きする。

```css
.home-root .hero__scroll-hint {
  display: none;
}
```

確認: Step 5.1 で書いた `.home-root .hero__scroll-hint` は `@media (max-width: 640px) { ... }` の **内側** にあり `display: flex` を含むので、640px 以下で上書きされて表示される。

- [ ] **Step 5.4: prefers-reduced-motion 拡張に scroll hint を追加**

`app/(home)/home.css` L331-336 の `@media (prefers-reduced-motion: reduce)` ブロックを以下に再置換（Task 4.4 から拡張）:

```css
@media (prefers-reduced-motion: reduce) {
  .home-root .hero__main,
  .home-root .hero__main-line,
  .home-root .hero__sub,
  .home-root .hero__scroll-hint {
    animation: none;
  }
  .home-root .hero__scroll-hint__line,
  .home-root .hero__scroll-hint__label {
    opacity: 0.55;
  }
}
```

- [ ] **Step 5.5: 視覚確認**

Chrome DevTools MCP で:
- 375x812 mobile emulation で reload → 右下に縦線 + "SCROLL" が呼吸しているか確認、`/tmp/hero-final-375.png` 保存
- 1280x800 desktop emulation で reload → scroll hint が非表示か確認、`/tmp/hero-desktop-1280.png` 保存

- [ ] **Step 5.6: テスト実行**

```bash
npx vitest run
```

Expected: 全 PASS。

- [ ] **Step 5.7: コミット**

```bash
git add app/\(home\)/home.css
git commit -m "feat(hero): add mobile scroll hint with breathing animation"
```

---

## Task 6: 全 viewport 横断検証 + reduced-motion 検証

**Files:** （変更なし、検証のみ）

- [ ] **Step 6.1: 4 viewport で first-fold スクショ取得**

Chrome DevTools MCP で各 viewport に emulate → `http://localhost:3000/` reload → スクショ:

| viewport | ファイル名 |
|---|---|
| 360x640x3,mobile | `/tmp/hero-verify-360.png` |
| 375x812x3,mobile | `/tmp/hero-verify-375.png` |
| 390x844x3,mobile | `/tmp/hero-verify-390.png` |
| 430x932x3,mobile | `/tmp/hero-verify-430.png` |

各スクショで以下を目視確認:
- title 3 行が画面上 1/3 に収まっている
- title と sub の間隔が適度（過剰な空白なし）
- services ラベルが読める
- 右下に scroll hint が見える
- sub 本文の最後まで first fold で見える、またはギリギリ切れる

- [ ] **Step 6.2: gap 計測**

各 viewport で `evaluate_script`:

```js
() => {
  const main = document.querySelector('.hero__main');
  const subRow = document.querySelector('.hero__sub-row');
  return {
    viewport: innerWidth,
    gap: Math.round(subRow.getBoundingClientRect().top - main.getBoundingClientRect().bottom),
    titleBottom: Math.round(main.getBoundingClientRect().bottom),
    subBottom: Math.round(subRow.getBoundingClientRect().bottom),
    viewportH: innerHeight,
  };
}
```

Expected: 全 viewport で `gap` が 60–100px の範囲。

- [ ] **Step 6.3: デスクトップ無変更を確認**

`1280x800` で emulate → `http://localhost:3000/` reload → `/tmp/hero-desktop-after.png` 保存。

git stash で変更を一時退避、reload して `/tmp/hero-desktop-before.png` 取得、変更を戻す:

```bash
git stash
# Chrome DevTools MCP で /tmp/hero-desktop-before.png 取得
git stash pop
# Chrome DevTools MCP で /tmp/hero-desktop-after.png 取得
```

2 枚を視覚的に diff（目視で OK、pixel-perfect 一致を確認）。Expected: 区別がつかない。

- [ ] **Step 6.4: prefers-reduced-motion 検証**

Chrome DevTools MCP で `emulate` 経由で reduced-motion を ON にできない可能性があるため、`evaluate_script` で `matchMedia` を override:

```js
() => {
  const style = document.createElement('style');
  style.id = 'force-reduce-motion';
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-delay: 0ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  `;
  document.head.appendChild(style);
  return 'reduced-motion forced';
}
```

または OS 側で「動きを減らす」を ON にして検証。375x812 で stagger と呼吸が止まり、scroll hint が静止表示されることを目視確認 → `/tmp/hero-reduced-motion.png` 保存。

- [ ] **Step 6.5: 全テスト + lint 実行**

```bash
npx vitest run
```

Expected: 全 PASS。型エラー無し。

- [ ] **Step 6.6: 検証スクショを spec の補足としてコミットしない（/tmp に置いたまま破棄）**

検証は手元確認のみ。変更ファイルは無いのでコミットなし。

---

## Task 7: 最終クリーンアップと完了確認

**Files:** （状況により）

- [ ] **Step 7.1: 不要になった `.hero__scroll-cue` （旧 desktop 用、現在 dead）の扱いを確認**

`app/(home)/home.css` L352-372 の `.home-root .hero__scroll-cue` 系統 + L377-379 の `display: none` は dead code。今回スコープ外なので **削除しない** が、コメントで TODO を残すか判断する。

判断: **残置する**（spec の「別 PR で削除検討」に従う）。何も変更しない。

- [ ] **Step 7.2: 成功基準チェック**

spec [docs/superpowers/specs/2026-04-21-mobile-hero-rebalance-design.md](../specs/2026-04-21-mobile-hero-rebalance-design.md) の Section 6「成功基準」を 1 つずつ満たすか確認:

- [ ] iPhone SE (375×667), iPhone 13 (390×844), Pixel 5 (360×640), iPhone 14 Pro Max (430×932) で title + services + sub 本文の全てが first fold で可視
- [ ] title 下端 と sub 上端の間隔が 60–100px に収まる
- [ ] モバイル初回表示で stagger reveal が 700–1100ms 以内に完了（calc: 400ms delay + 700ms duration = 1100ms）
- [ ] `prefers-reduced-motion: reduce` 環境で呼吸・stagger が停止
- [ ] デスクトップ (1280px↑) のヒーロー表示に pixel-level の変化が無い
- [ ] Lighthouse Mobile Accessibility / Performance スコアが現状維持以上
- [ ] 既存テスト green、DOM 構造変更に関する追加テスト green

- [ ] **Step 7.3: Lighthouse 確認**

Chrome DevTools MCP の `lighthouse_audit` を mobile preset で `http://localhost:3000/` に対して実行。Performance / Accessibility が変更前と同等以上であることを確認。スコアが落ちていれば原因特定して修正タスクを追加。

- [ ] **Step 7.4: ブランチの最終 git log 確認**

```bash
git log --oneline -10
```

期待 commit:
1. `refactor(hero): split title into three spans for stagger reveal`
2. `feat(hero): add mobile-only scroll hint element`
3. `feat(hero): add mobile layout media query (≤640px)`
4. `feat(hero): add stagger reveal animation for title lines`
5. `feat(hero): add mobile scroll hint with breathing animation`

- [ ] **Step 7.5: ユーザーに最終確認**

ユーザーに「実装完了。実機 (iPhone) で開いて確認できます。問題なければ Design ブランチを main に取り込みます」と報告。
