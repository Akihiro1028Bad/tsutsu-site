import type { Metadata } from "next"
import ArticlePreview from "@/components/home/ArticlePreview"

export const metadata: Metadata = {
  title: "Article preview — a · tsutsu",
  robots: { index: false, follow: false },
}

export default function ArticlePreviewAPage() {
  return <ArticlePreview design="a" />
}
