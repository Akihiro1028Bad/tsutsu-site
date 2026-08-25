/**
 * Business-site design tokens for the (home) Route Group.
 *
 * Monochrome by design: the palette carries no accent colour, because the
 * only colour on the page comes from the work screenshots. Mirrors the CSS
 * custom properties declared in `app/(home)/home.css` so server / client
 * modules can read the same values without parsing stylesheets.
 * Frozen at module load to enforce immutability.
 */

export const COLORS = Object.freeze({
  /** 地 */
  paper: "#FFFFFF",
  /** 本文・見出し・構造罫 */
  ink: "#0A0A0A",
  /** 副文 */
  inkSoft: "#55585E",
  /** 注記・ラベル */
  mute: "#8E9198",
  /** 行区切り */
  ruleThin: "#DEDFE2",
  /** ホバー面 */
  tint: "#F2F2F3",
})

export type ColorToken = keyof typeof COLORS

export const FONT_STACKS = Object.freeze({
  /** 本文・見出し */
  body: '"IBM Plex Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
  /** 数値・英字ラベル */
  mono: '"IBM Plex Mono", ui-monospace, monospace',
})

export type FontStack = keyof typeof FONT_STACKS
