import { SECTION_IDS } from "@/lib/types/mens-esthe-service"

const navItems = [
  { id: SECTION_IDS.hero, label: "トップ" },
  { id: SECTION_IDS.features, label: "機能" },
  { id: SECTION_IDS.pricing, label: "料金" },
  { id: SECTION_IDS.portfolio, label: "制作実績" },
  { id: SECTION_IDS.process, label: "導入までの流れ" },
  { id: SECTION_IDS.faq, label: "FAQ" },
  { id: SECTION_IDS.contact, label: "お問い合わせ" },
] as const

export function SectionNav() {
  return (
    <nav aria-label="このページ内" className="border-b bg-white">
      <div className="mx-auto max-w-5xl px-6">
        <ul className="flex flex-wrap gap-4 py-3 text-sm">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-slate-600 hover:text-slate-950">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

