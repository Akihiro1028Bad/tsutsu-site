# モバイル Hero リバランス — Design Spec

**Date:** 2026-04-21
**Scope:** `components/home/HeroSection.tsx` + `app/(home)/home.css` のモバイル (`max-width: 640px`) 表示のみ
**Status:** Approved, ready for implementation plan

---

## 1. 背景と問題

現状のヒーロー（375×812 実測）:

| 項目 | 値 |
|---|---|
| Hero 上部 padding | 130px（16vh） |
| タイトル下端 | 301px |
| サブテキスト上端 | 624px |
| **タイトルとサブの空白** | **323px（画面の約40%）** |
| タイトル font-size | 44–56px（`clamp(56px, 12vw, 200px)` 下限） |
| services ラベル | 11px mono, letter-spacing 0.18em |
| サブ本文 line-height | 1.9 |

原因: デスクトップ向けの `hero__grid { flex-grow:1; align-items:end }` + `hero__title-block { align-self:center }` が、モバイル高さでは過剰な空白を生む。title が中央・sub が下端に分離し、視覚的に浮く。

## 2. 設計方針（合成案：C × B一部 × D一部）

**哲学:** 「空白は呼吸の間」 — 数値を詰めて読みやすくしつつ、削った余白を stagger reveal モーションが「意味のある間」に置き換える。静かな editorial トーンを維持する。

プロチーム4案（Editorial AD / Mobile UX / Motion / Typography）から、既存サイトのトーン（sans-serif・accent red・静かなモーション）と整合する Motion 案（C）を軸に、Mobile UX 案（B）の scroll hint と Typography 案（D）の行組みだけを取り込む。

### 採用しないもの
- **A の masthead/INDEX** — 他セクションとの一貫性が無く、スコープ超過
- **B の CTA ボタン** — 商用LP寄りに傾き、編集的静けさを損なう
- **D の明朝・圏点・朱罫・漢数字** — サイト全体のトーンと乖離

## 3. 具体仕様

### 3.1 静止レイアウト（`@media (max-width: 640px)`）

```
padding-top:            130px → 88px    (11vh)
padding-bottom:         48px → 56px
hero__grid:
  flex-grow:            1 → 0           (リセット)
  align-items:          end → start
  row-gap:              既存維持
hero__title-block:
  align-self:           center → start
hero__main:
  font-size:            clamp(56px, 12vw, 200px) → clamp(56px, 14vw, 72px)
  line-height:          0.98 → 1.05
  letter-spacing:       -0.02em (維持)
hero__sub-row:
  margin-top:           73px → 40px
  grid-column:          1 / -1 (既存維持)
hero__services-inline:
  font-size:            11px → 12px
  letter-spacing:       0.18em → 0.14em
  margin-bottom:        18px (維持)
  padding-bottom:       18px → 16px
hero__sub:
  font-size:            16px (維持)
  line-height:          1.9 → 1.7
hero__mark:
  (現状の黄マーカー維持)
```

**期待結果:** title→sub 間 323px → 約80px。first fold で title + services + sub の全てが視認可能になる。

### 3.2 モーション拡張

既存 `tsutsu-hero-rise`（title 80ms / sub 320ms の fade-in + translateY）を行単位 stagger に拡張する。

```
title line 1 (想いを):      80ms  delay, 700ms duration
title line 2 (技術で):      240ms delay, 700ms duration
title line 3 (カタチに。):  400ms delay, 700ms duration
sub-row:                   560ms delay, 700ms duration (既存 320ms から後ろ倒し)
scroll hint (新規):         800ms delay, fade-in → 呼吸 idle
```

- easing: 既存の `cubic-bezier(0.2, 0.7, 0.2, 1)` を継続
- 変位: `translateY(14px → 0)` + `opacity 0 → 1`
- 実装: HTML 側で title を 3 `<span>` に分割し、CSS の `animation-delay` で制御

