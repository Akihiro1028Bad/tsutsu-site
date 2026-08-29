import { describe, it, expect } from "vitest"
import { COLORS, FONT_STACKS } from "@/lib/home/tokens"

describe("事業サイト: lib/home/tokens — カラー(モノクロ)", () => {
  it("地は純白", () => {
    expect(COLORS.paper).toBe("#FFFFFF")
  })

  it("本文・構造罫の墨色", () => {
    expect(COLORS.ink).toBe("#0A0A0A")
  })

  it("副文の色", () => {
    expect(COLORS.inkSoft).toBe("#55585E")
  })

  it("注記・ラベルの色", () => {
    expect(COLORS.mute).toBe("#8E9198")
  })

  it("行区切りの淡い罫", () => {
    expect(COLORS.ruleThin).toBe("#DEDFE2")
  })

  it("ホバー面の淡い地", () => {
    expect(COLORS.tint).toBe("#F2F2F3")
  })

  it("アクセントカラーを持たない(色は実績写真だけが持つ)", () => {
    expect(COLORS).not.toHaveProperty("accent")
    expect(COLORS).not.toHaveProperty("seal")
    expect(COLORS).not.toHaveProperty("blueprint")
  })
})

describe("事業サイト: lib/home/tokens — フォントスタック", () => {
  it("本文・見出しは IBM Plex Sans JP", () => {
    expect(FONT_STACKS.body).toContain("IBM Plex Sans JP")
  })

  it("数値・英字ラベルは IBM Plex Mono", () => {
    expect(FONT_STACKS.mono).toContain("IBM Plex Mono")
  })

  it("AI が既定で選ぶ書体を含まない", () => {
    const all = Object.values(FONT_STACKS).join(" ")
    expect(all).not.toContain("Zen Kaku")
    expect(all).not.toContain("Zen Kurenaido")
    expect(all).not.toContain("Space Grotesk")
    expect(all).not.toContain("Noto Sans JP")
  })
})

describe("事業サイト: lib/home/tokens — 不変性", () => {
  it("COLORS は凍結されている", () => {
    expect(Object.isFrozen(COLORS)).toBe(true)
  })

  it("FONT_STACKS は凍結されている", () => {
    expect(Object.isFrozen(FONT_STACKS)).toBe(true)
  })
})
