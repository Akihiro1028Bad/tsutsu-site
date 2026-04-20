import { describe, it, expect } from "vitest"
import { SERVICES } from "@/lib/home/services-data"

describe("Phase 4: lib/home/services-data — four editorial spreads", () => {
  it("exposes exactly four services (Web Site / Web App / Automation / Mentoring)", () => {
    expect(SERVICES).toHaveLength(4)
  })

  it("preserves the design's § numbering and English meta labels", () => {
    const metas = SERVICES.map((s) => s.meta)
    expect(metas).toEqual([
      "§ 01 / Web Site",
      "§ 02 / Web App",
      "§ 03 / Automation",
      "§ 04 / Mentoring",
    ])
  })

  it("each service carries its Japanese name, tagline, and body copy", () => {
    for (const s of SERVICES) {
      expect(s.id).toMatch(/^[a-z0-9-]+$/)
      expect(s.nameJa).toBeTruthy()
      expect(s.tagline).toBeTruthy()
      expect(s.body).toBeTruthy()
    }
  })

  it("freezes SERVICES and each entry to prevent mutation", () => {
    expect(Object.isFrozen(SERVICES)).toBe(true)
    for (const s of SERVICES) {
      expect(Object.isFrozen(s)).toBe(true)
    }
  })
})
