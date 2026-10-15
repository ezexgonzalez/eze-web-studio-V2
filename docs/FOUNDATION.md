# Foundation — Eze Web Studio V2

## Alcance y base
- Branch: `feature/ews-v2-production`.
- Main sincronizado: `baee1dcae74beb9ce2cefa001d86fd0684cb38f6`; coincide con el SHA auditado, sin cambios posteriores.
- Fuentes: [Figma aprobado](https://www.figma.com/design/aw1k9uSQJhmNGeODZY7BC3), páginas 01–04, y `EWS_V2_Production_Plan.md`.
- Foundation únicamente. App conserva main y skip link; no monta Header, Hero, secciones ni Footer. No se publica ni se considera landing terminada.
- React 19 / Vite 8 / Tailwind 4; sin router, CMS, registry, nueva dependencia ni cambio de lockfile.

## Sistema CSS
`src/index.css` importa fonts, tokens, typography y primitives. `@theme static` mantiene disponibles todos los tokens semánticos incluso antes de usar cada sección. Variables CSS y utilities Tailwind pertenecen al mismo sistema.
Los alias `--theme-*` solo apuntan a esos tokens para ejemplos opt-in. Se elimina el generador de theme inline antiguo; no existe un segundo theme configurable.

| Figma | Variable CSS | Valor |
|---|---|---|
| Background | --color-background | #050708 |
| Background Alternate | --color-background-alternate | #0A1119 |
| Surface | --color-surface | #0B0F12 |
| Glass Fill | --color-glass-fill | #0D1418 |
| Text Primary | --color-text-primary | #F5F7F7 |
| Text Body | --color-text-body | #C5CDD3 |
| Text Muted | --color-text-muted | #A7B0B6 |
| Text Inverse | --color-text-inverse | #050708 |
| Accent Cyan | --color-accent-cyan | #59E3FF |
| Border | --color-border | #222A30 |
| Grid Default | --color-grid-default | rgb(36 65 74 / 25%) |
| Grid Subtle | --color-grid-subtle | rgb(36 65 74 / 17%) |
| Divider Default | --color-divider-default | rgb(115 131 140 / 28%) |
| Divider Strong | --color-divider-strong | rgb(115 131 140 / 62%) |

Spacing: `--spacing-ews-{8,12,16,24,32,48,64,96,128,160}`, en px. Utilities: por ejemplo `p-ews-24`, `gap-ews-16`. No se altera la escala numérica predeterminada de Tailwind.
Radius: `--radius-{12,18,28}`, en px; utilities `rounded-12`, `rounded-18`, `rounded-28`.
Containers: `--container-wide:1344px`, `--container-content:1280px`.

## Inter y roles
Inter 4.1 variable autoalojada, fuente oficial rsms/inter, commit `353b61b9f4430d5f420d56605a6e7993e0941470`, archivo `docs/font-files/InterVariable.woff2`.
Fuente: https://github.com/rsms/inter/blob/353b61b9f4430d5f420d56605a6e7993e0941470/docs/font-files/InterVariable.woff2
Licencia SIL OFL 1.1 conservada en `src/assets/fonts/OFL.txt`.
SHA256: `693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3`.
WOFF2: 352240 bytes. Vite genera URL con hash; sin solicitud a proveedor de fonts en runtime.
`@font-face` declara rango 400–600, normal, swap; `font-synthesis:none`.
Los valores tracking de Figma se convierten de porcentaje a em: -1.5% → -0.015em.

| Utility | Desktop tamaño/line-height px | Peso | Tracking Desktop | Mobile tamaño/line-height px · tracking |
|---|---|---|---|---|
| `type-display-hero` | 72/84 | 600 | -1.5% | 48/54 · -1.5% |
| `type-display-feature` | 116/122 | 600 | -3% | 60/64 · -2.5% |
| `type-display-action` | 64/72 | 400 | 0% | 48/54 · 0% |
| `type-heading-xl` | 68/76 | 600 | -1% | 44/50 · -1% |
| `type-heading-l` | 54/62 | 600 | -1.5% | 38/44 · -1.5% |
| `type-heading-m` | 28/34 | 600 | -1% | 26/32 · -1% |
| `type-title-card` | 24/30 | 600 | -1% | 22/28 · -1% |
| `type-body-lg` | 22/34 | 400 | -0.5% | 18/28 · -0.5% |
| `type-body-md` | 18/28 | 400 | -0.5% | 16/26 · -0.5% |
| `type-body-sm` | 16/24 | 400 | 0% | 14/22 · 0% |
| `type-label-eyebrow` | 14/20 | 600 | 32% | 12/18 · 28% |
| `type-label-cta` | 13/16 | 600 | 16% | 12/16 · 14% |
| `type-label-meta` | 12/18 | 500 | 18% | 11/16 · 16% |
| `type-feature-support` | 28/36 | 400 | -0.5% | Se aplica por sección; sin equivalencia inventada |
| `type-faq-question` | 21/28 | 400 | -0.5% | Se aplica por sección; sin equivalencia inventada |
| `type-heading-editorial` | 50/62 | 400 | -1% | Se aplica por sección; sin equivalencia inventada |
| `type-brand-header` | 18/24 | 600 | 14% | Se aplica por sección; sin equivalencia inventada |
| `type-brand-footer` | 25/32 | 500 | 35.2% | Se aplica por sección; sin equivalencia inventada |
| `type-navigation-header` | 13/20 | 500 | 16% | Se aplica por sección; sin equivalencia inventada |
| `type-navigation-footer` | 18/28 | 400 | 0% | Se aplica por sección; sin equivalencia inventada |
| `type-footer-meta` | 19/28 | 400 | 0% | Se aplica por sección; sin equivalencia inventada |
| `type-label-section-number` | 19/24 | 500 | 16% | Se aplica por sección; sin equivalencia inventada |
| `type-label-card-number` | 14/20 | 500 | -1% | Se aplica por sección; sin equivalencia inventada |
| `type-body-intro` | 19/26 | 400 | -0.3% | Se aplica por sección; sin equivalencia inventada |
| `type-label-emphasis` | 22/30 | 600 | -1% | Se aplica por sección; sin equivalencia inventada |
| `type-label-pagination` | 14/20 | 400 | 0% | Se aplica por sección; sin equivalencia inventada |
| `type-label-pagination-active` | 14/20 | 500 | 0% | Se aplica por sección; sin equivalencia inventada |
| `type-contact-detail` | 24/32 | 400 | 0% | Se aplica por sección; sin equivalencia inventada |

Los 13 roles compartidos usan Mobile <768, interpolación de tamaño/leading de 768 a 1200 y Desktop exacto ≥1200. Tracking cambia a Desktop en 1200. Los estilos específicos sin Mobile documentado conservan sus valores exactos; cada sección decidirá su uso conforme a Figma.
CONFIANZA Mobile 56/60 no se incorpora globalmente; corresponde a Solución.

## Primitivas y contratos
- `Container`: `variant="wide" | "content" | "fluid"`, `as`, props HTML y className. Centrado, max-width y gutters; no obliga offsets particulares de cada sección.
- `Button`: button nativo sin href, anchor con href; external agrega target y rel seguros; variantes primary/outline/text, foco visible, disabled y target mínimo 44px. secondary/ghost son aliases para preservar ejemplos opt-in. La geometría de CTAs finales pertenece a su bloque.
- `SectionHeader`: helper opcional para ejemplos; sin ancho o spacing obligatorio; roles de título/descripción configurables. No define la composición global de secciones.
- `navigation.js`: IDs inicio/proyectos/estudio/faq/contacto y anchors compartidos. HABLEMOS del Header apunta a #contacto.
- `contact.js`, `faq.js`, `projects.js`: módulos simples; pendientes null. FAQ 1 tiene la única respuesta aprobada; FITNESS es el único registro aprobado.
- `--header-offset:0px` provisional; Header + Hero debe fijarlo con la geometría real. Se usa scroll-padding sin sumar el mismo offset a scroll-margin.
- Reset, focus-visible, skip link, main semántico, smooth scroll y reduced-motion conservados.

## Responsive
Mobile gutter 24px. Transition 768–1200: gutter progresa de 24 a 64px. Desktop 1200–1536: de 64 a 96px, luego constante; límites Wide/Content determinan el margen final.
Breakpoints reutilizables `tablet:` (48rem) y `desktop:` (75rem). Los offsets aprobados de futuras secciones se resuelven localmente.

| Viewport | Wide ancho / margen | Content ancho / margen |
|---|---|---|
| 390 | 342 / 24 | 342 / 24 |
| 430 | 382 / 24 | 382 / 24 |
| 768 | 720 / 24 | 720 / 24 |
| 1024 | 928.58 / 47.70 | 928.58 / 47.70 |
| 1280 | 1136.75 / 71.63 | 1136.75 / 71.63 |
| 1536 | 1344 / 96 | 1280 / 128 |

## Validación
- Baseline antes de editar: npm ci + npm run check aprobados, lint y build sin errores del proyecto.
- Foundation: npm run check aprobado; npm conserva un aviso de configuración del entorno `http-proxy`, preexistente, ajeno al proyecto.
- Chromium: seis viewports; 28 roles con tamaño, leading, peso y tracking esperados; containers y cero overflow horizontal.
- DevTools confirmó Inter Variable realmente renderizada en 400, 500 y 600, sin fallback. Fuente cargada desde asset local.
- Click del button, anchor externo/rel, disabled, foco por teclado, skip link a main y reduced-motion comprobados.
- Preview del build: 14 colores, 10 spacings, 3 radios exactos; fuente local con hash HTTP 200; recarga, skip link y seis anchos sin overflow. Consola sin errores ni warnings de aplicación.
- Bundle final: JS 190.66 kB (gzip 60.09), CSS 36.74 kB (gzip 7.78), font 352.24 kB. Sin dependencias nuevas.
- Capturas 390/1536 inspeccionadas para colores, texto, containers y primitivas. Fixture temporal de QA eliminada; no se agrega showcase al producto.
- La comparación de composiciones de secciones con Figma se realiza en cada bloque posterior: implement → render → compare → correct → responsive check → close.

## Pendientes y siguiente bloque
HABLEMOS externo, Instagram URL, FAQ respuestas 2–5, proyectos 2–3, URLs de proyectos y previews reales pendientes. No bloquean Foundation; sí el cierre funcional posterior.
Siguiente bloque: Header + Hero, únicamente tras aprobación de Dirección. Definir header offset, geometría de CTAs y composición desde los frames frozen. Evaluar efecto FREE en el orden aprobado sin adaptar el diseño a la librería.

