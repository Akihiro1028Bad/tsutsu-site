'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  // バリアント3: 3行構成
  const titleLines = ['「想い」を', '「技術」で', 'カタチにします。']

  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden bg-white min-h-[92dvh] md:min-h-[90dvh] lg:min-h-[100vh] py-20 md:py-32"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true" data-parallax>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* コンテンツを中央に配置し、最大幅を制限して余白を確保 */}
      <div className="w-full max-w-[800px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mx-auto w-full"
          {...({} as any)}
        >
          {/* Minimal Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 md:mb-10"
            {...({} as any)}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-5 md:mb-6 leading-[1.2] text-slate-950 tracking-tight break-words">
              {titleLines.map((line, lineIndex) => (
                <motion.span
                  key={lineIndex}
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + lineIndex * 0.15,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  {...({} as any)}
                >
                  {line.split('').map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Elegant Divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100px', opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-8 md:mb-10"
            aria-hidden="true"
            {...({} as any)}
          />

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.4,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="mb-8 md:mb-10"
            {...({} as any)}
          >
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal tracking-[0.08em] uppercase max-w-2xl mx-auto px-4">
            WEBサイト制作｜アプリ開発｜AIソリューション｜学習・開発支援
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.6,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="mb-8 md:mb-10 max-w-2xl mx-auto space-y-3 md:space-y-4 px-4"
            {...({} as any)}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-[1.6] font-light tracking-tight">
              一人ひとりのアイデアに寄り添い、
              <br className="hidden md:block" />
              最新技術で実現をサポートします。
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center px-4"
            {...({} as any)}
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              whileFocus={{ scale: 1.02, y: -2 }}
              className="px-8 sm:px-10 md:px-12 py-2.5 sm:py-3 md:py-4 bg-slate-950 text-white rounded-none font-normal tracking-[0.08em] hover:bg-slate-900 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 transition-all duration-500 text-sm sm:text-base uppercase relative group overflow-hidden w-full sm:w-auto text-center"
              aria-label="サービス一覧へ移動"
              {...({} as any)}
            >
              <span className="relative z-10 block">サービスを見る</span>
              <motion.div
                className="absolute inset-0 bg-slate-800"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
                {...({} as any)}
              />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              whileFocus={{ scale: 1.02, y: -2 }}
              className="px-8 sm:px-10 md:px-12 py-2.5 sm:py-3 md:py-4 bg-transparent text-slate-950 rounded-none font-normal tracking-[0.08em] border border-slate-950 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 transition-all duration-500 text-sm sm:text-base uppercase relative group w-full sm:w-auto text-center"
              aria-label="お問い合わせフォームへ移動"
              {...({} as any)}
            >
              <span className="relative z-10 block">お問い合わせ</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-8 right-8 z-50"
        aria-label="スクロールインジケーター"
        {...({} as any)}
      >
        <motion.a
          href="#services"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-slate-400 hover:text-slate-600 focus:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-full p-2 transition-colors group"
          aria-label="次のセクションへスクロール"
          {...({} as any)}
        >
          <span className="text-xs mb-3 font-normal tracking-[0.15em] uppercase">スクロール</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  )
}
