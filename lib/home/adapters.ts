import type { Announcement } from "@/lib/types/announcement"
import type { BlogPost } from "@/lib/types/blog"
import type { CategoryReference, ImageField } from "@/lib/types/common"

/** Normalised thumbnail shape consumed by the Journal list UI. */
export interface JournalThumbnail {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

export interface JournalNewsItem {
  readonly id: string
  readonly title: string
  readonly dateDisplay: string
  readonly kind: string
  readonly href: string
  readonly image?: JournalThumbnail
}

export interface JournalBlogItem {
  readonly id: string
  readonly title: string
  readonly dateDisplay: string
  readonly category: string
  readonly href: string
  readonly image?: JournalThumbnail
}

/**
 * Normalises a microCMS image field into a JournalThumbnail. Returns
 * undefined when no usable URL is present so callers can render the
 * placeholder UI instead of an empty image.
 */
function toJournalThumbnail(
  image: ImageField | undefined
): JournalThumbnail | undefined {
  if (!image || !image.url) {
    return undefined
  }
  return {
    src: image.url,
    alt: image.alt ?? "",
    width: image.width ?? 400,
    height: image.height ?? 400,
  }
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
  const image = toJournalThumbnail(a.read)
  return {
    id: a.id,
    title: a.title,
    dateDisplay: formatDateForJournal(a.publishedAt),
    kind,
    href: `/announcements/${a.id}`,
    ...(image ? { image } : {}),
  }
}

export function toBlogListItem(b: BlogPost): JournalBlogItem {
  const category = resolveCategory(b.category) ?? "Note"
  const image = toJournalThumbnail(b.hero)
  return {
    id: b.id,
    title: b.title,
    dateDisplay: formatDateForJournal(b.publishedAt),
    category,
    href: `/blog/${b.slug}`,
    ...(image ? { image } : {}),
  }
}
