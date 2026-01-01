import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import Loading from "@/app/services/mens-esthe/loading"

describe("MensEstheService loading", () => {
  it("TC-ERR-003: スケルトンUIの表示", () => {
    render(<Loading />)

    expect(screen.getByLabelText("読み込み中: ヒーロー")).toBeInTheDocument()
    expect(screen.getByLabelText("読み込み中: 主な機能")).toBeInTheDocument()
    expect(screen.getByLabelText("読み込み中: 料金")).toBeInTheDocument()
  })
})

