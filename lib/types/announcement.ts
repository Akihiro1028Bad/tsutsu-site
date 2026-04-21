import { CategoryReference, ImageField } from './common'

// 再エクスポート（後方互換性のため）
export type { CategoryReference, ImageField }

export interface Announcement {
  id: string
  title: string
  content: string
  // categoryは文字列または参照フィールド（オブジェクト）の可能性がある
  category?: '更新情報' | 'テクノロジー' | CategoryReference
  // リード画像（カード表示用）
  read?: ImageField
  /** Raw HTML (may include <style>/<script>) rendered inside a sandboxed iframe. */
  embedHtml?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

export interface AnnouncementListResponse {
  contents: Announcement[]
  totalCount: number
  offset: number
  limit: number
}

