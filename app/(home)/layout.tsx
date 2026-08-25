import { IBM_Plex_Mono, IBM_Plex_Sans_JP } from "next/font/google"
import HomeNav from "@/components/home/HomeNav"
import HomeFooter from "@/components/home/HomeFooter"
import MotionProvider from "@/components/motion/MotionProvider"
import "./home.css"

// Japanese subset is large — never preload; let the browser swap.
const plexJp = IBM_Plex_Sans_JP({
  weight: ["400", "500", "600"],
  variable: "--font-plex-jp",
  display: "swap",
  preload: false,
})

// Latin-only: cheap enough to preload.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
})

const fontVariableClass = [plexJp.variable, plexMono.variable].join(" ")

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`home-root ${fontVariableClass}`}>
      <MotionProvider>
        <HomeNav />
        {children}
        <HomeFooter />
      </MotionProvider>
    </div>
  )
}
