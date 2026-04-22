"use client"

import { useEffect, useState } from "react"

/**
 * Thin scroll-position indicator fixed at the top of the viewport.
 * Used by the Kinetic article-preview variant.
 */
export default function ReadingProgress() {
  const [ratio, setRatio] = useState(0)

  useEffect(() => {
    const update = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setRatio(max > 0 ? h.scrollTop / max : 0)
    }
    update()
    document.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      document.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div className="ap__progress" aria-hidden="true">
      <span
        className="ap__progress-bar"
        style={{ transform: `scaleX(${ratio})` }}
      />
    </div>
  )
}
