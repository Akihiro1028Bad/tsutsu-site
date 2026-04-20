import type { Metadata } from "next"
import ArticlePreview from "@/components/home/ArticlePreview"

export const metadata: Metadata = {
  title: "Article preview — b · tsutsu",
  robots: { index: false, follow: false },
}

export default function ArticlePreviewBPage() {
  return <ArticlePreview design="b" />
}
