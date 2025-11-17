import { BlogPost, BlogListResponse, ImageField } from '@/lib/types/blog'
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
 * ブログ記事のカテゴリ名を取得します
 * categoryがオブジェクト（参照フィールド）の場合はnameプロパティを取得し、
 * 文字列の場合はそのまま返します
 * @param category - カテゴリ（文字列または参照フィールド）
 * @returns カテゴリ名、存在しない場合は空文字列
 */
export function getCategoryName(
  category: BlogPost['category']
): string {
  if (!category) return ''
  if (typeof category === 'string') return category
  return category.name
}

/**
 * 最新のブログ記事を取得します
 * トップページのブログセクション用に、公開済みの最新記事を取得
 * 
 * @param limit - 取得する記事数（デフォルト: CONTENT_CONFIG.LATEST_POSTS_LIMIT）
 * @returns ブログ記事の配列（エラー時は空配列）
 */
export async function getLatestBlogPosts(limit: number = CONTENT_CONFIG.LATEST_POSTS_LIMIT): Promise<BlogPost[]> {
  let data: BlogListResponse

  try {
    data = await getList<BlogPost>('blog', {
      filters: 'publishedAt[exists]',
      orders: '-publishedAt',
      limit,
    })
  } catch (error) {
    const errorResult = handleMicroCMSError<BlogListResponse>(error, {
      onBuildTimeNetworkError: () => {
        console.warn('ビルド時にブログ記事の取得に失敗しました。空データを返します。')
      },
      onRuntimeError: () => {
        console.error('ブログ記事の取得に失敗しました:', error)
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
 * ヒーロー画像用の最適化されたURLを取得します
 * 詳細ページのヒーロー画像用に最適化された設定を適用
 * 
 * @param hero - ヒーロー画像フィールド
 * @returns 最適化された画像URL、画像がない場合はnull
 */
export function getHeroImageUrl(hero?: ImageField): string | null {
  if (!hero?.url) return null

  return getOptimizedImageUrl(hero.url, {
    width: IMAGE_CONFIG.DETAIL.width,
    format: IMAGE_CONFIG.DETAIL.format,
    quality: IMAGE_CONFIG.DETAIL.quality,
  })
}

/**
 * カード用の最適化された画像URLを取得します
 * 一覧ページのカード用に最適化された設定を適用
 * 
 * @param hero - ヒーロー画像フィールド
 * @returns 最適化された画像URL、画像がない場合はnull
 */
export function getCardImageUrl(hero?: ImageField): string | null {
  if (!hero?.url) return null

  return getOptimizedImageUrl(hero.url, {
    width: IMAGE_CONFIG.CARD.width,
    format: IMAGE_CONFIG.CARD.format,
    quality: IMAGE_CONFIG.CARD.quality,
  })
}

/**
 * ブログ記事の抜粋を生成します
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

