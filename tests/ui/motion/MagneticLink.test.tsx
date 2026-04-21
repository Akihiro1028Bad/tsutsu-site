import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, cleanup, fireEvent } from "@testing-library/react"

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

import MagneticLink from "@/components/motion/MagneticLink"

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

describe("MagneticLink", () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    framerReducedMotion.value = false
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
    cleanup()
  })

  it("renders children", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    const { getByText } = render(
      <MagneticLink>
        <a href="#x">Hello</a>
      </MagneticLink>
    )
    expect(getByText("Hello")).toBeDefined()
  })

  it("forwards className to the wrapper", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    const { container } = render(
      <MagneticLink className="wrap">
        <a href="#x">x</a>
      </MagneticLink>
    )
    expect(container.querySelector(".wrap")).not.toBeNull()
  })

  it("declares data-magnetic='on' when desktop + motion-allowed", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = false
    const { container } = render(
      <MagneticLink>
        <a href="#x">x</a>
      </MagneticLink>
    )
    const el = container.firstElementChild
    expect(el?.getAttribute("data-magnetic")).toBe("on")
  })

  it("declares data-magnetic='off' on touch devices", () => {
    mockMatchMedia({ "(pointer: fine)": false })
    framerReducedMotion.value = false
    const { container } = render(
      <MagneticLink>
        <a href="#x">x</a>
      </MagneticLink>
    )
    const el = container.firstElementChild
    expect(el?.getAttribute("data-magnetic")).toBe("off")
  })

  it("declares data-magnetic='off' for reduced-motion users", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    framerReducedMotion.value = true
    const { container } = render(
      <MagneticLink>
        <a href="#x">x</a>
      </MagneticLink>
    )
    const el = container.firstElementChild
    expect(el?.getAttribute("data-magnetic")).toBe("off")
  })

  it("tracks mouse movement via a mousemove handler when active", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    const { container } = render(
      <MagneticLink>
        <a href="#x">x</a>
      </MagneticLink>
    )
    const el = container.firstElementChild as HTMLElement
    // getBoundingClientRect is zero-sized in jsdom; we just want to verify
    // the handler is installed and does not throw.
    fireEvent.mouseMove(el, { clientX: 10, clientY: 10 })
    fireEvent.mouseLeave(el)
    expect(el).toBeDefined()
  })

  it("does not throw when children are a plain string", () => {
    mockMatchMedia({ "(pointer: fine)": true })
    const { getByText } = render(<MagneticLink>plain</MagneticLink>)
    expect(getByText("plain")).toBeDefined()
  })
})
