"use client"

import { useEffect } from "react"

/**
 * Draft-preview indicator rendered at the top of microCMS preview routes.
 *
 * - Fixed strip at `top: 0` above the site nav; CSS uses the
 *   `.has-preview-banner` class on <html> (added here on mount) to push
 *   the rest of the page down via `--preview-offset`.
 * - Static content only — no draftKey or IDs are echoed (security).
 * - `role="status"` + visible label so assistive tech announces "preview".
 */
export default function PreviewBanner() {
  useEffect(() => {
    document.documentElement.classList.add("has-preview-banner")
    return () => {
      document.documentElement.classList.remove("has-preview-banner")
    }
  }, [])

  return (
    <div data-preview-banner="" role="status" className="preview-banner">
      <span className="preview-banner__dot" aria-hidden="true" />
      <span className="preview-banner__label">Preview</span>
      <span className="preview-banner__sep" aria-hidden="true">/</span>
      <span className="preview-banner__text">
        このページは下書きを表示しています
      </span>
    </div>
  )
}
