/**
 * Server Component: ハイライト済みコードブロックを表示
 * 
 * 機能:
 * - シンタックスハイライト済みHTMLを表示
 * - ファイル名表示（.code-filename対応）
 * - コピーボタン（Client Componentを統合）
 */

import { CopyButton } from './CodeBlockClient'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  highlightedHtml: string
}

/**
 * コードブロックコンポーネント（Server Component）
 * 
 * ハイライト済みHTMLを受け取り、ファイル名とコピーボタンと共に表示
 */
export default function CodeBlock({
  code,
  filename,
  highlightedHtml,
}: CodeBlockProps) {
  return (
    <div className="code-block">
      {filename && (
        <div className="code-filename">
          {filename}
        </div>
      )}
      <div className="code-block-content-wrapper">
        <div
          className="code-block-highlighted"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
        <CopyButton code={code} />
      </div>
    </div>
  )
}

