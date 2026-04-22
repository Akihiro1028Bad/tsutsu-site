import type { Metadata } from 'next'

import Contact from '@/components/Contact'
import { BenefitsSection } from '@/components/MensEstheService/BenefitsSection'
import { ContactCTA } from '@/components/MensEstheService/ContactCTA'
import { FeaturesSection } from '@/components/MensEstheService/FeaturesSection'
import { FAQSection } from '@/components/MensEstheService/FAQSection'
import { FixedBackgroundWrapper } from '@/components/MensEstheService/FixedBackgroundWrapper'
import { HeroSection } from '@/components/MensEstheService/HeroSection'
import { PortfolioSection } from '@/components/MensEstheService/PortfolioSection'
import { PricingSection } from '@/components/MensEstheService/PricingSection'
import { ProcessSection } from '@/components/MensEstheService/ProcessSection'
import { SectionNav } from '@/components/MensEstheService/SectionNav'
import { StructuredData } from '@/components/MensEstheService/StructuredData'
import { serviceInfo, benefits, features, pricingItems, portfolioItems, processSteps, faqItems } from '@/app/(site)/services/mens-esthe/data'
import { generateStructuredData } from '@/lib/utils/mens-esthe-service'

export const metadata: Metadata = {
  title: 'メンズエステ店向けサイト制作 | tsutsu-site',
  description:
    'メンズエステ店向けに、集客と問い合わせに強いサービスページを既存パッケージで制作します。',
  openGraph: {
    title: 'メンズエステ店向けサイト制作',
    description:
      'メンズエステ店向けに、集客と問い合わせに強いサービスページを既存パッケージで制作します。',
    type: 'website',
  },
}

export default function MensEstheServicePage() {
  const structuredData = generateStructuredData({
    name: 'メンズエステ店向けサイト制作',
    description:
      'メンズエステ店向けに、集客と問い合わせに強いサービスページを既存パッケージで制作します。',
  })

  return (
    <main className="font-serif">
      <StructuredData data={structuredData} />
      <HeroSection serviceInfo={serviceInfo} />
      <FixedBackgroundWrapper>
        <SectionNav />
        <BenefitsSection benefits={benefits} />
        <FeaturesSection features={features} />
        <PricingSection pricingItems={pricingItems} />
        <PortfolioSection portfolioItems={portfolioItems} />
        <ProcessSection processSteps={processSteps} />
        <FAQSection faqItems={faqItems} />
        <ContactCTA label="お問い合わせ" />
        <Contact />
      </FixedBackgroundWrapper>
    </main>
  )
}
