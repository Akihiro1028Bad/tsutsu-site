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
