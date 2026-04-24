import type { Metadata } from "next"
import Link from "next/link"
import MagneticLink from "@/components/motion/MagneticLink"
import WorksIndexRow from "@/components/home/works/WorksIndexRow"
import WorksComingSoon from "@/components/home/works/WorksComingSoon"
import { WORKS_FEATURED } from "@/lib/home/works-data"

const PAGE_TITLE = "Works / 制作実績一覧 — tsutsu"
const PAGE_DESCRIPTION =
  "堤 暁寛（tsutsu）がこれまでに手がけた制作実績の一覧。順次追加していきます。"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/works" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/works",
    type: "website",
    images: [
      {
        url: "/hero.png",
        width: 1536,
        height: 1024,
        alt: "tsutsu Works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/hero.png"],
  },
}

export default function WorksPage() {
  const count = WORKS_FEATURED.length.toString().padStart(2, "0")
  return (
    <>
      <header className="page-head">
        <div className="page-head__grid">
          <div className="page-head__eyebrow">
            <span>§</span>
            <em aria-hidden="true" />
            <span>Index of Works</span>
          </div>
          <h1 className="page-head__title">
            Works.
            <span className="page-head__sub-jp">— 制作実績一覧</span>
          </h1>
          <p className="page-head__lead">
            携わった仕事の一覧です。
            <br />
            順次追加していきます。
          </p>
        </div>
      </header>

      <div className="page-meta">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Works</span>
        </nav>
        <div className="tally">
          <em>{count}</em> Selected project / 2024 –
        </div>
      </div>

      <ol className="index-list" aria-label="Works index">
        {WORKS_FEATURED.map((work) => (
          <li key={work.id}>
            <WorksIndexRow work={work} />
          </li>
        ))}
      </ol>

      <WorksComingSoon />

      <section className="works-cta" aria-label="Contact">
        <p className="works-cta__eyebrow">— Start a project</p>
        <p className="works-cta__lead">
          お仕事のご相談、お待ちしています。
        </p>
        <MagneticLink strength={0.3} max={14}>
          <Link className="works-cta__link" href="/#contact">
            <span>お問い合わせはこちら</span>
            <span aria-hidden="true">→</span>
          </Link>
        </MagneticLink>
      </section>
    </>
  )
}
