import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, cleanup } from "@testing-library/react"

const { lenisCtor, lenisDestroy, lenisRaf } = vi.hoisted(() => {
  const destroy = vi.fn()
  const raf = vi.fn()
  const ctor = vi.fn(() => ({ destroy, raf }))
  return {
    lenisCtor: ctor,
    lenisDestroy: destroy,
    lenisRaf: raf,
  }
})

vi.mock("lenis", () => ({
  default: lenisCtor,
}))

import MotionProvider from "@/components/motion/MotionProvider"

interface FakeMql {
  matches: boolean
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
}

function mockMatchMedia(map: Record<string, boolean>) {
  window.matchMedia = vi.fn((query: string): FakeMql => ({
    matches: map[query] ?? false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

describe("MotionProvider", () => {
  let originalMatchMedia: typeof window.matchMedia
  let originalRaf: typeof window.requestAnimationFrame
  let originalCancel: typeof window.cancelAnimationFrame

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    originalRaf = window.requestAnimationFrame
    originalCancel = window.cancelAnimationFrame
    window.requestAnimationFrame = vi.fn(() => 1) as unknown as typeof window.requestAnimationFrame
    window.cancelAnimationFrame = vi.fn() as unknown as typeof window.cancelAnimationFrame
    lenisCtor.mockClear()
    lenisDestroy.mockClear()
    lenisRaf.mockClear()
    sessionStorage.clear()
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
    window.requestAnimationFrame = originalRaf
    window.cancelAnimationFrame = originalCancel
    cleanup()
  })

  it("renders children verbatim", () => {
    mockMatchMedia({})
    const { getByText } = render(
      <MotionProvider>
        <span>hello</span>
      </MotionProvider>
    )
    expect(getByText("hello")).toBeDefined()
  })

  it("does NOT mount Lenis on touch devices (pointer: coarse)", () => {
    mockMatchMedia({
      "(pointer: fine)": false,
      "(prefers-reduced-motion: reduce)": false,
    })
    render(<MotionProvider>x</MotionProvider>)
    expect(lenisCtor).not.toHaveBeenCalled()
  })

  it("does NOT mount Lenis when user prefers reduced motion", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": true,
    })
    render(<MotionProvider>x</MotionProvider>)
    expect(lenisCtor).not.toHaveBeenCalled()
  })

  it("mounts Lenis on desktop with motion enabled", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    render(<MotionProvider>x</MotionProvider>)
    expect(lenisCtor).toHaveBeenCalledTimes(1)
    expect(window.requestAnimationFrame).toHaveBeenCalled()
  })

  it("passes a critically-damped easing function to Lenis", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    render(<MotionProvider>x</MotionProvider>)
    const calls = lenisCtor.mock.calls as unknown as Array<
      Array<{ easing: (t: number) => number }>
    >
    const easing = calls[0][0].easing
    expect(typeof easing).toBe("function")
    expect(easing(0)).toBeCloseTo(0, 2)
    expect(easing(1)).toBeCloseTo(1, 2)
    const mid = easing(0.5)
    expect(mid).toBeGreaterThan(0)
    expect(mid).toBeLessThan(1)
  })

  it("destroys Lenis and cancels rAF on unmount", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    const { unmount } = render(<MotionProvider>x</MotionProvider>)
    unmount()
    expect(lenisDestroy).toHaveBeenCalled()
    expect(window.cancelAnimationFrame).toHaveBeenCalled()
  })

  it("drives the Lenis raf loop — invoking the captured rAF callback forwards the timestamp to Lenis and schedules the next frame", () => {
    mockMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    })
    const callbacks: FrameRequestCallback[] = []
    window.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
      callbacks.push(cb)
      return callbacks.length
    }) as unknown as typeof window.requestAnimationFrame

    render(<MotionProvider>x</MotionProvider>)
    expect(callbacks.length).toBeGreaterThanOrEqual(1)
    const snapshot = callbacks.slice()
    for (const cb of snapshot) {
      cb(16)
    }
    expect(lenisRaf).toHaveBeenCalledWith(16)
    expect(callbacks.length).toBeGreaterThan(snapshot.length)
  })

})
