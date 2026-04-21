"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  /** Target number to count to. */
  readonly end: number
  /** Animation duration in ms. Default 1200. */
  readonly duration?: number
  /** Pad whole-number portion to this many digits with leading zeros. */
  readonly pad?: number
  /** Decimal places to display. Default 0. */
  readonly decimals?: number
  /** Optional suffix appended to the formatted number (e.g. "%", "+"). */
  readonly suffix?: string
  /** Optional prefix prepended to the formatted number. */
  readonly prefix?: string
  readonly className?: string
}

const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3)
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

/**
 * Animated number counter — counts from 0 to `end` once the element
 * enters the viewport. Uses requestAnimationFrame; one-shot per mount.
 *
 * Reduced-motion users see the final value immediately.
 */
export default function CountUp({
  end,
  duration = 1200,
  pad = 0,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    // Read prefers-reduced-motion live inside the effect so the initial
    // value doesn't depend on a state hook with an SSR-safe default.
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      setValue(end)
      return
    }
    const target = ref.current
    /* v8 ignore next 3 -- ref always attached after mount */
    if (!target) {
      return
    }

    let frame = 0
    let startTime = 0

    function tick(now: number) {
      if (!startTime) startTime = now
      const progress = Math.min(1, (now - startTime) / duration)
      setValue(end * EASE_OUT_CUBIC(progress))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            frame = requestAnimationFrame(tick)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(target)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [end, duration])

  const formatted = value.toFixed(decimals)
  const [whole, frac] = formatted.split(".")
  const paddedWhole = pad > 0 ? whole.padStart(pad, "0") : whole
  const display = frac ? `${paddedWhole}.${frac}` : paddedWhole

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
