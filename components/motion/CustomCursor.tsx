"use client"

import { useEffect, useRef, useState } from "react"
import { useIsDesktop } from "@/lib/motion/use-is-desktop"
import { useReducedMotion } from "@/lib/motion/use-reduced-motion"

type CursorState = "default" | "hover"

const HOVER_SELECTOR =
  "a, button, [role='button'], [data-cursor='hover'], input[type='submit']"

/**
 * A small dot that follows the mouse and blends with `mix-blend-mode:
 * difference`, giving a signature editorial feel on desktop.
 *
 * - Only mounts on pointer-fine devices + non-reduced-motion users.
 * - Adds `.has-custom-cursor` to <html> so global CSS can hide the
 *   native pointer (`cursor: none`).
 * - Uses requestAnimationFrame for smooth follow without re-rendering
 *   React on every mousemove.
 */
export default function CustomCursor() {
  const isDesktop = useIsDesktop()
  const reduced = useReducedMotion()
  const active = isDesktop && !reduced

  const dotRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef({ x: -100, y: -100 })
  const currentRef = useRef({ x: -100, y: -100 })
  const [state, setState] = useState<CursorState>("default")

  useEffect(() => {
    if (!active) {
      return
    }
    document.documentElement.classList.add("has-custom-cursor")
    return () => {
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [active])

  useEffect(() => {
    if (!active) {
      return
    }

    function onMove(e: MouseEvent) {
      targetRef.current = { x: e.clientX, y: e.clientY }
      const el = e.target as Element | null
      if (el && el.closest(HOVER_SELECTOR)) {
        setState((prev) => (prev === "hover" ? prev : "hover"))
      } else {
        setState((prev) => (prev === "default" ? prev : "default"))
      }
    }

    function onLeave() {
      targetRef.current = { x: -100, y: -100 }
    }

    let frame = 0
    function tick() {
      const t = targetRef.current
      const c = currentRef.current
      // Critically-damped lerp — smooth follow without overshoot.
      c.x += (t.x - c.x) * 0.22
      c.y += (t.y - c.y) * 0.22
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) translate(-50%, -50%)`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [active])

  if (!active) {
    return null
  }

  return (
    <div
      ref={dotRef}
      data-custom-cursor=""
      data-state={state}
      aria-hidden="true"
    />
  )
}
