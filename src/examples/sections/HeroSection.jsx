import { Button } from '../../components/ui/Button'
import { Reveal } from '../../components/ui/Reveal'
import { createWhatsAppUrl } from '../../utils/contactUrls'
import { exampleContent } from '../data/exampleContent'
import '../exampleStyles.css'

export function HeroSection() {
  const whatsappUrl = createWhatsAppUrl(
    exampleContent.contact.whatsappNumber,
    exampleContent.contact.whatsappMessage,
  )
  const showVisual = exampleContent.hero.visualType !== "none"

  return (
    <section id="inicio">
      <div className="mx-auto max-w-[77.5rem] px-3 pb-[4.375rem] pt-[clamp(4.375rem,11vw,9.375rem)] sm:px-5">
        <Reveal>
          <div className="max-w-[58.75rem]">
            <p className="text-[0.6875rem] font-bold uppercase leading-none tracking-[0.15em] text-[var(--theme-text)]">
              {exampleContent.category}
            </p>
            <h1 className="mt-4 max-w-[12ch] text-[clamp(3rem,15vw,4.5rem)] font-[720] leading-[0.96] tracking-[-0.065em] text-[var(--theme-text)] sm:text-[clamp(3.4rem,8vw,7.8rem)] [text-wrap:balance]">
              {exampleContent.headline}
            </h1>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-[3.25rem] grid gap-[1.875rem] md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="max-w-[58ch] text-[clamp(1.05rem,1.8vw,1.3rem)] leading-[1.6] text-[var(--theme-muted)]">
              {exampleContent.description}
            </p>
            <Button href={whatsappUrl} external>
              {exampleContent.primaryCta}
            </Button>
          </div>
        </Reveal>
      </div>

      {showVisual ? (
        <Reveal className="px-2.5">
          <figure
            aria-label={exampleContent.hero.imageAlt}
            className="visual-placeholder relative mx-auto min-h-[clamp(23.75rem,54vw,45rem)] max-w-[90rem] overflow-hidden rounded-[1.125rem]"
            role="img"
          >
            {exampleContent.hero.image ? (
              <img
                alt={exampleContent.hero.imageAlt}
                className="absolute inset-0 z-10 h-full w-full object-cover"
                src={exampleContent.hero.image}
              />
            ) : null}
            <figcaption className="absolute bottom-4 left-[1.125rem] z-20 text-[0.625rem] font-bold uppercase leading-[1.3] tracking-[0.12em] text-[var(--theme-text)]">
              {exampleContent.hero.visualLabel} · {exampleContent.hero.visualTitle}
            </figcaption>
          </figure>
        </Reveal>
      ) : null}
    </section>
  )
}
