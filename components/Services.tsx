'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface Service {
  number: string
  title: string
  description: string
  href: string
  ctaLabel: string
}

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Webサイト制作',
    description:
      '事業や想いを丁寧にヒアリングし、目的に合ったWebサイトを制作します。見る人にとってわかりやすく、使う人にとってストレスのない設計を大切にしています。',
    href: '/#contact',
    ctaLabel: 'お問い合わせ →',
  },
  {
    number: '02',
    title: 'Webアプリ / システム開発',
    description:
      '日々の業務やサービス運営で生まれる「手間」や「管理のしづらさ」を、Webアプリや管理画面の開発によって解消します。長く使い続けられる、無理のない設計を心がけています。',
    href: '/#contact',
    ctaLabel: 'お問い合わせ →',
  },
  {
    number: '03',
    title: '業務改善・自動化（AI/ツール活用）',
    description:
      '現場の業務に合わせて、無理なく続けられる改善を設計します。手間を減らし、作業の見える化や標準化を一緒に進めていきます。',
    href: '/#contact',
    ctaLabel: 'お問い合わせ →',
  },
  {
    number: '04',
    title: '学習支援・キャリア支援',
    description:
      '未経験〜初中級エンジニアの方に向けて、学習〜実践〜キャリアの段階を、一緒に並走しながら進めます。「ただ教わる」ではなく、「自分で考えて作れる力」を育てます。',
    href: '/#contact',
    ctaLabel: 'お問い合わせ →',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-paper px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="h-section text-[clamp(3rem,8vw,7rem)]">SERVICES</h2>
          <span className="mono-tag text-ink/50">{SERVICES.length} services</span>
        </div>

        <ul className="divide-y divide-ink/15 border-t border-ink/15">
          {SERVICES.map((service, i) => (
            <motion.li
              key={service.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[60px_2fr_3fr_auto] md:items-start md:gap-8"
            >
              <div className="flex items-center gap-3 md:block">
                <span className="mono-tag text-ink">{service.number}</span>
                <span
                  aria-hidden
                  className="hidden h-px w-10 bg-lime-500 md:mt-4 md:inline-block"
                />
              </div>
              <h3 className="h-section text-2xl md:text-3xl">
                {service.title}
              </h3>
              <p className="text-sm text-ink/70 md:text-base">{service.description}</p>
              <Link
                href={service.href}
                className="mono-tag inline-flex self-start text-ink hover:text-ink/70 md:self-center"
              >
                {service.ctaLabel}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
