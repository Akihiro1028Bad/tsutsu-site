import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, waitFor, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"

import ContactForm from "@/components/home/ContactForm"

const OriginalFetch = globalThis.fetch
let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  fetchMock = vi.fn()
  globalThis.fetch = fetchMock as unknown as typeof fetch
})

afterEach(() => {
  cleanup()
  globalThis.fetch = OriginalFetch
})

function mockFetchOk(bodyJson: unknown = { message: "ok" }) {
  fetchMock.mockResolvedValueOnce(
    new Response(JSON.stringify(bodyJson), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  )
}

function mockFetchError(status: number, bodyJson: unknown = { error: "bad" }) {
  fetchMock.mockResolvedValueOnce(
    new Response(JSON.stringify(bodyJson), {
      status,
      headers: { "content-type": "application/json" },
    })
  )
}

describe("Phase 6: ContactForm — rendering", () => {
  it("labels the five editorial fields", () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Topic/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument()
  })

  it("renders a submit button with the editorial copy", () => {
    render(<ContactForm />)
    expect(
      screen.getByRole("button", { name: /send inquiry/i })
    ).toBeInTheDocument()
  })

  it("renders a status live-region", () => {
    render(<ContactForm />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })
})

describe("Phase 6: ContactForm — submission", () => {
  it("posts the mapped payload to /api/contact and shows success copy", async () => {
    const user = userEvent.setup()
    mockFetchOk()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/Name/i), "堤 暁寛")
    await user.type(screen.getByLabelText(/Email/i), "a@b.co")
    // Exercise the topic select change path as well.
    await user.selectOptions(
      screen.getByLabelText(/Topic/i),
      "スポット・単発案件"
    )
    await user.type(screen.getByLabelText(/Message/i), "はじめまして。")
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe("/api/contact")
    expect(init?.method).toBe("POST")
    const body = JSON.parse(init?.body as string)
    expect(body).toEqual({
      name: "堤 暁寛",
      email: "a@b.co",
      subject: "スポット・単発案件",
      message: "はじめまして。",
    })

    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toMatch(/ありがとう/)
    )
  })

  it("prepends the company block to message when Company is filled", async () => {
    const user = userEvent.setup()
    mockFetchOk()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/Name/i), "Tsutsumi")
    await user.type(screen.getByLabelText(/Company/i), "RST Agency")
    await user.type(screen.getByLabelText(/Email/i), "a@b.co")
    await user.type(screen.getByLabelText(/Message/i), "hi")
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    const body = JSON.parse(fetchMock.mock.calls[0][1]?.body as string)
    expect(body.message).toMatch(/^【会社名】RST Agency/)
    expect(body.message).toContain("hi")
  })

  it("surfaces a validation error without calling fetch", async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    // missing name & message — type only an invalid email
    await user.type(screen.getByLabelText(/Email/i), "broken")
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    expect(fetchMock).not.toHaveBeenCalled()
    expect(screen.getByRole("status").textContent).toMatch(/.+/)
  })

  it("shows an API error message when the server rejects the submission", async () => {
    const user = userEvent.setup()
    mockFetchError(400, { error: "メールの送信に失敗しました" })
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/Name/i), "x")
    await user.type(screen.getByLabelText(/Email/i), "a@b.co")
    await user.type(screen.getByLabelText(/Message/i), "hi")
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toMatch(/送信に失敗/)
    )
  })

  it("falls back to a generic error when the server returns non-JSON", async () => {
    const user = userEvent.setup()
    fetchMock.mockResolvedValueOnce(
      new Response("<!doctype html><body>500</body>", {
        status: 500,
        headers: { "content-type": "text/html" },
      })
    )
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/Name/i), "x")
    await user.type(screen.getByLabelText(/Email/i), "a@b.co")
    await user.type(screen.getByLabelText(/Message/i), "hi")
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toMatch(/送信/)
    )
  })

  it("handles fetch rejecting with an Error", async () => {
    const user = userEvent.setup()
    fetchMock.mockRejectedValueOnce(new Error("network down"))
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/Name/i), "x")
    await user.type(screen.getByLabelText(/Email/i), "a@b.co")
    await user.type(screen.getByLabelText(/Message/i), "hi")
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toMatch(/network down/)
    )
  })

  it("handles fetch rejecting with a non-Error value", async () => {
    const user = userEvent.setup()
    fetchMock.mockRejectedValueOnce("unknown-string-rejection")
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/Name/i), "x")
    await user.type(screen.getByLabelText(/Email/i), "a@b.co")
    await user.type(screen.getByLabelText(/Message/i), "hi")
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toMatch(/送信に失敗/)
    )
  })
})
