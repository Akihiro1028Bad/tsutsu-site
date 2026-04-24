"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion"
import { useIsDesktop } from "@/lib/motion/use-is-desktop"

/**
 * Editorial first-fold. Adds a subtle depth recession as Works rises to
 * cover the sticky-pinned Hero (Sticky Stack): the content sheet
 * scales down, fades, and softly blurs, so the crossover reads as one
 * sheet sliding in front of another. Gated by desktop + motion-preference
 * so touch and motion-sensitive users see the static fallback.
 */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const isDesktop = useIsDesktop()
  const reduced = useFramerReducedMotion()
  const shouldAnimate = isDesktop && !reduced

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? [1, 0.94] : [1, 1]
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    shouldAnimate ? [1, 0.9, 0.45] : [1, 1, 1]
  )
  const blurPx = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? [0, 6] : [0, 0]
  )
  const filter = useTransform(blurPx, (b: number) => `blur(${b}px)`)

  return (
    <header id="top" ref={ref} className="hero hero--wrap">
      <motion.div
        className="hero__grid"
        style={{
          scale,
          opacity,
          filter,
          transformOrigin: "50% 45%",
          willChange: shouldAnimate
            ? "transform, opacity, filter"
            : undefined,
        }}
        data-hero-depth={shouldAnimate ? "on" : "off"}
      >
        <div className="hero__title-block">
          <h1 className="hero__main">
            <span className="hero__main-line">想いを</span>
            <span className="hero__main-line">
              <em className="hero__em">技術</em>で
            </span>
            <span className="hero__main-line">カタチに。</span>
          </h1>
        </div>
        <div className="hero__sub-row">
          <p className="hero__sub">
            <span className="hero__services-inline">
              WEBサイト制作 ／ アプリ開発 ／ AIソリューション ／
              学習・開発支援
            </span>
            一人ひとりの
            <span className="hero__mark">アイデアに寄り添い</span>、
            <br />
            最新技術でその実現をサポートします。
          </p>
        </div>
      </motion.div>
      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-hint__line" />
        <span className="hero__scroll-hint__label">SCROLL</span>
      </div>
    </header>
  )
}
