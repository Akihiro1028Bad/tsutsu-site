import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SectionNav } from "@/components/MensEstheService/SectionNav"

describe("SectionNav", () => {
  it("hero/features/pricing/portfolio/process/faq/contact へのリンクが存在する", () => {
    render(<SectionNav />)

    expect(screen.getByRole("link", { name: "トップ" })).toHaveAttribute("href", "#hero")
    expect(screen.getByRole("link", { name: "機能" })).toHaveAttribute("href", "#features")
    expect(screen.getByRole("link", { name: "料金" })).toHaveAttribute("href", "#pricing")
    expect(screen.getByRole("link", { name: "制作実績" })).toHaveAttribute("href", "#portfolio")
    expect(screen.getByRole("link", { name: "導入までの流れ" })).toHaveAttribute("href", "#process")
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "#faq")
    expect(screen.getByRole("link", { name: "お問い合わせ" })).toHaveAttribute("href", "#contact")
  })
})

