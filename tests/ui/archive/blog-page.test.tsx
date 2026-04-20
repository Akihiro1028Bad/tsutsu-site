import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import React from "react"

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

import { getLatestBlogPosts } from "@/lib/utils/blog-server"

const posts = [
  {
    id: "b1",
    title: "Next.js App Router の基礎",
    slug: "next-app-router-basics",
    content: "",
    category: "Frontend",
    publishedAt: "2026-03-05T00:00:00.000Z",
    createdAt: "2026-03-05T00:00:00.000Z",
    updatedAt: "2026-03-05T00:00:00.000Z",
    revisedAt: "2026-03-05T00:00:00.000Z",
  },
  {
    id: "b2",
    title: "キャリア相談のための5つの問い",
    slug: "career-questions",
    content: "",
    category: "Career",
    publishedAt: "2026-02-15T00:00:00.000Z",
    createdAt: "2026-02-15T00:00:00.000Z",
    updatedAt: "2026-02-15T00:00:00.000Z",
    revisedAt: "2026-02-15T00:00:00.000Z",
  },
]

beforeEach(() => {
  cleanup()
  vi.mocked(getLatestBlogPosts).mockResolvedValue(posts)
})

describe("app/(home)/blog/page.tsx — archive listing", () => {
  it("fetches blog posts with a high limit for archive use", async () => {
    const { default: Page } = await import("@/app/(home)/blog/page")
    render(await Page())
    expect(getLatestBlogPosts).toHaveBeenCalled()
    const limit = vi.mocked(getLatestBlogPosts).mock.calls[0][0]
    expect(limit).toBeGreaterThanOrEqual(50)
  })

  it("renders a single main landmark and one h1 headline", async () => {
    const { default: Page } = await import("@/app/(home)/blog/page")
    render(await Page())
    expect(screen.getAllByRole("main")).toHaveLength(1)
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
  })

  it("renders one row per post with correct slug-based href", async () => {
    const { default: Page } = await import("@/app/(home)/blog/page")
    render(await Page())
    for (const p of posts) {
      const link = screen.getByRole("link", { name: new RegExp(p.title) })
      expect(link).toHaveAttribute("href", `/blog/${p.slug}`)
    }
  })

  it("shows an empty-state message when there are no posts", async () => {
    vi.mocked(getLatestBlogPosts).mockResolvedValue([])
    const { default: Page } = await import("@/app/(home)/blog/page")
    render(await Page())
    expect(screen.getByText(/記事はまだありません/)).toBeInTheDocument()
  })

  it("applies data-style=modern on the main element for style parity with home", async () => {
    const { default: Page } = await import("@/app/(home)/blog/page")
    render(await Page())
    const main = screen.getByRole("main")
    expect(main.getAttribute("data-style")).toBe("modern")
  })

  it("exposes SEO metadata", async () => {
    const { metadata } = await import("@/app/(home)/blog/page")
    expect(metadata?.title).toBeTruthy()
    expect(metadata?.description).toBeTruthy()
    expect(metadata?.alternates?.canonical).toBe("/blog")
  })
})
