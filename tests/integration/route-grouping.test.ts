import { describe, it, expect } from "vitest"
import { existsSync } from "node:fs"
import { resolve } from "node:path"

const root = process.cwd()
const p = (rel: string) => resolve(root, rel)

describe("Phase 0: Route Group restructure", () => {
  describe("(site) Route Group hosts non-editorial routes", () => {
    it("places /services/mens-esthe page under (site)", () => {
      expect(existsSync(p("app/(site)/services/mens-esthe/page.tsx"))).toBe(true)
      expect(existsSync(p("app/services/mens-esthe/page.tsx"))).toBe(false)
    })

    it("places /preview dynamic routes under (site)", () => {
      expect(
        existsSync(p("app/(site)/preview/announcements/[id]/page.tsx"))
      ).toBe(true)
      expect(existsSync(p("app/(site)/preview/blog/[slug]/page.tsx"))).toBe(
        true
      )
      expect(existsSync(p("app/preview/announcements/[id]/page.tsx"))).toBe(
        false
      )
      expect(existsSync(p("app/preview/blog/[slug]/page.tsx"))).toBe(false)
    })

    it("provides a (site) layout.tsx", () => {
      expect(existsSync(p("app/(site)/layout.tsx"))).toBe(true)
    })
  })

  describe("(home) Route Group hosts the editorial pages", () => {
    it("places top page under app/(home)/page.tsx", () => {
      expect(existsSync(p("app/(home)/page.tsx"))).toBe(true)
      expect(existsSync(p("app/page.tsx"))).toBe(false)
    })

    it("provides a (home) layout.tsx", () => {
      expect(existsSync(p("app/(home)/layout.tsx"))).toBe(true)
    })

    it("places /blog list + [slug] under (home)", () => {
      expect(existsSync(p("app/(home)/blog/page.tsx"))).toBe(true)
      expect(existsSync(p("app/(home)/blog/[slug]/page.tsx"))).toBe(true)
      expect(existsSync(p("app/(site)/blog/page.tsx"))).toBe(false)
      expect(existsSync(p("app/blog/page.tsx"))).toBe(false)
    })

    it("places /announcements list + [id] under (home)", () => {
      expect(existsSync(p("app/(home)/announcements/page.tsx"))).toBe(true)
      expect(existsSync(p("app/(home)/announcements/[id]/page.tsx"))).toBe(true)
      expect(existsSync(p("app/(site)/announcements/page.tsx"))).toBe(false)
      expect(existsSync(p("app/announcements/page.tsx"))).toBe(false)
    })
  })

  describe("API routes stay at app/api (not affected)", () => {
    it("keeps /api/contact at app/api/contact/route.ts", () => {
      expect(existsSync(p("app/api/contact/route.ts"))).toBe(true)
    })
  })
})
