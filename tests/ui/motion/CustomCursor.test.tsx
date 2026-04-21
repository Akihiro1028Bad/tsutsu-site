import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, cleanup } from "@testing-library/react"

import CustomCursor from "@/components/motion/CustomCursor"

interface FakeMql {
  matches: boolean
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
}

function mockMatchMedia(map: Record<string, boolean>) {
  window.matchMedia = vi.fn(
    (query: string): FakeMql => ({
      matches: map[query] ?? false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
  ) as unknown as typeof window.matchMedia
}

describe("CustomCursor", () => {
  let originalMatchMedia: typeof window.matchMedia
  let originalRaf: typeof window.requestAnimationFrame
  let originalCancel: typeof window.cancelAnimationFrame
  const rafQueue: Array<(t: number) => void> = []

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    originalRaf = window.requestAnimationFrame
    originalCancel = window.cancelAnimationFrame
    rafQueue.length = 0

    window.requestAnimationFrame = vi.fn((cb: (t: number) => void) => {
      rafQueue.push(cb)
      return rafQueue.length
    }) as unknown as typeof window.requestAnimationFrame
    window.cancelAnimationFrame = vi.fn() as unknown as typeof window.cancelAnimationFrame
  })

  afterEach(() => {
    cleanup()
    window.matchMedia = originalMatchMedia
    window.requestAnimationFrame = originalRaf
    window.cancelAnimationFrame = originalCancel
    document.documentElement.classList.remove("has-custom-cursor")
  })

  it("renders nothing on touch devices", () => {
    mockMatchMedia({ "(pointer: fine)": false })
    const { container } = render(<CustomCursor />)
    expect(container.querySelector("[data-custom-cursor]")).toBeNull()
  })

  it("renders nothing for reduced-motion users", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": true,
    })
    const { container } = render(<CustomCursor />)
    expect(container.querySelector("[data-custom-cursor]")).toBeNull()
  })

  it("mounts a cursor node on desktop + motion-allowed", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    const { container } = render(<CustomCursor />)
    expect(container.querySelector("[data-custom-cursor]")).not.toBeNull()
  })

  it("adds the has-custom-cursor class to <html> when active", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    render(<CustomCursor />)
    expect(
      document.documentElement.classList.contains("has-custom-cursor")
    ).toBe(true)
  })

  it("does not add has-custom-cursor class on touch", () => {
    mockMatchMedia({ "(pointer: fine)": false })
    render(<CustomCursor />)
    expect(
      document.documentElement.classList.contains("has-custom-cursor")
    ).toBe(false)
  })

  it("removes the class on unmount", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    const { unmount } = render(<CustomCursor />)
    expect(
      document.documentElement.classList.contains("has-custom-cursor")
    ).toBe(true)
    unmount()
    expect(
      document.documentElement.classList.contains("has-custom-cursor")
    ).toBe(false)
  })

  it("exposes a data-state attribute that toggles on hover over interactive targets", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    const { container } = render(
      <>
        <a href="#x">link</a>
        <CustomCursor />
      </>
    )
    const cursor = container.querySelector(
      "[data-custom-cursor]"
    ) as HTMLElement
    // Initial state is "default"
    expect(cursor.getAttribute("data-state")).toBe("default")
  })
})
