import { Reveal } from '../../components/ui/Reveal'
import { exampleContent } from '../data/exampleContent'
import '../exampleStyles.css'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

export function AboutSection() {
  const copy = exampleContent.sectionCopy.about

  return (
    <section className="border-t border-[var(--theme-border)] px-3 py-[clamp(4.875rem,10vw,8.125rem)] sm:px-5">
      <div className="mx-auto grid max-w-[77.5rem] items-center gap-[clamp(2.25rem,7vw,6.25rem)] lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <ImagePlaceholder
            alt={copy.imageAlt}
            className="min-h-[36.25rem] rounded-[1.125rem]"
            label={copy.imageLabel}
            src={copy.image}
          />
        </Reveal>

        <Reveal>
          <p className="mb-4 text-[0.6875rem] font-bold uppercase leading-none tracking-[0.15em] text-[var(--theme-text)]">
            {copy.eyebrow}
          </p>
          <h2 className="mb-7 max-w-[14ch] text-[clamp(2.5rem,5vw,5rem)] font-[720] leading-[0.98] tracking-[-0.055em] text-[var(--theme-text)] [text-wrap:balance]">
            {copy.title}
          </h2>
          <p className="max-w-[55ch] leading-[1.7] text-[var(--theme-muted)]">
            {copy.description}
          </p>

          <dl className="mt-[2.625rem] grid gap-5 border-t border-[var(--theme-border)] pt-6 sm:grid-cols-3">
            {exampleContent.trustPoints.map((point) => {
              const title = typeof point === "string" ? point : point.title
              const description =
                typeof point === "string" ? null : point.description

              return (
                <div key={title}>
                  <dt className="mb-1.5 text-sm font-bold text-[var(--theme-text)]">
                    {title}
                  </dt>
                  {description ? (
                    <dd className="text-[0.78rem] leading-[1.5] text-[var(--theme-muted)]">
                      {description}
                    </dd>
                  ) : null}
                </div>
              )
            })}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
