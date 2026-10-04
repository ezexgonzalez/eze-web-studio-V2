# Eze Web Studio V2 — Current Production State

> Documento canónico de continuidad para todos los agentes que trabajen sobre Eze Web Studio V2.
>
> **Leer este archivo antes de iniciar cualquier bloque de producción.**
>
> Última actualización: 4 de octubre de 2026.

---

## 0. Propósito de este documento

Este archivo concentra el hilo operativo del proyecto para evitar que cada agente reconstruya el contexto desde cero o tome decisiones contradictorias.

Debe reflejar siempre:

- estado real del repositorio;
- estado aprobado de Figma;
- bloques de producción cerrados / activos / pendientes;
- decisiones técnicas vigentes;
- pendientes de contenido;
- riesgos conocidos;
- reglas de validación;
- próximo bloque autorizado.

Cuando un bloque se cierre, actualizar este documento antes de empezar el siguiente.

No reemplaza a Figma ni a los documentos especializados. Resume el contrato vigente y apunta a las fuentes correctas.

---

## 1. Source of truth / prioridad de decisiones

Usar este orden cuando exista una aparente contradicción:

1. decisión explícita más reciente de Eze / Dirección;
2. estado aprobado actual del proyecto;
3. este `docs/CURRENT_STATE.md`;
4. `04 — Final Handoff` de Figma;
5. `02 — Desktop` y `03 — Mobile` FINAL / FROZEN;
6. `01 — Visual System`;
7. `docs/FOUNDATION.md` y documentación técnica vigente;
8. documentación antigua / starter;
9. convenciones generales o best practices.

Nunca rediseñar una decisión Figma FINAL / FROZEN para acomodarla a una librería o a una implementación más cómoda.

---

## 2. Repositorio y branch activa

Repository:

`ezexgonzalez/eze-web-studio-V2`

Base branch:

`main`

Production branch:

`feature/ews-v2-production`

Main auditado y sincronizado en Foundation:

`baee1dcae74beb9ce2cefa001d86fd0684cb38f6`

Antes de crear este documento, la branch de producción estaba:

- 1 commit ahead de `main`;
- 0 commits behind;
- sin cambios posteriores en `main` respecto del SHA auditado.

La diferencia existente corresponde al bloque Foundation.

---

## 3. Estado técnico real actual

Stack: React 19 / ReactDOM 19 / Vite 8 / Tailwind 4 / ESLint / JavaScript JSX. Sin router, CMS, page builder, registry, librería de motion/carrusel/iconos ni WebGL/Three.js en producción.

Runtime dependencies: únicamente `react` y `react-dom`. `package.json` y lockfile sin cambios en Blocks 02–06.

`App.jsx` compone explícitamente shell, skip link, `Navbar`, `main#main-content` y `HeroSection` → `ProblemSection` → `SolutionSection` → `ProjectsSection` → `AboutSection` → `FAQSection` → `ContactSection`; `Footer` es sibling de main para conservar el landmark de pie de página.

**Header Desktop/Mobile, Mobile Navigation Open y Hero Desktop/Mobile están implementados y validados.**

Problema y Solución, Proyectos y About + FAQ están CLOSED / APPROVED FOR CONTINUATION. Contacto + Footer completó implementación y el QA manual global de Eze detectó issues sistémicos que pasan al Block 07. Todas las secciones están montadas; Desktop fue reimplementado desde 02B y está READY FOR EZE VISUAL QA; la implementación web todavía no es Production FINAL / FROZEN.

Block 02: `bf6db14b11614a8f75d661190b29b5d86c9e2c5e`. CLOSED / APPROVED FOR CONTINUATION; baseline protegido. Detalle: `docs/HEADER_HERO.md`.

---

## 4. Estado de diseño Figma

Archivo:

**Eze Web Studio — New Landing 2026**

File key:

`aw1k9uSQJhmNGeODZY7BC3`

Páginas:

- `01 — Visual System` → FINAL;
- `02 — Desktop` → HISTORICAL CREATIVE REFERENCE ONLY;
- `02B — Desktop Production` (`239:10`) → CURRENT DESKTOP SOURCE OF TRUTH; canonical master `239:11`, FINAL / READY FOR FRONTEND HANDOFF en Figma;
- `03 — Mobile` → FINAL / FROZEN;
- `04 — Final Handoff` → READY FOR PRODUCTION.

Viewports maestros:

- Desktop Production: **1440×900** por escena, Footer **1440×384**, master total **1440×6684**;
- Mobile: **390 px**.

Orden final aprobado:

1. Hero
2. Problema
3. Solución
4. Proyectos
5. Sobre Eze Web Studio
6. FAQ
7. Contacto
8. Footer

Mobile Navigation es un estado adicional.

Figma está cerrado como frente creativo principal. Si browser y Figma difieren, asumir primero un problema de implementación. Solo escalar a Dirección si el diseño realmente no resuelve una situación.

---

## 5. Dirección visual aprobada

Identidad:

- minimal tech premium;
- dark;
- CLEAN + CRAFT;
- alto control de spacing;
- blanco / grises fríos;
- cyan eléctrico como acento;
- dividers y rails finos; sin grid decorativo;
- composiciones editoriales;
- Hero con mayor intensidad;
- resto de la landing más calmo.

Evitar:

- estética SaaS / IA genérica;
- dashboards ficticios;
- bento grids por moda;
- pills innecesarias;
- glassmorphism excesivo;
- glow agresivo;
- 3D gratuito;
- estética gamer;
- motion rápido;
- componentes decorativos agregados por llenar espacio.

La creatividad debe venir principalmente de composición, jerarquía, tipografía, ritmo y uso controlado de luz.

---

## 6. Visual System implementado en Foundation

Fuente técnica detallada:

`docs/FOUNDATION.md`

### Colores semánticos

