// microCMSの参照フィールドの型定義
export interface CategoryReference {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  // categoryは文字列または参照フィールド（オブジェクト）の可能性がある
  category?: '更新情報' | 'テクノロジー' | CategoryReference
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

