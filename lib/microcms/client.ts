import 'server-only'

/**
 * microCMS API クライアント
 * 
 * Next.js 16のCache Componentsモードに対応した、自前実装のmicroCMS APIクライアント
 * microCMS SDKのデフォルト動作による問題を回避するため、fetch APIを直接使用
 * 
 * 特徴:
 * - 型安全性: TypeScriptで厳密な型定義
 * - キャッシュ制御: Cache Componentsモードに対応した適切なキャッシュ戦略
 * - エラーハンドリング: 詳細なエラー情報を提供
 * - Next.js 16対応: Cache ComponentsモードとReact cacheを活用
 * 
 * 注意: 'use cache'ディレクティブを使用する関数は server-client.ts に分離されています
 * クライアントコンポーネントからも使用可能な基本関数のみを提供します
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
 * 
 * ビルド時とランタイム時で異なるエラーメッセージを提供します
 */
function validateEnvironment(): {
  serviceDomain: string
  apiKey: string
} {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
  const apiKey = process.env.MICROCMS_API_KEY

  // ビルド時かどうかを判定
  const isBuildTime =
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.NEXT_PHASE === 'phase-development-build' ||
    (typeof window === 'undefined' &&
      process.env.NODE_ENV === 'production' &&
      !process.env.VERCEL_ENV)

  if (!serviceDomain) {
    const message = isBuildTime
      ? 'MICROCMS_SERVICE_DOMAIN is not set. Build cannot continue. Please set it in your environment variables.'
      : 'MICROCMS_SERVICE_DOMAIN is not set. Please set it in your .env.local file.'
    throw new Error(message)
  }

  if (!apiKey) {
    const message = isBuildTime
      ? 'MICROCMS_API_KEY is not set. Build cannot continue. Please set it in your environment variables.'
      : 'MICROCMS_API_KEY is not set. Please set it in your .env.local file.'
    throw new Error(message)
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
 * fetch APIのリクエストを実行（内部実装）
 * 
 * @param url リクエストURL
 * @param apiKey APIキー
 * @param cacheOption キャッシュオプション
 * @returns fetch APIのResponseオブジェクト
 */
async function fetchWithAuthInternal(
  url: string,
  apiKey: string,
  cacheOption: RequestCache = 'force-cache'
): Promise<Response> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-MICROCMS-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      cache: cacheOption,
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
 * コンテンツ一覧を取得（内部実装）
 * 
 * @param endpoint エンドポイント名
 * @param queries クエリパラメータ
 * @param cacheOption キャッシュオプション
 * @returns コンテンツ一覧のレスポンス
 */
async function getListInternal<T>(
  endpoint: string,
  queries: QueryParams | undefined,
  cacheOption: RequestCache
): Promise<ListResponse<T>> {
  const { serviceDomain, apiKey } = validateEnvironment()

  // ベースURLを構築
  const baseUrl = buildBaseUrl(serviceDomain, endpoint)

  // クエリパラメータを構築
  const queryString = queries ? buildQueryString(queries) : ''
  const url = `${baseUrl}${queryString}`

  // APIリクエストを実行
  const response = await fetchWithAuthInternal(url, apiKey, cacheOption)

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
 * コンテンツ一覧を取得（後方互換性のため）
 * デフォルトでは静的キャッシュを使用
 * 
 * @deprecated 新しいコードでは getListStatic または getListDynamic を使用してください
 * @param endpoint エンドポイント名（例: 'announcements'）
 * @param queries クエリパラメータ（オプション）
 * @returns コンテンツ一覧のレスポンス
 */
export async function getList<T>(
  endpoint: string,
  queries?: QueryParams
): Promise<ListResponse<T>> {
  // サーバー専用関数をインポートして使用
  const { getListStatic } = await import('./server-client')
  return getListStatic<T>(endpoint, queries)
}


/**
 * コンテンツ詳細を取得（後方互換性のため）
 * デフォルトでは静的キャッシュを使用
 * 
 * @deprecated 新しいコードでは getDetailStatic または getDetailDynamic を使用してください
 * @param endpoint エンドポイント名（例: 'announcements'）
 * @param contentId コンテンツID
 * @param queries クエリパラメータ（オプション）
 * @returns コンテンツ詳細データ
 */
export async function getDetail<T>(
  endpoint: string,
  contentId: string,
  queries?: QueryParams
): Promise<T> {
  // サーバー専用関数をインポートして使用
  const { getDetailStatic } = await import('./server-client')
  return getDetailStatic<T>(endpoint, contentId, queries)
}
