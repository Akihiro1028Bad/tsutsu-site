import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, cleanup, act } from "@testing-library/react"

import Loader from "@/components/motion/Loader"

interface FakeMql {
  matches: boolean
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
}

function mockMatchMedia(reducedMotion: boolean) {
  window.matchMedia = vi.fn(
    (query: string): FakeMql => ({
      matches: reducedMotion && query.includes("prefers-reduced-motion"),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
  ) as unknown as typeof window.matchMedia
}

describe("Loader", () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    mockMatchMedia(false)
    sessionStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    window.matchMedia = originalMatchMedia
    sessionStorage.clear()
  })

  it("renders the loader on the first visit (no session flag yet)", () => {
    const { container } = render(<Loader />)
    expect(container.querySelector("[data-loader]")).not.toBeNull()
  })

  it("renders the brand mark inside the loader", () => {
    const { getByText } = render(<Loader />)
    expect(getByText(/tsutsu/i)).toBeDefined()
  })

  it("removes itself after the hold timer elapses", () => {
    const { container } = render(<Loader holdMs={400} exitMs={200} />)
    expect(container.querySelector("[data-loader]")).not.toBeNull()
    act(() => {
      vi.advanceTimersByTime(400 + 200 + 50)
    })
    expect(container.querySelector("[data-loader]")).toBeNull()
  })

  it("sets the session flag so subsequent mounts skip the loader", () => {
    const { container, unmount } = render(<Loader holdMs={100} exitMs={100} />)
    act(() => {
      vi.advanceTimersByTime(100 + 100 + 10)
    })
    expect(sessionStorage.getItem("tsutsu:loader-shown")).toBe("1")
    unmount()
    const second = render(<Loader />)
    expect(second.container.querySelector("[data-loader]")).toBeNull()
  })

  it("skips entirely for reduced-motion users and sets the flag", () => {
    mockMatchMedia(true)
    const { container } = render(<Loader />)
    expect(container.querySelector("[data-loader]")).toBeNull()
    expect(sessionStorage.getItem("tsutsu:loader-shown")).toBe("1")
  })

  it("has aria-hidden on the overlay (decorative)", () => {
    const { container } = render(<Loader />)
    const el = container.querySelector("[data-loader]") as HTMLElement
    expect(el.getAttribute("aria-hidden")).toBe("true")
  })
})
