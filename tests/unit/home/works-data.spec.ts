import { describe, it, expect } from "vitest"
import { WORKS_FEATURED, WORKS_INDEX_HREF } from "@/lib/home/works-data"

describe("Phase 3: lib/home/works-data — featured works dataset", () => {
  it("ships at least one featured work for the home page", () => {
    expect(WORKS_FEATURED.length).toBeGreaterThanOrEqual(1)
  })

  it("includes the editorial Pickle Bang Theory hero project", () => {
    const hero = WORKS_FEATURED.find((w) => /Pickle/i.test(w.title))
    expect(hero).toBeDefined()
    expect(hero?.image.src).toMatch(/pickleball-hero/)
    expect(hero?.image.alt).toBeTruthy()
  })

  it("each work exposes the fields the WorksCard depends on", () => {
    for (const w of WORKS_FEATURED) {
      expect(w.id).toMatch(/^[a-z0-9-]+$/)
      expect(w.indexNumber).toMatch(/^\d{3}$/)
      expect(w.title).toBeTruthy()
      expect(w.titleJa).toBeTruthy()
      expect(w.description).toBeTruthy()
      expect(Array.isArray(w.stack)).toBe(true)
      expect(w.stack.length).toBeGreaterThan(0)
      expect(Array.isArray(w.meta)).toBe(true)
      expect(w.meta.length).toBeGreaterThan(0)
      for (const m of w.meta) {
        expect(m.label).toBeTruthy()
        expect(m.value).toBeTruthy()
      }
    }
  })

  it("declares the index page link separately from the work data", () => {
    expect(WORKS_INDEX_HREF).toMatch(/^\/?[a-z0-9-/]/)
  })

  it("freezes WORKS_FEATURED to enforce immutability", () => {
    expect(Object.isFrozen(WORKS_FEATURED)).toBe(true)
  })
})
