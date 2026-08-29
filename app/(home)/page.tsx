import type { Metadata } from "next"
import BusinessHero from "@/components/home/business/BusinessHero"
import BusinessServices from "@/components/home/business/BusinessServices"
import BusinessWorks from "@/components/home/business/BusinessWorks"
import BusinessNews from "@/components/home/business/BusinessNews"
import BusinessBlog from "@/components/home/business/BusinessBlog"
import BusinessProfile from "@/components/home/business/BusinessProfile"
import BusinessContact from "@/components/home/business/BusinessContact"
import { toBlogListItem, toNewsListItem } from "@/lib/home/adapters"
import { getLatestAnnouncements } from "@/lib/utils/announcement-server"
import { getLatestBlogPosts } from "@/lib/utils/blog-server"
import "./business.css"

const PAGE_TITLE = "tsutsu | Webサイト制作・アプリ開発・AI導入支援・学習キャリア支援"
const PAGE_DESCRIPTION =
  "Webサイト制作、業務システム・アプリの開発、業務へのAI導入支援、エンジニアの学習・キャリア支援を行っています。ご相談から設計・実装・運用まで一貫して対応します。代表:堤 暁寛。"

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

const NEWS_ITEM_COUNT = 3
const BLOG_ITEM_COUNT = 4

export default async function Home() {
  const [announcements, blogPosts] = await Promise.all([
    getLatestAnnouncements(NEWS_ITEM_COUNT),
    getLatestBlogPosts(BLOG_ITEM_COUNT),
  ])
  const newsItems = announcements.map(toNewsListItem)
  const blogItems = blogPosts.map(toBlogListItem)

  return (
    <main>
      <BusinessHero />
      <BusinessServices />
      <BusinessWorks />
      <BusinessNews items={newsItems} />
      <BusinessBlog items={blogItems} />
      <BusinessProfile />
      <BusinessContact />
    </main>
  )
}
