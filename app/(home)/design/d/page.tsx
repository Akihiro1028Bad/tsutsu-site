import type { Metadata } from "next"
import Link from "next/link"
import HeroSection from "@/components/home/HeroSection"
import WorksSection from "@/components/home/WorksSection"
import ServicesSection from "@/components/home/ServicesSection"
import AboutSection from "@/components/home/AboutSection"
import JournalSection from "@/components/home/JournalSection"
import ContactSection from "@/components/home/ContactSection"
import HomeFooter from "@/components/home/HomeFooter"
import SectionEdgeAccent from "@/components/home/SectionEdgeAccent"
import SectionDepthWrapper from "@/components/home/SectionDepthWrapper"
import { toBlogListItem, toNewsListItem } from "@/lib/home/adapters"
import { getLatestAnnouncements } from "@/lib/utils/announcement-server"
import { getLatestBlogPosts } from "@/lib/utils/blog-server"

export const metadata: Metadata = {
  title: "Design D — Prototype Comparison · tsutsu",
  description:
    "Prototype A / B / C comparison for section-boundary overlap design.",
  robots: { index: false, follow: false },
}

/** Supported prototype variants */
type Variant = "a" | "b" | "c" | "ab"

const VALID_VARIANTS = new Set<string>(["a", "b", "c", "ab"])

function toVariant(raw: string | undefined): Variant {
  return raw !== undefined && VALID_VARIANTS.has(raw)
    ? (raw as Variant)
    : "a"
}

interface VariantTab {
  readonly id: Variant
  readonly label: string
  readonly caption: string
}

const VARIANT_TABS: ReadonlyArray<VariantTab> = [
  { id: "a", label: "A", caption: "Glass band" },
  { id: "b", label: "B", caption: "Edge accent" },
  { id: "c", label: "C", caption: "Depth fade" },
  { id: "ab", label: "A+B", caption: "Combined" },
]

/**
 * Wraps a section element for the active prototype variant:
 *
 * - Variant "a"  → no wrapper; section is a direct child of <main> so the
 *                  CSS glass-band pseudo-elements (main > section::before)
 *                  fire correctly.
 * - Variant "b" / "ab" → position:relative wrapper + <SectionEdgeAccent>
 *                         painted at the top of the wrapper.
 * - Variant "c"  → <SectionDepthWrapper> for scroll-linked scale/blur.
 *
 * Note: the wrapper div for b/ab means section elements are no longer direct
 * children of <main>, so the glass-band ::before selectors don't fire for
 * those variants — this is an expected prototype trade-off that disappears
 * when the effects are integrated into the section components in subtask-5.
 */
function wrapSection(
  content: React.ReactNode,
  variant: Variant,
): React.ReactNode {
  if (variant === "c") {
    return <SectionDepthWrapper>{content}</SectionDepthWrapper>
  }
  if (variant === "b" || variant === "ab") {
    return (
      <div style={{ position: "relative" }}>
        <SectionEdgeAccent />
        {content}
      </div>
    )
  }
  // variant "a": return unwrapped so CSS direct-child selectors work
  return content
}

export default async function DesignDPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>
}) {
  const { variant: rawVariant } = await searchParams
  const variant = toVariant(rawVariant)

  const [news, blogs] = await Promise.all([
    getLatestAnnouncements(4),
    getLatestBlogPosts(4),
  ])
  const newsItems = news.map(toNewsListItem)
  const blogItems = blogs.map(toBlogListItem)

  return (
    <>
      {/* Floating variant switcher ---------------------------------------- */}
      <nav
        aria-label="Prototype variant switcher"
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          background: "rgba(10,10,10,0.82)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "100px",
          padding: "6px",
          zIndex: 9999,
        }}
      >
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.35)",
            paddingLeft: "10px",
            paddingRight: "6px",
            textTransform: "uppercase",
          }}
        >
          Prototype
        </span>
        {VARIANT_TABS.map((tab) => {
          const isActive = tab.id === variant
          return (
            <Link
              key={tab.id}
              href={`?variant=${tab.id}`}
              aria-current={isActive ? "page" : undefined}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1px",
                padding: "6px 14px",
                borderRadius: "100px",
                color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                textDecoration: "none",
                fontSize: "10px",
                letterSpacing: "0.06em",
                background: isActive
                  ? "rgba(255,255,255,0.14)"
                  : "transparent",
                transition: "color 0.15s, background 0.15s",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                {tab.label}
              </span>
              <span>{tab.caption}</span>
            </Link>
          )
        })}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "6px 14px",
            borderRadius: "100px",
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
            fontSize: "11px",
            marginLeft: "4px",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          ← Exit
        </Link>
      </nav>

      {/* Page content ------------------------------------------------------- */}
      <main
        data-style="modern"
        data-sticky-stack="on"
        data-prototype-variant={variant}
      >
        <HeroSection />
        <WorksSection />
        {wrapSection(<ServicesSection />, variant)}
        {wrapSection(<AboutSection />, variant)}
        {wrapSection(
          <JournalSection newsItems={newsItems} blogItems={blogItems} />,
          variant,
        )}
        {wrapSection(<ContactSection />, variant)}
        <HomeFooter />
      </main>
    </>
  )
}
