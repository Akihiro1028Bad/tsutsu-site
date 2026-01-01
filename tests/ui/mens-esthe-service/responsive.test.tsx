import { render, screen } from "@testing-library/react"
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

vi.mock("@/components/MensEstheService/FAQSection", () => ({
  FAQSection: () => <section id="faq" />,
}))

vi.mock("@/components/MensEstheService/ContactCTA", () => ({
  ContactCTA: () => (
    <button type="button" aria-label="お問い合わせセクションへ移動">
      お問い合わせ
    </button>
  ),
}))

function setViewportWidth(width: number) {
  Object.defineProperty(window, "innerWidth", { value: width, configurable: true })
  window.dispatchEvent(new Event("resize"))
}

describe("Responsive", () => {
  it("TC-RESP-001: 375px表示が動作", () => {
    setViewportWidth(375)
    render(<MensEstheServicePage />)
    expect(screen.getByRole("banner")).toBeInTheDocument()
  })

  it("TC-RESP-002: 768px表示が動作", () => {
    setViewportWidth(768)
    render(<MensEstheServicePage />)
    expect(screen.getByRole("banner")).toBeInTheDocument()
  })

  it("TC-RESP-003: 1920px表示が動作", () => {
    setViewportWidth(1920)
    render(<MensEstheServicePage />)
    expect(screen.getByRole("banner")).toBeInTheDocument()
  })
})
