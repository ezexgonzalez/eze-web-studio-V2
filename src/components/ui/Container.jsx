export function Container({
  as: Component = 'div',
  variant = 'content',
  className = '',
  children,
  ...props
}) {
  const width = ['wide', 'content', 'fluid'].includes(variant) ? variant : 'content'
  return (
    <Component
      className={['ews-container', `ews-container--${width}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </Component>
  )
}
