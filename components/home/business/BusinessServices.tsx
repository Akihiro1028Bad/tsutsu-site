import RevealOnScroll from "@/components/home/RevealOnScroll"
import SectionShell from "@/components/home/business/SectionShell"
import { BUSINESS_SERVICES } from "@/lib/home/business-data"

/** 事業内容 — full-width rows rather than a card grid. */
export default function BusinessServices() {
  return (
    <SectionShell id="services" title="事業内容" caption="Services">
      {BUSINESS_SERVICES.map((service) => (
        <RevealOnScroll key={service.no}>
          <div className="biz-svc">
            <span className="biz-svc__no">{service.no}</span>
            <div>
              <h3 className="biz-svc__title">{service.title}</h3>
              <p className="biz-svc__body">{service.body}</p>
              <a className="biz-svc__link" href="#contact">
                この件で相談する
              </a>
            </div>
            <dl className="biz-svc__meta">
              <dt>対象</dt>
              <dd>{service.target}</dd>
              <dt>期間</dt>
              <dd>{service.span}</dd>
              <dt>費用</dt>
              <dd>{service.cost}</dd>
            </dl>
          </div>
        </RevealOnScroll>
      ))}
    </SectionShell>
  )
}
