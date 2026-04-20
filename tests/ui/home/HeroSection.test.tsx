import { describe, it, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"
import React from "react"

import HeroSection from "@/components/home/HeroSection"

describe("Phase 3: HeroSection — editorial first-fold", () => {
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

})
