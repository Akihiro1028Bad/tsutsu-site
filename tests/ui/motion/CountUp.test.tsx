import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, cleanup, act } from "@testing-library/react"
import CountUp from "@/components/motion/CountUp"

interface FakeMql {
  matches: boolean
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
}

let lastObserverCb: IntersectionObserverCallback | null = null
const observerInstance = {
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn(() => []),
  root: null as Element | null,
  rootMargin: "",
  thresholds: [],
}

function fireIntersect(target: Element) {
  act(() => {
    lastObserverCb?.(
      [
        {
          isIntersecting: true,
          intersectionRatio: 1,
          target,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: 0,
        } as IntersectionObserverEntry,
      ],
      observerInstance as unknown as IntersectionObserver
    )
  })
}

function setupMatchMedia(reduce: boolean) {
  window.matchMedia = vi.fn(
    (query: string): FakeMql => ({
      matches: reduce && query.includes("prefers-reduced-motion"),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
  ) as unknown as typeof window.matchMedia
}

describe("CountUp", () => {
  let originalIO: typeof globalThis.IntersectionObserver
  let originalMatchMedia: typeof window.matchMedia
  let originalRaf: typeof window.requestAnimationFrame
  let originalCancel: typeof window.cancelAnimationFrame
  let nowMs = 0
  const rafQueue: Array<(t: number) => void> = []

  beforeEach(() => {
    originalIO = globalThis.IntersectionObserver
    originalMatchMedia = window.matchMedia
    originalRaf = window.requestAnimationFrame
    originalCancel = window.cancelAnimationFrame
    setupMatchMedia(false)
    lastObserverCb = null
    observerInstance.observe.mockClear()
    observerInstance.unobserve.mockClear()
    observerInstance.disconnect.mockClear()
    nowMs = 0
    rafQueue.length = 0

    globalThis.IntersectionObserver = vi
      .fn()
      .mockImplementation((cb: IntersectionObserverCallback) => {
        lastObserverCb = cb
        return observerInstance
      }) as unknown as typeof IntersectionObserver

    window.requestAnimationFrame = vi.fn((cb: (t: number) => void) => {
      rafQueue.push(cb)
      return rafQueue.length
    }) as unknown as typeof window.requestAnimationFrame
    window.cancelAnimationFrame = vi.fn() as unknown as typeof window.cancelAnimationFrame
  })

  afterEach(() => {
    cleanup()
    globalThis.IntersectionObserver = originalIO
    window.matchMedia = originalMatchMedia
    window.requestAnimationFrame = originalRaf
    window.cancelAnimationFrame = originalCancel
  })

  function flush(toMs: number) {
    while (rafQueue.length > 0 && nowMs < toMs) {
      nowMs += 16
      const cb = rafQueue.shift()!
      act(() => cb(nowMs))
    }
  }

  it("renders 0 (or pad) before intersection", () => {
    const { container } = render(<CountUp end={5} pad={2} />)
    expect(container.textContent).toBe("00")
  })

  it("counts up to end after scroll-in", () => {
    const { container } = render(<CountUp end={10} duration={100} />)
    fireIntersect(container.firstElementChild!)
    flush(200)
    expect(container.textContent).toBe("10")
  })

  it("respects pad zero-padding", () => {
    const { container } = render(<CountUp end={3} pad={3} duration={100} />)
    fireIntersect(container.firstElementChild!)
    flush(200)
    expect(container.textContent).toBe("003")
  })

  it("renders the final value immediately for reduced-motion users", () => {
    setupMatchMedia(true)
    const { container } = render(<CountUp end={42} pad={2} />)
    expect(container.textContent).toBe("42")
  })

  it("appends the suffix and prefix", () => {
    const { container } = render(
      <CountUp end={50} duration={100} prefix="$" suffix="+" />
    )
    fireIntersect(container.firstElementChild!)
    flush(200)
    expect(container.textContent).toBe("$50+")
  })

  it("respects decimals", () => {
    const { container } = render(
      <CountUp end={3.14} decimals={2} duration={100} />
    )
    fireIntersect(container.firstElementChild!)
    flush(200)
    expect(container.textContent).toBe("3.14")
  })

  it("disconnects the observer on unmount", () => {
    const { unmount } = render(<CountUp end={1} />)
    unmount()
    expect(observerInstance.disconnect).toHaveBeenCalled()
  })
})
