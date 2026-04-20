import type { Metadata } from "next"
import HeroSection from "@/components/home/HeroSection"
import WorksSection from "@/components/home/WorksSection"
import ServicesSection from "@/components/home/ServicesSection"
import AboutSection from "@/components/home/AboutSection"
import JournalSection from "@/components/home/JournalSection"
import ContactSection from "@/components/home/ContactSection"
import HomeFooter from "@/components/home/HomeFooter"
import {
  toBlogListItem,
  toNewsListItem,
} from "@/lib/home/adapters"
import { getLatestAnnouncements } from "@/lib/utils/announcement-server"
import { getLatestBlogPosts } from "@/lib/utils/blog-server"

export const metadata: Metadata = {
  title: "Design B — Modern · tsutsu",
  description: "Modern style preview — Stripe/Vercel-inspired clean UI.",
}

export default async function DesignBPage() {
  const [news, blogs] = await Promise.all([
    getLatestAnnouncements(4),
    getLatestBlogPosts(4),
  ])
  const newsItems = news.map(toNewsListItem)
  const blogItems = blogs.map(toBlogListItem)

  return (
    <main data-style="modern">
      <HeroSection />
      <WorksSection />
      <ServicesSection />
      <AboutSection />
      <JournalSection newsItems={newsItems} blogItems={blogItems} />
      <ContactSection />
      <HomeFooter />
    </main>
  )
}
