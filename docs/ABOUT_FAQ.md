# Block 05 — About + FAQ

**STATUS: CLOSED / APPROVED FOR CONTINUATION**

Branch: `feature/ews-v2-production`. Base auditada y sincronizada: `e5b7cf05d471b96396db4ecd65cad545fae88cae`.

Commit de implementación: `3ebf81a51327063fd6055951adf1ba33aabf2a4e`.

## Fuentes y alcance

Archivo Figma: **Eze Web Studio — New Landing 2026**, `aw1k9uSQJhmNGeODZY7BC3`.

| Sección | Desktop FINAL / FROZEN | Mobile FINAL / FROZEN |
| --- | --- | --- |
| About | `81:45`, 1536 × 1086 | `183:44`, 390 × 753 |
| FAQ | `89:45`, 1536 × 864 | `191:9`, 390 × 936 |

Se obtuvieron metadata, design context y renders de los cuatro nodos. También se inspeccionaron propiedades internas, text styles, fills, dividers, posiciones y estados FAQ mediante lectura del archivo. Figma no fue modificado. Los renders de Figma fueron referencia de implementación, no evidencia de browser QA.

Decisión vigente de Dirección y brief Block 05: el agente realiza validación técnica/estructural y responsive por código; Eze realiza el QA visual/browser final. Este documento no declara comparación browser ↔ Figma ni aprobación visual.

## Implementación

`App.jsx` mantiene composición explícita: Hero → Problema → Solución → Proyectos → About → FAQ. `src/index.css` importa `src/styles/about-faq.css`. No se agregaron Contacto/Footer, CTA, retrato, cards, glows ni motion. Componentes, hooks, estilos y assets de Blocks 01–04 permanecen intactos.

### About

`AboutSection.jsx`, contenido en `src/data/about.js` y estilos locales. Fondo Background Alternate. Desktop reproduce el split editorial y los offsets del master: heading x151/y407, copy x881/y400 y divider Strong x809/y407 de 1 × 278. Grid Default con seis verticales y dos horizontales en sus posiciones propias; no reutiliza el grid de Projects. Heading usa Heading XL 68/76, copy Body LG 22/34.

Mobile usa gutter 24, comienzo y88, heading Heading XL 44/50, primary Body LG 18/28, pausa editorial de 40 px y divisor corto de 32 × 1 seguido de secondary Body MD 16/26. Grid Subtle independiente en x24/195/366 y y150/380/610. La geometría apunta al master de 753 px y deja crecer el contenido si aumenta el texto o cambia el wrapping.

**Diferencia de copy intencional:** el brief vigente y CURRENT_STATE aprueban “Menos estructura de agencia. Más atención en cada proyecto.”; el nodo Figma conserva “sobre cada proyecto.”. Se implementó **en**, por prioridad de la instrucción explícita más reciente. No se alteró ningún otro texto.

En 1536 se fijan los saltos Desktop aprobados; a menores anchos se permite wrapping dentro de las columnas. La separación entre primary y secondary se mantiene. Optical sizing fijo solamente en estas dos secciones, sin alterar Foundation.

### FAQ

`FAQSection.jsx` usa el módulo existente `src/data/faq.js`, que conserva las cinco preguntas, la única respuesta aprobada y cuatro `answer: null`. Header editorial a la izquierda y acordeón a la derecha en Desktop; stack Mobile/Transition. Utilities existentes: Heading Editorial 50/62 y FAQ Question 21/28 en Desktop; Heading L 38/44 y Body LG 18/28 para preguntas Mobile; respuestas Body MD.

El layout Desktop apunta a x733/w666, divider inicial y184, filas/dividers y354/443/530/617/703 y header x136/y208. Los pequeños solapamientos entre cajas de instancias Figma se resuelven en flujo mediante padding local por fila, conservando las posiciones visibles de los dividers. No se superponen preguntas. Las alturas son flexibles, no recortan futuras respuestas.

Mobile apunta al header x24/y88 y lista x24/y258/w342. La fila completa es el botón, con altura mínima 44; la columna del icono mide 44 y deja 286 px para la pregunta en 390. Las alturas derivan de leading, padding y copy real; no se fijan cajas que corten texto.

## Estado e interacción

Un único `openId`. FAQ 01 abre inicialmente; el mismo botón la cierra. Abrir una respuesta disponible cierra la anterior. No hay animación ni librería de acordeón.

FAQ 02–05 tienen botones **disabled nativos**, apariencia CLOSED y PLUS. No crean paneles vacíos, respuestas ocultas ficticias ni relaciones `aria-controls` hacia nodos inexistentes. Se habilitan automáticamente al recibir un `answer` string no vacío aprobado. `desktopAnswerLines` solo se usa cuando su unión coincide exactamente con el answer vigente; una futura edición no conserva texto viejo por accidente.

## Assets

Cuatro SVG exactos exportados de Figma a `src/assets/faq/`:

- `plus-desktop.svg`, `minus-desktop.svg`: raíces/viewBox 20 × 20;
- `plus-mobile.svg`, `minus-mobile.svg`: raíces/viewBox 44 × 44, incluyendo la opacidad aprobada.

`picture` selecciona la geometría Desktop desde 1200 px. Assets locales, decorativos, `aria-hidden` y `alt=""`; sin URLs temporales ni librería de iconos. Los cuatro SVG se validaron como XML y sus dimensiones/viewBox se comprobaron. About no necesita assets nuevos.

