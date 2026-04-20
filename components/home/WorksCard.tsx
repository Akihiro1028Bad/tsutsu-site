import Image from "next/image"
import RevealOnScroll from "@/components/home/RevealOnScroll"
import type { FeaturedWork } from "@/lib/types/home"

interface WorksCardProps {
  readonly work: FeaturedWork
}

export default function WorksCard({ work }: WorksCardProps) {
  return (
    <RevealOnScroll className="work-feature">
      <article className="work-feature__inner">
        <div className="work-feature__rail">
          <div className="work-feature__num" aria-hidden="true">
            {work.indexNumber}
          </div>
          <ul className="work-feature__meta">
            {work.meta.map((m) => (
              <li key={m.label}>
                <span className="work-feature__meta-key">{m.label}</span>
                <span className="work-feature__meta-value">{m.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <figure className="work-feature__thumb">
          <Image
            src={work.image.src}
            alt={work.image.alt}
            width={work.image.width}
            height={work.image.height}
            sizes="(max-width: 900px) 100vw, 60vw"
            loading="lazy"
          />
        </figure>
        <div className="work-feature__body">
          <h3 className="work-feature__title">
            <em>{work.title}</em>
            <span className="work-feature__title-ja">{work.titleJa}</span>
          </h3>
          <p className="work-feature__desc">{work.description}</p>
          <div className="work-feature__stack">
            {work.stack.map((tech) => (
              <span key={tech} className="work-feature__chip">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    </RevealOnScroll>
  )
}
