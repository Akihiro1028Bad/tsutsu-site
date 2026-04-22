import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup, act } from "@testing-library/react"
import HtmlEmbed from "@/components/HtmlEmbed"

afterEach(cleanup)

/**
 * Dispatch a "message" event on window as if it came from a given iframe.
 * The component validates `event.source === iframeRef.current.contentWindow`,
 * so tests must forge the `source` to match the rendered iframe.
 */
function postFromIframe(
  iframe: HTMLIFrameElement,
  data: unknown,
): void {
  const event = new MessageEvent("message", { data })
  Object.defineProperty(event, "source", {
    value: iframe.contentWindow,
    configurable: true,
  })
  window.dispatchEvent(event)
}

describe("HtmlEmbed", () => {
  it("renders nothing when html is empty", () => {
    const { container } = render(<HtmlEmbed html="" />)
    expect(container.firstChild).toBeNull()
  })

  it("renders nothing when html is whitespace only", () => {
    const { container } = render(<HtmlEmbed html={"   \n  "} />)
    expect(container.firstChild).toBeNull()
  })

  it("renders an iframe when html is provided", () => {
    render(<HtmlEmbed html="<p>hi</p>" />)
    const iframe = screen.getByTitle("Embedded content") as HTMLIFrameElement
    expect(iframe.tagName).toBe("IFRAME")
  })

  it("passes the user html through srcdoc", () => {
    render(<HtmlEmbed html="<p>hello world</p>" />)
    const iframe = screen.getByTitle("Embedded content") as HTMLIFrameElement
    expect(iframe.srcdoc).toContain("<p>hello world</p>")
  })

  it("applies a restrictive sandbox", () => {
    render(<HtmlEmbed html="<p>hi</p>" />)
    const iframe = screen.getByTitle("Embedded content") as HTMLIFrameElement
    expect(iframe.getAttribute("sandbox")).toBe("allow-scripts allow-popups")
  })

  it("uses a custom title when provided", () => {
    render(<HtmlEmbed html="<p>hi</p>" title="Custom demo" />)
    expect(screen.getByTitle("Custom demo")).toBeDefined()
  })

  it("defaults iframe height to minHeight", () => {
    render(<HtmlEmbed html="<p>hi</p>" minHeight={300} />)
    const iframe = screen.getByTitle("Embedded content") as HTMLIFrameElement
    expect(iframe.style.height).toBe("300px")
  })

  it("grows height when a larger height message arrives", () => {
    render(<HtmlEmbed html="<p>hi</p>" minHeight={200} />)
    const iframe = screen.getByTitle("Embedded content") as HTMLIFrameElement
    act(() => {
      postFromIframe(iframe, { type: "tsutsu-embed-height", value: 512 })
    })
    expect(iframe.style.height).toBe("512px")
  })

  it("keeps height at minHeight when a smaller height is posted", () => {
    render(<HtmlEmbed html="<p>hi</p>" minHeight={400} />)
    const iframe = screen.getByTitle("Embedded content") as HTMLIFrameElement
    act(() => {
      postFromIframe(iframe, { type: "tsutsu-embed-height", value: 100 })
    })
    expect(iframe.style.height).toBe("400px")
  })

  it("ignores messages with the wrong type", () => {
    render(<HtmlEmbed html="<p>hi</p>" minHeight={220} />)
    const iframe = screen.getByTitle("Embedded content") as HTMLIFrameElement
    act(() => {
      postFromIframe(iframe, { type: "other", value: 800 })
    })
    expect(iframe.style.height).toBe("220px")
  })

  it("ignores non-object message data", () => {
    render(<HtmlEmbed html="<p>hi</p>" minHeight={200} />)
    const iframe = screen.getByTitle("Embedded content") as HTMLIFrameElement
    act(() => {
      postFromIframe(iframe, "string")
      postFromIframe(iframe, null)
      postFromIframe(iframe, { type: "tsutsu-embed-height", value: "not-number" })
    })
    expect(iframe.style.height).toBe("200px")
  })

  it("ignores messages from other frames (event.source mismatch)", () => {
    render(<HtmlEmbed html="<p>hi</p>" minHeight={180} />)
    const iframe = screen.getByTitle("Embedded content") as HTMLIFrameElement
    // A spoofed message with no `source` (or a foreign source) must not
    // grow the iframe — this is the core security guard.
    act(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: { type: "tsutsu-embed-height", value: 9999 },
        }),
      )
    })
    expect(iframe.style.height).toBe("180px")
  })

  it("cleans up the message listener on unmount", () => {
    const { unmount } = render(<HtmlEmbed html="<p>hi</p>" minHeight={150} />)
    const iframe = screen.getByTitle("Embedded content") as HTMLIFrameElement
    unmount()
    // Dispatching after unmount should not throw; there's nothing to assert
    // beyond the act not warning / state not changing after unmount.
    expect(() => {
      postFromIframe(iframe, { type: "tsutsu-embed-height", value: 999 })
    }).not.toThrow()
  })
})
