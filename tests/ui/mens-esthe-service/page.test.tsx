import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

vi.mock("@/lib/utils/mens-esthe-service", () => ({
  generateStructuredData: () => ({ "@type": "Service" }),
}))

vi.mock("@/components/Contact", () => ({
  default: () => <section id="contact" />,
}))

vi.mock("@/components/MensEstheService/HeroSection", () => ({
  HeroSection: () => (
    <button type="button" aria-label="お問い合わせセクションへ移動">
      お問い合わせ
    </button>
  ),
}))

vi.mock("@/components/MensEstheService/FeaturesSection", () => ({
  FeaturesSection: () => <div />,
}))

vi.mock("@/components/MensEstheService/PricingSection", () => ({
  PricingSection: () => (
    <button type="button" aria-label="お問い合わせセクションへ移動">
      お問い合わせ
    </button>
  ),
}))

vi.mock("@/components/MensEstheService/PortfolioSection", () => ({
  PortfolioSection: () => <div />,
}))

vi.mock("@/components/MensEstheService/ProcessSection", () => ({
  ProcessSection: () => <div />,
}))

vi.mock("@/components/MensEstheService/FAQSection", () => ({
  FAQSection: () => <div />,
}))

vi.mock("@/components/MensEstheService/ContactCTA", () => ({
  ContactCTA: () => (
    <button type="button" aria-label="お問い合わせセクションへ移動">
      お問い合わせ
    </button>
  ),
}))

describe("MensEstheServicePage", () => {
  it("TC-SEO-003: title、description、OGPタグが存在する", async () => {
    const { metadata } = await import("@/app/(site)/services/mens-esthe/page")

    expect(metadata?.title).toBeTypeOf("string")
    expect(metadata?.description).toBeTypeOf("string")
    expect(metadata?.openGraph).toMatchObject({
      type: "website",
    })
  })

  it("TC-005-004: ページに3つのCTAが存在する", async () => {
    const { default: MensEstheServicePage } = await import("@/app/(site)/services/mens-esthe/page")

    render(<MensEstheServicePage />)
    expect(screen.getAllByRole("button", { name: "お問い合わせセクションへ移動" })).toHaveLength(3)
  })
})
