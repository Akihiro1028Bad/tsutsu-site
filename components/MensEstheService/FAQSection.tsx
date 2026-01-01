"use client"

import { useId, useState } from "react"

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
    <section id="faq" aria-labelledby="faq-heading" className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 id="faq-heading" className="text-2xl font-bold">
          よくある質問
        </h2>

        <div className="mt-6 space-y-3">
          {faqItems.map((item) => {
            const isOpen = openItems.has(item.id)
            const panelId = `${baseId}-faq-panel-${item.id}`

            return (
              <div key={item.id} className="rounded-lg border">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 p-4 text-left"
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
                  <span className="font-medium">{item.question}</span>
                  <span aria-hidden className="text-muted-foreground">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    className="border-t p-4 text-sm text-muted-foreground"
                  >
                    {item.answer}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

