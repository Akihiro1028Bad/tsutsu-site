import { describe, it, expect, beforeEach, vi } from "vitest"

const { getDetailNoStore } = vi.hoisted(() => ({
  getDetailNoStore: vi.fn(),
}))

vi.mock("@/lib/microcms/server-client", () => ({
  getDetailNoStore,
}))

import { GET } from "@/app/api/preview/route"

function req(url: string): Request {
  return new Request(url)
}

describe("/api/preview — microCMS preview bootstrap", () => {
  beforeEach(() => {
    getDetailNoStore.mockReset()
  })

  it("rejects when draftKey is missing", async () => {
    const res = await GET(
      req("https://example.com/api/preview?contentId=x&endpoint=blog")
    )
    expect(res.status).toBe(400)
    expect(getDetailNoStore).not.toHaveBeenCalled()
  })

  it("rejects when endpoint is missing", async () => {
    const res = await GET(
      req("https://example.com/api/preview?draftKey=k&contentId=x")
    )
    expect(res.status).toBe(400)
  })

  it("rejects unsupported endpoints", async () => {
    const res = await GET(
      req(
        "https://example.com/api/preview?draftKey=k&contentId=x&endpoint=unknown"
      )
    )
    expect(res.status).toBe(400)
  })

  it("rejects blog without contentId", async () => {
    const res = await GET(
      req("https://example.com/api/preview?draftKey=k&endpoint=blog")
    )
    expect(res.status).toBe(400)
  })

  it("redirects blog to /preview/blog/{slug} after resolving the slug via microCMS", async () => {
    getDetailNoStore.mockResolvedValueOnce({
      id: "blog-1",
      slug: "my-slug",
      title: "t",
      content: "<p>c</p>",
      createdAt: "",
      updatedAt: "",
      publishedAt: "",
      revisedAt: "",
    })
    const res = await GET(
      req(
        "https://example.com/api/preview?draftKey=Vexlz0vn1x&contentId=blog-1&endpoint=blog"
      )
    )
    expect(res.status).toBeGreaterThanOrEqual(300)
    expect(res.status).toBeLessThan(400)
    expect(res.headers.get("location")).toMatch(
      /\/preview\/blog\/my-slug\?draftKey=Vexlz0vn1x$/
    )
    // The draftKey must be passed through to microCMS unchanged so that
    // microCMS itself can validate it against its per-draft token store.
    expect(getDetailNoStore).toHaveBeenCalledWith(
      "blog",
      "blog-1",
      expect.objectContaining({ draftKey: "Vexlz0vn1x" })
    )
  })

  it("redirects announcements directly to /preview/announcements/{contentId}", async () => {
    const res = await GET(
      req(
        "https://example.com/api/preview?draftKey=Vexlz0vn1x&contentId=ann-1&endpoint=announcements"
      )
    )
    expect(res.status).toBeGreaterThanOrEqual(300)
    expect(res.status).toBeLessThan(400)
    expect(res.headers.get("location")).toMatch(
      /\/preview\/announcements\/ann-1\?draftKey=Vexlz0vn1x$/
    )
  })

  it("returns 400 when the fetched blog post has no slug", async () => {
    getDetailNoStore.mockResolvedValueOnce({
      id: "blog-2",
      slug: "",
      title: "t",
      content: "<p>c</p>",
      createdAt: "",
      updatedAt: "",
      publishedAt: "",
      revisedAt: "",
    })
    const res = await GET(
      req(
        "https://example.com/api/preview?draftKey=k&contentId=blog-2&endpoint=blog"
      )
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toMatch(/slug/i)
  })

  it("returns 500 when microCMS fetch throws for blog", async () => {
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    getDetailNoStore.mockRejectedValueOnce(new Error("microCMS down"))
    const res = await GET(
      req(
        "https://example.com/api/preview?draftKey=k&contentId=blog-3&endpoint=blog"
      )
    )
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).toMatch(/Failed to fetch blog post/)
    expect(errSpy).toHaveBeenCalled()
    errSpy.mockRestore()
  })

  it("returns 400 for announcements without a contentId", async () => {
    const res = await GET(
      req("https://example.com/api/preview?draftKey=k&endpoint=announcements")
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toMatch(/contentId is required/i)
  })
})
