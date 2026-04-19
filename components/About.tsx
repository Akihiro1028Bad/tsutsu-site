'use client'

import CountUp from '@/components/CountUp'

interface Fact {
  value: number | string
  label: string
}

const FACTS: Fact[] = [
  { value: 4, label: '年間の現場経験' },
  { value: 3, label: '年前にエンジニア転身' },
  { value: '2025.08', label: '独立 & 個人事業主へ' },
  { value: 1, label: '現在の拠点(Tokyo)' },
]

const STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind',
  'Supabase',
  'microCMS',
  'Vercel',
  'Figma',
]

export default function About() {
  return (
    <section id="about" className="bg-paper px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="h-section text-[clamp(3rem,8vw,7rem)]">ABOUT</h2>
          <span className="mono-tag text-ink/50">TSUTSUMI AKIHIRO</span>
        </div>

        <ul className="divide-y divide-ink/15 border-t border-ink/15">
          {FACTS.map((fact) => (
            <li
              key={fact.label}
              className="flex items-baseline justify-between gap-6 py-6 md:py-8"
            >
              <span className="h-section text-[clamp(2.5rem,6vw,6rem)] tabular-nums">
                <CountUp value={fact.value} />
              </span>
              <span className="text-right text-sm text-ink/70 md:text-base">
                {fact.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-16 max-w-3xl space-y-4 text-base text-ink/80 md:text-lg">
          <p>
            4年の現場経験を経て、独学でプログラミングを学び、3年前にエンジニアへ転身しました。
          </p>
          <p>
            その後、業務システムやWebアプリケーションの設計・実装・運用を担当し、
            2025年8月より個人事業主として活動を開始。現場で鍛えた実装力と、独学で築いた課題解決力を、
            一つに束ねて提供しています。
          </p>
        </div>

        <div className="mt-16">
          <p className="mono-tag text-ink/50">USING</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {STACK.map((tech) => (
              <li
                key={tech}
                className="mono-tag text-ink underline decoration-lime-500 decoration-2 underline-offset-4"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
