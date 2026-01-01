'use client'

import { motion } from 'framer-motion'
import { CalendarCheck, Sparkles, Users, type LucideIcon } from 'lucide-react'

import { SECTION_IDS, type Feature } from '@/lib/types/mens-esthe-service'

type FeaturesSectionProps = {
  features: Feature[]
}

const iconMap: Record<string, LucideIcon> = {
  CalendarCheck,
  Users,
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section
      id={SECTION_IDS.features}
      aria-label="主な機能"
      className="bg-white py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            主な機能
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            メンズエステ店の運営に必要な情報を整理し、集客と問い合わせを後押しします。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Sparkles
            return (
              <motion.article
                key={feature.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-slate-950">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

