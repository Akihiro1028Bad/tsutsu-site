import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

const scrollToSectionMock = vi.hoisted(() => vi.fn())

vi.mock("@/lib/utils/mens-esthe-service", () => ({
  scrollToSection: scrollToSectionMock,
}))

import { HeroSection } from "@/components/MensEstheService/HeroSection"
import { serviceInfoMock } from "@/tests/ui/mens-esthe-service/mocks"

describe("HeroSection", () => {
  it("TC-005-002: CTAクリックで#contactへスクロールする", () => {
    scrollToSectionMock.mockClear()
    render(<HeroSection serviceInfo={serviceInfoMock} />)

    fireEvent.click(screen.getByRole("button", { name: "お問い合わせセクションへ移動" }))

    expect(scrollToSectionMock).toHaveBeenCalledWith("contact")
  })

  it("TC-001-004: サービス名、キャッチコピー、価値提案を表示する", () => {
    render(<HeroSection serviceInfo={serviceInfoMock} />)

    expect(
      screen.getByRole("heading", { level: 1, name: serviceInfoMock.name }),
    ).toBeInTheDocument()
    expect(screen.getByText(serviceInfoMock.catchphrase)).toBeInTheDocument()
    expect(screen.getByText(serviceInfoMock.valueProposition)).toBeInTheDocument()
  })

  it("CTAクリックでcontactへスクロールを試みる（要素が無い場合でも落ちない）", () => {
    scrollToSectionMock.mockClear()
    render(<HeroSection serviceInfo={serviceInfoMock} />)
    fireEvent.click(screen.getByRole("button", { name: "お問い合わせセクションへ移動" }))
    expect(scrollToSectionMock).toHaveBeenCalled()
  })
})
