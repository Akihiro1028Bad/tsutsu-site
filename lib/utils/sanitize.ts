/**
 * HTMLコンテンツのサニタイズユーティリティ
 * 
 * XSS攻撃を防ぐため、microCMSのリッチエディタコンテンツをサニタイズします
 */

import sanitizeHtmlLib from 'sanitize-html'
import { connection } from 'next/server'

/**
 * tsutsu-site ブログで許可するエディトリアル装飾クラスのホワイトリスト。
 * home.css 側の定義と 1:1 対応。ここに載っていないクラスは sanitize で除去される。
 *
 * 採用根拠: ai-secretary/.claude/agents/blog-writer.md（記事執筆エージェント仕様）。
 */
const ALLOWED_DECORATION_CLASSES = new Set<string>([
  // Editorial core
  'lead', 'tldr', 'key', 'pullquote', 'postscript', 'note', 'aside', 'warn',
  // Structural
  'step', 'stat', 'timeline', 'divider', 'update', 'section-label',
  // Tech-specific
  'terminal', 'diagram',
  // Editorial additions (new)
  'definition', 'spec', 'compare', 'caption',
  // Inline
  'bouten',
])

/**
 * コードブロック / シンタックスハイライト用のクラス（hljs / language-xxx / filename等）を
 * 許可するためのプレフィックス群。
 */
const ALLOWED_CLASS_PREFIXES = [
  'hljs', 'language-', 'lang-', 'token', 'article-',
] as const

function isAllowedClass(cls: string): boolean {
  if (ALLOWED_DECORATION_CLASSES.has(cls)) return true
  return ALLOWED_CLASS_PREFIXES.some((p) => cls === p || cls.startsWith(p))
}

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
        'data-date',
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
    transformTags: {
      '*': (tagName, attribs) => {
        const original = attribs.class
        if (typeof original !== 'string' || original.length === 0) {
          return { tagName, attribs }
        }
        const filtered = original
          .split(/\s+/)
          .filter((cls) => cls.length > 0 && isAllowedClass(cls))
          .join(' ')
        const next = { ...attribs }
        if (filtered.length === 0) {
          delete next.class
        } else {
          next.class = filtered
        }
        return { tagName, attribs: next }
      },
    },
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

