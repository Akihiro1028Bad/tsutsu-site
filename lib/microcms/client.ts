import { createClient } from 'microcms-js-sdk'

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is not set')
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is not set')
}

/**
 * microCMSクライアント
 * 
 * Next.js 16のCache Componentsモードに対応
 * microcms-js-sdkは内部的にfetchを使用しているため、
 * Next.jsのfetchキャッシュが自動的に適用されます
 * 
 * キャッシング戦略:
 * - デフォルトでは、Next.jsのfetchキャッシュが適用されます（force-cache）
 * - より細かい制御が必要な場合は、各ページで直接fetchを使用するか、
 *   カスタムfetch関数を渡すことを検討してください
 * 
 * 例: カスタムfetch関数を使用する場合
 * ```ts
 * const customFetch = (url: string, options?: RequestInit) => {
 *   return fetch(url, {
 *     ...options,
 *     next: { revalidate: 3600, tags: ['announcements'] }
 *   })
 * }
 * 
 * const client = createClient({
 *   serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
 *   apiKey: process.env.MICROCMS_API_KEY,
 *   customFetch,
 * })
 * ```
 */
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
})

