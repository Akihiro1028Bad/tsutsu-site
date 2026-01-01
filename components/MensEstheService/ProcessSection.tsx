"use client"

import { motion } from "framer-motion"
import { Code, Mail, MessageSquare, Rocket, type LucideIcon } from "lucide-react"

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
    <section id="process" aria-labelledby="process-heading" className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 id="process-heading" className="text-2xl font-bold">
          導入までの流れ
        </h2>

        <ol className="mt-6 grid gap-6">
          {processSteps.map((step) => {
            const Icon = step.icon ? iconMap[step.icon] : undefined

            return (
              <li key={step.id}>
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-lg border p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                      <span aria-label={`ステップ${step.stepNumber}`}>{step.stepNumber}</span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {Icon ? <Icon aria-hidden className="h-5 w-5 text-muted-foreground" /> : null}
                        <h3 className="text-base font-semibold">{step.title}</h3>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
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

