/**
 * Estimates how many minutes it takes to read a chunk of HTML.
 *
 * Mixed Japanese/Latin content reads at roughly 500 characters per minute
 * once HTML tags and whitespace are stripped. The result is rounded up and
 * floored at 1 so that even a one-line note displays "約1分".
 */
export function estimateReadingTimeMin(html: string): number {
  if (typeof html !== "string" || html.length === 0) {
    return 1
  }
  const text = html.replace(/<[^>]*>/g, "")
  const chars = text.replace(/\s+/g, "").length
  if (chars === 0) {
    return 1
  }
  return Math.max(1, Math.ceil(chars / 500))
}
