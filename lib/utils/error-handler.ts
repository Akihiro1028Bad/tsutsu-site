/**
 * microCMS API エラーハンドリングユーティリティ
 * 
 * ビルド時とランタイム時のエラーを適切に処理するための共通関数
 */

import { MicroCMSApiError, MicroCMSNetworkError } from '@/lib/microcms/errors'

/**
 * ビルド時かどうかを判定します
 * 
 * @returns ビルド時の場合はtrue、ランタイム時の場合はfalse
 */
export function isBuildTime(): boolean {
  // ビルド時はprocess.env.NEXT_PHASEが'phase-production-build'になる
  // または、typeof window === 'undefined'でサーバーサイドであることを確認
  return (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    (typeof window === 'undefined' && process.env.NODE_ENV === 'production')
  )
}

/**
 * microCMS APIエラーを処理します
 * 
 * @param error - エラーオブジェクト
 * @param options - エラーハンドリングオプション
 * @returns エラーの種類に応じた処理結果
 */
export function handleMicroCMSError<T>(
  error: unknown,
  options?: {
    onNotFound?: () => void
    onNetworkError?: () => void
    onBuildTimeNetworkError?: () => void
    onRuntimeError?: () => void
  }
): {
  shouldThrow: boolean
  isNotFound: boolean
  isBuildTimeNetworkError: boolean
  shouldReturnEmpty?: T
} {
  // ネットワークエラーの場合
  if (error instanceof MicroCMSNetworkError) {
    const buildTime = isBuildTime()
    
    if (buildTime) {
      // ビルド時のネットワークエラー
      options?.onBuildTimeNetworkError?.()
      return {
        shouldThrow: false,
        isNotFound: false,
        isBuildTimeNetworkError: true,
        shouldReturnEmpty: undefined as T,
      }
    } else {
      // ランタイム時のネットワークエラー
      options?.onNetworkError?.()
      return {
        shouldThrow: true,
        isNotFound: false,
        isBuildTimeNetworkError: false,
      }
    }
  }

  // 404エラーの場合
  if (error instanceof MicroCMSApiError && error.isNotFound()) {
    options?.onNotFound?.()
    return {
      shouldThrow: false,
      isNotFound: true,
      isBuildTimeNetworkError: false,
    }
  }

  // その他のエラー（ランタイム時）
  options?.onRuntimeError?.()
  return {
    shouldThrow: true,
    isNotFound: false,
    isBuildTimeNetworkError: false,
  }
}

