'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

import { MENS_ESTHE_CONFIG } from '@/lib/constants/config'
import { SECTION_IDS, type ServiceInfo } from '@/lib/types/mens-esthe-service'
import { scrollToSection } from '@/lib/utils/mens-esthe-service'

type HeroSectionProps = {
  serviceInfo: ServiceInfo
}

export function HeroSection({ serviceInfo }: HeroSectionProps) {
  const handleContactClick = () => {
    scrollToSection(SECTION_IDS.contact)
  }

  const handleScrollClick = () => {
    scrollToSection(SECTION_IDS.benefits)
  }

  return (
    <motion.section
      id={SECTION_IDS.hero}
      role="banner"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 flex min-h-0 items-center justify-center overflow-hidden py-12 md:min-h-[80vh] md:py-24 lg:py-32"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={MENS_ESTHE_CONFIG.IMAGES.hero}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
          aria-hidden="true"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 md:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Text Content - Left Side */}
          <div className="w-full lg:w-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="whitespace-pre-line text-4xl font-light leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              {serviceInfo.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-base font-medium tracking-[0.12em] text-gold-300 md:mt-6 md:text-lg"
            >
              {serviceInfo.catchphrase}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-xl leading-relaxed text-white/95 md:mt-8 md:text-2xl"
            >
              {serviceInfo.valueProposition}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 whitespace-pre-line text-base leading-relaxed text-white/80 md:mt-6 md:text-lg"
            >
              {serviceInfo.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 md:mt-10"
            >
              <button
                type="button"
                onClick={handleContactClick}
                aria-label="お問い合わせセクションへ移動"
                className="inline-flex items-center justify-center rounded-md bg-gold-600 px-10 py-5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gold-700 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
              >
                お問い合わせ
              </button>
            </motion.div>
          </div>

          {/* Mock Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <Image
                src={MENS_ESTHE_CONFIG.IMAGES.heroMock}
                alt="メンズエステサービスページのモックアップ"
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full rounded-lg"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-label="スクロールインジケーター"
      >
        <motion.button
          type="button"
          onClick={handleScrollClick}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-gold-300 hover:text-gold-200 focus:text-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black/50 rounded-full p-2 min-h-[44px] min-w-[44px] justify-center transition-colors group motion-reduce:animate-none"
          aria-label="次のセクションへスクロール"
        >
          <span className="text-xs mb-2 font-normal tracking-[0.15em] uppercase text-white/80">
            スクロール
          </span>
          <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300 motion-reduce:transition-none" aria-hidden="true" />
        </motion.button>
      </motion.div>
    </motion.section>
  )
}
