import { describe, it, expect } from "vitest"
import {
  BUSINESS_OVERVIEW,
  BUSINESS_SERVICES,
  CONTACT_EMAIL,
} from "@/lib/home/business-data"

describe("事業サイト: business-data — 事業内容", () => {
  it("3つの事業を順番に持つ", () => {
    expect(BUSINESS_SERVICES.map((s) => s.title)).toEqual([
      "Webサイト制作",
      "AI導入支援",
      "学習・キャリア支援",
    ])
  })

  it("通し番号は 01 から連番", () => {
    expect(BUSINESS_SERVICES.map((s) => s.no)).toEqual(["01", "02", "03"])
  })

  it("費用は確定していないため全て要相談", () => {
    for (const service of BUSINESS_SERVICES) {
      expect(service.cost).toBe("要相談")
    }
  })

  it("各事業が対象と期間を持つ", () => {
    for (const service of BUSINESS_SERVICES) {
      expect(service.target.length).toBeGreaterThan(0)
      expect(service.span.length).toBeGreaterThan(0)
    }
  })

  it("凍結されている", () => {
    expect(Object.isFrozen(BUSINESS_SERVICES)).toBe(true)
  })
})

describe("事業サイト: business-data — 事業者概要", () => {
  it("屋号・代表者・開業・所在地を含む", () => {
    const labels = BUSINESS_OVERVIEW.map((r) => r.label)
    expect(labels).toEqual(
      expect.arrayContaining(["屋号", "代表者", "開業", "所在地"])
    )
  })

  it("開業は about-data と整合する 2025年8月", () => {
    const opened = BUSINESS_OVERVIEW.find((r) => r.label === "開業")
    expect(opened?.value).toBe("2025年8月")
  })

  it("凍結されている", () => {
    expect(Object.isFrozen(BUSINESS_OVERVIEW)).toBe(true)
  })
})

describe("事業サイト: business-data — 連絡先", () => {
  it("問い合わせ先を公開する", () => {
    expect(CONTACT_EMAIL).toBe("hello@tsutsu.dev")
  })
})
