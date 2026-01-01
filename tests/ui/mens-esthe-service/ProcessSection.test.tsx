import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ProcessSection } from "@/components/MensEstheService/ProcessSection"
import { processStepsMock } from "@/tests/ui/mens-esthe-service/mocks"

describe("ProcessSection", () => {
  it("TC-003-002: ステップ番号、タイトル、説明付きで順序通りに表示される", () => {
    render(<ProcessSection processSteps={processStepsMock} />)

    processStepsMock.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument()
      expect(screen.getByText(step.description)).toBeInTheDocument()
      expect(screen.getByLabelText(`ステップ${step.stepNumber}`)).toBeInTheDocument()
    })
  })

  it("TC-003-003: ステップ番号が正しく表示される", () => {
    render(<ProcessSection processSteps={processStepsMock} />)

    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
  })

  it("TC-003-002: アイコンが未指定のステップも表示できる", () => {
    render(<ProcessSection processSteps={[{ ...processStepsMock[0], icon: undefined }]} />)
    expect(screen.getByText("ヒアリング")).toBeInTheDocument()
  })
})

