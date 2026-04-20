import type { Metadata } from "next"
import HeroSection from "@/components/home/HeroSection"
import WorksSection from "@/components/home/WorksSection"
import ServicesSection from "@/components/home/ServicesSection"
import AboutSection from "@/components/home/AboutSection"
import JournalSection from "@/components/home/JournalSection"
import ContactSection from "@/components/home/ContactSection"
import {
  toBlogListItem,
  toNewsListItem,
} from "@/lib/home/adapters"
import { getLatestAnnouncements } from "@/lib/utils/announcement-server"
import { getLatestBlogPosts } from "@/lib/utils/blog-server"

const PAGE_TITLE = "tsutsu | フリーランスエンジニア / Freelance Engineer"
const PAGE_DESCRIPTION =
  "想いを技術でカタチに。Webサイト・Webアプリ・業務自動化、そして学習・キャリア伴走まで。堤 暁寛（Tsutsu）のポートフォリオ。"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "tsutsu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/logo.png"],
  },
}

const JOURNAL_ITEM_COUNT = 4

export default async function Home() {
  const [announcements, blogPosts] = await Promise.all([
    getLatestAnnouncements(JOURNAL_ITEM_COUNT),
    getLatestBlogPosts(JOURNAL_ITEM_COUNT),
  ])
  const newsItems = announcements.map(toNewsListItem)
  const blogItems = blogPosts.map(toBlogListItem)

  return (
    <main>
      <HeroSection />
      <WorksSection />
      <ServicesSection />
      <AboutSection />
      <JournalSection newsItems={newsItems} blogItems={blogItems} />
      <ContactSection />
    </main>
  )
}
