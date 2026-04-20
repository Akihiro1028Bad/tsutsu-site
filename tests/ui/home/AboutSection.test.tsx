import { describe, it, expect, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import React from "react"

vi.mock("@/components/home/RevealOnScroll", () => ({
  default: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div data-testid="reveal-wrapper" className={className}>
      {children}
    </div>
  ),
}))

import AboutSection from "@/components/home/AboutSection"
import { ABOUT } from "@/lib/home/about-data"

describe("Phase 4: AboutSection — profile section", () => {
  it("anchors at #about as a section element", () => {
    render(<AboutSection />)
    const section = document.getElementById("about")
    expect(section).not.toBeNull()
    expect(section?.tagName).toBe("SECTION")
  })

  it("renders the editorial section head (03 / About.)", () => {
    render(<AboutSection />)
    expect(
      screen.getByRole("heading", { level: 2, name: /about\./i })
    ).toBeInTheDocument()
    expect(screen.getByText(/^03$/)).toBeInTheDocument()
  })

  it("shows the bilingual name", () => {
    render(<AboutSection />)
    expect(screen.getByText(ABOUT.name.ja)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(ABOUT.name.romanised, "i"))).toBeInTheDocument()
  })

  it("renders every biography paragraph", () => {
    render(<AboutSection />)
    const section = document.getElementById("about")!
    const paragraphs = section.querySelectorAll(".about-paragraph")
    expect(paragraphs.length).toBe(ABOUT.paragraphs.length)
  })

  it("materialises mark segments as <span class='mark'>…</span>", () => {
    render(<AboutSection />)
    const section = document.getElementById("about")!
    const markedSegments = ABOUT.paragraphs
      .flatMap((p) => p)
      .filter((seg) => seg.kind === "mark")
    for (const seg of markedSegments) {
      const el = within(section).getByText(seg.value)
      expect(el.className).toMatch(/mark/)
    }
  })

  it("wraps the profile body in RevealOnScroll", () => {
    render(<AboutSection />)
    expect(screen.getByTestId("reveal-wrapper")).toBeInTheDocument()
  })
})
