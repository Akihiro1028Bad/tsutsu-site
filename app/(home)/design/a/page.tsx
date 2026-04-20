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
  title: "Design A — Minimal · tsutsu",
  description: "Minimal style preview — sans-serif only, stripped decorations.",
}

export default async function DesignAPage() {
  const [news, blogs] = await Promise.all([
    getLatestAnnouncements(4),
    getLatestBlogPosts(4),
  ])
  const newsItems = news.map(toNewsListItem)
  const blogItems = blogs.map(toBlogListItem)

  return (
    <main data-style="minimal">
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
