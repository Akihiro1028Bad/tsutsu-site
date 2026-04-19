import AnnouncementSection from '@/components/AnnouncementSection'
import BlogSection from '@/components/BlogSection'
import Link from 'next/link'

export default function LatestSection() {
  return (
    <section className="bg-paper px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="h-section mb-12 text-[clamp(3rem,8vw,7rem)]">LATEST</h2>

        <div className="grid gap-16 md:grid-cols-2 md:gap-12">
          <div>
            <div className="mb-6 flex items-end justify-between">
              <h3 className="h-section text-2xl md:text-3xl">ANNOUNCEMENTS</h3>
              <Link
                href="/announcements"
                className="mono-tag text-ink/70 hover:text-ink"
              >
                + すべて
              </Link>
            </div>
            <AnnouncementSection showHeading={false} />
          </div>
          <div>
            <div className="mb-6 flex items-end justify-between">
              <h3 className="h-section text-2xl md:text-3xl">BLOG</h3>
              <Link href="/blog" className="mono-tag text-ink/70 hover:text-ink">
                + すべて
              </Link>
            </div>
            <BlogSection showHeading={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
