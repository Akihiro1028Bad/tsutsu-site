import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tsutsu.dev'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/preview/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

