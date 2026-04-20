import ArticlePreviewSwitcher from "@/components/home/ArticlePreviewSwitcher"

export default function ArticlePreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ArticlePreviewSwitcher />
      {children}
    </>
  )
}
