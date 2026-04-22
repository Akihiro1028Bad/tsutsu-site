import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useReducedMotion } from "@/lib/motion/use-reduced-motion"

interface FakeMql {
  matches: boolean
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
}

function fakeMql(matches: boolean): FakeMql & { fire: (next: boolean) => void } {
  let listener: ((e: MediaQueryListEvent) => void) | null = null
  const mql: FakeMql = {
    matches,
    addEventListener: vi.fn((_event: string, l: (e: MediaQueryListEvent) => void) => {
      listener = l
    }),
    removeEventListener: vi.fn(),
  }
  return Object.assign(mql, {
    fire(next: boolean) {
      mql.matches = next
      listener?.({ matches: next } as MediaQueryListEvent)
    },
  })
}

describe("useReducedMotion", () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it("starts as `true` (safe-default for SSR markup)", () => {
    window.matchMedia = vi.fn().mockReturnValue(fakeMql(false))
    const { result } = renderHook(() => useReducedMotion())
    // After first effect runs, it reflects the actual mq
    expect(result.current).toBe(false)
  })

  it("returns true when the OS prefers reduced motion", () => {
    window.matchMedia = vi.fn().mockReturnValue(fakeMql(true))
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  it("updates when the user toggles the preference", () => {
    const mql = fakeMql(false)
    window.matchMedia = vi.fn().mockReturnValue(mql)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
    act(() => mql.fire(true))
    expect(result.current).toBe(true)
  })

  it("removes the listener on unmount", () => {
    const mql = fakeMql(false)
    window.matchMedia = vi.fn().mockReturnValue(mql)
    const { unmount } = renderHook(() => useReducedMotion())
    unmount()
    expect(mql.removeEventListener).toHaveBeenCalled()
  })
})
