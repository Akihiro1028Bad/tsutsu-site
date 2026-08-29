import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import React from "react"

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element -- mock for next/image
    <img src={src} alt={alt} />
  ),
}))
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))
vi.mock("@/components/home/RevealOnScroll", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

const worksMock = vi.hoisted(() => ({ items: [] as unknown[] }))
vi.mock("@/lib/home/works-data", () => ({
  get WORKS_FEATURED() {
    return worksMock.items
  },
  WORKS_INDEX_HREF: "/works",
}))

import BusinessWorks from "@/components/home/business/BusinessWorks"

const work = {
  id: "w1",
  indexNumber: "001",
  title: "SAMPLE WORK.",
  summary: "サンプルの概要。",
  year: "2026",
  category: "Web / Brand",
  client: "サンプル株式会社",
  externalUrl: "https://example.com/",
  image: { src: "/works/sample.png", alt: "サンプル", width: 1200, height: 800 },
}

beforeEach(() => {
  cleanup()
  worksMock.items = [work]
})

describe("事業サイト: BusinessWorks", () => {
  it("実績の見出しと一覧リンクを描画する", () => {
    render(<BusinessWorks />)
    expect(
      screen.getByRole("heading", { level: 2, name: "実績" })
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "一覧を見る" })).toHaveAttribute(
      "href",
      "/works"
    )
  })

  it("実績の内容と外部リンクを描画する", () => {
    render(<BusinessWorks />)
    expect(screen.getByText("SAMPLE WORK.")).toBeInTheDocument()
    expect(screen.getByText("サンプルの概要。")).toBeInTheDocument()
    const ext = screen.getByRole("link", { name: /サイトを見る/ })
    expect(ext).toHaveAttribute("href", "https://example.com/")
    expect(ext).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("実績が0件のときは不在メッセージを出す", () => {
    worksMock.items = []
    render(<BusinessWorks />)
    expect(screen.getByText("実績は準備中です。")).toBeInTheDocument()
  })
})
