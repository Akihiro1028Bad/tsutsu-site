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

import WorksEdgeAccent from "@/components/home/WorksEdgeAccent"

describe("WorksEdgeAccent", () => {
  beforeEach(() => {
    framerReducedMotion.value = false
  })
  afterEach(() => {
    cleanup()
  })

  it("renders a decorative hairline span when motion is allowed", () => {
    framerReducedMotion.value = false
    const { container } = render(<WorksEdgeAccent />)
    const accent = container.querySelector(".works__edge-accent") as HTMLElement
    expect(accent).not.toBeNull()
    expect(accent.getAttribute("aria-hidden")).toBe("true")
  })

  it("renders nothing under prefers-reduced-motion", () => {
    framerReducedMotion.value = true
    const { container } = render(<WorksEdgeAccent />)
    expect(container.querySelector(".works__edge-accent")).toBeNull()
  })
})
