import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"

vi.mock("@/components/Header", () => ({
  default: () => <div data-testid="mock-header">HEADER</div>,
}))
vi.mock("@/components/Footer", () => ({
  default: () => <div data-testid="mock-footer">FOOTER</div>,
}))
vi.mock("@/components/HeaderSkeleton", () => ({
  default: () => <div data-testid="mock-header-skeleton" />,
}))
vi.mock("@/components/FooterSkeleton", () => ({
  default: () => <div data-testid="mock-footer-skeleton" />,
}))
vi.mock("@/components/ClientComponents", () => ({
  default: () => (
    <div data-testid="mock-client-components">CLIENT_COMPONENTS</div>
  ),
}))

import SiteLayout from "@/app/(site)/layout"

describe("Phase 0: app/(site)/layout.tsx hosts shared chrome for non-home routes", () => {
  it("renders Header within the (site) layout tree", () => {
    render(
      <SiteLayout>
        <main data-testid="child">child</main>
      </SiteLayout>
    )
    expect(screen.getByTestId("mock-header")).toBeInTheDocument()
  })

  it("renders Footer within the (site) layout tree", () => {
    render(
      <SiteLayout>
        <main data-testid="child" />
      </SiteLayout>
    )
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument()
  })

  it("renders ClientComponents (MouseFollower wrapper)", () => {
    render(
      <SiteLayout>
        <main data-testid="child" />
      </SiteLayout>
    )
    expect(screen.getByTestId("mock-client-components")).toBeInTheDocument()
  })

  it("renders the route children", () => {
    render(
      <SiteLayout>
        <main data-testid="child">page content</main>
      </SiteLayout>
    )
    expect(screen.getByTestId("child")).toHaveTextContent("page content")
  })
})
