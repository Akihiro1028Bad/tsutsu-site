import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup } from "@testing-library/react"

import PreviewBanner from "@/components/PreviewBanner"

describe("PreviewBanner", () => {
  afterEach(() => {
    cleanup()
    document.documentElement.classList.remove("has-preview-banner")
  })

  it("renders a data-preview-banner marker element", () => {
    const { container } = render(<PreviewBanner />)
    expect(container.querySelector("[data-preview-banner]")).not.toBeNull()
  })

  it("adds the has-preview-banner class to <html> so layout can offset", () => {
    render(<PreviewBanner />)
    expect(
      document.documentElement.classList.contains("has-preview-banner")
    ).toBe(true)
  })

  it("removes the class on unmount", () => {
    const { unmount } = render(<PreviewBanner />)
    expect(
      document.documentElement.classList.contains("has-preview-banner")
    ).toBe(true)
    unmount()
    expect(
      document.documentElement.classList.contains("has-preview-banner")
    ).toBe(false)
  })

  it("includes the PREVIEW label and the draft-notice copy", () => {
    const { getByText } = render(<PreviewBanner />)
    expect(getByText(/preview/i)).toBeDefined()
    expect(getByText(/下書き/)).toBeDefined()
  })

  it("uses role=status so screen readers announce the draft state", () => {
    const { container } = render(<PreviewBanner />)
    const el = container.querySelector("[data-preview-banner]") as HTMLElement
    expect(el.getAttribute("role")).toBe("status")
  })
})
