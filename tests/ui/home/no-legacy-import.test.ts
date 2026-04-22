import { describe, it, expect } from "vitest"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const pageSource = readFileSync(
  resolve(process.cwd(), "app/(home)/page.tsx"),
  "utf-8"
)

const LEGACY_MODULES = [
  "@/components/Hero",
  "@/components/LargeTextMarquee",
  "@/components/Services",
  "@/components/About",
  "@/components/Contact",
  "@/components/AnnouncementSection",
  "@/components/AnnouncementSectionClient",
  "@/components/BlogSection",
  "@/components/BlogSectionClient",
  "@/components/BlogSectionSkeleton",
] as const

const NEW_HOME_MODULES = [
  "@/components/home/HeroSection",
  "@/components/home/WorksSection",
  "@/components/home/ServicesSection",
  "@/components/home/AboutSection",
  "@/components/home/JournalSection",
  "@/components/home/ContactSection",
] as const

describe("Phase 7: app/(home)/page.tsx — leaves legacy imports behind", () => {
  for (const mod of LEGACY_MODULES) {
    it(`does not import ${mod}`, () => {
      const escaped = mod.replace(/[/\-]/g, "\\$&")
      expect(pageSource).not.toMatch(
        new RegExp(`from\\s+['"]${escaped}['"]`)
      )
    })
  }

  for (const mod of NEW_HOME_MODULES) {
    it(`imports ${mod}`, () => {
      const escaped = mod.replace(/[/\-]/g, "\\$&")
      expect(pageSource).toMatch(new RegExp(`from\\s+['"]${escaped}['"]`))
    })
  }
})
