/**
 * ブログ記事の型定義
 * 
 * microCMSのデフォルトフィールド:
 * - id: string
 * - createdAt: string
 * - updatedAt: string
 * - publishedAt: string
 * - revisedAt: string
 * 
 * カスタムフィールド:
 * - title: string
 * - slug: string
 * - content: string
 * - category?: string | CategoryReference
 * - hero?: ImageField (ヒーロー画像)
 */

import { CategoryReference, ImageField } from './common'

// 再エクスポート（後方互換性のため）
export type { CategoryReference, ImageField }

// ブログ記事の型定義
export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  category?: string | CategoryReference
  hero?: ImageField
  /** Raw HTML (may include <style>/<script>) rendered inside a sandboxed iframe. */
  embedHtml?: string
  // microCMSのデフォルトフィールド
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

// ブログ一覧APIのレスポンス型
export interface BlogListResponse {
  contents: BlogPost[]
  totalCount: number
  offset: number
  limit: number
}

