import { describe, it, expect } from "vitest"
import { COLORS, FONT_STACKS } from "@/lib/home/tokens"

describe("Blueprint: lib/home/tokens — カラーパレット", () => {
  it("製図紙(ベース背景)を定義する", () => {
    expect(COLORS.paper).toBe("#F7F5F0")
  })

  it("方眼グリッド線の色を定義する", () => {
    expect(COLORS.paperGrid).toBe("rgba(30, 42, 58, 0.05)")
  })

  it("製図インク(本文・見出し)を定義する", () => {
    expect(COLORS.ink).toBe("#1E2A3A")
  })

  it("補助インク(淡色)を定義する", () => {
    expect(COLORS.inkSoft).toBe("#5A6A7D")
  })

  it("朱印(アクセント・CTA)を定義する", () => {
    expect(COLORS.seal).toBe("#D43D2A")
  })

  it("青図(リンク・図面線)を定義する", () => {
    expect(COLORS.blueprint).toBe("#3D6EA5")
  })

  it("鉛筆(注釈・補助線)を定義する", () => {
    expect(COLORS.pencil).toBe("#8A97A5")
  })
})

describe("Blueprint: lib/home/tokens — フォントスタック", () => {
  it("見出し: Zen Kaku Gothic New", () => {
    expect(FONT_STACKS.display).toContain("Zen Kaku Gothic New")
  })

  it("手描き注釈: Zen Kurenaido", () => {
    expect(FONT_STACKS.hand).toContain("Zen Kurenaido")
  })

  it("英字ラベル: Space Grotesk", () => {
    expect(FONT_STACKS.label).toContain("Space Grotesk")
  })

  it("本文: Noto Sans JP", () => {
    expect(FONT_STACKS.body).toContain("Noto Sans JP")
  })
})

describe("Blueprint: lib/home/tokens — 不変性", () => {
  it("COLORS は凍結されている", () => {
    expect(Object.isFrozen(COLORS)).toBe(true)
  })

  it("FONT_STACKS は凍結されている", () => {
    expect(Object.isFrozen(FONT_STACKS)).toBe(true)
  })
})
