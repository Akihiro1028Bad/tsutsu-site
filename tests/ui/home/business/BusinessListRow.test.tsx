import { describe, it, expect, vi } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import React from "react"

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string | { src: string }; alt: string }) => {
    const resolved = typeof src === "string" ? src : src.src
    // eslint-disable-next-line @next/next/no-img-element -- mock for next/image
    return <img src={resolved} alt={alt} />
  },
}))

import BusinessListRow from "@/components/home/business/BusinessListRow"

const BASE = {
  href: "/blog/example",
  dateDisplay: "2026.05.01",
  title: "記事タイトル",
  kind: "AI",
} as const

describe("事業サイト: BusinessListRow", () => {
  it("日付・タイトル・種別をリンクとして描画する", () => {
    render(<BusinessListRow {...BASE} />)
    const link = screen.getByRole("link", { name: /記事タイトル/ })
    expect(link).toHaveAttribute("href", "/blog/example")
    expect(link.textContent).toContain("2026.05.01")
    expect(link.textContent).toContain("AI")
  })

  it("アイキャッチがあれば画像を描画する", () => {
    render(
      <BusinessListRow
        {...BASE}
        image={{
          src: "/works/pickleball-hero.png",
          alt: "アイキャッチ",
          width: 1200,
          height: 800,
        }}
      />
    )
    const img = screen.getByRole("img", { name: "アイキャッチ" })
    expect(img.getAttribute("src")).toBe("/works/pickleball-hero.png")
  })

  it("アイキャッチが無ければ画像を描かず、枠だけ残して行を揃える", () => {
    const { container } = render(<BusinessListRow {...BASE} />)
    expect(screen.queryByRole("img")).toBeNull()
    const frame = container.querySelector(".biz-row__thumb") as HTMLElement
    expect(frame).not.toBeNull()
    expect(frame.getAttribute("data-empty")).toBe("true")
  })

  it("アイキャッチがあるときは枠を空扱いにしない", () => {
    cleanup()
    const { container } = render(
      <BusinessListRow
        {...BASE}
        image={{ src: "/a.png", alt: "a", width: 10, height: 10 }}
      />
    )
    const frame = container.querySelector(".biz-row__thumb") as HTMLElement
    expect(frame.getAttribute("data-empty")).toBe("false")
  })
})
