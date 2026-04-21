"use client"

import { useRef, useState } from "react"
import {
  motion,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion"
import { useIsDesktop } from "@/lib/motion/use-is-desktop"

interface MagneticLinkProps {
  readonly children: React.ReactNode
  /**
   * Fraction of the cursor offset the element follows. 0.25 = element
   * drifts a quarter of the cursor's distance from centre. Small values
   * (0.15–0.3) feel like a subtle tug; larger values start to look silly.
   */
  readonly strength?: number
  /**
   * Maximum translation in px. Clamps the effect so wide hit areas
   * don't produce oversized drift.
   */
  readonly max?: number
  readonly className?: string
}

/**
 * Wraps a link/button with a subtle "magnetic" pull toward the cursor.
 *
 * - Active only on pointer-fine devices and for users who have NOT
 *   requested reduced motion. Hooks are always called (rules of hooks).
 * - When inactive, renders a plain wrapper with no listeners — zero
 *   runtime cost on touch / reduced-motion.
 * - The wrapper is display: inline-block so the original layout flow
 *   of the child is preserved.
 */
export default function MagneticLink({
  children,
  strength = 0.25,
  max = 12,
  className,
}: MagneticLinkProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isDesktop = useIsDesktop()
  const reduced = useFramerReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const active = isDesktop && !reduced

  function handleMouseMove(event: React.MouseEvent<HTMLSpanElement>) {
    if (!active || !ref.current) {
      return
    }
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (event.clientX - cx) * strength
    const dy = (event.clientY - cy) * strength
    const clampedX = Math.max(-max, Math.min(max, dx))
    const clampedY = Math.max(-max, Math.min(max, dy))
    setOffset({ x: clampedX, y: clampedY })
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 })
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      data-magnetic={active ? "on" : "off"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={active ? { x: offset.x, y: offset.y } : { x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.span>
  )
}
