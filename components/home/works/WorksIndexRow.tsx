import Image from "next/image"
import type { FeaturedWork } from "@/lib/types/home"

interface WorksIndexRowProps {
  readonly work: FeaturedWork
}

export default function WorksIndexRow({ work }: WorksIndexRowProps) {
  return (
    <a
      className="row-link"
      href={work.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <article className="index-row linked">
        <figure className="r-img">
          <Image
            src={work.image.src}
            alt={work.image.alt}
            width={work.image.width}
            height={work.image.height}
            sizes="(max-width: 900px) 100vw, 42vw"
            loading="lazy"
          />
          <span className="r-extlink" aria-hidden="true">
            ↗
          </span>
        </figure>
        <div className="r-body">
          <header className="r-head">
            <span className="r-num">{work.indexNumber}</span>
            <span className="r-year">{work.year}</span>
            <span className="r-cat">{work.category}</span>
          </header>
          <h2 className="r-title">
            <span className="t-en">
              <em>{work.title}</em>
            </span>
            <span className="t-jp">{work.summary}</span>
          </h2>
          <div className="r-foot">
            <div className="r-client">
              <span className="lbl">Client</span>
              {work.client}
            </div>
            <span className="r-link-lbl">Visit site ↗</span>
          </div>
        </div>
      </article>
    </a>
  )
}