## Responsive por código

Mobile <768: stack, gutters 24, composiciones Mobile. Transition 768–1199: stack, gutters Foundation, tipografía fluida existente y columnas con máximo 848 px. Desktop ≥1200: splits editoriales con columnas `minmax(0, …)` y gutters/gaps progresivos hasta el master 1536. Las capas de grid se recortan sin ocultar contenido. El texto permanece en flujo, sin alturas máximas.

| Ancho | About heading disponible | FAQ list disponible | FAQ question disponible | Composición |
| --- | ---: | ---: | ---: | --- |
| 390 | 342 px | 342 px | 286 px | Mobile |
| 430 | 382 px | 382 px | 326 px | Mobile |
| 767 | 719 px | 719 px | 663 px | Mobile |
| 768 | 720 px | 720 px | 664 px | Transition |
| 1024 | 848 px | 848 px | 792 px | Transition |
| 1199 | 848 px | 848 px | 792 px | Transition |
| 1200 | 520.25 px | 579.92 px | 559.92 px | Desktop |
| 1280 | 536.86 px | 600.41 px | 580.41 px | Desktop |
| 1536 | 590 px | 666 px | 646 px | Desktop |

Valores calculados desde CSS, no medidos en browser. En 767/768 los gutters y typography conservan continuidad; en 1199/1200 cambia explícitamente el stack por split aprobado, sin columnas de ancho imposible. El wrapping y ritmo real de esta transición quedan incluidos en el QA manual. Contenido expansible y `overflow-wrap` en FAQ permiten text resizing sin esconder información.

## Accesibilidad

Sections con `aria-labelledby`, h2 y preguntas h3/button. Único h1 de página conservado. IDs FAQ generados con `useId`. Botones disponibles tienen `aria-expanded`, `aria-controls` y panel real asociado mediante `aria-labelledby`; panel cerrado usa `hidden`. Los botones nativos proporcionan Enter/Space y navegación Tab/Shift+Tab. Se reutiliza focus-visible de Foundation. La decoración no agrega anuncios. No hay motion nuevo que cancelar por reduced motion.

La prueba estructural comprobó foco mediante `focus()`, relaciones de panel, IDs únicos y visibilidad DOM. Tab/Shift+Tab, Enter/Space físicos, apariencia del foco y lector de pantalla en browser quedan a Eze; no se simulan como evidencia visual.

## Validación técnica

- Baseline `npm run check`: PASS antes de editar.
- Final `npm run check`: PASS (ESLint + build Vite).
- `git diff --check`: PASS.
- Test aislado con React DOM + JSDOM sobre los componentes reales: estado inicial, abrir/cerrar, null guard, disabled, single-open, paneles/IDs, hidden, foco DOM, exactitud del copy y unmount: PASS, sin React warnings detectados.
- Fixture multi-answer solo en memoria del test temporal fuera del repo: se habilitaron botones, abrir FAQ 03 cerró FAQ 01, abrir FAQ 05 cerró FAQ 03, repetir cerró todas. Dataset de producción conserva cuatro nulls. Ningún fixture o dependencia QA se incorporó al producto.
- Composición App verificada estructuralmente: seis sections en orden, un h1, IDs únicos y un único article real de Proyectos.
- Imports de assets resueltos por build; SVG válidos. No se afirma carga de assets, consola ni overflow medidos en navegador.

Bundle minificado before/after: JS **227.53 → 232.93 kB**, gzip **68.35 → 69.56 kB**; CSS **57.03 → 62.58 kB**, gzip **11.65 → 12.59 kB**. Delta gzip: JS +1.21 kB, CSS +0.94 kB. Inter **352.24 kB**, sin cambios. Sin dependencia runtime nueva, renderer, observer ni loop decorativo. `package.json`/lockfile intactos.

## QA visual manual y pendientes

Eze debe comparar About 1536/390 y FAQ 1536/390 contra los nodos indicados, con Inter/asset loading completo y FAQ 01 abierto. Revisar copy, wraps, alturas maestras, posiciones, dividers, grid, aire y continuidad Proyectos → About → FAQ. Revisar 430/768/1024/1280 y bordes 767/768, 1199/1200; zoom/text resizing, overflow, teclado/foco y consola. Probar apertura/cierre FAQ 01 y que FAQ 02–05 no expanden ni abren panel vacío.

No se intentó reabrir el browser sandbox ni se fabricaron screenshots. Pendiente de contenido real: respuestas FAQ 02–05. No bloquea la implementación del estado aprobado, pero requiere Dirección antes de publicar FAQ completo. Los pendientes previos de Proyectos/destinos/assets globales permanecen.

Dirección cierra/aprueba Block 05 después de la revisión manual. Block 06 — Contacto + Footer no está autorizado ni implementado.


## Dirección — cierre de Block 05

El 2 de octubre de 2026 Eze completó la revisión visual manual y Dirección autorizó continuar. Block 05 queda **CLOSED / APPROVED FOR CONTINUATION**. No reabrir About + FAQ durante Block 06 salvo regresión verificable. Las respuestas FAQ 02–05 continúan pendientes de contenido real y siguen fuera del alcance de implementación hasta aprobación.
