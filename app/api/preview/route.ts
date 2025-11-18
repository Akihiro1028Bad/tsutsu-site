import { NextResponse } from 'next/server'
import { getDetailNoStore } from '@/lib/microcms/server-client'
import { BlogPost } from '@/lib/types/blog'

/**
 * microCMSプレビュー機能用のAPI Route
 * 
 * microCMS管理画面から呼び出され、プレビューページにリダイレクトします
 * 
 * クエリパラメータ:
 * - draftKey: 下書きキー（必須）
 * - contentId: コンテンツID（{CONTENT_ID}から取得）
 * - endpoint: エンドポイント名（'blog' または 'announcements'）
 * 
 * セキュリティ:
 * - 環境変数MICROCMS_PREVIEW_KEYが設定されている場合、draftKeyの検証を行います
 * - 本番環境では必ずMICROCMS_PREVIEW_KEYを設定することを推奨します
 * 
 * 使用例（microCMS管理画面の設定）:
 * https://your-domain.com/api/preview?draftKey={DRAFT_KEY}&contentId={CONTENT_ID}&endpoint=blog
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const draftKey = searchParams.get('draftKey')
  const contentId = searchParams.get('contentId')
  const endpoint = searchParams.get('endpoint')

  // draftKeyが必須
  if (!draftKey) {
    return NextResponse.json(
      { error: 'draftKey is required' },
      { status: 400 }
    )
  }

  // プレビューキーの検証（環境変数が設定されている場合）
  const validPreviewKey = process.env.MICROCMS_PREVIEW_KEY
  if (validPreviewKey && draftKey !== validPreviewKey) {
    return NextResponse.json(
      { error: 'Invalid preview key' },
      { status: 401 }
    )
  }

  // endpointが必須
  if (!endpoint) {
    return NextResponse.json(
      { error: 'endpoint is required' },
      { status: 400 }
    )
  }

  // エンドポイントに応じてリダイレクト先を決定
  if (endpoint === 'blog') {
    // contentIdが指定されている場合、コンテンツIDからslugを取得
    if (contentId) {
      try {
        // draftKeyを使用して下書きコンテンツを取得
        const post = await getDetailNoStore<BlogPost>('blog', contentId, {
          draftKey,
        })

        // slugを取得してリダイレクト
        if (post.slug) {
          return NextResponse.redirect(
            new URL(`/preview/blog/${post.slug}?draftKey=${draftKey}`, request.url)
          )
        } else {
          return NextResponse.json(
            { error: 'Blog post does not have a slug' },
            { status: 400 }
          )
        }
      } catch (error) {
        console.error('Failed to fetch blog post:', error)
        return NextResponse.json(
          { error: 'Failed to fetch blog post' },
          { status: 500 }
        )
      }
    } else {
      return NextResponse.json(
        { error: 'contentId is required for blog endpoint' },
        { status: 400 }
      )
    }
  }

  if (endpoint === 'announcements') {
    if (contentId) {
      return NextResponse.redirect(
        new URL(`/preview/announcements/${contentId}?draftKey=${draftKey}`, request.url)
      )
    } else {
      return NextResponse.json(
        { error: 'contentId is required for announcements endpoint' },
        { status: 400 }
      )
    }
  }

  // サポートされていないエンドポイント
  return NextResponse.json(
    { error: `Unsupported endpoint: ${endpoint}` },
    { status: 400 }
  )
}

