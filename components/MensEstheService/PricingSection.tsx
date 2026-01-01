'use client'

import { SECTION_IDS, type PricingItem } from '@/lib/types/mens-esthe-service'

import { ContactCTA } from '@/components/MensEstheService/ContactCTA'

type PricingSectionProps = {
  pricingItems: PricingItem[]
}

function byCategory(pricingItems: PricingItem[], category: PricingItem['category']) {
  return pricingItems.filter((item) => item.category === category)
}

export function PricingSection({ pricingItems }: PricingSectionProps) {
  const initialItems = byCategory(pricingItems, 'initial')
  const monthlyItems = byCategory(pricingItems, 'monthly')
  const optionItems = byCategory(pricingItems, 'option')

  return (
    <section id={SECTION_IDS.pricing} className="bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
          料金
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="text-base font-semibold text-slate-950">初期費用</h3>
            <dl className="mt-4 space-y-4">
              {initialItems.map((item) => (
                <div key={item.id}>
                  <dt className="text-sm font-medium text-slate-900">{item.name}</dt>
                  <dd className="mt-1 text-sm text-slate-600">
                    <strong className="text-slate-950">{item.price}</strong>
                    <span className="ml-2">{item.description}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="text-base font-semibold text-slate-950">月額費用</h3>
            <dl className="mt-4 space-y-4">
              {monthlyItems.map((item) => (
                <div key={item.id}>
                  <dt className="text-sm font-medium text-slate-900">{item.name}</dt>
                  <dd className="mt-1 text-sm text-slate-600">
                    <strong className="text-slate-950">{item.price}</strong>
                    <span className="ml-2">{item.description}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="text-base font-semibold text-slate-950">オプション</h3>
            <dl className="mt-4 space-y-4">
              {optionItems.map((item) => (
                <div key={item.id}>
                  <dt className="text-sm font-medium text-slate-900">{item.name}</dt>
                  <dd className="mt-1 text-sm text-slate-600">
                    <strong className="text-slate-950">{item.price}</strong>
                    <span className="ml-2">{item.description}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div aria-labelledby={SECTION_IDS.pricing}>
          <ContactCTA />
        </div>
      </div>
    </section>
  )
}

