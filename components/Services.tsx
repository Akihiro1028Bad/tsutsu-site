'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

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
      '「自分の事業をきちんと形にしたい」',
      '「信頼感のあるサイトを持ちたい」',
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
    ],
    number: '02',
    gradient: 'from-slate-500 via-slate-600 to-slate-700',
    bgGradient: 'from-slate-100 to-slate-200',
    backgroundImage: '/services/web-app-bg.jpg',
  },
  {
    title: '業務改善・自動化（AI/ツール活用）',
    description: 'AIだけに依存するのではなく、現場に合わせて「続けられる形」で改善を行います。小さな一歩から一緒に整えていきます。',
    capabilities: [
      '業務フローの整理・可視化',
      'Notion / Google Workspace / Zapier などの導入・構築',
      '必要に応じた生成AIの活用（FAQ、自動応答、文章整理など）',
    ],
    targetAudience: [
      '「毎日の作業を少しでも楽にしたい」',
      '「まずは相談しながら進めたい」',
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
      '個別の学習プラン作成',
      '実装支援・コードレビュー',
      'ポートフォリオ制作・転職 / 案件獲得の相談',
    ],
    targetAudience: [
      '「一人だと学習が続かない…」',
      '「現場レベルの考え方を身につけたい」',
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
  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      {/* Background Image */}
      {service.backgroundImage && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 group-hover:opacity-[0.5] transition-opacity duration-500 z-0"
          style={{
            backgroundImage: `url(${service.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: isMobile ? 'top center' : 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
            filter: 'saturate(0.4) brightness(0.92)',
          }}
          aria-hidden="true"
          {...({} as any)}
        />
      )}

      {/* Monochrome Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/12 transition-colors duration-500 z-[1]"
        aria-hidden="true"
      />

      {/* Gradient Overlay */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-25 transition-opacity duration-500 z-[1]`}
        style={{
          backgroundSize: '200% 200%',
        }}
        aria-hidden="true"
        {...({} as any)}
      />

      {/* Background Number Badge */}
      <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 text-5xl sm:text-7xl md:text-8xl font-light text-slate-200/40 leading-none select-none pointer-events-none z-[2] ${isMobile ? 'text-4xl sm:text-6xl' : ''}`}>
        {service.number}
      </div>
    </div>
  )
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<TabType>('capabilities')
  
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98])

  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative"
      {...({} as any)}
    >
      {/* アプローチA: スマホで画像を上部に配置 */}
      <div className={`flex flex-col-reverse md:flex-row items-stretch gap-0 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
        {/* Main Content Block */}
        <motion.div
          initial={{ x: isLeft ? -60 : 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full md:w-auto"
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="text-sm sm:text-base md:text-base text-slate-600 flex items-start gap-3"
                                {...({} as any)}
                              >
                                <span className="text-slate-400 mt-1.5 flex-shrink-0">•</span>
                                <span className="leading-relaxed">{cap}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                    {activeTab === 'audience' && (
                      <motion.div
                        key="audience"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="text-sm sm:text-base md:text-base text-slate-600 flex items-start gap-3"
                                {...({} as any)}
                              >
                                <span className="text-slate-400 mt-1.5 flex-shrink-0">•</span>
                                <span className="leading-relaxed">{target}</span>
                              </motion.li>
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
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mt-12"
              aria-hidden="true"
              {...({} as any)}
            />
          </motion.div>
        </motion.div>

        {/* Image Block - スマホで上部、タブレット以上でサイドに */}
        <motion.div
          initial={{ x: isLeft ? 60 : -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full md:w-80 lg:w-96 aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:h-auto bg-gradient-to-br ${service.bgGradient} relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 border border-slate-200/50 hover:border-slate-300`}
          {...({} as any)}
        >
          <ImageBlock service={service} isMobile={true} className="absolute inset-0 w-full h-full" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-12 md:py-32"
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

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
