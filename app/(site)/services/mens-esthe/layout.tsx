import { Noto_Serif_JP } from 'next/font/google'

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif-jp',
  display: 'swap',
})

export default function MensEstheLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={notoSerifJP.variable}>
      {children}
    </div>
  )
}

