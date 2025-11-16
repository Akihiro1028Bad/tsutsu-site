/**
 * microCMS API エラークラス
 * 
 * microCMS APIからのエラーレスポンスを適切に処理するためのカスタムエラークラス
 */

/**
 * microCMS APIエラーの基底クラス
 */
export class MicroCMSError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly originalError?: unknown
  ) {
    super(message)
    this.name = 'MicroCMSError'
    // Errorクラスのスタックトレースを正しく保持
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MicroCMSError)
    }
  }
}

/**
 * microCMS APIからのエラーレスポンス
 * 400, 401, 404, 429などのHTTPステータスコードエラー
 */
export class MicroCMSApiError extends MicroCMSError {
  constructor(
    message: string,
    statusCode: number,
    public readonly errorMessage?: string,
    originalError?: unknown
  ) {
    super(message, statusCode, originalError)
    this.name = 'MicroCMSApiError'
  }

  /**
   * 404エラーかどうかを判定
   */
  isNotFound(): boolean {
    return this.statusCode === 404
  }

  /**
   * 429エラー（レート制限）かどうかを判定
   */
  isRateLimited(): boolean {
    return this.statusCode === 429
  }

  /**
   * 認証エラー（401）かどうかを判定
   */
  isUnauthorized(): boolean {
    return this.statusCode === 401
  }
}

/**
 * ネットワークエラー
 * fetchが失敗した場合など
 */
export class MicroCMSNetworkError extends MicroCMSError {
  constructor(message: string, originalError?: unknown) {
    super(message, undefined, originalError)
    this.name = 'MicroCMSNetworkError'
  }
}

/**
 * その他の予期しないエラー
 */
export class MicroCMSUnknownError extends MicroCMSError {
  constructor(message: string, originalError?: unknown) {
    super(message, undefined, originalError)
    this.name = 'MicroCMSUnknownError'
  }
}

