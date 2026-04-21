import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { act, render, screen, cleanup } from "@testing-library/react"
import React from "react"

import RevealOnScroll from "@/components/home/RevealOnScroll"

type ObserverInstance = {
  observe: ReturnType<typeof vi.fn>
  unobserve: ReturnType<typeof vi.fn>
  disconnect: ReturnType<typeof vi.fn>
  takeRecords: ReturnType<typeof vi.fn>
  root: null
  rootMargin: string
  thresholds: number[]
}

let lastObserver: ObserverInstance | null = null
let lastCallback: IntersectionObserverCallback | null = null
const OriginalIntersectionObserver = globalThis.IntersectionObserver
const OriginalMatchMedia = window.matchMedia
let reduceMotion = false

beforeEach(() => {
  lastObserver = null
  lastCallback = null
  reduceMotion = false

  globalThis.IntersectionObserver = vi
    .fn()
    .mockImplementation((cb: IntersectionObserverCallback) => {
      lastCallback = cb
      lastObserver = {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
        takeRecords: vi.fn(() => []),
        root: null,
        rootMargin: "",
        thresholds: [],
      }
      return lastObserver
    }) as unknown as typeof IntersectionObserver

  // RevealOnScroll only consults `.matches`; keep the stub minimal so we
  // don't generate dead-noop functions that hurt coverage.
  window.matchMedia = ((query: string) =>
    ({
      matches:
        reduceMotion && query.includes("prefers-reduced-motion: reduce"),
      media: query,
    }) as MediaQueryList) as typeof window.matchMedia
})

afterEach(() => {
  cleanup()
  globalThis.IntersectionObserver = OriginalIntersectionObserver
  window.matchMedia = OriginalMatchMedia
})

describe("Phase 2: RevealOnScroll — behaviour", () => {
  it("renders its children", () => {
    render(
      <RevealOnScroll>
        <p data-testid="child">hello</p>
      </RevealOnScroll>
    )
    expect(screen.getByTestId("child")).toHaveTextContent("hello")
  })

  it("starts with data-revealed='false' before any intersection", () => {
    render(
      <RevealOnScroll>
        <p data-testid="child" />
      </RevealOnScroll>
    )
    const wrapper = screen.getByTestId("child").parentElement!
    expect(wrapper).toHaveAttribute("data-revealed", "false")
  })

  it("flips to data-revealed='true' once the target intersects the viewport", () => {
    render(
      <RevealOnScroll>
        <p data-testid="child" />
      </RevealOnScroll>
    )
    const wrapper = screen.getByTestId("child").parentElement as HTMLElement
    expect(lastCallback).not.toBeNull()

    act(() => {
      lastCallback!(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
            target: wrapper,
            boundingClientRect: wrapper.getBoundingClientRect(),
            intersectionRect: wrapper.getBoundingClientRect(),
            rootBounds: null,
            time: 0,
          } as IntersectionObserverEntry,
        ],
        lastObserver as unknown as IntersectionObserver
      )
    })

    expect(wrapper).toHaveAttribute("data-revealed", "true")
  })

  it("unobserves the target after the first reveal (one-shot)", () => {
    render(
      <RevealOnScroll>
        <p data-testid="child" />
      </RevealOnScroll>
    )
    const wrapper = screen.getByTestId("child").parentElement as HTMLElement
    act(() => {
      lastCallback!(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
            target: wrapper,
            boundingClientRect: wrapper.getBoundingClientRect(),
            intersectionRect: wrapper.getBoundingClientRect(),
            rootBounds: null,
            time: 0,
          } as IntersectionObserverEntry,
        ],
        lastObserver as unknown as IntersectionObserver
      )
    })
    expect(lastObserver?.unobserve).toHaveBeenCalledWith(wrapper)
  })

  it("ignores non-intersecting entries", () => {
    render(
      <RevealOnScroll>
        <p data-testid="child" />
      </RevealOnScroll>
    )
    const wrapper = screen.getByTestId("child").parentElement as HTMLElement
    act(() => {
      lastCallback!(
        [
          {
            isIntersecting: false,
            intersectionRatio: 0,
            target: wrapper,
            boundingClientRect: wrapper.getBoundingClientRect(),
            intersectionRect: wrapper.getBoundingClientRect(),
            rootBounds: null,
            time: 0,
          } as IntersectionObserverEntry,
        ],
        lastObserver as unknown as IntersectionObserver
      )
    })
    expect(wrapper).toHaveAttribute("data-revealed", "false")
    expect(lastObserver?.unobserve).not.toHaveBeenCalled()
  })

  it("disconnects the observer on unmount", () => {
    const { unmount } = render(
      <RevealOnScroll>
        <p data-testid="child" />
      </RevealOnScroll>
    )
    expect(lastObserver?.disconnect).not.toHaveBeenCalled()
    unmount()
    expect(lastObserver?.disconnect).toHaveBeenCalledTimes(1)
  })

  it("reveals immediately when the user prefers reduced motion", () => {
    reduceMotion = true
    render(
      <RevealOnScroll>
        <p data-testid="child" />
      </RevealOnScroll>
    )
    const wrapper = screen.getByTestId("child").parentElement!
    expect(wrapper).toHaveAttribute("data-revealed", "true")
    // Observer is never created in the reduced-motion branch.
    expect(lastObserver).toBeNull()
  })

  it("merges custom className with the reveal scope class", () => {
    render(
      <RevealOnScroll className="custom-x">
        <p data-testid="child" />
      </RevealOnScroll>
    )
    const wrapper = screen.getByTestId("child").parentElement!
    expect(wrapper.className).toMatch(/reveal/)
    expect(wrapper.className).toMatch(/custom-x/)
  })

  it("defaults to data-direction='up'", () => {
    render(
      <RevealOnScroll>
        <p data-testid="child" />
      </RevealOnScroll>
    )
    const wrapper = screen.getByTestId("child").parentElement!
    expect(wrapper).toHaveAttribute("data-direction", "up")
  })

  it("forwards a custom direction to data-direction", () => {
    render(
      <RevealOnScroll direction="scale">
        <p data-testid="child" />
      </RevealOnScroll>
    )
    const wrapper = screen.getByTestId("child").parentElement!
    expect(wrapper).toHaveAttribute("data-direction", "scale")
  })
})
