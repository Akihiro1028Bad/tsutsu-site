import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, cleanup } from "@testing-library/react"

const { framerReducedMotion } = vi.hoisted(() => ({
  framerReducedMotion: { value: false as boolean | null },
}))

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>(
    "framer-motion"
  )
  return {
    ...actual,
    useReducedMotion: () => framerReducedMotion.value,
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

import WorksEdgeAccent from "@/components/home/WorksEdgeAccent"

describe("WorksEdgeAccent", () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    framerReducedMotion.value = false
  })
  afterEach(() => {
    window.matchMedia = originalMatchMedia
    cleanup()
  })

  it("renders a decorative hairline span on desktop with motion allowed", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = false
    const { container } = render(<WorksEdgeAccent />)
    const accent = container.querySelector(".works__edge-accent") as HTMLElement
    expect(accent).not.toBeNull()
    expect(accent.getAttribute("aria-hidden")).toBe("true")
  })

  it("renders nothing on touch devices", () => {
    mockMatchMedia({ "(pointer: fine)": false })
    framerReducedMotion.value = false
    const { container } = render(<WorksEdgeAccent />)
    expect(container.querySelector(".works__edge-accent")).toBeNull()
  })

  it("renders nothing under prefers-reduced-motion", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = true
    const { container } = render(<WorksEdgeAccent />)
    expect(container.querySelector(".works__edge-accent")).toBeNull()
  })
})
