/**
 * Client Component: プローズコンテンツのラッパー
 * 
 * 機能:
 * - HTMLコンテンツを表示
 * - コードブロックにコピーボタンを追加
 */

'use client'

import { useEffect, useRef } from 'react'

interface ProseContentProps {
  html: string
  className?: string
}

/**
 * プローズコンテンツコンポーネント
 * 
 * HTMLコンテンツを表示し、コードブロックにコピーボタンを動的に追加します。
 */
export function ProseContent({ html, className }: ProseContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // .code-blockを検出
    const codeBlocks = containerRef.current.querySelectorAll('.code-block')
    const cleanupFunctions: Array<() => void> = []
    
    codeBlocks.forEach((block) => {
      // 既にコピーボタンが追加されている場合はスキップ
      if (block.querySelector('.code-block-copy-button')) {
        return
      }

      // <pre><code>からコードを抽出
      const codeElement = block.querySelector('pre code')
      if (!codeElement) return

      const code = codeElement.textContent || ''
      
      // コピーボタンを作成
      const button = document.createElement('button')
      button.className = 'code-block-copy-button'
      button.type = 'button'
      button.setAttribute('aria-label', 'コードをコピー')
      
      // アイコンとテキストを追加
      const icon = document.createElement('svg')
      icon.className = 'w-4 h-4'
      icon.setAttribute('fill', 'none')
      icon.setAttribute('stroke', 'currentColor')
      icon.setAttribute('viewBox', '0 0 24 24')
      icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />'
      
      const text = document.createElement('span')
      text.textContent = 'コピー'
      
      button.appendChild(icon)
      button.appendChild(text)
      
      // コピー機能を実装
      let timeoutId: NodeJS.Timeout | null = null
      const handleClick = async () => {
        try {
          await navigator.clipboard.writeText(code)
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />'
          text.textContent = 'コピーしました'
          button.classList.add('copied')
          
          timeoutId = setTimeout(() => {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />'
            text.textContent = 'コピー'
            button.classList.remove('copied')
            timeoutId = null
          }, 2000)
        } catch (error) {
          console.error('Failed to copy code:', error)
        }
      }
      
      button.addEventListener('click', handleClick)
      
      // クリーンアップ関数を登録
      cleanupFunctions.push(() => {
        button.removeEventListener('click', handleClick)
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        button.remove()
      })
      
      // コードブロックに相対位置を設定
      const blockElement = block as HTMLElement
      if (getComputedStyle(blockElement).position === 'static') {
        blockElement.style.position = 'relative'
      }
      
      blockElement.appendChild(button)
    })
    
    // クリーンアップ関数を返す
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup())
    }
  }, [html])

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

