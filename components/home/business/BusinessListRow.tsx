import Image from "next/image"
import Link from "next/link"
import type { JournalThumbnail } from "@/lib/home/adapters"

interface BusinessListRowProps {
  readonly href: string
  readonly dateDisplay: string
  readonly title: string
  /** Category / kind label shown at the row end. */
  readonly kind: string
  /** microCMS eyecatch. Absent on entries with no image set. */
  readonly image?: JournalThumbnail
}

/**
 * Shared row for the お知らせ / ブログ sections.
 *
 * The thumbnail cell is always rendered so rows stay aligned whether or
 * not an entry has an eyecatch; entries without one get an empty frame.
 */
export default function BusinessListRow({
  href,
  dateDisplay,
  title,
  kind,
  image,
}: BusinessListRowProps) {
  return (
    <Link className="biz-row" href={href}>
      <span className="biz-row__thumb" data-empty={image ? "false" : "true"}>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        ) : null}
      </span>
      <span className="biz-row__date">{dateDisplay}</span>
      <span className="biz-row__title">{title}</span>
      <span className="biz-row__kind">{kind}</span>
    </Link>
  )
}
