'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

type Service = {
  title: string
  description: string
  capabilities: string[]
  targetAudience: string[]
  number: string
  gradient: string
  bgGradient: string
  backgroundImage?: string
}

const services: Service[] = [
  {
    title: 'Webサイト制作',
    description: '事業や想いを丁寧にヒアリングし、目的に合ったWebサイトを制作します。見る人にとってわかりやすく、使う人にとってストレスのない設計を大切にしています。',
    capabilities: [
      'コーポレートサイト / LP の制作',
      'STUDIO / WordPress / Next.js など、目的に合わせた構成提案',
      'お問い合わせ・予約導線の改善',
    ],
    targetAudience: [
      '自分の事業をきちんと形にしたい方',
      '信頼感のあるサイトを持ちたい方',
      '既存サイトの使いやすさを改善したい方',
    ],
    number: '01',
    gradient: 'from-slate-400 via-slate-500 to-slate-600',
    bgGradient: 'from-slate-50 to-slate-100',
    backgroundImage: '/services/web-design-bg.jpg',
  },
  {
    title: 'Webアプリ / システム開発',
    description: '日々の業務やサービス運営で生まれる「手間」や「管理のしづらさ」を、Webアプリや管理画面の開発によって解消します。長く使い続けられる、無理のない設計を心がけています。',
    capabilities: [
      '顧客管理 / 予約管理 / ダッシュボードなどのWebシステム開発',
      '認証 / API / データベースの設計',
      '運用・改善の伴走',
    ],
    targetAudience: [
      '「スプレッドシートや手作業が限界…」',
      '「業務をスムーズに回せる仕組みが欲しい」',
      '小さく試しながら、相談しながら進めたい方',
    ],
    number: '02',
    gradient: 'from-slate-500 via-slate-600 to-slate-700',
    bgGradient: 'from-slate-100 to-slate-200',
    backgroundImage: '/services/web-app-bg.jpg',
  },
  {
    title: '業務改善・自動化（AI/ツール活用）',
    description: '現場の業務に合わせて、無理なく続けられる改善を設計します。手間を減らし、作業の見える化や標準化を一緒に進めていきます。',
    capabilities: [
      '業務フローの整理・可視化',
      'Notion / Google Workspace / Zapier などの導入・構築',
      '必要に応じた生成AIの活用（FAQ、自動応答、文章整理など）',
    ],
    targetAudience: [
      '毎日の作業を少しでも楽にしたい方',
      'ツールは知っているが、何から始めればいいかわからない方',
      '小さく試しながら、相談しながら進めたい方',
    ],
    number: '03',
    gradient: 'from-slate-400 via-slate-500 to-slate-600',
    bgGradient: 'from-slate-50 to-slate-100',
    backgroundImage: '/services/automation-bg.jpg',
  },
  {
    title: '学習支援・キャリア支援',
    description: '未経験〜初中級エンジニアの方に向けて、学習〜実践〜キャリアの段階を、一緒に並走しながら進めます。「ただ教わる」ではなく、「自分で考えて作れる力」を育てます。',
    capabilities: [
      '個別の学習プラン作成・進捗サポート',
      'ポートフォリオ制作支援',
      '転職活動・案件獲得に向けた実践的なアドバイス',
    ],
    targetAudience: [
      '一人だと学習が続かない方',
      '教材は終えたが、実際に何を作ればいいかわからない方',
      '現場レベルの考え方・実践力を身につけたい方',
    ],
    number: '04',
    gradient: 'from-slate-500 via-slate-600 to-slate-700',
    bgGradient: 'from-slate-100 to-slate-200',
    backgroundImage: '/services/learning-bg.jpg',
  },
]

type TabType = 'capabilities' | 'audience'

interface ServiceCardProps {
  service: Service
  index: number
}

