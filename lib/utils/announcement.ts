import { Announcement, CategoryReference, AnnouncementListResponse } from '@/lib/types/announcement'
import { ImageField } from '@/lib/types/common'
import { getList } from '@/lib/microcms/client'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import { IMAGE_CONFIG, CONTENT_CONFIG } from '@/lib/constants/config'
import { generateExcerpt } from './text'

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
 * 最新のお知らせを取得します
 * トップページのお知らせセクション用に、公開済みの最新お知らせを取得
 * 
 * @param limit - 取得するお知らせ数（デフォルト: CONTENT_CONFIG.LATEST_POSTS_LIMIT）
 * @returns お知らせの配列（エラー時は空配列）
 */
export async function getLatestAnnouncements(limit: number = CONTENT_CONFIG.LATEST_POSTS_LIMIT): Promise<Announcement[]> {
  let data: AnnouncementListResponse

  try {
    data = await getList<Announcement>('announcements', {
      filters: 'publishedAt[exists]',
      orders: '-publishedAt',
      limit,
    })
  } catch (error) {
    const errorResult = handleMicroCMSError<AnnouncementListResponse>(error, {
      onBuildTimeNetworkError: () => {
        console.warn('ビルド時にお知らせの取得に失敗しました。空データを返します。')
      },
      onRuntimeError: () => {
        console.error('お知らせの取得に失敗しました:', error)
      },
    })

    if (errorResult.shouldThrow) {
      // ランタイムエラーの場合は空配列を返す
      return []
    }

    // ビルド時のネットワークエラーの場合は空データを返す
    data = {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit,
    }
  }

  return data.contents
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

