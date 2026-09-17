import { Button } from '../../components/ui/Button'
import { Reveal } from '../../components/ui/Reveal'
import { createWhatsAppUrl } from '../../utils/contactUrls'
import { exampleContent } from '../data/exampleContent'

export function LocationSection() {
  const whatsappUrl = createWhatsAppUrl(
    exampleContent.contact.whatsappNumber,
    exampleContent.contact.whatsappMessage,
  )
  const copy = exampleContent.sectionCopy.location

  return (
    <section
      id="ubicacion"
      className="border-t border-[var(--theme-border)] px-3 py-[clamp(4.875rem,10vw,8.125rem)] sm:px-5"
    >
      <div className="mx-auto grid max-w-[77.5rem] gap-[clamp(2.5rem,8vw,6.875rem)] lg:grid-cols-2">
        <Reveal>
          <p className="mb-4 text-[0.6875rem] font-bold uppercase leading-none tracking-[0.15em] text-[var(--theme-text)]">
            {copy.eyebrow}
          </p>
          <h2 className="mb-[2.625rem] max-w-[14ch] text-[clamp(2.5rem,5vw,5rem)] font-[720] leading-none tracking-[-0.05em] text-[var(--theme-text)] [text-wrap:balance]">
            {copy.title}
          </h2>
          <p className="max-w-[55ch] leading-[1.7] text-[var(--theme-muted)]">
            {copy.description}
          </p>
        </Reveal>

        <Reveal className="flex flex-col justify-between">
          <dl className="grid gap-[1.875rem]">
            <div className="grid gap-2 border-t border-[var(--theme-border)] pt-[1.125rem] sm:grid-cols-[6.875rem_1fr] sm:gap-5">
              <dt className="text-[0.78rem] text-[var(--theme-muted)]">
                Ubicación
              </dt>
              <dd className="font-bold text-[var(--theme-text)]">
                {exampleContent.contact.address}
              </dd>
            </div>
            <div className="grid gap-2 border-t border-[var(--theme-border)] pt-[1.125rem] sm:grid-cols-[6.875rem_1fr] sm:gap-5">
              <dt className="text-[0.78rem] text-[var(--theme-muted)]">
                Horario
              </dt>
              <dd className="font-bold text-[var(--theme-text)]">
                {exampleContent.contact.schedule}
              </dd>
            </div>
            <div className="grid gap-2 border-t border-[var(--theme-border)] pt-[1.125rem] sm:grid-cols-[6.875rem_1fr] sm:gap-5">
              <dt className="text-[0.78rem] text-[var(--theme-muted)]">
                Contacto
              </dt>
              <dd className="font-bold text-[var(--theme-text)]">
                {exampleContent.contact.email} · WhatsApp
              </dd>
            </div>
          </dl>

          <Button href={whatsappUrl} external className="mt-[1.875rem] self-start">
            {exampleContent.primaryCta}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
