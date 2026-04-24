import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, cleanup } from "@testing-library/react"

const { framerReducedMotion, useTransformMock } = vi.hoisted(() => ({
  framerReducedMotion: { value: false as boolean },
  useTransformMock: vi.fn(),
}))

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
    useTransform: (...args: unknown[]) => {
      useTransformMock(...args)
      return 0
    },
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

import WorksTilt from "@/components/home/WorksTilt"

describe("WorksTilt", () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    framerReducedMotion.value = false
    useTransformMock.mockClear()
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
    cleanup()
  })

  it("renders children inside the tilt shell", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    const { container, getByText } = render(
      <WorksTilt>
        <span>inner</span>
      </WorksTilt>
    )
    expect(getByText("inner")).toBeDefined()
    expect(container.querySelector(".works__tilt")).not.toBeNull()
  })

  function rotateRange(): unknown {
    // rotateX is the first useTransform each render. After useIsDesktop's
    // effect resolves, the component re-renders — so we read the 2nd-to-last
    // call (rotateX of the final render) rather than the last (y of the
    // final render).
    const calls = useTransformMock.mock.calls
    return calls[calls.length - 2][2]
  }

  it("uses a non-zero rotateX range on desktop with motion allowed", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = false
    render(<WorksTilt>x</WorksTilt>)
    expect(rotateRange()).toEqual([1.2, 0])
  })

  it("collapses to [0,0] on touch devices", () => {
    mockMatchMedia({ "(pointer: fine)": false })
    framerReducedMotion.value = false
    const { container } = render(<WorksTilt>x</WorksTilt>)
    expect(rotateRange()).toEqual([0, 0])
    expect(
      container
        .querySelector(".works__tilt")
        ?.getAttribute("data-works-tilt")
    ).toBe("off")
  })

  it("collapses to [0,0] under prefers-reduced-motion", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = true
    const { container } = render(<WorksTilt>x</WorksTilt>)
    expect(rotateRange()).toEqual([0, 0])
    expect(
      container
        .querySelector(".works__tilt")
        ?.getAttribute("data-works-tilt")
    ).toBe("off")
  })

  it("marks data-works-tilt='on' when active", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = false
    const { container } = render(<WorksTilt>x</WorksTilt>)
    expect(
      container
        .querySelector(".works__tilt")
        ?.getAttribute("data-works-tilt")
    ).toBe("on")
  })
})
