'use client'

import { motion } from 'framer-motion'

import { SECTION_IDS, type ServiceInfo } from '@/lib/types/mens-esthe-service'
import { scrollToSection } from '@/lib/utils/mens-esthe-service'

type HeroSectionProps = {
  serviceInfo: ServiceInfo
}

export function HeroSection({ serviceInfo }: HeroSectionProps) {
  const handleContactClick = () => {
    scrollToSection(SECTION_IDS.contact)
  }

  return (
    <motion.section
      id={SECTION_IDS.hero}
      role="banner"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden bg-white py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-light leading-tight tracking-tight text-slate-950 md:text-5xl">
            {serviceInfo.name}
          </h1>

          <p className="mt-4 text-sm font-medium tracking-[0.12em] text-slate-600">
            {serviceInfo.catchphrase}
          </p>

          <p className="mt-6 text-lg leading-relaxed text-slate-700 md:text-xl">
            {serviceInfo.valueProposition}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            {serviceInfo.description}
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleContactClick}
              aria-label="お問い合わせセクションへ移動"
              className="inline-flex items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
            >
              お問い合わせ
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
