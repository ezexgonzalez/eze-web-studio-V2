# Eze Landing Starter

## Propósito

`eze-landing-starter` es una base técnica neutral para crear landings como repositorios independientes mediante **GitHub Template**. Proporciona infraestructura reutilizable sin imponer identidad visual, rubro, narrativa ni composición.

## Qué incluye

- React.
- Vite.
- Tailwind CSS.
- ESLint.
- Un theme técnico configurable.
- Componentes UI básicos.
- Una base de accesibilidad.
- Ejemplos opt-in separados del núcleo.

## Qué NO incluye

- Un diseño aprobado para proyectos nuevos.
- Una estructura narrativa predeterminada.
- Un rubro o una identidad de cliente.
- Un orden obligatorio de secciones.
- Un sistema dinámico de páginas, registry o page builder.

## Crear un proyecto

1. Crear un repositorio nuevo desde este GitHub Template.
2. Instalar las dependencias con `npm install`.
3. Completar `project-brief.md`.
4. Realizar el reconocimiento visual.
5. Aprobar una dirección creativa.
6. Decidir manualmente las secciones necesarias y su orden.
7. Crear o importar únicamente esas secciones en `App.jsx`.
8. Configurar `src/data/siteConfig.js`.
9. Sustituir metadata y assets pendientes.
10. Validar el proyecto antes de publicarlo.

## Uso de `src/examples`

`src/examples` contiene referencias opcionales. No forma parte de `App.jsx`, no representa una dirección creativa aprobada y no debe copiarse como una landing completa. Seleccioná únicamente los ejemplos que respondan al proyecto y copialos o adaptalos después de aprobar su composición.

## Configuración

`src/data/siteConfig.js` contiene únicamente los datos compartidos por el núcleo:

- `businessName`: marca mostrada en Navbar y Footer.
- `navigation.links`: enlaces `{ label, href }` del Navbar.
- `navigation.cta`: CTA opcional `{ label, href, external }` del Navbar, o `null`.
- `footerNote`: nota opcional del Footer.
- `theme.mode`: esquema de color del navegador.
- `theme.background`: fondo general.
- `theme.surface`: color de superficies.
- `theme.border`: color de bordes.
- `theme.text`: color principal de texto.
- `theme.muted`: color de texto secundario.
- `theme.accent`: color de acciones y foco.
- `theme.accentText`: texto sobre el color de acento.
- `theme.radius`: radio técnico de controles.

El contenido propio de cada landing debe mantenerse separado de sus componentes siguiendo el patrón adecuado para el proyecto.

## Scripts

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run lint`: ejecuta ESLint.
- `npm run build`: genera el build de producción.
- `npm run check`: ejecuta lint y build como validación final.
- `npm run preview`: sirve localmente el build generado.

## Checklist antes de publicar

- [ ] Revisar todo el copy.
- [ ] Personalizar metadata e idioma en `index.html`.
- [ ] Agregar favicon y OG image si corresponden, y referenciarlos correctamente.
- [ ] Verificar enlaces y destinos externos.
- [ ] Verificar número, mensaje y enlace de WhatsApp si se utiliza.
- [ ] Optimizar y validar assets.
- [ ] Revisar accesibilidad y navegación por teclado.
- [ ] Revisar responsive en mobile y desktop.
- [ ] Ejecutar `npm run lint`.
- [ ] Ejecutar `npm run build`.
