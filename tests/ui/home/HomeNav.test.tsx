import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { act, render, screen, cleanup } from "@testing-library/react"
import React from "react"

import HomeNav from "@/components/home/HomeNav"

type ObserverInstance = {
  observe: ReturnType<typeof vi.fn>
  unobserve: ReturnType<typeof vi.fn>
  disconnect: ReturnType<typeof vi.fn>
  takeRecords: ReturnType<typeof vi.fn>
  root: null
  rootMargin: string
  thresholds: number[]
}

let lastObserver: ObserverInstance | null = null
let lastCallback: IntersectionObserverCallback | null = null
const OriginalIntersectionObserver = globalThis.IntersectionObserver

beforeEach(() => {
  lastObserver = null
  lastCallback = null
  globalThis.IntersectionObserver = vi
    .fn()
    .mockImplementation((cb: IntersectionObserverCallback) => {
      lastCallback = cb
      lastObserver = {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
        takeRecords: vi.fn(() => []),
        root: null,
        rootMargin: "",
        thresholds: [],
      }
      return lastObserver
    }) as unknown as typeof IntersectionObserver
})

afterEach(() => {
  cleanup()
  globalThis.IntersectionObserver = OriginalIntersectionObserver
})

describe("Phase 2: HomeNav — structural rendering", () => {
  it("renders a navigation landmark with an aria-label", () => {
    render(<HomeNav />)
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label")
  })

  it("renders the editorial brand anchor pointing to #top", () => {
    render(<HomeNav />)
    const brand = screen.getByRole("link", { name: /tsutsu/i })
    expect(brand).toHaveAttribute("href", "#top")
  })

  it("renders all five section anchors with the design's hrefs", () => {
    render(<HomeNav />)
    const expected = [
      { name: /^about$/i, href: "#about" },
      { name: /^works$/i, href: "#works" },
      { name: /^services$/i, href: "#services" },
      { name: /^notes$/i, href: "#notes" },
      { name: /^contact$/i, href: "#contact" },
    ]
    for (const e of expected) {
      const link = screen.getByRole("link", { name: e.name })
      expect(link).toHaveAttribute("href", e.href)
    }
  })

  it("renders a language indicator (JA / EN)", () => {
    render(<HomeNav />)
    expect(screen.getByText(/JA/)).toBeInTheDocument()
    expect(screen.getByText(/EN/)).toBeInTheDocument()
  })

  it("uses the editorial nav class so CSS can apply mix-blend-mode", () => {
    render(<HomeNav />)
    const nav = screen.getByRole("navigation")
    expect(nav.className).toMatch(/home-nav/)
  })
})

describe("Phase 2: HomeNav — scroll spy", () => {
  it("does not mark any link as current when no observed section is intersecting", () => {
    render(<HomeNav />)
    const links = screen.getAllByRole("link")
    for (const link of links) {
      expect(link).not.toHaveAttribute("aria-current", "true")
    }
  })

  it("marks the matching link aria-current='true' when its section reports intersecting", () => {
    // Place a section in the DOM so the observer has something to track.
    const section = document.createElement("section")
    section.id = "works"
    document.body.appendChild(section)

    render(<HomeNav />)

    expect(lastCallback).not.toBeNull()
    expect(lastObserver?.observe).toHaveBeenCalledWith(section)

    act(() => {
      lastCallback!(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
            target: section,
            boundingClientRect: section.getBoundingClientRect(),
            intersectionRect: section.getBoundingClientRect(),
            rootBounds: null,
            time: 0,
          } as IntersectionObserverEntry,
        ],
        lastObserver as unknown as IntersectionObserver
      )
    })

    const worksLink = screen.getByRole("link", { name: /^works$/i })
    expect(worksLink).toHaveAttribute("aria-current", "true")

    section.remove()
  })

  it("disconnects the IntersectionObserver on unmount", () => {
    const section = document.createElement("section")
    section.id = "about"
    document.body.appendChild(section)

    const { unmount } = render(<HomeNav />)
    expect(lastObserver?.disconnect).not.toHaveBeenCalled()
    unmount()
    expect(lastObserver?.disconnect).toHaveBeenCalledTimes(1)

    section.remove()
  })
})