- Background: `#050708`
- Background Alternate: `#0A1119`
- Surface: `#0B0F12`
- Glass Fill: `#0D1418`
- Text Primary: `#F5F7F7`
- Text Body: `#C5CDD3`
- Text Muted: `#A7B0B6`
- Text Inverse: `#050708`
- Accent Cyan: `#59E3FF`
- Border: `#222A30`
- Grid Default: `rgb(36 65 74 / 25%)`
- Grid Subtle: `rgb(36 65 74 / 17%)`
- Divider Default: `rgb(115 131 140 / 28%)`
- Divider Strong: `rgb(115 131 140 / 62%)`

### Spacing

`8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160`

### Radius

`12 / 18 / 28`

### Containers

- Wide: `1344px`
- Content: `1280px`

A 1536 px:

- Wide → 96 px de margen;
- Content → 128 px de margen.

Los containers son primitivas, no una orden de realinear excepciones locales aprobadas.

### Typography

Inter 4.1 variable autoalojada.

Pesos usados:

- 400;
- 500;
- 600.

Licencia SIL OFL 1.1 incluida en repo.

Las utilities tipográficas Desktop / Mobile ya están implementadas. No recrearlas por sección si existe el rol correcto.

Excepción aprobada:

- `CONFIANZA` Mobile usa **56/60**, no el 60/64 global de Display/Feature.

Esta excepción pertenece a Solución y no debe convertirse en token global.

---

## 7. Responsive contract

Rangos conceptuales:

### Mobile

`< 768px`

- composición Mobile;
- gutter base 24 px;
- referencia 390 px;
- navegación Mobile.

### Transition / Tablet

`768–1199px`

- containers fluidos;
- gutters progresivos;
- tipografía interpola;
- splits se apilan cuando pierden aire;
- no existe un tercer diseño completo.

### Desktop

`>= 1200px`

- composición Desktop;
- navegación Desktop;
- Wide / Content;
- offsets específicos respetados desde Figma.

Anchos obligatorios de validación:

- 390;
- 430;
- 768;
- 1024;
- 1280;
- 1536.

Revisar además especialmente los bordes 767/768 y 1199/1200.

---

## 8. Navigation contract

IDs compartidos:

- `#inicio`
- `#proyectos`
- `#estudio`
- `#faq`
- `#contacto`

Desktop nav:

- PROYECTOS → `#proyectos`
- ESTUDIO → `#estudio`
- FAQ → `#faq`
- HABLEMOS → `#contacto`
- wordmark → `#inicio`

Mobile:

- wordmark;
- MENÚ;
- overlay / open state;
- PROYECTOS;
- ESTUDIO;
- FAQ;
- HABLEMOS;
- CERRAR.

Mobile menu debe:

- cerrar con CERRAR;
- cerrar con Escape;
- cerrar al seleccionar destino;
- devolver foco;
- bloquear scroll de fondo;
- cerrar si el viewport pasa a Desktop;
- impedir interacción accidental con contenido detrás.

`--header-offset: 0px` confirmado en Block 02. Header no sticky/fixed: se desplaza con la página. Caja medida: 92 px Mobile/Tablet, 110 px Desktop; no obstruye anchors al navegar. Se conserva solo scroll-padding, sin duplicar scroll-margin. Nav Desktop desde 1200 px; MENÚ también en Tablet. Menú modal nativo con aislamiento, foco inicial en CERRAR y retorno a MENÚ; al entrar en Desktop devuelve foco al wordmark visible.

---

## 9. Copy / contenido aprobado relevante

### Hero

Headline:

`Webs que se entienden.`
`Diseño que se recuerda.`

Descripción:

`Landing pages claras, visualmente cuidadas y pensadas para convertir una buena primera impresión en una conversación real.`

CTAs:

- VER PROYECTOS → `#proyectos`
- HABLEMOS → `#contacto`

### Problema

Eyebrow:

`EL PROBLEMA`

Headline:

`Sin una estructura clara, el interés se pierde en el camino`

Descripción:

`Una landing page guía, responde y genera confianza. Sin ella, tus visitantes se pierden y las oportunidades se escapan.`

Secuencia:

1. Llega
2. Busca claridad
3. Duda
4. Se va

Resultado:

`más dudas, menos confianza, menos oportunidades.`

### Solución

Eyebrow:

`LA SOLUCIÓN`

Intro:

`Una landing page convierte un mensaje disperso en claridad, confianza y acción.`

Features:

1. CLARIDAD
2. CONFIANZA
3. ACCIÓN

### About

Eyebrow:

`SOBRE EZE WEB STUDIO`

Headline:

`Un estudio chico, pensado para trabajar de cerca.`

Primary copy:

`Eze Web Studio crea landing pages para negocios y servicios que necesitan comunicar mejor lo que hacen. Diseño, claridad y desarrollo se trabajan como una sola pieza, con un proceso directo y cuidado en cada detalle.`

Secondary copy:

`Menos estructura de agencia. Más atención en cada proyecto.`

### FAQ

Preguntas aprobadas:

1. ¿Qué tipo de páginas hacés?
2. ¿Qué necesito tener antes de empezar?
3. ¿Cuánto tarda una landing page?
4. ¿Puedo pedir cambios durante el proceso?
5. ¿La página queda lista para publicar?

Respuesta aprobada únicamente para FAQ 1:

`Diseñamos landing pages para negocios, servicios y proyectos que necesitan comunicar mejor lo que hacen y convertir más.`

FAQ 2–5 siguen pendientes. Nunca copiar la respuesta 1 como fallback.

### Contacto

Headline:

`¿Tenés una idea en mente?`

Descripción:

`Contame qué necesitás y vemos si una landing page es la solución adecuada para tu negocio.`

CTA visual:

`HABLEMOS →`

Email aprobado:

`hola@ezewebstudio.com`

Instagram handle aprobado:

`@ezewebstudio`

