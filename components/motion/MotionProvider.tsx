"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import CustomCursor from "@/components/motion/CustomCursor"
import { useIsDesktop } from "@/lib/motion/use-is-desktop"
import { useReducedMotion } from "@/lib/motion/use-reduced-motion"

interface MotionProviderProps {
  readonly children: React.ReactNode
}

/**
 * Mounts site-wide motion infrastructure.
 *
 * - Lenis (smooth scroll) is mounted only on desktop (`pointer: fine`) and
 *   only when the user has not requested reduced motion. On mobile and for
 *   reduced-motion users, native scrolling is preserved untouched.
 * - The component renders its children verbatim — it adds behaviour, not
 *   markup, so it can wrap any layout without affecting layout tests.
 */
export default function MotionProvider({ children }: MotionProviderProps) {
  const isDesktop = useIsDesktop()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isDesktop || reducedMotion) {
      return
    }
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    let frame = 0
    function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [isDesktop, reducedMotion])

  return (
    <>
      {children}
      <CustomCursor />
    </>
  )
}
