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
    <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-900">まずは相談から</p>
          <p className="mt-1 text-sm text-slate-600">
            ご要望を伺い、最適な構成をご提案します。
          </p>
        </div>
        <button
          type="button"
          onClick={handleClick}
          aria-label="お問い合わせセクションへ移動"
          className="inline-flex items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
        >
          {label}
        </button>
      </div>
    </div>
  )
}
