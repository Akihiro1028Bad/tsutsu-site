import { describe, it, expect, vi } from "vitest"

// `sanitize.ts` awaits `connection()` from `next/server` on every call to
// escape Cache Components' static-prerender path. In a vitest (jsdom)
// environment this is a server-only API and will throw, so stub it out.
vi.mock("next/server", () => ({
  connection: vi.fn(async () => undefined),
}))

import { sanitizeHtml } from "@/lib/utils/sanitize"

describe("sanitizeHtml — core tag allowlist", () => {
  it("keeps editorial block tags verbatim", async () => {
    const out = await sanitizeHtml("<h2>Title</h2><p><strong>bold</strong> text</p>")
    expect(out).toContain("<h2>Title</h2>")
    expect(out).toContain("<strong>bold</strong>")
  })

  it("strips <script> entirely (XSS core defence)", async () => {
    const out = await sanitizeHtml("<p>before</p><script>alert('xss')</script><p>after</p>")
    expect(out).not.toContain("<script")
    expect(out).not.toContain("alert")
    expect(out).toContain("<p>before</p>")
    expect(out).toContain("<p>after</p>")
  })

  it("strips <foreignObject> (Mermaid SVG path that would bypass script policy)", async () => {
    const out = await sanitizeHtml(
      '<svg><foreignObject><iframe src="javascript:alert(1)"></iframe></foreignObject></svg>',
    )
    expect(out).not.toContain("foreignObject")
    expect(out).not.toContain("iframe")
  })

  it("drops event-handler attributes like onclick", async () => {
    const out = await sanitizeHtml('<p onclick="alert(1)">hi</p>')
    expect(out).not.toContain("onclick")
    expect(out).toContain("<p>hi</p>")
  })

  it("blocks javascript: URLs on anchors", async () => {
    const out = await sanitizeHtml('<a href="javascript:alert(1)">click</a>')
    expect(out).not.toMatch(/href=["']?javascript:/i)
  })
})

describe("sanitizeHtml — class allowlist", () => {
  it("keeps classes on the editorial allowlist (lead / tldr / warn / etc.)", async () => {
    const out = await sanitizeHtml('<p class="lead">opener</p>')
    expect(out).toContain('class="lead"')
  })

  it("drops unknown classes but preserves the tag", async () => {
    const out = await sanitizeHtml('<p class="totally-made-up-class">body</p>')
    expect(out).toContain("<p>body</p>")
    expect(out).not.toContain("totally-made-up-class")
  })

  it("keeps allowed classes and drops unknown ones from mixed class lists", async () => {
    const out = await sanitizeHtml('<p class="lead foo key bar">txt</p>')
    // Order-agnostic check — the two allowed classes should remain, the two
    // unknown ones should be gone.
    expect(out).toMatch(/class="[^"]*\blead\b[^"]*"/)
    expect(out).toMatch(/class="[^"]*\bkey\b[^"]*"/)
    expect(out).not.toMatch(/\bfoo\b/)
    expect(out).not.toMatch(/\bbar\b/)
  })

  it("keeps classes matching known prefixes (hljs / language-* / lang-* / token / article-)", async () => {
    const out = await sanitizeHtml(
      '<pre class="hljs language-ts"><code class="token keyword">const</code></pre>',
    )
    expect(out).toContain("hljs")
    expect(out).toContain("language-ts")
    expect(out).toContain("token")
  })

  it("returns tags with empty/missing class attributes unchanged in shape", async () => {
    const noClass = await sanitizeHtml("<p>plain</p>")
    expect(noClass).toBe("<p>plain</p>")
    const emptyClass = await sanitizeHtml('<p class="">plain</p>')
    expect(emptyClass).toContain("<p>plain</p>")
    expect(emptyClass).not.toContain('class=""')
  })

  it("strips the class attribute entirely when every class was filtered out", async () => {
    const out = await sanitizeHtml('<p class="nope-1 nope-2">x</p>')
    expect(out).toContain("<p>x</p>")
    expect(out).not.toContain("class=")
  })
})

describe("sanitizeHtml — SVG passthrough", () => {
  it("keeps SVG tags and their classes unchanged (Mermaid internal class names)", async () => {
    const input =
      '<svg class="mermaid"><g class="node flowchart-label"><path class="edge-path" d="M0 0"/></g></svg>'
    const out = await sanitizeHtml(input)
    expect(out).toContain('class="mermaid"')
    expect(out).toContain('class="node flowchart-label"')
    expect(out).toContain('class="edge-path"')
  })

  it("preserves camelCase SVG attributes (viewBox / preserveAspectRatio / markerWidth)", async () => {
    const input =
      '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"><marker markerWidth="5" markerHeight="5"></marker></svg>'
    const out = await sanitizeHtml(input)
    expect(out).toContain('viewBox="0 0 100 100"')
    expect(out).toContain('preserveAspectRatio="xMidYMid meet"')
    expect(out).toContain('markerWidth="5"')
  })
})

describe("sanitizeHtml — removeExtraWhitespaceInParagraphs", () => {
  it("trims leading and trailing whitespace inside <p>", async () => {
    const out = await sanitizeHtml("<p>   \n  hello  \n   </p>")
    expect(out).toContain("<p>hello</p>")
  })

  it("collapses consecutive blank lines to a single newline inside <p>", async () => {
    const out = await sanitizeHtml("<p>line1\n\n\n\nline2</p>")
    expect(out).toMatch(/<p>line1\nline2<\/p>/)
  })

  it("preserves attributes on the <p> tag while cleaning whitespace", async () => {
    const out = await sanitizeHtml('<p class="lead">  hello  </p>')
    expect(out).toMatch(/<p class="lead">hello<\/p>/)
  })
})

describe("sanitizeHtml — addSecureRelToLinks", () => {
  it("adds rel='noopener noreferrer' to target='_blank' anchors without rel", async () => {
    const out = await sanitizeHtml('<a href="https://example.com" target="_blank">link</a>')
    expect(out).toMatch(/rel=["']noopener noreferrer["']/)
  })

  it("appends missing values to existing rel without duplicating", async () => {
    const out = await sanitizeHtml(
      '<a href="https://example.com" target="_blank" rel="nofollow">x</a>',
    )
    // All three should be present, each once.
    const relMatch = out.match(/rel=["']([^"']+)["']/)
    expect(relMatch).not.toBeNull()
    const rel = (relMatch as RegExpMatchArray)[1]
    expect(rel.split(/\s+/)).toEqual(
      expect.arrayContaining(["nofollow", "noopener", "noreferrer"]),
    )
    // No duplicates.
    expect(rel.split(/\s+/).length).toBe(new Set(rel.split(/\s+/)).size)
  })

  it("does not duplicate values when noopener/noreferrer are already present", async () => {
    const out = await sanitizeHtml(
      '<a href="https://example.com" target="_blank" rel="noopener noreferrer">x</a>',
    )
    const relMatch = out.match(/rel=["']([^"']+)["']/)
    expect(relMatch).not.toBeNull()
    const rel = (relMatch as RegExpMatchArray)[1]
    const parts = rel.split(/\s+/)
    expect(parts.filter((p) => p === "noopener").length).toBe(1)
    expect(parts.filter((p) => p === "noreferrer").length).toBe(1)
  })

  it("leaves anchors without target='_blank' untouched", async () => {
    const out = await sanitizeHtml('<a href="https://example.com">x</a>')
    expect(out).not.toMatch(/rel=/)
  })
})
