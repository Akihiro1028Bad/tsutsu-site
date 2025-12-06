'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ContentCardData } from './ContentCard'

interface ContentCardDesktopProps {
  content: ContentCardData
  href: string
  imageUrl: string | null
  categoryName: string
  formattedDate: string
}

/**
 * 案4: インタラクティブ + 強化アニメーション（PC用）
 * 
 * Context7ベストプラクティス適用:
 * - Aesthetic-Usability Effect: 視覚的に魅力的なデザイン
 * - Doherty Threshold: アニメーションを400ms以下で応答
 * - Fitts's Law: ホバーエリアを十分に確保
 * - Selective Attention: ホバー時に重要な情報を強調
 * - prefers-reduced-motion: ユーザー設定を尊重
 */
export default function ContentCardDesktop({
  content,
  href,
  imageUrl,
  categoryName,
  formattedDate,
}: ContentCardDesktopProps) {
  // prefers-reduced-motionの検出
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // 古いブラウザ対応
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  // アニメーション設定（reduced-motion時は無効化）
  const animationProps = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        whileInView: {},
        whileHover: {},
      }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        whileHover: {
          y: -4,
          transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        },
      }

  const imageHoverProps = prefersReducedMotion
    ? {}
    : {
        whileHover: {
          scale: 1.08,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        },
      }

  const overlayHoverProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0.3 },
        whileHover: {
          opacity: 0.5,
          transition: {
            duration: 0.3,
          },
        },
      }

  return (
    <Link
      href={href}
      className="block group"
      style={{
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <motion.article
        className="
          bg-white border border-slate-200/40 rounded-xl overflow-hidden
          hover:border-slate-300 hover:shadow-xl
          transition-all duration-300
          h-full flex flex-col
        "
        {...animationProps}
        viewport={prefersReducedMotion ? undefined : { once: true, margin: '-50px' }}
        transition={
          prefersReducedMotion
            ? {}
            : {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1] as const,
              }
        }
      >
        {/* ヒーロー画像 */}
        {imageUrl && (
          <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
            <motion.div
              className="absolute inset-0"
              {...imageHoverProps}
            >
              <Image
                src={imageUrl}
                alt={content.image?.alt || content.title}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                style={{
                  willChange: 'transform',
                }}
              />
            </motion.div>
            {/* グラデーションオーバーレイ（ホバー時に強調） */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
              {...overlayHoverProps}
              aria-hidden="true"
            />
          </div>
        )}

        <div className="p-5 sm:p-6 md:p-8 flex-1 flex flex-col">
          {/* カテゴリと公開日時 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            {/* カテゴリバッジ */}
            {categoryName && (
              <motion.span
                className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-slate-700 to-slate-900 tracking-[0.05em] uppercase rounded-full w-fit"
                {...(prefersReducedMotion
                  ? {}
                  : {
                      whileHover: {
                        scale: 1.05,
                        transition: {
                          duration: 0.2,
                        },
                      },
                    })}
              >
                {categoryName}
              </motion.span>
            )}

            {/* 公開日時 */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-normal">
              <svg
                className="w-3.5 h-3.5 text-slate-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={content.publishedAt}>
                {formattedDate}
              </time>
            </div>
          </div>

          {/* タイトル */}
          <motion.h3
            className="text-lg sm:text-xl md:text-2xl font-light text-slate-950 tracking-tight mb-3 sm:mb-4 leading-snug group-hover:text-slate-700 transition-colors duration-200"
            {...(prefersReducedMotion
              ? {}
              : {
                  whileHover: {
                    transition: {
                      duration: 0.2,
                    },
                  },
                })}
          >
            {content.title}
          </motion.h3>

          {/* 抜粋 */}
          {content.excerpt && (
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed mb-4 flex-1 line-clamp-2 sm:line-clamp-3">
              {content.excerpt}
            </p>
          )}

          {/* CTAボタン（ホバー時に強調） */}
          <div className="flex justify-end mt-auto">
            <motion.span
              className="inline-flex items-center gap-2 text-slate-400 group-hover:text-slate-600 font-medium text-sm sm:text-base transition-colors duration-200"
              {...(prefersReducedMotion
                ? {}
                : {
                    whileHover: {
                      x: 4,
                      transition: {
                        duration: 0.2,
                      },
                    },
                  })}
            >
              続きを読む
              <motion.svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...(prefersReducedMotion
                  ? {}
                  : {
                      whileHover: {
                        x: 4,
                        transition: {
                          duration: 0.2,
                        },
                      },
                    })}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </motion.span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

