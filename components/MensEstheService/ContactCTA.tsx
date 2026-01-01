'use client'

import { SECTION_IDS } from '@/lib/types/mens-esthe-service'
import { scrollToSection } from '@/lib/utils/mens-esthe-service'

type ContactCTAProps = {
  label?: string
}

export function ContactCTA({ label = 'お問い合わせ' }: ContactCTAProps) {
  const handleClick = () => {
    scrollToSection(SECTION_IDS.contact)
  }

  return (
    <div className="mt-10 rounded-xl border border-gold-200 bg-gradient-to-br from-gold-50 to-gold-100/50 p-8 shadow-md">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">まずは相談から</p>
          <p className="mt-2 text-base text-slate-700">
            ご要望を伺い、最適な構成をご提案します。
          </p>
        </div>
        <button
          type="button"
          onClick={handleClick}
          aria-label="お問い合わせセクションへ移動"
          className="inline-flex items-center justify-center rounded-md bg-gold-600 px-10 py-5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gold-700 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2"
        >
          {label}
        </button>
      </div>
    </div>
  )
}
