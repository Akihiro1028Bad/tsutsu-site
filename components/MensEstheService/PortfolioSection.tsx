"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { MouseEvent } from "react"
import { useState } from "react"
import { ExternalLink } from "lucide-react"

import { MENS_ESTHE_CONFIG } from "@/lib/constants/config"
import type { PortfolioItem } from "@/lib/types/mens-esthe-service"

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

function getExternalLinkErrorMessage(url: string): string {
  if (!isValidHttpUrl(url)) {
    return "リンクURLが不正です。"
  }

  return "リンクを開けませんでした。ブラウザの設定をご確認ください。"
}

type Props = {
  portfolioItems: PortfolioItem[]
}

export function PortfolioSection({ portfolioItems }: Props) {
  const [linkErrors, setLinkErrors] = useState<Record<string, string>>({})

  const handleLinkClick = (item: PortfolioItem) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (!isValidHttpUrl(item.siteUrl)) {
      setLinkErrors((prev) => ({ ...prev, [item.id]: getExternalLinkErrorMessage(item.siteUrl) }))
      return
    }

    const opened = window.open(item.siteUrl, "_blank", "noopener,noreferrer")
    if (opened === null) {
      setLinkErrors((prev) => ({ ...prev, [item.id]: getExternalLinkErrorMessage(item.siteUrl) }))
      return
    }

    setLinkErrors((prev) => {
      const next = { ...prev }
      delete next[item.id]
      return next
    })
  }

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="relative py-20 md:py-28">
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
          id="portfolio-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl"
        >
          制作実績
        </motion.h2>

        {portfolioItems.length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-base text-slate-600"
          >
            現在準備中です
          </motion.p>
        ) : (
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {portfolioItems.map((item, index) => (
              <li key={item.id}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {item.thumbnailImage ? (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <div className="relative aspect-video">
                        <Image
                          src={item.thumbnailImage.src}
                          alt={item.thumbnailImage.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  ) : null}

                  <h3 className="text-lg font-semibold text-slate-950">{item.storeName}</h3>
                  <a
                    href={item.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.storeName}のサイトを開く`}
                    onClick={handleLinkClick(item)}
                    className="mt-4 inline-flex items-center gap-2 text-base font-medium text-gold-600 transition-colors hover:text-gold-700"
                  >
                    サイトを見る
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  {linkErrors[item.id] ? (
                    <p role="alert" className="mt-3 text-sm text-red-600">
                      {linkErrors[item.id]}
                    </p>
                  ) : null}
                </motion.article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