Destino externo de HABLEMOS: pendiente.

URL canónica de Instagram: pendiente.

### Footer

- EZE WEB STUDIO
- Proyectos
- Estudio
- FAQ
- Contacto
- © 2026 Eze Web Studio
- Volver arriba ↑

No slogans, CTA adicional, newsletter ni repetición de contacto.

---

## 10. Project data actual

Solo existe un registro aprobado:

- id: `fitness`
- category: `FITNESS`
- title: `Fuerza con método.`
- description: `Landing page para un gimnasio boutique.`
- URL: pendiente
- preview: pendiente

No crear proyectos 2–3 ficticios para satisfacer la paginación visual.

Los slots vacíos en Figma son intencionales.

No usar:

- stock;
- mockups inventados;
- imágenes generadas como filler;
- links falsos.

---

## 11. Estado de bloques de producción

### BLOCK 00 — Production Audit / Plan

**STATUS: CLOSED**

Se inspeccionó:

- repo;
- stack;
- Figma final;
- assets;
- riesgos;
- responsive;
- Hero effect options;
- blockers;
- estrategia de implementación.

Conclusiones principales:

- mantener React / Vite / Tailwind;
- no migrar infraestructura;
- reconstruir la landing V2 sobre Foundation;
- validar browser ↔ Figma por bloque;
- motion completo después de geometría;
- investigar riesgo técnico del Hero temprano.

### BLOCK 01 — Foundation

**STATUS: CLOSED / APPROVED**

Implementado:

- branch `feature/ews-v2-production`;
- baseline `npm ci` + `npm run check`;
- Inter local;
- tokens semánticos;
- typography;
- containers;
- primitives;
- navegación / anchors;
- estructuras de datos;
- metadata base;
- accesibilidad base;
- responsive foundation.

Validación reportada:

- lint/build correctos;
- Inter realmente renderizada 400/500/600;
- seis viewports;
- cero overflow;
- focus;
- skip link;
- reduced motion;
- preview de build;
- consola sin errores/warnings de aplicación.

Documento:

`docs/FOUNDATION.md`

No reabrir Foundation salvo regresión verificable.

### BLOCK 02 — Header + Hero

**STATUS: CLOSED / APPROVED FOR CONTINUATION**

Dirección aprobó continuar con las secciones el 30 de septiembre de 2026. El bloque queda cerrado para producción corriente. No reabrir ahora el Hero para pulido adicional de efectos; cualquier mejora no esencial de motion/atmósfera queda diferida a Block 08 — Motion o al QA final, salvo regresión verificable.

Commit: `bf6db14b11614a8f75d661190b29b5d86c9e2c5e`.

Implementado y validado:

- Header Desktop/Mobile y menú modal nativo sin librería;
- Hero Desktop/Mobile y grid DOM independiente;
- SVG estáticos exactos de Figma para horizonte, surface/body, rim, glow, estrellas e icono;
- static visual gate 1536/390: posiciones, wraps, CTAs, horizonte, grid y whitespace comparados contra Figma;
- glow ambiental nativo: Web Animations API, 16 s, opacity Desktop 1/0.88/1 y Mobile 1/0.94/1; rim/body inmóviles;
- reduced motion real: JS cancela animación, base estática completa con glow a opacity 1;
- suspensión fuera de pantalla / visibility, cleanup StrictMode y fallback sin Animation API/WebGL;
- responsive 390/430/768/1024/1280/1536, más 767/1199/1200; sin overflow;
- skip link, teclado, foco, Escape, cierre por destino, scroll lock y cierre Desktop;
- Chrome preview de build, fuentes/assets cargados, cero errores JS de aplicación, `npm run check` y `git diff --check` PASS.

MagicRings fue realmente probado en aislamiento y rechazado por corte angular/fade que apaga el horizonte y coste. ShaderGradient/Vanta no ejecutados, no declarados rechazados. Ganó solución SVG nativa permitida por el brief.

Dependencias nuevas: ninguna. Licencia nueva en producción: ninguna; SVG del diseño propio. Licencia MagicRings verificada: MIT + Commons Clause; candidato eliminado del producto.

Bundle before/after: JS 190.66 → 206.64 kB, gzip 60.09 → 63.96; CSS 36.77 → 38.79, gzip 7.79 → 8.40. Inter 352.24 kB sin cambios. Sin renderer/GPU loop propio ni rAF decorativo.

Archivos principales: `src/components/layout/Navbar.jsx`, `src/components/sections/{HeroSection,HeroBackground}.jsx`, `src/hooks/useHorizonGlow.js`, `src/styles/header-hero.css`, `src/data/hero.js`, `src/components/ui/ArrowUpRight.jsx`, `src/assets/hero/`, `src/App.jsx`, `src/index.css`.

Ajustes técnicos intencionales: Inter optical master fijo local al bloque para fidelidad; cajas de texto Desktop ajustadas a leading real de 168/68 px dentro de cajas Figma 170/70 sin alterar posiciones; crop horizontal del horizonte en Tablet; padding interpola para evitar salto 1199/1200. Header no sticky/fixed, offset 0 confirmado.

Documentación/evidencia: `docs/HEADER_HERO.md`, `docs/qa/block-02/`.

Blockers nuevos: ninguno. Mobile validado en Chrome con viewports y DPR 3; no se midió hardware físico. Favicon/OG siguen pendientes de asset aprobado.

Block 03 fue autorizado y está implementado; no reabrir Header/Hero salvo regresión verificable.

### BLOCK 03 — Problema + Solución

**STATUS: CLOSED / APPROVED FOR CONTINUATION**

Commit de implementación: `88196db865fc4ec14ec213873f4e6475a787e1f9`.

App explícito: Hero → ProblemSection → SolutionSection. Componentes en `src/components/sections/`, contenido en `src/data/{problem,solution}.js`, estilos locales en `src/styles/problem-solution.css`, diez SVG exactos en `src/assets/problem/`. Sin dependencia ni motion nuevo. Figma intacto.

