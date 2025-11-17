'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Home, 
  Briefcase, 
  User, 
  Bell,
  MessageSquare,
  BookOpen
} from 'lucide-react'

const navItems = [
  { name: 'ホーム', href: '#home', id: 'home', icon: Home, isHash: true },
  { name: 'サービス', href: '#services', id: 'services', icon: Briefcase, isHash: true },
  { name: 'プロフィール', href: '#about', id: 'about', icon: User, isHash: true },
  { name: 'お知らせ', href: '/announcements', id: 'announcements', icon: Bell, isHash: false },
  { name: 'ブログ', href: '/blog', id: 'blog', icon: BookOpen, isHash: false },
  { name: 'お問い合わせ', href: '#contact', id: 'contact', icon: MessageSquare, isHash: true },
]

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com', color: 'hover:text-gray-300' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-blue-400' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-500' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@example.com', color: 'hover:text-primary-400' },
]

// ビルド時の年度を定数として定義（サーバーとクライアントで同じ値になる）
// 年度は年に1回しか変わらないため、ビルド時の年度を初期値として使用
const BUILD_YEAR = new Date().getFullYear()

// 年を取得するコンポーネント
// useEffectを使用してクライアント側でのみ年度を更新し、ハイドレーションミスマッチを防止
function FooterYear() {
  // ビルド時の年度を初期値として使用（サーバーとクライアントで同じ値がレンダリングされる）
  const [currentYear, setCurrentYear] = useState(BUILD_YEAR)

  useEffect(() => {
    // クライアント側でのみ実行され、実際の年度に更新
    // 年の境界をまたいだ場合でも、クライアント側で正しい年度に更新される
    const clientYear = new Date().getFullYear()
    if (clientYear !== BUILD_YEAR) {
      setCurrentYear(clientYear)
    }
  }, [])

  return <span>{currentYear}</span>
}

export default function Footer() {
  const pathname = usePathname()
  
  // お知らせページがアクティブかどうかを判定
  const isAnnouncementsActive = pathname?.startsWith('/announcements') ?? false
  
  // ブログページがアクティブかどうかを判定
  const isBlogActive = pathname?.startsWith('/blog') ?? false

  // ハッシュリンクのhrefを取得（お知らせページまたはブログページの場合はトップページへのリンクに変更）
  const getHashHref = (href: string, isHash: boolean) => {
    if (isHash && (isAnnouncementsActive || isBlogActive)) {
      return `/${href}` // `#home` → `/#home`
    }
    return href
  }

  // 攻めた・アシンメトリックデザイン
  const EdgyAsymmetricDesign = () => (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      {/* 斜めの装飾ライン */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-[30%] w-px h-full bg-gradient-to-b from-transparent via-primary-500/20 to-transparent rotate-12" />
        <div className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-transparent via-accent-500/20 to-transparent -rotate-12" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* 左側: ロゴ（大きく、左寄せ） */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-4"
            {...({} as any)}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              {...({} as any)}
            >
              <Image
                src="/logo.png"
                alt="tsutsu"
                width={200}
                height={80}
                className="h-24 md:h-28 w-auto brightness-0 invert opacity-90"
              />
            </motion.div>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs">
              Web開発・システム開発支援
            </p>
            <p className="text-xs text-gray-500 font-light">
              代表：堤　暁寛
            </p>
          </motion.div>

          {/* 中央: ナビゲーション（斜め配置） */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 space-y-4 transform lg:translate-y-8"
            {...({} as any)}
          >
            <h3 className="text-xs text-primary-400 uppercase tracking-wider font-medium mb-4">
              ナビゲーション
            </h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item, index) => {
                const Icon = item.icon
                if (item.isHash) {
                  const href = getHashHref(item.href, item.isHash)
                  // お知らせページまたはブログページの場合はLinkコンポーネントを使用
                  if (isAnnouncementsActive || isBlogActive) {
                    return (
                      <Link
                        key={item.name}
                        href={href}
                        className="group flex items-center space-x-2 text-sm text-gray-400 hover:text-primary-400 transition-all duration-300 transform hover:translate-x-2"
                        style={{ marginLeft: `${index * 8}px` }}
                      >
                        <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <span className="relative">
                          {item.name}
                          <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                        </span>
                      </Link>
                    )
                  }
                  return (
                    <a
                      key={item.name}
                      href={href}
                      className="group flex items-center space-x-2 text-sm text-gray-400 hover:text-primary-400 transition-all duration-300 transform hover:translate-x-2"
                      style={{ marginLeft: `${index * 8}px` }}
                    >
                      <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="relative">
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </a>
                  )
                } else {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center space-x-2 text-sm text-gray-400 hover:text-primary-400 transition-all duration-300 transform hover:translate-x-2"
                      style={{ marginLeft: `${index * 8}px` }}
                    >
                      <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="relative">
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  )
                }
              })}
            </nav>
          </motion.div>

          {/* 右側: SNS（右寄せ、上に配置） */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-4 lg:text-right"
            {...({} as any)}
          >
            <h3 className="text-xs text-accent-400 uppercase tracking-wider font-medium mb-4">
              ソーシャル
            </h3>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-3 rounded-lg bg-gray-900/50 border border-gray-800 ${social.color} transition-all duration-300 hover:scale-110 hover:border-primary-500/50 hover:rotate-3`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500 text-center font-light">
            &copy; <FooterYear /> tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  return <EdgyAsymmetricDesign />
}
