import { describe, it, expect } from "vitest"
import {
  formatDateForJournal,
  resolveCategory,
  toNewsListItem,
  toBlogListItem,
} from "@/lib/home/adapters"
import type { Announcement } from "@/lib/types/announcement"
import type { BlogPost } from "@/lib/types/blog"
import type { CategoryReference } from "@/lib/types/common"

const makeAnnouncement = (overrides: Partial<Announcement> = {}): Announcement => ({
  id: "a1",
  title: "新サイト公開",
  content: "<p>body</p>",
  createdAt: "2026-03-15T00:00:00.000Z",
  updatedAt: "2026-03-15T00:00:00.000Z",
  publishedAt: "2026-03-15T00:00:00.000Z",
  revisedAt: "2026-03-15T00:00:00.000Z",
  ...overrides,
})

const makeBlogPost = (overrides: Partial<BlogPost> = {}): BlogPost => ({
  id: "b1",
  title: "Next.js App Router tips",
  slug: "next-app-router",
  content: "<p>body</p>",
  createdAt: "2026-02-01T12:00:00.000Z",
  updatedAt: "2026-02-01T12:00:00.000Z",
  publishedAt: "2026-02-01T12:00:00.000Z",
  revisedAt: "2026-02-01T12:00:00.000Z",
  ...overrides,
})

describe("Phase 5: formatDateForJournal", () => {
  it("formats ISO dates as YYYY.MM.DD in UTC", () => {
    expect(formatDateForJournal("2026-03-15T00:00:00.000Z")).toBe("2026.03.15")
  })

  it("zero-pads single-digit months and days", () => {
    expect(formatDateForJournal("2026-01-02T00:00:00.000Z")).toBe("2026.01.02")
  })

  it("returns an empty string for empty input", () => {
    expect(formatDateForJournal("")).toBe("")
  })

  it("returns an empty string for unparsable input", () => {
    expect(formatDateForJournal("not a date")).toBe("")
  })
})

describe("Phase 5: resolveCategory", () => {
  it("returns undefined when nothing is set", () => {
    expect(resolveCategory(undefined)).toBeUndefined()
  })

  it("returns string categories as-is", () => {
    expect(resolveCategory("更新情報")).toBe("更新情報")
  })

  it("reads .name from CategoryReference objects", () => {
    const ref: CategoryReference = {
      id: "c1",
      name: "Frontend",
      createdAt: "",
      updatedAt: "",
      publishedAt: "",
      revisedAt: "",
    }
    expect(resolveCategory(ref)).toBe("Frontend")
  })
})

describe("Phase 5: toNewsListItem", () => {
  it("maps id, title, published date, category, and route", () => {
    const item = toNewsListItem(
      makeAnnouncement({ id: "abc", category: "更新情報" })
    )
    expect(item).toEqual({
      id: "abc",
      title: "新サイト公開",
      dateDisplay: "2026.03.15",
      kind: "更新情報",
      href: "/announcements/abc",
    })
  })

  it("defaults kind to 'News' when the category is missing", () => {
    const item = toNewsListItem(
      makeAnnouncement({ category: undefined })
    )
    expect(item.kind).toBe("News")
  })

  it("resolves CategoryReference objects for kind", () => {
    const item = toNewsListItem(
      makeAnnouncement({
        category: {
          id: "c1",
          name: "Media",
          createdAt: "",
          updatedAt: "",
          publishedAt: "",
          revisedAt: "",
        },
      })
    )
    expect(item.kind).toBe("Media")
  })
})

describe("Phase 5: toBlogListItem", () => {
  it("maps id, title, published date, category, and slug-based route", () => {
    const item = toBlogListItem(
      makeBlogPost({
        id: "xyz",
        slug: "cache-components",
        category: "Frontend",
      })
    )
    expect(item).toEqual({
      id: "xyz",
      title: "Next.js App Router tips",
      dateDisplay: "2026.02.01",
      category: "Frontend",
      href: "/blog/cache-components",
    })
  })

  it("defaults category to 'Note' when missing", () => {
    const item = toBlogListItem(makeBlogPost({ category: undefined }))
    expect(item.category).toBe("Note")
  })

  it("resolves CategoryReference objects for category", () => {
    const item = toBlogListItem(
      makeBlogPost({
        category: {
          id: "c1",
          name: "Backend",
          createdAt: "",
          updatedAt: "",
          publishedAt: "",
          revisedAt: "",
        },
      })
    )
    expect(item.category).toBe("Backend")
  })
})
