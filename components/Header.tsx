'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 100)
      
      // アクティブセクションの検出
      const sections = ['home', 'services', 'about', 'contact']
      const scrollPosition = window.scrollY + 200
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
          }
          
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 初期状態を設定
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'ホーム', href: '#home', id: 'home', isHash: true },
    { name: 'サービス', href: '#services', id: 'services', isHash: true },
    { name: 'プロフィール', href: '#about', id: 'about', isHash: true },
    { name: 'お知らせ', href: '/announcements', id: 'announcements', isHash: false },
    { name: 'お問い合わせ', href: '#contact', id: 'contact', isHash: true },
  ]
  
  // お知らせページがアクティブかどうかを判定
  const isAnnouncementsActive = pathname?.startsWith('/announcements') ?? false

  // ハッシュリンクのhrefを取得（お知らせページの場合はトップページへのリンクに変更）
  const getHashHref = (href: string, isHash: boolean) => {
    if (isHash && isAnnouncementsActive) {
      return `/${href}` // `#home` → `/#home`
    }
    return href
  }

  // エレガントデザイン
  const renderElegant = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
      {...({} as any)}
    >
      <nav className="container mx-auto px-8 py-3 md:py-4">
        <div className="flex items-center justify-between border-b border-slate-200/30 pb-2">
          <motion.a
            href={getHashHref('#home', true)}
            className="flex items-center"
            animate={{ 
              rotate: [0, -2, 2, -2, 0],
              scale: [1, 1.02, 1, 1.02, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ 
              rotate: [0, -5, 5, -5, 0],
              scale: 1.05,
              transition: { duration: 0.8 }
            }}
            {...({} as any)}
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

          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => {
              const isActive = item.id === 'announcements' 
                ? isAnnouncementsActive 
                : activeSection === item.id
              
              const linkClassName = `text-xs uppercase tracking-[0.2em] font-light transition-all duration-500 ${
                isActive
                  ? 'text-slate-950 font-normal'
                  : 'text-slate-500 hover:text-slate-950'
              }`
              
              if (item.isHash) {
                const href = getHashHref(item.href, item.isHash)
                // お知らせページの場合はLinkコンポーネントを使用
                if (isAnnouncementsActive) {
                  return (
                    <Link
                      key={item.name}
                      href={href}
                      className={linkClassName}
                    >
                      {item.name}
                    </Link>
                  )
                }
                return (
                  <a
                    key={item.name}
                    href={href}
                    className={linkClassName}
                  >
                    {item.name}
                  </a>
                )
              } else {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={linkClassName}
                  >
                    {item.name}
                  </Link>
                )
              }
            })}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
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
              {...({} as any)}
            >
                {navItems.map((item) => {
                const isActive = item.id === 'announcements' 
                  ? isAnnouncementsActive 
                  : activeSection === item.id
                
                const linkClassName = `block py-2 text-xs uppercase tracking-[0.2em] font-light transition-all duration-200 ${
                  isActive
                    ? 'text-slate-950 font-normal'
                    : 'text-slate-500 hover:text-slate-950'
                }`
                
                if (item.isHash) {
                  const href = getHashHref(item.href, item.isHash)
                  // お知らせページの場合はLinkコンポーネントを使用
                  if (isAnnouncementsActive) {
                    return (
                      <Link
                        key={item.name}
                        href={href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={linkClassName}
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
                      className={linkClassName}
                    >
                      {item.name}
                    </a>
                  )
                } else {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={linkClassName}
                    >
                      {item.name}
                    </Link>
                  )
                }
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )

  // バリアント8: シンプル（落ち着いたデザイン）
  const renderSimple = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      {...({} as any)}
    >
      <nav className="container mx-auto px-6 py-5 md:py-6">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={240}
              height={96}
              className="h-20 md:h-24 lg:h-28 w-auto"
              priority
            />
          </a>

          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-base font-normal transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-slate-950'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
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
              className="md:hidden mt-4 pb-4 space-y-2"
              {...({} as any)}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 text-base font-normal transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-slate-950'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )

  // バリアント9: アニメーション（遊び心のあるデザイン）
  const renderAnimated = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
      {...({} as any)}
    >
      <nav className="container mx-auto px-6 py-4 md:py-5">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center"
            animate={{ 
              rotate: [0, -3, 3, -3, 0],
              scale: [1, 1.05, 1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ 
              rotate: [0, -8, 8, -8, 0],
              scale: 1.1,
              transition: { duration: 0.6 }
            }}
            {...({} as any)}
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={240}
              height={96}
              className="h-20 md:h-24 lg:h-28 w-auto"
              priority
            />
          </motion.a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-slate-950'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                {...({} as any)}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
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
              className="md:hidden mt-4 pb-4 space-y-2"
              {...({} as any)}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 min-h-[44px] flex items-center text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-slate-950 border-l-2 border-slate-950 pl-4'
                      : 'text-slate-600 hover:text-slate-950 pl-4'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )

  // バリアント10: カラフル（遊び心のあるデザイン）
  const renderColorful = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 shadow-xl'
          : 'bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400'
      }`}
      {...({} as any)}
    >
      <nav className="container mx-auto px-6 py-4 md:py-5">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={240}
              height={96}
              className="h-20 md:h-24 lg:h-28 w-auto"
              priority
            />
          </a>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-white/20 backdrop-blur-sm shadow-lg'
                    : 'hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                {...({} as any)}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <motion.span
                className="block h-0.5 w-6 bg-white"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
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
              className="md:hidden mt-4 pb-4 space-y-2"
              {...({} as any)}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg text-sm font-semibold text-white transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-white/20 backdrop-blur-sm'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )

  // バリアント11: インタラクティブ（遊び心のあるデザイン）
  const renderInteractive = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
      {...({} as any)}
    >
      <nav className="container mx-auto px-6 py-4 md:py-5">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            {...({} as any)}
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={240}
              height={96}
              className="h-20 md:h-24 lg:h-28 w-auto"
              priority
            />
          </motion.a>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-slate-950'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.9 }}
                {...({} as any)}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                    layoutId="interactiveIndicator"
                    transition={{ duration: 0.3 }}
                    {...({} as any)}
                  />
                )}
              </motion.a>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
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
              className="md:hidden mt-4 pb-4 space-y-2"
              {...({} as any)}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 min-h-[44px] flex items-center text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-slate-950 border-l-2 border-slate-950 pl-4'
                      : 'text-slate-600 hover:text-slate-950 pl-4'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )

  // バリアント12: アシンメトリー（攻めたデザイン）
  const renderAsymmetric = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white shadow-xl'
          : 'bg-white/95'
      }`}
      {...({} as any)}
    >
      <nav className="container mx-auto px-6 py-5 md:py-6">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center transform -rotate-2"
            whileHover={{ rotate: 2, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            {...({} as any)}
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={240}
              height={96}
              className="h-20 md:h-24 lg:h-28 w-auto"
              priority
            />
          </motion.a>

          <div className="hidden md:flex items-end space-x-1" style={{ transform: 'rotate(-1deg)' }}>
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-bold transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-slate-950 bg-slate-100'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
                style={{ 
                  transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
                  transformOrigin: 'center'
                }}
                whileHover={{ 
                  rotate: index % 2 === 0 ? '-1deg' : '1deg',
                  scale: 1.1
                }}
                {...({} as any)}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors transform rotate-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-700"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
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
              className="md:hidden mt-4 pb-4 space-y-2"
              {...({} as any)}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 text-sm font-bold transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-slate-950 bg-slate-100 pl-4'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 pl-4'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )

  // バリアント13: ボールド（攻めたデザイン）
  const renderBold = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-950 shadow-2xl'
          : 'bg-slate-950/95'
      }`}
      {...({} as any)}
    >
      <nav className="container mx-auto px-6 py-5 md:py-6">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={240}
              height={96}
              className="h-20 md:h-24 lg:h-28 w-auto brightness-0 invert"
              priority
            />
          </a>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`px-6 py-3 text-lg font-black uppercase tracking-tight transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-white bg-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                {...({} as any)}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <motion.span
                className="block h-0.5 w-6 bg-white"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
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
              className="md:hidden mt-4 pb-4 space-y-2"
              {...({} as any)}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 text-lg font-black uppercase transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-white bg-white/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )

  // バリアント14: エッジ（攻めたデザイン）
  const renderEdgy = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white shadow-2xl'
          : 'bg-white/95'
      }`}
      {...({} as any)}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }} />
        <nav className="container mx-auto px-6 py-5 md:py-6 relative">
          <div className="flex items-center justify-between">
            <motion.a
              href="#home"
              className="flex items-center"
              whileHover={{ scale: 1.1, x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              {...({} as any)}
            >
              <Image
                src="/logo.png"
                alt="tsutsu"
                width={240}
                height={96}
                className="h-20 md:h-24 lg:h-28 w-auto"
                priority
              />
            </motion.a>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-slate-950'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                  style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)' }}
                  whileHover={{ 
                    scale: 1.1,
                    x: 5,
                    clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)'
                  }}
                  {...({} as any)}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
                      layoutId="edgyIndicator"
                      transition={{ duration: 0.3 }}
                      {...({} as any)}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="メニュー"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <motion.span
                  className="block h-0.5 w-6 bg-slate-700"
                  animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                  transition={{ duration: 0.3 }}
                  {...({} as any)}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-slate-700"
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  {...({} as any)}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-slate-700"
                  animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                  transition={{ duration: 0.3 }}
                  {...({} as any)}
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
                className="md:hidden mt-4 pb-4 space-y-2"
                {...({} as any)}
              >
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                      activeSection === item.id
                        ? 'text-slate-950 border-l-4 border-red-500 pl-4'
                        : 'text-slate-600 hover:text-slate-950 pl-4'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </motion.header>
  )

  // エレガントデザインを固定で使用
  return renderElegant()
}
