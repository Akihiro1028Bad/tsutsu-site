/**
 * Normalises the HTML that microCMS' rich-text editor produces so the
 * article-page styles can render cleanly.
 *
 * The editor tends to emit:
 *   - trailing / leading `<br>` inside headings
 *   - `<p><br></p>` and `<p>&nbsp;</p>` as visual spacers
 *   - long `<br><br><br><br>` runs inside paragraphs
 *   - `<h1>` embedded inside the body (should be `<h2>` since the page
 *     title is the real `<h1>`)
 *   - `<h4>` / `<h5>` from legacy entries — demote to `<h3>` so styles
 *     stay within the approved 2-level hierarchy (H2/H3)
 *
 * We leave anything inside `<pre>` blocks untouched so code listings
 * and Shiki output keep their exact layout.
 */
export function cleanupMicroCmsHtml(html: string): string {
  if (!html) {
    return ""
  }

  // 1. Split out <pre>...</pre> regions so the cleanup regexes below do
  //    not touch code blocks.
  const parts: Array<{ kind: "text" | "pre"; value: string }> = []
  const preRe = /<pre[\s\S]*?<\/pre>/gi
  let lastIndex = 0
  let found: RegExpExecArray | null
  while ((found = preRe.exec(html)) !== null) {
    if (found.index > lastIndex) {
      parts.push({ kind: "text", value: html.slice(lastIndex, found.index) })
    }
    parts.push({ kind: "pre", value: found[0] })
    lastIndex = found.index + found[0].length
  }
  if (lastIndex < html.length) {
    parts.push({ kind: "text", value: html.slice(lastIndex) })
  }

  const cleanText = (chunk: string): string => {
    let out = chunk

    // Strip leading / trailing <br> inside headings.
    out = out.replace(
      /<(h[1-6])([^>]*)>((?:\s*<br\s*\/?>)+)?([\s\S]*?)((?:<br\s*\/?>\s*)+)?<\/\1>/gi,
      (_m, tag, attrs, _lead, inner, _trail) => {
        const cleanedInner = inner
          .replace(/^(?:\s*<br\s*\/?>)+/i, "")
          .replace(/(?:<br\s*\/?>\s*)+$/i, "")
        return `<${tag}${attrs}>${cleanedInner}</${tag}>`
      }
    )

    // Remove empty paragraphs: <p></p>, <p><br></p>, <p>&nbsp;</p>, etc.
    out = out.replace(
      /<p(?:\s+[^>]*)?>(?:\s|<br\s*\/?>|&nbsp;|&#160;)*<\/p>/gi,
      ""
    )

    // Collapse runs of 2+ <br> to a single <br>.
    out = out.replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>")

    // Demote <h1> to <h2> (keep attributes).
    out = out.replace(/<h1(\s[^>]*)?>/gi, (_m, attrs) => `<h2${attrs ?? ""}>`)
    out = out.replace(/<\/h1>/gi, "</h2>")

    // Demote <h4> / <h5> to <h3> (keep attributes). Legacy entries may
    // still carry these; the editor toolbar now restricts to H2/H3.
    out = out.replace(/<h[45](\s[^>]*)?>/gi, (_m, attrs) => `<h3${attrs ?? ""}>`)
    out = out.replace(/<\/h[45]>/gi, "</h3>")

    return out
  }

  return parts
    .map((p) => (p.kind === "pre" ? p.value : cleanText(p.value)))
    .join("")
}
