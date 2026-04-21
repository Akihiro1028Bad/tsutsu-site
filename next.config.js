/** @type {import('next').NextConfig} */

// Content Security Policy (Phase D1)
// - 全ページ: 最小限の許可で XSS / clickjacking を抑止
// - /demos/: iframe で sandbox 内レンダリングされるインタラクティブデモ専用。
//   外部通信 (connect-src) を完全遮断することで、万が一 AI 生成物に悪意が
//   混入しても外部送信不可に。
const BASE_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://images.microcms-assets.io",
  "font-src 'self' data:",
  "connect-src 'self' https://*.microcms.io",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ')

const DEMO_CSP = [
  "default-src 'none'",
  "script-src 'unsafe-inline'",
  "style-src 'unsafe-inline'",
  "img-src data:",
  "font-src data:",
  "connect-src 'none'",
].join('; ')

const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    // Next.js の headers はルール配列を順に適用し、同名ヘッダは後勝ち。
    // 一般ルール (catchall) を先に置き、特定パス (preview / demos) を後で
    // 上書きする順序にする。
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: BASE_CSP },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Belt-and-suspenders protection for draft content:
        //  - X-Robots-Tag stops crawlers that skip meta robots / JSON-LD.
        //  - Referrer-Policy stops the draftKey leaking out via third-party
        //    font CDN / analytics referers.
        source: '/preview/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, nosnippet, noarchive' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
        ],
      },
      {
        // interactive demos served as static HTML. sandboxed via iframe.
        // デモ iframe の親ページは frame-ancestors 'none' を継承するが、
        // tsutsu-site 自身から iframe で読むので X-Frame-Options は SAMEORIGIN に上書き。
        source: '/demos/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: DEMO_CSP },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
