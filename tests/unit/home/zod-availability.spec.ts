import { describe, it, expect } from "vitest"
import { z } from "zod"

describe("Phase 0: zod dependency available for form validation", () => {
  const formSchema = z.object({
    name: z.string().min(1).max(100),
    age: z.number().int().min(0).max(150),
  })

  it("parses valid input", () => {
    const result = formSchema.parse({ name: "tsutsu", age: 30 })
    expect(result).toEqual({ name: "tsutsu", age: 30 })
  })

  it("rejects empty name", () => {
    expect(() => formSchema.parse({ name: "", age: 30 })).toThrow()
  })

  it("rejects out-of-range age", () => {
    expect(() => formSchema.parse({ name: "x", age: -1 })).toThrow()
  })

  it("rejects wrong type for name", () => {
    expect(() => formSchema.parse({ name: 123, age: 30 })).toThrow()
  })
})
