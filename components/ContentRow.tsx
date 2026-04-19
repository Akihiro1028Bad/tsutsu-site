import Link from 'next/link'

interface ContentRowProps {
  date: string
  title: string
  href: string
}

export default function ContentRow({ date, title, href }: ContentRowProps) {
  const formatted = date.includes('-') ? date.replace(/-/g, '.') : date
  return (
    <li className="border-t border-ink/15 py-5 first:border-t-0 md:py-6">
      <Link href={href} className="group block">
        <span className="mono-tag block text-ink/50">{formatted}</span>
        <span className="mt-2 block text-base text-ink transition-colors group-hover:underline group-hover:decoration-lime-500 group-hover:decoration-2 group-hover:underline-offset-4 md:text-lg">
          {title}
        </span>
      </Link>
    </li>
  )
}
