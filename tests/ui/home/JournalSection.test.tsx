import { describe, it, expect, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import React from "react"

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

import JournalSection from "@/components/home/JournalSection"
import type {
  JournalBlogItem,
  JournalNewsItem,
} from "@/lib/home/adapters"

const news: JournalNewsItem[] = [
  {
    id: "n1",
    title: "新サイトを公開しました。",
    dateDisplay: "2026.03.15",
    kind: "Site",
    href: "/announcements/n1",
  },
  {
    id: "n2",
    title: "独立しました。",
    dateDisplay: "2026.02.01",
    kind: "Career",
    href: "/announcements/n2",
  },
]

const blog: JournalBlogItem[] = [
  {
    id: "b1",
    title: "Next.js App Routerで画面状態をURLに戻す設計",
    dateDisplay: "2026.03.01",
    category: "Frontend",
    href: "/blog/next-app-router",
  },
  {
    id: "b2",
    title: "未経験からエンジニア最初の半年",
    dateDisplay: "2026.02.10",
    category: "Career",
    href: "/blog/first-half-year",
  },
]

describe("Phase 5: JournalSection — News + Blog fused editorial block", () => {
  it("anchors at #notes as a section element", () => {
    render(<JournalSection newsItems={news} blogItems={blog} />)
    const section = document.getElementById("notes")
    expect(section).not.toBeNull()
    expect(section?.tagName).toBe("SECTION")
  })

  it("renders the editorial section head (04 / Journal.)", () => {
    render(<JournalSection newsItems={news} blogItems={blog} />)
    expect(
      screen.getByRole("heading", { level: 2, name: /journal\./i })
    ).toBeInTheDocument()
    expect(screen.getByText(/^04$/)).toBeInTheDocument()
  })

  it("renders the News. label group", () => {
    render(<JournalSection newsItems={news} blogItems={blog} />)
    const newsGroup = document.querySelector(".journal__news") as HTMLElement
    expect(within(newsGroup).getByText(/News\./i)).toBeInTheDocument()
    expect(within(newsGroup).getByText(/お知らせ/)).toBeInTheDocument()
  })

  it("renders every news item with its date, kind, title, and link", () => {
    render(<JournalSection newsItems={news} blogItems={blog} />)
    const newsGroup = document.querySelector(".journal__news") as HTMLElement
    for (const n of news) {
      expect(within(newsGroup).getByText(n.dateDisplay)).toBeInTheDocument()
      expect(within(newsGroup).getByText(n.kind)).toBeInTheDocument()
      const link = within(newsGroup).getByRole("link", {
        name: new RegExp(n.title),
      })
      expect(link).toHaveAttribute("href", n.href)
    }
  })

  it("renders the Blog. label group", () => {
    render(<JournalSection newsItems={news} blogItems={blog} />)
    const blogGroup = document.querySelector(".journal__blog") as HTMLElement
    expect(within(blogGroup).getByText(/Blog\./i)).toBeInTheDocument()
    expect(within(blogGroup).getByText(/ブログ/)).toBeInTheDocument()
  })

  it("renders every blog item with its date, category, title, and link", () => {
    render(<JournalSection newsItems={news} blogItems={blog} />)
    const blogGroup = document.querySelector(".journal__blog") as HTMLElement
    for (const b of blog) {
      expect(within(blogGroup).getByText(b.dateDisplay)).toBeInTheDocument()
      expect(within(blogGroup).getByText(b.category)).toBeInTheDocument()
      const link = within(blogGroup).getByRole("link", {
        name: new RegExp(b.title),
      })
      expect(link).toHaveAttribute("href", b.href)
    }
  })

  it("wraps the Journal body in RevealOnScroll", () => {
    render(<JournalSection newsItems={news} blogItems={blog} />)
    expect(screen.getByTestId("reveal-wrapper")).toBeInTheDocument()
  })

  it("shows an empty-state placeholder for the News list when news is empty", () => {
    render(<JournalSection newsItems={[]} blogItems={blog} />)
    expect(screen.getByTestId("news-empty")).toBeInTheDocument()
  })

  it("shows an empty-state placeholder for the Blog list when blog is empty", () => {
    render(<JournalSection newsItems={news} blogItems={[]} />)
    expect(screen.getByTestId("blog-empty")).toBeInTheDocument()
  })
})
