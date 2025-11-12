import Script from 'next/script'

export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tsutsu.dev'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'tsutsu',
    description: 'Webサイト制作、アプリ開発、システム開発支援、未経験エンジニアの学習キャリア支援を行っている個人事業主',
    founder: {
      '@type': 'Person',
      name: '堤　暁寛',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    serviceType: [
      'Webサイト制作',
      'Webアプリ開発',
      'システム開発支援',
      'エンジニア学習支援',
      'キャリア支援',
    ],
    url: baseUrl,
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

