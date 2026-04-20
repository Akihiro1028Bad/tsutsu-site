import { describe, it, expect, beforeAll, afterAll, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import React from "react"

import HomeFooter from "@/components/home/HomeFooter"

const FIXED_YEAR = 2031

beforeAll(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(`${FIXED_YEAR}-06-01T00:00:00Z`))
})

afterAll(() => {
  vi.useRealTimers()
})

describe("Phase 2: HomeFooter — content & a11y", () => {
  it("exposes a contentinfo landmark", () => {
    render(<HomeFooter />)
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
  })

  it("renders the editorial brand mark", () => {
    render(<HomeFooter />)
    const footer = screen.getByRole("contentinfo")
    // Exact match resolves to the <em>tsutsu</em> brand glyph, sidestepping
    // the copyright sentence in the meta row.
    expect(within(footer).getByText("tsutsu")).toBeInTheDocument()
  })

  it("renders the Site column links (About, Works, Services, Notes)", () => {
    render(<HomeFooter />)
    const footer = screen.getByRole("contentinfo")
    expect(
      within(footer).getByRole("link", { name: /^about$/i })
    ).toHaveAttribute("href", "#about")
    expect(
      within(footer).getByRole("link", { name: /^works$/i })
    ).toHaveAttribute("href", "#works")
    expect(
      within(footer).getByRole("link", { name: /^services$/i })
    ).toHaveAttribute("href", "#services")
    expect(
      within(footer).getByRole("link", { name: /^notes$/i })
    ).toHaveAttribute("href", "#notes")
  })

  it("renders Social column links (X, GitHub, Zenn)", () => {
    render(<HomeFooter />)
    const footer = screen.getByRole("contentinfo")
    expect(
      within(footer).getByRole("link", { name: /x.*twitter/i })
    ).toBeInTheDocument()
    expect(
      within(footer).getByRole("link", { name: /github/i })
    ).toBeInTheDocument()
    expect(within(footer).getByRole("link", { name: /zenn/i })).toBeInTheDocument()
  })

  it("renders Contact column links (mailto and form anchor)", () => {
    render(<HomeFooter />)
    const footer = screen.getByRole("contentinfo")
    const mail = within(footer).getByRole("link", { name: /hello@tsutsu\.dev/i })
    expect(mail).toHaveAttribute("href", expect.stringMatching(/^mailto:/))
    expect(
      within(footer).getByRole("link", { name: /問い合わせ|contact/i })
    ).toHaveAttribute("href", "#contact")
  })

  it("renders the current year in the copyright meta row", () => {
    render(<HomeFooter />)
    expect(screen.getByText(new RegExp(`© ${FIXED_YEAR}`))).toBeInTheDocument()
  })
})
