"use client"

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
  heading: "サイト",
  links: [
    { label: "事業内容", target: { kind: "section", id: "services" } },
    { label: "実績", target: { kind: "section", id: "works" } },
    { label: "お知らせ", target: { kind: "section", id: "notes" } },
    { label: "事業者概要", target: { kind: "section", id: "about" } },
  ],
}

const CONTACT_LINKS: FooterColumn = {
  heading: "お問い合わせ",
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
          <span className="home-footer__brand-name">tsutsu</span>
          <div className="home-footer__tag">
            Webサイト制作 / AI導入支援 / 学習・キャリア支援
          </div>
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
          <span>東京都 — 代表 堤 暁寛</span>
        </div>
      </div>
    </footer>
  )
}
