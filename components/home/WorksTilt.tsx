"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion"
import { useIsDesktop } from "@/lib/motion/use-is-desktop"

interface WorksTiltProps {
  readonly children: React.ReactNode
}

/**
 * Applies a subtle scroll-linked 3D tilt to the Works section's content.
 * The sheet "lands flat" as it enters the viewport — starts at
 * rotateX(1.2deg) and rests at 0deg, paired with the section-level
 * `perspective` from home.css. Disabled on touch + reduced-motion.
 */
export default function WorksTilt({ children }: WorksTiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const reduced = useFramerReducedMotion()
  const shouldAnimate = isDesktop && !reduced

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  })

  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? [1.2, 0] : [0, 0]
  )
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? [18, 0] : [0, 0]
  )

  return (
    <motion.div
      ref={ref}
      className="works__tilt"
      style={{
        rotateX,
        y,
        transformOrigin: "50% 0%",
        transformStyle: "preserve-3d",
      }}
      data-works-tilt={shouldAnimate ? "on" : "off"}
    >
      {children}
    </motion.div>
  )
}
