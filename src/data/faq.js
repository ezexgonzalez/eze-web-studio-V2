// Pending answers stay null; never inherit the component's sample answer.
export const faqSection = {
  eyebrow: 'PREGUNTAS FRECUENTES',
  heading: ['Lo que suele surgir', 'antes de empezar.'],
}

const firstAnswerLines = [
  'Diseñamos landing pages para negocios, servicios y proyectos',
  'que necesitan comunicar mejor lo que hacen y convertir más.',
]

export const faqItems = [
  {
    id: 'tipo-de-paginas',
    question: '¿Qué tipo de páginas hacés?',
    answer: firstAnswerLines.join(' '),
    desktopAnswerLines: firstAnswerLines,
  },
  { id: 'antes-de-empezar', question: '¿Qué necesito tener antes de empezar?', answer: null },
  { id: 'tiempos', question: '¿Cuánto tarda una landing page?', answer: null },
  { id: 'cambios', question: '¿Puedo pedir cambios durante el proceso?', answer: null },
  { id: 'publicacion', question: '¿La página queda lista para publicar?', answer: null },
]
