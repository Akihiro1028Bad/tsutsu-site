import type { Metadata } from "next"
import ArticlePreview from "@/components/home/ArticlePreview"

export const metadata: Metadata = {
  title: "Article preview — d · tsutsu",
  robots: { index: false, follow: false },
}

export default function ArticlePreviewDPage() {
  return <ArticlePreview design="d" />
}
