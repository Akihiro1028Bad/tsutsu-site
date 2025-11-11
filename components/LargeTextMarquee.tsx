'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LargeTextMarqueeProps {
  text?: string
  speed?: number
  className?: string
}

const defaultText = 'MEANINGFUL DIGITAL SOLUTIONS'

export default function LargeTextMarquee({
  text = defaultText,
  speed = 45,
  className = '',
}: LargeTextMarqueeProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true)
      
      // アニメーション無効化設定の検出
      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(reducedMotionQuery.matches)

      const handleReducedMotionChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches)
      }

      reducedMotionQuery.addEventListener('change', handleReducedMotionChange)

      // モバイル検出（初期値を即座に設定）
      const checkMobile = () => {
        const isMobileDevice = window.matchMedia('(max-width: 768px)').matches
        setIsMobile(isMobileDevice)
      }

      // 即座にチェック
      checkMobile()
      
      const mobileQuery = window.matchMedia('(max-width: 768px)')
      const handleMobileChange = (e: MediaQueryListEvent) => {
        setIsMobile(e.matches)
      }

      mobileQuery.addEventListener('change', handleMobileChange)
      
      // リサイズ時もチェック（念のため）
      window.addEventListener('resize', checkMobile)

      return () => {
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
        mobileQuery.removeEventListener('change', handleMobileChange)
        window.removeEventListener('resize', checkMobile)
      }
    }
  }, [])

  // モバイル時は速度を上げる（数値が小さいほど速い）
  const adjustedSpeed = isMobile ? speed * 0.3 : speed

  // 無限ループのためにテキストを十分に複製（8回複製で確実にシームレス）
  // 各テキストの間に区切り文字を追加
  const singleText = `${text} · `
  const duplicatedText = singleText.repeat(8) // 8回繰り返し（より多くの複製でリセット感を完全に排除）

  // アニメーション無効化時は静止表示
  if (prefersReducedMotion) {
    return (
      <section className={`relative w-full overflow-hidden py-12 md:py-20 bg-slate-50/30 ${className}`} aria-hidden="true">
        <div className="flex items-center justify-center">
          <span className="font-semibold tracking-[0.05em] select-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-slate-300/40 md:text-slate-400/50">
            {text}
          </span>
        </div>
      </section>
    )
  }

  // CSSアニメーション用のスタイル（より滑らかな無限ループを実現）
  const animationStyle = {
    animation: isPaused 
      ? 'none' 
      : `marquee-scroll ${adjustedSpeed}s linear infinite`,
    willChange: 'transform' as const,
  }

  // グラデーション位置のアニメーション
  const gradientAnimation = {
    backgroundPosition: ['0% 50%', '100% 50%'],
  }

  return (
    <section
      className={`relative w-full overflow-hidden py-12 md:py-20 bg-slate-50/30 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-hidden="true"
    >
      {/* グラデーションマスク（両端のフェード効果） */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-white via-transparent to-white" />

      {/* CSSアニメーションを使用したシームレスなスクロール */}
      <div
        className="flex items-center whitespace-nowrap h-full"
        style={animationStyle}
      >
        <motion.span
          className="font-semibold tracking-[0.05em] select-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          animate={isPaused ? {} : gradientAnimation}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: 'linear-gradient(90deg, rgb(148 163 184 / 0.4), rgb(100 116 139 / 0.6), rgb(71 85 105 / 0.5), rgb(100 116 139 / 0.6), rgb(148 163 184 / 0.4))',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            willChange: 'background-position',
          }}
        >
          {duplicatedText}
        </motion.span>
      </div>
    </section>
  )
}
