export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  const centered = align === "center"

  return (
    <header
      className={[
        centered ? "mx-auto max-w-3xl text-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium text-[var(--theme-text)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight text-[var(--theme-text)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p
          className={[
            "mt-4 max-w-2xl leading-relaxed text-[var(--theme-muted)]",
            centered ? "mx-auto" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {description}
        </p>
      ) : null}
    </header>
  )
}
