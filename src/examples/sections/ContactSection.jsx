import { Button } from '../../components/ui/Button'
import { Reveal } from '../../components/ui/Reveal'
import { createWhatsAppUrl } from '../../utils/contactUrls'
import { exampleContent } from '../data/exampleContent'

export function ContactSection() {
  const whatsappUrl = createWhatsAppUrl(
    exampleContent.contact.whatsappNumber,
    exampleContent.contact.whatsappMessage,
  )
  const copy = exampleContent.sectionCopy.contact

  return (
    <section id="contacto" className="px-3 pb-[4.375rem] pt-[1.875rem] sm:px-5">
      <Reveal>
        <div className="mx-auto flex max-w-[77.5rem] flex-col items-start justify-between gap-10 rounded-[1.25rem] bg-[var(--theme-text)] p-[clamp(2.5rem,7vw,5.625rem)] text-[var(--theme-surface)] lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-[0.6875rem] font-bold uppercase leading-none tracking-[0.15em]">
              {copy.eyebrow}
            </p>
            <h2 className="max-w-[12ch] text-[clamp(2.8rem,6vw,6rem)] font-[720] leading-[0.95] tracking-[-0.055em] [text-wrap:balance]">
              {copy.title}
            </h2>
            <p className="mt-6 max-w-[55ch] leading-[1.6] text-[var(--theme-surface)]/70">
              {copy.description}
            </p>
          </div>

          <Button href={whatsappUrl} external>
            {exampleContent.primaryCta}
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
