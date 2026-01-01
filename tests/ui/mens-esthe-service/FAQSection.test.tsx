import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FAQSection } from "@/components/MensEstheService/FAQSection"
import { faqItemsMock } from "@/tests/ui/mens-esthe-service/mocks"

describe("FAQSection", () => {
  it("TC-004-002: FAQアイテムが表示され、回答は最初は非表示", () => {
    render(<FAQSection faqItems={faqItemsMock} />)

    expect(screen.getByRole("button", { name: "スマホから更新できますか？" })).toBeInTheDocument()
    expect(
      screen.queryByText("はい、スマートフォンからも更新可能です。管理画面はスマホでも使いやすい設計になっています。"),
    ).not.toBeInTheDocument()
  })

  it("TC-004-003: クリックで回答表示が切り替わり、aria-expandedが更新される", async () => {
    render(<FAQSection faqItems={faqItemsMock} />)
    const button = screen.getByRole("button", { name: "スマホから更新できますか？" })

    expect(button).toHaveAttribute("aria-expanded", "false")

    fireEvent.click(button)
    expect(button).toHaveAttribute("aria-expanded", "true")
    expect(
      screen.getByText("はい、スマートフォンからも更新可能です。管理画面はスマホでも使いやすい設計になっています。"),
    ).toBeInTheDocument()

    fireEvent.click(button)
    expect(button).toHaveAttribute("aria-expanded", "false")
    await waitFor(
      () => {
        expect(
          screen.queryByText("はい、スマートフォンからも更新可能です。管理画面はスマホでも使いやすい設計になっています。"),
        ).not.toBeInTheDocument()
      },
      { timeout: 2000 },
    )
  })

  it("TC-004-004: Enter/Spaceキーで回答が切り替わる", async () => {
    render(<FAQSection faqItems={faqItemsMock} />)
    const button = screen.getByRole("button", { name: "スマホから更新できますか？" })

    fireEvent.keyDown(button, { key: "Enter" })
    expect(button).toHaveAttribute("aria-expanded", "true")
    expect(
      screen.getByText("はい、スマートフォンからも更新可能です。管理画面はスマホでも使いやすい設計になっています。"),
    ).toBeInTheDocument()

    fireEvent.keyDown(button, { key: " " })
    expect(button).toHaveAttribute("aria-expanded", "false")
    await waitFor(
      () => {
        expect(
          screen.queryByText("はい、スマートフォンからも更新可能です。管理画面はスマホでも使いやすい設計になっています。"),
        ).not.toBeInTheDocument()
      },
      { timeout: 2000 },
    )
  })

  it("TC-004-005: 複数のFAQアイテムが独立して切り替わる", () => {
    render(<FAQSection faqItems={faqItemsMock} />)

    const first = screen.getByRole("button", { name: "スマホから更新できますか？" })
    const second = screen.getByRole("button", { name: "複数のスタッフで管理できますか？" })

    fireEvent.click(first)
    expect(first).toHaveAttribute("aria-expanded", "true")
    expect(second).toHaveAttribute("aria-expanded", "false")

    fireEvent.click(second)
    expect(first).toHaveAttribute("aria-expanded", "true")
    expect(second).toHaveAttribute("aria-expanded", "true")
  })
})

