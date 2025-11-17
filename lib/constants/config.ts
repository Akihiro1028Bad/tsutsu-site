/**
 * アプリケーション設定定数
 */

// 画像最適化設定
export const IMAGE_CONFIG = {
  // 詳細ページ用画像
  DETAIL: {
    width: 1200,
    quality: 80,
    format: 'webp' as const,
  },
  // カード用画像
  CARD: {
    width: 600,
    quality: 75,
    format: 'webp' as const,
  },
  // OGP画像
  OGP: {
    width: 1200,
    height: 630,
    quality: 85,
    format: 'jpg' as const,
  },
} as const

// コンテンツ取得設定
export const CONTENT_CONFIG = {
  // トップページの最新記事数
  LATEST_POSTS_LIMIT: 6,
  // 一覧ページの最大記事数
  LIST_PAGE_LIMIT: 100,
  // カード表示用の抜粋の最大文字数
  EXCERPT_MAX_LENGTH: 100,
} as const

// メタデータ設定
export const METADATA_CONFIG = {
  // 説明文の最大文字数
  DESCRIPTION_MAX_LENGTH: 160,
} as const

