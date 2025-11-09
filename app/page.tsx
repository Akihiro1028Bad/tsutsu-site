import { Suspense } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Suspense fallback={<footer className="bg-gray-900 text-gray-300 py-12" />}>
        <Footer />
      </Suspense>
    </main>
  )
}