Fuentes: Problema `44:40` / `169:6`; Solución `61:42` / `169:102`. Desktop mantiene cards/connectors/banner y composición editorial escalonada. Mobile mantiene secuencia vertical, gutters 24 y offsets 0/8/16; CONFIANZA 56/60 local. Glows CSS estáticos únicamente donde existen en los masters Desktop.

QA: Chrome preview, Inter local real y SVG decodificados, comparison Figma/browser en 1536/390, alturas maestras 1086/1188 y 941/858. 390/430/768/1024/1280/1536 más 767/1199/1200 sin overflow ni collisions. Semántica, skip link y text resizing comprobados. Hero coincide píxel por píxel con Block 02 en ambos masters; archivos protegidos sin cambios. npm run check y git diff --check PASS; sin errores JS nuevos.

Responsive: Mobile <768; proceso en dos columnas y Solución progresivamente abierta en 768–1199; cuatro cards y Desktop editorial ≥1200. Saltos de copy maestro se liberan entre 1200–1439; altura flexible para conservar contenido. Ajuste local de keywords <390 para lectura en 320. Cajas de texto usan leading real sin alterar las posiciones de Figma. Inter optical sizing fijo solo en estas secciones. No hay desviaciones creativas.

Bundle real before/after: JS 206.64 → 218.09 kB (gzip 63.96 → 66.44); CSS 40.44 → 49.59 (gzip 8.63 → 10.29). Inter 352.24 kB sin cambios. Sin renderer, rAF ni licencia/dependencia nueva.

Documentación: `docs/PROBLEM_SOLUTION.md`. Evidencia: cuatro renders maestros y dos capturas continuas en `docs/qa/block-03/`.

Blockers nuevos: ninguno. Favicon 404 preexistente, asset favicon/OG pendiente. Mobile validado por viewport Chrome, no dispositivo físico. Pendientes de contenido de bloques posteriores permanecen intactos.

Dirección aprobó continuar el 30 de septiembre de 2026. No reabrir Problema + Solución salvo regresión verificable.

Block 04 — Proyectos está CLOSED / APPROVED FOR CONTINUATION por Dirección.

### BLOCK 04 — Proyectos

**STATUS: CLOSED / APPROVED FOR CONTINUATION**

QA técnico de agente: npm run check y git diff --check PASS; build preview HTTP 200. El entorno de agentes no puede ejecutar browser QA de forma confiable. Dirección confirmó que el QA visual/browser de este proyecto lo realiza Eze manualmente y aprobó continuar. Esta limitación deja de ser blocker de cierre para agentes. Detalle técnico del intento queda en docs/PROJECTS.md y docs/qa/block-04/README.md.

Base: `74c85a17836fb28561f5ea01087c20f839c18f16`. SHA de implementación: `b0fc13568dbc7176b982dab68b7b7697780941ea`.

Implementado: ProjectsSection explícito después de Solución, src/styles/projects.css, src/hooks/useProjectCarousel.js, copy aprobado en src/data/projects.js y siete SVG exactos locales en src/assets/projects/. Figma 73:42 / 183:6 inspeccionado con metadata, design context, screenshot y propiedades internas; no modificado.

Desktop mantiene cuatro slots visuales asimétricos; Mobile viewport/peek y controles 44. Dataset real = **1** (fitness); proyectos 2–3, URLs y previews PENDING. Slots vacíos decorativos, aria-hidden, sin falsos articles/imágenes/copy. Pagination real **01 / 01** (desviación intencional de 01 / 03 del master). Anterior/siguiente y VER PROYECTO disabled nativos mientras no existan destinos reales.

Un activeIndex compartido; arquitectura nativa preparada para más registros, scroll-snap Mobile/Transition, scrollend con fallback, botones/teclado, ResizeObserver, reduced-motion y cleanup. Sin autoplay ni dependencia/motion ornamental nuevo. Mobile <768, transición 768–1199, Desktop ≥1200. No se cambiaron componentes/estilos/assets protegidos.

PASS: npm run check, git diff --check y verificación SSR de datos/semántica/disabled/no fake links, más rama multi-registro mediante fixture estructural aislado no publicado. Bundle JS 218.09 → 227.53 kB (gzip 66.44 → 68.35), CSS 49.59 → 57.03 (gzip 10.29 → 11.65), Inter 352.24 sin cambios.

**QA browser del agente no realizado** en Block 04; los intentos históricos y verificaciones están en docs/PROJECTS.md y docs/qa/block-04/README.md. Dirección trasladó el QA visual/browser a Eze y aprobó continuar. La limitación del entorno no es un blocker actual de cierre técnico. No se fabricaron PNG de evidencia.

### BLOCK 05 — About + FAQ

**STATUS: CLOSED / APPROVED FOR CONTINUATION**

Base: `e5b7cf05d471b96396db4ecd65cad545fae88cae`. Commit de implementación: `3ebf81a51327063fd6055951adf1ba33aabf2a4e`.

Componentes: `src/components/sections/{AboutSection,FAQSection}.jsx`. Data: `src/data/about.js` y `src/data/faq.js`. Estilos locales: `src/styles/about-faq.css`. Assets: cuatro SVG exactos PLUS/MINUS Desktop/Mobile en `src/assets/faq/`. App explícito después de Projects; import en index.css. Foundation y componentes/hooks/estilos/assets de Blocks 01–04 intactos. Sin dependencia ni motion nuevo; Contacto/Footer corresponden exclusivamente a Block 06.

