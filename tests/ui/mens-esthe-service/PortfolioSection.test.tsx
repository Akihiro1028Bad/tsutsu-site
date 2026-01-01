import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { PortfolioSection } from "@/components/MensEstheService/PortfolioSection"
import { portfolioItemsMock } from "@/tests/ui/mens-esthe-service/mocks"

describe("PortfolioSection", () => {
  it("TC-002-003: 店舗名とリンク付きの制作実績アイテムを表示する", () => {
    render(<PortfolioSection portfolioItems={portfolioItemsMock} />)
    expect(screen.getByText("サンプル店舗A")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "サンプル店舗Aのサイトを開く" })).toBeInTheDocument()
  })

  it("TC-002-003: サムネイルなしの制作実績アイテムを表示する", () => {
    render(<PortfolioSection portfolioItems={[{ ...portfolioItemsMock[0], thumbnailImage: undefined }]} />)
    expect(screen.getByText("サンプル店舗A")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "サンプル店舗Aのサイトを開く" })).toBeInTheDocument()
  })

  it("TC-002-004: 空の制作実績が「現在準備中です」メッセージを表示する", () => {
    render(<PortfolioSection portfolioItems={[]} />)
    expect(screen.getByText("現在準備中です")).toBeInTheDocument()
  })

  it("TC-EDGE-001: 空の制作実績がメッセージを表示", () => {
    render(<PortfolioSection portfolioItems={[]} />)
    expect(screen.getByText("現在準備中です")).toBeInTheDocument()
  })

  it("TC-002-005: リンククリックで新しいタブを開く", () => {
    const open = vi.spyOn(window, "open").mockReturnValue(window)
    render(<PortfolioSection portfolioItems={portfolioItemsMock} />)

    fireEvent.click(screen.getByRole("link", { name: "サンプル店舗Aのサイトを開く" }))

    expect(open).toHaveBeenCalledWith("https://example.com/", "_blank", "noopener,noreferrer")
    open.mockRestore()
  })

  it("TC-002-006: window.open失敗でエラーメッセージを表示する", () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null)
    render(<PortfolioSection portfolioItems={portfolioItemsMock} />)

    fireEvent.click(screen.getByRole("link", { name: "サンプル店舗Aのサイトを開く" }))

    expect(screen.getByRole("alert")).toBeInTheDocument()
    open.mockRestore()
  })

  it("TC-002-006: URL形式不正でエラーメッセージを表示する", () => {
    const open = vi.spyOn(window, "open").mockReturnValue(window)
    render(<PortfolioSection portfolioItems={[{ ...portfolioItemsMock[0], siteUrl: "not-a-url" }]} />)

    fireEvent.click(screen.getByRole("link", { name: "サンプル店舗Aのサイトを開く" }))

    expect(open).not.toHaveBeenCalled()
    expect(screen.getByRole("alert")).toBeInTheDocument()
    open.mockRestore()
  })

  it("TC-EDGE-002: 無効なリンクがエラーを表示", () => {
    const open = vi.spyOn(window, "open").mockReturnValue(window)
    render(<PortfolioSection portfolioItems={[{ ...portfolioItemsMock[0], siteUrl: "not-a-url" }]} />)

    fireEvent.click(screen.getByRole("link", { name: "サンプル店舗Aのサイトを開く" }))

    expect(open).not.toHaveBeenCalled()
    expect(screen.getByRole("alert")).toBeInTheDocument()
    open.mockRestore()
  })
})