### 3.3 scroll hint（新規）

現状 `.hero__scroll-cue` は CSS に定義されているが `HeroSection.tsx` ではレンダされていない（デッドコード）。モバイル用の scroll hint を新規要素として追加する。

```
要素:   <div class="hero__scroll-hint" aria-hidden="true">...</div>
表示:   mobile のみ (@media (max-width: 640px))、デスクトップは display: none
位置:   Hero 右下 (right: var(--pad-x); bottom: clamp(20px, 4vh, 36px))
構造:   1px × 20px の縦線 + 下に 10px mono で "SCROLL"
呼吸:   opacity 0.45 ↔ 0.9 の 2.4s infinite ease-in-out
```

既存 `.hero__scroll-cue` CSS は影響範囲外として残置（別PRで削除検討）。

### 3.4 `prefers-reduced-motion` fallback

- title stagger: delay 据え置き、duration を 300ms、translateY を 0 に（opacity のみ）
- scroll hint 呼吸: 静止（`animation: none`、opacity は 0.55 固定）
- title 3 span に対しても既存同等の animation disable を適用
- 既存メディアクエリ（`home.css:331`）を拡張する形で実装

### 3.5 破線（技術 アクセント、アイデアに寄り添い マーカー）

- `hero__em::after` のオレンジ下線: 現状維持
- `hero__mark` の黄マーカー: 現状維持
- いずれもモバイルでも破綻していないため変更しない

## 4. ファイル変更範囲

| ファイル | 変更内容 |
|---|---|
| `components/home/HeroSection.tsx` | `<h1>` の中身を 3 行の `<span>` に分割（既存 `<br>` を span に変える）/ scroll hint mobile 要素を追加 |
| `app/(home)/home.css` (L246-385 周辺) | `@media (max-width: 640px)` ブロックを新規追加、`@keyframes` に stagger 用 delay 増設、`prefers-reduced-motion` 分岐拡張 |
| テスト (`tests/ui/home/HeroSection.test.tsx` が存在する場合) | DOM 構造変更に合わせて更新 |

## 5. スコープ外

- デスクトップ表示（`min-width: 641px`）— 一切変更しない
- タブレット（641–899px）— 既存挙動のまま
- 他セクション（About / Services / Works 等）のモバイル最適化
- コピーライト文言・アクセントカラー・フォントファミリーの変更

## 6. 成功基準

- [ ] iPhone SE (375×667), iPhone 13 (390×844), Pixel 5 (360×640), iPhone 14 Pro Max (430×932) で title + services + sub 本文の全てが first fold で可視
- [ ] title 下端 と sub 上端の間隔が 60–100px に収まる
- [ ] モバイル初回表示で stagger reveal が 700–1100ms 以内に完了
- [ ] `prefers-reduced-motion: reduce` 環境で呼吸・stagger が停止
- [ ] デスクトップ (1280px↑) のヒーロー表示に pixel-level の変化が無い
- [ ] Lighthouse Mobile Accessibility / Performance スコアが現状維持以上
- [ ] 既存テスト green、DOM 構造変更に関する追加テスト green

## 7. リスクと緩和

| リスク | 緩和策 |
|---|---|
| `<br>` → `<span>` で改行挙動が変わる | span を `display: block` または `display: inline-block + ::after content: '\A'` で明示 |
| stagger delay が長すぎて LCP が悪化 | title line 1 の delay は 80ms 据え置き、LCP 対象を line 1 に保つ |
| 641–899px（タブレット）で既存デスクトップ挙動が不自然 | スコープ外とするが、実機確認時に要観察。別 PR で対応 |
| scroll hint がロード完了前にちらつく | 既存 Hero fade-in と同じ `backwards` 指定で初期状態を固定 |

## 8. Out of Scope（別タスクとして検討）

- タブレット (641–899px) のリバランス
- About / Services / Works セクションのモバイル最適化
- ダークモードでの accent / mark の見え方調整
