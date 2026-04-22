import { describe, it, expect, vi } from "vitest"

// `processHtmlWithCodeBlocks` calls into Shiki via `./code-highlight`. Stub
// the highlighter so we exercise the wrapping / replacement logic without
// invoking the full Shiki pipeline.
const { highlightCode } = vi.hoisted(() => ({
  highlightCode: vi.fn(),
}))

vi.mock("@/lib/utils/code-highlight", () => ({
  highlightCode,
}))

import {
  extractCodeBlocks,
  processHtmlWithCodeBlocks,
} from "@/lib/utils/html-processor"

describe("extractCodeBlocks — microCMS format (data-filename)", () => {
  it("returns an empty array when there are no code blocks", () => {
    expect(extractCodeBlocks("<p>plain text</p>")).toEqual([])
  })

  it("extracts a single code block with filename and language from class", () => {
    const html =
      '<div data-filename="greeting.js"><pre><code class="language-javascript">const x = 1;</code></pre></div>'
    const blocks = extractCodeBlocks(html)
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({
      id: "code-block-0",
      filename: "greeting.js",
      language: "javascript",
      code: "const x = 1;",
    })
    expect(blocks[0].originalHtml).toContain('data-filename="greeting.js"')
  })

  it("decodes HTML entities inside the code", () => {
    const html =
      '<div data-filename="t.ts"><pre><code>if (a &lt; b &amp;&amp; b &gt; 0) {}</code></pre></div>'
    const [block] = extractCodeBlocks(html)
    expect(block.code).toBe("if (a < b && b > 0) {}")
  })

  it("converts escaped \\n to real newlines (microCMS returns escaped strings)", () => {
    const html =
      '<div data-filename="t.ts"><pre><code>line1\\nline2\\nline3</code></pre></div>'
    const [block] = extractCodeBlocks(html)
    expect(block.code).toBe("line1\nline2\nline3")
  })

  it("assigns sequential IDs to multiple blocks", () => {
    const html = `
      <div data-filename="a.js"><pre><code>a</code></pre></div>
      <div data-filename="b.js"><pre><code>b</code></pre></div>
      <div data-filename="c.js"><pre><code>c</code></pre></div>
    `
    const blocks = extractCodeBlocks(html)
    expect(blocks.map((b) => b.id)).toEqual([
      "code-block-0",
      "code-block-1",
      "code-block-2",
    ])
  })

  it("trims whitespace around the filename", () => {
    const html =
      '<div data-filename="  spaced.ts  "><pre><code>x</code></pre></div>'
    expect(extractCodeBlocks(html)[0].filename).toBe("spaced.ts")
  })
})

describe("extractCodeBlocks — legacy format (class='code-block')", () => {
  it("returns no filename when the legacy block has no code-filename div", () => {
    const html =
      '<div class="code-block"><pre><code class="language-ruby">puts "hi"</code></pre></div>'
    const [block] = extractCodeBlocks(html)
    expect(block.filename).toBeUndefined()
    expect(block.language).toBe("ruby")
    expect(block.code).toBe('puts "hi"')
  })
})

describe("extractCodeBlocks — language detection fallbacks", () => {
  it("falls back to data-lang when class is not language-prefixed", () => {
    const html =
      '<div data-filename="t"><pre><code data-lang="python">print(1)</code></pre></div>'
    expect(extractCodeBlocks(html)[0].language).toBe("python")
  })

  it("falls back to lang='…' attribute", () => {
    const html =
      '<div data-filename="t"><pre><code lang="go">package main</code></pre></div>'
    expect(extractCodeBlocks(html)[0].language).toBe("go")
  })

  it("leaves language undefined when no language hint is present", () => {
    const html =
      '<div data-filename="t"><pre><code>plain code</code></pre></div>'
    expect(extractCodeBlocks(html)[0].language).toBeUndefined()
  })
})

describe("extractCodeBlocks — edge cases", () => {
  it("skips blocks that have no inner <pre><code>", () => {
    const html = '<div data-filename="x">no code body here</div>'
    expect(extractCodeBlocks(html)).toEqual([])
  })

  it("decodes numeric decimal entities (&#NN;) and hex entities (&#xNN;)", () => {
    const html =
      '<div data-filename="t"><pre><code>&#65;&#66;&#67;&#x44;&#x45;&#x46;</code></pre></div>'
    expect(extractCodeBlocks(html)[0].code).toBe("ABCDEF")
  })

  it("leaves unknown named entities in place (decodeHtmlEntities fallback branch)", () => {
    const html =
      '<div data-filename="t"><pre><code>&copy; &unknown;</code></pre></div>'
    // &copy; is not in the entities map and does not match the numeric regex,
    // so it falls through to the fallback branch and is returned verbatim.
    expect(extractCodeBlocks(html)[0].code).toBe("&copy; &unknown;")
  })
})

