/** @type {import('next').NextConfig} */
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
    return [
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
    ]
  },
}

module.exports = nextConfig

