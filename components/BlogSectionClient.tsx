'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BlogPost } from '@/lib/types/blog'
import BlogList from '@/components/BlogList'

interface BlogSectionClientProps {
  posts: BlogPost[]
}

/**
 * ブログセクションのクライアントコンポーネント
 * アニメーションとインタラクティブな要素を担当
 */
export default function BlogSectionClient({ posts }: BlogSectionClientProps) {
  return (
    <section
      id="blog"
      className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-16 md:py-32"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
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
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-slate-950 tracking-tight">
            ブログ
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '100px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-6"
            aria-hidden="true"
          />
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal tracking-[0.08em] uppercase max-w-2xl mx-auto">
            技術記事やキャリア、ライフスタイルに関する記事
          </p>
        </motion.div>

        {/* Blog List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <BlogList posts={posts} />
        </motion.div>

        {/* CTA - すべて見るリンク */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 sm:px-10 md:px-12 py-3 sm:py-3 md:py-4 min-h-[44px] bg-transparent text-slate-950 rounded-none font-normal tracking-[0.08em] border border-slate-950 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 transition-all duration-500 text-sm sm:text-base uppercase group"
            aria-label="すべてのブログ記事を見る"
          >
            <span>すべての記事を見る</span>
            <span className="text-slate-400 group-hover:text-slate-600 transition-colors text-lg sm:text-base">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

