import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import LargeTextMarquee from '@/components/LargeTextMarquee'

const FeaturedWork = dynamic(() => import('@/components/FeaturedWork'))
const Services = dynamic(() => import('@/components/Services'))
const About = dynamic(() => import('@/components/About'))
const LatestSection = dynamic(() => import('@/components/LatestSection'))
const Contact = dynamic(() => import('@/components/Contact'))

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
    <main className="min-h-screen bg-paper">
      <Hero />
      <LargeTextMarquee speed={45} />
      <FeaturedWork />
      <Services />
      <About />
      <LatestSection />
      <Contact />
    </main>
  )
}
