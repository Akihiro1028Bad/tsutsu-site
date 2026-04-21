"use client"

import { useEffect, useState } from "react"

interface LoaderProps {
  /** Time the loader stays fully visible before exit (ms). */
  readonly holdMs?: number
  /** Exit animation length (ms). */
  readonly exitMs?: number
}

const SESSION_KEY = "tsutsu:loader-shown"
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

type Phase = "idle" | "show" | "exit" | "done"

/**
 * First-visit-only intro curtain. Shows a full-screen dark overlay with
 * the brand mark, then animates out. Subsequent visits in the same tab
 * (same session) skip it entirely. Reduced-motion users never see it.
 *
 * The component manages its own lifetime — once `done`, it returns null
 * and removes the overlay node from the DOM.
 */
export default function Loader({ holdMs = 900, exitMs = 600 }: LoaderProps) {
  const [phase, setPhase] = useState<Phase>("idle")

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setPhase("done")
      return
    }
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      sessionStorage.setItem(SESSION_KEY, "1")
      setPhase("done")
      return
    }

    setPhase("show")
    const holdTimer = setTimeout(() => setPhase("exit"), holdMs)
    const exitTimer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1")
      setPhase("done")
    }, holdMs + exitMs)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(exitTimer)
    }
  }, [holdMs, exitMs])

  if (phase === "idle" || phase === "done") {
    return null
  }

  return (
    <div
      data-loader=""
      data-phase={phase}
      aria-hidden="true"
    >
      <div data-loader-mark>
        <span>tsutsu</span>
        <span aria-hidden="true">.</span>
      </div>
    </div>
  )
}
