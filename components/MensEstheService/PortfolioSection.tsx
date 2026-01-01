"use client"

import Image from "next/image"
import type { MouseEvent } from "react"
import { useState } from "react"

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
    <section id="portfolio" aria-labelledby="portfolio-heading" className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 id="portfolio-heading" className="text-2xl font-bold">
          制作実績
        </h2>

        {portfolioItems.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">現在準備中です</p>
        ) : (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {portfolioItems.map((item) => (
              <li key={item.id}>
                <article className="rounded-lg border p-4">
                  {item.thumbnailImage ? (
                    <div className="mb-3 overflow-hidden rounded-md">
                      <Image
                        src={item.thumbnailImage.src}
                        alt={item.thumbnailImage.alt}
                        width={item.thumbnailImage.width}
                        height={item.thumbnailImage.height}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="h-auto w-full"
                      />
                    </div>
                  ) : null}

                  <h3 className="text-base font-semibold">{item.storeName}</h3>
                  <a
                    href={item.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.storeName}のサイトを開く`}
                    onClick={handleLinkClick(item)}
                    className="mt-2 inline-flex text-sm text-blue-600 underline underline-offset-2"
                  >
                    サイトを見る
                  </a>
                  {linkErrors[item.id] ? (
                    <p role="alert" className="mt-2 text-sm text-red-600">
                      {linkErrors[item.id]}
                    </p>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
