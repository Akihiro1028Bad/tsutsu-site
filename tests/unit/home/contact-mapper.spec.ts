import { describe, it, expect } from "vitest"
import {
  CONTACT_TOPICS,
  contactFormSchema,
  formValuesToApiPayload,
  type ContactFormValues,
} from "@/lib/home/contact-mapper"

const baseValues: ContactFormValues = {
  name: "堤 暁寛",
  company: "",
  email: "hello@example.com",
  topic: CONTACT_TOPICS[0],
  message: "ご相談内容の本文です。",
}

describe("Phase 6: contact-mapper — CONTACT_TOPICS", () => {
  it("exposes the four editorial topic choices in design order", () => {
    expect(CONTACT_TOPICS).toEqual([
      "開発パートナー（業務委託）",
      "スポット・単発案件",
      "キャリア相談・メンタリング",
      "その他",
    ])
  })
})

describe("Phase 6: contact-mapper — Zod schema", () => {
  it("accepts a valid payload", () => {
    const result = contactFormSchema.safeParse(baseValues)
    expect(result.success).toBe(true)
  })

  it("rejects an empty name", () => {
    const result = contactFormSchema.safeParse({ ...baseValues, name: "" })
    expect(result.success).toBe(false)
  })

  it("rejects names longer than 100 characters", () => {
    const result = contactFormSchema.safeParse({
      ...baseValues,
      name: "x".repeat(101),
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid email addresses", () => {
    const result = contactFormSchema.safeParse({
      ...baseValues,
      email: "not-an-email",
    })
    expect(result.success).toBe(false)
  })

  it("rejects a topic that is not one of the allowed editorial options", () => {
    const result = contactFormSchema.safeParse({
      ...baseValues,
      topic: "採用のご相談" as ContactFormValues["topic"],
    })
    expect(result.success).toBe(false)
  })

  it("rejects an empty message", () => {
    const result = contactFormSchema.safeParse({ ...baseValues, message: "" })
    expect(result.success).toBe(false)
  })

  it("rejects when company + message combined exceeds 5000 characters", () => {
    const result = contactFormSchema.safeParse({
      ...baseValues,
      company: "x".repeat(50),
      message: "y".repeat(4990),
    })
    expect(result.success).toBe(false)
  })

  it("allows an empty company (optional field)", () => {
    const result = contactFormSchema.safeParse({ ...baseValues, company: "" })
    expect(result.success).toBe(true)
  })
})

describe("Phase 6: contact-mapper — formValuesToApiPayload", () => {
  it("maps topic to subject and keeps name/email as-is", () => {
    const payload = formValuesToApiPayload(baseValues)
    expect(payload.name).toBe(baseValues.name)
    expect(payload.email).toBe(baseValues.email)
    expect(payload.subject).toBe(baseValues.topic)
  })

  it("passes the message through unchanged when company is empty", () => {
    const payload = formValuesToApiPayload(baseValues)
    expect(payload.message).toBe(baseValues.message)
  })

  it("prepends a 【会社名】 block when company is filled", () => {
    const payload = formValuesToApiPayload({
      ...baseValues,
      company: "RST Agency",
    })
    expect(payload.message).toMatch(/^【会社名】RST Agency/)
    expect(payload.message).toContain(baseValues.message)
  })

  it("produces a payload with the four fields the API expects", () => {
    const payload = formValuesToApiPayload(baseValues)
    expect(Object.keys(payload).sort()).toEqual([
      "email",
      "message",
      "name",
      "subject",
    ])
  })
})
