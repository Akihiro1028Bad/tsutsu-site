import type { Metadata } from 'next'
import { getList } from '@/lib/microcms/client'
import { BlogPost, BlogListResponse } from '@/lib/types/blog'
import { handleMicroCMSError } from '@/lib/utils/error-handler'
import BlogList from '@/components/BlogList'
import Breadcrumb from '@/components/Breadcrumb'
import { CONTENT_CONFIG } from '@/lib/constants/config'

export const metadata: Metadata = {
  title: 'ブログ | tsutsu',
  description: 'Web・システム開発や業務改善に関するノウハウを発信しています。',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'ブログ | tsutsu',
    description: 'Web・システム開発や業務改善に関するノウハウを発信しています。',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'ブログ | tsutsu',
    description: 'Web・システム開発や業務改善に関するノウハウを発信しています。',
  },
}

export default async function BlogPage() {
  let data: BlogListResponse

  try {
    data = await getList<BlogPost>('blog', {
      filters: 'publishedAt[exists]',
      orders: '-publishedAt',
      limit: CONTENT_CONFIG.LIST_PAGE_LIMIT,
    })
  } catch (error) {
    const errorResult = handleMicroCMSError<BlogListResponse>(error, {
      onBuildTimeNetworkError: () => {
        console.warn('ビルド時にブログ記事の取得に失敗しました。空データを返します。')
      },
      onRuntimeError: () => {
        console.error('ブログ記事の取得に失敗しました:', error)
      },
    })

    if (errorResult.shouldThrow) {
      throw new Error('ブログ記事の取得に失敗しました。しばらくしてから再度お試しください。')
    }

    // ビルド時のネットワークエラーの場合は空データを返す
    data = {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: CONTENT_CONFIG.LIST_PAGE_LIMIT,
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen py-8 sm:py-12 md:py-24 lg:py-32">
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

        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
          {/* Breadcrumb */}
          <Breadcrumb items={[{ label: 'ブログ' }]} />

          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 text-slate-950 tracking-tight">
              ブログ
            </h1>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-4 sm:mb-6 w-[100px]" />
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal tracking-[0.08em] uppercase max-w-2xl mx-auto">
              技術ブログや開発に関する記事
            </p>
          </div>

          {/* Blog List */}
          <BlogList posts={data.contents} />
        </div>
      </section>
    </main>
  )
}

