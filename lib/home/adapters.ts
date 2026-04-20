import type { Announcement } from "@/lib/types/announcement"
import type { BlogPost } from "@/lib/types/blog"
import type { CategoryReference } from "@/lib/types/common"

export interface JournalNewsItem {
  readonly id: string
  readonly title: string
  readonly dateDisplay: string
  readonly kind: string
  readonly href: string
}

export interface JournalBlogItem {
  readonly id: string
  readonly title: string
  readonly dateDisplay: string
  readonly category: string
  readonly href: string
}

/**
 * Formats an ISO timestamp as the editorial "YYYY.MM.DD" date stamp.
 * Returns an empty string for missing or unparsable input — callers
 * render the placeholder UI when the result is empty.
 */
export function formatDateForJournal(iso: string): string {
  if (!iso) {
    return ""
  }
  const timestamp = Date.parse(iso)
  if (Number.isNaN(timestamp)) {
    return ""
  }
  const d = new Date(timestamp)
  const year = d.getUTCFullYear()
  const month = String(d.getUTCMonth() + 1).padStart(2, "0")
  const day = String(d.getUTCDate()).padStart(2, "0")
  return `${year}.${month}.${day}`
}

/**
 * Normalises microCMS's union category type (string | reference) to a
 * display string. Returns undefined when the field is unset.
 */
export function resolveCategory(
  value: string | CategoryReference | undefined
): string | undefined {
  if (value === undefined) {
    return undefined
  }
  if (typeof value === "string") {
    return value
  }
  return value.name
}

export function toNewsListItem(a: Announcement): JournalNewsItem {
  const kind = resolveCategory(a.category) ?? "News"
  return {
    id: a.id,
    title: a.title,
    dateDisplay: formatDateForJournal(a.publishedAt),
    kind,
    href: `/announcements/${a.id}`,
  }
}

export function toBlogListItem(b: BlogPost): JournalBlogItem {
  const category = resolveCategory(b.category) ?? "Note"
  return {
    id: b.id,
    title: b.title,
    dateDisplay: formatDateForJournal(b.publishedAt),
    category,
    href: `/blog/${b.slug}`,
  }
}
