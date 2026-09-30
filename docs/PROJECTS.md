# Block 04 — Proyectos

Estado: **IMPLEMENTED / BROWSER QA BLOCKED — NOT CLOSED**.

Base sincronizada: `74c85a17836fb28561f5ea01087c20f839c18f16`, branch `feature/ews-v2-production`. El SHA de implementación se registra en CURRENT_STATE mediante el commit de continuidad. No se autoriza Block 05.

## Fuentes Figma

Archivo `aw1k9uSQJhmNGeODZY7BC3`, Eze Web Studio — New Landing 2026. Masters FINAL / FROZEN: Desktop `73:42` (1536×941), Mobile `183:6` (390×884). Metadata, design context real, screenshots y propiedades internas inspeccionados antes de implementar. Figma no se modificó.

Se inspeccionaron tipografía, copy, fills/strokes, posiciones, grid, glows, slots, controles y CTA. Tokens y Button existentes se reutilizan. Las cajas de texto usan su leading real; no se fuerzan los límites adicionales de frames de texto de Figma. La comparación de render final sigue pendiente.

## Implementación

`ProjectsSection` se monta explícitamente después de `SolutionSection` en App. Contenido en `src/data/projects.js`, presentación en `src/styles/projects.css`, comportamiento en `useProjectCarousel`. No registry ni nuevas dependencias. Header, Hero, Problema, Solución, Foundation y sus assets permanecen sin modificaciones.

Desktop conserva header editorial horizontal, divider, cuatro slots asimétricos y activos dominantes. Posiciones relativas al master: previous 184/294/253×358, active 435/239/621×420, next 1056/270/219×396, queue 1274/306/173×345. Controles editoriales sin dots, información centrada, CTA 214×60 con el desplazamiento local +16 px presente en Figma. Grid DOM y glow SVG estáticos.

Mobile usa gutter 24, header apilado, viewport 342×210 a 390, slot 310×210 y gap 16. Controles 44×44, información centrada y CTA 214×60. Los dos slots vacíos definidos por el master permanecen decorativos y recortados, fuera del contenido navegable.

## Carrusel y datos reales

Hay un único `activeIndex`. Controles, información, paginación, previews Desktop y scroll Mobile derivan de ese estado. La selección se limita al dataset real; no se rellena el array.

Mobile/Transition admite scroll-snap nativo con múltiples registros. Botones y ArrowLeft/ArrowRight/Home/End seleccionan un registro; scrollend actualiza el índice desde el slide más próximo, con debounce de scroll como fallback. ResizeObserver y cambio de breakpoint realinean el slide seleccionado. Reduced motion usa scroll inmediato. Listeners, observer y timeout se eliminan al desmontar/cambiar efecto. Sin autoplay, renderer, rAF ni motion ornamental. Interacción y cleanup en browser todavía pendientes de validación.

La producción actual conserva exactamente el proyecto `fitness`: FITNESS / Fuerza con método. / Landing page para un gimnasio boutique. / `url: null` / `preview: null`.

Los cuatro slots Desktop y tres posiciones visuales Mobile **no representan cuatro/tres proyectos reales**. Los slots vacíos son `aria-hidden`, sin artículos, títulos, CTA ni imágenes inventadas. Los previews reales solo se renderizan cuando existe `preview`.

Desviación funcional intencional: paginación **01 / 01**, frente a 01 / 03 del master, porque existe un solo registro. No se añadió modo master con conteo ficticio. Ambos controles están genuinamente disabled y el viewport no permite navegar a slots decorativos.

VER PROYECTO usa Button como botón genuinamente disabled mientras URL sea null. No href `#`, URL falsa ni navegación. Se conserva la apariencia aprobada mediante override local de opacity. Con URL real, la primitive renderiza enlace externo seguro.

## Assets

Siete SVG exactos, locales en `src/assets/projects/`: glows Desktop/Mobile, flechas left/right Desktop/Mobile y arrow-up-right del CTA. Exportados desde los nodos Figma internos; preservan dimensiones/viewBox, colores, blur y opacidades. Sin URLs temporales, librería de iconos ni previews ficticias. No se reemplazan assets del Hero.

## Responsive y accesibilidad

Mobile <768; transición 768–1199 con header progresivo apilado y un slot activo amplio/peek; Desktop ≥1200 con los cuatro slots. La transición no intenta encajar cuatro slots a 768. El padding final del track permite al último registro real alinearse también al cambiar el ancho del viewport. Tipografía de Foundation, sin alterar tokens globales. Optical sizing fijado localmente, coherente con la integración de los masters anteriores.

Section asociada a h2, único article real con h3, controles con labels accesibles y disabled nativo, status polite con posición real y título. Decoración y previews redundantes no se anuncian. Viewport multi-registro enfocable y operable por teclado; focus-visible global conservado. No información dependiente únicamente del cyan.

Pendiente comprobar en browser: 390 / 430 / 768 / 1024 / 1280 / 1536 y límites 767/768, 1199/1200, overflow, zoom, focus, swipe/keyboard multi-registro y continuidad Solución → Proyectos.

## Validación y bloqueo de QA

Baseline limpio: npm run check PASS antes de editar. Después de implementar: npm run check y git diff --check PASS. Render estático React/SSR comprobó dataset aprobado intacto, un article, tres botones disabled (dos controles + CTA), ningún anchor falso, status 1 de 1, paginación 01/01 y decoración oculta a AT. Fixture estructural aislado de tres copias del registro aprobado verificó la rama multi-registro sin modificar datos de producción. No se afirma que ese test compruebe scroll o interacción.

Preview de build iniciado en 127.0.0.1:5175. Chrome local no puede iniciarse: el entorno deniega socket de ProcessSingleton (`Operation not permitted`). La solicitud de ejecución ampliada fue rechazada por la política de aprobación (`sandbox_approval: false`). El navegador cloud no puede abrir el preview local (`ERR_BLOCKED_BY_CLIENT`). No se evadieron estas restricciones ni se publicó un preview externo.

Por lo tanto: **no hay comparación final browser ↔ Figma, capturas browser, consola verificada, QA responsive ni continuidad visual aprobada**. Las dos PNG obligatorias no se fabricaron. Evidencia de verificaciones y matriz pendiente: `docs/qa/block-04/README.md`. El bloque queda abierto hasta completar el gate real.

## Performance y contenido pendiente

Sin dependencia nueva ni renderer. Bundle baseline: JS 218.09 kB / gzip 66.44; CSS 49.59 / gzip 10.29. Build tras implementación: JS 227.53 / gzip 68.35; CSS 57.03 / gzip 11.65. Delta: JS +9.44 / gzip +1.91; CSS +7.44 / gzip +1.36 kB. Inter 352.24 kB sin cambios. Runtime/GPU no medidos debido al bloqueo de browser.

Pendientes de contenido conocidos: proyectos 2–3, todas las URLs y previews aprobadas. No impiden cerrar geometría después de QA, pero sí declarar el proyecto completo FINAL. Bloque nuevo de esta ejecución: acceso a browser para QA. About + FAQ no se inicia.
