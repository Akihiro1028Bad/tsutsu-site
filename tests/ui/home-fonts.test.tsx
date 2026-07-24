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
  Zen_Kaku_Gothic_New: () => ({
    className: "__f-zen-kaku",
    variable: "__v-f-display",
  }),
  Zen_Kurenaido: () => ({
    className: "__f-zen-kurenaido",
    variable: "__v-f-hand",
  }),
  Space_Grotesk: () => ({
    className: "__f-space-grotesk",
    variable: "__v-f-label",
  }),
  Noto_Sans_JP: () => ({
    className: "__f-noto-sans-jp",
    variable: "__v-f-body",
  }),
}))

import HomeLayout from "@/app/(home)/layout"

describe("Blueprint: (home) layout — font wiring", () => {
  it("applies all four next/font variable class names to a home-root wrapper", () => {
    render(
      <HomeLayout>
        <main data-testid="child" />
      </HomeLayout>
    )
    const wrapper = screen.getByTestId("child").closest(".home-root") as HTMLElement
    expect(wrapper).toBeInTheDocument()
    expect(wrapper.className).toContain("__v-f-display")
    expect(wrapper.className).toContain("__v-f-hand")
    expect(wrapper.className).toContain("__v-f-label")
    expect(wrapper.className).toContain("__v-f-body")
  })
})
