/**
 * Editorial design tokens for the (home) Route Group.
 *
 * Mirrors the CSS custom properties declared in `app/(home)/home.css`
 * so server / client modules can read the same values without parsing
 * stylesheets. Frozen at module load to enforce immutability.
 */

export const COLORS = Object.freeze({
  bg: "oklch(0.98 0.005 85)",
  bgSoft: "oklch(0.955 0.008 85)",
  ink: "oklch(0.2 0.012 260)",
  inkSoft: "oklch(0.35 0.012 260)",
  inkMute: "oklch(0.55 0.01 260)",
  rule: "oklch(0.88 0.008 85)",
  // Terracotta accent (final design override).
  accent: "oklch(0.55 0.16 30)",
  accentSoft: "oklch(0.94 0.05 30)",
})

export type ColorToken = keyof typeof COLORS

export const FONT_STACKS = Object.freeze({
  display: '"DM Serif Display", "Shippori Mincho", serif',
  jpDisplay: '"Shippori Mincho", "Zen Kaku Gothic New", serif',
  body: '"Zen Kaku Gothic New", system-ui, sans-serif',
  mono: '"Space Mono", ui-monospace, monospace',
})

export type FontStack = keyof typeof FONT_STACKS
