import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string
    children: React.ReactNode
    [k: string]: unknown
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

import SectionShell from "@/components/home/business/SectionShell"

describe("事業サイト: SectionShell", () => {
  it("和文見出しと欧文キャプション、本文を描画する", () => {
    render(
      <SectionShell id="services" title="事業内容" caption="Services">
        <p>本文</p>
      </SectionShell>
    )
    expect(
      screen.getByRole("heading", { level: 2, name: "事業内容" })
    ).toBeInTheDocument()
    expect(screen.getByText("Services")).toBeInTheDocument()
    expect(screen.getByText("本文")).toBeInTheDocument()
  })

  it("アンカー用の id をセクションに付与する", () => {
    const { container } = render(
      <SectionShell id="works" title="実績" caption="Works">
        <p>本文</p>
      </SectionShell>
    )
    expect(container.querySelector("section#works")).not.toBeNull()
  })

  it("more を渡すと一覧リンクを描画する", () => {
    render(
      <SectionShell
        id="notes"
        title="お知らせ"
        caption="News"
        more={{ href: "/announcements", label: "一覧を見る" }}
      >
        <p>本文</p>
      </SectionShell>
    )
    expect(
      screen.getByRole("link", { name: "一覧を見る" })
    ).toHaveAttribute("href", "/announcements")
  })

  it("more を省略するとリンクを描画しない(無名リンクを作らない)", () => {
    render(
      <SectionShell id="about" title="事業者概要" caption="Profile">
        <p>本文</p>
      </SectionShell>
    )
    expect(screen.queryByRole("link")).toBeNull()
  })
})
