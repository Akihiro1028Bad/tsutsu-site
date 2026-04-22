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

  it("returns 1 for non-string input (defensive guard for corrupt microCMS data)", () => {
    // @ts-expect-error intentional: runtime guard for non-string values
    expect(estimateReadingTimeMin(undefined)).toBe(1)
    // @ts-expect-error intentional: runtime guard for non-string values
    expect(estimateReadingTimeMin(null)).toBe(1)
  })

  it("returns 1 when HTML contains only tags and whitespace (no text chars)", () => {
    expect(estimateReadingTimeMin("<p></p>")).toBe(1)
    expect(estimateReadingTimeMin("<p>   </p><br><br>")).toBe(1)
  })
})
