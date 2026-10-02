# Block 07 — Desktop coherence pass

**IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA**

## PROBLEM

La reconstrucción literal Desktop acumulaba alturas de 864–1086 px, offsets superiores de 300–394 px y tipografía máxima desde 1200 px. En monitores cortos eso excedía una escena y daba sensación de zoom. Dirección reemplazó ese contrato en `docs/qa/MANUAL_QA_2026-10-02.md` y en el brief Block 07. Figma conserva identidad y relaciones compositivas; sus alturas y grids ya no gobiernan Desktop.

## VIEWPORT STRATEGY

Mobile <768 y Transition 768–1199 conservan sus reglas geométricas. Desde 1200 px, `src/styles/desktop-coherence.css`, importado después de los estilos de sección, concentra el nuevo contrato: ancho para columnas/wrapping, `svh` para tamaños y ritmo. No zoom, escala global, renderer ni dependencia nueva.

Los mínimos de escena son `100svh`, con contenido en flujo y crecimiento libre. Padding común `clamp(32px, 5svh, 64px)` y gaps `clamp(16px, 2.5svh, 32px)`; las geometrías internas se adaptan por sección, sin reducir toda la página por un porcentaje. Viewports excepcionalmente bajos o texto ampliado pueden generar escenas más altas.

## SECTION HEIGHT STRATEGY

| Sección | Estrategia Desktop |
| --- | --- |
| Hero | Contenido flex centrado dentro de min-height 100svh; padding superior reserva Header, inferior reserva horizonte. Descripción y CTA usan gaps sensibles al alto. Escena decorativa exportada anclada abajo y recortada por su propio contenedor; assets, estrellas y glow existentes intactos. |
| Problema | Intro, cuatro cards y conclusión en flujo dentro de min-height 100svh. Cards con mínimo 270–340 px, iconos 56–76 px, menores gaps y padding vertical. Copy puede envolver; conectores conservan relación con cada gap. |
| Solución | Min-height 100svh; se conserva el escalonado lateral, con tercera entrada al 65%, tipografía variable, gaps verticales menores y rails sensibles al alto. Descripciones sin breaks forzados Desktop. |
| Proyectos | Min-height 100svh; header editorial horizontal. Stage 250–420 px según 34svh; cuatro slots mantienen posiciones horizontales y proporciones verticales asimétricas. Controls/info en flujo; activo dominante. |
| About | Split editorial centrado dentro de min-height 100svh; sin padding 363/396. Copy natural y divider ligado a su altura. Única pausa Background Alternate. |
| FAQ | Split dentro de min-height 100svh; filas y expansión con padding menor. Accordion, estados, asociación de paneles y nulls intactos. Contenido ampliado puede crecer. |
| Contacto | Split dentro de min-height 100svh; se eliminan mínimos tipográficos sobredimensionados y offsets verticales del action. Divider ligado a contenido; CTA/arrow alineados por layout. |
| Footer | Altura de contenido, min-height 0, padding 48 px arriba/abajo; rule → brand/nav → copyright/back. Gaps 32 px. Sin 864 px ni 372 px superiores. |

## TYPOGRAPHY ADAPTATION

`typography.css` conserva roles, pesos y tracking. Desktop Hero, Feature, Action, XL y L usan `clamp(min, min(vw, svh), max)`. Body LG/MD, Feature Support, Editorial y FAQ Question también responden al alto, manteniendo mínimos legibles. Recupera tamaños máximos del master en 1920×1080. Mobile CONFIANZA sigue 56/60; no cambió esa excepción.

Valores calculados del contrato CSS, **no mediciones de browser**:

| Viewport | Hero tamaño/leading | Feature tamaño/leading | XL tamaño/leading | Stage Proyectos |
| --- | --- | --- | --- | --- |
| 1366×768 | 56.8/66.8 | 82.6/86.8 | 50/58 | 261.1 px |
| 1440×900 | 66.6/78.3 | 96.8/101.7 | 56.7/64.8 | 306 px |
| 1536×864 | 63.9/75.2 | 92.9/97.6 | 54.4/62.2 | 293.8 px |
| 1920×1080 | 72/84 | 116/122 | 68/76 | 367.2 px |

## GRID REMOVAL

