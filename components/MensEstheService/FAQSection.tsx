"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react"

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
              <FAQItem
                key={item.id}
                item={item}
                index={index}
                isOpen={isOpen}
                panelId={panelId}
                onToggle={() => toggleItem(item.id)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

type FAQItemProps = {
  item: FAQItem
  index: number
  isOpen: boolean
  panelId: string
  onToggle: () => void
}

function FAQItem({
  item,
  index,
  isOpen,
  panelId,
  onToggle,
}: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)

  // 開閉状態が変わったときに高さを更新（DOM更新直後に実行）
  useLayoutEffect(() => {
    if (isOpen && contentRef.current) {
      // 開く時: 実際の高さを測定
      const contentHeight = contentRef.current.scrollHeight
      setHeight(contentHeight)
    } else if (!isOpen && contentRef.current) {
      // 閉じる時: 現在の高さを保持（exitアニメーションで使用）
      // AnimatePresenceが要素を削除する前に現在の高さを取得
      const currentHeight = contentRef.current.scrollHeight
      if (currentHeight > 0) {
        setHeight(currentHeight)
      }
    }
  }, [isOpen])

  // リサイズ時にも高さを更新（コンテンツが動的に変わる場合に備えて）
  useEffect(() => {
    if (!isOpen || !contentRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight)
      }
    })

    resizeObserver.observe(contentRef.current)
    return () => resizeObserver.disconnect()
  }, [isOpen])

  return (
    <motion.div
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
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onToggle()
          }
        }}
      >
        <span className="text-base font-semibold text-slate-950 md:text-lg">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChevronDown
            aria-hidden
            className="h-5 w-5 shrink-0 text-gold-600"
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              height: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              },
              opacity: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            style={{ overflow: "hidden" }}
            className="border-t border-slate-200"
          >
            <div
              ref={contentRef}
              className="p-6 text-base leading-relaxed text-slate-700"
            >
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

