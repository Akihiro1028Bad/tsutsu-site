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
    const payload = script?.getAttribute("data-payload") ?? ""
    expect(payload).toMatch(/"@type":"BlogPosting"/)
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
