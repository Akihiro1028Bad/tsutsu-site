/**
 * microCMS共通型定義
 * 
 * 複数のコンテンツタイプで共有される型定義
 */

// microCMSの参照フィールドの型定義
export interface CategoryReference {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
}

// microCMSの画像フィールド型
export interface ImageField {
  url: string
  height?: number
  width?: number
  alt?: string
}

