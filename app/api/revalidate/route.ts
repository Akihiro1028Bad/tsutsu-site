import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

/**
 * キャッシュクリアAPI Route Handler
 * 
 * microCMSでコンテンツを更新した際に、Next.jsのキャッシュを手動でクリアするためのAPI
 * 
 * 使用方法:
 * - GET: /api/revalidate?secret=xxx&tag=microcms:blog
 * - POST: /api/revalidate (JSON body: { secret: "xxx", tag: "microcms:blog" })
 * 
 * パラメータ:
 * - secret: 認証トークン（環境変数REVALIDATE_SECRETと一致する必要がある）
 * - tag: クリアするキャッシュタグ（カンマ区切りで複数指定可能）
 *   - 指定しない場合、または"all"を指定した場合: サイト全体のキャッシュをクリア
 * 
 * セキュリティ:
 * - 環境変数REVALIDATE_SECRETが設定されている場合、認証が必要
 * - 本番環境では必ずREVALIDATE_SECRETを設定することを推奨
 */

/**
 * すべての既知のキャッシュタグのリスト
 * 新しいキャッシュタグを追加した場合は、ここにも追加してください
 */
const ALL_CACHE_TAGS = [
  // エンドポイント全体
  'microcms:blog',
  'microcms:announcements',
  // 静的パラメータ
  'blog:static-params',
  'announcements:static-params',
] as const

/**
 * 認証を検証
 */
function validateSecret(providedSecret: string | null): boolean {
  const requiredSecret = process.env.REVALIDATE_SECRET

  // 環境変数が設定されていない場合は、開発環境として認証をスキップ
  if (!requiredSecret) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        'REVALIDATE_SECRET is not set in production. This is a security risk!'
      )
      return false
    }
    // 開発環境では認証なしでも許可（警告を出す）
    console.warn(
      'REVALIDATE_SECRET is not set. Allowing request in development mode only.'
    )
    return true
  }

  if (!providedSecret) {
    return false
  }

  return providedSecret === requiredSecret
}

/**
 * すべてのキャッシュをクリア
 */
function clearAllCache(): void {
  // すべての既知のキャッシュタグをクリア
  for (const tag of ALL_CACHE_TAGS) {
    try {
      revalidateTag(tag)
    } catch (error) {
      console.error(`Failed to revalidate tag: ${tag}`, error)
    }
  }

  // サイト全体のキャッシュをクリア（Data CacheとFull Route Cache）
  try {
    revalidatePath('/', 'layout')
  } catch (error) {
    console.error('Failed to revalidate path: /', error)
  }
}

/**
 * 指定されたタグのキャッシュをクリア
 */
function clearCacheByTags(tags: string[]): void {
  for (const tag of tags) {
    try {
      revalidateTag(tag.trim())
    } catch (error) {
      console.error(`Failed to revalidate tag: ${tag}`, error)
    }
  }
}

/**
 * GETリクエストハンドラー
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const tagParam = searchParams.get('tag')

  // 認証チェック
  if (!validateSecret(secret)) {
    return NextResponse.json(
      { error: 'Invalid secret', revalidated: false },
      { status: 401 }
    )
  }

  // タグが指定されていない、または"all"が指定された場合は、すべてのキャッシュをクリア
  if (!tagParam || tagParam === 'all') {
    clearAllCache()
    return NextResponse.json({
      revalidated: true,
      tags: ['all'],
      now: Date.now(),
      message: 'Successfully revalidated all cache',
    })
  }

  // カンマ区切りのタグを処理
  const tags = tagParam.split(',').filter((tag) => tag.trim().length > 0)

  if (tags.length === 0) {
    return NextResponse.json(
      {
        error: 'Invalid tag parameter',
        revalidated: false,
      },
      { status: 400 }
    )
  }

  clearCacheByTags(tags)

  return NextResponse.json({
    revalidated: true,
    tags,
    now: Date.now(),
    message: `Successfully revalidated ${tags.length} tag(s)`,
  })
}

/**
 * POSTリクエストハンドラー（Webhook連携用）
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const secret = body.secret
    const tag = body.tag || body.tags

    // 認証チェック
    if (!validateSecret(secret)) {
      return NextResponse.json(
        { error: 'Invalid secret', revalidated: false },
        { status: 401 }
      )
    }

    // タグが指定されていない、または"all"が指定された場合は、すべてのキャッシュをクリア
    if (!tag || tag === 'all' || (Array.isArray(tag) && tag.includes('all'))) {
      clearAllCache()
      return NextResponse.json({
        revalidated: true,
        tags: ['all'],
        now: Date.now(),
        message: 'Successfully revalidated all cache',
      })
    }

    // タグの配列または文字列を処理
    const tags = Array.isArray(tag) ? tag : [tag]

    if (tags.length === 0) {
      return NextResponse.json(
        {
          error: 'Invalid tag parameter',
          revalidated: false,
        },
        { status: 400 }
      )
    }

    clearCacheByTags(tags)

    return NextResponse.json({
      revalidated: true,
      tags,
      now: Date.now(),
      message: `Successfully revalidated ${tags.length} tag(s)`,
    })
  } catch (error) {
    console.error('Error parsing request body:', error)
    return NextResponse.json(
      {
        error: 'Invalid request body',
        revalidated: false,
      },
      { status: 400 }
    )
  }
}

