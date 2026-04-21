import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"

// Keep the ContactSection test focused on layout — swap the actual form
// for a deterministic marker.
vi.mock("@/components/home/ContactForm", () => ({
  default: () => <form data-testid="mock-contact-form" />,
}))

import ContactSection from "@/components/home/ContactSection"

describe("Phase 6: ContactSection — editorial 05 block", () => {
  it("anchors at #contact as a section element", () => {
    render(<ContactSection />)
    const section = document.getElementById("contact")
    expect(section).not.toBeNull()
    expect(section?.tagName).toBe("SECTION")
  })

  it("renders the editorial section head (05 / Contact.)", () => {
    render(<ContactSection />)
    expect(
      screen.getByRole("heading", { level: 2, name: /contact\./i })
    ).toBeInTheDocument()
    // CountUp shows "00" pre-intersection; final value 05.
    expect(screen.getByText(/^0[05]$/)).toBeInTheDocument()
  })

  it("hosts the contact form", () => {
    render(<ContactSection />)
    expect(screen.getByTestId("mock-contact-form")).toBeInTheDocument()
  })

  it("renders the aside info list with Services / Area / Location", () => {
    render(<ContactSection />)
    expect(screen.getByText(/Services/i)).toBeInTheDocument()
    expect(screen.getByText(/Area/i)).toBeInTheDocument()
    expect(screen.getByText(/Location/i)).toBeInTheDocument()
    expect(screen.getByText(/リモート/)).toBeInTheDocument()
    expect(screen.getByText(/六本木/)).toBeInTheDocument()
  })
})
