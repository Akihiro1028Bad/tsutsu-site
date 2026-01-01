"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowDown,
  CheckCircle,
  Code,
  FileText,
  Mail,
  MessageSquare,
  Rocket,
  type LucideIcon,
} from "lucide-react"

import { MENS_ESTHE_CONFIG } from "@/lib/constants/config"
import type { ProcessStep } from "@/lib/types/mens-esthe-service"

const iconMap: Record<string, LucideIcon> = {
  Mail,
  MessageSquare,
  FileText,
  Code,
  CheckCircle,
  Rocket,
}

type Props = {
  processSteps: ProcessStep[]
}

export function ProcessSection({ processSteps }: Props) {
  return (
    <section id="process" aria-labelledby="process-heading" className="relative py-20 md:py-32">
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
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2
            id="process-heading"
            className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl"
          >
            導入までの流れ
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 md:text-xl">
            6つのステップで、丁寧にサポートしながらサービスを開始できます
          </p>
        </motion.div>

        <ol className="relative mt-16 grid gap-12 md:gap-16">
          {processSteps.map((step, index) => {
            const Icon = step.icon ? iconMap[step.icon] : undefined
            const isLast = index === processSteps.length - 1

            return (
              <li key={step.id} className="relative">
                {/* Connection Line with Arrow */}
                {!isLast && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15 + 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute left-8 top-20 h-full w-1 origin-top bg-gradient-to-b from-gold-500 via-gold-400 to-gold-300 md:left-10 md:top-24"
                    aria-hidden="true"
                  >
                    {/* Arrow Icon at the bottom of the line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                      <div className="rounded-full bg-gold-500 p-1 shadow-lg">
                        <ArrowDown className="h-4 w-4 text-white" aria-hidden="true" />
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.article
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative border border-slate-200 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:p-8"
                >
                  {/* Decorative gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-100/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
                    {/* Step Number - Enhanced Design */}
                    <div className="flex shrink-0 items-center justify-center md:flex-col md:gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700 text-xl font-bold text-white shadow-xl ring-4 ring-gold-100 transition-all duration-300 group-hover:ring-gold-200 md:h-20 md:w-20 md:text-2xl"
                      >
                        <span aria-label={`ステップ${step.stepNumber}`}>{step.stepNumber}</span>
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gold-400 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4">
                        {Icon ? (
                          <motion.div
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700 shadow-md transition-all duration-300 group-hover:bg-gold-200"
                          >
                            <Icon aria-hidden="true" className="h-6 w-6" />
                          </motion.div>
                        ) : null}
                        <h3 className="text-xl font-bold tracking-tight text-slate-950 md:text-2xl">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-4 text-base leading-relaxed text-slate-600">
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

