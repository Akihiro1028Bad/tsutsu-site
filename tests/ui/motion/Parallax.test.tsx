import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, cleanup } from "@testing-library/react"

const { framerReducedMotion, useScrollMock, useTransformMock } = vi.hoisted(() => ({
  framerReducedMotion: { value: false as boolean | null },
  useScrollMock: vi.fn(),
  useTransformMock: vi.fn(),
}))

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion")
  return {
    ...actual,
    useReducedMotion: () => framerReducedMotion.value,
    useScroll: (...args: Parameters<typeof actual.useScroll>) => {
      useScrollMock(...args)
      return { scrollYProgress: { get: () => 0, on: () => () => {} } }
    },
    useTransform: (...args: unknown[]) => {
      useTransformMock(...args)
      return 0
    },
  }
})

import Parallax from "@/components/motion/Parallax"

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

describe("Parallax", () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    framerReducedMotion.value = false
    useScrollMock.mockClear()
    useTransformMock.mockClear()
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
    cleanup()
  })

  it("renders children", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    const { getByText } = render(
      <Parallax>
        <span>content</span>
      </Parallax>
    )
    expect(getByText("content")).toBeDefined()
  })

  it("forwards className", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    const { container } = render(<Parallax className="x">x</Parallax>)
    expect(container.querySelector(".x")).not.toBeNull()
  })

  it("uses non-zero translate range when desktop + motion-allowed", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = false
    render(<Parallax offset={-100}>x</Parallax>)
    // useTransform(scrollYProgress, [0, 1], [-half, half])
    const lastCall = useTransformMock.mock.calls.at(-1)
    expect(lastCall?.[2]).toEqual([50, -50])
  })

  it("collapses to a [0, 0] range on touch devices", () => {
    mockMatchMedia({ "(pointer: fine)": false })
    framerReducedMotion.value = false
    render(<Parallax offset={-100}>x</Parallax>)
    const lastCall = useTransformMock.mock.calls.at(-1)
    expect(lastCall?.[2]).toEqual([0, 0])
  })

  it("collapses to a [0, 0] range when reduced-motion is preferred", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = true
    render(<Parallax offset={-100}>x</Parallax>)
    const lastCall = useTransformMock.mock.calls.at(-1)
    expect(lastCall?.[2]).toEqual([0, 0])
  })

  it("sets data-parallax='off' when disabled", () => {
    mockMatchMedia({ "(pointer: fine)": false })
    framerReducedMotion.value = false
    const { container } = render(<Parallax>x</Parallax>)
    const el = container.firstElementChild
    expect(el?.getAttribute("data-parallax")).toBe("off")
  })

  it("sets data-parallax='on' when active", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = false
    const { container } = render(<Parallax>x</Parallax>)
    const el = container.firstElementChild
    expect(el?.getAttribute("data-parallax")).toBe("on")
  })
})
