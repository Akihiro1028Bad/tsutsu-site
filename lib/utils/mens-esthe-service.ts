import type {
  FAQItem,
  Feature,
  PortfolioItem,
  PricingCategory,
  PricingItem,
  ProcessStep,
  SectionId,
  ServiceInfo,
} from "@/lib/types/mens-esthe-service"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isPricingCategory(value: unknown): value is PricingCategory {
  return value === "initial" || value === "monthly" || value === "option"
}

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function validateServiceInfo(value: unknown): value is ServiceInfo {
  if (!isRecord(value)) return false

  return (
    isNonEmptyString(value.name) &&
    isNonEmptyString(value.catchphrase) &&
    isNonEmptyString(value.valueProposition) &&
    isNonEmptyString(value.description) &&
    isNonEmptyString(value.targetAudience)
  )
}

export function validateFeature(value: unknown): value is Feature {
  if (!isRecord(value)) return false

  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.name) &&
    isNonEmptyString(value.description) &&
    isNonEmptyString(value.icon)
  )
}

export function validatePricingItem(value: unknown): value is PricingItem {
  if (!isRecord(value)) return false

  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.name) &&
    isNonEmptyString(value.price) &&
    isNonEmptyString(value.description) &&
    isPricingCategory(value.category)
  )
}

export function validatePortfolioItem(value: unknown): value is PortfolioItem {
  if (!isRecord(value)) return false

  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.storeName) &&
    isNonEmptyString(value.siteUrl) &&
    isValidHttpUrl(value.siteUrl)
  )
}

export function handleExternalLinkError(url: string): string {
  if (!isValidHttpUrl(url)) {
    return "リンクURLが不正です。"
  }

  return "リンクを開けませんでした。ブラウザの設定をご確認ください。"
}

export function validateProcessStep(value: unknown): value is ProcessStep {
  if (!isRecord(value)) return false

  return (
    isNonEmptyString(value.id) &&
    typeof value.stepNumber === "number" &&
    Number.isFinite(value.stepNumber) &&
    value.stepNumber >= 1 &&
    isNonEmptyString(value.title) &&
    isNonEmptyString(value.description)
  )
}

export function validateFAQItem(value: unknown): value is FAQItem {
  if (!isRecord(value)) return false

  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.question) &&
    isNonEmptyString(value.answer)
  )
}

export function scrollToSection(sectionId: SectionId): boolean {
  const section = document.getElementById(sectionId)
  if (!section) return false

  section.scrollIntoView({ behavior: "smooth" })
  return true
}

export function generateStructuredData(input: { name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    provider: {
      "@type": "Organization",
      name: "tsutsu-site",
    },
  } as const
}

export function optimizeImageUrl(url: string, width: number): string {
  const normalizedWidth = Math.max(1, Math.floor(width))

  if (url.startsWith("http://") || url.startsWith("https://")) {
    const parsed = new URL(url)
    parsed.searchParams.set("w", String(normalizedWidth))
    return parsed.toString()
  }

  const base = "https://example.com"
  const parsed = new URL(url, base)
  parsed.searchParams.set("w", String(normalizedWidth))
  return `${parsed.pathname}${parsed.search}${parsed.hash}`
}
