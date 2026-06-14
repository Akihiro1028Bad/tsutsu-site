import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import React from "react"

const { framerReducedMotion } = vi.hoisted(() => ({
  framerReducedMotion: { value: false as boolean | null },
}))

// Bypass framer-motion scroll + transform hooks in jsdom — the depth
// animation is visual-only and not the concern of these structural tests.
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>(
    "framer-motion"
  )
  return {
    ...actual,
    useReducedMotion: () => framerReducedMotion.value,
    useScroll: () => ({
      scrollYProgress: { get: () => 0, on: () => () => {} },
    }),
    useTransform: () => 0,
  }
})

interface FakeMql {
  matches: boolean
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
}

function mockMatchMedia(map: Record<string, boolean>) {
  window.matchMedia = vi.fn((query: string): FakeMql => ({
    matches: map[query] === true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

import SectionDepthWrapper from "@/components/home/SectionDepthWrapper"

describe("SectionDepthWrapper", () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    framerReducedMotion.value = false
  })
  afterEach(() => {
    window.matchMedia = originalMatchMedia
    cleanup()
  })

  it("renders children on desktop with motion allowed", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = false
    render(
      <SectionDepthWrapper>
        <span>content</span>
      </SectionDepthWrapper>
    )
    expect(screen.getByText("content")).not.toBeNull()
  })

  it("marks the wrapper data-depth='on' on desktop with motion allowed", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = false
    const { container } = render(
      <SectionDepthWrapper>
        <span>content</span>
      </SectionDepthWrapper>
    )
    const sheet = container.querySelector("[data-depth='on']") as HTMLElement
    expect(sheet).not.toBeNull()
  })

  it("renders children on touch devices without animation wrapper", () => {
    mockMatchMedia({ "(pointer: fine)": false })
    framerReducedMotion.value = false
    const { container } = render(
      <SectionDepthWrapper>
        <span>content</span>
      </SectionDepthWrapper>
    )
    expect(screen.getByText("content")).not.toBeNull()
    expect(container.querySelector("[data-depth='on']")).toBeNull()
  })

  it("renders children under prefers-reduced-motion without animation wrapper", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = true
    const { container } = render(
      <SectionDepthWrapper>
        <span>content</span>
      </SectionDepthWrapper>
    )
    expect(screen.getByText("content")).not.toBeNull()
    expect(container.querySelector("[data-depth='on']")).toBeNull()
  })

  it("accepts custom scaleRange, opacityRange, and blurRange props", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = false
    render(
      <SectionDepthWrapper
        scaleRange={[1, 0.9]}
        opacityRange={[1, 0.3]}
        blurRange={[0, 8]}
      >
        <span>custom</span>
      </SectionDepthWrapper>
    )
    expect(screen.getByText("custom")).not.toBeNull()
  })
})
