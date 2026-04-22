"use client"

import { useEffect, useState } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

/**
 * Subscribe to the user's `prefers-reduced-motion` preference.
 *
 * Returns `true` until first hydration so SSR markup is the safe (no-motion)
 * variant; flips on mount based on the actual media query, then tracks
 * changes for users who toggle the OS setting mid-session.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    setReduced(mq.matches)
    function onChange(e: MediaQueryListEvent) {
      setReduced(e.matches)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return reduced
}
