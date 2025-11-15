import { client } from '@/lib/microcms/client'
import { AnnouncementListResponse } from '@/lib/types/announcement'
import AnnouncementList from '@/components/AnnouncementList'

// Cache Componentsモードでは revalidate を直接エクスポートできません
// 代わりに fetch の next.revalidate オプションを使用します

export default async function AnnouncementsPage() {
  'use cache'
  
  let data: AnnouncementListResponse

  try {
    data = await client.get({
      endpoint: 'announcements',
      queries: {
        filters: 'publishedAt[exists]',
        orders: '-publishedAt',
        limit: 100,
      },
    })
  } catch (error) {
    // ビルド時のエラー（Network Error）の場合は空データを返す
    // ランタイム時のエラーはthrowしてerror.tsxで処理
    if (
      error instanceof Error &&
      (error.message.includes('Network Error') ||
        error.message.includes('prerender'))
    ) {
      console.warn('ビルド時にお知らせの取得に失敗しました。空データを返します。')
      data = {
        contents: [],
        totalCount: 0,
        offset: 0,
        limit: 100,
      }
    } else {
      // その他のエラーはthrowしてerror.tsxで処理
      console.error('お知らせの取得に失敗しました:', error)
      throw new Error('お知らせの取得に失敗しました。しばらくしてから再度お試しください。')
    }
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
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-slate-950 tracking-tight">
              お知らせ
            </h1>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-6 w-[100px]" />
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal tracking-[0.08em] uppercase max-w-2xl mx-auto">
              最新情報をお届けします
            </p>
          </div>

          {/* Announcements List */}
          <AnnouncementList announcements={data.contents} />
        </div>
      </section>
    </main>
  )
}

