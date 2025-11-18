/**
 * microCMS API サーバー専用クライアント
 * 
 * Next.js 16のCache Componentsモードに対応した、サーバー専用のmicroCMS APIクライアント
 * 'use cache'ディレクティブを使用するため、サーバーコンポーネントでのみ使用可能
 * 
 * このファイルはクライアントコンポーネントからインポートしないでください
 */

'use server'

import { cacheTag, cacheLife, unstable_noStore as noStore } from 'next/cache'
import type { QueryParams, ListResponse } from './types'
import {
  MicroCMSApiError,
  MicroCMSNetworkError,
  MicroCMSUnknownError,
} from './errors'
import { buildQueryString, buildBaseUrl, buildContentUrl } from './utils'

/**
 * 環境変数の検証
 */
function validateEnvironment(): {
  serviceDomain: string
  apiKey: string
} {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
  const apiKey = process.env.MICROCMS_API_KEY

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
 */
async function handleErrorResponse(
  response: Response
): Promise<{ message: string; errorMessage?: string }> {
  let errorMessage: string | undefined

  try {
    const errorData = await response.json()
    if (errorData && typeof errorData.message === 'string') {
      errorMessage = errorData.message
    }
  } catch {
    errorMessage = response.statusText || 'Unknown error'
  }

  const message = `microCMS API error: ${response.status} ${response.statusText}`

  return { message, errorMessage }
}

/**
 * fetch APIのリクエストを実行（内部実装）
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
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new MicroCMSNetworkError(
        'ネットワークエラーが発生しました。接続を確認してください。',
        error
      )
    }

    throw new MicroCMSUnknownError(
      '予期しないエラーが発生しました。',
      error
    )
  }
}

/**
 * コンテンツ一覧を取得（内部実装）
 */
async function getListInternal<T>(
  endpoint: string,
  queries: QueryParams | undefined,
  cacheOption: RequestCache
): Promise<ListResponse<T>> {
  const { serviceDomain, apiKey } = validateEnvironment()

  const baseUrl = buildBaseUrl(serviceDomain, endpoint)
  const queryString = queries ? buildQueryString(queries) : ''
  const url = `${baseUrl}${queryString}`

  const response = await fetchWithAuthInternal(url, apiKey, cacheOption)

  if (!response.ok) {
    const { message, errorMessage } = await handleErrorResponse(response)
    throw new MicroCMSApiError(
      message,
      response.status,
      errorMessage,
      response
    )
  }

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
 * コンテンツ詳細を取得（内部実装）
 */
async function getDetailInternal<T>(
  endpoint: string,
  contentId: string,
  queries: QueryParams | undefined,
  cacheOption: RequestCache
): Promise<T> {
  const { serviceDomain, apiKey } = validateEnvironment()

  const baseUrl = buildContentUrl(serviceDomain, endpoint, contentId)
  const queryString = queries ? buildQueryString(queries) : ''
  const url = `${baseUrl}${queryString}`

  const response = await fetchWithAuthInternal(url, apiKey, cacheOption)

  if (!response.ok) {
    const { message, errorMessage } = await handleErrorResponse(response)
    throw new MicroCMSApiError(
      message,
      response.status,
      errorMessage,
      response
    )
  }

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

/**
 * 静的コンテンツ一覧を取得（ビルド時キャッシュ）
 * Cache Componentsモードで使用し、静的生成に最適化
 */
export async function getListStatic<T>(
  endpoint: string,
  queries?: QueryParams
): Promise<ListResponse<T>> {
  'use cache'
  cacheTag(`microcms:${endpoint}`)
  cacheLife('hours') // 1時間キャッシュ

  return getListInternal<T>(endpoint, queries, 'force-cache')
}

/**
 * 動的コンテンツ一覧を取得（ランタイムキャッシュ）
 * 動的レンダリングが必要な場合に使用
 */
export async function getListDynamic<T>(
  endpoint: string,
  queries?: QueryParams
): Promise<ListResponse<T>> {
  'use cache: remote'
  cacheTag(`microcms:${endpoint}:dynamic`)
  cacheLife({ expire: 300 }) // 5分キャッシュ

  return getListInternal<T>(endpoint, queries, 'no-store')
}

/**
 * 完全にキャッシュを無効化してコンテンツ一覧を取得
 * プレビューモードなど即時反映が必要な場合に使用
 */
export async function getListNoStore<T>(
  endpoint: string,
  queries?: QueryParams
): Promise<ListResponse<T>> {
  noStore()
  return getListInternal<T>(endpoint, queries, 'no-store')
}

/**
 * 静的コンテンツ詳細を取得（ビルド時キャッシュ）
 * Cache Componentsモードで使用し、静的生成に最適化
 */
export async function getDetailStatic<T>(
  endpoint: string,
  contentId: string,
  queries?: QueryParams
): Promise<T> {
  'use cache'
  cacheTag(`microcms:${endpoint}:${contentId}`)
  cacheLife('hours') // 1時間キャッシュ

  return getDetailInternal<T>(endpoint, contentId, queries, 'force-cache')
}

/**
 * 動的コンテンツ詳細を取得（ランタイムキャッシュ）
 * 動的レンダリングが必要な場合に使用
 */
export async function getDetailDynamic<T>(
  endpoint: string,
  contentId: string,
  queries?: QueryParams
): Promise<T> {
  'use cache: remote'
  cacheTag(`microcms:${endpoint}:${contentId}:dynamic`)
  cacheLife({ expire: 300 }) // 5分キャッシュ

  return getDetailInternal<T>(endpoint, contentId, queries, 'no-store')
}

/**
 * 完全にキャッシュを無効化してコンテンツ詳細を取得
 * プレビューモードなど即時反映が必要な場合に使用
 */
export async function getDetailNoStore<T>(
  endpoint: string,
  contentId: string,
  queries?: QueryParams
): Promise<T> {
  noStore()
  return getDetailInternal<T>(endpoint, contentId, queries, 'no-store')
}

