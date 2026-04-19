'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useState } from 'react'

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@tsutsumi.jp'

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください'
    } else if (formData.name.length > 100) {
      newErrors.name = 'お名前は100文字以内で入力してください'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    } else if (formData.email.length > 255) {
      newErrors.email = 'メールアドレスが長すぎます'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = '件名を入力してください'
    } else if (formData.subject.length > 200) {
      newErrors.subject = '件名は200文字以内で入力してください'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'メッセージを入力してください'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'メッセージは10文字以上で入力してください'
    } else if (formData.message.length > 5000) {
      newErrors.message = 'メッセージは5000文字以内で入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // ネットワークエラーのチェック
      if (!response.ok) {
        let errorMessage = '送信に失敗しました'
        try {
          const data = await response.json()
          errorMessage = data.error || errorMessage
        } catch {
          // JSON解析に失敗した場合（ネットワークエラーなど）
          errorMessage = 'ネットワークエラーが発生しました。接続を確認してください。'
        }
        throw new Error(errorMessage)
      }

      await response.json()
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      // 3秒後にステータスをリセット
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      console.error('送信エラー:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000) // エラー時は少し長めに表示
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section id="contact" className="bg-paper px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="h-display text-[clamp(3rem,8vw,8rem)] leading-[0.95] text-ink">
          お仕事の<br />ご相談はこちら。
        </h2>

        <div className="mt-12 h-px w-24 bg-ink/20" />

        <div className="mt-12 flex flex-col items-start gap-6">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mono-tag inline-flex items-center gap-3 rounded-full bg-lime-500 px-8 py-5 text-lg font-bold text-ink transition-transform hover:-translate-y-0.5"
          >
            {CONTACT_EMAIL} <span aria-hidden>→</span>
          </a>
          <p className="mono-tag text-ink/50">または</p>
          <p className="mono-tag text-ink/70">フォームから連絡 ↓</p>
        </div>

        <details className="mt-12 border-t border-ink/15 pt-12">
          <summary className="mono-tag cursor-pointer text-ink hover:text-ink/70">
            お問い合わせフォームを開く →
          </summary>
          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs text-ink/50 mb-2 uppercase tracking-wider font-light"
                >
                  お名前 <span className="text-ink/30">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  className={`w-full px-4 py-3 min-h-[44px] bg-transparent border-b ${
                    errors.name
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-ink/20 focus:border-ink'
                  } focus:outline-none transition-colors duration-300 text-ink font-light text-base`}
                  placeholder="山田 太郎"
                />
                {errors.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-red-500"
                    {...({} as any)}
                  >
                    {errors.name}
                  </motion.div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs text-ink/50 mb-2 uppercase tracking-wider font-light"
                >
                  メールアドレス <span className="text-ink/30">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className={`w-full px-4 py-3 min-h-[44px] bg-transparent border-b ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-ink/20 focus:border-ink'
                  } focus:outline-none transition-colors duration-300 text-ink font-light text-base`}
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-red-500"
                    {...({} as any)}
                  >
                    {errors.email}
                  </motion.div>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs text-ink/50 mb-2 uppercase tracking-wider font-light"
                >
                  件名 <span className="text-ink/30">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange('subject')}
                  className={`w-full px-4 py-3 min-h-[44px] bg-transparent border-b ${
                    errors.subject
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-ink/20 focus:border-ink'
                  } focus:outline-none transition-colors duration-300 text-ink font-light text-base`}
                  placeholder="お問い合わせの件名"
                />
                {errors.subject && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-red-500"
                    {...({} as any)}
                  >
                    {errors.subject}
                  </motion.div>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs text-ink/50 mb-2 uppercase tracking-wider font-light"
                >
                  メッセージ <span className="text-ink/30">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange('message')}
                  rows={6}
                  className={`w-full px-4 py-3 min-h-[120px] bg-transparent border-b ${
                    errors.message
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-ink/20 focus:border-ink'
                  } focus:outline-none transition-colors duration-300 text-ink font-light text-base resize-none`}
                  placeholder="お問い合わせ内容をご記入ください"
                />
                {errors.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-red-500"
                    {...({} as any)}
                  >
                    {errors.message}
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 md:py-4 min-h-[44px] inline-flex items-center justify-center bg-ink text-paper rounded-none font-normal tracking-[0.08em] hover:bg-ink/90 focus:bg-ink/90 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 transition-all duration-500 text-sm sm:text-base uppercase relative group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  {...({} as any)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-paper border-t-transparent rounded-full"
                          {...({} as any)}
                        />
                        送信中...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        送信する
                      </>
                    )}
                  </span>
                </motion.button>
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    role="alert"
                    aria-live="polite"
                    className="p-4 bg-green-50 border border-green-200 text-green-800 text-sm"
                    {...({} as any)}
                  >
                    お問い合わせありがとうございます。送信が完了しました。
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    role="alert"
                    aria-live="assertive"
                    className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm"
                    {...({} as any)}
                  >
                    送信に失敗しました。しばらく時間をおいて再度お試しください。
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </details>
      </div>
    </section>
  )
}
