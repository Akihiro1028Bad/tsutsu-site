import CountUp from "@/components/motion/CountUp"
import ContactForm from "@/components/home/ContactForm"

interface AsideItem {
  readonly term: string
  readonly termJa: string
  readonly detail: React.ReactNode
}

const ASIDE_ITEMS: ReadonlyArray<AsideItem> = [
  {
    term: "Services",
    termJa: "事業内容",
    detail: (
      <>
        Web開発・システム開発支援、
        <br />
        エンジニア学習・キャリア支援
      </>
    ),
  },
  {
    term: "Area",
    termJa: "対応エリア",
    detail: "全国（リモート対応可能）",
  },
  {
    term: "Location",
    termJa: "所在地",
    detail: "東京都港区六本木",
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="contact">
      <div className="section-head section-head--hero">
        <div className="section-head__rule">
          <span>
            <CountUp end={5} pad={2} duration={900} />
          </span>
          <span>Contact</span>
        </div>
        <div className="section-head__jp">
          <h2>Contact.</h2>
          <p className="section-head__en">お問い合わせ</p>
        </div>
        <p className="section-head__lead">
          ご相談、見積り、ちょっとした質問、
          <br />
          どれもお気軽にどうぞ。
        </p>
      </div>

      <div className="contact__grid">
        <div className="contact__form-slot">
          <ContactForm />
        </div>

        <aside className="contact__aside">
          <dl className="contact__info">
            {ASIDE_ITEMS.map((item) => (
              <div key={item.term}>
                <dt>
                  {item.term}{" "}
                  <span className="contact__info-ja">{item.termJa}</span>
                </dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  )
}
