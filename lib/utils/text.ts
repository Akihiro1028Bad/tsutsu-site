/**
 * テキスト処理ユーティリティ
 * 
 * HTMLコンテンツからプレーンテキストを抽出し、切り詰める機能を提供
 * お知らせやブログ記事のカード表示用の抜粋生成に使用
 */

/**
 * HTMLコンテンツからプレーンテキストを抽出します
 * 
 * 処理内容:
 * - HTMLタグを除去
 * - HTMLエンティティをデコード
 * - 連続する空白文字を1つのスペースに正規化
 * - 前後の空白をトリム
 * 
 * @param html - HTML文字列
 * @returns プレーンテキスト
 */
export function extractPlainText(html: string): string {
  if (!html || typeof html !== 'string') {
    return ''
  }

  let text = html
    // HTMLタグを除去
    .replace(/<[^>]*>/g, '')
    // HTMLエンティティをデコード
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    // 数値エンティティ（10進数）をデコード: &#123;
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
    // 数値エンティティ（16進数）をデコード: &#x7B;
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    // 連続する空白文字（スペース、タブ、改行など）を1つのスペースに正規化
    .replace(/\s+/g, ' ')
    // 前後の空白をトリム
    .trim()

  return text
}

/**
 * テキストを指定文字数で切り詰めます
 * 
 * 日本語対応:
 * - 全角文字も1文字としてカウント
 * - 切り詰め位置は文字数で判定（単語境界は考慮しない）
 * 
 * @param text - 切り詰めるテキスト
 * @param maxLength - 最大文字数
 * @param suffix - 末尾に付ける文字列（デフォルト: '...'）
 * @returns 切り詰められたテキスト
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (!text || typeof text !== 'string') {
    return ''
  }

  if (maxLength <= 0) {
    return ''
  }

  // テキストが最大文字数以下の場合はそのまま返す
  if (text.length <= maxLength) {
    return text
  }

  // 最大文字数で切り詰め、末尾にsuffixを追加
  return text.slice(0, maxLength) + suffix
}

/**
 * HTMLコンテンツから抜粋を生成します
 * 
 * 処理の流れ:
 * 1. HTMLからプレーンテキストを抽出
 * 2. 指定文字数で切り詰め
 * 
 * @param html - HTML文字列
 * @param maxLength - 最大文字数（デフォルト: 100）
 * @returns 抜粋テキスト
 */
export function generateExcerpt(
  html: string,
  maxLength: number = 100
): string {
  if (!html || typeof html !== 'string') {
    return ''
  }

  // HTMLからプレーンテキストを抽出
  const plainText = extractPlainText(html)

  // 空の場合は空文字列を返す
  if (!plainText) {
    return ''
  }

  // 指定文字数で切り詰め
  return truncateText(plainText, maxLength)
}

/**
 * HTMLコンテンツからメタデータ用の説明文を生成します
 * 
 * 処理の流れ:
 * 1. HTMLからプレーンテキストを抽出
 * 2. 指定文字数で切り詰め（文の途中で切れないように調整）
 * 
 * 特徴:
 * - 文の途中で切れないように、最後の単語が途中で切れている場合は削除
 * - 切り詰められた場合は末尾に'...'を追加
 * 
 * @param html - HTML文字列
 * @param maxLength - 最大文字数（デフォルト: 160）
 * @returns メタデータ用の説明文
 */
export function generateMetaDescription(
  html: string,
  maxLength: number = 160
): string {
  if (!html || typeof html !== 'string') {
    return ''
  }

  // HTMLからプレーンテキストを抽出
  const plainText = extractPlainText(html)

  // 空の場合は空文字列を返す
  if (!plainText) {
    return ''
  }

  // テキストが最大文字数以下の場合はそのまま返す
  if (plainText.length <= maxLength) {
    return plainText
  }

  // 最大文字数で切り詰め
  const truncated = plainText.slice(0, maxLength)
  
  // 文の途中で切れないように、最後の単語が途中で切れている場合は削除
  // 空白文字で区切られた単語の境界で切り詰める
  const trimmed = truncated.replace(/\s+\S*$/, '')
  
  // 末尾に'...'を追加
  return trimmed + '...'
}

