/**
 * Client Component: インタラクティブ機能
 * 
 * 機能:
 * - コピーボタン
 * - 言語バッジ表示（オプション）
 */

'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  code: string
}

/**
 * コードブロックのコピーボタン
 */
export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="code-block-copy-button"
      aria-label="コードをコピー"
      type="button"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>コピーしました</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>コピー</span>
        </>
      )}
    </button>
  )
}

interface LanguageBadgeProps {
  language?: string
}

/**
 * 言語バッジ（オプション機能）
 */
export function LanguageBadge({ language }: LanguageBadgeProps) {
  if (!language || language === 'text') {
    return null
  }

  return (
    <span className="code-block-language-badge">
      {language}
    </span>
  )
}

