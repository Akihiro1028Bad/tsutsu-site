/**
 * HTMLコンテンツからコードブロックを抽出し、処理可能な形式に変換
 * 
 * 機能:
 * - data-filename属性を持つdivを検出（microCMS形式）
 * - .code-blockクラスを持つdivも検出（従来形式との互換性）
 * - コードブロックを抽出してShikiで処理
 * - 処理済みコードブロックを元のHTMLに再挿入
 */

import { highlightCode } from './code-highlight'

export interface CodeBlock {
  id: string
  code: string
  language?: string
  filename?: string
  originalHtml: string
}

/**
 * HTMLからコードブロックを抽出
 * 
 * microCMSの形式:
 * <div data-filename="greeting.js">
 *   <pre>
 *     <code class="language-javascript">const greeting = "Hello microCMS!";\nconsole.log(greeting);</code>
 *   </pre>
 * </div>
 */
export function extractCodeBlocks(html: string): CodeBlock[] {
  const codeBlocks: CodeBlock[] = []
  
  // microCMS形式: data-filename属性を持つdivを検出
  // または従来形式: .code-blockクラスを持つdivを検出
  const codeBlockRegex = /<div[^>]*(?:data-filename="[^"]*"|class="[^"]*code-block[^"]*")[^>]*>([\s\S]*?)<\/div>/gi
  
  let match
  let blockIndex = 0
  
  while ((match = codeBlockRegex.exec(html)) !== null) {
    const blockHtml = match[0]
    const blockContent = match[1]
    
    // ファイル名を抽出
    // 1. data-filename属性から取得（microCMS形式）
    // 2. .code-filenameクラスから取得（従来形式）
    let filename: string | undefined
    const dataFilenameMatch = blockHtml.match(/data-filename="([^"]*)"/i)
    if (dataFilenameMatch) {
      filename = dataFilenameMatch[1].trim()
    } else {
      const filenameMatch = blockContent.match(/<div[^>]*class="[^"]*code-filename[^"]*"[^>]*>([^<]+)<\/div>/i)
      if (filenameMatch) {
        filename = filenameMatch[1].trim()
      }
    }
    
    // <pre><code>からコードを抽出
    const codeMatch = blockContent.match(/<pre[^>]*>[\s\S]*?<code[^>]*>([\s\S]*?)<\/code>[\s\S]*?<\/pre>/i)
    
    if (codeMatch) {
      let code = codeMatch[1]
      
      // HTMLエンティティをデコード
      code = decodeHtmlEntities(code)
      
      // \nを改行に変換（microCMSでは\nがエスケープされた文字列として含まれる）
      code = code.replace(/\\n/g, '\n')
      
      // 言語を抽出
      // 1. class="language-xxx"から取得
      // 2. data-lang="xxx"から取得
      // 3. lang="xxx"から取得
      const langMatch = blockContent.match(/class="[^"]*language-([^"\s]+)/i) ||
                       blockContent.match(/data-lang="([^"]+)"/i) ||
                       blockContent.match(/lang="([^"]+)"/i)
      const language = langMatch ? langMatch[1] : undefined
      
      codeBlocks.push({
        id: `code-block-${blockIndex++}`,
        code,
        language,
        filename,
        originalHtml: blockHtml,
      })
    }
  }
  
  return codeBlocks
}

/**
 * HTMLコンテンツを処理し、コードブロックをハイライトして再挿入
 * 
 * @param html - 処理するHTMLコンテンツ
 * @param theme - テーマ（'dark' | 'light'、デフォルト: 'dark'）
 * @returns 処理済みHTML文字列
 */
export async function processHtmlWithCodeBlocks(
  html: string,
  theme: 'dark' | 'light' = 'dark'
): Promise<string> {
  const codeBlocks = extractCodeBlocks(html)
  
  if (codeBlocks.length === 0) {
    return html
  }
  
  // すべてのコードブロックを並列でハイライト処理
  const highlightedBlocks = await Promise.all(
    codeBlocks.map(async (block) => {
      const highlightedHtml = await highlightCode(block.code, block.language, theme)
      return {
        ...block,
        highlightedHtml,
      }
    })
  )
  
  // 元のHTML内のコードブロックをハイライト済みHTMLで置き換え
  // 注意: 同じHTMLブロックが複数回出現する可能性があるため、
  // 最初に見つかったものから順に置き換える
  let processedHtml = html
  
  for (const block of highlightedBlocks) {
    // ハイライト済みHTMLをラップして、ファイル名と統合
    const replacementHtml = wrapHighlightedCode(block.highlightedHtml, block.filename)
    
    // 元のHTMLブロックを最初の1つだけ置き換え（複数回出現する場合の対策）
    processedHtml = processedHtml.replace(block.originalHtml, replacementHtml)
  }
  
  return processedHtml
}

/**
 * ハイライト済みコードをファイル名付きでラップ
 */
function wrapHighlightedCode(highlightedHtml: string, filename?: string): string {
  // Shikiの出力は <pre><code>...</code></pre> の形式
  // これを .code-block と .code-filename でラップ
  
  let wrapped = '<div class="code-block">'
  
  if (filename) {
    wrapped += `<div class="code-filename">${escapeHtml(filename)}</div>`
  }
  
  // ハイライト済みHTMLをそのまま挿入
  wrapped += highlightedHtml
  wrapped += '</div>'
  
  return wrapped
}

/**
 * HTMLエンティティをデコード
 * 
 * 数値エンティティ（&#123;、&#x7B;）にも対応
 */
function decodeHtmlEntities(text: string): string {
  // 基本的なエンティティ
  const entities: Record<string, string> = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
  }
  
  return text
    // 数値エンティティ（10進数）をデコード: &#123;
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
    // 数値エンティティ（16進数）をデコード: &#x7B;
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    // 名前付きエンティティをデコード
    .replace(/&[#\w]+;/g, (entity) => {
      return entities[entity] || entity
    })
}

/**
 * HTMLをエスケープ
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  
  return text.replace(/[&<>"']/g, (char) => map[char] || char)
}

