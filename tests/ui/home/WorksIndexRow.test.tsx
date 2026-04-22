import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import React from "react"

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string | { src: string }; alt: string }) => {
    const resolved = typeof src === "string" ? src : src.src
    // eslint-disable-next-line @next/next/no-img-element -- mock for next/image in tests
    return <img src={resolved} alt={alt} />
  },
}))

import WorksIndexRow from "@/components/home/works/WorksIndexRow"
import type { FeaturedWork } from "@/lib/types/home"

const baseWork: FeaturedWork = {
  id: "w1",
  indexNumber: "001",
  title: "Sample Work",
  titleJa: "サンプル作品",
  description: "Project description.",
  stack: ["Next.js", "TypeScript"],
  meta: [],
  image: { src: "/work.jpg", alt: "Work thumb", width: 800, height: 600 },
  year: "2024",
  category: "Web",
  summary: "ウェブサイト制作",
  client: "Acme Inc.",
  externalUrl: "https://example.com",
}

beforeEach(() => {
  cleanup()
})

describe("WorksIndexRow — stack list rendering", () => {
  it("renders the stack list when stack has entries", () => {
    render(<WorksIndexRow work={baseWork} />)
    const list = screen.getByRole("list", { name: "Stack" })
    expect(list).toBeInTheDocument()
    expect(screen.getByText("Next.js")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
  })

  it("omits the stack list entirely when stack is empty", () => {
    render(<WorksIndexRow work={{ ...baseWork, stack: [] }} />)
    expect(screen.queryByRole("list", { name: "Stack" })).toBeNull()
  })

  it("renders core meta fields (year, category, client, title)", () => {
    render(<WorksIndexRow work={baseWork} />)
    expect(screen.getByText("2024")).toBeInTheDocument()
    expect(screen.getByText("Web")).toBeInTheDocument()
    expect(screen.getByText("Acme Inc.")).toBeInTheDocument()
    expect(screen.getByText("Sample Work")).toBeInTheDocument()
  })

  it("renders the external link with rel='noopener noreferrer' and target='_blank'", () => {
    render(<WorksIndexRow work={baseWork} />)
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "https://example.com")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })
})