Figma inspeccionado sin modificar: About `81:45` / `183:44`; FAQ `89:45` / `191:9`, metadata, design context, renders, propiedades internas, styles y geometría. About split editorial Desktop con divider Strong y grid propio; stack Mobile con pausa/divisor 32 × 1. FAQ header izquierdo/lista derecha Desktop, stack Mobile. Tokens tipográficos y colores existentes. Mobile <768, Transition 768–1199 en stack, Desktop ≥1200 en split; contenido en flujo/alturas mínimas, sin recorte de texto.

Copy intencional: About secondary usa **“en cada proyecto”** del brief vigente/CURRENT_STATE, por prioridad de Dirección, aunque Figma aún dice **“sobre cada proyecto”**. Resto del copy aprobado exacto.

Un único openId; FAQ 01 abierto inicialmente y funcional. FAQ 02–05 CLOSED y disabled nativos mientras answer sea null; sin panel vacío ni falsa respuesta. Se habilitan automáticamente al cargar una respuesta aprobada no vacía. h2/h3/button, aria-expanded/controls, paneles asociados y hidden, IDs useId, focus-visible heredado, touch target ≥44. Sin motion nuevo.

QA técnico PASS: baseline y final npm run check (lint/build), git diff --check, interacción real React DOM en JSDOM (abrir/cerrar/null/disabled/single-open/hidden/foco DOM/IDs/unmount, sin React warnings), fixture aislado multi-answer fuera del producto y composición App/semántica/copy. Respuestas 02–05 conservan null. Revisión responsive por código en 390/430/768/1024/1280/1536 más 767/1199/1200; geometría calculada, no medida en navegador. Cuatro SVG válidos y resueltos por build.

Bundle JS 227.53 → 232.93 kB (gzip 68.35 → 69.56); CSS 57.03 → 62.58 (gzip 11.65 → 12.59); Inter 352.24 sin cambios. package.json/lockfile intactos.

Documentación: `docs/ABOUT_FAQ.md`. La revisión visual manual de Eze y aprobación de Dirección quedaron registradas en la actualización previa de continuidad; no se declaró comparación browser ↔ Figma ni se fabricaron screenshots. Respuestas FAQ 02–05 siguen pendientes de aprobación. Dirección cerró/aprobó Block 05 y autorizó Block 06. About + FAQ permanecen protegidos.

### BLOCK 06 — Contact + Footer

**STATUS: CLOSED / APPROVED FOR CONTINUATION**

Base limpia: `5d888e2c448e87613c7a1cd98c0149fadae79b71`. Commit de implementación: `e2d09e1510299568396369c00092d8dc21a240db`.

Componentes: nuevo `src/components/sections/ContactSection.jsx`, Footer existente adaptado en `src/components/layout/Footer.jsx`. Contacto dentro de main después de FAQ, Footer fuera de main; App explícito, estilos locales `src/styles/contact-footer.css` importados desde index.css. Dos SVG exactos Desktop/Mobile en `src/assets/contact/`. Copy/labels y destinos en `src/data/contact.js`; footerNavigation reutiliza anchors de navigation.js; wordmark/copyright/label de volver arriba en siteConfig. Exports y valores previos compartidos intactos.

Figma inspeccionado sin modificar: Contacto `95:66` / `191:46`; Footer `99:66` / `191:71`. Metadata, design context, renders y propiedades internas/styles/geometry. Contacto split editorial con divider Strong, CTA tipográfica y grid Default propio Desktop; stack con grid Subtle Mobile. Footer conserva aire 864 Desktop, regla, wordmark/nav horizontal y bottom en extremos; Mobile 470 con nav vertical/targets 44 y back-to-top 101 × 44. Se reutilizan tokens y typography de Foundation; sin motion, formulario, cards, efectos ni dependencia nuevos.

Destinos: email real `mailto:hola@ezewebstudio.com`; HABLEMOS disabled nativo sin href mientras externalCtaUrl siga null; Instagram texto no clickable mientras instagramUrl siga null. Cuando se aprueben URLs en data, se renderizan anchors externos seguros. Sin destinos inventados ni cambios a Header/Hero. Todos los anchors #inicio/#proyectos/#estudio/#faq/#contacto existen y son únicos. Smooth scroll/offset/reduced-motion de Foundation intactos.

Responsive por código en 390/430/768/1024/1280/1536, bordes 767/768 y 1199/1200, más mínimo 320. Mobile/Transition stack hasta 1200; gutters/fluid type existentes y ancho CTA progresivo en Transition. CTA Desktop estrecho interpola localmente 56 → 64 a 1536 para evitar colisión con arrow; sin cambiar token. Contenido en flujo, min-height y wrapping. Presupuesto de widths/colisiones calculado, no medido en browser.

QA técnico PASS: baseline/final npm run check (lint/build), git diff --check, React DOM/JSDOM/SSR (mailto/foco DOM, disabled/sin href, Instagram texto, fixture seguro de URLs futuras solo en memoria, App/footer/anchors/IDs/pending data/unmount), sin React warnings detectados. XML/root geometry de SVG válidos; imports build correctos. Componentes/hooks/CSS/assets/data de secciones Blocks 01–05 intactos; package.json/lockfile intactos.

Bundle JS 232.93 → 238.12 kB (gzip 69.56 → 70.46), CSS 62.58 → 70.76 (gzip 12.59 → 13.76), Inter 352.24 sin cambios.

Documentación: `docs/CONTACT_FOOTER.md`. QA visual/browser final, consola real, teclado físico, overflow y continuidad FAQ → Contacto → Footer pendientes de Eze; no comparación browser ↔ Figma ni screenshots fabricados. Instagram/HABLEMOS siguen null y pendientes anteriores permanecen. Dirección aprobó continuidad de Blocks 01–06 en la autorización vigente de Block 07; esta pasada sistémica actualiza sus contratos Desktop y fondos. El detalle anterior queda como baseline histórico.

### BLOCK 07 — Desktop Production Reimplementation

**STATUS: IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA**

