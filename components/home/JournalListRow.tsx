import Image from "next/image"
import type { JournalThumbnail } from "@/lib/home/adapters"

export interface JournalListRowItem {
  readonly id: string
  readonly title: string
  readonly dateDisplay: string
  /** Small taxonomy chip — e.g. "News" / "Frontend". */
  readonly chip: string
  readonly href: string
  readonly image?: JournalThumbnail
}

interface JournalListRowProps {
  readonly item: JournalListRowItem
  /** Controls chip CSS class for colour parity with home Journal lists. */
  readonly variant: "news" | "blog"
}

function Thumb({
  image,
  fallbackLabel,
}: {
  readonly image: JournalThumbnail | undefined
  readonly fallbackLabel: string
}) {
  if (image) {
    return (
      <span className="journal__thumb">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 900px) 56px, 80px"
          loading="lazy"
        />
      </span>
    )
  }
  return (
    <span
      className="journal__thumb journal__thumb--placeholder"
      aria-hidden="true"
    >
      <span className="journal__thumb-mark">
        {(fallbackLabel.charAt(0) || "·").toUpperCase()}
      </span>
    </span>
  )
}

export default function JournalListRow({ item, variant }: JournalListRowProps) {
  const chipClass =
    variant === "news" ? "journal__kind" : "journal__category"
  return (
    <li>
      <a href={item.href}>
        <Thumb image={item.image} fallbackLabel={item.chip} />
        <span className="journal__date">{item.dateDisplay}</span>
        <span className={chipClass}>{item.chip}</span>
        <span className="journal__title">{item.title}</span>
        <span className="journal__arrow" aria-hidden="true">
          →
        </span>
      </a>
    </li>
  )
}
