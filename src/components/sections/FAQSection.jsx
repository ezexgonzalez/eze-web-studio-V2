import { useId, useState } from 'react'
import { faqItems, faqSection } from '../../data/faq'
import plusDesktop from '../../assets/faq/plus-desktop.svg'
import minusDesktop from '../../assets/faq/minus-desktop.svg'
import plusMobile from '../../assets/faq/plus-mobile.svg'
import minusMobile from '../../assets/faq/minus-mobile.svg'

function hasAnswer(item) {
  return typeof item.answer === 'string' && item.answer.trim().length > 0
}

export function FAQSection({ items = faqItems }) {
  const prefix = useId()
  const headingId = `${prefix}-faq-heading`
  const [openId, setOpenId] = useState(() => items[0] && hasAnswer(items[0]) ? items[0].id : null)

  function toggle(item) {
    if (!hasAnswer(item)) return
    setOpenId(current => current === item.id ? null : item.id)
  }

  return (
    <section id="faq" className="faq-section" aria-labelledby={headingId}>
      <div className="faq-layout">
        <header className="faq-header">
          <p className="type-label-eyebrow">{faqSection.eyebrow}</p>
          <h2 id={headingId} className="faq-heading type-heading-l desktop:type-heading-editorial">
            {faqSection.heading.map((line, index) => <span key={line}>{index > 0 && ' '}{line}</span>)}
          </h2>
        </header>
        <div className="faq-list">
          {items.map(item => {
            const available = hasAnswer(item)
            const open = available && openId === item.id
            const buttonId = `${prefix}-${item.id}-question`
            const panelId = `${prefix}-${item.id}-answer`
            const answerLines = item.desktopAnswerLines?.join(' ') === item.answer ? item.desktopAnswerLines : [item.answer]
            return (
              <div className="faq-item" key={item.id} data-open={open}>
                <h3>
                  <button id={buttonId} className="faq-toggle type-body-lg desktop:type-faq-question"
                    type="button" disabled={!available} aria-expanded={open}
                    aria-controls={available ? panelId : undefined} onClick={() => toggle(item)}>
                    <span className="faq-question">{item.question}</span>
                    <picture className="faq-icon" aria-hidden="true">
                      <source media="(min-width: 1200px)" srcSet={open ? minusDesktop : plusDesktop} />
                      <img src={open ? minusMobile : plusMobile} width="44" height="44" alt="" />
                    </picture>
                  </button>
                </h3>
                {available && (
                  <div id={panelId} className="faq-panel" role="region" aria-labelledby={buttonId} aria-hidden={!open} inert={!open}>
                    <div className="faq-panel-inner"><p className="type-body-md">{answerLines.map((line, index) => <span className="faq-answer-line" key={index}>{index > 0 && ' '}{line}</span>)}</p></div>
                  </div>
                )}
                <span className="faq-divider" aria-hidden="true" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
