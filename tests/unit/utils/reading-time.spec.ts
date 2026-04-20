import { describe, it, expect } from "vitest"
import { estimateReadingTimeMin } from "@/lib/utils/reading-time"

describe("estimateReadingTimeMin", () => {
  it("returns at least 1 minute for empty input", () => {
    expect(estimateReadingTimeMin("")).toBe(1)
  })

  it("returns 1 for very short content", () => {
    expect(estimateReadingTimeMin("<p>短い記事。</p>")).toBe(1)
  })

  it("strips HTML tags before counting", () => {
    const body = "あ".repeat(500)
    expect(estimateReadingTimeMin(`<p><strong>${body}</strong></p>`)).toBe(1)
  })

  it("scales at roughly 500 chars per minute", () => {
    const body = "あ".repeat(1500)
    expect(estimateReadingTimeMin(`<p>${body}</p>`)).toBe(3)
  })

  it("ignores whitespace", () => {
    expect(estimateReadingTimeMin("<p>あ</p>" + "\n".repeat(1000))).toBe(1)
  })
})
