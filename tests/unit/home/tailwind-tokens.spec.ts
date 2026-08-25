import { describe, it, expect } from "vitest"
import config from "@/tailwind.config.js"

interface ThemeExtension {
  colors: Record<string, unknown>
  fontFamily: Record<string, string[]>
}

const extend = (config as { theme: { extend: ThemeExtension } }).theme.extend

describe("事業サイト: tailwind.config.js — カラートークン", () => {
  it("paper / ink / mute / rule / tint を定義する", () => {
    expect(extend.colors.paper).toBe("#FFFFFF")
    expect(extend.colors.mute).toBe("#8E9198")
    expect(extend.colors.rule).toBe("#DEDFE2")
    expect(extend.colors.tint).toBe("#F2F2F3")
  })

  it("ink は DEFAULT と soft を持つ", () => {
    expect(extend.colors.ink).toEqual({ DEFAULT: "#0A0A0A", soft: "#55585E" })
  })

  it("アクセントカラーのトークンを持たない", () => {
    expect(extend.colors).not.toHaveProperty("seal")
    expect(extend.colors).not.toHaveProperty("blueprint")
  })
})

describe("事業サイト: tailwind.config.js — フォントファミリー", () => {
  it("sans は IBM Plex Sans JP の変数を先頭に持つ", () => {
    expect(extend.fontFamily.sans[0]).toBe("var(--font-plex-jp)")
  })

  it("mono は IBM Plex Mono の変数を先頭に持つ", () => {
    expect(extend.fontFamily.mono[0]).toBe("var(--font-plex-mono)")
  })

  it("旧方向の display / hand フォントを残さない", () => {
    expect(extend.fontFamily).not.toHaveProperty("hand")
    expect(extend.fontFamily).not.toHaveProperty("label")
  })
})
