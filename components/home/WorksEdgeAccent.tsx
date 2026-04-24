"use client"

import {
  motion,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion"

/**
 * Hairline accent painted along the top edge of the Works section.
 * Sweeps in (scaleX 0 → 1) on first viewport entry to reinforce the
 * "sheet overlap" moment where Works covers the pinned Hero. Opts out
 * entirely under prefers-reduced-motion.
 */
export default function WorksEdgeAccent() {
  const reduced = useFramerReducedMotion()
  if (reduced) {
    return null
  }
  return (
    <motion.span
      className="works__edge-accent"
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-5% 0px -5% 0px" }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
    />
  )
}
