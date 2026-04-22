"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface Variant {
  readonly id: "a" | "b" | "c" | "d" | "e"
  readonly label: string
  readonly caption: string
  readonly href: string
}

const VARIANTS: ReadonlyArray<Variant> = [
  { id: "a", label: "A", caption: "Linear", href: "/design/article/a" },
  { id: "b", label: "B", caption: "Dark", href: "/design/article/b" },
  { id: "c", label: "C", caption: "Kinetic", href: "/design/article/c" },
  {
    id: "d",
    label: "D",
    caption: "Manuscript",
    href: "/design/article/d",
  },
  { id: "e", label: "E", caption: "Swiss", href: "/design/article/e" },
]

export default function ArticlePreviewSwitcher() {
  const pathname = usePathname()
  const match = pathname?.match(/\/design\/article\/([a-e])$/)?.[1]
  const activeId = (match ?? "a") as Variant["id"]
  return (
    <aside
      className="preview-switcher"
      aria-label="Article design variant switcher"
    >
      <div className="preview-switcher__label">
        <span className="preview-switcher__eyebrow">PREVIEW</span>
        <span className="preview-switcher__caption">Article design</span>
      </div>
      <nav className="preview-switcher__tabs">
        {VARIANTS.map((v) => {
          const isActive = v.id === activeId
          return (
            <Link
              key={v.id}
              href={v.href}
              className="preview-switcher__tab"
              data-active={isActive ? "true" : "false"}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="preview-switcher__tab-id">{v.label}</span>
              <span className="preview-switcher__tab-caption">
                {v.caption}
              </span>
            </Link>
          )
        })}
      </nav>
      <Link href="/" className="preview-switcher__exit">
        ← Exit preview
      </Link>
    </aside>
  )
}
