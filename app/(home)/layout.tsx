import HomeNav from "@/components/home/HomeNav"
import HomeFooter from "@/components/home/HomeFooter"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HomeNav />
      {children}
      <HomeFooter />
    </>
  )
}
