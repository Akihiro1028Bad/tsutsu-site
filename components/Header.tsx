'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
] as const

type NavLink = (typeof NAV_LINKS)[number]

function isActive(link: NavLink, pathname: string | null): boolean {
  if (!pathname) return false
  if (link.href === '/blog') {
    return pathname === '/blog' || pathname.startsWith('/blog/')
  }
  if (link.href.startsWith('/#')) {
    return pathname === '/'
  }
  return link.href === pathname
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Focus management + Escape to close while dialog is open
  useEffect(() => {
    if (!menuOpen) return

    const hamburger = hamburgerRef.current
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      const target = previousFocusRef.current ?? hamburger
      target?.focus()
    }
  }, [menuOpen])

  // Body scroll lock while dialog is open
  useEffect(() => {
    if (!menuOpen) return

    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    return () => {
      root.style.overflow = previousOverflow
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 h-16 transition-colors',
          scrolled
            ? 'bg-white border-b border-gray-200'
            : 'bg-paper/70 backdrop-blur',
        ].join(' ')}
      >
        <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-6 md:px-12">
          <Link
            href="/"
            className="text-lg font-display font-black tracking-tight text-ink"
            aria-label="tsutsu home"
          >
            tsutsu
            <span className="relative ml-0.5 inline-block text-lime-500">
              .
              <span
                aria-hidden
                className="absolute inset-0 animate-ping rounded-full bg-lime-500/60"
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = isActive(link, pathname)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className="mono-tag text-ink/80 transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <button
            ref={hamburgerRef}
            type="button"
            aria-label="メニューを開く"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-dialog"
            className="flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <span className="block h-0.5 w-6 bg-ink" aria-hidden />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-nav-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="ナビゲーション"
          className="fixed inset-0 z-[60] flex flex-col overscroll-contain bg-ink text-paper"
        >
          <div className="flex h-16 items-center justify-end px-6">
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="メニューを閉じる"
              className="text-paper"
              onClick={() => setMenuOpen(false)}
            >
              Close ✕
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center gap-6 px-8 pb-24">
            {NAV_LINKS.map((link) => {
              const active = isActive(link, pathname)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="h-display block text-4xl text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
