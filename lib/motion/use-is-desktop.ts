"use client"

import { useEffect, useState } from "react"

/**
 * `(pointer: fine)` — true on devices with a precise pointing device
 * (mouse / trackpad). False on touch-primary devices (phones, most tablets).
 *
 * Used to gate desktop-only motion (custom cursor, magnetic links, smooth
 * scroll, parallax) since these effects either don't translate to touch or
 * actively degrade the experience.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    setIsDesktop(mq.matches)
    function onChange(e: MediaQueryListEvent) {
      setIsDesktop(e.matches)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return isDesktop
}
