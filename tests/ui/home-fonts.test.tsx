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
  IBM_Plex_Sans_JP: () => ({
    className: "__f-plex-jp",
    variable: "__v-f-body",
  }),
  IBM_Plex_Mono: () => ({
    className: "__f-plex-mono",
    variable: "__v-f-mono",
  }),
}))

import HomeLayout from "@/app/(home)/layout"

describe("Blueprint: (home) layout — font wiring", () => {
  it("applies both next/font variable class names to a home-root wrapper", () => {
    render(
      <HomeLayout>
        <main data-testid="child" />
      </HomeLayout>
    )
    const wrapper = screen.getByTestId("child").closest(".home-root") as HTMLElement
    expect(wrapper).toBeInTheDocument()
    expect(wrapper.className).toContain("__v-f-body")
    expect(wrapper.className).toContain("__v-f-mono")
  })
})
