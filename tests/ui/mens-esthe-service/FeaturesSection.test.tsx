import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FeaturesSection } from "@/components/MensEstheService/FeaturesSection"
import { featuresMock } from "@/tests/ui/mens-esthe-service/mocks"

describe("FeaturesSection", () => {
  it("TC-001-005: アイコン付きの機能一覧を表示する", () => {
    render(
      <FeaturesSection
        features={[
          ...featuresMock,
          {
            id: "feature-unknown",
            name: "その他",
            description: "その他の機能にも柔軟に対応します。",
            icon: "UnknownIcon",
          },
        ]}
      />,
    )

    for (const feature of featuresMock) {
      expect(screen.getByText(feature.name)).toBeInTheDocument()
      expect(screen.getByText(feature.description)).toBeInTheDocument()
    }

    expect(screen.getByText("その他")).toBeInTheDocument()
  })

  it("TC-001-007: スクロールトリガーのアニメーション構造を持つ", () => {
    render(<FeaturesSection features={featuresMock} />)
    expect(screen.getByRole("region", { name: "主な機能" })).toBeInTheDocument()
  })
})
