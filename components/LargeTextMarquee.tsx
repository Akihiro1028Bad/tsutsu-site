'use client'

import { useEffect, useState } from 'react'

interface LargeTextMarqueeProps {
  text?: string
  speed?: number
  className?: string
}

const defaultText = 'WEB · APP · SYSTEM · CAREER'

export default function LargeTextMarquee({
  text = defaultText,
  speed = 45,
  className = '',
}: LargeTextMarqueeProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
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

      checkMobile()

      const mobileQuery = window.matchMedia('(max-width: 768px)')
      const handleMobileChange = (e: MediaQueryListEvent) => {
        setIsMobile(e.matches)
      }

      mobileQuery.addEventListener('change', handleMobileChange)
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

  // 無限ループのためにテキストを十分に複製
  // 各テキストの間に区切り文字を追加
  const singleText = `${text} · `
  const duplicatedText = singleText.repeat(8)

  // アニメーション無効化時は静止表示
  if (prefersReducedMotion) {
    return (
      <section
        className={`relative w-full overflow-hidden bg-ink py-8 md:py-12 ${className}`}
        aria-hidden="true"
      >
        <div className="flex items-center justify-center">
          <span className="select-none font-black tracking-tight text-4xl md:text-6xl text-lime-500">
            {text}
          </span>
        </div>
      </section>
    )
  }

  const animationStyle = {
    animation: isPaused
      ? 'none'
      : `marquee-scroll ${adjustedSpeed}s linear infinite`,
    willChange: 'transform' as const,
  }

  return (
    <section
      className={`relative w-full overflow-hidden bg-ink py-8 md:py-12 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-hidden="true"
    >
      <div
        className="flex items-center whitespace-nowrap h-full"
        style={animationStyle}
      >
        <span className="select-none font-black tracking-tight text-4xl md:text-6xl text-lime-500">
          {duplicatedText}
        </span>
      </div>
    </section>
  )
}
