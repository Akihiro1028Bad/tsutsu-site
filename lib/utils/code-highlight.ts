/**
 * Shikiを使用したシンタックスハイライトユーティリティ
 * 
 * 設計方針:
 * - Server Componentで実行（バンドルサイズ削減）
 * - 高lighterインスタンスをシングルトンで再利用（パフォーマンス最適化）
 * - カスタムテーマ（ダークモード対応）
 */

import { createHighlighter, type Highlighter } from 'shiki'

// 高lighterインスタンスのシングルトン（Server Component用）
let highlighterPromise: Promise<Highlighter> | null = null

/**
 * 高lighterインスタンスを取得（シングルトンパターン）
 * 複数回呼び出されても同じインスタンスを返す
 */
function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: [
        'javascript',
        'typescript',
        'tsx',
        'jsx',
        'json',
        'html',
        'css',
        'scss',
        'bash',
        'shell',
        'python',
        'java',
        'go',
        'rust',
        'php',
        'ruby',
        'sql',
        'yaml',
        'markdown',
        'xml',
        'diff',
        'text',
      ],
    })
  }
  return highlighterPromise
}

/**
 * コードをシンタックスハイライトしてHTMLに変換
 * 
 * Next.js 16対応: 'use cache'ディレクティブを使用してキャッシュ可能にする
 * shiki内部でDate.now()を使用する可能性があるため、キャッシュコンポーネントとして扱う
 * 
 * @param code - ハイライトするコード
 * @param language - 言語（デフォルト: 'text'）
 * @param theme - テーマ（'dark' | 'light'、デフォルト: 'dark'）
 * @returns ハイライト済みHTML文字列
 */
export async function highlightCode(
  code: string,
  language: string = 'text',
  theme: 'dark' | 'light' = 'dark'
): Promise<string> {
  'use cache'
  
  const highlighter = await getHighlighter()
  
  // 言語名を正規化（小文字化、エイリアス対応）
  const normalizedLang = normalizeLanguage(language)
  
  // テーマ名を決定
  const themeName = theme === 'light' ? 'github-light' : 'github-dark'
  
  try {
    const html = highlighter.codeToHtml(code, {
      lang: normalizedLang,
      theme: themeName,
    })
    
    return html
  } catch (error) {
    // 言語がサポートされていない場合は、テキストとして処理
    console.warn(`Language "${normalizedLang}" is not supported, falling back to text`)
    return highlighter.codeToHtml(code, {
      lang: 'text',
      theme: themeName,
    })
  }
}

/**
 * 言語名を正規化
 * microCMSやその他のソースから来る言語名をShikiが認識できる形式に変換
 */
function normalizeLanguage(lang: string): string {
  const normalized = lang.toLowerCase().trim()
  
  // 言語エイリアスのマッピング
  const aliases: Record<string, string> = {
    'js': 'javascript',
    'ts': 'typescript',
    'py': 'python',
    'rb': 'ruby',
    'sh': 'bash',
    'zsh': 'bash',
    'yml': 'yaml',
    'md': 'markdown',
    'vue': 'html', // VueはHTMLとして処理
  }
  
  return aliases[normalized] || normalized
}

