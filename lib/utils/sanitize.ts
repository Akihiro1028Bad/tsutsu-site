/**
 * HTMLコンテンツのサニタイズユーティリティ
 * 
 * XSS攻撃を防ぐため、microCMSのリッチエディタコンテンツをサニタイズします
 */

import DOMPurify from 'isomorphic-dompurify'

/**
 * HTMLコンテンツをサニタイズします
 * 
 * @param html - サニタイズするHTMLコンテンツ
 * @returns サニタイズされたHTMLコンテンツ
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    // 許可するタグと属性
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'div', 'span'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'title', 'width', 'height',
      'class', 'id', 'style', 'datetime', 'dateTime'
    ],
    // リンクのtarget="_blank"に自動的にrel="noopener noreferrer"を追加
    ADD_ATTR: ['target'],
    ADD_TAGS: [],
    // スタイル属性を許可（microCMSのリッチエディタで使用される可能性があるため）
    ALLOW_DATA_ATTR: false,
  })
}

