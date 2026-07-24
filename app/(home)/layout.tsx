import {
  Noto_Sans_JP,
  Space_Grotesk,
  Zen_Kaku_Gothic_New,
  Zen_Kurenaido,
} from "next/font/google"
import HomeNav from "@/components/home/HomeNav"
import HomeFooter from "@/components/home/HomeFooter"
import MotionProvider from "@/components/motion/MotionProvider"
import "./home.css"

// Latin-only label font: cheap to preload.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

// Japanese fonts: large subsets, never preload — let the browser swap.
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-kaku",
  display: "swap",
  preload: false,
})

const zenKurenaido = Zen_Kurenaido({
  weight: "400",
  variable: "--font-zen-kurenaido",
  display: "swap",
  preload: false,
})

const notoSansJp = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false,
})

const fontVariableClass = [
  zenKaku.variable,
  zenKurenaido.variable,
  spaceGrotesk.variable,
  notoSansJp.variable,
].join(" ")

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
