import { describe, it, expect } from "vitest"
import {
  extractPlainText,
  truncateText,
  generateExcerpt,
  generateMetaDescription,
} from "@/lib/utils/text"

describe("extractPlainText", () => {
  it("returns empty string for empty input", () => {
    expect(extractPlainText("")).toBe("")
  })

  it("returns empty string for non-string input", () => {
    // @ts-expect-error intentional: runtime guard for non-string values
    expect(extractPlainText(null)).toBe("")
    // @ts-expect-error intentional: runtime guard for non-string values
    expect(extractPlainText(undefined)).toBe("")
    // @ts-expect-error intentional: runtime guard for non-string values
    expect(extractPlainText(123)).toBe("")
  })

  it("strips HTML tags", () => {
    expect(extractPlainText("<p>hello <strong>world</strong></p>")).toBe("hello world")
  })

  it("decodes named HTML entities", () => {
    expect(extractPlainText("a&nbsp;b")).toBe("a b")
    expect(extractPlainText("a &amp; b")).toBe("a & b")
    expect(extractPlainText("&lt;tag&gt;")).toBe("<tag>")
    expect(extractPlainText("&quot;text&quot;")).toBe('"text"')
    expect(extractPlainText("&#39;apos&#39;")).toBe("'apos'")
    expect(extractPlainText("&apos;apos&apos;")).toBe("'apos'")
  })

  it("decodes numeric decimal entities", () => {
    expect(extractPlainText("&#65;&#66;&#67;")).toBe("ABC")
  })

  it("decodes numeric hexadecimal entities", () => {
    expect(extractPlainText("&#x41;&#x42;&#x43;")).toBe("ABC")
  })

  it("collapses consecutive whitespace to a single space", () => {
    expect(extractPlainText("a\n\n\tb   c")).toBe("a b c")
  })

  it("trims leading and trailing whitespace", () => {
    expect(extractPlainText("   hello   ")).toBe("hello")
  })
})

describe("truncateText", () => {
  it("returns empty string for empty input", () => {
    expect(truncateText("", 10)).toBe("")
  })

  it("returns empty string for non-string input", () => {
    // @ts-expect-error intentional: runtime guard for non-string values
    expect(truncateText(null, 10)).toBe("")
    // @ts-expect-error intentional: runtime guard for non-string values
    expect(truncateText(undefined, 10)).toBe("")
  })

  it("returns empty string when maxLength is 0", () => {
    expect(truncateText("hello", 0)).toBe("")
  })

  it("returns empty string when maxLength is negative", () => {
    expect(truncateText("hello", -1)).toBe("")
  })

  it("returns text as-is when length is within maxLength", () => {
    expect(truncateText("hello", 10)).toBe("hello")
    expect(truncateText("hello", 5)).toBe("hello")
  })

  it("truncates and appends default '...' suffix", () => {
    expect(truncateText("hello world", 5)).toBe("hello...")
  })

  it("truncates and appends custom suffix", () => {
    expect(truncateText("hello world", 5, "…")).toBe("hello…")
  })

  it("counts full-width characters as single code units", () => {
    expect(truncateText("あいうえお", 3)).toBe("あいう...")
  })
})

describe("generateExcerpt", () => {
  it("returns empty string for empty HTML", () => {
    expect(generateExcerpt("")).toBe("")
  })

  it("returns empty string for non-string input", () => {
    // @ts-expect-error intentional: runtime guard for non-string values
    expect(generateExcerpt(null)).toBe("")
  })

  it("returns empty string when HTML resolves to empty plain text", () => {
    expect(generateExcerpt("<p>   </p>")).toBe("")
  })

  it("extracts and truncates HTML content with default maxLength (100)", () => {
    const html = `<p>${"あ".repeat(150)}</p>`
    const result = generateExcerpt(html)
    expect(result).toBe("あ".repeat(100) + "...")
  })

  it("extracts and truncates HTML content with custom maxLength", () => {
    expect(generateExcerpt("<p>hello world</p>", 5)).toBe("hello...")
  })

  it("returns full plain text when shorter than maxLength", () => {
    expect(generateExcerpt("<p>short</p>", 100)).toBe("short")
  })
})

describe("generateMetaDescription", () => {
  it("returns empty string for empty HTML", () => {
    expect(generateMetaDescription("")).toBe("")
  })

  it("returns empty string for non-string input", () => {
    // @ts-expect-error intentional: runtime guard for non-string values
    expect(generateMetaDescription(null)).toBe("")
  })

  it("returns empty string when HTML resolves to empty plain text", () => {
    expect(generateMetaDescription("<p>   </p>")).toBe("")
  })

  it("returns full plain text when shorter than default maxLength (160)", () => {
    expect(generateMetaDescription("<p>short summary</p>")).toBe("short summary")
  })

  it("truncates at word boundary and appends '...' when over custom maxLength", () => {
    const html = "<p>the quick brown fox jumps over the lazy dog</p>"
    const result = generateMetaDescription(html, 20)
    expect(result).toBe("the quick brown fox...")
    expect(result.endsWith("...")).toBe(true)
  })

  it("truncates using default maxLength (160)", () => {
    const html = `<p>${"word ".repeat(50)}</p>`
    const result = generateMetaDescription(html)
    expect(result.length).toBeLessThanOrEqual(163)
    expect(result.endsWith("...")).toBe(true)
  })
})
