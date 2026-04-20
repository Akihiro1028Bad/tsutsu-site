"use client"

import { useEffect, useState } from "react"

interface NavItem {
  readonly id: string
  readonly label: string
  readonly href: string
}

const NAV_ITEMS: readonly NavItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "works", label: "Works", href: "#works" },
  { id: "services", label: "Services", href: "#services" },
  { id: "notes", label: "Notes", href: "#notes" },
  { id: "contact", label: "Contact", href: "#contact" },
]

export default function HomeNav() {
  const [activeId, setActiveId] = useState<string | null>(null)

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
  }, [])

  return (
    <nav className="home-nav" aria-label="Global navigation">
      <a className="home-nav__brand" href="#top">
        tsutsu
      </a>
      <ul className="home-nav__list">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
      <span className="home-nav__lang" aria-hidden="true">
        JA / <span className="home-nav__lang-muted">EN</span>
      </span>
    </nav>
  )
}
