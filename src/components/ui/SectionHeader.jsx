// Optional helper for examples, not a required composition for EWS sections.
// Callers own spacing, widths and the role appropriate to each composition.
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  titleClassName = 'type-heading-l',
  descriptionClassName = 'type-body-md',
}) {
  return (
    <header className={[align === 'center' ? 'text-center' : '', className].filter(Boolean).join(' ')}>
      {eyebrow ? <p className="type-label-eyebrow text-accent-cyan">{eyebrow}</p> : null}
      <h2 className={titleClassName}>{title}</h2>
      {description ? <p className={`${descriptionClassName} text-text-body`}>{description}</p> : null}
    </header>
  )
}
