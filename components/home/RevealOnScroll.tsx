"use client"

import { useEffect, useRef, useState } from "react"

export type RevealDirection = "up" | "left" | "right" | "scale"

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  /** IntersectionObserver threshold. Defaults to the design's 0.12. */
  threshold?: number
  /**
   * Entrance direction applied while the element is below the threshold.
   *   - up    : translateY(+) → 0     (default; legacy behaviour)
   *   - left  : translateX(-) → 0
   *   - right : translateX(+) → 0
   *   - scale : scale(0.96)  → 1
   */
  direction?: RevealDirection
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

export default function RevealOnScroll({
  children,
  className = "",
  threshold = 0.12,
  direction = "up",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      setRevealed(true)
      return
    }
    const target = ref.current
    /* v8 ignore next 3 -- defensive: ref is always attached after mount */
    if (!target) {
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [threshold])

  const wrapperClass = ["reveal", revealed ? "is-revealed" : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      ref={ref}
      data-revealed={revealed}
      data-direction={direction}
      className={wrapperClass}
    >
      {children}
    </div>
  )
}
