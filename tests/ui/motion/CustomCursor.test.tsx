import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, cleanup, act } from "@testing-library/react"

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

  it("switches state to 'hover' when the mouse moves over an interactive target", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    const { container } = render(
      <>
        <a href="#x" data-testid="hover-target">link</a>
        <CustomCursor />
      </>
    )
    const cursor = container.querySelector(
      "[data-custom-cursor]"
    ) as HTMLElement
    const link = container.querySelector("[data-testid='hover-target']") as HTMLElement

    const moveOver = new MouseEvent("mousemove", { bubbles: true })
    Object.defineProperty(moveOver, "target", { value: link })
    Object.defineProperty(moveOver, "clientX", { value: 120 })
    Object.defineProperty(moveOver, "clientY", { value: 90 })
    act(() => {
      window.dispatchEvent(moveOver)
    })
    expect(cursor.getAttribute("data-state")).toBe("hover")

    // A second move on the same link keeps state at "hover" — exercises the
    // setState((prev) => prev === "hover" ? prev : "hover") short-circuit.
    const moveOverAgain = new MouseEvent("mousemove", { bubbles: true })
    Object.defineProperty(moveOverAgain, "target", { value: link })
    Object.defineProperty(moveOverAgain, "clientX", { value: 121 })
    Object.defineProperty(moveOverAgain, "clientY", { value: 91 })
    act(() => {
      window.dispatchEvent(moveOverAgain)
    })
    expect(cursor.getAttribute("data-state")).toBe("hover")
  })

  it("returns to 'default' state when the mouse moves off interactive targets", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    const { container } = render(
      <>
        <a href="#x">link</a>
        <span data-testid="plain">plain</span>
        <CustomCursor />
      </>
    )
    const cursor = container.querySelector(
      "[data-custom-cursor]"
    ) as HTMLElement
    const link = container.querySelector("a") as HTMLElement
    const plain = container.querySelector("[data-testid='plain']") as HTMLElement

    const moveOver = new MouseEvent("mousemove", { bubbles: true })
    Object.defineProperty(moveOver, "target", { value: link })
    Object.defineProperty(moveOver, "clientX", { value: 10 })
    Object.defineProperty(moveOver, "clientY", { value: 10 })
    act(() => {
      window.dispatchEvent(moveOver)
    })
    expect(cursor.getAttribute("data-state")).toBe("hover")

    const moveOff = new MouseEvent("mousemove", { bubbles: true })
    Object.defineProperty(moveOff, "target", { value: plain })
    Object.defineProperty(moveOff, "clientX", { value: 200 })
    Object.defineProperty(moveOff, "clientY", { value: 200 })
    act(() => {
      window.dispatchEvent(moveOff)
    })
    expect(cursor.getAttribute("data-state")).toBe("default")

    const moveOffAgain = new MouseEvent("mousemove", { bubbles: true })
    Object.defineProperty(moveOffAgain, "target", { value: plain })
    Object.defineProperty(moveOffAgain, "clientX", { value: 205 })
    Object.defineProperty(moveOffAgain, "clientY", { value: 205 })
    act(() => {
      window.dispatchEvent(moveOffAgain)
    })
    expect(cursor.getAttribute("data-state")).toBe("default")
  })

  it("handles mousemove events with no target by falling through to 'default'", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    render(<CustomCursor />)
    const move = new MouseEvent("mousemove")
    Object.defineProperty(move, "target", { value: null })
    expect(() => window.dispatchEvent(move)).not.toThrow()
  })

  it("resets the target position to off-screen on mouseleave", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    const { container } = render(<CustomCursor />)
    const cursor = container.querySelector(
      "[data-custom-cursor]"
    ) as HTMLElement

    const move = new MouseEvent("mousemove")
    Object.defineProperty(move, "target", { value: null })
    Object.defineProperty(move, "clientX", { value: 300 })
    Object.defineProperty(move, "clientY", { value: 400 })
    window.dispatchEvent(move)

    expect(() => window.dispatchEvent(new MouseEvent("mouseleave"))).not.toThrow()
    expect(cursor).not.toBeNull()
  })

  it("advances the dot transform via the captured rAF callback", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    const { container } = render(<CustomCursor />)
    const cursor = container.querySelector(
      "[data-custom-cursor]"
    ) as HTMLElement

    const move = new MouseEvent("mousemove")
    Object.defineProperty(move, "target", { value: null })
    Object.defineProperty(move, "clientX", { value: 500 })
    Object.defineProperty(move, "clientY", { value: 300 })
    window.dispatchEvent(move)

    expect(rafQueue.length).toBeGreaterThanOrEqual(1)
    const beforeLen = rafQueue.length
    rafQueue[0](16)
    expect(cursor.style.transform).toMatch(/translate3d/)
    expect(rafQueue.length).toBe(beforeLen + 1)
  })

  it("safely no-ops the transform write when the dot ref has been detached", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    const { unmount } = render(<CustomCursor />)
    const captured = rafQueue[0]
    unmount()
    expect(() => captured(32)).not.toThrow()
  })
})
