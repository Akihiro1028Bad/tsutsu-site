'use client'

import { motion } from 'framer-motion'

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
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl mb-12"
        >
          料金
        </motion.h2>

        <div className="space-y-0">
          {/* 基本料金セクション（制作費と管理費を一緒に表示） */}
          {(initialItems.length > 0 || monthlyItems.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-10"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-8 md:text-3xl tracking-tight">
                基本料金
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {initialItems.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: itemIndex * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-lg font-semibold text-slate-900 md:text-xl leading-snug">
                          {item.name}
                        </h4>
                        <div className="text-3xl font-bold text-slate-900 md:text-4xl whitespace-nowrap flex-shrink-0">
                          {item.price}
                        </div>
                      </div>
                      <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {monthlyItems.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: (initialItems.length + itemIndex) * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-lg font-semibold text-slate-900 md:text-xl leading-snug">
                          {item.name}
                        </h4>
                        <div className="text-3xl font-bold text-slate-900 md:text-4xl whitespace-nowrap flex-shrink-0">
                          {item.price}
                        </div>
                      </div>
                      <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* オプションセクション */}
          {optionItems.length > 0 && (
            <>
              {(initialItems.length > 0 || monthlyItems.length > 0) && (
                <div className="mt-12 border-b border-slate-200" />
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="py-10"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-8 md:text-3xl tracking-tight">
                  オプション
                </h3>

                <div className="space-y-8">
                  {optionItems.map((item, itemIndex) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 + itemIndex * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-slate-900 mb-2 md:text-xl leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="text-3xl font-bold text-slate-900 md:text-4xl whitespace-nowrap">
                            {item.price}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>

        <div aria-labelledby={SECTION_IDS.pricing} className="mt-12">
          <ContactCTA />
        </div>
      </div>
    </section>
  )
}

