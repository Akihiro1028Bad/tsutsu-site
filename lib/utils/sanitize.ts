/**
 * HTMLコンテンツのサニタイズユーティリティ
 * 
 * XSS攻撃を防ぐため、microCMSのリッチエディタコンテンツをサニタイズします
 */

import sanitizeHtmlLib from 'sanitize-html'
import { connection } from 'next/server'

/**
 * HTMLコンテンツをサニタイズします
 * 
 * @param html - サニタイズするHTMLコンテンツ
 * @returns サニタイズされたHTMLコンテンツ
 */
export async function sanitizeHtml(html: string): Promise<string> {
  // Next.js 16以降では Server Component 内で new Date() を使用する前に
  // 動的データソースへアクセスする必要があるため、connection() を呼び出し
  // リクエストコンテキストにバインドして静的プリレンダー回避を明示します。
  await connection()

  const sanitized = sanitizeHtmlLib(html, {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'u', 's',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
      'a', 'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'hr', 'div', 'span'
    ],
    allowedAttributes: {
      '*': [
        'class',
        'id',
        'style',
        'title',
        'tabindex',
        'data-filename',
        'datetime',
        'dateTime',
      ],
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height'],
      table: ['width'],
      th: ['width'],
      td: ['width'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    selfClosing: ['img', 'hr', 'br'],
    enforceHtmlBoundary: true,
  })

  // <p>タグ内の余分な空白行を削除
  const normalized = removeExtraWhitespaceInParagraphs(sanitized)

  // target="_blank"のリンクにrel="noopener noreferrer"を自動付与
  return addSecureRelToLinks(normalized)
}

/**
 * <p>タグ内の余分な空白行を削除
 * 
 * @param html - HTML文字列
 * @returns 余分な空白行が削除されたHTML文字列
 */
function removeExtraWhitespaceInParagraphs(html: string): string {
  return html.replace(/<p([^>]*)>([\s\S]*?)<\/p>/gi, (match, attributes, content) => {
    // タグ内のテキスト部分の前後の空白行を削除
    // ただし、<br>タグの前後の空白は保持
    const cleaned = content
      .replace(/^[\s\n\r]+|[\s\n\r]+$/g, '') // 前後の空白を削除
      .replace(/\n\s*\n/g, '\n') // 連続する改行を1つに
    return `<p${attributes}>${cleaned}</p>`
  })
}

/**
 * target="_blank"のリンクにrel="noopener noreferrer"を追加
 * 
 * @param html - HTML文字列
 * @returns セキュアなrel属性が追加されたHTML文字列
 */
function addSecureRelToLinks(html: string): string {
  // target="_blank"を持つ<a>タグを検出
  // 既にrel属性がある場合とない場合の両方に対応
  return html.replace(
    /<a\s+([^>]*\s+)?target=["']_blank["']([^>]*)>/gi,
    (match, before, after) => {
      // 既にrel属性があるかチェック
      const hasRel = /rel=["'][^"']*["']/i.test(match)
      
      if (hasRel) {
        // 既にrel属性がある場合、noopener noreferrerを追加（重複を避ける）
        return match.replace(
          /rel=["']([^"']*)["']/i,
          (relMatch, relValue) => {
            const relParts = relValue.split(/\s+/)
            const secureRelParts = ['noopener', 'noreferrer']
            
            // 既存のrel値にnoopenerとnoreferrerが含まれていない場合のみ追加
            const newRelParts = [...relParts]
            secureRelParts.forEach(secureRel => {
              if (!newRelParts.includes(secureRel)) {
                newRelParts.push(secureRel)
              }
            })
            
            return `rel="${newRelParts.join(' ')}"`
          }
        )
      } else {
        // rel属性がない場合、追加
        return match.replace(/>$/, ' rel="noopener noreferrer">')
      }
    }
  )
}

