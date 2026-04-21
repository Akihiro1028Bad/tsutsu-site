import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup } from "@testing-library/react"

import GrainOverlay from "@/components/motion/GrainOverlay"

describe("GrainOverlay", () => {
  afterEach(cleanup)

  it("renders a [data-grain] node", () => {
    const { container } = render(<GrainOverlay />)
    expect(container.querySelector("[data-grain]")).not.toBeNull()
  })

  it("is aria-hidden because it is purely decorative", () => {
    const { container } = render(<GrainOverlay />)
    const el = container.querySelector("[data-grain]") as HTMLElement
    expect(el.getAttribute("aria-hidden")).toBe("true")
  })

  it("forwards className", () => {
    const { container } = render(<GrainOverlay className="gx" />)
    const el = container.querySelector("[data-grain]") as HTMLElement
    expect(el.className).toMatch(/gx/)
  })

  it("is non-interactive (pointer-events style)", () => {
    const { container } = render(<GrainOverlay />)
    const el = container.querySelector("[data-grain]") as HTMLElement
    // Inline style is the simplest guarantee; class may also cover it.
    expect(el.style.pointerEvents).toBe("none")
  })
})
