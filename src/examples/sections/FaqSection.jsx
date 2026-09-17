import { Reveal } from '../../components/ui/Reveal'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { exampleContent } from '../data/exampleContent'

export function FaqSection() {
  const copy = exampleContent.sectionCopy.faq

  return (
    <section className="border-t border-[var(--theme-border)] px-3 py-[clamp(4.875rem,10vw,8.125rem)] sm:px-5">
      <div className="mx-auto max-w-[52.5rem]">
        <Reveal>
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} />
        </Reveal>

        <Reveal>
          <div className="mt-[3.375rem] border-t border-[var(--theme-border)]">
            {exampleContent.faq.map((item) => (
              <details
                className="border-b border-[var(--theme-border)]"
                key={item.question}
              >
                <summary className="flex min-h-[4.375rem] cursor-pointer list-none items-center justify-between gap-6 py-[1.125rem] font-semibold text-[var(--theme-text)] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-accent)]">
                  {item.question}
                  <span aria-hidden="true" className="text-xl font-light">
                    +
                  </span>
                </summary>
                <p className="max-w-[68ch] pb-[1.375rem] pr-11 leading-[1.65] text-[var(--theme-muted)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