Source of truth inspeccionado: 02B page `239:10`, master `239:11`, sección Hero `242:66`, Problem `242:118`, Solution `242:172`, Projects `242:196`, About `242:238`, FAQ `242:252`, Contact `242:287`, Footer `242:309`. Metadata + design context + renders revisados; auxiliaries Hero1366/1920 y Solution1366 revisados. 02 Desktop histórico no gobierna geometría. 03 Mobile FINAL/FROZEN intacto. El coherence pass `1f8ef0ab69823d2f3564bf2cbe4b2af2724b2698` permanece VISUALLY REJECTED / SUPERSEDED.

Implementación: eliminado `desktop-coherence.css` y su import; reemplazados los bloques Desktop históricos en estilos de sección. Typography fija Production64/72,88/94,54/62,56/64,48/56,44/54,20/30,24/32. Container1280; siete escenas min-height100svh con contenido en flujo; Footer natural384 en referencia. Grids siguen eliminados; Background #050708 salvo About #0A1119. Proyectos activo540×365 y preview/info/CTA sobre x720; runtime01/01, disabled/nulls conservados.

Archivos: styles header-hero/problem-solution/projects/about-faq/contact-footer/typography/primitives, index.css, HeroBackground, ProjectsSection; seis SVG locales Production horizon/exportados read-only porque el crop histórico no reproducía02B. Mobile/Transition assets originales intactos; glows Problem/Solution/Projects reencuadrados según propiedades02B. No paths/estilos/nodos Figma editados, renderer nuevo ni motion.

Responsive:1366×768 container1270/m48,1440×900 container1280/m80 canónico,1536×864 m128 sin ampliar tipo,1920×1080 m320 con crop Hero auxiliar. Spacing/local preview heights reducen aire en pantallas cortas; no zoom/global scale/page snap. Mobile reglas intactas; Tablet stacking intacto y tipografía converge a Production. About runtime “en cada proyecto” conservado frente a “sobre” en Figma.

QA técnico PASS: npm run check (baseline/final lint/build), git diff --check, preview/entry HTTP200, React SSR estructura/IDs/grids/10stars/4steps/3features/real-project-disabled/FAQ-null/mailto. SVGs válidos, CSS Mobile/Transition comparado, widths calculados1200/1280 y cuatro checkpoints. App/data/hooks/Navbar/FAQ/Contact/package/lockfile intactos. No browser visual PASS, consola real ni screenshots fabricados; Eze valida geometría final/overflow/zoom/interacción.

Bundle JS235.66 →241.88kB (gzip70.22 →70.99), CSS70.65 →67.57 (gzip14.08 →13.43); fuente intacta. Sin dependencias nuevas. Pendientes de contenido existentes conservados.

Documentación: `docs/DESKTOP_PRODUCTION_IMPLEMENTATION.md`. Un único commit de implementación identificado por título `feat: implement 02B Desktop Production`, sobre base `61b4a84d13dc655b9e0a3657aa1775aff6e858f4`; resolver SHA con `git log -1 --format=%H --grep='^feat: implement 02B Desktop Production$'` (SHA real en reporte final, sin commit documental extra/autoreferencia).

Próxima acción: QA visual/browser de Eze y aprobación de Dirección. **No APPROVED/FINAL/FROZEN web; Block08 no autorizado.**

### BLOCK 08 — Motion

**STATUS: PENDING**

Revisar únicamente la solución ganadora nativa del Hero ya integrada en Block 02; no introducir otro renderer por defecto. Motion de la landing completa sigue pendiente.

Motion general:

- sutil;
- corto;
- ambiental;
- sin movimiento decorativo gratuito.

No reveal global por defecto.

### BLOCK 09 — Accessibility + Performance

**STATUS: PENDING**

- teclado;
- focus;
- semántica;
- targets;
- contraste;
- fuentes/assets;
- CLS;
- bundle;
- GPU / DPR del Hero si aplica;
- reduced-motion real;
- cleanup.

### BLOCK 10 — Final Visual QA

**STATUS: PENDING**

Comparación completa browser ↔ Figma.

Validar:

- Desktop;
- Mobile;
- interacciones;
- reload;
- assets;
- preview build;
- consola;
- `npm run check`;
- regresiones.

Solo después puede declararse Production FINAL / FROZEN.

---

## 12. Hero effect research / decisión técnica vigente

**Solución seleccionada y validada en Block 02: SVG exactos + Web Animations API nativa únicamente para opacity del glow.** Grid DOM estático, rim y body inmóviles. Sin dependencia, canvas ni renderer WebGL. CSS/JS no cambia silueta ni añade decoraciones. Detalle y mediciones: `docs/HEADER_HERO.md`.

Policy FREE / OPEN SOURCE FIRST respetada. Primera prueba real: React Bits FREE / MagicRings, en spike aislado.

MagicRings: **REJECTED**. Configuración controlada de un anillo cyan, scaleRate/noise/mouse/burst/parallax apagados. El corte angular del primer anillo y su fade cíclico apagan el horizonte; Mobile no conserva el arco. Corregirlo requeriría reescribir sustancialmente el shader. Spike JS completo 751.57 kB / gzip 201.87. Licencia verificada MIT + Commons Clause; Three.js MIT. Ninguna dependencia/código del spike permanece en producción.

ShaderGradient y Vanta no se probaron; no son opciones rechazadas. La alternativa SVG nativa explícitamente permitida ganó sin requerir otros renderers.

No reabrir búsqueda de librerías salvo regresión verificable o nueva decisión de Dirección. No convertir el Hero en un orb, aurora, ring de catálogo ni superficie diferente.

---

## 13. Reglas de Hero motion

Desktop:

- respiración lenta del glow;
- variación mínima de luminosidad;
- niebla/halo muy sutil;
- grid prácticamente estático;
- partículas solo si demuestran valor.

Mobile:

- menor carga;
- sin cursor interaction;
- glow/horizonte más simple;
- partículas reducidas o eliminadas.

