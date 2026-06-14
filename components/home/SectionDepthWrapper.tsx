"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion"
import { useIsDesktop } from "@/lib/motion/use-is-desktop"

interface SectionDepthWrapperProps {
  readonly children: React.ReactNode
  readonly scaleRange?: [number, number]
  readonly opacityRange?: [number, number]
  readonly blurRange?: [number, number]
}

/**
 * Wraps a section in a scroll-linked depth recession: as the section
 * scrolls out of view, it scales down, fades, and softly blurs —
 * reinforcing the "sheet stack" crossover as the next section rises.
 * Gated to desktop + motion-preference for consistency with the other
 * Sticky Stack surfaces (Hero depth, glass band, tilt). Touch and
 * reduced-motion users receive the children with no extra DOM nodes.
 */
export default function SectionDepthWrapper({
  children,
  scaleRange = [1, 0.95],
  opacityRange = [1, 0.5],
  blurRange = [0, 4],
}: SectionDepthWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const reduced = useFramerReducedMotion()
  const shouldAnimate = isDesktop && !reduced

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? scaleRange : [1, 1]
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? opacityRange : [1, 1]
  )
  const blurPx = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? blurRange : [0, 0]
  )
  const filter = useTransform(blurPx, (b: number) => `blur(${b}px)`)

  if (!shouldAnimate) {
    return <>{children}</>
  }

  return (
    <div ref={ref}>
      <motion.div
        style={{ scale, opacity, filter }}
        data-depth="on"
      >
        {children}
      </motion.div>
    </div>
  )
}
