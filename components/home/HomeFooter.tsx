import { Suspense } from "react"
import FooterYear from "@/components/home/FooterYear"

interface FooterColumn {
  readonly heading: string
  readonly links: ReadonlyArray<{
    readonly label: string
    readonly href: string
  }>
}

const SITE_LINKS: FooterColumn = {
  heading: "Site",
  links: [
    { label: "About", href: "#about" },
    { label: "Works", href: "#works" },
    { label: "Services", href: "#services" },
    { label: "Notes", href: "#notes" },
  ],
}

const SOCIAL_LINKS: FooterColumn = {
  heading: "Social",
  links: [
    { label: "X / Twitter", href: "https://x.com/" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "Zenn", href: "https://zenn.dev/" },
  ],
}

const CONTACT_LINKS: FooterColumn = {
  heading: "Contact",
  links: [
    { label: "hello@tsutsu.dev", href: "mailto:hello@tsutsu.dev" },
    { label: "問い合わせフォーム", href: "#contact" },
  ],
}

const COLUMNS: ReadonlyArray<FooterColumn> = [
  SITE_LINKS,
  SOCIAL_LINKS,
  CONTACT_LINKS,
]

export default function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="home-footer__grid">
        <div className="home-footer__brand">
          <div className="home-footer__name">
            <em>tsutsu</em>.
          </div>
          <div className="home-footer__tag">Freelance engineer — Tokyo</div>
        </div>
        <div className="home-footer__cols">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3>{col.heading}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
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
