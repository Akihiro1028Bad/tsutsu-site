/**
 * お知らせ関連のユーティリティ関数（クライアント/サーバー共通）
 * 
 * このファイルは同期関数のみを含みます
 * 非同期関数（API呼び出し）は announcement-server.ts に分離されています
 */

import { Announcement } from '@/lib/types/announcement'
import { ImageField } from '@/lib/types/common'
import { IMAGE_CONFIG, CONTENT_CONFIG } from '@/lib/constants/config'
import { generateExcerpt } from './text'

/**
 * カード表示用にサニタイズされたお知らせデータ
 */
export interface AnnouncementCardItem {
  id: string
  title: string
  href: string
  publishedAt: string
  categoryName: string
  imageUrl: string | null
  excerpt?: string
}

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


/**
 * microCMSの画像URLを最適化します
 * microCMSの画像APIパラメータを使用して、画像のサイズ、フォーマット、品質を最適化
 * 
 * @param imageUrl - microCMSの画像URL
 * @param options - 最適化オプション
 * @param options.width - 画像の幅（ピクセル）
 * @param options.height - 画像の高さ（ピクセル）
 * @param options.format - 画像フォーマット（'webp' | 'jpg' | 'png'）
 * @param options.quality - 画像品質（0-100、デフォルト: 80）
 * @returns 最適化された画像URL
 */
export function getOptimizedImageUrl(
  imageUrl: string,
  options?: {
    width?: number
    height?: number
    format?: 'webp' | 'jpg' | 'png'
    quality?: number
  }
): string {
  if (!imageUrl) return imageUrl

  const params = new URLSearchParams()

  if (options?.width) {
    params.append('w', options.width.toString())
  }
  if (options?.height) {
    params.append('h', options.height.toString())
  }
  if (options?.format) {
    params.append('fm', options.format)
  }
  if (options?.quality !== undefined) {
    params.append('q', options.quality.toString())
  }

  const queryString = params.toString()
  return queryString ? `${imageUrl}?${queryString}` : imageUrl
}

/**
 * カード用の最適化された画像URLを取得します
 * 一覧ページのカード用に最適化された設定を適用
 * 
 * @param read - リード画像フィールド
 * @returns 最適化された画像URL、画像がない場合はnull
 */
export function getCardImageUrl(read?: ImageField): string | null {
  if (!read?.url) return null

  return getOptimizedImageUrl(read.url, {
    width: IMAGE_CONFIG.CARD.width,
    format: IMAGE_CONFIG.CARD.format,
    quality: IMAGE_CONFIG.CARD.quality,
  })
}

/**
 * リード画像用の最適化されたURLを取得します
 * 詳細ページのリード画像用に最適化された設定を適用
 * 
 * @param read - リード画像フィールド
 * @returns 最適化された画像URL、画像がない場合はnull
 */
export function getReadImageUrl(read?: ImageField): string | null {
  if (!read?.url) return null

  return getOptimizedImageUrl(read.url, {
    width: IMAGE_CONFIG.DETAIL.width,
    format: IMAGE_CONFIG.DETAIL.format,
    quality: IMAGE_CONFIG.DETAIL.quality,
  })
}

/**
 * お知らせの抜粋を生成します
 * HTMLコンテンツからプレーンテキストを抽出し、指定文字数で切り詰めます
 * 
 * @param content - HTMLコンテンツ
 * @param maxLength - 最大文字数（デフォルト: CONTENT_CONFIG.EXCERPT_MAX_LENGTH）
 * @returns 抜粋テキスト
 */
export function getExcerpt(
  content: string,
  maxLength: number = CONTENT_CONFIG.EXCERPT_MAX_LENGTH
): string {
  return generateExcerpt(content, maxLength)
}

/**
 * Announcementをカード表示用のサニタイズ済みデータへ変換します
 */
export function toAnnouncementCardItem(announcement: Announcement): AnnouncementCardItem {
  return {
    id: announcement.id,
    title: announcement.title,
    href: `/announcements/${announcement.id}`,
    publishedAt: announcement.publishedAt,
    categoryName: getCategoryName(announcement.category),
    imageUrl: getCardImageUrl(announcement.read),
    excerpt: getExcerpt(announcement.content),
  }
}

/**
 * 複数のお知らせをカード表示用データへまとめて変換します
 */
export function mapAnnouncementsToCardItems(announcements: Announcement[]): AnnouncementCardItem[] {
  return announcements.map(toAnnouncementCardItem)
}

