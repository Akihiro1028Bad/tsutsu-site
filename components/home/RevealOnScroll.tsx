"use client"

import { useEffect, useRef, useState } from "react"

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  /** IntersectionObserver threshold. Defaults to the design's 0.12. */
  threshold?: number
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

export default function RevealOnScroll({
  children,
  className = "",
  threshold = 0.12,
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
    <div ref={ref} data-revealed={revealed} className={wrapperClass}>
      {children}
    </div>
  )
}