`prefers-reduced-motion: reduce`:

- no loops decorativos activos;
- fondo estático completo;
- glow base preservado;
- ninguna información depende de motion.

Hero no debe tener:

- parallax gratuito;
- headline flotando;
- CTAs animándose constantemente;
- mouse-follow evidente;
- estética gamer;
- shader default reconocible.

---

## 14. Gate obligatorio de cada bloque

La validación completa sigue **IMPLEMENT → RENDER → COMPARE → CORRECT → RESPONSIVE CHECK → CLOSE**.

Por decisión vigente de Dirección, el agente realiza implementación fiel desde Figma y QA técnico/estructural disponible: npm run check, git diff --check, semántica, datos reales, interacción automatizable y responsive por código. Entrega **IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA** cuando esos controles pasan. La imposibilidad conocida de abrir Chrome/localhost no bloquea esa entrega técnica ni exige nuevos intentos de sandbox.

Eze realiza el QA visual/browser final: fonts/assets cargados, estado maestro de componentes, motion detenido durante QA geométrico, comparación con Figma, corrección de discrepancias materiales, viewports/bordes, teclado/foco, consola y continuidad de página. Dirección aprueba/cierra el bloque y autoriza el siguiente. No inventar screenshots ni declarar comparaciones no realizadas.

Diferencias de antialiasing no justifican cambiar geometría. El cierre técnico no equivale a Production FINAL / FROZEN.

---

## 15. Pendientes reales / blockers

Estos puntos NO bloquean Header + Hero.

Sí deben resolverse antes de cerrar sus bloques funcionales correspondientes.

### Contacto

- destino externo final de HABLEMOS: **PENDING**
- email: aprobado
- Instagram handle: aprobado
- Instagram canonical URL: **PENDING**

### FAQ

- respuesta 1: aprobada
- respuestas 2–5: **PENDING**

### Proyectos

- proyecto 1: aprobado parcialmente
- URL proyecto 1: **PENDING**
- proyectos 2–3: **PENDING**
- URLs 2–3: **PENDING**
- previews reales: **PENDING**

No resolver pendientes inventando contenido.

---

## 16. Assets

Estado actual:

- wordmark: tipográfico;
- Inter: local en repo;
- iconografía aprobada: existe en Figma, exportar exacta cuando cada bloque la necesite;
- Hero: SVG exactos de Figma locales en `src/assets/hero/`, incluyendo horizontes Desktop/Mobile y arrow; sin URLs temporales;
- Proyectos: siete SVG exactos locales en `src/assets/projects/`, glows/flechas; previews de proyectos no existen en repo;
- FAQ: cuatro SVG exactos PLUS/MINUS Desktop/Mobile locales en `src/assets/faq/`; About no agrega assets;
- Contacto: dos SVG exactos Arrow Right Desktop/Mobile locales en `src/assets/contact/`, incluyendo stroke bounds Mobile; Footer no agrega assets;
- favicon / OG visual: pendientes de asset aprobado.

Al exportar desde Figma:

- guardar assets locales;
- no conservar URLs temporales;
- no sustituir iconos por alternativas “parecidas” si existe vector aprobado.

---

## 17. Reglas de arquitectura

Mantener:

- `App.jsx` explícito;
- componentes por responsabilidad;
- data modules simples;
- tokens compartidos;
- CSS/Tailwind v4 coherente;
- HTML semántico.

No crear:

- page builder;
- section registry;
- router innecesario;
- CMS;
- mega config;
- componentes genéricos que obliguen a deformar Figma;
- abstracciones sin reutilización real.

`src/examples` es opt-in y no es la landing V2.

No importar `exampleContent` al producto.

---

## 18. Reglas para dependencias

No instalar una dependencia por anticipación.

Antes de adoptar una nueva:

1. problema concreto;
2. spike real;
3. fidelidad superior;
4. licencia compatible;
5. coste razonable;
6. mobile aceptable;
7. reduced-motion;
8. cleanup correcto;
9. queda realmente usada.

Una librería descartada no permanece en `package.json`.

---

## 19. Riesgos ya identificados

### Hero

El mayor riesgo técnico/visual.

No aceptar un orb, aurora o anillo genérico que cambie la silueta aprobada.

### Tipografía

Inter define wraps y geometría. Ya está instalada. Evitar fallback o sustituciones.

### Solución

Escalas grandes y offsets requieren control. No normalizar CONFIANZA Mobile.

### Containers

Wide/Content no deben borrar excepciones locales.

### Carousel

Slots visuales no equivalen automáticamente a número de proyectos.

### Mobile menu

Cuidar foco, scroll lock, Escape y cambio de breakpoint.

### FAQ

Respuestas 2–5 todavía no existen. No fijar altura con contenido falso.

### WebGL

Si se adopta:

- CSS reduced-motion no basta;
- controlar requestAnimationFrame;
- DPR;
- resize;
- visibility;
- context lost;
- cleanup;
- StrictMode.

---

## 20. Qué NO tocar sin motivo

No reabrir:

- Desktop;
- Mobile;
- Visual System;
- Foundation.

No cambiar:

- copy aprobado;
- orden de secciones;
- colores;
- tipografía;
- composición;
- iconografía;
- grid;
- excepciones intencionales.

No agregar:

- nuevas secciones;
- nuevos slogans;
- effects “porque quedan bien”;
- placeholders ficticios;
- proyectos inventados;
- contenido SEO visible no aprobado.

Si aparece un problema real no resuelto por Figma:

reportar:

- LOCATION;
- OBSERVED PROBLEM;
- WHY CURRENT SOURCES DO NOT RESOLVE IT;
- MINIMUM TECHNICAL OPTIONS;
- RECOMMENDATION.

Dirección decide.

---

## 21. Definition of done global

Eze Web Studio V2 solo puede considerarse Production FINAL / FROZEN cuando:

