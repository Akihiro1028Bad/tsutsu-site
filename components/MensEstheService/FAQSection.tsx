"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useId, useState } from "react"

import { MENS_ESTHE_CONFIG } from "@/lib/constants/config"
import type { FAQItem } from "@/lib/types/mens-esthe-service"

type Props = {
  faqItems: FAQItem[]
}

export function FAQSection({ faqItems }: Props) {
  const baseId = useId()
  const [openItems, setOpenItems] = useState<Set<string>>(() => new Set())

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative py-20 md:py-28">
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
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.h2
          id="faq-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl"
        >
          よくある質問
        </motion.h2>

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openItems.has(item.id)
            const panelId = `${baseId}-faq-panel-${item.id}`

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-xl border border-slate-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-slate-50"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      toggleItem(item.id)
                    }
                  }}
                >
                  <span className="text-base font-semibold text-slate-950 md:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    aria-hidden
                    className={`h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="border-t border-slate-200 p-6 text-base leading-relaxed text-slate-700"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

