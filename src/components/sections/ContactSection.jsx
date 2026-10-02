import { contact } from '../../data/contact'
import { sectionIds } from '../../data/navigation'
import arrowDesktop from '../../assets/contact/arrow-right-desktop.svg'
import arrowMobile from '../../assets/contact/arrow-right-mobile.svg'

export function ContactSection({ details = contact }) {
  const Cta = details.externalCtaUrl ? 'a' : 'button'
  const ctaProps = details.externalCtaUrl
    ? { href: details.externalCtaUrl, target: '_blank', rel: 'noopener noreferrer' }
    : { type: 'button', disabled: true }

  return (
    <section id={sectionIds.contacto} className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-footer-grid contact-grid" aria-hidden="true">
        <div className="contact-footer-grid-mobile"><i /><i /><i /><b /><b /><b /></div>
        <div className="contact-footer-grid-desktop"><i /><i /><i /><i /><i /><i /><i /><b /><b /></div>
      </div>
      <div className="contact-layout">
        <header className="contact-prompt">
          <p className="contact-eyebrow type-label-eyebrow">{details.eyebrow}</p>
          <h2 id="contact-heading" className="contact-heading type-heading-xl">
            {details.heading.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}
          </h2>
          <p className="contact-description type-body-lg">
            {details.description.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}
          </p>
        </header>
        <div className="contact-action">
          <Cta className="contact-cta" {...ctaProps}>
            <span className="contact-cta-label type-display-action">{details.ctaLabel}</span>
            <picture className="contact-arrow" aria-hidden="true">
              <source media="(min-width: 1200px)" srcSet={arrowDesktop} />
              <img src={arrowMobile} width="38" height="28" alt="" />
            </picture>
          </Cta>
          <span className="contact-rule" aria-hidden="true" />
          <dl className="contact-details">
            <div className="contact-detail">
              <dt className="contact-detail-label type-body-md">{details.emailLabel}</dt>
              <dd className="contact-detail-value type-body-lg desktop:type-contact-detail">
                <a href={details.emailHref}>{details.email}</a>
              </dd>
            </div>
            <div className="contact-detail">
              <dt className="contact-detail-label type-body-md">{details.instagramLabel}</dt>
              <dd className="contact-detail-value type-body-lg desktop:type-contact-detail">
                {details.instagramUrl
                  ? <a href={details.instagramUrl} target="_blank" rel="noopener noreferrer">{details.instagramHandle}</a>
                  : <span>{details.instagramHandle}</span>}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
