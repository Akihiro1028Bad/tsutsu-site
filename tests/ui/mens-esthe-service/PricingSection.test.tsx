import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

const scrollToSectionMock = vi.hoisted(() => vi.fn())

vi.mock("@/lib/utils/mens-esthe-service", () => ({
  scrollToSection: scrollToSectionMock,
}))

import { PricingSection } from "@/components/MensEstheService/PricingSection"
import { pricingItemsMock } from "@/tests/ui/mens-esthe-service/mocks"

describe("PricingSection", () => {
  it("TC-001-006: 料金カテゴリを表示する", () => {
    render(<PricingSection pricingItems={pricingItemsMock} />)

    expect(screen.getByRole("heading", { name: "料金" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "初期費用" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "月額費用" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "オプション" })).toBeInTheDocument()
  })

  it("TC-005-003: ContactCTAクリックで#contactへスクロールする", () => {
    scrollToSectionMock.mockClear()
    render(<PricingSection pricingItems={pricingItemsMock} />)
    fireEvent.click(screen.getByRole("button", { name: "お問い合わせセクションへ移動" }))

    expect(scrollToSectionMock).toHaveBeenCalledWith("contact")
  })
})
