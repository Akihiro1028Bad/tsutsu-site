'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function MouseFollower() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClickable, setIsClickable] = useState(false)

  // Smooth spring animation for cursor position
  const cursorX = useSpring(0, { stiffness: 150, damping: 25 })
  const cursorY = useSpring(0, { stiffness: 150, damping: 25 })
  const ringScale = useSpring(1, { stiffness: 300, damping: 30 })
  const ringOpacity = useSpring(0.4, { stiffness: 200, damping: 25 })
  const innerRingScale = useTransform(ringScale, (scale) => scale * 0.64)

  // Mouse tracking
  useEffect(() => {
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) return

      animationFrameId = requestAnimationFrame(() => {
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
        setIsHovering(true)
        animationFrameId = 0
      })
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    // Element hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('[onclick]') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'

      if (isInteractive) {
        setIsClickable(true)
        ringScale.set(1.5)
        ringOpacity.set(0.7)
      } else {
        setIsClickable(false)
        ringScale.set(1)
        ringOpacity.set(0.4)
      }
    }

    // Initial state
    setIsHovering(true)

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [cursorX, cursorY, ringScale, ringOpacity])

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion || !isHovering) {
    return null
  }

  return (
    <motion.div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9998,
        left: cursorX,
        top: cursorY,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isHovering ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Outer Ring - メインのリング（控えめで洗練されたデザイン） */}
      <motion.div
        style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          width: 52,
          height: 52,
          scale: ringScale,
          opacity: ringOpacity,
          border: '1px solid rgba(148, 163, 184, 0.4)',
          boxShadow: isClickable
            ? '0 0 0 1px rgba(148, 163, 184, 0.2), 0 0 8px rgba(148, 163, 184, 0.1)'
            : 'none',
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { type: 'spring', stiffness: 200, damping: 25 },
        }}
      />

      {/* Inner Ring - クリック可能要素の時のみ表示（より洗練されたデザイン） */}
      {isClickable && (
        <motion.div
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            width: 32,
            height: 32,
            scale: innerRingScale,
            border: '1px solid rgba(148, 163, 184, 0.35)',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.6,
          }}
          transition={{
            opacity: { duration: 0.25, ease: 'easeOut' },
          }}
        />
      )}

      {/* Center Dot - クリック可能要素の時のみ表示（控えめなドット） */}
      {isClickable && (
        <motion.div
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            backgroundColor: 'rgba(100, 116, 139, 0.5)',
            width: 2.5,
            height: 2.5,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.9,
            scale: 1,
          }}
          transition={{
            scale: { type: 'spring', stiffness: 400, damping: 25 },
            opacity: { duration: 0.25, ease: 'easeOut' },
          }}
        />
      )}
    </motion.div>
  )
}

