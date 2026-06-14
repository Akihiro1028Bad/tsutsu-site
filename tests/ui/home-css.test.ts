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

  describe("Sticky Stack — Prototype A glass bands", () => {
    it("has glass band ::before for section#services (Works→Services boundary)", () => {
      expect(source).toContain(
        '.home-root main[data-sticky-stack="on"] > section#services::before'
      )
    })

    it("has glass band ::before for section#about (Services→About boundary)", () => {
      expect(source).toContain(
        '.home-root main[data-sticky-stack="on"] > section#about::before'
      )
    })

    it("has glass band ::before for section#notes (About→Journal boundary)", () => {
      expect(source).toContain(
        '.home-root main[data-sticky-stack="on"] > section#notes::before'
      )
    })

    it("has glass band ::before for section#contact (Journal→Contact boundary)", () => {
      expect(source).toContain(
        '.home-root main[data-sticky-stack="on"] > section#contact::before'
      )
    })

    it("gates all glass bands behind (pointer: fine)", () => {
      const pointerFineBlocks = source.match(/@media\s*\(pointer:\s*fine\)([\s\S]*?)\n\}/g)
      expect(pointerFineBlocks).not.toBeNull()
      const combined = (pointerFineBlocks as string[]).join("\n")
      expect(combined).toContain("section#services::before")
      expect(combined).toContain("section#about::before")
      expect(combined).toContain("section#notes::before")
      expect(combined).toContain("section#contact::before")
    })

    it("hides all glass band ::before in prefers-reduced-motion", () => {
      const reducedBlocks = source.match(
        /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\n\}/g
      )
      expect(reducedBlocks).not.toBeNull()
      const combined = (reducedBlocks as string[]).join("\n")
      expect(combined).toContain("section#services::before")
      expect(combined).toContain("section#about::before")
      expect(combined).toContain("section#notes::before")
      expect(combined).toContain("section#contact::before")
    })

    it("uses var(--ink) base for the dark Services boundary", () => {
      expect(source).toMatch(/section#services::before[\s\S]*?var\(--ink\)/)
    })

    it("uses var(--bg) base for light-to-light boundaries (About, Notes, Contact)", () => {
      expect(source).toMatch(/section#about::before[\s\S]*?var\(--bg\)/)
      expect(source).toMatch(/section#notes::before[\s\S]*?var\(--bg\)/)
      expect(source).toMatch(/section#contact::before[\s\S]*?var\(--bg\)/)
    })
  })
})
