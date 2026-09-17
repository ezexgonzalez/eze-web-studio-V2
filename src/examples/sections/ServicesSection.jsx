import { Reveal } from '../../components/ui/Reveal'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { exampleContent } from '../data/exampleContent'

export function ServicesSection() {
  const orderedServices = [
    ...exampleContent.services.filter((service) => service.featured),
    ...exampleContent.services.filter((service) => !service.featured),
  ]
  const copy = exampleContent.sectionCopy.services

  if (!orderedServices.length) return null

  return (
    <section
      id="servicios"
      className="border-t border-[var(--theme-border)] px-3 py-[clamp(4.875rem,10vw,8.125rem)] sm:px-5"
    >
      <div className="mx-auto max-w-[77.5rem]">
        <Reveal>
          <SectionHeader
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
        </Reveal>

        <div className="mt-[3.375rem] grid gap-[1.125rem] md:grid-cols-12">
          {orderedServices.map((service, index) => (
            <Reveal
              className={[
                index === 0 ? "md:col-span-5" : "",
                index === 1 ? "md:col-span-7" : "",
                index === 2 ? "md:col-span-5 md:col-start-5" : "",
                index > 2 ? "md:col-span-4" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={service.title}
            >
              <article
                className={[
                  "flex h-full min-h-[15.625rem] flex-col justify-between border p-[1.875rem]",
                  index === 1
                    ? "border-[var(--theme-text)] bg-[var(--theme-text)] text-[var(--theme-surface)]"
                    : "border-[var(--theme-border)] text-[var(--theme-text)]",
                ].join(" ")}
              >
                <p className="text-[0.6875rem] font-bold uppercase leading-none tracking-[0.15em]">
                  {String(index + 1).padStart(2, "0")} · {service.meta ?? "Servicio"}
                </p>
                <div>
                  <h3 className="text-[clamp(1.5rem,2.6vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.035em]">
                    {service.title}
                  </h3>
                  <p className="mt-[2.125rem] max-w-[38ch] leading-[1.55] opacity-70">
                    {service.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