// 画像ブロックコンポーネント
function ImageBlock({ 
  service, 
  className = '',
  isMobile = false 
}: { 
  service: Service
  className?: string
  isMobile?: boolean
}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  // アニメーション終了後にwillChangeを削除
  useEffect(() => {
    if (imageLoaded && imageRef.current) {
      const timer = setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.willChange = 'auto'
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [imageLoaded])

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      {/* Background Image */}
      {service.backgroundImage && (
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setImageLoaded(true)}
          className="absolute inset-0 group-hover:opacity-[0.5] transition-opacity duration-500 z-0"
          style={{
            willChange: imageLoaded ? 'auto' : 'opacity, transform',
          }}
          aria-hidden="true"
          {...({} as any)}
        >
          <Image
            src={service.backgroundImage}
            alt={`${service.title}の背景画像`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
            style={{
              objectPosition: isMobile ? 'top center' : 'center',
              opacity: 0.85,
              filter: 'saturate(0.7) brightness(0.98)',
            }}
            aria-hidden="true"
          />
        </motion.div>
      )}

      {/* Monochrome Overlay - 軽減 */}
      <div 
        className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/8 transition-colors duration-500 z-[1]"
        aria-hidden="true"
      />

      {/* Gradient Overlay - モバイルでは無効化、デスクトップでは軽量なアニメーション */}
      {!isMobile ? (
        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} group-hover:opacity-20 transition-opacity duration-500 z-[1]`}
          style={{
            willChange: 'opacity',
          }}
          aria-hidden="true"
          {...({} as any)}
        />
      ) : (
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-15 transition-opacity duration-500 z-[1]`}
          aria-hidden="true"
        />
      )}

      {/* Background Number Badge */}
      <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 text-5xl sm:text-7xl md:text-8xl font-light text-slate-200/40 leading-none select-none pointer-events-none z-[2] ${isMobile ? 'text-4xl sm:text-6xl' : ''}`}>
        {service.number}
      </div>
    </div>
  )
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<TabType>('capabilities')
  const [isMobile, setIsMobile] = useState(false)
  const [animationsComplete, setAnimationsComplete] = useState(false)
  
  // スマホ検出
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkMobile = () => {
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches
      setIsMobile(isSmallScreen)
    }
    
    checkMobile()
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    mediaQuery.addEventListener('change', checkMobile)
    window.addEventListener('resize', checkMobile)
    return () => {
      mediaQuery.removeEventListener('change', checkMobile)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])
  
  // スマホではスクロール連動アニメーションを無効化
  const { scrollYProgress } = useScroll({
    target: isMobile ? undefined : (ref as React.RefObject<HTMLElement>),
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98])

  // アニメーション完了後にwillChangeを削除
  useEffect(() => {
    if (animationsComplete) {
      const timer = setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.willChange = 'auto'
        }
        if (imageRef.current) {
          imageRef.current.style.willChange = 'auto'
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [animationsComplete])

  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      style={{ 
        y: isMobile ? 0 : y, 
        opacity: isMobile ? 1 : opacity, 
        scale: isMobile ? 1 : scale 
      }}
      className="relative"
      {...({} as any)}
    >
      {/* アプローチA: スマホで画像を上部に配置 */}
      <div className={`flex flex-col-reverse md:flex-row items-stretch gap-0 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
        {/* Main Content Block */}
        <motion.div
          ref={contentRef}
          initial={{ x: isMobile ? 0 : (isLeft ? -60 : 60), opacity: isMobile ? 1 : 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: isMobile ? '0px' : '-100px' }}
          transition={{ duration: isMobile ? 0.4 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setAnimationsComplete(true)}
          className="flex-1 w-full md:w-auto"
          style={{ willChange: animationsComplete ? 'auto' : 'transform, opacity' }}
          {...({} as any)}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative bg-white p-6 sm:p-8 md:p-16 md:min-h-[500px] flex flex-col justify-between group border border-slate-200/50 hover:border-slate-300 transition-colors duration-500"
            data-service-card
            {...({} as any)}
          >
            {/* Background Number */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 text-[6rem] sm:text-[8rem] md:text-[16rem] font-light text-slate-50 leading-none select-none pointer-events-none">
              {service.number}
            </div>

            <div className="relative z-10 space-y-8">
              {/* Title */}
              <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-slate-950 tracking-tight leading-[1.1] max-w-lg">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light max-w-xl">
                {service.description}
              </p>

              {/* Tabs */}
              <div className="relative">
                <div className="flex gap-1 border-b border-slate-200" role="tablist">
                  <button
                    onClick={() => setActiveTab('capabilities')}
                    role="tab"
                    aria-selected={activeTab === 'capabilities'}
                    aria-controls={`capabilities-${service.number}`}
                    id={`tab-capabilities-${service.number}`}
                    className={`relative px-4 sm:px-6 py-3 min-h-[44px] flex items-center text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === 'capabilities'
                        ? 'text-slate-900'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    できること
                    {activeTab === 'capabilities' && (
                      <motion.div
                        layoutId={`tab-indicator-${service.number}`}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        {...({} as any)}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('audience')}
                    role="tab"
                    aria-selected={activeTab === 'audience'}
                    aria-controls={`audience-${service.number}`}
                    id={`tab-audience-${service.number}`}
                    className={`relative px-4 sm:px-6 py-3 min-h-[44px] flex items-center text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === 'audience'
                        ? 'text-slate-900'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    こんな方に
                    {activeTab === 'audience' && (
                      <motion.div
                        layoutId={`tab-indicator-${service.number}`}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        {...({} as any)}
                      />
                    )}
                  </button>
                </div>

                {/* Tab Content */}
                <div className="pt-4 sm:pt-6 min-h-[120px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'capabilities' && (
                      <motion.div
                        key="capabilities"
                        initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: isMobile ? 0 : -10 }}
                        transition={{ duration: isMobile ? 0.15 : 0.2, ease: [0.4, 0, 0.2, 1] }}
                        {...({} as any)}
                      >
                        <div
                          id={`capabilities-${service.number}`}
                          role="tabpanel"
                          aria-labelledby={`tab-capabilities-${service.number}`}
                          className="space-y-3"
                        >
                          <ul className="space-y-3">
                            {service.capabilities.map((cap, i) => (
                              <li
                                key={i}
                                className="text-sm sm:text-base md:text-base text-slate-600 flex items-start gap-3"
                              >
                                <span className="text-slate-400 mt-1.5 flex-shrink-0">•</span>
                                <span className="leading-relaxed">{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                    {activeTab === 'audience' && (
                      <motion.div
                        key="audience"
                        initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: isMobile ? 0 : -10 }}
                        transition={{ duration: isMobile ? 0.15 : 0.2, ease: [0.4, 0, 0.2, 1] }}
                        {...({} as any)}
                      >
                        <div
                          id={`audience-${service.number}`}
                          role="tabpanel"
                          aria-labelledby={`tab-audience-${service.number}`}
                          className="space-y-3"
                        >
                          <ul className="space-y-3">
                            {service.targetAudience.map((target, i) => (
                              <li
                                key={i}
                                className="text-sm sm:text-base md:text-base text-slate-600 flex items-start gap-3"
                              >
                                <span className="text-slate-400 mt-1.5 flex-shrink-0">•</span>
                                <span className="leading-relaxed">{target}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Elegant Divider */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mt-12"
              aria-hidden="true"
              {...({} as any)}
            />
          </motion.div>
        </motion.div>

        {/* Image Block - スマホで上部、タブレット以上でサイドに */}
        <motion.div
          ref={imageRef}
          initial={{ x: isMobile ? 0 : (isLeft ? 60 : -60), opacity: isMobile ? 1 : 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: isMobile ? '0px' : '-100px' }}
          transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setAnimationsComplete(true)}
          className={`w-full md:w-80 lg:w-96 aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:h-auto bg-gradient-to-br ${service.bgGradient} relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 border border-slate-200/50 hover:border-slate-300`}
          style={{ willChange: animationsComplete ? 'auto' : 'transform, opacity' }}
          {...({} as any)}
        >
          <ImageBlock service={service} isMobile={isMobile} className="absolute inset-0 w-full h-full" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-16 md:py-32"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-28"
          {...({} as any)}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-slate-950 tracking-tight">
            サービス
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '100px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-6"
            aria-hidden="true"
            {...({} as any)}
          />
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal tracking-[0.08em] uppercase max-w-2xl mx-auto">
            お客様のニーズに合わせた、高品質なサービスを提供します
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.number} 
              service={service} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
