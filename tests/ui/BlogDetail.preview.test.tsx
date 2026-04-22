import { describe, it, expect, afterEach, vi } from "vitest"
import { render, cleanup } from "@testing-library/react"
import React from "react"

// ContentDetail pulls in heavyweight DOMPurify / highlight code — mock it
// out so we can isolate JSON-LD emission behaviour.
vi.mock("@/components/ContentDetail", () => ({
  __esModule: true,
  default: () => <div data-testid="content-detail" />,
}))

// next/script receives the JSON-LD payload via dangerouslySetInnerHTML;
// we expose it on a data attribute here so we can assert its presence /
// absence and inspect content without rendering HTML unsafely.
vi.mock("next/script", () => ({
  __esModule: true,
  default: ({
    id,
    type,
    dangerouslySetInnerHTML,
  }: {
    id: string
    type?: string
    dangerouslySetInnerHTML?: { __html: string }
  }) => (
    <script
      id={id}
      type={type}
      data-testid="next-script"
      data-payload={dangerouslySetInnerHTML?.__html ?? ""}
    />
  ),
}))

import BlogDetail from "@/components/BlogDetail"
import type { BlogPost } from "@/lib/types/blog"

const fixture: BlogPost = {
  id: "post-1",
  title: "Sample Post",
  slug: "sample-post",
  content: "<p>body</p>",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-02T00:00:00.000Z",
  publishedAt: "2026-01-01T00:00:00.000Z",
  revisedAt: "2026-01-02T00:00:00.000Z",
}

describe("BlogDetail — preview mode suppresses JSON-LD", () => {
  afterEach(cleanup)

  it("emits JSON-LD on production render", async () => {
    const ui = (await BlogDetail({ post: fixture })) as React.ReactElement
    const { container } = render(ui)
    const script = container.querySelector("script[type='application/ld+json']")
    expect(script).not.toBeNull()
    const payload = (script as HTMLElement).getAttribute("data-payload")
    expect(payload).toMatch(/"@type":"BlogPosting"/)
  })

  it("falls back from revisedAt → updatedAt → publishedAt for dateModified in JSON-LD", async () => {
    // Missing revisedAt → dateModified picks up updatedAt.
    const noRevised: BlogPost = { ...fixture, revisedAt: "" }
    const ui1 = (await BlogDetail({ post: noRevised })) as React.ReactElement
    const { container: c1 } = render(ui1)
    const payload1 = (c1.querySelector("script[type='application/ld+json']") as HTMLElement)
      .getAttribute("data-payload") as string
    expect(JSON.parse(payload1).dateModified).toBe(fixture.updatedAt)

    cleanup()

    // Both revisedAt and updatedAt missing → dateModified falls back to publishedAt.
    const onlyPublished: BlogPost = { ...fixture, revisedAt: "", updatedAt: "" }
    const ui2 = (await BlogDetail({ post: onlyPublished })) as React.ReactElement
    const { container: c2 } = render(ui2)
    const payload2 = (c2.querySelector("script[type='application/ld+json']") as HTMLElement)
      .getAttribute("data-payload") as string
    expect(JSON.parse(payload2).dateModified).toBe(fixture.publishedAt)
  })

  it("omits JSON-LD when isPreview is true (draft content, no crawler leak)", async () => {
    const ui = (await BlogDetail({ post: fixture, isPreview: true })) as React.ReactElement
    const { container } = render(ui)
    const script = container.querySelector("script[type='application/ld+json']")
    expect(script).toBeNull()
  })

  it("still renders the article body when in preview mode", async () => {
    const ui = (await BlogDetail({ post: fixture, isPreview: true })) as React.ReactElement
    const { getByTestId } = render(ui)
    expect(getByTestId("content-detail")).toBeDefined()
  })
})
