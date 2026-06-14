"use client"

import {
  motion,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion"
import { useIsDesktop } from "@/lib/motion/use-is-desktop"

interface SectionEdgeAccentProps {
  readonly className?: string
}

/**
 * Hairline accent painted along the top edge of a section.
 * Sweeps in (scaleX 0 → 1) on first viewport entry to reinforce the
 * "sheet overlap" moment as the section covers the one above it. Only
 * rendered on desktop with motion allowed — matches the gating of the
 * other crossover surfaces (Hero depth, glass band, tilt) so touch and
 * reduced-motion users get a consistent static fallback.
 */
export default function SectionEdgeAccent({ className }: SectionEdgeAccentProps) {
  const isDesktop = useIsDesktop()
  const reduced = useFramerReducedMotion()
  if (!isDesktop || reduced) {
    return null
  }
  return (
    <motion.span
      className={["section__edge-accent", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-5% 0px -5% 0px" }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
    />
  )
}
