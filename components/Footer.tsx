import Link from 'next/link'

const NAV_LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
] as const

// Next.js 16 Cache Components disallows `new Date()` in Server Components
// without a dynamic data source. Bump this constant manually each year.
const COPYRIGHT_YEAR = 2026

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-screen-2xl px-6 py-20 md:px-12 md:py-28">
        <Link href="/" className="h-display block text-6xl md:text-8xl">
          tsutsu<span className="text-lime-500">.</span>
        </Link>

        <nav
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
          aria-label="Footer navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mono-tag text-paper/70 transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-8">
          <p className="mono-tag text-paper/50">© {COPYRIGHT_YEAR} 堤 暁寛</p>
          <p className="mono-tag flex items-center gap-2 text-paper/70">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-lime-500"
            />
            受付中
          </p>
        </div>
      </div>
    </footer>
  )
}
