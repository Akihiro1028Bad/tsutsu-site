import { describe, it, expect } from "vitest"
import config from "@/tailwind.config.js"

interface ThemeExtension {
  colors: Record<string, unknown>
  fontFamily: Record<string, string[]>
}

const extend = (config as { theme: { extend: ThemeExtension } }).theme.extend

describe("Blueprint: tailwind.config.js — カラートークン", () => {
  it("paper / ink / seal / blueprint / pencil を定義する", () => {
    expect(extend.colors.paper).toBe("#F7F5F0")
    expect(extend.colors.seal).toBe("#D43D2A")
    expect(extend.colors.blueprint).toBe("#3D6EA5")
    expect(extend.colors.pencil).toBe("#8A97A5")
  })

  it("ink は DEFAULT と soft を持つ", () => {
    expect(extend.colors.ink).toEqual({ DEFAULT: "#1E2A3A", soft: "#5A6A7D" })
  })
})

describe("Blueprint: tailwind.config.js — フォントファミリー", () => {
  it("display / hand / label を定義する", () => {
    expect(extend.fontFamily.display.join(",")).toContain("--font-zen-kaku")
    expect(extend.fontFamily.hand.join(",")).toContain("--font-zen-kurenaido")
    expect(extend.fontFamily.label.join(",")).toContain("--font-space-grotesk")
  })

  it("sans は Noto Sans JP 変数を先頭に持つ(本文)", () => {
    expect(extend.fontFamily.sans[0]).toBe("var(--font-noto-sans-jp)")
  })
})
