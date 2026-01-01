import { describe, expect, it } from "vitest"

import {
  generateStructuredData,
  handleExternalLinkError,
  optimizeImageUrl,
  scrollToSection,
  validateFAQItem,
  validateFeature,
  validatePortfolioItem,
  validateProcessStep,
  validatePricingItem,
  validateServiceInfo,
} from "@/lib/utils/mens-esthe-service"
import { SECTION_IDS } from "@/lib/types/mens-esthe-service"

describe("SECTION_IDS", () => {
  it("exposes stable section ids", () => {
    expect(SECTION_IDS).toEqual({
      hero: "hero",
      features: "features",
      pricing: "pricing",
      portfolio: "portfolio",
      process: "process",
      faq: "faq",
      contact: "contact",
    })
  })
})

describe("validateServiceInfo", () => {
  it("TC-001-001: valid ServiceInfo returns true", () => {
    expect(
      validateServiceInfo({
        name: "メンズエステ店向けサイト制作",
        catchphrase: "集客に強いLP",
        valueProposition: "最短で魅力が伝わる構成と導線設計",
        description: "既存デザインに合わせてサービスページを制作します。",
        targetAudience: "メンズエステ店の経営者・運営者",
      }),
    ).toBe(true)
  })

  it("TC-001-001: invalid ServiceInfo returns false", () => {
    expect(validateServiceInfo(null)).toBe(false)
    expect(validateServiceInfo({})).toBe(false)
    expect(
      validateServiceInfo({
        name: "",
        catchphrase: "x",
        valueProposition: "x",
        description: "x",
        targetAudience: "x",
      }),
    ).toBe(false)
  })
})

describe("validateFeature", () => {
  it("TC-001-002: valid Feature returns true", () => {
    expect(
      validateFeature({
        id: "feature-01",
        name: "WEB予約受付",
        description: "予約導線を分かりやすく整理します。",
        icon: "CalendarCheck",
      }),
    ).toBe(true)
  })

  it("TC-001-002: invalid Feature returns false", () => {
    expect(validateFeature(undefined)).toBe(false)
    expect(validateFeature({})).toBe(false)
    expect(
      validateFeature({
        id: "",
        name: "n",
        description: "d",
        icon: "i",
      }),
    ).toBe(false)
  })
})

describe("validatePricingItem", () => {
  it("TC-001-003: valid PricingItem returns true", () => {
    expect(
      validatePricingItem({
        id: "pricing-01",
        name: "初期費用",
        price: "¥100,000〜",
        description: "構成設計〜実装まで",
        category: "initial",
      }),
    ).toBe(true)
  })

  it("TC-001-003: invalid PricingItem returns false", () => {
    expect(validatePricingItem("nope")).toBe(false)
    expect(validatePricingItem({})).toBe(false)
    expect(
      validatePricingItem({
        id: "pricing-01",
        name: "初期費用",
        price: "¥100,000〜",
        description: "構成設計〜実装まで",
        category: "unknown",
      }),
    ).toBe(false)
  })
})

describe("validatePortfolioItem", () => {
  it("TC-002-001: valid PortfolioItem returns true", () => {
    expect(
      validatePortfolioItem({
        id: "portfolio-01",
        storeName: "サンプル店舗A",
        siteUrl: "https://example.com/",
      }),
    ).toBe(true)
  })

  it("TC-002-001: invalid PortfolioItem returns false", () => {
    expect(validatePortfolioItem(null)).toBe(false)
    expect(validatePortfolioItem({})).toBe(false)
    expect(
      validatePortfolioItem({
        id: "portfolio-01",
        storeName: "",
        siteUrl: "https://example.com/",
      }),
    ).toBe(false)
    expect(
      validatePortfolioItem({
        id: "portfolio-01",
        storeName: "サンプル店舗A",
        siteUrl: "not-a-url",
      }),
    ).toBe(false)
  })
})

describe("handleExternalLinkError", () => {
  it("TC-002-002: invalid url returns message", () => {
    expect(handleExternalLinkError("not-a-url")).toBeTypeOf("string")
  })

  it("TC-002-002: valid url returns message", () => {
    expect(handleExternalLinkError("https://example.com/")).toBeTypeOf("string")
  })
})

describe("validateProcessStep", () => {
  it("TC-003-001: valid ProcessStep returns true", () => {
    expect(
      validateProcessStep({
        id: "step-01",
        stepNumber: 1,
        title: "ヒアリング",
        description: "現状とゴールを整理します。",
        icon: "MessageSquare",
      }),
    ).toBe(true)
  })

  it("TC-003-001: invalid ProcessStep returns false", () => {
    expect(validateProcessStep(null)).toBe(false)
    expect(validateProcessStep({})).toBe(false)
    expect(
      validateProcessStep({
        id: "step-01",
        stepNumber: 0,
        title: "ヒアリング",
        description: "現状とゴールを整理します。",
      }),
    ).toBe(false)
    expect(
      validateProcessStep({
        id: "",
        stepNumber: 1,
        title: "ヒアリング",
        description: "現状とゴールを整理します。",
      }),
    ).toBe(false)
  })
})

describe("validateFAQItem", () => {
  it("TC-004-001: valid FAQItem returns true", () => {
    expect(
      validateFAQItem({
        id: "faq-01",
        question: "制作期間はどれくらいですか？",
        answer: "内容にもよりますが、通常は1〜2週間程度です。",
      }),
    ).toBe(true)
  })

  it("TC-004-001: invalid FAQItem returns false", () => {
    expect(validateFAQItem(null)).toBe(false)
    expect(validateFAQItem({})).toBe(false)
    expect(
      validateFAQItem({
        id: "",
        question: "q",
        answer: "a",
      }),
    ).toBe(false)
  })
})

describe("scrollToSection", () => {
  it("TC-005-001: missing element returns false", () => {
    expect(scrollToSection("contact")).toBe(false)
  })

  it("TC-005-001: existing element scrolls and returns true", () => {
    const contact = document.createElement("div")
    contact.id = "contact"
    const scrollIntoView = vi.fn()
    ;(contact as any).scrollIntoView = scrollIntoView
    document.body.appendChild(contact)

    expect(scrollToSection("contact")).toBe(true)
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" })

    contact.remove()
  })
})

describe("generateStructuredData", () => {
  it("TC-SEO-001: 有効なJSON-LD生成", () => {
    const data = generateStructuredData({
      name: "メンズエステ店向けサイト制作",
      description: "メンズエステ店向けにサービスページを制作します。",
    })

    expect(data).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "メンズエステ店向けサイト制作",
    })
  })
})

describe("optimizeImageUrl", () => {
  it("TC-PERF-001: 画像URL最適化", () => {
    expect(optimizeImageUrl("/images/hero.jpg", 800)).toBe("/images/hero.jpg?w=800")
    expect(optimizeImageUrl("/images/hero.jpg?foo=bar", 800)).toBe("/images/hero.jpg?foo=bar&w=800")
    expect(optimizeImageUrl("/images/hero.jpg?foo=bar&w=200", 800)).toBe("/images/hero.jpg?foo=bar&w=800")
  })

  it("TC-PERF-001: absolute url も最適化できる", () => {
    expect(optimizeImageUrl("https://cdn.example.com/hero.jpg", 640)).toBe(
      "https://cdn.example.com/hero.jpg?w=640",
    )
  })

  it("TC-PERF-001: widthが不正でも最低1に丸める", () => {
    expect(optimizeImageUrl("/images/hero.jpg", 0)).toBe("/images/hero.jpg?w=1")
  })
})
