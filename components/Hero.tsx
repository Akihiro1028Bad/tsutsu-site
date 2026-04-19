'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-paper px-6 pt-24 pb-16 md:min-h-screen md:px-12"
    >
      {/* subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0a0a0a 1px, transparent 1px), linear-gradient(to bottom, #0a0a0a 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 mx-auto w-full max-w-screen-2xl"
      >
        <p className="mono-tag mb-10 text-ink/50">INDEPENDENT DEVELOPER — TOKYO</p>

        <h1 className="h-display text-[clamp(3rem,10vw,9rem)]">
          <span className="block">想いを</span>
          <span className="block">
            <span className="lime-highlight">技術</span>で
          </span>
          <span className="block">カタチにします。</span>
        </h1>

        <p className="mt-10 max-w-xl text-base text-ink/70 md:text-lg">
          一人ひとりのアイデアに寄り添い、最新技術で実現をサポートします。
        </p>

        <Link
          href="/#contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-lime-500 transition-transform hover:-translate-y-0.5"
        >
          無料で相談 <span aria-hidden>→</span>
        </Link>
      </motion.div>

      <div className="mono-tag absolute bottom-6 right-6 flex flex-col items-end gap-1 text-ink/50 md:bottom-8 md:right-12">
        <span>↓ SCROLL</span>
        <span>01 — 07</span>
      </div>
    </section>
  )
}
