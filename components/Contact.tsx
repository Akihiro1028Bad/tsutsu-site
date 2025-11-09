'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MessageSquare, Clock, Send } from 'lucide-react'
import { useState } from 'react'

type FormData = {
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
  const [formData, setFormData] = useState<FormData>({
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
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = '件名を入力してください'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'メッセージを入力してください'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'メッセージは10文字以上で入力してください'
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
      // ここで実際の送信処理を実装
      // 例: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      
      // デモ用の遅延
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // 3秒後にステータスをリセット
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section
      id="contact"
      className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-20 md:py-32"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
          {...({} as any)}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-slate-950 tracking-tight">
            お問い合わせ
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '100px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-6"
            aria-hidden="true"
            {...({} as any)}
          />
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal tracking-[0.08em] uppercase max-w-2xl mx-auto">
            プロジェクトのご相談やお見積もりなど、お気軽にお問い合わせください
          </p>
        </motion.div>

        {/* Content - Split Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
          {...({} as any)}
        >
          <div className="flex flex-col md:flex-row items-stretch gap-0">
            {/* Left Block - Information */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-80 lg:w-96 bg-slate-50/30 border-r border-slate-200/40 p-8 md:p-12 flex flex-col justify-center"
              {...({} as any)}
            >
              <div className="relative z-10 w-full space-y-8">
                {/* Contact Method */}
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-slate-200/50 flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <dt className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-light">メールでのお問い合わせ</dt>
                      <dd className="text-sm text-slate-900 leading-relaxed font-light">
                        お問い合わせはメールにて承っております。
                        <br />
                        お気軽にご連絡ください。
                      </dd>
                    </div>
                  </div>
                </div>

                {/* Consultation Content */}
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-slate-200/50 flex items-center justify-center flex-shrink-0 mt-1">
                      <MessageSquare className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <dt className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-light">ご相談内容</dt>
                      <dd className="text-sm text-slate-900 leading-relaxed font-light">
                        Webサイト制作、アプリ開発、システム開発支援、
                        <br />
                        エンジニアの学習・キャリア支援など、幅広く対応いたします。
                      </dd>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200/50 flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <dt className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-light">返信時間</dt>
                      <dd className="text-sm text-slate-900 leading-relaxed font-light">
                        通常、2営業日以内にご返信いたします。
                        <br />
                        お急ぎの場合は、件名に「【至急】」とご記載ください。
                      </dd>
                    </div>
                  </div>
                </div>

                {/* Additional Note */}
                <div className="pt-6 border-t border-slate-200/40">
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    お問い合わせの際は、プロジェクトの概要やご希望のスケジュールなどをお知らせいただけると、よりスムーズにご対応できます。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Block - Form */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 bg-white p-10 md:p-16"
              {...({} as any)}
            >
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs text-slate-400 mb-2 uppercase tracking-wider font-light"
                  >
                    お名前 <span className="text-slate-300">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange('name')}
                    className={`w-full px-4 py-3 bg-transparent border-b ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 focus:border-slate-950'
                    } focus:outline-none transition-colors duration-300 text-slate-900 font-light text-base`}
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
                    className="block text-xs text-slate-400 mb-2 uppercase tracking-wider font-light"
                  >
                    メールアドレス <span className="text-slate-300">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    className={`w-full px-4 py-3 bg-transparent border-b ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 focus:border-slate-950'
                    } focus:outline-none transition-colors duration-300 text-slate-900 font-light text-base`}
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
                    className="block text-xs text-slate-400 mb-2 uppercase tracking-wider font-light"
                  >
                    件名 <span className="text-slate-300">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange('subject')}
                    className={`w-full px-4 py-3 bg-transparent border-b ${
                      errors.subject
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 focus:border-slate-950'
                    } focus:outline-none transition-colors duration-300 text-slate-900 font-light text-base`}
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
                    className="block text-xs text-slate-400 mb-2 uppercase tracking-wider font-light"
                  >
                    メッセージ <span className="text-slate-300">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange('message')}
                    rows={6}
                    className={`w-full px-4 py-3 bg-transparent border-b ${
                      errors.message
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 focus:border-slate-950'
                    } focus:outline-none transition-colors duration-300 text-slate-900 font-light text-base resize-none`}
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
                    className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 md:py-4 bg-slate-950 text-white rounded-none font-normal tracking-[0.08em] hover:bg-slate-900 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 transition-all duration-500 text-sm sm:text-base uppercase relative group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    {...({} as any)}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
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
                    <motion.div
                      className="absolute inset-0 bg-slate-800"
                      initial={{ x: '-100%' }}
                      whileHover={isSubmitting ? {} : { x: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      aria-hidden="true"
                      {...({} as any)}
                    />
                  </motion.button>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
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
                      className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm"
                      {...({} as any)}
                    >
                      送信に失敗しました。しばらく時間をおいて再度お試しください。
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
