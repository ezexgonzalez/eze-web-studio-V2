import { Reveal } from '../../components/ui/Reveal'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { exampleContent } from '../data/exampleContent'
import '../exampleStyles.css'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

const imageSizes = [
  "min-h-[22.5rem] md:min-h-[26.25rem]",
  "min-h-[22.5rem] sm:min-h-[30rem] md:min-h-[38.75rem]",
  "min-h-[22.5rem] sm:min-h-[17.5rem] md:min-h-[21.25rem]",
]

export function GallerySection() {
  const copy = exampleContent.sectionCopy.gallery

  if (!exampleContent.gallery.length) return null

  return (
    <section
      id="galeria"
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

        <div className="mt-[3.375rem] grid items-end gap-3.5 sm:grid-cols-2 md:grid-cols-[1fr_1.35fr_0.8fr]">
          {exampleContent.gallery.map((item, index) => (
            <Reveal
              className={index === 2 ? "sm:col-span-2 md:col-span-1" : ""}
              key={item.title}
            >
              <ImagePlaceholder
                alt={item.alt}
                className={[
                  "rounded-[0.875rem]",
                  imageSizes[index] ?? "min-h-[22.5rem]",
                ].join(" ")}
                label={item.label}
                src={item.src}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
