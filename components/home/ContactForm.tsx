"use client"

import { useState } from "react"
import MagneticLink from "@/components/motion/MagneticLink"
import {
  CONTACT_TOPICS,
  contactFormSchema,
  formValuesToApiPayload,
  type ContactFormValues,
  type ContactTopic,
} from "@/lib/home/contact-mapper"

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; text: string }
  | { kind: "error"; text: string }

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  company: "",
  email: "",
  topic: CONTACT_TOPICS[0],
  message: "",
}

const SUCCESS_TEXT =
  "お問い合わせありがとうございます。1営業日以内にご返信します。"

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES)
  const [status, setStatus] = useState<Status>({ kind: "idle" })

  function update<K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const parsed = contactFormSchema.safeParse(values)
    if (!parsed.success) {
      // Zod always populates at least one issue when success=false.
      const [firstIssue] = parsed.error.issues
      setStatus({ kind: "error", text: firstIssue.message })
      return
    }

    setStatus({ kind: "sending" })
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formValuesToApiPayload(parsed.data)),
      })
      if (!res.ok) {
        let serverMessage: string | undefined
        try {
          const data = (await res.json()) as { error?: string }
          serverMessage = data.error
        } catch {
          // Non-JSON response body — fall through to the generic message.
        }
        const text =
          serverMessage ??
          "送信に失敗しました。時間をおいて再度お試しください。"
        setStatus({ kind: "error", text })
        return
      }
      setValues(INITIAL_VALUES)
      setStatus({ kind: "success", text: `✓ ${SUCCESS_TEXT}` })
    } catch (err) {
      const text =
        err instanceof Error ? err.message : "送信に失敗しました"
      setStatus({ kind: "error", text })
    }
  }

  const isSending = status.kind === "sending"
  const statusText =
    status.kind === "sending"
      ? "— Sending…"
      : status.kind === "success" || status.kind === "error"
        ? status.text
        : ""

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <label className="contact-form__label">
          お名前 / Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            disabled={isSending}
          />
        </label>
        <label className="contact-form__label">
          会社・屋号 / Company
          <input
            type="text"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            disabled={isSending}
          />
        </label>
      </div>

      <label className="contact-form__label">
        メール / Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          disabled={isSending}
        />
      </label>

      <label className="contact-form__label">
        ご相談の種類 / Topic
        <select
          name="topic"
          value={values.topic}
          onChange={(e) => update("topic", e.target.value as ContactTopic)}
          disabled={isSending}
        >
          {CONTACT_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="contact-form__label">
        ご相談内容 / Message
        <textarea
          name="message"
          rows={5}
          placeholder="ご予算・希望開始時期・お役に立てそうな範囲などを添えていただけると助かります。"
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          disabled={isSending}
        />
      </label>

      <MagneticLink strength={0.25} max={12}>
        <button
          type="submit"
          className="contact-form__submit"
          disabled={isSending}
        >
          Send inquiry <span aria-hidden="true">↗</span>
        </button>
      </MagneticLink>

      <div
        className="contact-form__status"
        role="status"
        aria-live="polite"
        data-status-kind={status.kind}
      >
        {statusText}
      </div>
    </form>
  )
}
