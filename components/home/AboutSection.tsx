import RevealOnScroll from "@/components/home/RevealOnScroll"
import { ABOUT } from "@/lib/home/about-data"

export default function AboutSection() {
  return (
    <section id="about" className="about">
      <div className="section-head section-head--hero">
        <div className="section-head__rule">
          <span>03</span>
          <span>About</span>
        </div>
        <div className="section-head__jp">
          <h2>About.</h2>
          <p className="section-head__en">プロフィール</p>
        </div>
        <p className="section-head__lead">
          東京を拠点に、Webのプロダクトを
          <br />
          ひとりで通せるエンジニア。
        </p>
      </div>

      <RevealOnScroll className="about__body">
        <div className="about__name">
          <span className="about__name-ja">{ABOUT.name.ja}</span>
          <span className="about__name-en">
            {ABOUT.name.romanised} / <em>Tsutsu</em>
          </span>
        </div>
        {ABOUT.paragraphs.map((p, pi) => (
          <p key={pi} className="about-paragraph">
            {p.map((seg, si) =>
              seg.kind === "mark" ? (
                <span key={si} className="mark">
                  {seg.value}
                </span>
              ) : (
                <span key={si}>{seg.value}</span>
              )
            )}
          </p>
        ))}
      </RevealOnScroll>
    </section>
  )
}
