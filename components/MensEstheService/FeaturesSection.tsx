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

import { MENS_ESTHE_CONFIG } from '@/lib/constants/config'
import { SECTION_IDS, type Feature } from '@/lib/types/mens-esthe-service'

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
  return (
    <section
      id={SECTION_IDS.features}
      aria-label="主な機能"
      className="relative py-20 md:py-28"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={MENS_ESTHE_CONFIG.IMAGES.sections}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
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

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? Sparkles
            const hasImage = !!feature.image

            return (
              <motion.article
                key={feature.id}
                className={`group overflow-hidden border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  hasImage ? 'p-0' : 'p-8'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {hasImage ? (
                  // 画像あり: 縦型レイアウト
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
                  // 画像なし: 既存の横型レイアウト
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
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

