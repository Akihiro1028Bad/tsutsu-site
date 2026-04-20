import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"

vi.mock("@/components/home/HomeNav", () => ({
  default: () => <div data-testid="mock-home-nav">HOME_NAV</div>,
}))
vi.mock("@/components/home/HomeFooter", () => ({
  default: () => <div data-testid="mock-home-footer">HOME_FOOTER</div>,
}))
// Sentinel mocks: legacy Header/Footer must NOT be referenced by (home) layout.
vi.mock("@/components/Header", () => ({
  default: () => <div data-testid="mock-legacy-header" />,
}))
vi.mock("@/components/Footer", () => ({
  default: () => <div data-testid="mock-legacy-footer" />,
}))

import HomeLayout from "@/app/(home)/layout"

describe("Phase 0: app/(home)/layout.tsx hosts the new editorial chrome", () => {
  it("renders HomeNav inside the (home) layout tree", () => {
    render(
      <HomeLayout>
        <main data-testid="child" />
      </HomeLayout>
    )
    expect(screen.getByTestId("mock-home-nav")).toBeInTheDocument()
  })

  it("renders HomeFooter inside the (home) layout tree", () => {
    render(
      <HomeLayout>
        <main data-testid="child" />
      </HomeLayout>
    )
    expect(screen.getByTestId("mock-home-footer")).toBeInTheDocument()
  })

  it("renders the route children", () => {
    render(
      <HomeLayout>
        <main data-testid="child">home content</main>
      </HomeLayout>
    )
    expect(screen.getByTestId("child")).toHaveTextContent("home content")
  })

  it("does NOT render the legacy Header (segregated to (site) layout)", () => {
    render(
      <HomeLayout>
        <main data-testid="child" />
      </HomeLayout>
    )
    expect(screen.queryByTestId("mock-legacy-header")).not.toBeInTheDocument()
  })

  it("does NOT render the legacy Footer (segregated to (site) layout)", () => {
    render(
      <HomeLayout>
        <main data-testid="child" />
      </HomeLayout>
    )
    expect(screen.queryByTestId("mock-legacy-footer")).not.toBeInTheDocument()
  })
})
