import { describe, it, expect } from "vitest"
import { ABOUT } from "@/lib/home/about-data"

describe("Phase 4: lib/home/about-data — bilingual profile payload", () => {
  it("exposes the bilingual name (Japanese + Romanised)", () => {
    expect(ABOUT.name.ja).toMatch(/堤/)
    expect(ABOUT.name.romanised).toMatch(/Akihiro Tsutsumi/i)
  })

  it("exposes four biography paragraphs", () => {
    expect(ABOUT.paragraphs).toHaveLength(4)
  })

  it("each paragraph is a segmented list of text and mark chunks", () => {
    for (const p of ABOUT.paragraphs) {
      expect(p.length).toBeGreaterThan(0)
      for (const seg of p) {
        expect(["text", "mark"]).toContain(seg.kind)
        expect(seg.value).toBeTruthy()
      }
    }
  })

  it("contains at least one 'mark' segment so the highlight style gets exercised", () => {
    const hasMark = ABOUT.paragraphs.some((p) => p.some((s) => s.kind === "mark"))
    expect(hasMark).toBe(true)
  })

  it("freezes the payload graph", () => {
    expect(Object.isFrozen(ABOUT)).toBe(true)
    expect(Object.isFrozen(ABOUT.paragraphs)).toBe(true)
  })
})
