import { describe, it, expect } from "vitest"
import { COLORS, FONT_STACKS } from "@/lib/home/tokens"

describe("Phase 1: lib/home/tokens — colour palette", () => {
  it("defines the cream page background using oklch", () => {
    expect(COLORS.bg).toMatch(/^oklch\(/)
  })

  it("defines a slightly darker cream for soft surfaces", () => {
    expect(COLORS.bgSoft).toMatch(/^oklch\(/)
    expect(COLORS.bgSoft).not.toEqual(COLORS.bg)
  })

  it("defines the deep-navy ink tone", () => {
    expect(COLORS.ink).toMatch(/^oklch\(/)
  })

  it("defines softer and muted ink tones", () => {
    expect(COLORS.inkSoft).toMatch(/^oklch\(/)
    expect(COLORS.inkMute).toMatch(/^oklch\(/)
    expect(COLORS.inkSoft).not.toEqual(COLORS.ink)
    expect(COLORS.inkMute).not.toEqual(COLORS.inkSoft)
  })

  it("defines a hairline rule colour", () => {
    expect(COLORS.rule).toMatch(/^oklch\(/)
  })

  it("defines the terracotta accent (applied overlay in the design)", () => {
    expect(COLORS.accent).toMatch(/^oklch\(/)
    expect(COLORS.accentSoft).toMatch(/^oklch\(/)
  })
})

describe("Phase 1: lib/home/tokens — font stacks", () => {
  it("exposes a display serif stack (DM Serif fallback)", () => {
    expect(FONT_STACKS.display).toMatch(/DM Serif Display|serif/)
  })

  it("exposes a Japanese display stack (Shippori Mincho fallback)", () => {
    expect(FONT_STACKS.jpDisplay).toMatch(/Shippori Mincho|serif/)
  })

  it("exposes a Japanese body stack (Zen Kaku Gothic fallback)", () => {
    expect(FONT_STACKS.body).toMatch(/Zen Kaku Gothic New|sans-serif/)
  })

  it("exposes a monospace stack (Space Mono fallback)", () => {
    expect(FONT_STACKS.mono).toMatch(/Space Mono|monospace/)
  })
})

describe("Phase 1: lib/home/tokens — immutability", () => {
  it("freezes the COLORS record to prevent mutation", () => {
    expect(Object.isFrozen(COLORS)).toBe(true)
  })

  it("freezes the FONT_STACKS record to prevent mutation", () => {
    expect(Object.isFrozen(FONT_STACKS)).toBe(true)
  })
})
