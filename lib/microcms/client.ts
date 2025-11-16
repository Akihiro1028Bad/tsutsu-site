/**
 * microCMS API クライアント
 * 
 * Next.js 16のCache Componentsモードに対応した、自前実装のmicroCMS APIクライアント
 * microCMS SDKのデフォルト動作による問題を回避するため、fetch APIを直接使用
 * 
 * 特徴:
 * - 型安全性: TypeScriptで厳密な型定義
 * - キャッシュ制御: cache: 'no-store'で常に最新データを取得
 * - エラーハンドリング: 詳細なエラー情報を提供
 * - Next.js 16対応: 時間依存処理のエラーを回避
 */

import type { QueryParams, ListResponse } from './types'
import {
  MicroCMSApiError,
  MicroCMSNetworkError,
  MicroCMSUnknownError,
} from './errors'
import { buildQueryString, buildBaseUrl, buildContentUrl } from './utils'

/**
 * 環境変数の検証
 * 必要な環境変数が設定されていない場合はエラーを投げる
 */
function validateEnvironment(): {
  serviceDomain: string
  apiKey: string
} {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
  const apiKey = process.env.MICROCMS_API_KEY

  if (!serviceDomain) {
    throw new Error(
      'MICROCMS_SERVICE_DOMAIN is not set. Please set it in your .env.local file.'
    )
  }

  if (!apiKey) {
    throw new Error(
      'MICROCMS_API_KEY is not set. Please set it in your .env.local file.'
    )
  }

  return { serviceDomain, apiKey }
}

/**
 * fetch APIのエラーレスポンスを処理
 * 
 * @param response fetch APIのResponseオブジェクト
 * @returns エラーメッセージを含むオブジェクト
 */
async function handleErrorResponse(
  response: Response
): Promise<{ message: string; errorMessage?: string }> {
  let errorMessage: string | undefined

  try {
    // エラーレスポンスのJSONを取得
    const errorData = await response.json()
    if (errorData && typeof errorData.message === 'string') {
      errorMessage = errorData.message
    }
  } catch {
    // JSONのパースに失敗した場合は、ステータステキストを使用
    errorMessage = response.statusText || 'Unknown error'
  }

  // デフォルトのエラーメッセージを生成
  const message = `microCMS API error: ${response.status} ${response.statusText}`

  return { message, errorMessage }
}

/**
 * fetch APIのリクエストを実行
 * Next.js 16のCache Componentsモードに対応するため、cache: 'no-store'を設定
 * 
 * @param url リクエストURL
 * @param apiKey APIキー
 * @returns fetch APIのResponseオブジェクト
 */
async function fetchWithAuth(url: string, apiKey: string): Promise<Response> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-MICROCMS-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      // Next.js 16のCache Componentsモードに対応
      // cache: 'no-store'により、常に最新のデータを取得
      // これにより、時間依存処理のエラーを回避し、リアルタイム性を確保
      cache: 'no-store',
    })

    return response
  } catch (error) {
    // ネットワークエラー（接続エラー、タイムアウトなど）
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new MicroCMSNetworkError(
        'ネットワークエラーが発生しました。接続を確認してください。',
        error
      )
    }

    // その他の予期しないエラー
    throw new MicroCMSUnknownError(
      '予期しないエラーが発生しました。',
      error
    )
  }
}

/**
 * コンテンツ一覧を取得
 * 
 * @param endpoint エンドポイント名（例: 'announcements'）
 * @param queries クエリパラメータ（オプション）
 * @returns コンテンツ一覧のレスポンス
 * @throws MicroCMSApiError APIエラー
 * @throws MicroCMSNetworkError ネットワークエラー
 * @throws MicroCMSUnknownError その他のエラー
 * 
 * @example
 * ```typescript
 * const data = await getList<Announcement>('announcements', {
 *   filters: 'publishedAt[exists]',
 *   orders: '-publishedAt',
 *   limit: 100,
 * })
 * ```
 */
export async function getList<T>(
  endpoint: string,
  queries?: QueryParams
): Promise<ListResponse<T>> {
  const { serviceDomain, apiKey } = validateEnvironment()

  // ベースURLを構築
  const baseUrl = buildBaseUrl(serviceDomain, endpoint)

  // クエリパラメータを構築
  const queryString = queries ? buildQueryString(queries) : ''
  const url = `${baseUrl}${queryString}`

  // APIリクエストを実行
  const response = await fetchWithAuth(url, apiKey)

  // エラーレスポンスを処理
  if (!response.ok) {
    const { message, errorMessage } = await handleErrorResponse(response)
    throw new MicroCMSApiError(
      message,
      response.status,
      errorMessage,
      response
    )
  }

  // レスポンスをJSONとしてパース
  try {
    const data = await response.json()
    return data as ListResponse<T>
  } catch (error) {
    throw new MicroCMSUnknownError(
      'レスポンスのパースに失敗しました。',
      error
    )
  }
}

/**
 * コンテンツ詳細を取得
 * 
 * @param endpoint エンドポイント名（例: 'announcements'）
 * @param contentId コンテンツID
 * @param queries クエリパラメータ（オプション）
 * @returns コンテンツ詳細データ
 * @throws MicroCMSApiError APIエラー（404など）
 * @throws MicroCMSNetworkError ネットワークエラー
 * @throws MicroCMSUnknownError その他のエラー
 * 
 * @example
 * ```typescript
 * const announcement = await getDetail<Announcement>('announcements', 'content-id')
 * ```
 */
export async function getDetail<T>(
  endpoint: string,
  contentId: string,
  queries?: QueryParams
): Promise<T> {
  const { serviceDomain, apiKey } = validateEnvironment()

  // コンテンツ詳細URLを構築
  const baseUrl = buildContentUrl(serviceDomain, endpoint, contentId)

  // クエリパラメータを構築
  const queryString = queries ? buildQueryString(queries) : ''
  const url = `${baseUrl}${queryString}`

  // APIリクエストを実行
  const response = await fetchWithAuth(url, apiKey)

  // エラーレスポンスを処理
  if (!response.ok) {
    const { message, errorMessage } = await handleErrorResponse(response)
    throw new MicroCMSApiError(
      message,
      response.status,
      errorMessage,
      response
    )
  }

  // レスポンスをJSONとしてパース
  try {
    const data = await response.json()
    return data as T
  } catch (error) {
    throw new MicroCMSUnknownError(
      'レスポンスのパースに失敗しました。',
      error
    )
  }
}
