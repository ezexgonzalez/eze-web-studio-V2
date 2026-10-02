// IDs are shared by future sections and every navigation entry point.
export const sectionIds = Object.freeze({
  inicio: 'inicio',
  proyectos: 'proyectos',
  estudio: 'estudio',
  faq: 'faq',
  contacto: 'contacto',
})

export const anchors = Object.freeze(
  Object.fromEntries(Object.entries(sectionIds).map(([key, id]) => [key, `#${id}`])),
)

export const navigation = {
  home: anchors.inicio,
  links: [
    { label: 'PROYECTOS', href: anchors.proyectos },
    { label: 'ESTUDIO', href: anchors.estudio },
    { label: 'FAQ', href: anchors.faq },
  ],
  cta: { label: 'HABLEMOS', href: anchors.contacto, external: false },
}

export const footerNavigation = [
  { label: 'Proyectos', href: anchors.proyectos },
  { label: 'Estudio', href: anchors.estudio },
  { label: 'FAQ', href: anchors.faq },
  { label: 'Contacto', href: anchors.contacto },
]
