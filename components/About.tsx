'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section
      id="about"
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
          className="text-center mb-12 md:mb-16"
          {...({} as any)}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-slate-950 tracking-tight">
            プロフィール
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
            代表者について
          </p>
        </motion.div>

        {/* Content - Minimal Split Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
          {...({} as any)}
        >
          <div className="flex flex-col md:flex-row items-stretch gap-0">
            {/* Left Block - Minimal */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-80 lg:w-96 bg-slate-50/30 border-r border-slate-200/40 p-6 sm:p-8 md:p-12 flex flex-col justify-center"
              {...({} as any)}
            >
              {/* Basic Info - Minimal */}
              <div className="relative z-10 w-full space-y-6">
                <div>
                  <dt className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-light">事業内容</dt>
                  <dd className="text-sm text-slate-900 leading-relaxed font-light">
                    Web開発・システム開発支援、エンジニア学習・キャリア支援
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-light">対応エリア</dt>
                  <dd className="text-sm text-slate-900 leading-relaxed font-light">
                    全国（リモート対応可能）
                  </dd>
                </div>
              </div>
            </motion.div>

            {/* Right Block - Minimal */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 bg-white p-6 sm:p-10 md:p-16"
              {...({} as any)}
            >
              <div className="space-y-8 max-w-3xl">
                <div>
                  <div className="mb-2">
                    <span className="text-xs text-slate-400 font-normal tracking-[0.15em] uppercase">tsutsu</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-6xl font-light text-slate-950 tracking-tight leading-[0.95] mb-6">
                    堤　暁寛
                  </h3>
                </div>

                <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light">
                  <p>元消防士のフリーランスエンジニア。</p>
                  <p>4年間の現場経験を経て、独学でプログラミングを学び、3年前にエンジニアへ転身。</p>
                  <p>複数の業務システム・Webアプリケーションの設計・実装・運用を担当し、2025年8月に独立。</p>
                  <p>C# / PHP（Laravel） / JavaScript / React / Next.jsを中心に、フルスタックに開発支援を行っています。</p>
                  <p>また、自身の異業種転身の経験を活かし、未経験者や初学者の学習・キャリアサポートにも力を入れています。</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
