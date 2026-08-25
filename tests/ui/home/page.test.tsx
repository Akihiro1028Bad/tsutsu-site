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
import type { Announcement } from "@/lib/types/announcement"

const announcements: Announcement[] = [
  {
    id: "n1",
    title: "News headline",
    content: "",
    category: "更新情報",
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

describe("事業サイト: app/(home)/page.tsx — 統合", () => {
  it("お知らせ3件とブログ4件を並行取得する", async () => {
    const { default: Page } = await import("@/app/(home)/page")
    render(await Page())
    expect(getLatestAnnouncements).toHaveBeenCalledWith(3)
    expect(getLatestBlogPosts).toHaveBeenCalledWith(4)
  })

  it("各アンカー #top/#services/#works/#notes/#about/#contact を持つ", async () => {
    const { default: Page } = await import("@/app/(home)/page")
    render(await Page())
    expect(document.getElementById("top")).not.toBeNull()
    expect(document.getElementById("works")).not.toBeNull()
    expect(document.getElementById("services")).not.toBeNull()
    expect(document.getElementById("about")).not.toBeNull()
    expect(document.getElementById("notes")).not.toBeNull()
    expect(document.getElementById("contact")).not.toBeNull()
  })

  it("事業サイトの並び 事業内容 → 実績 → お知らせ → ブログ → 事業者概要 → お問い合わせ", async () => {
    const { default: Page } = await import("@/app/(home)/page")
    render(await Page())
    const sections = Array.from(document.querySelectorAll("section"))
    const ids = sections.map((s) => s.id)
    expect(ids).toEqual(["services", "works", "notes", "blog", "about", "contact"])
  })

  it("main ランドマークは1つ、h1 も1つ", async () => {
    const { default: Page } = await import("@/app/(home)/page")
    render(await Page())
    expect(screen.getAllByRole("main")).toHaveLength(1)
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
  })

  it("microCMS のお知らせとブログを各セクションに流し込む", async () => {
    const { default: Page } = await import("@/app/(home)/page")
    render(await Page())
    expect(
      screen.getByRole("link", { name: /News headline/ })
    ).toHaveAttribute("href", "/announcements/n1")
    expect(
      screen.getByRole("link", { name: /Blog headline/ })
    ).toHaveAttribute("href", "/blog/slug-one")
  })

  it("お知らせ・ブログが0件のときは不在メッセージを出す", async () => {
    vi.mocked(getLatestAnnouncements).mockResolvedValue([])
    vi.mocked(getLatestBlogPosts).mockResolvedValue([])
    const { default: Page } = await import("@/app/(home)/page")
    render(await Page())
    expect(screen.getByText("現在お知らせはありません。")).toBeInTheDocument()
    expect(screen.getByText("記事はまだありません。")).toBeInTheDocument()
  })

  it("メタデータ(タイトル・説明)を公開する", async () => {
    const { metadata } = await import("@/app/(home)/page")
    expect(metadata?.title).toBeTruthy()
    expect(metadata?.description).toBeTruthy()
  })
})
