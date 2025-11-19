import Image from 'next/image'
import { sanitizeHtml } from '@/lib/utils/sanitize'
import { processHtmlWithCodeBlocks } from '@/lib/utils/html-processor'
import { ProseContent } from './ProseContent'

/**
 * コンテンツ詳細の共通インターフェース
 */
export interface ContentDetailData {
  id: string
  title: string
  content: string
  publishedAt: string
  category?: string | { name: string }
  image?: {
    url: string
    alt?: string
  }
}

interface ContentDetailProps {
  content: ContentDetailData
  imageUrl: string | null
  categoryName: string
  formatDate: (dateString: string) => string
}

/**
 * コンテンツ詳細コンポーネント（Server Component）
 * 
 * 機能:
 * - microCMSのHTMLコンテンツを表示
 * - コードブロックのシンタックスハイライト処理
 * - XSS対策（DOMPurify）
 */
export default async function ContentDetail({
  content,
  imageUrl,
  categoryName,
  formatDate,
}: ContentDetailProps) {
  // 処理順序: コードブロック処理を先に実行（data-filename属性を保持するため）
  // その後、Shikiの出力も含めてサニタイズ
  const processedContent = await processHtmlWithCodeBlocks(content.content, 'dark')
  
  // XSS対策: コードブロック処理済みHTMLをサニタイズ
  const sanitizedContent = await sanitizeHtml(processedContent)

  return (
    <article className="max-w-4xl mx-auto">
      {/* ヒーロー画像 */}
      {imageUrl && (
        <div className="mb-6 sm:mb-8 md:mb-12 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12">
          <div className="relative w-full aspect-video sm:aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={content.image?.alt || content.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      <header className="mb-8 sm:mb-10 md:mb-12 pb-6 sm:pb-8 border-b border-slate-200">
        {/* カテゴリと公開日時を横並びに（モバイルでは縦並び） */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* カテゴリバッジ */}
          {categoryName && (
            <span className="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm text-slate-700 bg-slate-100 border border-slate-200 font-medium tracking-[0.05em] uppercase rounded-full w-fit">
              {categoryName}
            </span>
          )}
          
          {/* 公開日時（アイコン付き） */}
          <div className="flex items-center gap-2 text-sm sm:text-base text-slate-600 font-normal">
            <svg
              className="w-4 h-4 text-slate-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time dateTime={content.publishedAt}>
              {formatDate(content.publishedAt)}
            </time>
          </div>
        </div>
        
        {/* タイトル */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-950 tracking-tight leading-tight">
          {content.title}
        </h1>
      </header>

      <ProseContent
        html={sanitizedContent}
        className="prose prose-sm sm:prose-base md:prose-lg prose-slate max-w-none
          prose-h1:font-light prose-h1:text-slate-950 prose-h1:tracking-tight
          prose-h2:font-normal prose-h2:text-slate-950 prose-h2:tracking-tight
          prose-h3:font-normal prose-h3:text-slate-950 prose-h3:tracking-tight
          prose-h4:font-normal prose-h4:text-slate-950 prose-h4:tracking-tight
          prose-h5:font-normal prose-h5:text-slate-950 prose-h5:tracking-tight
          prose-h6:font-normal prose-h6:text-slate-950 prose-h6:tracking-tight
          prose-p:text-slate-700 prose-p:leading-[1.75] prose-p:font-light prose-p:mb-6 sm:prose-p:mb-7 prose-p:tracking-normal
          prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-950 prose-strong:font-normal
          prose-ul:text-slate-700 prose-ul:pl-6 prose-ol:text-slate-700 prose-ol:pl-6
          prose-li:font-light prose-li:leading-[1.75]
          prose-blockquote:border-l-slate-300 prose-blockquote:text-slate-600 prose-blockquote:leading-relaxed prose-blockquote:italic prose-blockquote:pl-6
          prose-code:text-slate-800 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-pre:bg-slate-950 prose-pre:text-slate-100 prose-pre:text-sm prose-pre:font-mono prose-pre:leading-tight
          prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6 sm:prose-img:my-8
          prose-figure:my-6 sm:prose-figure:my-8
          prose-figcaption:text-slate-500 prose-figcaption:text-xs sm:prose-figcaption:text-sm prose-figcaption:text-center prose-figcaption:mt-2 prose-figcaption:leading-relaxed
          prose-table:w-full prose-table:border-collapse prose-table:my-6 sm:prose-table:my-8 prose-table:text-sm
          prose-thead:border-b prose-thead:border-slate-300
          prose-th:border prose-th:border-slate-300 prose-th:bg-slate-50 prose-th:px-2 sm:prose-th:px-4 prose-th:py-2 sm:prose-th:py-3 prose-th:text-left prose-th:font-normal prose-th:text-slate-950 prose-th:text-sm prose-th:leading-relaxed
          prose-tbody:border-b prose-tbody:border-slate-200
          prose-td:border prose-td:border-slate-300 prose-td:px-2 sm:prose-th:px-4 prose-td:py-2 sm:prose-td:py-3 prose-td:text-slate-700 prose-td:text-sm prose-td:leading-relaxed
          prose-hr:border-slate-300 prose-hr:my-6 sm:prose-hr:my-8
          prose-em:italic prose-em:font-light
          prose-u:underline prose-u:decoration-slate-400
          prose-s:line-through prose-s:text-slate-500"
      />
    </article>
  )
}

