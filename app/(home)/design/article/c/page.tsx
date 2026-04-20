import type { Metadata } from "next"
import ArticlePreview from "@/components/home/ArticlePreview"

export const metadata: Metadata = {
  title: "Article preview — c · tsutsu",
  robots: { index: false, follow: false },
}

export default function ArticlePreviewCPage() {
  return <ArticlePreview design="c" />
}
