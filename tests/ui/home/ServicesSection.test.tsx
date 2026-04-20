import { describe, it, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"
import React from "react"

import ServicesSection from "@/components/home/ServicesSection"
import { SERVICES } from "@/lib/home/services-data"

describe("Phase 4: ServicesSection — dark editorial section", () => {
  it("anchors at #services as a section element", () => {
    render(<ServicesSection />)
    const section = document.getElementById("services")
    expect(section).not.toBeNull()
    expect(section?.tagName).toBe("SECTION")
  })

  it("declares a dark theme marker so CSS can invert surface colours", () => {
    render(<ServicesSection />)
    const section = document.getElementById("services")
    expect(section).toHaveAttribute("data-theme", "dark")
  })

  it("renders the editorial section head (02 / Services.)", () => {
    render(<ServicesSection />)
    expect(
      screen.getByRole("heading", { level: 2, name: /services\./i })
    ).toBeInTheDocument()
    expect(screen.getByText(/^02$/)).toBeInTheDocument()
  })

  it("renders one spread per service", () => {
    render(<ServicesSection />)
    const spreads = screen
      .getByRole("heading", { level: 2, name: /services\./i })
      .closest("section")!
      .querySelectorAll(".service-spread")
    expect(spreads.length).toBe(SERVICES.length)
  })

  it("shows each service's § meta label and Japanese name", () => {
    render(<ServicesSection />)
    for (const svc of SERVICES) {
      expect(screen.getByText(svc.meta)).toBeInTheDocument()
      expect(screen.getByText(svc.nameJa)).toBeInTheDocument()
    }
  })

  it("renders the tagline and body copy for every service", () => {
    render(<ServicesSection />)
    const section = screen
      .getByRole("heading", { level: 2, name: /services\./i })
      .closest("section")!
    for (const svc of SERVICES) {
      expect(within(section).getByText(svc.tagline)).toBeInTheDocument()
      expect(within(section).getByText(svc.body)).toBeInTheDocument()
    }
  })
})
