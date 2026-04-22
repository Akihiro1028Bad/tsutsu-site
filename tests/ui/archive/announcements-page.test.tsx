import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import React from "react"

vi.mock("@/lib/utils/announcement-server", () => ({
  getLatestAnnouncements: vi.fn(),
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
import type { Announcement } from "@/lib/types/announcement"

const announcements: Announcement[] = [
  {
    id: "a1",
    title: "新サイトを公開しました",
    content: "",
    category: "更新情報",
    publishedAt: "2026-03-01T00:00:00.000Z",
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
    revisedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "a2",
    title: "メンテナンスのお知らせ",
    content: "",
    category: "テクノロジー",
    publishedAt: "2026-02-10T00:00:00.000Z",
    createdAt: "2026-02-10T00:00:00.000Z",
    updatedAt: "2026-02-10T00:00:00.000Z",
    revisedAt: "2026-02-10T00:00:00.000Z",
  },
]

beforeEach(() => {
  cleanup()
  vi.mocked(getLatestAnnouncements).mockResolvedValue(announcements)
})

describe("app/(home)/announcements/page.tsx — archive listing", () => {
  it("fetches announcements with a high limit for archive use", async () => {
    const { default: Page } = await import("@/app/(home)/announcements/page")
    render(await Page())
    expect(getLatestAnnouncements).toHaveBeenCalled()
    const limit = vi.mocked(getLatestAnnouncements).mock.calls[0][0]
    expect(limit).toBeGreaterThanOrEqual(50)
  })

  it("renders a single main landmark and one h1 headline", async () => {
    const { default: Page } = await import("@/app/(home)/announcements/page")
    render(await Page())
    expect(screen.getAllByRole("main")).toHaveLength(1)
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
  })

  it("renders one row per announcement with correct detail-page href", async () => {
    const { default: Page } = await import("@/app/(home)/announcements/page")
    render(await Page())
    for (const a of announcements) {
      const link = screen.getByRole("link", { name: new RegExp(a.title) })
      expect(link).toHaveAttribute("href", `/announcements/${a.id}`)
    }
  })

  it("shows an empty-state message when there are no announcements", async () => {
    vi.mocked(getLatestAnnouncements).mockResolvedValue([])
    const { default: Page } = await import("@/app/(home)/announcements/page")
    render(await Page())
    expect(screen.getByText(/お知らせはまだありません/)).toBeInTheDocument()
  })

  it("applies data-style=modern on the main element for style parity with home", async () => {
    const { default: Page } = await import("@/app/(home)/announcements/page")
    render(await Page())
    const main = screen.getByRole("main")
    expect(main.getAttribute("data-style")).toBe("modern")
  })

  it("exposes SEO metadata", async () => {
    const { metadata } = await import("@/app/(home)/announcements/page")
    expect(metadata?.title).toBeTruthy()
    expect(metadata?.description).toBeTruthy()
    expect(metadata?.alternates?.canonical).toBe("/announcements")
  })
})
