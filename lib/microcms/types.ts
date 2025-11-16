/**
 * microCMS API 型定義
 * 
 * microCMS APIのリクエスト・レスポンスの型定義
 */

/**
 * クエリパラメータの型定義
 */
export interface QueryParams {
  /** 取得件数（0-100） */
  limit?: number
  /** オフセット（ページネーション用） */
  offset?: number
  /** ソート順（例: '-publishedAt' または 'publishedAt'） */
  orders?: string
  /** フィルタ条件（例: 'publishedAt[exists]'） */
  filters?: string
  /** 全文検索クエリ */
  q?: string
  /** 取得するフィールド（カンマ区切り、例: 'id,title'） */
  fields?: string
  /** 取得するコンテンツID（カンマ区切り） */
  ids?: string
  /** 下書きキー（下書きコンテンツ取得用） */
  draftKey?: string
  /** 参照フィールドの取得深度（0-3） */
  depth?: number
  /** リッチエディタのフォーマット（旧リッチエディタ用） */
  richEditorFormat?: string
}

/**
 * 一覧取得APIのレスポンス型
 */
export interface ListResponse<T> {
  /** コンテンツの配列 */
  contents: T[]
  /** 総件数 */
  totalCount: number
  /** オフセット */
  offset: number
  /** リミット */
  limit: number
}

/**
 * microCMS APIエラーレスポンスの型
 */
export interface MicroCMSApiErrorResponse {
  /** エラーメッセージ */
  message: string
}

