import Image from "next/image"
import Link from "next/link"
import ReadingProgress from "@/components/home/ReadingProgress"
import { SAMPLE_ARTICLE } from "@/lib/home/article-preview-data"

interface ArticlePreviewProps {
  /** Design variant id (a..e) — drives the CSS attribute selector. */
  readonly design: "a" | "b" | "c" | "d" | "e"
}

/**
 * Shared preview renderer — the same sample content rendered five ways
 * via the `data-design` attribute. CSS rules in home.css (scoped to
 * `.article-preview[data-design="..."]`) drive the visual differences.
 */
export default function ArticlePreview({ design }: ArticlePreviewProps) {
  const a = SAMPLE_ARTICLE
  return (
    <main
      className="article-preview"
      data-design={design}
      data-style="modern"
    >
      {design === "c" ? <ReadingProgress /> : null}

      <article className="ap__article">
        <header className="ap__head">
          <p className="ap__meta">
            <span className="ap__meta-kicker">{a.kicker}</span>
            <span aria-hidden="true" className="ap__meta-sep">·</span>
            <time dateTime="2026-04-21">{a.dateDisplay}</time>
            <span aria-hidden="true" className="ap__meta-sep">·</span>
            <span className="ap__meta-cat">{a.category}</span>
            <span aria-hidden="true" className="ap__meta-sep">·</span>
            <span>{a.readingMin} min</span>
          </p>
          <h1 className="ap__title">{a.title}</h1>
        </header>

        {design !== "d" ? (
          <figure className="ap__hero">
            <Image
              src={a.heroImage.src}
              alt={a.heroImage.alt}
              width={a.heroImage.width}
              height={a.heroImage.height}
              sizes="(max-width: 900px) 100vw, 1000px"
              priority
              className="ap__hero-img"
            />
          </figure>
        ) : null}

        <div
          className="ap__body"
          dangerouslySetInnerHTML={{ __html: a.contentHtml }}
        />

        <footer className="ap__foot">
          <nav className="ap__siblings" aria-label="Related articles">
            <Link href={a.siblings.newer.href} className="ap__sibling ap__sibling--newer">
              <span className="ap__sibling-eyebrow">← Newer</span>
              <span className="ap__sibling-title">{a.siblings.newer.title}</span>
            </Link>
            <Link href={a.siblings.older.href} className="ap__sibling ap__sibling--older">
              <span className="ap__sibling-eyebrow">Older →</span>
              <span className="ap__sibling-title">{a.siblings.older.title}</span>
            </Link>
          </nav>
          <div className="ap__back-wrap">
            <Link href="/blog" className="ap__back">
              <span aria-hidden="true">←</span>
              <span>記事一覧へ戻る</span>
            </Link>
          </div>
        </footer>
      </article>
    </main>
  )
}