- los bloques 01–10 estén cerrados;
- Desktop y Mobile reproduzcan Figma con fidelidad;
- responsive intermedio sea robusto;
- Header/menu funcionen;
- Hero motion tenga fallback y reduced-motion;
- carousel funcione;
- FAQ funcione;
- destinos reales estén definidos;
- assets reales estén integrados;
- accesibilidad básica pase;
- performance sea razonable;
- consola esté limpia;
- `npm run check` pase;
- build preview haya sido revisado;
- no existan blockers de contenido publicados como filler.

---

## Manual QA consolidado — 2 de octubre de 2026

Eze completó esta pasada de QA visual/browser y consolidó los hallazgos prioritarios en:

`docs/qa/MANUAL_QA_2026-10-02.md`

Los hallazgos del QA manual llevaron a una recomposición específica en Figma. `02B — Desktop Production` resuelve ahora la escala, densidad, backgrounds, grid, Footer y alineación de Proyectos y reemplaza la interpretación libre del coherence pass. Motion permanece bloqueado hasta implementar y aprobar 02B.

---

## Mobile viewport framing — QA follow-up

Durante el QA manual posterior a la reimplementación Desktop desde 02B, Eze detectó un issue sistémico Mobile: en dispositivos más altos que el master 390×844 algunas secciones cortas pueden terminar antes del viewport y dejar visible la sección siguiente.

Decisión vigente:
- Hero, Problema, Solución, Proyectos, About, FAQ y Contacto deben ocupar **como mínimo un viewport Mobile completo**;
- usar min-height/min-block-size viewport-aware y permitir crecimiento natural;
- no fijar height exacto, no cortar contenido y no introducir scroll-snap;
- Footer conserva altura natural;
- Mobile debe validarse también por altura real de dispositivo, no solo por ancho.

Hallazgo detallado en `docs/qa/MANUAL_QA_2026-10-02.md` — Hallazgo 07.

**MOBILE VIEWPORT FRAMING — IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA**

Implementado sobre baseline limpio/sincronizado `8f0184826ba11259d936d18692421f8e169e67a2`. Contrato común en primitives.css limitado a <768: min-block-size100svh,100dvh si soportado, en los siete section roots. Eliminados mínimos Mobile844/753/936/754; wrappers crecen naturalmente. Hero conserva390×844 y reduce solo aire en alturas menores; horizonte bottom:0 y assets intactos. Footer excluido, reglas existentes intactas. No cambios Tablet/Desktop02B, contenido, componentes/hooks, assets, typography, navegación, motion o dependencias. 03 Mobile permanece FINAL/FROZEN; no Mobile redesign.

Archivos: `src/styles/{primitives,header-hero,about-faq,contact-footer}.css`, este documento y `docs/MOBILE_VIEWPORT_FRAMING.md`. QA técnico: npm run check baseline/final PASS, git diff --check PASS; AST CSS comprueba siete raíces, scope Mobile, media blocks Tablet/Desktop idénticos, reglas Footer/horizonte idénticas. Cálculos preparados para360×800/390×844/393×873/430×932; browser/zoom/chrome/section-start QA pendiente de Eze, sin screenshots ni browser PASS fabricados.

Commit único identificado por `fix: frame mobile sections to the visible viewport`; resolver SHA con `git log -1 --format=%H --grep='^fix: frame mobile sections to the visible viewport$'` (SHA real en reporte final, sin segundo commit documental). Próxima acción: revisión visual Eze; no iniciar Motion ni pulido Desktop. Pendientes de contenido anteriores conservados.

---

## 22. Próximo trabajo autorizado

Blocks 01–06: **CLOSED / APPROVED FOR CONTINUATION**.

### PRODUCTION BLOCK 07 — DESKTOP PRODUCTION REIMPLEMENTATION

Status: **IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA**.

SOURCE OF TRUTH:
- Desktop: Figma `02B — Desktop Production` page `239:10`.
- Canonical master: `Desktop Production Master — 1440`, node `239:11`, 1440×6684.
- Section masters: siete escenas de 1440×900 + Footer 1440×384.
- Mobile: `03 — Mobile` permanece FINAL / FROZEN.
- `02 — Desktop` histórico NO manda en producción.

El coherence pass anterior quedó eliminado del CSS activo. Implementación desde02B completada; detalle en `docs/DESKTOP_PRODUCTION_IMPLEMENTATION.md`. Próxima acción: Eze compara el browser real con el canonical1440×900 y checkpoints antes de aprobar continuidad.

Reglas obligatorias:
- implementar escala Production exacta y relaciones del master;
- no usar zoom ni transform scale global;
- no restaurar grid decorativo;
- Background #050708 salvo About #0A1119;
- Footer natural de referencia 384px a 1440×900;
- Proyectos alineado sobre eje central aprobado;
- runtime Projects = 01/01 con dataset actual aunque Figma muestre 01/03 como estado final futuro;
- responsive checkpoints: 1366×768, 1440×900, 1536×864, 1920×1080;
- Mobile no se rediseña;
- QA visual/browser final lo realiza Eze.

Estado de entrega del agente: **IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA**.
No iniciar Block 08 — Motion.

---

## 23. Regla de mantenimiento de este archivo

Al cerrar cada bloque, el agente responsable debe actualizar:

- fecha;
- estado del bloque;
- commit SHA;
- archivos principales;
- decisiones nuevas;
- desviaciones intencionales;
- validaciones realizadas;
- dependencias agregadas / rechazadas;
- blockers resueltos / nuevos;
- próximo bloque autorizado.

Mantener este documento como snapshot actual, no como diario infinito.

Los detalles exhaustivos de un bloque pueden vivir en un documento específico, pero este archivo siempre debe permitir que otro agente entienda en pocos minutos:

**dónde estamos, qué está cerrado, qué no debe tocar, qué falta y qué sigue.**
