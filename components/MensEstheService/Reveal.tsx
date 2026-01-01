'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type RevealVariant = 'fade' | 'slideUp' | 'slideUpScale' | 'growY' | 'pop'

type RevealProps = {
  as?: keyof JSX.IntrinsicElements
  className?: string
  children: React.ReactNode
  amount?: number
  delayMs?: number
  variant?: RevealVariant
  shine?: boolean
  style?: React.CSSProperties
} & Record<string, unknown>

export function Reveal({
  as = 'div',
  className = '',
  children,
  amount = 0.3,
  delayMs,
  variant = 'fade',
  shine = false,
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)
  const revealTimerRef = useRef<number | null>(null)
  const scheduledRef = useRef(false)

  useEffect(() => {
    if (revealed) return
    if (typeof window === 'undefined') return
    if (!ref.current) return

    const node = ref.current

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          if (scheduledRef.current) return
          scheduledRef.current = true

          if (delayMs && delayMs > 0) {
            revealTimerRef.current = window.setTimeout(() => {
              setRevealed(true)
              revealTimerRef.current = null
            }, delayMs)
          } else {
            setRevealed(true)
          }
          observer.disconnect()
        }
      },
      { threshold: amount }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [amount, delayMs, revealed])

  useEffect(() => {
    return () => {
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current)
        revealTimerRef.current = null
      }
    }
  }, [])

  const mergedStyle = useMemo(() => {
    const shouldWillChangeTransform =
      variant === 'slideUp' || variant === 'slideUpScale' || variant === 'growY' || variant === 'pop'

    return {
      willChange: shouldWillChangeTransform ? 'transform, opacity' : 'opacity',
      ...(revealed ? { animationFillMode: 'both' } : null),
      ...style,
    }
  }, [revealed, style, variant])

  const Component = as as any
  const shineContainerClassName = shine ? 'relative overflow-hidden' : ''
  const mergedClassName = (() => {
    if (!revealed) {
      if (variant === 'slideUp') return `opacity-0 translate-y-5 ${shineContainerClassName} ${className}`
      if (variant === 'slideUpScale') return `opacity-0 translate-y-[30px] scale-95 ${shineContainerClassName} ${className}`
      if (variant === 'growY') return `origin-top scale-y-0 ${shineContainerClassName} ${className}`
      if (variant === 'pop') return `opacity-0 translate-y-7 scale-[0.92] ${shineContainerClassName} ${className}`
      return `opacity-0 ${shineContainerClassName} ${className}`
    }

    if (variant === 'slideUp') return `opacity-0 translate-y-5 animate-slide-up ${shineContainerClassName} ${className}`
    if (variant === 'slideUpScale') return `opacity-0 translate-y-[30px] scale-95 animate-slide-up-scale ${shineContainerClassName} ${className}`
    if (variant === 'growY') return `origin-top scale-y-0 animate-grow-y ${shineContainerClassName} ${className}`
    if (variant === 'pop') return `opacity-0 translate-y-7 scale-[0.92] animate-pop-in ${shineContainerClassName} ${className}`
    return `opacity-0 animate-fade-in ${shineContainerClassName} ${className}`
  })()

  return (
    <Component ref={ref as any} className={mergedClassName} style={mergedStyle} {...rest}>
      {shine && revealed ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(245,158,11,0.10),transparent)] bg-[length:200%_100%] opacity-0 animate-shine"
        />
      ) : null}
      {children}
    </Component>
  )
}
