'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Bell,
  Calendar,
  CalendarCheck,
  CreditCard,
  Sparkles,
  UserCircle,
  Users,
  type LucideIcon,
} from 'lucide-react'

import { SECTION_IDS, type Feature } from '@/lib/types/mens-esthe-service'
import { useIsMobile } from '@/components/MensEstheService/useIsMobile'
import { Reveal } from '@/components/MensEstheService/Reveal'

type FeaturesSectionProps = {
  features: Feature[]
}

const iconMap: Record<string, LucideIcon> = {
  CalendarCheck,
  Users,
  UserCircle,
  CreditCard,
  Calendar,
  Bell,
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  const isMobile = useIsMobile()

  return (
    <section
      id={SECTION_IDS.features}
      aria-label="主な機能"
      className="relative py-20 md:py-28"
    >
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        {isMobile ? (
          <Reveal className="mb-12 max-w-3xl" variant="slideUp">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              主な機能
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
              メンズエステ店の運営に必要な情報を整理し、集客と問い合わせを後押しします。
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
              主な機能
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
              メンズエステ店の運営に必要な情報を整理し、集客と問い合わせを後押しします。
            </p>
          </motion.div>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? Sparkles
            const hasImage = !!feature.image
            const CardBody = hasImage && feature.image ? (
              <>
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-slate-950">
                        {feature.name}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-slate-950">
                    {feature.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            )

            const className = `group overflow-hidden border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              hasImage ? 'p-0' : 'p-8'
            }`

            if (isMobile) {
              return (
                <Reveal
                  key={feature.id}
                  as="article"
                  className={className}
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
                key={feature.id}
                className={className}
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
