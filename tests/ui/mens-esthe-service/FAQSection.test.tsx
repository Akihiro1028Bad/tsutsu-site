import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FAQSection } from "@/components/MensEstheService/FAQSection"
import { faqItemsMock } from "@/tests/ui/mens-esthe-service/mocks"

describe("FAQSection", () => {
  it("TC-004-002: FAQアイテムが表示され、回答は最初は非表示", () => {
    render(<FAQSection faqItems={faqItemsMock} />)

    expect(screen.getByRole("button", { name: "制作期間はどれくらいですか？" })).toBeInTheDocument()
    expect(screen.queryByText("内容にもよりますが、通常は1〜2週間程度です。")).not.toBeInTheDocument()
  })

  it("TC-004-003: クリックで回答表示が切り替わり、aria-expandedが更新される", () => {
    render(<FAQSection faqItems={faqItemsMock} />)
    const button = screen.getByRole("button", { name: "制作期間はどれくらいですか？" })

    expect(button).toHaveAttribute("aria-expanded", "false")

    fireEvent.click(button)
    expect(button).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText("内容にもよりますが、通常は1〜2週間程度です。")).toBeInTheDocument()

    fireEvent.click(button)
    expect(button).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByText("内容にもよりますが、通常は1〜2週間程度です。")).not.toBeInTheDocument()
  })

  it("TC-004-004: Enter/Spaceキーで回答が切り替わる", () => {
    render(<FAQSection faqItems={faqItemsMock} />)
    const button = screen.getByRole("button", { name: "制作期間はどれくらいですか？" })

    fireEvent.keyDown(button, { key: "Enter" })
    expect(button).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText("内容にもよりますが、通常は1〜2週間程度です。")).toBeInTheDocument()

    fireEvent.keyDown(button, { key: " " })
    expect(button).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByText("内容にもよりますが、通常は1〜2週間程度です。")).not.toBeInTheDocument()
  })

  it("TC-004-005: 複数のFAQアイテムが独立して切り替わる", () => {
    render(<FAQSection faqItems={faqItemsMock} />)

    const first = screen.getByRole("button", { name: "制作期間はどれくらいですか？" })
    const second = screen.getByRole("button", { name: "素材がなくても依頼できますか？" })

    fireEvent.click(first)
    expect(first).toHaveAttribute("aria-expanded", "true")
    expect(second).toHaveAttribute("aria-expanded", "false")

    fireEvent.click(second)
    expect(first).toHaveAttribute("aria-expanded", "true")
    expect(second).toHaveAttribute("aria-expanded", "true")
  })
})