Eliminados markup y CSS decorativos de HeroBackground, ProjectsSection, AboutSection, ContactSection y Footer, tanto Mobile como Desktop. No existen capas equivalentes en Problem/Solution/FAQ. Tokens Grid permanecen, sin consumo en la landing. Dividers, rails, rules y conectores compositivos se conservan. No quedaron grids ocultos con display:none.

## BACKGROUND SYSTEM

Hero/Problema/Solución/Proyectos/FAQ/Contacto/Footer: Background #050708. About: Background Alternate #0A1119. Cambio de fondo también aplica Mobile/Tablet por decisión global. Surfaces, bordes, halo y horizonte no se reemplazaron.

## PROJECT ALIGNMENT

El CTA tenía `translateX(16px)` pese a compartir contenedor centrado con category/title/description. Se eliminó; todos usan el eje de `.project-information`. Dataset sigue fitness único, url/preview null, 01/01, prev/next/CTA disabled; no contenido o destinos nuevos.

## FOOTER

Desktop pasó de frame 864 px y padding 372/254 a altura natural, padding 48/48 y gaps 32. Sin viewport mínimo. Mobile y Transition mantienen su composición anterior. Contacto y Footer comparten Background.

## MOBILE / TABLET REGRESSION PROTECTION

Reglas nuevas de geometría limitadas a >=75rem. 390/430/767 mantienen composición Mobile; 768/1024/1199 mantienen Transition. 1200/1280/1536 reciben el nuevo sistema; cambio a split/cards/carrusel editorial sigue siendo el breakpoint aprobado. El tamaño Desktop deja de saltar obligatoriamente al máximo del master. La revisión de continuidad perceptual 1199/1200 y overflow real pertenece al QA manual.

Únicos cambios globales: remoción DOM/CSS de grids y fondos. App, Navbar, hooks, data, assets, destinos, FAQ nulls y package/lockfile no cambiaron.

## ACCESSIBILITY

DOM y semántica intactos, IDs únicos, orden lógico, focus-visible y targets existentes. No height fija de escena ni clipping de contenido Desktop; solo contenedores decorativos/preview conservan clipping. Cards crecen y copy envuelve. No loops/motion nuevos; useHorizonGlow/reduced-motion intactos.

## VALIDATION

- Baseline y final `npm run check` PASS: lint/build.
- `git diff --check` PASS.
- Production preview HTTP 200, JS/CSS de entry HTTP 200.
- React DOM/JSDOM + SSR: orden de siete secciones y Footer, IDs únicos, cero grids DOM, 10 estrellas, cuatro steps y tres features conservados; proyecto único, 01/01, disabled/sin falso href; FAQ abre/cierra y cuatro respuestas null siguen disabled. Sin React warnings en estas pruebas.
- Fixture multi-record solo en memoria: next, Home/End/ArrowLeft/ArrowRight y sincronización de índice/pagination/info; eliminado con unmount. Dataset producción intacto.
- Git confirma App/data/hooks/assets/package/lockfile sin cambios. CSS sin selectores decorativos muertos ni consumo de tokens Grid.
- Inspección de geometría y cálculo CSS en los cuatro monitores de referencia, más Mobile/Transition y bordes. **No equivale a medición de layout, overflow, swipe, consola o screenshots de browser.**
- Bundle antes/después: JS 238.12 → 235.66 kB (gzip 70.46 → 70.22); CSS 70.76 → 70.65 kB (gzip 13.76 → 14.08). Inter 352.24 kB intacto. Sin dependencia ni runtime nuevo.

## ISSUES / REVIEW

Eze debe validar escala/aire, crop de horizonte/halo, wrapping, alturas naturales y continuidad en 1366×768, 1440×900, 1536×864, 1920×1080; también 390/430/768/1024/1280/1536 y bordes 767/768/1199/1200. No se fabricaron screenshots ni se declaró browser QA. Siguen pendientes Projects 2–3, previews/URLs, FAQ 02–05, destinos HABLEMOS/Instagram y tareas finales favicon/OG. Block 08 no autorizado.

## COMMIT

Implementación: `1f8ef0ab69823d2f3564bf2cbe4b2af2724b2698` en `feature/ews-v2-production`. La actualización de continuidad posterior registra este SHA sin autoreferencia de commit.
