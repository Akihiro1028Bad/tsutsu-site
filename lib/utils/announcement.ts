import { Announcement, CategoryReference } from '@/lib/types/announcement'

/**
 * 日付文字列を日本語形式にフォーマットします
 * @param dateString - ISO形式の日付文字列
 * @returns フォーマットされた日付文字列（例: "2024年1月1日"）
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * お知らせのカテゴリ名を取得します
 * categoryがオブジェクト（参照フィールド）の場合はnameプロパティを取得し、
 * 文字列の場合はそのまま返します
 * @param category - カテゴリ（文字列または参照フィールド）
 * @returns カテゴリ名、存在しない場合は空文字列
 */
export function getCategoryName(
  category: Announcement['category']
): string {
  if (!category) return ''
  if (typeof category === 'string') return category
  return category.name
}

