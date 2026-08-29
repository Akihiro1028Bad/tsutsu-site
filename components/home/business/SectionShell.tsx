import Link from "next/link"

interface SectionShellProps {
  /** Anchor id consumed by HomeNav / HomeFooter section links. */
  readonly id: string
  /** Japanese section title. */
  readonly title: string
  /** Latin caption shown under the title. */
  readonly caption: string
  /**
   * Optional "see all" link. href and label travel together so a link can
   * never render without an accessible name.
   */
  readonly more?: { readonly href: string; readonly label: string }
  readonly children: React.ReactNode
}

/**
 * Two-column section frame: a sticky label rail on the left and the
 * section body on the right. The rail keeps the current section visible
 * while its body scrolls, so the page structure stays legible.
 */
export default function SectionShell({
  id,
  title,
  caption,
  more,
  children,
}: SectionShellProps) {
  return (
    <section className="biz-sec" id={id}>
      <div className="biz-sec__label">
        <div>
          <h2>{title}</h2>
          <p>{caption}</p>
          {more ? (
            <Link className="biz-sec__more" href={more.href}>
              {more.label}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="biz-sec__body">{children}</div>
    </section>
  )
}
