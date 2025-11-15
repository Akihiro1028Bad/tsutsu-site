import { client } from '@/lib/microcms/client'
import { Announcement, AnnouncementListResponse } from '@/lib/types/announcement'
import AnnouncementDetail from '@/components/AnnouncementDetail'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// Cache Componentsモードでは revalidate を直接エクスポートできません
// 代わりに fetch の next.revalidate オプションを使用します

export async function generateStaticParams() {
  'use cache'
  
  try {
    const data: AnnouncementListResponse = await client.get({
      endpoint: 'announcements',
      queries: {
        filters: 'publishedAt[exists]',
        limit: 100,
      },
    })

    return data.contents.map((announcement) => ({
      id: announcement.id,
    }))
  } catch (error) {
    // ビルド時のエラーはログに記録し、空配列を返す
    // これにより、ビルドは継続されるが、静的生成は行われない
    // ビルド時には環境変数が設定されていない、またはAPIに接続できない可能性がある
    console.warn('お知らせ一覧の取得に失敗しました（ビルド時）:', error)
    console.warn('ビルドを継続しますが、静的生成は行われません。')
    // ビルドを継続するため、空配列を返す
    // 本番環境では、このエラーを監視し、適切に対処する必要があります
    return []
  }
}

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  'use cache'
  
  const { id } = await params
  let announcement: Announcement

  try {
    announcement = await client.get({
      endpoint: 'announcements',
      contentId: id,
      queries: {
        filters: 'publishedAt[exists]',
      },
    })
  } catch (error) {
    console.error('お知らせの取得に失敗しました:', error)
    
    // ビルド時のエラー（Network Error）の場合はnotFound()を呼び出す
    if (
      error instanceof Error &&
      (error.message.includes('Network Error') ||
        error.message.includes('prerender'))
    ) {
      console.warn('ビルド時にお知らせの取得に失敗しました。notFound()を呼び出します。')
      notFound()
      return
    }
    
    // microCMSのクライアントが404エラーを投げる場合、notFound()を呼び出す
    // エラーの形式は実装に依存するため、一般的なエラーハンドリングとして
    // エラーメッセージやステータスコードを確認
    if (
      error instanceof Error &&
      (error.message.includes('404') ||
        error.message.includes('Not Found') ||
        error.message.includes('not found'))
    ) {
      notFound()
      return
    }
    // その他のエラーはthrowしてerror.tsxで処理
    throw new Error('お知らせの取得に失敗しました。しばらくしてから再度お試しください。')
  }

  // 公開済みかどうかの確認
  if (!announcement.publishedAt) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-12 md:py-32">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/announcements"
              className="inline-flex items-center text-sm text-slate-500 hover:text-slate-950 font-light transition-colors"
            >
              <span className="mr-2">←</span>
              お知らせ一覧に戻る
            </Link>
          </div>

          {/* Announcement Detail */}
          <AnnouncementDetail announcement={announcement} />
        </div>
      </section>
    </main>
  )
}

