import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, cleanup } from "@testing-library/react"

const { framerReducedMotion, useInViewMock } = vi.hoisted(() => ({
  framerReducedMotion: { value: false as boolean | null },
  useInViewMock: vi.fn(() => true),
}))

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion")
  return {
    ...actual,
    useReducedMotion: () => framerReducedMotion.value,
    useInView: () => useInViewMock(),
  }
})

import MaskReveal from "@/components/motion/MaskReveal"

describe("MaskReveal", () => {
  beforeEach(() => {
    framerReducedMotion.value = false
    useInViewMock.mockReturnValue(true)
  })

  afterEach(() => {
    cleanup()
  })

  it("renders children", () => {
    const { getByText } = render(
      <MaskReveal>
        <span>visible</span>
      </MaskReveal>
    )
    expect(getByText("visible")).toBeDefined()
  })

  it("renders a plain div for reduced-motion users (no motion wrapper)", () => {
    framerReducedMotion.value = true
    const { container } = render(
      <MaskReveal className="x">
        <span>x</span>
      </MaskReveal>
    )
    const root = container.firstElementChild as HTMLElement
    // motion.div renders a div too, but reduced-motion path should NOT have
    // a clip-path style applied.
    expect(root.tagName).toBe("DIV")
    expect(root.style.clipPath).toBe("")
  })

  it("forwards className to the wrapper", () => {
    const { container } = render(
      <MaskReveal className="extra">x</MaskReveal>
    )
    expect(container.firstElementChild?.className).toMatch(/extra/)
  })

  it("does not throw for unusual directions", () => {
    expect(() =>
      render(<MaskReveal from="top">x</MaskReveal>)
    ).not.toThrow()
    expect(() =>
      render(<MaskReveal from="left">x</MaskReveal>)
    ).not.toThrow()
    expect(() =>
      render(<MaskReveal from="right">x</MaskReveal>)
    ).not.toThrow()
  })
})
