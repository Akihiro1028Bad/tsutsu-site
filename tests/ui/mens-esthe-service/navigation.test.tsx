import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SectionNav } from "@/components/MensEstheService/SectionNav"
import { SECTION_IDS } from "@/lib/types/mens-esthe-service"

describe("Navigation", () => {
  it("TC-EDGE-003: 長いページでナビゲーションが動作", () => {
    render(
      <>
        <SectionNav />
        <div style={{ height: 10_000 }} />
        <section id={SECTION_IDS.pricing} />
      </>,
    )

    const link = screen.getByRole("link", { name: "料金" })
    expect(link).toHaveAttribute("href", "#pricing")
    fireEvent.click(link)
  })
})
