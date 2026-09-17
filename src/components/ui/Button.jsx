const variants = {
  primary:
    "border-[var(--theme-accent)] bg-[var(--theme-accent)] text-[var(--theme-accent-text)]",
  secondary:
    "border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)]",
  ghost:
    "border-transparent bg-transparent text-[var(--theme-text)]",
}

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  external = false,
  ...props
}) {
  const classes = [
    "inline-flex min-h-[2.875rem] items-center justify-center rounded-[var(--theme-radius)] border px-5 text-sm font-semibold transition duration-200 focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[var(--theme-accent)]",
    variants[variant] ?? variants.primary,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}
