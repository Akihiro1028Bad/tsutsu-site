'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { MENS_ESTHE_CONFIG } from '@/lib/constants/config'
import { SECTION_IDS, type PricingItem } from '@/lib/types/mens-esthe-service'

import { ContactCTA } from '@/components/MensEstheService/ContactCTA'

type PricingSectionProps = {
  pricingItems: PricingItem[]
}

function byCategory(pricingItems: PricingItem[], category: PricingItem['category']) {
  return pricingItems.filter((item) => item.category === category)
}

export function PricingSection({ pricingItems }: PricingSectionProps) {
  const initialItems = byCategory(pricingItems, 'initial')
  const monthlyItems = byCategory(pricingItems, 'monthly')
  const optionItems = byCategory(pricingItems, 'option')

  return (
    <section id={SECTION_IDS.pricing} className="relative py-20 md:py-28">
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
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl"
        >
          料金
        </motion.h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group rounded-xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="text-lg font-semibold text-slate-950">初期費用</h3>
            <dl className="mt-6 space-y-5">
              {initialItems.map((item) => (
                <div key={item.id}>
                  <dt className="text-base font-medium text-slate-900">{item.name}</dt>
                  <dd className="mt-2 text-base text-slate-600">
                    <strong className="text-lg text-gold-600">{item.price}</strong>
                    <span className="ml-2">{item.description}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group rounded-xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="text-lg font-semibold text-slate-950">月額費用</h3>
            <dl className="mt-6 space-y-5">
              {monthlyItems.map((item) => (
                <div key={item.id}>
                  <dt className="text-base font-medium text-slate-900">{item.name}</dt>
                  <dd className="mt-2 text-base text-slate-600">
                    <strong className="text-lg text-gold-600">{item.price}</strong>
                    <span className="ml-2">{item.description}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="group rounded-xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="text-lg font-semibold text-slate-950">オプション</h3>
            <dl className="mt-6 space-y-5">
              {optionItems.map((item) => (
                <div key={item.id}>
                  <dt className="text-base font-medium text-slate-900">{item.name}</dt>
                  <dd className="mt-2 text-base text-slate-600">
                    <strong className="text-lg text-gold-600">{item.price}</strong>
                    <span className="ml-2">{item.description}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <div aria-labelledby={SECTION_IDS.pricing} className="mt-12">
          <ContactCTA />
        </div>
      </div>
    </section>
  )
}

