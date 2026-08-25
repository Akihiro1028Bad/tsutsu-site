import ContactForm from "@/components/home/ContactForm"
import { CONTACT_EMAIL } from "@/lib/home/business-data"

/** お問い合わせ — reuses the existing Nodemailer-backed form. */
export default function BusinessContact() {
  return (
    <section className="biz-contact" id="contact">
      <div className="biz-contact__intro">
        <h2 className="biz-contact__title">まずは、話すところから。</h2>
        <p className="biz-contact__body">
          かたちが決まっていないご相談でも構いません。
          現状をうかがったうえで、進め方をご提案します。
        </p>
        <a className="biz-link" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </div>
      <div className="biz-contact__form">
        <ContactForm />
      </div>
    </section>
  )
}
