import Image from "next/image"
import RevealOnScroll from "@/components/home/RevealOnScroll"
import SectionShell from "@/components/home/business/SectionShell"
import { WORKS_FEATURED, WORKS_INDEX_HREF } from "@/lib/home/works-data"

/** 実績 — the only colour on the page comes from these screenshots. */
export default function BusinessWorks() {
  return (
    <SectionShell
      id="works"
      title="実績"
      caption="Works"
      moreHref={WORKS_INDEX_HREF}
      moreLabel="一覧を見る"
    >
      {WORKS_FEATURED.map((work) => (
        <RevealOnScroll key={work.id}>
          <article className="biz-work">
            <div className="biz-work__media">
              <Image
                src={work.image.src}
                alt={work.image.alt}
                width={work.image.width}
                height={work.image.height}
              />
            </div>
            <div className="biz-work__head">
              <span className="biz-work__no">{work.indexNumber}</span>
              <h3 className="biz-work__title">{work.title}</h3>
            </div>
            <p className="biz-work__body">{work.summary}</p>
            <div className="biz-work__foot">
              <span>
                {work.client} / {work.year} / {work.category}
              </span>
              <a
                className="biz-work__link"
                href={work.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                サイトを見る ↗
              </a>
            </div>
          </article>
        </RevealOnScroll>
      ))}
    </SectionShell>
  )
}
