import fitnessPreview from '../assets/projects/fitness-preview.webp'

// Only the first record is approved. Do not pad this array to match Figma's 03.
export const projectsSection = {
  eyebrow: 'PROYECTOS',
  heading: ['Diseño que habla', 'por sí solo.'],
  intro: ['Landings pensadas para generar interés,', 'transmitir confianza y convertir visitas', 'en oportunidades.'],
  cta: 'VER PROYECTO',
  comingSoon: 'MÁS PROYECTOS EN CAMINO',
}

export const projects = [
  {
    id: 'fitness',
    category: 'FITNESS',
    title: 'Fuerza con método.',
    description: 'Landing page para un gimnasio boutique.',
    url: 'https://eze-demo-gimnasio.vercel.app/',
    preview: fitnessPreview,
    accent: '#FF5A45',
  },
]
