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

import JournalListRow from "@/components/home/JournalListRow"

beforeEach(() => {
  cleanup()
})

describe("JournalListRow — thumbnail placeholder", () => {
  it("renders image thumb when image is provided", () => {
    render(
      <ul>
        <JournalListRow
          variant="news"
          item={{
            id: "a1",
            title: "Headline",
            dateDisplay: "2026-03-01",
            chip: "News",
            href: "/announcements/a1",
            image: { src: "/hero.jpg", alt: "Hero", width: 80, height: 80 },
          }}
        />
      </ul>,
    )
    expect(screen.getByAltText("Hero")).toBeInTheDocument()
  })

  it("falls back to the chip's first letter (uppercased) when no image is provided", () => {
    render(
      <ul>
        <JournalListRow
          variant="news"
          item={{
            id: "a2",
            title: "Headline",
            dateDisplay: "2026-03-01",
            chip: "news",
            href: "/announcements/a2",
          }}
        />
      </ul>,
    )
    expect(screen.getByText("N")).toBeInTheDocument()
  })

  it("falls back to '·' when chip is empty and no image is provided", () => {
    render(
      <ul>
        <JournalListRow
          variant="blog"
          item={{
            id: "b1",
            title: "Untagged",
            dateDisplay: "2026-02-10",
            chip: "",
            href: "/blog/b1",
          }}
        />
      </ul>,
    )
    expect(screen.getByText("·")).toBeInTheDocument()
  })

  it("uses the blog chip class when variant is 'blog'", () => {
    const { container } = render(
      <ul>
        <JournalListRow
          variant="blog"
          item={{
            id: "b2",
            title: "Post",
            dateDisplay: "2026-02-10",
            chip: "Frontend",
            href: "/blog/b2",
          }}
        />
      </ul>,
    )
    expect(container.querySelector(".journal__category")).not.toBeNull()
    expect(container.querySelector(".journal__kind")).toBeNull()
  })

  it("uses the news chip class when variant is 'news'", () => {
    const { container } = render(
      <ul>
        <JournalListRow
          variant="news"
          item={{
            id: "a3",
            title: "Update",
            dateDisplay: "2026-03-01",
            chip: "News",
            href: "/announcements/a3",
          }}
        />
      </ul>,
    )
    expect(container.querySelector(".journal__kind")).not.toBeNull()
    expect(container.querySelector(".journal__category")).toBeNull()
  })
})
