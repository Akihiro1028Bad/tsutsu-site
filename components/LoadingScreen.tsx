'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  const isLoadingRef = useRef(true)
  const isCompletedRef = useRef(false)

  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null
    let loadTimeout: NodeJS.Timeout | null = null
    let fallbackTimeout: NodeJS.Timeout | null = null
    let fadeOutTimeout: NodeJS.Timeout | null = null

    const completeLoading = () => {
      // 既に完了している場合は何もしない
      if (isCompletedRef.current) return
      isCompletedRef.current = true
      
      // プログレスを100%に設定
      setProgress(100)
      
      // すべてのタイマーをクリア
      if (progressInterval) clearInterval(progressInterval)
      if (loadTimeout) clearTimeout(loadTimeout)
      if (fallbackTimeout) clearTimeout(fallbackTimeout)
      
      // 少し遅延を入れてからフェードアウト開始（アニメーションが確実に完了するように）
      fadeOutTimeout = setTimeout(() => {
        setIsLoading(false)
        isLoadingRef.current = false
      }, 100)
    }

    // プログレスバーのアニメーション（視覚的フィードバック）
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        // 90%まで段階的に進める（実際の読み込み完了を待つ）
        if (prev >= 90) {
          return 90
        }
        // ランダムな増分で自然な動きを演出
        return prev + Math.random() * 10 + 5
      })
    }, 150)

    // ハイドレーション完了を検知
    const checkHydration = () => {
      // 既にローディングが完了している場合は何もしない
      if (isCompletedRef.current) return
      
      // Reactのハイドレーションが完了しているかチェック
      // Next.jsでは、すべてのコンポーネントがマウントされるまで待つ
      if (typeof window !== 'undefined') {
        // requestAnimationFrameを使用して、次のフレームまで待つ
        // これにより、すべてのReactコンポーネントのレンダリングが完了する
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // 既にローディングが完了している場合は何もしない
            if (isCompletedRef.current) return
            
            // さらに少し待って、すべてのアニメーションが開始されるのを確認
            if (loadTimeout) clearTimeout(loadTimeout)
            loadTimeout = setTimeout(() => {
              completeLoading()
            }, 300)
          })
        })
      }
    }

    // 初期状態のチェック
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        // すでに読み込み完了している場合
        checkHydration()
      } else {
        // DOMContentLoadedを待つ
        document.addEventListener('DOMContentLoaded', checkHydration, { once: true })
        
        // window.loadも待つ（画像やその他のリソース）
        window.addEventListener('load', checkHydration, { once: true })
      }
    }

    // フォールバック: 最大2.5秒後に強制的にローディングを終了
    // （ユーザー体験を損なわないように）
    fallbackTimeout = setTimeout(() => {
      completeLoading()
    }, 2500)

    return () => {
      if (progressInterval) clearInterval(progressInterval)
      if (loadTimeout) clearTimeout(loadTimeout)
      if (fallbackTimeout) clearTimeout(fallbackTimeout)
      if (fadeOutTimeout) clearTimeout(fadeOutTimeout)
      if (typeof window !== 'undefined') {
        document.removeEventListener('DOMContentLoaded', checkHydration)
        window.removeEventListener('load', checkHydration)
      }
    }
  }, [])

  const particles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
          aria-label="読み込み中"
          aria-live="polite"
        >
          <div className="w-full max-w-sm px-8 flex flex-col items-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* 中央のコア */}
              <motion.div
                className="absolute w-8 h-8 bg-slate-950 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* パーティクル */}
              {particles.map((i) => {
                const angle = (i / particles.length) * 360
                const radius = 40
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-slate-950 rounded-full"
                    initial={{ x: 0, y: 0, scale: 0 }}
                    animate={{
                      x: [0, x, x * 1.5],
                      y: [0, y, y * 1.5],
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: 'easeOut',
                    }}
                  />
                )
              })}
            </div>
            
            {/* サブテキスト - ミニマルなタイポグラフィ */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-8 text-center"
            >
              <p className="text-[10px] text-slate-300 tracking-[0.15em] uppercase font-light">
                Loading
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

