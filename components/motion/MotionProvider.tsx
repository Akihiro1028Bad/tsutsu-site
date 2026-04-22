"use client"

import { Suspense, useEffect } from "react"
import Lenis from "lenis"
import CustomCursor from "@/components/motion/CustomCursor"
import GrainOverlay from "@/components/motion/GrainOverlay"
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
 * - All dynamic client-hook reads live in {@link MotionEffects} which sits
 *   behind a Suspense boundary — Next.js 16's cacheComponents requires
 *   that uncached data is not accessed at the module's top level.
 */
export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <>
      <Suspense fallback={null}>{children}</Suspense>
      <GrainOverlay />
      <Suspense fallback={null}>
        <MotionEffects />
      </Suspense>
    </>
  )
}

function MotionEffects() {
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

  return <CustomCursor />
}
