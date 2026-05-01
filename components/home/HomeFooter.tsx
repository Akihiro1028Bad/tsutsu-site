"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { Suspense } from "react"
import FooterYear from "@/components/home/FooterYear"

interface FooterLink {
  readonly label: string
  /** Either a section id (e.g. `about`) routed via `sectionHref`, or an absolute URL (mailto:, https:). */
  readonly target: { readonly kind: "section"; readonly id: string } | { readonly kind: "url"; readonly href: string }
}

interface FooterColumn {
  readonly heading: string
  readonly links: ReadonlyArray<FooterLink>
}

const SITE_LINKS: FooterColumn = {
  heading: "Site",
  links: [
    { label: "About", target: { kind: "section", id: "about" } },
    { label: "Works", target: { kind: "section", id: "works" } },
    { label: "Services", target: { kind: "section", id: "services" } },
    { label: "Notes", target: { kind: "section", id: "notes" } },
  ],
}

const CONTACT_LINKS: FooterColumn = {
  heading: "Contact",
  links: [
    { label: "hello@tsutsu.dev", target: { kind: "url", href: "mailto:hello@tsutsu.dev" } },
    { label: "問い合わせフォーム", target: { kind: "section", id: "contact" } },
  ],
}

const COLUMNS: ReadonlyArray<FooterColumn> = [SITE_LINKS, CONTACT_LINKS]

export default function HomeFooter() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  // Mirrors HomeNav.sectionHref so footer anchors navigate from any route
  // (e.g. /blog/[slug]) back to the home section, not just append a hash
  // to the current URL.
  const sectionHref = (id: string): string => (isHome ? `#${id}` : `/#${id}`)

  const resolveHref = (link: FooterLink): string =>
    link.target.kind === "section" ? sectionHref(link.target.id) : link.target.href

  return (
    <footer className="home-footer">
      <div className="home-footer__grid">
        <div className="home-footer__brand">
          <Image
            src="/logo.png"
            alt="tsutsu"
            width={56}
            height={56}
            unoptimized
            className="home-footer__logo"
          />
          <div className="home-footer__tag">Freelance engineer — Tokyo</div>
        </div>
        <div className="home-footer__cols">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3>{col.heading}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={resolveHref(link)}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="home-footer__meta">
          <span>
            ©{" "}
            <Suspense fallback={null}>
              <FooterYear />
            </Suspense>{" "}
            tsutsu — all rights reserved
          </span>
          <span>Designed &amp; built in Tokyo / JP</span>
        </div>
      </div>
    </footer>
  )
}
