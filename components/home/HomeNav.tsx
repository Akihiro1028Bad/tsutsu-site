"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface NavItem {
  readonly id: string
  readonly label: string
}

const NAV_ITEMS: readonly NavItem[] = [
  { id: "services", label: "事業内容" },
  { id: "works", label: "実績" },
  { id: "notes", label: "お知らせ" },
  { id: "blog", label: "ブログ" },
  { id: "about", label: "事業者概要" },
]

/**
 * Observed section ids for the scroll spy.
 *
 * Every home section sits on the paper background, so the nav has no
 * surface-dependent colour switching: `contact` is not observed and no
 * `data-theme` is emitted. Re-introduce both together if a dark section
 * is ever added under the fixed nav.
 */
const OBSERVED_IDS: readonly string[] = NAV_ITEMS.map((item) => item.id)

const PANEL_ID = "home-nav-panel"

export default function HomeNav() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`)
  const brandHref = isHome ? "#top" : "/"

  const [activeId, setActiveId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const sections = OBSERVED_IDS.map((id) => ({
      id,
      el: document.getElementById(id),
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
      // Sticky-stack aware: with pinned sections layering, the dominant
      // "active" section is the one whose top edge has risen past ~15% of
      // the viewport (i.e. just covered the previous pinned sheet). A
      // narrow band near the top fires hand-offs that match the visual
      // stacking order, avoiding the flip-flop that a centred band causes
      // when multiple sections intersect simultaneously.
      { rootMargin: "-15% 0px -80% 0px", threshold: 0 }
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

  return (
    <nav
      className="home-nav"
      aria-label="Global navigation"
      data-menu-open={isOpen ? "true" : "false"}
    >
      <a className="home-nav__brand" href={brandHref} aria-label="tsutsu">
        <span className="home-nav__brand-name">tsutsu</span>
        <span className="home-nav__brand-sub" aria-hidden="true">
          Web · AI · Engineering
        </span>
      </a>

      <button
        type="button"
        className="home-nav__toggle"
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="home-nav__bars" aria-hidden="true" />
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

      <a
        className="home-nav__cta"
        href={sectionHref("contact")}
        onClick={() => setIsOpen(false)}
      >
        お問い合わせ
      </a>
    </nav>
  )
}
