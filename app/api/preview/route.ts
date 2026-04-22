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
 * セキュリティモデル:
 * - microCMS の draftKey は下書きごとにローテーションする動的トークン。
 *   したがって本ルートで固定シークレットと比較するのは不適切。
 *   draftKey はそのまま microCMS API に渡し、microCMS 側が検証する
 *   (無効なら 0 件が返り、本ルートは 404 相当を返す)。
 * - 追加のハードニングが必要なら、microCMS 管理画面側のプレビュー URL に
 *   別途 `secret=...` を付与し、ここで環境変数と比較する設計にすること。
 *
 * 使用例（microCMS管理画面の「画面プレビュー」遷移先URL）:
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

