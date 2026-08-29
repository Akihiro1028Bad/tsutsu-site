import ContactForm from "@/components/home/ContactForm"

/** お問い合わせ — reuses the existing Nodemailer-backed form. */
export default function BusinessContact() {
  return (
    <section className="biz-contact" id="contact">
      <div className="biz-contact__intro">
        <h2 className="biz-contact__title">お気軽にご相談ください。</h2>
        <p className="biz-contact__body">
          かたちが決まっていないご相談でも構いません。
          現状をうかがったうえで、進め方をご提案します。
        </p>
      </div>
      <div className="biz-contact__form">
        <ContactForm />
      </div>
    </section>
  )
}
