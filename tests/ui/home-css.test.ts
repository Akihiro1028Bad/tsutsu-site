import { describe, it, expect } from "vitest"
import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"

const cssPath = resolve(process.cwd(), "app/(home)/home.css")

describe("Phase 1: app/(home)/home.css — editorial base stylesheet", () => {
  it("exists as a standalone stylesheet scoped to the home route", () => {
    expect(existsSync(cssPath)).toBe(true)
  })

  const source = readFileSync(cssPath, "utf-8")

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

  describe("accessibility & robustness", () => {
    it("honours prefers-reduced-motion", () => {
      expect(source).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
    })

    it("scopes base typography to a .home-root wrapper (no leak)", () => {
      expect(source).toMatch(/\.home-root/)
    })
  })
})
