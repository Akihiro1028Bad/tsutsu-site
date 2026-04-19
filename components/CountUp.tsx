'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: number | string
  duration?: number
  animate?: boolean
}

/**
 * Renders a number that counts up from 0 to `value` when the element
 * enters the viewport. If `value` is a string (e.g. "2025.08"), it is
 * rendered as-is — no animation.
 */
export default function CountUp({
  value,
  duration = 800,
  animate = true,
}: CountUpProps) {
  const [current, setCurrent] = useState<number | string>(
    typeof value === 'number' && animate ? 0 : value,
  )
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (typeof value !== 'number' || !animate) {
      setCurrent(value)
      return
    }

    const target = value
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setCurrent(target)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()

        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
          setCurrent(target)
          return
        }

        const start = performance.now()
        let raf = 0
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          setCurrent(Math.round(target * (1 - Math.pow(1 - t, 3))))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
      },
      { threshold: 0.3 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [value, duration, animate])

  return <span ref={ref}>{current}</span>
}
