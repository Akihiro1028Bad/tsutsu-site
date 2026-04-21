"use client"

import { useRef } from "react"
import {
  motion,
  useInView,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion"

export type MaskDirection = "bottom" | "top" | "left" | "right"

interface MaskRevealProps {
  readonly children: React.ReactNode
  /** Direction the mask uncovers FROM (bottom = bottom appears first). */
  readonly from?: MaskDirection
  /** Animation duration in ms. Default 900. */
  readonly duration?: number
  /** Initial delay before animation starts (ms). */
  readonly delay?: number
  readonly className?: string
}

const INITIAL_BY_DIRECTION: Record<MaskDirection, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
}
const REVEALED = "inset(0% 0% 0% 0%)"

/**
 * Reveals its children with a clip-path mask once the element scrolls
 * into view. The reveal is one-shot. `from="bottom"` (default) means the
 * bottom edge appears first and the mask recedes upward.
 *
 * Reduced-motion users see the content immediately, with no transform.
 */
export default function MaskReveal({
  children,
  from = "bottom",
  duration = 900,
  delay = 0,
  className,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15% 0px" })
  const reduced = useFramerReducedMotion()

  const initial = INITIAL_BY_DIRECTION[from]
  const target = inView ? REVEALED : initial

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: initial }}
      animate={{ clipPath: target }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
