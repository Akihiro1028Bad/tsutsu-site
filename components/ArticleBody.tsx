interface ArticleBodyProps {
  readonly children: React.ReactNode
  /** Marks the page as a microCMS draft preview so CSS can adjust layout. */
  readonly isPreview?: boolean
}

/**
 * Shared wrapper for article detail pages (blog, announcements, preview).
 *
 * Production and preview routes both render through this element so the
 * Linear-style chrome (`.article-page[data-style="modern"]`) lives in
 * exactly one place. A future design tweak therefore cannot drift between
 * the two surfaces.
 */
export default function ArticleBody({ children, isPreview }: ArticleBodyProps) {
  return (
    <main
      className="article-page"
      data-style="modern"
      {...(isPreview ? { "data-preview": "true" } : {})}
    >
      {children}
    </main>
  )
}
