/**
 * microCMS API ユーティリティ関数
 * 
 * クエリパラメータの構築など、APIリクエストに必要なユーティリティ関数
 */

import type { QueryParams } from './types'

/**
 * クエリパラメータをURLクエリ文字列に変換
 * 
 * @param params クエリパラメータオブジェクト
 * @returns URLクエリ文字列（例: '?limit=10&orders=-publishedAt'）
 */
export function buildQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams()

  // 各パラメータをURLSearchParamsに追加
  if (params.limit !== undefined) {
    searchParams.append('limit', params.limit.toString())
  }
  if (params.offset !== undefined) {
    searchParams.append('offset', params.offset.toString())
  }
  if (params.orders) {
    searchParams.append('orders', params.orders)
  }
  if (params.filters) {
    searchParams.append('filters', params.filters)
  }
  if (params.q) {
    searchParams.append('q', params.q)
  }
  if (params.fields) {
    searchParams.append('fields', params.fields)
  }
  if (params.ids) {
    searchParams.append('ids', params.ids)
  }
  if (params.draftKey) {
    searchParams.append('draftKey', params.draftKey)
  }
  if (params.depth !== undefined) {
    searchParams.append('depth', params.depth.toString())
  }
  if (params.richEditorFormat) {
    searchParams.append('richEditorFormat', params.richEditorFormat)
  }

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

/**
 * microCMS APIのベースURLを構築
 * 
 * @param serviceDomain サービスドメイン
 * @param endpoint エンドポイント名
 * @returns ベースURL（例: 'https://example.microcms.io/api/v1/announcements'）
 */
export function buildBaseUrl(serviceDomain: string, endpoint: string): string {
  return `https://${serviceDomain}.microcms.io/api/v1/${endpoint}`
}

/**
 * コンテンツ詳細取得用のURLを構築
 * 
 * @param serviceDomain サービスドメイン
 * @param endpoint エンドポイント名
 * @param contentId コンテンツID
 * @returns コンテンツ詳細URL
 */
export function buildContentUrl(
  serviceDomain: string,
  endpoint: string,
  contentId: string
): string {
  return `${buildBaseUrl(serviceDomain, endpoint)}/${contentId}`
}

