import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import LargeTextMarquee from '@/components/LargeTextMarquee'
import BlogSectionSkeleton from '@/components/BlogSectionSkeleton'

// フォールド外のコンポーネントを動的インポート
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="min-h-screen" />,
})

const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="min-h-screen" />,
})

const AnnouncementSection = dynamic(() => import('@/components/AnnouncementSection'), {
  loading: () => null,
})

const BlogSection = dynamic(() => import('@/components/BlogSection'), {
  loading: () => <BlogSectionSkeleton />,
})

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="min-h-screen" />,
})

export const metadata: Metadata = {
  title: 'tsutsu | Web開発・システム開発支援',
  description:
    'Webサイト制作、アプリ開発、システム開発支援、未経験エンジニアの学習キャリア支援を行っている個人事業主のホームページ。',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'tsutsu | Web開発・システム開発支援',
    description:
      'Webサイト制作、アプリ開発、システム開発支援、未経験エンジニアの学習キャリア支援を行っている個人事業主のホームページ。',
    url: '/',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'tsutsu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'tsutsu | Web開発・システム開発支援',
    description:
      'Webサイト制作、アプリ開発、システム開発支援、未経験エンジニアの学習キャリア支援を行っている個人事業主のホームページ。',
    images: ['/logo.png'],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      {/* セクション区切りとしてのLarge Text Marquee */}
      <LargeTextMarquee speed={45} />
      <Services />
      <About />
      <AnnouncementSection />
      <BlogSection />
      <Contact />
    </main>
  )
}

