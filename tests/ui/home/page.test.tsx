import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import React from "react"

vi.mock("@/lib/utils/announcement-server", () => ({
  getLatestAnnouncements: vi.fn(),
}))
vi.mock("@/lib/utils/blog-server", () => ({
  getLatestBlogPosts: vi.fn(),
}))

vi.mock("@/components/home/RevealOnScroll", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string | { src: string }; alt: string }) => {
    const resolved = typeof src === "string" ? src : src.src
    // eslint-disable-next-line @next/next/no-img-element -- mock for next/image in tests
    return <img src={resolved} alt={alt} />
  },
}))

import { getLatestAnnouncements } from "@/lib/utils/announcement-server"
import { getLatestBlogPosts } from "@/lib/utils/blog-server"

const announcements = [
  {
    id: "n1",
    title: "News headline",
    content: "",
    category: "Site",
    publishedAt: "2026-03-01T00:00:00.000Z",
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
    revisedAt: "2026-03-01T00:00:00.000Z",
  },
]

const blogPosts = [
  {
    id: "b1",
    title: "Blog headline",
    slug: "slug-one",
    content: "",
    category: "Frontend",
    publishedAt: "2026-02-01T00:00:00.000Z",
    createdAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-02-01T00:00:00.000Z",
    revisedAt: "2026-02-01T00:00:00.000Z",
  },
]

beforeEach(() => {
  cleanup()
  vi.mocked(getLatestAnnouncements).mockResolvedValue(announcements)
  vi.mocked(getLatestBlogPosts).mockResolvedValue(blogPosts)
})

describe("Phase 7: app/(home)/page.tsx — editorial integration", () => {
  it("fetches four announcements and four blog posts in parallel", async () => {
    const { default: Page } = await import("@/app/(home)/page")
    render(await Page())
    expect(getLatestAnnouncements).toHaveBeenCalledWith(4)
    expect(getLatestBlogPosts).toHaveBeenCalledWith(4)
  })

  it("renders the six editorial sections anchored at #top/#works/#services/#about/#notes/#contact", async () => {
    const { default: Page } = await import("@/app/(home)/page")
    render(await Page())
    expect(document.getElementById("top")).not.toBeNull()
    expect(document.getElementById("works")).not.toBeNull()
    expect(document.getElementById("services")).not.toBeNull()
    expect(document.getElementById("about")).not.toBeNull()
    expect(document.getElementById("notes")).not.toBeNull()
    expect(document.getElementById("contact")).not.toBeNull()
  })

  it("places the sections in design order: Works → Services → About → Journal → Contact", async () => {
    const { default: Page } = await import("@/app/(home)/page")
    render(await Page())
    const sections = Array.from(document.querySelectorAll("section"))
    const ids = sections.map((s) => s.id)
    expect(ids).toEqual(["works", "services", "about", "notes", "contact"])
  })

  it("wraps the editorial content in a single <main> landmark with one <h1>", async () => {
    const { default: Page } = await import("@/app/(home)/page")
    render(await Page())
    expect(screen.getAllByRole("main")).toHaveLength(1)
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
  })

  it("threads microCMS content into the Journal section", async () => {
    const { default: Page } = await import("@/app/(home)/page")
    render(await Page())
    expect(screen.getByText("News headline")).toBeInTheDocument()
    expect(screen.getByText("Blog headline")).toBeInTheDocument()
    // Ensure the slug-based href is correct (blog) and id-based href (news).
    expect(
      screen.getByRole("link", { name: /News headline/ })
    ).toHaveAttribute("href", "/announcements/n1")
    expect(
      screen.getByRole("link", { name: /Blog headline/ })
    ).toHaveAttribute("href", "/blog/slug-one")
  })

  it("exposes editorial metadata (title + description)", async () => {
    const { metadata } = await import("@/app/(home)/page")
    expect(metadata?.title).toBeTruthy()
    expect(metadata?.description).toBeTruthy()
  })
})
