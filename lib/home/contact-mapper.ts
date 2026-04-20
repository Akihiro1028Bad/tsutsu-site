import { z } from "zod"

/** Editorial topic choices; displayed order matches the design. */
export const CONTACT_TOPICS = [
  "開発パートナー（業務委託）",
  "スポット・単発案件",
  "キャリア相談・メンタリング",
  "その他",
] as const

export type ContactTopic = (typeof CONTACT_TOPICS)[number]

/**
 * API-side limits (mirrors app/api/contact/route.ts).
 * Kept here so client validation can fail fast before the network hop.
 */
const LIMITS = {
  name: 100,
  email: 255,
  company: 100,
  subject: 200,
  message: 5000,
} as const

const COMPANY_PREFIX = (company: string) => `【会社名】${company}\n\n`

export const contactFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "お名前を入力してください")
      .max(LIMITS.name, `お名前は${LIMITS.name}文字以内でお願いします`),
    company: z
      .string()
      .max(LIMITS.company, `会社名は${LIMITS.company}文字以内でお願いします`),
    email: z
      .string()
      .email("メールアドレスの形式が正しくありません")
      .max(LIMITS.email),
    topic: z.enum(CONTACT_TOPICS),
    message: z
      .string()
      .min(1, "ご相談内容を入力してください")
      .max(LIMITS.message, `本文は${LIMITS.message}文字以内でお願いします`),
  })
  .superRefine((v, ctx) => {
    const combined =
      (v.company ? COMPANY_PREFIX(v.company) : "") + v.message
    if (combined.length > LIMITS.message) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["message"],
        message: `本文と会社名の合計が${LIMITS.message}文字を超えています`,
      })
    }
  })

export type ContactFormValues = z.infer<typeof contactFormSchema>

export interface ContactApiPayload {
  readonly name: string
  readonly email: string
  readonly subject: string
  readonly message: string
}

/**
 * Pure mapping from the form shape to the `/api/contact` request body.
 * Call `contactFormSchema.parse(...)` first; this function assumes
 * already-validated input.
 */
export function formValuesToApiPayload(
  v: ContactFormValues
): ContactApiPayload {
  const prefix = v.company ? COMPANY_PREFIX(v.company) : ""
  return {
    name: v.name,
    email: v.email,
    subject: v.topic,
    message: prefix + v.message,
  }
}
