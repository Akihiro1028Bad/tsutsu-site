'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Home, 
  Briefcase, 
  User, 
  MessageSquare
} from 'lucide-react'

const navItems = [
  { name: 'ホーム', href: '#home', icon: Home },
  { name: 'サービス', href: '#services', icon: Briefcase },
  { name: 'プロフィール', href: '#about', icon: User },
  { name: 'お問い合わせ', href: '#contact', icon: MessageSquare },
]

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com', color: 'hover:text-gray-300' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-blue-400' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-500' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@example.com', color: 'hover:text-primary-400' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // 案1: ミニマル・エレガント
  const MinimalDesign = () => (
    <footer className="bg-black text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* ロゴセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
            {...({} as any)}
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={200}
              height={80}
              className="h-20 md:h-24 w-auto brightness-0 invert opacity-90"
            />
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Web開発・システム開発支援
            </p>
            <p className="text-xs text-gray-500 font-light">
              代表：堤　暁寛
            </p>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-gray-500 uppercase tracking-wider font-light mb-4">
              ナビゲーション
            </h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon
  return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 min-h-[44px]"
                  >
                    <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                )
              })}
            </nav>
          </motion.div>

          {/* SNSリンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-gray-500 uppercase tracking-wider font-light mb-4">
              ソーシャル
            </h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center space-x-2 text-sm text-gray-400 ${social.color} transition-colors duration-300 min-h-[44px]`}
                  >
                    <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span>{social.name}</span>
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* ボーダー */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500 text-center font-light">
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案2: モダン・グラデーション
  const ModernDesign = () => (
    <footer className="relative bg-gradient-to-b from-slate-900 via-gray-900 to-black text-gray-300 overflow-hidden">
      {/* グラデーションライン */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-600 to-accent-500" />
      
      {/* 微細なグリッドパターン */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* ロゴセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
            {...({} as any)}
          >
              <Image
                src="/logo.png"
                alt="tsutsu"
                width={200}
                height={80}
              className="h-20 md:h-24 w-auto brightness-0 invert opacity-90"
            />
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Web開発・システム開発支援
            </p>
          </motion.div>

          {/* クイックリンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-primary-400 uppercase tracking-wider font-medium mb-4">
              クイックリンク
            </h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-300 group"
                >
                  <span className="relative">
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              ))}
            </nav>
          </motion.div>

          {/* 事業情報 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-accent-400 uppercase tracking-wider font-medium mb-4">
              事業情報
            </h3>
            <div className="space-y-2 text-sm text-gray-400 font-light">
              <p>Web開発・システム開発支援</p>
              <p>エンジニア学習・キャリア支援</p>
              <p className="text-xs text-gray-500 mt-4">代表：堤　暁寛</p>
            </div>
          </motion.div>

          {/* SNSリンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-primary-400 uppercase tracking-wider font-medium mb-4">
              フォローする
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 ${social.color} transition-all duration-300 hover:scale-110 hover:border-primary-500/50`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* ボーダー */}
        <div className="border-t border-gray-800/50 pt-8">
          <p className="text-xs text-gray-500 text-center font-light">
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案3: クラシック・プロフェッショナル
  const ClassicDesign = () => (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* ロゴセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
            {...({} as any)}
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={200}
              height={80}
              className="h-24 md:h-28 w-auto mx-auto mb-4 brightness-0 invert opacity-90"
            />
            <p className="text-base text-gray-400 font-normal">
              Web開発・システム開発支援
            </p>
          </motion.div>

          {/* ボーダー */}
          <div className="border-t border-gray-700 mb-12" />

          {/* ナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
            {...({} as any)}
          >
            <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* ボーダー */}
          <div className="border-t border-gray-700 mb-12" />

          {/* SNSリンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
            {...({} as any)}
          >
            <div className="flex justify-center gap-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-gray-800 ${social.color} transition-all duration-300 hover:bg-gray-700`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* ボーダー */}
          <div className="border-t border-gray-700 pt-8">
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500">
                &copy; {currentYear} tsutsu. All rights reserved.
              </p>
              <p className="text-xs text-gray-600">
              代表：堤　暁寛
            </p>
          </div>
          </div>
        </div>
      </div>
    </footer>
  )

  // 案4: ボールド・ビジュアル
  const BoldDesign = () => (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      {/* アクセントライン */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600" />
      
      {/* 背景パターン */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* 左側: ロゴとナビゲーション */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
            {...({} as any)}
          >
            <div>
              <Image
                src="/logo.png"
                alt="tsutsu"
                width={240}
                height={96}
                className="h-28 md:h-32 w-auto mb-6 brightness-0 invert opacity-95"
              />
              <p className="text-lg text-gray-400 font-light mb-2">
                Web開発・システム開発支援
              </p>
              <p className="text-sm text-gray-500">
                代表：堤　暁寛
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group p-4 bg-gray-900/50 border-2 border-gray-800 hover:border-primary-500 transition-all duration-300"
                >
                  <span className="text-sm font-medium text-gray-300 group-hover:text-primary-400 transition-colors">
                    {item.name}
                  </span>
                </a>
              ))}
            </nav>
          </motion.div>

          {/* 右側: 事業情報とCTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
            {...({} as any)}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">事業内容</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Web開発・システム開発支援</p>
                <p>• エンジニア学習・キャリア支援</p>
                <p>• 全国対応（リモート対応可能）</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-4 bg-gray-900 border-2 border-gray-800 ${social.color} transition-all duration-300 hover:scale-110 hover:border-primary-500`}
                    aria-label={social.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                )
              })}
            </div>

            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-bold text-sm uppercase tracking-wider hover:from-primary-500 hover:to-accent-400 transition-all duration-300 transform hover:scale-105"
            >
              お問い合わせ
            </a>
          </motion.div>
        </div>

        {/* ボーダー */}
        <div className="border-t-2 border-gray-800 pt-8 mt-12">
          <p className="text-sm text-gray-500 text-center font-medium">
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案5: スプリット・アシンメトリック
  const SplitDesign = () => (
    <footer className="relative bg-black text-gray-300 overflow-hidden">
      {/* 斜めの分割線 */}
      <div className="absolute inset-0" style={{
        clipPath: 'polygon(0 0, 60% 0, 55% 100%, 0 100%)',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      }} />
      <div className="absolute inset-0" style={{
        clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 55% 100%)',
        background: '#000000',
      }} />
      
      {/* 斜めのアクセントライン */}
      <div className="absolute top-0 left-[55%] w-px h-full bg-gradient-to-b from-transparent via-primary-500/50 to-transparent" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左側 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
            {...({} as any)}
          >
            <div>
              <Image
                src="/logo.png"
                alt="tsutsu"
                width={200}
                height={80}
                className="h-20 md:h-24 w-auto mb-6 brightness-0 invert opacity-90"
              />
              <p className="text-sm text-gray-400 font-light leading-relaxed max-w-md">
                Web開発・システム開発支援
              </p>
              <p className="text-xs text-gray-500 mt-2">
                代表：堤　暁寛
              </p>
            </div>
          </motion.div>

          {/* 右側 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
            {...({} as any)}
          >
            <div>
              <h3 className="text-xs text-primary-400 uppercase tracking-wider font-medium mb-6">
                ナビゲーション
              </h3>
              <nav className="grid grid-cols-2 gap-4 mb-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 group"
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-xs text-accent-400 uppercase tracking-wider font-medium mb-6">
                ソーシャル
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-gray-900/50 border border-gray-800 ${social.color} transition-all duration-300 hover:scale-110`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ボーダー */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-xs text-gray-500 text-center font-light">
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案6: カード型・モジュラー
  const CardDesign = () => (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* カード1: ロゴ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1"
            {...({} as any)}
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={200}
              height={80}
              className="h-20 md:h-24 w-auto mb-4 brightness-0 invert opacity-90"
            />
            <p className="text-sm text-gray-400 font-light">
              Web開発・システム開発支援
            </p>
            <p className="text-xs text-gray-500 mt-2">
              代表：堤　暁寛
            </p>
          </motion.div>

          {/* カード2: ナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1"
            {...({} as any)}
          >
            <h3 className="text-xs text-primary-400 uppercase tracking-wider font-medium mb-4">
              ナビゲーション
            </h3>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* カード3: 事業情報 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:shadow-xl hover:shadow-accent-500/10 transition-all duration-300 hover:-translate-y-1"
            {...({} as any)}
          >
            <h3 className="text-xs text-accent-400 uppercase tracking-wider font-medium mb-4">
              事業情報
            </h3>
            <div className="space-y-2 text-sm text-gray-400 font-light">
              <p>Web開発</p>
              <p>システム開発支援</p>
              <p>エンジニア支援</p>
            </div>
          </motion.div>

          {/* カード4: SNS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1"
            {...({} as any)}
          >
            <h3 className="text-xs text-primary-400 uppercase tracking-wider font-medium mb-4">
              ソーシャル
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-900/50 rounded-lg ${social.color} transition-all duration-300 hover:scale-110 flex items-center justify-center`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* ボーダー */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500 text-center font-light">
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案7: 落ち着いた・クラシック（暖色系）
  const CalmClassicDesign = () => (
    <footer className="bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 text-amber-50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* ロゴセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
            {...({} as any)}
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={200}
              height={80}
              className="h-20 md:h-24 w-auto brightness-0 invert opacity-90"
            />
            <p className="text-sm text-amber-200 font-light leading-relaxed">
              Web開発・システム開発支援
            </p>
            <p className="text-xs text-amber-300/70 font-light">
              代表：堤　暁寛
            </p>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-amber-300/80 uppercase tracking-wider font-light mb-4">
              ナビゲーション
            </h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center space-x-2 text-sm text-amber-200/80 hover:text-amber-50 transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-50 group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                )
              })}
            </nav>
          </motion.div>

          {/* SNSリンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-amber-300/80 uppercase tracking-wider font-light mb-4">
              ソーシャル
            </h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 text-sm text-amber-200/80 hover:text-amber-50 transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span>{social.name}</span>
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-amber-800/50 pt-8">
          <p className="text-xs text-amber-300/70 text-center font-light">
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案8: 落ち着いた・ナチュラル（ベージュ系）
  const CalmNaturalDesign = () => (
    <footer className="bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 text-stone-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* ロゴセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
            {...({} as any)}
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={200}
              height={80}
              className="h-20 md:h-24 w-auto opacity-90"
            />
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              Web開発・システム開発支援
            </p>
            <p className="text-xs text-stone-500 font-light">
              代表：堤　暁寛
            </p>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-stone-500 uppercase tracking-wider font-light mb-4">
              ナビゲーション
            </h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center space-x-2 text-sm text-stone-600 hover:text-stone-900 transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-900 group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                )
              })}
            </nav>
          </motion.div>

          {/* SNSリンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-stone-500 uppercase tracking-wider font-light mb-4">
              ソーシャル
            </h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 text-sm text-stone-600 hover:text-stone-900 transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span>{social.name}</span>
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-stone-300 pt-8">
          <p className="text-xs text-stone-500 text-center font-light">
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案9: 落ち着いた・エレガント（濃いグレー）
  const CalmElegantDesign = () => (
    <footer className="bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 text-slate-200">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* ロゴセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
            {...({} as any)}
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={200}
              height={80}
              className="h-20 md:h-24 w-auto brightness-0 invert opacity-95"
            />
            <p className="text-sm text-slate-400 font-light leading-relaxed tracking-wide">
              Web開発・システム開発支援
            </p>
            <p className="text-xs text-slate-500 font-light tracking-wider">
              代表：堤　暁寛
            </p>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
            {...({} as any)}
          >
            <h3 className="text-xs text-slate-500 uppercase tracking-[0.2em] font-light mb-6">
              ナビゲーション
            </h3>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center space-x-3 text-sm text-slate-400 hover:text-slate-100 transition-all duration-500"
                  >
                    <Icon className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative tracking-wide">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-slate-100 group-hover:w-full transition-all duration-500" />
                    </span>
                  </a>
                )
              })}
            </nav>
          </motion.div>

          {/* SNSリンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
            {...({} as any)}
          >
            <h3 className="text-xs text-slate-500 uppercase tracking-[0.2em] font-light mb-6">
              ソーシャル
            </h3>
            <div className="flex flex-col space-y-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-3 text-sm text-slate-400 hover:text-slate-100 transition-all duration-500"
                  >
                    <Icon className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="tracking-wide">{social.name}</span>
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-slate-700/50 pt-10">
          <p className="text-xs text-slate-500 text-center font-light tracking-wider">
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案10: 遊び心・カラフル
  const PlayfulColorfulDesign = () => (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      {/* カラフルな装飾要素 */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* ロゴセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
            {...({} as any)}
          >
            <div className="relative">
              <Image
                src="/logo.png"
                alt="tsutsu"
                width={200}
                height={80}
                className="h-20 md:h-24 w-auto brightness-0 invert opacity-90"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
            </div>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Web開発・システム開発支援
            </p>
            <p className="text-xs text-gray-500 font-light">
              代表：堤　暁寛
            </p>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-primary-400 uppercase tracking-wider font-medium mb-4">
              ナビゲーション
            </h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const colorClasses = [
                  'hover:text-primary-400 group-hover:text-primary-400',
                  'hover:text-accent-400 group-hover:text-accent-400',
                  'hover:text-blue-400 group-hover:text-blue-400',
                  'hover:text-green-400 group-hover:text-green-400'
                ]
                const borderColors = [
                  'bg-primary-400',
                  'bg-accent-400',
                  'bg-blue-400',
                  'bg-green-400'
                ]
                const colorClass = colorClasses[index % colorClasses.length]
                const borderColor = borderColors[index % borderColors.length]
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center space-x-2 text-sm text-gray-400 ${colorClass} transition-colors duration-300`}
                  >
                    <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      {item.name}
                      <span className={`absolute bottom-0 left-0 w-0 h-px ${borderColor} group-hover:w-full transition-all duration-300`} />
                    </span>
                  </a>
                )
              })}
            </nav>
          </motion.div>

          {/* SNSリンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-accent-400 uppercase tracking-wider font-medium mb-4">
              ソーシャル
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-3 rounded-lg bg-gray-900/50 border border-gray-800 ${social.color} transition-all duration-300 hover:scale-110 hover:border-primary-500/50`}
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
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案11: 遊び心・アニメーション
  const PlayfulAnimatedDesign = () => (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      {/* アニメーション背景 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, primary-500 0%, transparent 50%), radial-gradient(circle at 80% 80%, accent-500 0%, transparent 50%)`,
        }} />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* ロゴセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
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
            >
              <Image
                src="/logo.png"
                alt="tsutsu"
                width={200}
                height={80}
                className="h-20 md:h-24 w-auto brightness-0 invert opacity-90"
              />
            </motion.div>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Web開発・システム開発支援
            </p>
            <p className="text-xs text-gray-500 font-light">
              代表：堤　暁寛
            </p>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-primary-400 uppercase tracking-wider font-medium mb-4">
              ナビゲーション
            </h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    {...({} as any)}
                  >
                    <a
                      href={item.href}
                      className="group flex items-center space-x-2 text-sm text-gray-400 hover:text-primary-400 transition-colors duration-300"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        {...({} as any)}
                      >
                        <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                      <span className="relative">
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </a>
                  </motion.div>
                )
              })}
            </nav>
          </motion.div>

          {/* SNSリンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-accent-400 uppercase tracking-wider font-medium mb-4">
              ソーシャル
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.div
                    key={social.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    {...({} as any)}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group p-3 rounded-lg bg-gray-900/50 border border-gray-800 ${social.color} transition-all duration-300`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500 text-center font-light">
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案12: 遊び心・イラスト風
  const PlayfulIllustratedDesign = () => (
    <footer className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-300 relative overflow-hidden">
      {/* 装飾的な要素 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary-500/30 rounded-full" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-accent-500/30 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-blue-500/30 rounded-full" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* ロゴセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
            {...({} as any)}
          >
            <div className="relative inline-block">
              <div className="absolute -inset-2 border-2 border-primary-500/20 rounded-lg rotate-3" />
              <Image
                src="/logo.png"
                alt="tsutsu"
                width={200}
                height={80}
                className="h-20 md:h-24 w-auto brightness-0 invert opacity-90 relative z-10"
              />
            </div>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Web開発・システム開発支援
            </p>
            <p className="text-xs text-gray-500 font-light">
              代表：堤　暁寛
            </p>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-primary-400 uppercase tracking-wider font-medium mb-4 flex items-center">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
              ナビゲーション
            </h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center space-x-2 text-sm text-gray-400 hover:text-primary-400 transition-colors duration-300 pl-2 border-l-2 border-transparent hover:border-primary-500"
                  >
                    <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span>{item.name}</span>
                  </a>
                )
              })}
            </nav>
          </motion.div>

          {/* SNSリンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-accent-400 uppercase tracking-wider font-medium mb-4 flex items-center">
              <span className="w-2 h-2 bg-accent-500 rounded-full mr-2" />
              ソーシャル
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 rounded-lg bg-gray-900/50 border-2 border-gray-800 ${social.color} transition-all duration-300 hover:scale-110 hover:border-primary-500/50`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 relative z-10" />
                    <div className="absolute inset-0 bg-primary-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500 text-center font-light">
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案13: 攻めた・ネオン
  const EdgyNeonDesign = () => (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      {/* ネオン効果 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-primary-500/30 shadow-[0_0_20px_rgba(14,165,233,0.3)]" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-accent-500/30 shadow-[0_0_20px_rgba(217,70,239,0.3)]" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* ロゴセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
            {...({} as any)}
          >
            <div className="relative">
              <Image
                src="/logo.png"
                alt="tsutsu"
                width={200}
                height={80}
                className="h-20 md:h-24 w-auto brightness-0 invert opacity-90"
              />
              <div className="absolute inset-0 bg-primary-500/20 blur-xl -z-10" />
            </div>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Web開発・システム開発支援
            </p>
            <p className="text-xs text-gray-500 font-light">
              代表：堤　暁寛
            </p>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-primary-400 uppercase tracking-wider font-bold mb-4 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]">
              ナビゲーション
            </h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center space-x-2 text-sm text-gray-400 hover:text-primary-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]"
                  >
                    <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300 shadow-[0_0_4px_rgba(14,165,233,0.5)]" />
                    </span>
                  </a>
                )
              })}
            </nav>
          </motion.div>

          {/* SNSリンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-accent-400 uppercase tracking-wider font-bold mb-4 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
              ソーシャル
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 rounded-lg bg-gray-900 border-2 border-gray-800 ${social.color} transition-all duration-300 hover:scale-110 hover:border-primary-500 hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]`}
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
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案14: 攻めた・タイポグラフィ
  const EdgyTypographyDesign = () => (
    <footer className="bg-black text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* ロゴセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
            {...({} as any)}
          >
            <Image
              src="/logo.png"
              alt="tsutsu"
              width={200}
              height={80}
              className="h-20 md:h-24 w-auto brightness-0 invert opacity-90"
            />
            <p className="text-sm text-gray-400 font-light leading-relaxed tracking-wider uppercase">
              Web開発・システム開発支援
            </p>
            <p className="text-xs text-gray-500 font-light tracking-[0.2em]">
              代表：堤　暁寛
            </p>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-primary-400 uppercase tracking-[0.3em] font-black mb-6 text-lg">
              NAV
            </h3>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center space-x-3 text-base text-gray-400 hover:text-white transition-all duration-300 font-bold tracking-wider uppercase"
                  >
                    <Icon className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                )
              })}
            </nav>
          </motion.div>

          {/* SNSリンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
            {...({} as any)}
          >
            <h3 className="text-xs text-accent-400 uppercase tracking-[0.3em] font-black mb-6 text-lg">
              SOCIAL
            </h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-4 rounded-lg bg-gray-900 border-2 border-gray-800 ${social.color} transition-all duration-300 hover:scale-110 hover:border-primary-500`}
                    aria-label={social.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <div className="border-t-2 border-gray-800 pt-8">
          <p className="text-xs text-gray-500 text-center font-black tracking-[0.3em] uppercase">
            &copy; {currentYear} TSUTSU. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )

  // 案15: 攻めた・アシンメトリック
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
                return (
                  <a
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
                  </a>
                )
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
            &copy; {currentYear} tsutsu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )

  return <EdgyAsymmetricDesign />
}
