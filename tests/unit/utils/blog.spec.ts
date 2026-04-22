import { describe, it, expect } from "vitest"
import {
  formatDate,
  getCategoryName,
  getOptimizedImageUrl,
  getHeroImageUrl,
  getCardImageUrl,
  getExcerpt,
  toBlogCardItem,
  mapBlogPostsToCardItems,
} from "@/lib/utils/blog"
import type { BlogPost } from "@/lib/types/blog"
import type { CategoryReference } from "@/lib/types/common"

describe("formatDate", () => {
  it("formats an ISO date as Japanese long style", () => {
    expect(formatDate("2024-01-01T00:00:00.000Z")).toMatch(/2024年/)
    expect(formatDate("2024-01-01T00:00:00.000Z")).toMatch(/1月/)
  })
})

describe("getCategoryName", () => {
  it("returns empty string when category is undefined", () => {
    expect(getCategoryName(undefined)).toBe("")
  })

  it("returns the string value when category is a plain string", () => {
    expect(getCategoryName("Frontend")).toBe("Frontend")
  })

  it("returns .name when category is a CategoryReference", () => {
    const ref: CategoryReference = {
      id: "c1",
      name: "Tech",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      publishedAt: "2024-01-01T00:00:00.000Z",
      revisedAt: "2024-01-01T00:00:00.000Z",
    }
    expect(getCategoryName(ref)).toBe("Tech")
  })
})

describe("getOptimizedImageUrl", () => {
  it("returns input unchanged when URL is empty", () => {
    expect(getOptimizedImageUrl("")).toBe("")
  })

  it("returns original URL when no options are provided", () => {
    expect(getOptimizedImageUrl("https://img.example.com/x.jpg")).toBe(
      "https://img.example.com/x.jpg",
    )
  })

  it("appends width param when specified", () => {
    expect(getOptimizedImageUrl("https://i.example.com/a.jpg", { width: 600 })).toBe(
      "https://i.example.com/a.jpg?w=600",
    )
  })

  it("appends height param when specified", () => {
    expect(getOptimizedImageUrl("https://i.example.com/a.jpg", { height: 400 })).toBe(
      "https://i.example.com/a.jpg?h=400",
    )
  })

  it("appends format param when specified", () => {
    expect(getOptimizedImageUrl("https://i.example.com/a.jpg", { format: "webp" })).toBe(
      "https://i.example.com/a.jpg?fm=webp",
    )
  })

  it("appends quality param including 0", () => {
    expect(getOptimizedImageUrl("https://i.example.com/a.jpg", { quality: 0 })).toBe(
      "https://i.example.com/a.jpg?q=0",
    )
    expect(getOptimizedImageUrl("https://i.example.com/a.jpg", { quality: 80 })).toBe(
      "https://i.example.com/a.jpg?q=80",
    )
  })

  it("combines multiple params in order", () => {
    const url = getOptimizedImageUrl("https://i.example.com/a.jpg", {
      width: 600,
      height: 400,
      format: "webp",
      quality: 75,
    })
    expect(url).toBe("https://i.example.com/a.jpg?w=600&h=400&fm=webp&q=75")
  })
})

describe("getHeroImageUrl", () => {
  it("returns null when hero is undefined", () => {
    expect(getHeroImageUrl(undefined)).toBeNull()
  })

  it("returns null when hero has no url", () => {
    expect(getHeroImageUrl({ url: "" })).toBeNull()
  })

  it("returns an optimized URL with DETAIL-preset params", () => {
    const result = getHeroImageUrl({ url: "https://i.example.com/hero.jpg" })
    expect(result).toMatch(/^https:\/\/i\.example\.com\/hero\.jpg\?/)
    expect(result).toContain("w=1200")
    expect(result).toContain("fm=webp")
    expect(result).toContain("q=80")
  })
})

describe("getCardImageUrl", () => {
  it("returns null when hero is undefined", () => {
    expect(getCardImageUrl(undefined)).toBeNull()
  })

  it("returns null when hero has no url", () => {
    expect(getCardImageUrl({ url: "" })).toBeNull()
  })

  it("returns an optimized URL with CARD-preset params", () => {
    const result = getCardImageUrl({ url: "https://i.example.com/card.jpg" })
    expect(result).toMatch(/^https:\/\/i\.example\.com\/card\.jpg\?/)
    expect(result).toContain("w=600")
    expect(result).toContain("fm=webp")
    expect(result).toContain("q=75")
  })
})

describe("getExcerpt", () => {
  it("generates excerpt from HTML content with default length", () => {
    expect(getExcerpt("<p>hello world</p>")).toBe("hello world")
  })

  it("respects a custom maxLength", () => {
    expect(getExcerpt("<p>hello world</p>", 5)).toBe("hello...")
  })
})

describe("toBlogCardItem", () => {
  const post: BlogPost = {
    id: "b1",
    slug: "first-post",
    title: "First Post",
    content: "<p>This is the body of the first post.</p>",
    category: "Frontend",
    hero: { url: "https://i.example.com/hero.jpg" },
    publishedAt: "2024-01-01T00:00:00.000Z",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    revisedAt: "2024-01-01T00:00:00.000Z",
  }

  it("maps a BlogPost into a BlogCardItem", () => {
    const item = toBlogCardItem(post)
    expect(item.id).toBe("b1")
    expect(item.slug).toBe("first-post")
    expect(item.title).toBe("First Post")
    expect(item.href).toBe("/blog/first-post")
    expect(item.publishedAt).toBe("2024-01-01T00:00:00.000Z")
    expect(item.categoryName).toBe("Frontend")
    expect(item.imageUrl).not.toBeNull()
    expect(item.imageUrl).toContain("w=600")
    expect(item.excerpt).toBe("This is the body of the first post.")
  })

  it("falls back to null imageUrl when hero is missing", () => {
    const item = toBlogCardItem({ ...post, hero: undefined })
    expect(item.imageUrl).toBeNull()
  })

  it("falls back to empty categoryName when category is missing", () => {
    const item = toBlogCardItem({ ...post, category: undefined })
    expect(item.categoryName).toBe("")
  })
})

describe("mapBlogPostsToCardItems", () => {
  it("maps each post via toBlogCardItem", () => {
    const base: BlogPost = {
      id: "b1",
      slug: "a",
      title: "A",
      content: "<p>A</p>",
      publishedAt: "2024-01-01T00:00:00.000Z",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      revisedAt: "2024-01-01T00:00:00.000Z",
    }
    const posts: BlogPost[] = [base, { ...base, id: "b2", slug: "b", title: "B" }]
    const items = mapBlogPostsToCardItems(posts)
    expect(items).toHaveLength(2)
    expect(items[0].slug).toBe("a")
    expect(items[1].slug).toBe("b")
    expect(items[0].href).toBe("/blog/a")
    expect(items[1].href).toBe("/blog/b")
  })

  it("returns an empty array for empty input", () => {
    expect(mapBlogPostsToCardItems([])).toEqual([])
  })
})
