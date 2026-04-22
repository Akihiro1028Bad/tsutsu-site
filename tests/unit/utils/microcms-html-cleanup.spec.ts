import { describe, it, expect } from "vitest"
import { cleanupMicroCmsHtml } from "@/lib/utils/microcms-html-cleanup"

describe("cleanupMicroCmsHtml", () => {
  it("strips trailing <br> inside headings", () => {
    const input = "<h2>Title<br></h2><p>body</p>"
    expect(cleanupMicroCmsHtml(input)).toBe("<h2>Title</h2><p>body</p>")
  })

  it("strips leading <br> inside headings", () => {
    const input = "<h2><br><br>Title</h2>"
    expect(cleanupMicroCmsHtml(input)).toBe("<h2>Title</h2>")
  })

  it("collapses repeated <br> in headings", () => {
    const input = "<h3><br><br>Title<br></h3>"
    expect(cleanupMicroCmsHtml(input)).toBe("<h3>Title</h3>")
  })

  it("removes empty <p></p>", () => {
    const input = "<p>one</p><p></p><p>two</p>"
    expect(cleanupMicroCmsHtml(input)).toBe("<p>one</p><p>two</p>")
  })

  it("removes <p> containing only <br>", () => {
    const input = "<p>one</p><p><br></p><p>two</p>"
    expect(cleanupMicroCmsHtml(input)).toBe("<p>one</p><p>two</p>")
  })

  it("removes <p> containing only multiple <br>", () => {
    const input = "<p>one</p><p><br><br><br></p><p>two</p>"
    expect(cleanupMicroCmsHtml(input)).toBe("<p>one</p><p>two</p>")
  })

  it("removes <p> containing only &nbsp;", () => {
    const input = "<p>one</p><p>&nbsp;</p><p>two</p>"
    expect(cleanupMicroCmsHtml(input)).toBe("<p>one</p><p>two</p>")
  })

  it("collapses 3+ consecutive <br> to a single <br>", () => {
    const input = "<p>one<br><br><br><br>two</p>"
    expect(cleanupMicroCmsHtml(input)).toBe("<p>one<br>two</p>")
  })

  it("demotes <h1> to <h2>", () => {
    const input = "<h1>Top</h1>"
    expect(cleanupMicroCmsHtml(input)).toBe("<h2>Top</h2>")
  })

  it("preserves attributes on h1 when demoting", () => {
    const input = '<h1 id="abc">Top</h1>'
    expect(cleanupMicroCmsHtml(input)).toBe('<h2 id="abc">Top</h2>')
  })

  it("demotes <h4> to <h3>", () => {
    const input = "<h4>Sub</h4>"
    expect(cleanupMicroCmsHtml(input)).toBe("<h3>Sub</h3>")
  })

  it("demotes <h5> to <h3>", () => {
    const input = "<h5>Sub</h5>"
    expect(cleanupMicroCmsHtml(input)).toBe("<h3>Sub</h3>")
  })

  it("preserves attributes on h4 when demoting", () => {
    const input = '<h4 class="note">Sub</h4>'
    expect(cleanupMicroCmsHtml(input)).toBe('<h3 class="note">Sub</h3>')
  })

  it("strips trailing <br> inside h4 then demotes", () => {
    const input = "<h4>Sub<br></h4>"
    expect(cleanupMicroCmsHtml(input)).toBe("<h3>Sub</h3>")
  })

  it("does not touch content inside <pre> blocks", () => {
    const input = "<pre><code>a<br><br><br>b</code></pre>"
    expect(cleanupMicroCmsHtml(input)).toBe(input)
  })

  it("preserves text that appears before a <pre> block and cleans only the text chunk", () => {
    const input = "<p>before<br><br><br>middle</p><pre><code>x<br><br><br>y</code></pre>"
    expect(cleanupMicroCmsHtml(input)).toBe(
      "<p>before<br>middle</p><pre><code>x<br><br><br>y</code></pre>"
    )
  })

  it("handles mixed clutter end-to-end", () => {
    const input =
      "<h3>Intro<br></h3><p>hi</p><p><br><br></p><h1><br>Section</h1><p>text<br><br><br>more</p>"
    expect(cleanupMicroCmsHtml(input)).toBe(
      "<h3>Intro</h3><p>hi</p><h2>Section</h2><p>text<br>more</p>"
    )
  })

  it("returns an empty string untouched", () => {
    expect(cleanupMicroCmsHtml("")).toBe("")
  })
})
