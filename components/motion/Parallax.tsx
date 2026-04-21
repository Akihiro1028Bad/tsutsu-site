"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion"
import { useIsDesktop } from "@/lib/motion/use-is-desktop"

interface ParallaxProps {
  readonly children: React.ReactNode
  /**
   * Total pixel travel across the scroll range. Negative = element moves
   * up (slower than scroll). Default `-40` = subtle 40px upward drift.
   */
  readonly offset?: number
  readonly className?: string
  /** Optional inline styles forwarded to the motion wrapper. */
  readonly style?: React.CSSProperties
}

/**
 * Generic vertical parallax wrapper.
 *
 * - Uses framer-motion `useScroll` (Lenis-compatible since Lenis updates
 *   the native scrollY).
 * - Travels half the offset above the centred position and half below,
 *   so the element rests at its natural position when in viewport mid.
 * - Disabled (yields static rendering) on touch devices and for users
 *   who prefer reduced motion. Hooks are always called to satisfy the
 *   rules of hooks.
 */
export default function Parallax({
  children,
  offset = -40,
  className,
  style,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const reduced = useFramerReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const shouldAnimate = isDesktop && !reduced
  const half = offset / 2
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? [-half, half] : [0, 0]
  )

  return (
    <motion.div
      ref={ref}
      style={{ y, ...style }}
      className={className}
      data-parallax={shouldAnimate ? "on" : "off"}
    >
      {children}
    </motion.div>
  )
}
