'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
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
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初期状態を設定
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'ホーム', href: '#home', id: 'home' },
    { name: 'サービス', href: '#services', id: 'services' },
    { name: 'プロフィール', href: '#about', id: 'about' },
    { name: 'お問い合わせ', href: '#contact', id: 'contact' },
  ]

  // バリアント1: グラスモーフィズム + ミニマルナビゲーション
  const renderGlassmorphism = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-slate-200/50'
          : 'bg-transparent'
      }`}
      {...({} as any)}
    >
      <nav className="container mx-auto px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            {...({} as any)}
          >
            <motion.div
              animate={{ scale: isScrolled ? 0.85 : 1 }}
              transition={{ duration: 0.3 }}
              {...({} as any)}
            >
              <Image
                src="/logo.png"
                alt="tsutsu"
                width={240}
                height={96}
                className="h-20 md:h-24 lg:h-28 w-auto transition-all duration-300"
                priority
              />
            </motion.div>
          </motion.a>

          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group"
              >
                <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-slate-950'
                    : 'text-slate-600 hover:text-slate-950'
                }`}>
                  {item.name}
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-slate-950 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  {...({} as any)}
                />
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100/50 transition-colors"
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
                  className={`block py-3 text-sm font-medium transition-colors duration-200 ${
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

  // バリアント2: センターロゴ + サイドナビゲーション
  const renderCentered = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      }`}
      {...({} as any)}
    >
      <nav className="container mx-auto px-6 py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-1">
            {navItems.slice(0, 2).map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group"
              >
                <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-slate-950'
                    : 'text-slate-600 hover:text-slate-950'
                }`}>
                  {item.name}
                </span>
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-slate-950"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.3 }}
                    {...({} as any)}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Center Logo */}
          <motion.a
            href="#home"
            className="flex items-center mx-auto lg:mx-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            {...({} as any)}
          >
            <motion.div
              animate={{ scale: isScrolled ? 0.9 : 1 }}
              transition={{ duration: 0.3 }}
              {...({} as any)}
            >
              <Image
                src="/logo.png"
                alt="tsutsu"
                width={240}
                height={96}
                className="h-20 md:h-24 lg:h-28 w-auto transition-all duration-300"
                priority
              />
            </motion.div>
          </motion.a>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-end">
            {navItems.slice(2).map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group"
              >
                <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-slate-950'
                    : 'text-slate-600 hover:text-slate-950'
                }`}>
                  {item.name}
                </span>
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-slate-950"
                    layoutId="activeIndicatorRight"
                    transition={{ duration: 0.3 }}
                    {...({} as any)}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile: Logo Left, Menu Right */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <a href="#home" className="flex items-center">
              <Image
                src="/logo.png"
                alt="tsutsu"
                width={240}
                height={96}
                className="h-16 w-auto"
                priority
              />
            </a>
            <button
              className="p-2 rounded-lg hover:bg-slate-100/50 transition-colors"
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
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 space-y-2"
              {...({} as any)}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 text-sm font-medium transition-colors duration-200 ${
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

  // バリアント3: フローティングヘッダー + ピル型ナビゲーション
  const renderFloating = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-4 right-4 z-50 md:top-6 md:left-8 md:right-8 lg:left-16 lg:right-16"
      {...({} as any)}
    >
      <motion.nav
        className={`rounded-2xl transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-xl border border-slate-200/50'
            : 'bg-white/60 backdrop-blur-lg shadow-lg border border-slate-200/30'
        }`}
        animate={{ padding: isScrolled ? '0.75rem 1.5rem' : '1rem 2rem' }}
        transition={{ duration: 0.3 }}
        {...({} as any)}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            {...({} as any)}
          >
              <motion.div
                animate={{ scale: isScrolled ? 0.85 : 1 }}
                transition={{ duration: 0.3 }}
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={240}
              height={96}
                  className="h-20 md:h-24 lg:h-28 w-auto transition-all duration-300"
              priority
            />
              </motion.div>
            </motion.a>

            <div className="hidden md:flex items-center space-x-3">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-slate-950 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100 hover:-translate-y-0.5'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  {...({} as any)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
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
                    className={`block py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-slate-950 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </motion.header>
  )

  // バリアント4: ミニマルライン + タイポグラフィ重視
  const renderMinimal = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      {...({} as any)}
    >
      <nav className="container mx-auto px-6 py-4 md:py-5">
        <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
          <a
            href="#home"
            className="flex items-center"
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={240}
              height={96}
              className="h-20 md:h-24 lg:h-28 w-auto"
              priority
            />
          </a>

          <div className="hidden md:flex items-center space-x-12">
            <div className="h-4 w-px bg-slate-300" />
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                {item.name}
              </a>
            ))}
            <div className="h-4 w-px bg-slate-300" />
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
              className="md:hidden mt-4 pb-4 space-y-3 border-t border-slate-200/50 pt-4"
              {...({} as any)}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-slate-950 font-bold'
                      : 'text-slate-500 hover:text-slate-950'
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

  // バリアント5: グラデーションボーダー + カード型
  const renderGradient = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-white/95'
      }`}
      {...({} as any)}
    >
      <div className="relative">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-slate-200 via-slate-300 to-transparent" />
        <nav className="container mx-auto px-6 py-4 md:py-5">
          <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            {...({} as any)}
          >
              <motion.div
                animate={{ scale: isScrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logo.png"
                  alt="tsutsu"
                  width={240}
                  height={96}
                  className="h-20 md:h-24 lg:h-28 w-auto transition-all duration-300"
                  priority
                />
              </motion.div>
            </motion.a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                  className="relative group"
              >
                  <span className={`text-sm font-medium tracking-wide transition-all duration-300 bg-clip-text ${
                    activeSection === item.id
                      ? 'text-slate-950'
                      : 'text-slate-600 group-hover:bg-gradient-to-r group-hover:from-slate-700 group-hover:to-slate-950 group-hover:bg-clip-text group-hover:text-transparent'
                  }`}>
                {item.name}
                  </span>
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-300 via-slate-500 to-slate-300"
                      layoutId="gradientIndicator"
                      transition={{ duration: 0.3 }}
                      {...({} as any)}
                    />
                  )}
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
                    className={`block py-3 text-sm font-medium transition-all duration-200 ${
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
      </div>
    </motion.header>
  )

  // バリアント6: クラシック（落ち着いたデザイン）
  const renderClassic = () => (
    <motion.header
      ref={headerRef as any}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50"
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

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-amber-400'
                    : 'text-slate-300 hover:text-amber-400'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                    layoutId="classicIndicator"
                    transition={{ duration: 0.3 }}
                    {...({} as any)}
                  />
                )}
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <motion.span
                className="block h-0.5 w-6 bg-slate-300"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-300"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                {...({} as any)}
              />
              <motion.span
                className="block h-0.5 w-6 bg-slate-300"
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
                  className={`block py-3 text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-amber-400 border-l-2 border-amber-400 pl-4'
                      : 'text-slate-300 hover:text-amber-400 pl-4'
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

  // バリアント7: エレガント（落ち着いたデザイン）
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
      <nav className="container mx-auto px-8 py-5 md:py-6">
        <div className="flex items-center justify-between border-b border-slate-200/30 pb-4">
          <motion.a
            href="#home"
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
              className="h-20 md:h-24 lg:h-28 w-auto"
              priority
            />
          </motion.a>

          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-xs uppercase tracking-[0.2em] font-light transition-all duration-500 ${
                  activeSection === item.id
                    ? 'text-slate-950 font-normal'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                {item.name}
              </a>
            ))}
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
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-xs uppercase tracking-[0.2em] font-light transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-slate-950 font-normal'
                      : 'text-slate-500 hover:text-slate-950'
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
                  className={`block py-3 text-sm font-medium transition-colors duration-200 ${
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
                  className={`block py-3 text-sm font-medium transition-colors duration-200 ${
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