describe("processHtmlWithCodeBlocks", () => {
  it("returns the original html unchanged when there are no code blocks", async () => {
    highlightCode.mockReset()
    const input = "<p>no code here</p>"
    const out = await processHtmlWithCodeBlocks(input)
    expect(out).toBe(input)
    expect(highlightCode).not.toHaveBeenCalled()
  })

  it("replaces the original block with a wrapped highlighted block (with filename)", async () => {
    highlightCode.mockReset()
    highlightCode.mockResolvedValueOnce("<pre><code>HIGHLIGHTED</code></pre>")
    const input =
      '<p>before</p><div data-filename="a.ts"><pre><code class="language-typescript">const a = 1;</code></pre></div><p>after</p>'
    const out = await processHtmlWithCodeBlocks(input)
    expect(out).toContain('<div class="code-block">')
    expect(out).toContain('<div class="code-filename">a.ts</div>')
    expect(out).toContain("HIGHLIGHTED")
    expect(out).toContain("<p>before</p>")
    expect(out).toContain("<p>after</p>")
    expect(highlightCode).toHaveBeenCalledWith("const a = 1;", "typescript", "dark")
  })

  it("omits the filename div when the block has no filename (legacy path)", async () => {
    highlightCode.mockReset()
    highlightCode.mockResolvedValueOnce("<pre><code>OUT</code></pre>")
    const input =
      '<div class="code-block"><pre><code>x = 1</code></pre></div>'
    const out = await processHtmlWithCodeBlocks(input)
    expect(out).toContain('<div class="code-block">')
    expect(out).not.toContain('<div class="code-filename">')
  })

  it("escapes dangerous characters in the filename (XSS-in-filename defence)", async () => {
    highlightCode.mockReset()
    highlightCode.mockResolvedValueOnce("<pre><code>H</code></pre>")
    // A malicious filename containing literal angle-brackets + quote chars.
    // extractCodeBlocks captures the raw attribute value; wrapHighlightedCode
    // must escape it before re-inserting into the DOM so it never becomes a
    // live <script> tag.
    const input =
      "<div data-filename=\"<img src=x onerror='alert(1)'>\"><pre><code>x</code></pre></div>"
    const out = await processHtmlWithCodeBlocks(input)
    expect(out).toContain("<div class=\"code-filename\">")
    // The dangerous characters `<`, `>`, `'` must all be entity-encoded.
    expect(out).toContain("&lt;img src=x onerror=&#39;alert(1)&#39;&gt;")
    // Crucially: no live <img> tag escapes into the output.
    expect(out).not.toMatch(/<img\s/)
  })

  it("threads the theme argument through to highlightCode (default 'dark')", async () => {
    highlightCode.mockReset()
    highlightCode.mockResolvedValue("<pre><code>.</code></pre>")
    const input =
      '<div data-filename="t"><pre><code class="language-ts">x</code></pre></div>'
    await processHtmlWithCodeBlocks(input)
    expect(highlightCode).toHaveBeenLastCalledWith("x", "ts", "dark")
    await processHtmlWithCodeBlocks(input, "light")
    expect(highlightCode).toHaveBeenLastCalledWith("x", "ts", "light")
  })

  it("escapes every character covered by escapeHtml when in a filename", async () => {
    highlightCode.mockReset()
    highlightCode.mockResolvedValue("<pre><code>.</code></pre>")
    // Pass all 5 escapeHtml target chars (& < > ' — double-quote is excluded
    // because the regex requires double-quoted attribute values).
    const input =
      "<div data-filename=\"a&b<c>d'e\"><pre><code>x</code></pre></div>"
    const out = await processHtmlWithCodeBlocks(input)
    expect(out).toContain("<div class=\"code-filename\">")
    // Each metacharacter appears in its escaped form.
    expect(out).toContain("a&amp;b&lt;c&gt;d&#39;e")
  })
})
