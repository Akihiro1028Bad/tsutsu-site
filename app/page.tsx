import { Suspense } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import LargeTextMarquee from '@/components/LargeTextMarquee'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      {/* セクション区切りとしてのLarge Text Marquee */}
      <LargeTextMarquee speed={45} />
      <Services />
      <About />
      <Contact />
      <Suspense fallback={<footer className="bg-black text-gray-300 py-12" />}>
        <Footer />
      </Suspense>
    </main>
  )
}

