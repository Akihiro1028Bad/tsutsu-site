'use client'

import { motion } from 'framer-motion'
import {
  Clock,
  DollarSign,
  Phone,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

import { SECTION_IDS, type Benefit } from '@/lib/types/mens-esthe-service'
import { useIsMobile } from '@/components/MensEstheService/useIsMobile'
import { Reveal } from '@/components/MensEstheService/Reveal'

type BenefitsSectionProps = {
  benefits: Benefit[]
}

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Clock,
  TrendingUp,
  Phone,
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  const isMobile = useIsMobile()

  return (
    <section
      id={SECTION_IDS.benefits}
      aria-label="選ばれる理由"
      className="relative py-20 md:py-28"
    >
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        {isMobile ? (
          <Reveal className="mb-12 max-w-3xl" variant="slideUp">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              選ばれる理由
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
              メンズエステ店の経営者・運営者の皆様に選ばれる理由をご紹介します。
            </p>
          </Reveal>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 max-w-3xl"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              選ばれる理由
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
              メンズエステ店の経営者・運営者の皆様に選ばれる理由をご紹介します。
            </p>
          </motion.div>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] ?? Sparkles
            const CardBody = (
              <>
                {/* Decorative gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-100/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex flex-col gap-5">
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-slate-950">
                        {benefit.title}
                      </h3>
                      {benefit.highlight && (
                        <p className="mt-2 text-sm font-medium text-gold-600">
                          {benefit.highlight}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              </>
            )

            if (isMobile) {
              return (
                <Reveal
                  key={benefit.id}
                  as="article"
                  className="group relative overflow-hidden border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  variant="pop"
                  shine
                  delayMs={index * 90}
                >
                  {CardBody}
                </Reveal>
              )
            }

            return (
              <motion.article
                key={benefit.id}
                className="group relative overflow-hidden border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {CardBody}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
