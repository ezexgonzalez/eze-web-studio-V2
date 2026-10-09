import { about } from '../../data/about'

export function AboutSection() {
  return (
    <section id="estudio" className="about-section" aria-labelledby="about-heading">
      <div className="about-layout">
        <header className="about-header" data-reveal>
          <p className="type-label-eyebrow">{about.eyebrow}</p>
          <h2 id="about-heading" className="about-heading type-heading-xl">
            {about.heading.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}
          </h2>
        </header>
        <div className="about-copy" data-reveal data-reveal-delay="90">
          <p className="about-primary type-body-lg">
            {about.primary.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}
          </p>
          <div className="about-pause">
            <span className="about-pause-divider" aria-hidden="true" />
            <p className="about-secondary type-body-md desktop:type-body-lg">
              {about.secondary.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
