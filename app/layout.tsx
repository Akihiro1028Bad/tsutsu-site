import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import ClientComponents from '@/components/ClientComponents'
import StructuredData from '@/components/StructuredData'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeaderSkeleton from '@/components/HeaderSkeleton'
import FooterSkeleton from '@/components/FooterSkeleton'

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tsutsu.dev'),
  title: {
    default: 'tsutsu | Web開発・システム開発支援',
    template: '%s | tsutsu',
  },
  description: 'Webサイト制作、アプリ開発、システム開発支援、未経験エンジニアの学習キャリア支援を行っている個人事業主のホームページ。代表：堤　暁寛',
  keywords: ['Web開発', 'システム開発', 'アプリ開発', 'エンジニア支援', 'キャリア支援', 'Next.js', 'React'],
  authors: [{ name: '堤　暁寛' }],
  creator: 'tsutsu',
  publisher: 'tsutsu',
  applicationName: 'tsutsu',
  generator: 'Next.js',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    siteName: 'tsutsu',
    title: 'tsutsu | Web開発・システム開発支援',
    description: 'Webサイト制作、アプリ開発、システム開発支援、未経験エンジニアの学習キャリア支援を行っている個人事業主のホームページ。',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'tsutsu - Web開発・システム開発支援',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'tsutsu | Web開発・システム開発支援',
    description: 'Webサイト制作、アプリ開発、システム開発支援、未経験エンジニアの学習キャリア支援を行っている個人事業主のホームページ。',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Consoleやその他の検証コードを追加可能
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={notoSansJP.variable} data-scroll-behavior="smooth">
      <body className="antialiased font-sans">
        <StructuredData />
        <ClientComponents />
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>
        {children}
        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  )
}

