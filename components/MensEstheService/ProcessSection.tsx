"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Code, Mail, MessageSquare, Rocket, type LucideIcon } from "lucide-react"

import { MENS_ESTHE_CONFIG } from "@/lib/constants/config"
import type { ProcessStep } from "@/lib/types/mens-esthe-service"

const iconMap: Record<string, LucideIcon> = {
  Mail,
  MessageSquare,
  Code,
  Rocket,
}

type Props = {
  processSteps: ProcessStep[]
}

export function ProcessSection({ processSteps }: Props) {
  return (
    <section id="process" aria-labelledby="process-heading" className="relative py-20 md:py-28">
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
          id="process-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl"
        >
          導入までの流れ
        </motion.h2>

        <ol className="relative mt-12 grid gap-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon ? iconMap[step.icon] : undefined
            const isLast = index === processSteps.length - 1

            return (
              <li key={step.id} className="relative">
                {/* Connection Line */}
                {!isLast && (
                  <div
                    className="absolute left-6 top-16 h-full w-0.5 bg-gradient-to-b from-gold-400 to-gold-300"
                    aria-hidden="true"
                  />
                )}

                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group rounded-xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500 text-base font-semibold text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                      <span aria-label={`ステップ${step.stepNumber}`}>{step.stepNumber}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        {Icon ? (
                          <Icon
                            aria-hidden
                            className="h-6 w-6 text-gold-600 transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : null}
                        <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

