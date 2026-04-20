import { describe, it, expect } from "vitest"
import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"

const cssPath = resolve(process.cwd(), "app/(home)/home.css")

describe("Phase 1: app/(home)/home.css — editorial base stylesheet", () => {
  it("exists as a standalone stylesheet scoped to the home route", () => {
    expect(existsSync(cssPath)).toBe(true)
  })

  const source = readFileSync(cssPath, "utf-8")

  describe("CSS custom properties", () => {
    it("declares --bg with an oklch value", () => {
      expect(source).toMatch(/--bg:\s*oklch\(/)
    })

    it("declares --ink with an oklch value", () => {
      expect(source).toMatch(/--ink:\s*oklch\(/)
    })

    it("declares --accent with an oklch value", () => {
      expect(source).toMatch(/--accent:\s*oklch\(/)
    })

    it("declares hairline --rule token", () => {
      expect(source).toMatch(/--rule:\s*oklch\(/)
    })

    it("declares font-family variables for all four families", () => {
      expect(source).toMatch(/--f-display:/)
      expect(source).toMatch(/--f-jp-display:/)
      expect(source).toMatch(/--f-body:/)
      expect(source).toMatch(/--f-mono:/)
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
