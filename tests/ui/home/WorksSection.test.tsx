import { describe, it, expect, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import React from "react"

// Bypass IntersectionObserver in RevealOnScroll so cards render their content
// synchronously during the test.
vi.mock("@/components/home/RevealOnScroll", () => ({
  default: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div data-testid="reveal-wrapper" className={className}>
      {children}
    </div>
  ),
}))

// next/image renders to a real <img> in tests, but we want a deterministic
// passthrough so we can assert on alt/src without dealing with image
// optimisation params.
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
    // eslint-disable-next-line @next/next/no-img-element -- mock for next/image in tests
    return <img src={resolvedSrc} alt={alt} {...rest} />
  },
}))

import WorksSection from "@/components/home/WorksSection"
import { WORKS_FEATURED, WORKS_INDEX_HREF } from "@/lib/home/works-data"

describe("Phase 3: WorksSection — editorial section head & feature card", () => {
  it("anchors the section at #works with a region landmark", () => {
    render(<WorksSection />)
    const region = document.getElementById("works")
    expect(region).not.toBeNull()
    expect(region?.tagName).toBe("SECTION")
  })

  it("renders the editorial section head (01 / Works.)", () => {
    render(<WorksSection />)
    const heading = screen.getByRole("heading", { level: 2, name: /works\./i })
    expect(heading).toBeInTheDocument()
    // Number prefix
    expect(screen.getByText(/^01$/)).toBeInTheDocument()
  })

  it("renders one article per featured work", () => {
    render(<WorksSection />)
    const articles = screen.getAllByRole("article")
    expect(articles).toHaveLength(WORKS_FEATURED.length)
  })

  it("each article shows the work index number, title, and image", () => {
    render(<WorksSection />)
    const articles = screen.getAllByRole("article")
    articles.forEach((article, i) => {
      const work = WORKS_FEATURED[i]
      // index number e.g. "001"
      expect(within(article).getByText(work.indexNumber)).toBeInTheDocument()
      // title (h3 contains the english title)
      const title = within(article).getByRole("heading", { level: 3 })
      expect(title.textContent).toContain(work.title)
      // image with alt
      const img = within(article).getByRole("img") as HTMLImageElement
      expect(img.alt).toBe(work.image.alt)
    })
  })

  it("renders all tech-stack chips for each work", () => {
    render(<WorksSection />)
    const articles = screen.getAllByRole("article")
    articles.forEach((article, i) => {
      const work = WORKS_FEATURED[i]
      for (const chip of work.stack) {
        expect(within(article).getByText(chip)).toBeInTheDocument()
      }
    })
  })

  it("renders the work's meta entries (Year / Status / Role / Client)", () => {
    render(<WorksSection />)
    const articles = screen.getAllByRole("article")
    articles.forEach((article, i) => {
      const work = WORKS_FEATURED[i]
      for (const m of work.meta) {
        expect(within(article).getByText(m.label)).toBeInTheDocument()
        expect(within(article).getByText(m.value)).toBeInTheDocument()
      }
    })
  })

  it("wraps each work card in the RevealOnScroll primitive", () => {
    render(<WorksSection />)
    const wrappers = screen.getAllByTestId("reveal-wrapper")
    expect(wrappers.length).toBeGreaterThanOrEqual(WORKS_FEATURED.length)
  })

  it("renders an index link pointing to the works archive", () => {
    render(<WorksSection />)
    const link = screen.getByRole("link", { name: /すべての制作事例|all works/i })
    expect(link).toHaveAttribute("href", WORKS_INDEX_HREF)
  })

  it("each work card links to its externalUrl with target=_blank and rel=noopener noreferrer", () => {
    render(<WorksSection />)
    const articles = screen.getAllByRole("article")
    articles.forEach((article, i) => {
      const work = WORKS_FEATURED[i]
      const anchor = article.closest("a")
      expect(anchor).not.toBeNull()
      expect(anchor).toHaveAttribute("href", work.externalUrl)
      expect(anchor).toHaveAttribute("target", "_blank")
      expect(anchor?.getAttribute("rel") ?? "").toMatch(/noopener/)
      expect(anchor?.getAttribute("rel") ?? "").toMatch(/noreferrer/)
    })
  })
})
