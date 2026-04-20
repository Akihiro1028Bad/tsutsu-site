"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface Variant {
  readonly id: "a" | "b" | "c"
  readonly label: string
  readonly caption: string
  readonly href: string
}

const VARIANTS: ReadonlyArray<Variant> = [
  {
    id: "a",
    label: "A",
    caption: "Signposted",
    href: "/design/a",
  },
  {
    id: "b",
    label: "B",
    caption: "Modular",
    href: "/design/b",
  },
  {
    id: "c",
    label: "C",
    caption: "Magazine",
    href: "/design/c",
  },
]

export default function PreviewSwitcher() {
  const pathname = usePathname()
  const activeId: Variant["id"] =
    pathname?.endsWith("/b")
      ? "b"
      : pathname?.endsWith("/c")
        ? "c"
        : "a"
  return (
    <aside
      className="preview-switcher"
      aria-label="Design variant switcher"
    >
      <div className="preview-switcher__label">
        <span className="preview-switcher__eyebrow">PREVIEW</span>
        <span className="preview-switcher__caption">
          Design variant
        </span>
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
