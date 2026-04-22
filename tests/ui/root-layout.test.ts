import { describe, it, expect } from "vitest"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const rootLayoutSource = readFileSync(
  resolve(process.cwd(), "app/layout.tsx"),
  "utf-8"
)

describe("Phase 0: app/layout.tsx (root layout) responsibilities", () => {
  it("does NOT import the legacy Header (moved to (site) layout)", () => {
    expect(rootLayoutSource).not.toMatch(/from\s+['"]@\/components\/Header['"]/)
  })

  it("does NOT import the legacy Footer (moved to (site) layout)", () => {
    expect(rootLayoutSource).not.toMatch(/from\s+['"]@\/components\/Footer['"]/)
  })

  it("does NOT import HeaderSkeleton (only used with Header)", () => {
    expect(rootLayoutSource).not.toMatch(
      /from\s+['"]@\/components\/HeaderSkeleton['"]/
    )
  })

  it("does NOT import FooterSkeleton (only used with Footer)", () => {
    expect(rootLayoutSource).not.toMatch(
      /from\s+['"]@\/components\/FooterSkeleton['"]/
    )
  })

  it("does NOT import ClientComponents (MouseFollower wrapper, moved to (site))", () => {
    expect(rootLayoutSource).not.toMatch(
      /from\s+['"]@\/components\/ClientComponents['"]/
    )
  })

  it("still imports StructuredData (global JSON-LD)", () => {
    expect(rootLayoutSource).toMatch(
      /from\s+['"]@\/components\/StructuredData['"]/
    )
  })

  it("still defines metadata export", () => {
    expect(rootLayoutSource).toMatch(/export\s+const\s+metadata/)
  })

  it("still imports globals.css", () => {
    expect(rootLayoutSource).toMatch(/['"]\.\/globals\.css['"]/)
  })
})
