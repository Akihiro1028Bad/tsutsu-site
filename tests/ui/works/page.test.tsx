import { describe, it, expect, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import React from "react"

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string | { src: string }; alt: string }) => {
    const resolved = typeof src === "string" ? src : src.src
    // eslint-disable-next-line @next/next/no-img-element -- mock for next/image
    return <img src={resolved} alt={alt} />
  },
}))

import WorksPage, { metadata } from "@/app/(home)/works/page"
import { WORKS_FEATURED } from "@/lib/home/works-data"

describe("Phase 9: /works — page head", () => {
  it("renders a single H1 with the editorial heading", () => {
    render(<WorksPage />)
    const h1s = screen.getAllByRole("heading", { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent).toMatch(/Works\./i)
  })

  it("shows the 'Index of Works' eyebrow", () => {
    render(<WorksPage />)
    expect(screen.getByText(/Index of Works/i)).toBeInTheDocument()
  })

  it("renders the Japanese subtitle", () => {
    render(<WorksPage />)
    expect(screen.getByText(/制作実績一覧/)).toBeInTheDocument()
  })

  it("shows the lead copy", () => {
    render(<WorksPage />)
    expect(
      screen.getByText(/携わった仕事の一覧|順次追加/)
    ).toBeInTheDocument()
  })
})

describe("Phase 9: /works — page meta row", () => {
  it("exposes a navigation breadcrumb with Home → Works", () => {
    render(<WorksPage />)
    const nav = screen.getByRole("navigation", { name: /breadcrumb/i })
    expect(
      within(nav).getByRole("link", { name: /home/i })
    ).toHaveAttribute("href", "/")
    expect(within(nav).getByText(/works/i)).toBeInTheDocument()
  })

  it("reflects the featured-work count in the tally", () => {
    render(<WorksPage />)
    // 01 Selected project for 1 work; the count should match WORKS_FEATURED length.
    const count = WORKS_FEATURED.length.toString().padStart(2, "0")
    const tally = document.querySelector(".tally") as HTMLElement
    expect(tally).not.toBeNull()
    expect(tally.textContent).toContain(count)
    expect(tally.textContent).toMatch(/Selected project/)
  })
})

describe("Phase 9: /works — index list", () => {
  it("renders one row per featured work", () => {
    render(<WorksPage />)
    const list = screen.getByRole("list", { name: /works index/i })
    // Count top-level <li> only — nested lists (e.g. stack chips) don't
    // belong to the works-index count.
    const items = list.querySelectorAll(":scope > li")
    expect(items).toHaveLength(WORKS_FEATURED.length)
  })

  it("each row shows index number, year, and category", () => {
    render(<WorksPage />)
    for (const w of WORKS_FEATURED) {
      expect(screen.getByText(w.indexNumber)).toBeInTheDocument()
      expect(screen.getByText(w.year)).toBeInTheDocument()
      expect(screen.getByText(w.category)).toBeInTheDocument()
    }
  })

  it("each row shows EN title and short JP summary", () => {
    render(<WorksPage />)
    for (const w of WORKS_FEATURED) {
      expect(screen.getByText(w.title)).toBeInTheDocument()
      expect(screen.getByText(w.summary)).toBeInTheDocument()
    }
  })

  it("each row shows the client and the 'Visit site' affordance", () => {
    render(<WorksPage />)
    for (const w of WORKS_FEATURED) {
      expect(screen.getByText(w.client)).toBeInTheDocument()
    }
    const visitLabels = screen.getAllByText(/Visit site/i)
    expect(visitLabels.length).toBeGreaterThanOrEqual(WORKS_FEATURED.length)
  })

  it("each row's anchor points to the externalUrl with target=_blank and rel=noreferrer", () => {
    render(<WorksPage />)
    for (const w of WORKS_FEATURED) {
      const links = screen.getAllByRole("link")
      const match = links.find(
        (a) => a.getAttribute("href") === w.externalUrl
      ) as HTMLAnchorElement
      expect(match).toBeDefined()
      expect(match).toHaveAttribute("target", "_blank")
      expect(match.getAttribute("rel")).toMatch(/noreferrer/)
    }
  })

  it("renders each row's image with the correct alt text", () => {
    render(<WorksPage />)
    for (const w of WORKS_FEATURED) {
      const img = screen.getByAltText(w.image.alt) as HTMLImageElement
      expect(img.getAttribute("src")).toContain("pickleball-hero")
    }
  })
})

describe("Phase 9: /works — coming soon block", () => {
  it("renders the 'Next works, coming' section", () => {
    render(<WorksPage />)
    const coming = screen.getByLabelText(/coming soon/i)
    expect(within(coming).getByText(/Next works, coming/i)).toBeInTheDocument()
    expect(within(coming).getByText(/現在進行中/)).toBeInTheDocument()
  })
})

describe("Phase 9: /works — metadata", () => {
  it("exposes editorial title and description", () => {
    expect(metadata?.title).toBeTruthy()
    expect(metadata?.description).toBeTruthy()
  })

  it("title contains the editorial Works label", () => {
    // metadata.title is a plain string in this project.
    expect(metadata.title).toMatch(/Works/i)
  })
})
