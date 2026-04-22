import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { act, fireEvent, render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"

// next/image mock: pass-through to <img> so alt/src can be asserted.
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...rest
  }: {
    src: string | { src: string }
    alt: string
    [k: string]: unknown
  }) => {
    const resolvedSrc = typeof src === "string" ? src : src.src
    // eslint-disable-next-line @next/next/no-img-element -- mock
    return <img src={resolvedSrc} alt={alt} {...rest} />
  },
}))

// next/navigation mock: usePathname() defaults to "/" (home) so existing
// tests see the home-page nav behaviour. Individual tests can override via
// vi.mocked(usePathname).mockReturnValue("...").
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}))

import { usePathname } from "next/navigation"
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
  vi.mocked(usePathname).mockReturnValue("/")
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

function placeSection(id: string) {
  const section = document.createElement("section")
  section.id = id
  document.body.appendChild(section)
  return section
}

function fireIntersection(section: HTMLElement) {
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
}

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

  it("renders the brand logo image inside the anchor", () => {
    render(<HomeNav />)
    const brand = screen.getByRole("link", { name: /tsutsu/i })
    const img = brand.querySelector("img") as HTMLImageElement | null
    expect(img).not.toBeNull()
    expect(img?.getAttribute("src")).toBe("/logo.png")
    expect(img?.getAttribute("alt")).toMatch(/tsutsu/i)
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

  it("uses the editorial .home-nav scope class", () => {
    render(<HomeNav />)
    const nav = screen.getByRole("navigation")
    expect(nav.className).toMatch(/home-nav/)
  })
})

describe("Phase 10: HomeNav — theme switching (C-3)", () => {
  it("starts with the light theme when no section is active", () => {
    render(<HomeNav />)
    const nav = screen.getByRole("navigation")
    expect(nav).toHaveAttribute("data-theme", "light")
  })

  it("switches to the dark theme when the Services section becomes active", () => {
    const services = placeSection("services")
    render(<HomeNav />)
    fireIntersection(services)
    const nav = screen.getByRole("navigation")
    expect(nav).toHaveAttribute("data-theme", "dark")
    services.remove()
  })

  it("stays on the light theme when a non-dark section is active", () => {
    const works = placeSection("works")
    render(<HomeNav />)
    fireIntersection(works)
    const nav = screen.getByRole("navigation")
    expect(nav).toHaveAttribute("data-theme", "light")
    works.remove()
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
    const section = placeSection("works")
    render(<HomeNav />)
    expect(lastCallback).not.toBeNull()
    expect(lastObserver?.observe).toHaveBeenCalledWith(section)
    fireIntersection(section)
    const worksLink = screen.getByRole("link", { name: /^works$/i })
    expect(worksLink).toHaveAttribute("aria-current", "true")
    section.remove()
  })

  it("disconnects the IntersectionObserver on unmount", () => {
    const section = placeSection("about")
    const { unmount } = render(<HomeNav />)
    expect(lastObserver?.disconnect).not.toHaveBeenCalled()
    unmount()
    expect(lastObserver?.disconnect).toHaveBeenCalledTimes(1)
    section.remove()
  })
})

describe("Phase 10: HomeNav — mobile disclosure (C-1)", () => {
  it("exposes a menu toggle button with aria-expanded=false initially", () => {
    render(<HomeNav />)
    const toggle = screen.getByRole("button", { name: /menu|メニュー/i })
    expect(toggle).toHaveAttribute("aria-expanded", "false")
    expect(toggle).toHaveAttribute("aria-controls")
  })

  it("opens the nav panel when the toggle is clicked", async () => {
    const user = userEvent.setup()
    render(<HomeNav />)
    const toggle = screen.getByRole("button", { name: /menu|メニュー/i })
    await user.click(toggle)
    expect(toggle).toHaveAttribute("aria-expanded", "true")
    const nav = screen.getByRole("navigation")
    expect(nav).toHaveAttribute("data-menu-open", "true")
  })

  it("closes the panel when a section link is clicked", async () => {
    const user = userEvent.setup()
    render(<HomeNav />)
    const toggle = screen.getByRole("button", { name: /menu|メニュー/i })
    await user.click(toggle)
    expect(toggle).toHaveAttribute("aria-expanded", "true")

    const aboutLink = screen.getByRole("link", { name: /^about$/i })
    await user.click(aboutLink)
    expect(toggle).toHaveAttribute("aria-expanded", "false")
  })

  it("closes the panel when Escape is pressed", async () => {
    const user = userEvent.setup()
    render(<HomeNav />)
    const toggle = screen.getByRole("button", { name: /menu|メニュー/i })
    await user.click(toggle)
    expect(toggle).toHaveAttribute("aria-expanded", "true")

    fireEvent.keyDown(document, { key: "Escape" })
    expect(toggle).toHaveAttribute("aria-expanded", "false")
  })

  it("ignores non-Escape keys", () => {
    render(<HomeNav />)
    const toggle = screen.getByRole("button", { name: /menu|メニュー/i })
    const initial = toggle.getAttribute("aria-expanded")
    fireEvent.keyDown(document, { key: "ArrowDown" })
    expect(toggle).toHaveAttribute("aria-expanded", initial!)
  })

  it("removes the keydown listener on unmount", async () => {
    const user = userEvent.setup()
    const { unmount } = render(<HomeNav />)
    const toggle = screen.getByRole("button", { name: /menu|メニュー/i })
    await user.click(toggle)
    unmount()
    // After unmount pressing Escape must not throw or update stale state.
    expect(() => fireEvent.keyDown(document, { key: "Escape" })).not.toThrow()
  })
})

describe("HomeNav — cross-page navigation (non-home pathnames)", () => {
  it("links the brand to '/' when viewed outside the home page", () => {
    vi.mocked(usePathname).mockReturnValue("/announcements")
    render(<HomeNav />)
    const brand = screen.getByRole("link", { name: /tsutsu/i })
    expect(brand).toHaveAttribute("href", "/")
  })

  it("rewrites each nav item's href to /#<id> when off-home", () => {
    vi.mocked(usePathname).mockReturnValue("/blog")
    render(<HomeNav />)
    const expectations = [
      { name: /^about$/i, href: "/#about" },
      { name: /^works$/i, href: "/#works" },
      { name: /^services$/i, href: "/#services" },
      { name: /^notes$/i, href: "/#notes" },
      { name: /^contact$/i, href: "/#contact" },
    ]
    for (const e of expectations) {
      expect(screen.getByRole("link", { name: e.name })).toHaveAttribute(
        "href",
        e.href
      )
    }
  })

  it("keeps hash-only hrefs when on the home page", () => {
    vi.mocked(usePathname).mockReturnValue("/")
    render(<HomeNav />)
    const brand = screen.getByRole("link", { name: /tsutsu/i })
    expect(brand).toHaveAttribute("href", "#top")
    expect(screen.getByRole("link", { name: /^about$/i })).toHaveAttribute(
      "href",
      "#about"
    )
  })
})
