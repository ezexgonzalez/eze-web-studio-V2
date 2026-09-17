export function ImagePlaceholder({
  src,
  alt,
  label,
  title,
  className = "",
  imageClassName = "",
}) {
  return (
    <figure
      className={[
        "group relative isolate overflow-hidden bg-[var(--theme-surface)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {src ? (
        <img
          alt={alt}
          className={[
            "h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]",
            imageClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          src={src}
        />
      ) : (
        <div className="visual-placeholder absolute inset-0" aria-hidden="true" />
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 pt-20 text-[var(--theme-text)] sm:p-6">
        {label ? (
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">
            {label}
          </p>
        ) : null}
        {title ? (
          <figcaption className="mt-2 max-w-md text-xl leading-snug sm:text-2xl">
            {title}
          </figcaption>
        ) : null}
      </div>
    </figure>
  )
}
