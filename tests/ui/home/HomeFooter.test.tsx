import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
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

// next/navigation mock — drives `usePathname()` so footer href generation
// can be exercised across home and non-home routes.
const pathnameMock = vi.fn<() => string>(() => "/")
vi.mock("next/navigation", () => ({
  usePathname: () => pathnameMock(),
}))

import HomeFooter from "@/components/home/HomeFooter"

const FIXED_YEAR = 2031

beforeAll(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(`${FIXED_YEAR}-06-01T00:00:00Z`))
})

afterAll(() => {
  vi.useRealTimers()
})

beforeEach(() => {
  pathnameMock.mockReturnValue("/")
})

describe("Phase 2: HomeFooter — content & a11y", () => {
  it("exposes a contentinfo landmark", () => {
    render(<HomeFooter />)
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
  })

  it("renders the brand logo image", () => {
    render(<HomeFooter />)
    const footer = screen.getByRole("contentinfo")
    const logo = within(footer).getByRole("img", { name: /tsutsu/i }) as HTMLImageElement
    expect(logo.getAttribute("src")).toBe("/logo.png")
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

  it("does not render a Social column (no SNS accounts)", () => {
    render(<HomeFooter />)
    const footer = screen.getByRole("contentinfo")
    // Social heading should not exist at all.
    expect(
      within(footer).queryByRole("heading", { name: /^social$/i })
    ).toBeNull()
    // Typical SNS link labels should not leak in.
    expect(
      within(footer).queryByRole("link", { name: /x.*twitter/i })
    ).toBeNull()
    expect(within(footer).queryByRole("link", { name: /^github$/i })).toBeNull()
    expect(within(footer).queryByRole("link", { name: /^zenn$/i })).toBeNull()
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

  it("prefixes section anchors with `/` when rendered outside the home route", () => {
    pathnameMock.mockReturnValue("/blog/some-slug")
    render(<HomeFooter />)
    const footer = screen.getByRole("contentinfo")
    expect(
      within(footer).getByRole("link", { name: /^about$/i })
    ).toHaveAttribute("href", "/#about")
    expect(
      within(footer).getByRole("link", { name: /^works$/i })
    ).toHaveAttribute("href", "/#works")
    expect(
      within(footer).getByRole("link", { name: /^services$/i })
    ).toHaveAttribute("href", "/#services")
    expect(
      within(footer).getByRole("link", { name: /^notes$/i })
    ).toHaveAttribute("href", "/#notes")
    expect(
      within(footer).getByRole("link", { name: /問い合わせ|contact/i })
    ).toHaveAttribute("href", "/#contact")
    // mailto link must not be route-rewritten.
    expect(
      within(footer).getByRole("link", { name: /hello@tsutsu\.dev/i })
    ).toHaveAttribute("href", "mailto:hello@tsutsu.dev")
  })

  it("uses h3 for column headings so the document doesn't skip heading levels", () => {
    render(<HomeFooter />)
    const footer = screen.getByRole("contentinfo")
    const h3s = within(footer).getAllByRole("heading", { level: 3 })
    const labels = h3s.map((h) => h.textContent)
    expect(labels).toEqual(expect.arrayContaining(["Site", "Contact"]))
    expect(labels).not.toContain("Social")
    // No stray h4/h5 in the footer
    expect(
      within(footer).queryAllByRole("heading", { level: 4 })
    ).toHaveLength(0)
    expect(
      within(footer).queryAllByRole("heading", { level: 5 })
    ).toHaveLength(0)
  })
})
