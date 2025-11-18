'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  name: string
  href: string
  id: string
  isHash: boolean
}

const NAV_ITEMS: NavItem[] = [
  { name: 'ホーム', href: '#home', id: 'home', isHash: true },
  { name: 'サービス', href: '#services', id: 'services', isHash: true },
  { name: 'プロフィール', href: '#about', id: 'about', isHash: true },
  { name: 'お知らせ', href: '/announcements', id: 'announcements', isHash: false },
  { name: 'ブログ', href: '/blog', id: 'blog', isHash: false },
  { name: 'お問い合わせ', href: '#contact', id: 'contact', isHash: true },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const pathname = usePathname()

  useEffect(() => {
    const sections = ['home', 'services', 'about', 'contact']
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 100)

        const scrollPosition = window.scrollY + 200
        for (let i = sections.length - 1; i >= 0; i -= 1) {
          const element = document.getElementById(sections[i])
          if (element && element.offsetTop <= scrollPosition) {
            setActiveSection(sections[i])
            break
          }
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isAnnouncementsActive = pathname?.startsWith('/announcements') ?? false
  const isBlogActive = pathname?.startsWith('/blog') ?? false

  const getHashHref = (href: string, isHash: boolean) => {
    if (isHash && (isAnnouncementsActive || isBlogActive)) {
      // ブログ/お知らせページからは、トップページの該当セクションに遷移
      return `/${href}`
    }
    return href
  }

  const isNavItemActive = (item: NavItem) => {
    if (item.id === 'announcements') return isAnnouncementsActive
    if (item.id === 'blog') return isBlogActive
    return activeSection === item.id
  }

  const renderDesktopLink = (item: NavItem) => {
    const isActive = isNavItemActive(item)
    const className = `text-xs uppercase tracking-[0.2em] font-light transition-all duration-500 ${
      isActive ? 'text-slate-950 font-normal' : 'text-slate-500 hover:text-slate-950'
    }`

    if (item.isHash) {
      const href = getHashHref(item.href, item.isHash)
      if (isAnnouncementsActive || isBlogActive) {
        return (
          <Link key={item.name} href={href} className={className}>
            {item.name}
          </Link>
        )
      }
      return (
        <a key={item.name} href={href} className={className}>
          {item.name}
        </a>
      )
    }

    return (
      <Link key={item.name} href={item.href} className={className}>
        {item.name}
      </Link>
    )
  }

  const renderMobileLink = (item: NavItem) => {
    const isActive = isNavItemActive(item)
    const className = `block py-2 text-xs uppercase tracking-[0.2em] font-light transition-all duration-200 ${
      isActive ? 'text-slate-950 font-normal' : 'text-slate-500 hover:text-slate-950'
    }`

    if (item.isHash) {
      const href = getHashHref(item.href, item.isHash)
      if (isAnnouncementsActive || isBlogActive) {
        return (
          <Link
            key={item.name}
            href={href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={className}
          >
            {item.name}
          </Link>
        )
      }
      return (
        <a
          key={item.name}
          href={href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={className}
        >
          {item.name}
        </a>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        onClick={() => setIsMobileMenuOpen(false)}
        className={className}
      >
        {item.name}
      </Link>
    )
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/98 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-8 py-3 md:py-4">
        <div className="flex items-center justify-between border-b border-slate-200/30 pb-2">
          <motion.a
            href={getHashHref('#home', true)}
            className="flex items-center"
            animate={{ rotate: [0, -2, 2, -2, 0], scale: [1, 1.02, 1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{
              rotate: [0, -5, 5, -5, 0],
              scale: 1.05,
              transition: { duration: 0.8 },
            }}
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={240}
              height={96}
              className="h-16 md:h-20 lg:h-24 w-auto"
              priority
            />
          </motion.a>

          <div className="hidden md:flex items-center space-x-12">{NAV_ITEMS.map(renderDesktopLink)}</div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="メニュー"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 space-y-3 border-t border-slate-200/30 pt-4"
            >
              {NAV_ITEMS.map(renderMobileLink)}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

