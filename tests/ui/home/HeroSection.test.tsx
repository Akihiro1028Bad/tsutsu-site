import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, within, cleanup } from "@testing-library/react"
import React from "react"

const { framerReducedMotion } = vi.hoisted(() => ({
  framerReducedMotion: { value: false as boolean },
}))

// Bypass framer-motion scroll + transform hooks in jsdom — the Hero depth
// animation is visual-only and not the concern of these structural tests.
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>(
    "framer-motion"
  )
  return {
    ...actual,
    useReducedMotion: () => framerReducedMotion.value,
    useScroll: () => ({
      scrollYProgress: { get: () => 0, on: () => () => {} },
    }),
    useTransform: () => 0,
  }
})

interface FakeMql {
  matches: boolean
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
}

function mockMatchMedia(map: Record<string, boolean>) {
  window.matchMedia = vi.fn((query: string): FakeMql => ({
    matches: map[query] === true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

import HeroSection from "@/components/home/HeroSection"

describe("Phase 3: HeroSection — editorial first-fold", () => {
  let originalMatchMedia: typeof window.matchMedia
  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    framerReducedMotion.value = false
  })
  afterEach(() => {
    window.matchMedia = originalMatchMedia
    cleanup()
  })

  it("renders a banner landmark anchored at #top", () => {
    render(<HeroSection />)
    const banner = screen.getByRole("banner")
    expect(banner).toHaveAttribute("id", "top")
  })

  it("renders a single H1 with the bilingual catchphrase", () => {
    render(<HeroSection />)
    const headings = screen.getAllByRole("heading", { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0].textContent).toMatch(/想い/)
    expect(headings[0].textContent).toMatch(/技術/)
    expect(headings[0].textContent).toMatch(/カタチ/)
  })

  it("emphasises 技術 inside an <em> so CSS can paint the accent overlay", () => {
    render(<HeroSection />)
    const heading = screen.getByRole("heading", { level: 1 })
    const em = within(heading).getByText("技術")
    expect(em.tagName).toBe("EM")
  })

  it("lists the four services in the inline subline", () => {
    render(<HeroSection />)
    const banner = screen.getByRole("banner")
    expect(banner.textContent).toMatch(/WEB/)
    expect(banner.textContent).toMatch(/アプリ/)
    expect(banner.textContent).toMatch(/AI/)
    expect(banner.textContent).toMatch(/学習|キャリア|開発支援/)
  })

  it("renders the supporting copy explaining the value prop", () => {
    render(<HeroSection />)
    const banner = screen.getByRole("banner")
    expect(banner.textContent).toMatch(/最新技術/)
    expect(banner.textContent).toMatch(/サポート/)
  })

  it("splits the title into three spans for stagger animation", () => {
    render(<HeroSection />)
    const heading = screen.getByRole("heading", { level: 1 })
    const lines = heading.querySelectorAll(".hero__main-line")
    expect(lines).toHaveLength(3)
    expect(lines[0].textContent).toMatch(/想いを/)
    expect(lines[1].textContent).toMatch(/技術で/)
    expect(lines[2].textContent).toMatch(/カタチに/)
  })

  it("renders a mobile-only scroll hint marked aria-hidden", () => {
    render(<HeroSection />)
    const banner = screen.getByRole("banner")
    const hint = banner.querySelector(".hero__scroll-hint")
    expect(hint).not.toBeNull()
    expect(hint).toHaveAttribute("aria-hidden", "true")
    expect(hint?.querySelector(".hero__scroll-hint__line")).not.toBeNull()
    const label = hint?.querySelector(".hero__scroll-hint__label")
    expect(label?.textContent).toMatch(/SCROLL/)
  })

  it("marks the depth sheet data-hero-depth='off' on touch / reduced-motion", () => {
    mockMatchMedia({ "(pointer: fine)": false })
    framerReducedMotion.value = false
    const { container } = render(<HeroSection />)
    const sheet = container.querySelector(".hero__grid") as HTMLElement
    expect(sheet.getAttribute("data-hero-depth")).toBe("off")
  })

  it("marks the depth sheet data-hero-depth='on' on desktop with motion allowed", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = false
    const { container } = render(<HeroSection />)
    const sheet = container.querySelector(".hero__grid") as HTMLElement
    expect(sheet.getAttribute("data-hero-depth")).toBe("on")
  })

  it("marks the depth sheet data-hero-depth='off' when reduced-motion is preferred", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = true
    const { container } = render(<HeroSection />)
    const sheet = container.querySelector(".hero__grid") as HTMLElement
    expect(sheet.getAttribute("data-hero-depth")).toBe("off")
  })

})
