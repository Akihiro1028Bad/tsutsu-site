import WorksCard from "@/components/home/WorksCard"
import { WORKS_FEATURED, WORKS_INDEX_HREF } from "@/lib/home/works-data"

export default function WorksSection() {
  return (
    <section id="works" className="works">
      <div className="section-head section-head--hero">
        <div className="section-head__rule">
          <span>01</span>
          <span>Works</span>
        </div>
        <div className="section-head__jp">
          <h2>Works.</h2>
          <p className="section-head__en">制作実績</p>
        </div>
        <p className="section-head__lead">
          Built to last.
          <br />
          長く使われるものを、ひとつずつ。
        </p>
      </div>

      <div className="works__list">
        {WORKS_FEATURED.map((work) => (
          <WorksCard key={work.id} work={work} />
        ))}
      </div>

      <div className="works__all">
        <a className="works__all-link" href={WORKS_INDEX_HREF}>
          <span className="works__all-eyebrow">Index — all works</span>
          <span className="works__all-label">すべての制作事例を見る</span>
          <span className="works__all-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </section>
  )
}
