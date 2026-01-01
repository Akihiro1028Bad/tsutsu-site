import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import ErrorPage from "@/app/services/mens-esthe/error"

describe("MensEstheService error", () => {
  it("TC-ERR-001: エラーメッセージと再試行ボタンの表示", () => {
    const reset = vi.fn()
    render(<ErrorPage error={new Error("boom")} reset={reset} />)

    expect(screen.getByRole("heading", { name: "エラーが発生しました" })).toBeInTheDocument()
    expect(screen.getByText("boom")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "再試行" })).toBeInTheDocument()
  })

  it("TC-ERR-002: 再試行ボタンがreset関数を呼び出す", () => {
    const reset = vi.fn()
    render(<ErrorPage error={new Error("boom")} reset={reset} />)

    fireEvent.click(screen.getByRole("button", { name: "再試行" }))
    expect(reset).toHaveBeenCalledTimes(1)
  })
})

