"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface NavItem {
  readonly id: string
  readonly label: string
}

const NAV_ITEMS: readonly NavItem[] = [
  { id: "about", label: "About" },
  { id: "works", label: "Works" },
  { id: "services", label: "Services" },
  { id: "notes", label: "Notes" },
  { id: "contact", label: "Contact" },
]

/** Sections rendered on dark surfaces; nav switches to light text over them. */
const DARK_SECTIONS: ReadonlySet<string> = new Set(["services"])
const PANEL_ID = "home-nav-panel"

export default function HomeNav() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`)
  const brandHref = isHome ? "#top" : "/"

  const [activeId, setActiveId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => ({
      id: item.id,
      el: document.getElementById(item.id),
    })).filter((entry): entry is { id: string; el: HTMLElement } =>
      entry.el !== null
    )

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    )

    sections.forEach(({ el }) => observer.observe(el))
    return () => observer.disconnect()
    // Intentionally [] — sections are discovered from `NAV_ITEMS`, which is
    // module-level and stable. The current (home) layout is anchor-based, so
    // client-side navigation within the group doesn't swap section DOM. If a
    // future sub-page needs its own observed sections, add `pathname` (or a
    // route-scoped section list) to the deps and verify re-init semantics.
  }, [])

  // Esc closes the mobile disclosure.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const theme = DARK_SECTIONS.has(activeId ?? "") ? "dark" : "light"

  return (
    <nav
      className="home-nav"
      aria-label="Global navigation"
      data-theme={theme}
      data-menu-open={isOpen ? "true" : "false"}
    >
      <a className="home-nav__brand" href={brandHref} aria-label="tsutsu">
        <Image
          src="/logo.png"
          alt="tsutsu"
          width={88}
          height={88}
          priority
          unoptimized
          className="home-nav__logo"
        />
      </a>

      <button
        type="button"
        className="home-nav__toggle"
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        aria-label={isOpen ? "メニューを閉じる / Close menu" : "メニュー / Menu"}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span aria-hidden="true">{isOpen ? "✕" : "≡"}</span>
      </button>

      <ul
        id={PANEL_ID}
        className="home-nav__list"
        data-open={isOpen ? "true" : "false"}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = isHome && activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={sectionHref(item.id)}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>

    </nav>
  )
}
