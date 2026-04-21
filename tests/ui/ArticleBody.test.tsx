import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup } from "@testing-library/react"

import ArticleBody from "@/components/ArticleBody"

describe("ArticleBody", () => {
  afterEach(cleanup)

  it("renders a <main> with the article-page + data-style='modern' markers", () => {
    const { container } = render(
      <ArticleBody>
        <p>body</p>
      </ArticleBody>
    )
    const main = container.querySelector("main")
    expect(main).not.toBeNull()
    expect(main?.classList.contains("article-page")).toBe(true)
    expect(main?.getAttribute("data-style")).toBe("modern")
  })

  it("forwards children verbatim", () => {
    const { getByText } = render(
      <ArticleBody>
        <p>hello</p>
      </ArticleBody>
    )
    expect(getByText("hello")).toBeDefined()
  })

  it("marks itself data-preview='true' when previewing a draft", () => {
    const { container } = render(
      <ArticleBody isPreview>
        <p>body</p>
      </ArticleBody>
    )
    const main = container.querySelector("main")
    expect(main?.getAttribute("data-preview")).toBe("true")
  })

  it("omits data-preview when not previewing", () => {
    const { container } = render(
      <ArticleBody>
        <p>body</p>
      </ArticleBody>
    )
    const main = container.querySelector("main")
    expect(main?.hasAttribute("data-preview")).toBe(false)
  })
})
