'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="パンくずリスト" className="mb-8">
      <ol className="flex items-center space-x-2 text-sm text-slate-500 font-light">
        <li>
          <Link
            href="/"
            className="flex items-center hover:text-slate-950 transition-colors duration-300"
            aria-label="ホーム"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-slate-950 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-950 font-normal">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

