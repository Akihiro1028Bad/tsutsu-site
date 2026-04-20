import { Suspense } from "react"
import ClientComponents from "@/components/ClientComponents"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HeaderSkeleton from "@/components/HeaderSkeleton"
import FooterSkeleton from "@/components/FooterSkeleton"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ClientComponents />
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      {children}
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </>
  )
}
