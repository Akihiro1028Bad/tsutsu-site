import PreviewSwitcher from "@/components/home/PreviewSwitcher"

export default function DesignPreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PreviewSwitcher />
      {children}
    </>
  )
}
