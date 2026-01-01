import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { StructuredData } from "@/components/MensEstheService/StructuredData"

describe("StructuredData", () => {
  it("TC-SEO-002: JSON-LDを含むscriptタグが存在する", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "メンズエステ店向けサイト制作",
      description: "メンズエステ店向けにサービスページを制作します。",
    }

    const { container } = render(<StructuredData data={data} />)

    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    expect(script?.textContent).toContain('"@type":"Service"')
    expect(screen.queryByLabelText("構造化データ")).not.toBeInTheDocument()
  })
})
