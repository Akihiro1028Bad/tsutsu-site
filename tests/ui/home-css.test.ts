import { describe, it, expect } from "vitest"
import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"

const cssPath = resolve(process.cwd(), "app/(home)/home.css")

describe("Phase 1: app/(home)/home.css — editorial base stylesheet", () => {
  it("exists as a standalone stylesheet scoped to the home route", () => {
    expect(existsSync(cssPath)).toBe(true)
  })

  const source = readFileSync(cssPath, "utf-8")

  describe("CSS custom properties (business-site palette)", () => {
    it("declares --bg as pure white", () => {
      expect(source).toMatch(/--bg:\s*#FFFFFF/i)
    })

    it("declares --ink as the near-black used for text and structural rules", () => {
      expect(source).toMatch(/--ink:\s*#0A0A0A/i)
    })

    it("declares the thin rule and hover tint tokens", () => {
      expect(source).toMatch(/--rule:\s*#DEDFE2/i)
      expect(source).toMatch(/--tint:\s*#F2F2F3/i)
    })

    it("declares font-family variables for body and mono", () => {
      expect(source).toMatch(/--f-body:\s*var\(--font-plex-jp\)/)
      expect(source).toMatch(/--f-mono:\s*var\(--font-plex-mono\)/)
    })

    it("carries no accent colour — colour comes only from work images", () => {
      expect(source).not.toMatch(/--accent:\s*#D43D2A/i)
      expect(source).not.toMatch(/--blueprint:/)
    })

    it("drops the graph-paper background", () => {
      expect(source).not.toMatch(/--grid-line:/)
    })
  })

  describe("accessibility & robustness", () => {
    it("honours prefers-reduced-motion", () => {
      expect(source).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
    })

    it("scopes base typography to a .home-root wrapper (no leak)", () => {
      expect(source).toMatch(/\.home-root/)
    })
  })
})
