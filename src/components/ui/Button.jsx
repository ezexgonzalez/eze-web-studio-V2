const variants = {
  primary: 'ews-button--primary',
  outline: 'ews-button--outline',
  text: 'ews-button--text',
  // Preserve the API used by the opt-in starter examples.
  secondary: 'ews-button--outline',
  ghost: 'ews-button--text',
}

export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  external = false,
  ...props
}) {
  const classes = ['ews-button type-label-cta', variants[variant] ?? variants.primary, className]
    .filter(Boolean).join(' ')

  if (href) {
    return (
      <a className={classes} href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    )
  }

  return <button className={classes} type="button" {...props}>{children}</button>
}
