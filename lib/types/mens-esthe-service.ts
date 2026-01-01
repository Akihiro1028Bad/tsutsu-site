export const SECTION_IDS = {
  hero: "hero",
  features: "features",
  pricing: "pricing",
  portfolio: "portfolio",
  process: "process",
  faq: "faq",
  contact: "contact",
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export type PricingCategory = "initial" | "monthly" | "option"

export type IconName = string

export type ImageAsset = {
  src: string
  alt: string
  width: number
  height: number
}

export type ServiceInfo = {
  name: string
  catchphrase: string
  valueProposition: string
  description: string
  targetAudience: string
}

export type Feature = {
  id: string
  name: string
  description: string
  icon: IconName
  image?: ImageAsset
}

export type PricingItem = {
  id: string
  name: string
  price: string
  description: string
  category: PricingCategory
}

export type PortfolioItem = {
  id: string
  storeName: string
  siteUrl: string
  thumbnailImage?: ImageAsset
}

export type ProcessStep = {
  id: string
  stepNumber: number
  title: string
  description: string
  icon?: IconName
}

export type FAQItem = {
  id: string
  question: string
  answer: string
}
