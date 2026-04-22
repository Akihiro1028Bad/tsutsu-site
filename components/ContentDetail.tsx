import Image from "next/image"
import Link from "next/link"
import { cleanupMicroCmsHtml } from "@/lib/utils/microcms-html-cleanup"
import { sanitizeHtml } from "@/lib/utils/sanitize"
import { processHtmlWithCodeBlocks } from "@/lib/utils/html-processor"
import { ProseContent } from "./ProseContent"
import HtmlEmbed from "./HtmlEmbed"

/** Shared shape for both announcements and blog posts. */
export interface ContentDetailData {
  id: string
  title: string
  content: string
  publishedAt: string
  category?: string | { name: string }
  image?: {
    url: string
    alt?: string
  }
  /** Optional raw HTML (CSS/JS allowed) rendered in a sandboxed iframe below body. */
  embedHtml?: string
}

/** Sibling pointer for older/newer article navigation. */
export interface ArticleSibling {
  readonly href: string
  readonly title: string
}

interface ContentDetailProps {
  content: ContentDetailData
  imageUrl: string | null
  categoryName: string
  formatDate: (dateString: string) => string
  /** Small editorial label above the title — "Notes." / "Announcements." */
  kicker: string
  /** Destination for the "Back to archive" link in the footer. */
  archive: {
    readonly href: string
    readonly label: string
  }
  /** Optional older / newer neighbours. */
  siblings?: {
    readonly older?: ArticleSibling
    readonly newer?: ArticleSibling
  }
  /** Reading time already estimated by the caller. */
  readingTimeMin: number
}

/**
 * Linear-style article layout — clean sans-serif typography, modest
 * hero, mono meta, row siblings + back button. Keeps XSS sanitisation
 * and Shiki code-block highlighting from the existing pipeline.
 */
export default async function ContentDetail({
  content,
  imageUrl,
  categoryName,
  formatDate,
  kicker,
  archive,
  siblings,
  readingTimeMin,
}: ContentDetailProps) {
  const cleanedHtml = cleanupMicroCmsHtml(content.content)
  const processedContent = await processHtmlWithCodeBlocks(cleanedHtml, "dark")
  const sanitizedContent = await sanitizeHtml(processedContent)

  return (
    <article className="article-page__article">
      <header className="article-page__head">
        <p className="article-page__meta">
          <span className="article-page__meta-kicker">{kicker}</span>
          <span aria-hidden="true" className="article-page__meta-sep">·</span>
          <time dateTime={content.publishedAt}>
            {formatDate(content.publishedAt)}
          </time>
          {categoryName ? (
            <>
              <span aria-hidden="true" className="article-page__meta-sep">·</span>
              <span className="article-page__meta-cat">{categoryName}</span>
            </>
          ) : null}
          <span aria-hidden="true" className="article-page__meta-sep">·</span>
          <span>{readingTimeMin} min</span>
        </p>
        <h1 className="article-page__title">{content.title}</h1>
      </header>

      {imageUrl ? (
        <figure className="article-page__hero">
          <Image
            src={imageUrl}
            alt={content.image?.alt || content.title}
            fill
            sizes="(max-width: 900px) 100vw, 1000px"
            priority
            className="article-page__hero-img"
          />
        </figure>
      ) : null}

      <div className="article-page__body">
        <ProseContent html={sanitizedContent} className="article-prose" />
      </div>

      {content.embedHtml ? (
        <div className="article-page__embed">
          <HtmlEmbed html={content.embedHtml} />
        </div>
      ) : null}

      <footer className="article-page__foot">
        {siblings && (siblings.newer || siblings.older) ? (
          <nav className="article-page__siblings" aria-label="Article navigation">
            {siblings.newer ? (
              <Link
                href={siblings.newer.href}
                className="article-page__sibling article-page__sibling--newer"
              >
                <span className="article-page__sibling-eyebrow">← Newer</span>
                <span className="article-page__sibling-title">
                  {siblings.newer.title}
                </span>
              </Link>
            ) : (
              <span className="article-page__sibling article-page__sibling--empty" />
            )}
            {siblings.older ? (
              <Link
                href={siblings.older.href}
                className="article-page__sibling article-page__sibling--older"
              >
                <span className="article-page__sibling-eyebrow">Older →</span>
                <span className="article-page__sibling-title">
                  {siblings.older.title}
                </span>
              </Link>
            ) : (
              <span className="article-page__sibling article-page__sibling--empty" />
            )}
          </nav>
        ) : null}
        <div className="article-page__back-wrap">
          <Link href={archive.href} className="article-page__back">
            <span className="article-page__back-arrow" aria-hidden="true">←</span>
            <span>{archive.label}</span>
          </Link>
        </div>
      </footer>
    </article>
  )
}
