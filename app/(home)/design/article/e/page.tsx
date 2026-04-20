import type { Metadata } from "next"
import ArticlePreview from "@/components/home/ArticlePreview"

export const metadata: Metadata = {
  title: "Article preview — e · tsutsu",
  robots: { index: false, follow: false },
}

export default function ArticlePreviewEPage() {
  return <ArticlePreview design="e" />
}
