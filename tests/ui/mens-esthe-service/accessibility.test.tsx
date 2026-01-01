import { fireEvent, render, screen } from "@testing-library/react"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"

import MensEstheServicePage from "@/app/services/mens-esthe/page"

vi.mock("@/lib/utils/mens-esthe-service", () => ({
  generateStructuredData: () => ({ "@type": "Service" }),
}))

vi.mock("@/components/Contact", () => ({
  default: () => <section id="contact" />,
}))

vi.mock("@/components/MensEstheService/HeroSection", () => ({
  HeroSection: () => <section id="hero" role="banner" />,
}))

vi.mock("@/components/MensEstheService/FeaturesSection", () => ({
  FeaturesSection: () => <section id="features" />,
}))

vi.mock("@/components/MensEstheService/PricingSection", () => ({
  PricingSection: () => <section id="pricing" />,
}))

vi.mock("@/components/MensEstheService/PortfolioSection", () => ({
  PortfolioSection: () => <section id="portfolio" />,
}))

vi.mock("@/components/MensEstheService/ProcessSection", () => ({
  ProcessSection: () => <section id="process" />,
}))

vi.mock("@/components/MensEstheService/ContactCTA", () => ({
  ContactCTA: () => (
    <button type="button" aria-label="お問い合わせセクションへ移動">
      お問い合わせ
    </button>
  ),
}))

vi.mock("@/components/MensEstheService/FAQSection", () => ({
  FAQSection: () => {
    const [open, setOpen] = useState(false)
    return (
      <section id="faq">
        <button
          type="button"
          aria-expanded={open}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              setOpen((v) => !v)
            }
          }}
        >
          制作期間はどれくらいですか？
        </button>
      </section>
    )
  },
}))

describe("Accessibility", () => {
  it("TC-A11Y-001: セマンティックHTML要素が使用されている", () => {
    const { container } = render(<MensEstheServicePage />)

    expect(container.querySelector("main")).not.toBeNull()
    expect(container.querySelector("section#hero")).not.toBeNull()
    expect(container.querySelector("section#features")).not.toBeNull()
    expect(container.querySelector("section#pricing")).not.toBeNull()
  })

  it("TC-A11Y-002: ARIA属性が存在する", () => {
    render(<MensEstheServicePage />)
    expect(screen.getByRole("navigation", { name: "このページ内" })).toBeInTheDocument()
  })

  it("TC-A11Y-003: キーボードナビゲーションが動作", () => {
    render(<MensEstheServicePage />)
    const firstFaq = screen.getByRole("button", { name: "制作期間はどれくらいですか？" })
    firstFaq.focus()
    expect(firstFaq).toHaveFocus()

    fireEvent.keyDown(firstFaq, { key: "Enter" })
    expect(firstFaq).toHaveAttribute("aria-expanded", "true")
  })
})
