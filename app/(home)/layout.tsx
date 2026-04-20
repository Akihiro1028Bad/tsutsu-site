import {
  DM_Serif_Display,
  Shippori_Mincho,
  Space_Mono,
  Zen_Kaku_Gothic_New,
} from "next/font/google"
import HomeNav from "@/components/home/HomeNav"
import HomeFooter from "@/components/home/HomeFooter"
import "./home.css"

// Latin-only display fonts: cheap to preload.
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
})

// Japanese fonts: large subsets, never preload — let the browser swap.
const shippori = Shippori_Mincho({
  weight: ["400", "500", "600"],
  variable: "--font-shippori",
  display: "swap",
  preload: false,
})

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "500", "700"],
  variable: "--font-zen-kaku",
  display: "swap",
  preload: false,
})

const fontVariableClass = [
  dmSerif.variable,
  spaceMono.variable,
  shippori.variable,
  zenKaku.variable,
].join(" ")

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`home-root ${fontVariableClass}`}>
      <HomeNav />
      {children}
      <HomeFooter />
    </div>
  )
}
