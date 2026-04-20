import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"

vi.mock("@/components/home/HomeNav", () => ({
  default: () => <div data-testid="mock-home-nav" />,
}))
vi.mock("@/components/home/HomeFooter", () => ({
  default: () => <div data-testid="mock-home-footer" />,
}))

// Mock next/font/google so the font loader returns deterministic CSS variable
// class names. We assert on those class names below.
vi.mock("next/font/google", () => ({
  DM_Serif_Display: () => ({
    className: "__f-dm-serif",
    variable: "__v-f-display",
  }),
  Shippori_Mincho: () => ({
    className: "__f-shippori",
    variable: "__v-f-jp-display",
  }),
  Zen_Kaku_Gothic_New: () => ({
    className: "__f-zen-kaku",
    variable: "__v-f-body",
  }),
  Space_Mono: () => ({
    className: "__f-space-mono",
    variable: "__v-f-mono",
  }),
}))

import HomeLayout from "@/app/(home)/layout"

describe("Phase 1: (home) layout — font wiring", () => {
  it("applies all four next/font variable class names to a home-root wrapper", () => {
    render(
      <HomeLayout>
        <main data-testid="child" />
      </HomeLayout>
    )
    const wrapper = screen.getByTestId("child").closest(".home-root") as HTMLElement
    expect(wrapper).toBeInTheDocument()
    expect(wrapper.className).toContain("__v-f-display")
    expect(wrapper.className).toContain("__v-f-jp-display")
    expect(wrapper.className).toContain("__v-f-body")
    expect(wrapper.className).toContain("__v-f-mono")
  })
})
