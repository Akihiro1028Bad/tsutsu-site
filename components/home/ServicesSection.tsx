import { SERVICES } from "@/lib/home/services-data"

export default function ServicesSection() {
  return (
    <section id="services" className="services" data-theme="dark">
      <div className="section-head section-head--hero">
        <div className="section-head__rule">
          <span>02</span>
          <em aria-hidden="true" />
          <span>Services</span>
        </div>
        <div className="section-head__jp">
          <h2>Services.</h2>
          <p className="section-head__en">— サービス</p>
        </div>
        <p className="section-head__lead">
          Webサイト、Webアプリ、自動化、
          <br />
          そしてキャリア伴走。4つの手触りで。
        </p>
      </div>

      <div className="services__list">
        {SERVICES.map((svc) => (
          <div key={svc.id} className="service-spread">
            <div className="service-spread__lhs">
              <span className="service-spread__name">
                <em>{svc.nameJa}</em>
              </span>
              <span className="service-spread__meta">{svc.meta}</span>
            </div>
            <div className="service-spread__rhs">
              <p className="service-spread__tagline">{svc.tagline}</p>
              <p className="service-spread__body">{svc.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
