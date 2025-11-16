import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import LargeTextMarquee from '@/components/LargeTextMarquee'
import AnnouncementBanner from '@/components/AnnouncementBanner'

// フォールド外のコンポーネントを動的インポート
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="min-h-screen" />,
})

const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="min-h-screen" />,
})

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="min-h-screen" />,
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AnnouncementBanner />
      {/* セクション区切りとしてのLarge Text Marquee */}
      <LargeTextMarquee speed={45} />
      <Services />
      <About />
      <Contact />
    </main>
  )
}

