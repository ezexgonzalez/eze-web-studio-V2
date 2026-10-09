# Eze Web Studio V2 — Current Production State

> Documento canónico de continuidad para todos los agentes que trabajen sobre Eze Web Studio V2.
>
> **Leer este archivo antes de iniciar cualquier bloque de producción.**
>
> Última actualización: 8 de octubre de 2026.

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

Stack: React 19 / ReactDOM 19 / Vite 8 / Tailwind 4 / ESLint / JavaScript JSX. Sin router, CMS, page builder, registry, librería de carrusel/iconos ni Three.js. Block08H integra Motion + SVG held/plume y una partícula tsParticles nativa en el Hero, con fallback estático; OGL/WebGL anteriores retirados.

Runtime dependencies actuales: `react`, `react-dom`, `motion@14.0.0`, `@tsparticles/{engine,react,slim}@4.4.0`. Sin nueva dependencia en08H.

`App.jsx` compone explícitamente shell, skip link, `Navbar`, `main#main-content` y `HeroSection` → `ProblemSection` → `SolutionSection` → `ProjectsSection` → `AboutSection` → `FAQSection` → `ContactSection`; `Footer` es sibling de main para conservar el landmark de pie de página.

**Header Desktop/Mobile, Mobile Navigation Open y Hero Desktop/Mobile están implementados y validados.**

Problema y Solución, Proyectos y About + FAQ están CLOSED / APPROVED FOR CONTINUATION. Contacto + Footer completó implementación y el QA manual global de Eze detectó issues sistémicos que pasan al Block 07. Todas las secciones están montadas; Desktop fue reimplementado desde 02B y las secciones afectadas fueron recompuestas desde 02C Desktop Fit en 08L, con correcciones Desktop de Dirección en 08M (READY FOR EZE VISUAL QA); la implementación web todavía no es Production FINAL / FROZEN.

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
- `02C — Desktop Fit` (`266:94`) → CURRENT GEOMETRY SOURCE for 08L modified Desktop sections; master `266:95`1440×5256, compact `268:66`1366×5124; dirección aprobada, implementación pendiente de QA visual Eze;
- `02B — Desktop Production` (`239:10`, master `239:11`) → historical geometry for modified sections; Projects remains FROZEN in its existing implementation;
- `03 — Mobile` → FINAL / FROZEN;
- `04 — Final Handoff` → READY FOR PRODUCTION.

Viewports maestros:

- Desktop Fit 02C: Hero900, Problem768, Solution768, Projects900, About512, FAQ624, Contact560, Footer224; master **1440×5256**. Referencias de composición, no alturas runtime fijas;
- Excepciones Desktop de Dirección en 08M: Problema y Solución recuperan mínimo 100svh con escala compacta; About alinea su título con FAQ; Footer reduce solo tipografía local y conserva altura/divisor. Estas decisiones prevalecen sobre 02C.
- Desktop02B historical:1440×6684;
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

Dirección autorizó Block08 sobre esta geometría protegida. La web global no se declara FINAL/FROZEN; revisión visual y cierre definitivo siguen a cargo de Eze.

### BLOCK 08C — Hero Motion Polish / Living Arc Behavior

**STATUS: REJECTED BY EZE — VISUAL LIFE STILL INSUFFICIENT**

Baseline `924e1ba2225abb255e2d63674ecce27b5490e9fe` (08B). Eze confirmed the diffuse arc direction is much closer; motion/interaction/particles still NOT APPROVED.08C retains that look and polishes behavior, not concept/layout.

Exact path guides, band widths/blurs/base alpha, surface fills/assets, crop/filter160px padding, layout/copy/type/Header/CTA/heights/Mobile framing unchanged. One Motion clock now drives independent density shimmer, narrower live gradient spacing, mist+halo drift and calm breathing. Continuous accumulated time avoids clock lap resets. Desktop local pointer radius180, soft drift up to9units, alpha.68 and380ms recovery; Mobile no pointer.

React Bits/OGL particle field retains70/28 and DPR1.5/1. Replaced solid dot profile with diffuse elongated light specks in arc cyan/soft cyan-white; minimum nonzero independent drift plus tiny depth-aware/screen motion. Speed1.05/.72, sprite input160/120 but footprint capped5–14 CSS px including halo; layer opacity.55/.4. Ten fixed fallback stars intentionally faint18% only while atmosphere runs, normal in reduce/inactive/failure. No new dependency/engine/filter system.

Reduced/hidden/offscreen/failed state restores static diffuse composition and cancels live controllers/resources. Clock-init failure restores all SVG attributes. Existing OGL failure latch and resource cleanup preserved. Assets/data/other sections/package/lockfile unchanged.

Files: effects HeroLightArc/HeroParticles/livingArcMotion/new arcMotionState, HeroBackground, header-hero.css, vendor particles, docs HERO_MOTION/HEADER_HERO/CURRENT_STATE. Commit identified by `fix: polish living Hero arc and luminous dust behavior`; resolver `git log -1 --format=%H --grep='^fix: polish living Hero arc and luminous dust behavior$'`; actual SHA delivered in report.

QA technical PASS: npm run check/git diff --check; SSR/controller assertions for static fallback/IDs/stars/exact guides,3/5s field changes, pointer recovery/cleanup and clock failure; actual Motion callbacks/stop in timer-backed Node RAF; OGL-stub5s time advance/counts/DPR/single RAF/disposal; protected layout checks. No real browser visual/GPU PASS. Eze checks Desktop1366×768/1440×900/1536×864/1920×1080 and Mobile360×800/390×844/393×873/430×932. Success criteria remain pending visual review. Details `docs/HERO_MOTION.md`.

Next: Eze visual QA / Direction decision. No later-section motion or Block09.

### BLOCK 08D — Hero Motion Architecture Correction

**STATUS: REJECTED BY EZE — EFFECTS STILL APPEAR STATIC IN REAL BROWSER**

08C permanece **REJECTED BY EZE** (`219c7846384e2bd7e3a7411b12775232b7a36e7e`). El LOOK difuso fue aprobado; su arquitectura de motion fue rechazada. Baseline limpio/sincronizado `c1b864ad68fe7e715eea77b7e5d47c4c060c5d18`; npm run check inicial PASS.

Reemplazados el shader/adapter React Bits/OGL y Motion-clock/traslaciones/copiapath por dos propietarios claros: tsParticles React/engine/slim4.4.0 (MIT, peer React19 compatible) para dust nativo y Motion + SVG turbulence/displacement para el arco. Eliminados OGL, vendor React Bits, LivingArcMotion, livingArcMotion y arcMotionState. HeroLightArc conserva paths, bandas difusas, gradient/base alpha y fallback blur-only; no hard rim.

Dust: tres sprites locales cyan suaves,60 Desktop /24 Mobile–Transition, movimiento nativo independiente .45–.9/.25–.5, opacity/size animados, hover repulse110px moderado Desktop fine-pointer. DPR nativo hasta1.5 Desktop (altoDPR usa1), Mobile1; FPS60/30. Provider estable y cargas serializadas con host/id por montaje impiden que un load tardío destruya al sucesor. Un canvas2D, sin WebGL.

Arco: ruido fractal una octava por banda; Motion anima frecuencia/flujo y displacement mist80–132, halo38–68, core12–24; Mobile34–58/18–32/6–12. Pointer local con máscara radial440 y mapa neutro fuera del radio220; springs de Motion deforman el campo, no trasladan una copia. Recuperación aproximada1s. Padding256 y región live visible+padding evitan corte interno y coste de toda la elipse fuera de pantalla. Sin cambios de crop/layout ni touch handlers Mobile.

Reduced/hidden/offscreen desmontan ambos efectos y restauran filtros estáticos; fallos de partículas/arco independientes. Estrellas originales completas hasta particle-ready y ante fallo; nunca dependen de efectos el contenido/CTA. Hook de preferencias intacto. Seis animaciones idle comparten scheduler Motion, separado del único scheduler nativo de partículas; cero RAFs propios.

Archivos: effects HeroAtmosphere/HeroParticles/HeroLightArc/ArcDisplacement/arcDisplacement/heroParticleOptions, HeroBackground, tres sprites light-dust, package/lockfile, notices, docs HERO_MOTION/CURRENT_STATE; eliminaciones anteriores. **Todas las hojas CSS, body assets, App, data, hooks, otros componentes y geometría Desktop02B/Mobile03 permanecen intactos.**

Validación técnica: npm run check y git diff --check PASS; SSR/static/IDs/path guides; plugins/opciones nativas4.4 (incluye corrección de nombres preload únicos); Motion spring/cleanup real en harness Node, no render visual. Browser/percepción/console/FPS pendientes de Eze: observar3–5s idle y pointer/recovery en1366×768/1440×900/1536×864/1920×1080, Mobile360×800/390×844/393×873/430×932. Los tests técnicos no prueban aprobación visual.

Bundle inicial236.02→237.49kB (gzip71.43→72.04); Hero lazy completo109.34→214.29kB (gzip36.28→70.40), CSS67.22/gzip13.44 intacto. tsParticles aislado211.48/gzip64.89 con React external; no sumarlo al build. Detalle en `docs/HERO_MOTION.md`. No avance a Block09. Pendientes reales de contenido anteriores intactos. Commit único identificado por `fix: replace Hero motion with native dust and SVG displacement`; resolver SHA con `git log -1 --format=%H --grep='^fix: replace Hero motion with native dust and SVG displacement$'` (SHA completo en reporte final, sin segundo commit documental/autorreferencia).

---


### BLOCK 08E — Hero Motion Lab / Runtime Proof

**STATUS: HERO MOTION LAB — READY FOR EZE INTERACTIVE TUNING**

08D is rejected after real-browser QA. The approved diffuse LOOK remains. The problem is now treated as a runtime/proof problem, not another tuning problem.

Concrete findings from repo review:
- screenshot still shows approximately the original fixed-star count, not a clearly visible 60-particle field;
- current tsParticles integration does not follow the official React wrapper pattern and manually calls `tsParticles.load({ id, element, options })`; official v4 guidance uses a real target id or the official `Particles` component/provider lifecycle;
- current code silently falls back on particle or arc failures, making a broken live effect look identical to the static approved Hero;
- arc runtime also silently exits/falls back if its feature gate or filter setup fails;
- therefore technical tests can pass while the browser shows no motion.

New rule: no more 20–30 minute production passes without visible runtime proof.

08E entrega un Lab temporal exclusivamente con `npm run dev` + `?heroLab=1`; preview/deploy no lo activan. Panel fuera del aria-hidden/clipping del fondo: PARTICLES/ARC LOADING–RUNNING–FAILED, POINTER ACTIVE–INACTIVE, reduced motion ON–OFF, viewport, PAUSED explícito por visibilidad/reduce y errores completos. Canvas/count/DPR/travel y filtros reales visibles; timeout8s y stall3s reportados. RUNNING no equivale a aprobación visual.

Flujo Lab único oficial4.4: ParticlesProvider + Particles, init estable, sin engine.load/hosts manuales. Preset60, speed2.5–4, opacity.35–.8, size3–7, repulse200/strength4; círculos cyan nativos deliberadamente claros para aislar rendering/movimiento. Arco conserva geometría/colores/bandas: displacement200–260/100–160/40–70, noise5×, radius350, local500, spring~.8s. Componentes/config/controller Lab separados; normal08D no monta en paralelo ni cambia fuera del switch.

Sliders completos, checkboxes de confirmación visual, reset/retry y export JSON seleccionable. Sin guardar valores finales/localStorage ni integrar ajustes. Reduced motion bloquea efectos y lo explica; errores de provider/React/async/filtros/runtime visibles, nunca fallback silencioso. Mobile producción y demás secciones protegidos.

Baseline sincronizado `e443dc009c2ba7d946d23dfb7ff7fea73739a126`; npm run check baseline/final y git diff --check PASS; dev HTTP/module transforms y parsing nativo4.4 PASS; bundle producción sin Lab UI/imports/CSS. No browser/perceptual PASS: Eze realiza prueba real. Archivos: HeroBackground + effects/lab (cuatro componentes, labSettings/createLabArc/CSS), docs HERO_MOTION/CURRENT_STATE. CSS, controladores/config producción, body/assets, datos, hooks, App, package/lockfile intactos. Sin dependencias nuevas.

Commit único `dev: add Hero motion runtime proof lab`; resolver SHA con `git log -1 --format=%H --grep='^dev: add Hero motion runtime proof lab$'`, SHA completo en reporte. Detalle/uso en `docs/HERO_MOTION.md`.

Gate:
1. Eze confirms particles visibly move.
2. Eze confirms pointer visibly affects particles.
3. Eze confirms arc visibly moves while idle.
4. Eze confirms pointer visibly disturbs the arc.
5. Only then tune intensity downward toward premium final values and integrate into production.

No Block09 until this proof is achieved.

---

### BLOCK 08G — Volumetric Wake Lab

**STATUS: BASELINE APPROVED BY EZE / INTEGRATED IN 08H**

08F wake visualmente rechazado por Eze. `velocityWake.js` retirado: duplicaba fragmentos de mist/halo y producía una línea rota. Baseline halo aprobado en Lab: core11/5.5/0.625; halo20/8.5/0.475; mist50/20.5/0.24. Held radius110 / strength620 / recovery1s e idle0/0/0 preservados. Particles1/speed0.1 intactos; drift sigue NO confirmado.

`volumetricWake.js`: pool fijo3,8 wisps por slot (controles6–10), sin path duplicado. Volúmenes elípticos con gradientes cyan, blur y turbulencia local. Anchor deriva del punto del arco y su normal; origen alrededor de la envolvente del mist. Velocidad CSS px/ms y dirección SVG reales, threshold1.1, cooldown100; solo pointer rápido/cercano. Corte original alargado/orientado, tamaño fijo: mist0.7, halo0.12, core0; recuperación del corte350ms. Plume lifetime900ms, travel110 con respuesta de velocidad limitada1–1.5, radios26±12, expansión1.7, spread±24°, drag0.82, opacity0.65, turbulence8. Impacto inicial150ms seguido de divergencia/expansión/fade. Sin loop propio/renderer/dependencia.

Lab `npm run dev` → `?heroLab=1`, export `plume` + `haloQuality` + `arc`/`particles`. Reduced motion/hidden/outside/unmount cancela animaciones, restaura máscaras y elimina pool; halo estático conserva calidad aprobada. Mobile/falta fine-hover no monta plume/held. Cambiar blobCount reconstruye pool con cleanup. Producción, layout, copy, framing y otras secciones protegidos.

QA técnico: npm run check PASS; git diff --check PASS; Vite DEV transforms PASS. Motion real con DOM simulado: baselines, gating/XY/cooldown/pool3, wisps6–10, cero paths copiados, drag/divergencia/expansión/fade, corte fijo/core intacto y cleanup PASS. Build producción idéntico08F. No se declara apariencia, consola o performance de browser PASS; validación visual del plume pendiente de Eze.

Archivos: Lab HeroMotionLab/LabArc/createLabArc/labSettings; nuevos pointerVelocity.js/volumetricWake.js; eliminado velocityWake.js; docs CURRENT_STATE/HERO_MOTION. Commit único `dev: replace copied arc wake with volumetric plume lab`; SHA mediante `git log -1 --format=%H --grep='^dev: replace copied arc wake with volumetric plume lab$'`.

Eze aprobó el resultado y exportó valores para08H. Los números anteriores describen el preset08G inicial; el export integrado vigente está en08H.

---

### BLOCK 08H — Hero Motion Production Integration

**STATUS: REJECTED BY EZE — PRODUCTION EFFECT NOT VISIBLE / LAB STILL MOUNTABLE**

08G aprobado e integrado en Hero normal. Fuente única `heroMotionSettings.js`: particles1/0.1/0.575/1.5/200/2.4; arc mist0/halo0/core0/noise1/radius110/strength620/recovery1; quality core11/5.5/0.625, halo20/8.5/0.475, mist50/20.5/0.24; plume enabled, threshold1/lifetime1600/travel110/count8/radius30/spread24/drag1/opacity0.075/mistCut0.7/haloCut0.12/turbulence8/cooldown100. Mapping/rangos de partículas iguales al Lab.

Un solo arc controller y plume/tracker compartidos; retirado controlador08D, gate del constructor y montaje manual/custom hosts tsParticles. ParticlesProvider + Particles oficial/init única también compartido. Lab solo DEV, instrumentación/panel/polling fuera de producción. Cero path clones de wake. Core no se atenúa por plume. Static SVG aplica calidad aprobada en cuatro crops; reduced/hidden/offscreen cancela efectos/restaura filtros/pool y conserva fondo completo. Mobile framing y touch intactos.

Guía residual: identificado borde binario del relleno body bajo el arco, no rim/stroke extra. Feather3px solo del cuerpo, sin tocar paths/geometry/assets ni calidad core/halo/mist. Test geométrico de alpha confirma transición suavizada; desaparición perceptual pendiente de Eze. No parche de coreOpacity ni overlay.

Validación: npm run check baseline/final y git diff --check PASS; Motion real/DOM simulado held/recovery/idle0/plume/cleanup PASS; SSR fallback completo calidad/IDs PASS; particle options iguales08G; DEV transforms/build sin Lab UI/query/telemetry PASS; estilos de layout/framing protegidos por comparación exacta. No browser/console/FPS PASS fabricados. Initial JS238.02kB gzip72.29; Hero lazy135.81 gzip43.31; CSS67.26 gzip13.45. Sin nuevas dependencias ni cambios de datos/copy/type/Navbar/otras secciones.

Archivos principales: effects HeroLightArc/ArcDisplacement/arcDisplacement/HeroAtmosphere/HeroParticles/heroParticleOptions; shared heroMotionSettings/ParticleField/particleOptions/volumetricWake/pointerVelocity; Lab consume shared logic (viejos archivos duplicados removidos); header-hero.css; docs CURRENT_STATE/HERO_MOTION. HeroBackground y su switch DEV no precisaron cambios.

Commit único `feat: integrate approved Hero light motion into production`; SHA vía `git log -1 --format=%H --grep='^feat: integrate approved Hero light motion into production$'`. Próximo paso: Eze QA del Hero normal. No iniciar Block09 ni declarar FINAL/FROZEN.

---

### BLOCK 08I — Production Activation Fix

**STATUS: HERO MOTION PRODUCTION ACTIVATION — READY FOR EZE VISUAL QA**

Real-browser QA after 08H:
- Eze does not see the approved held/plume interaction in the normal Hero;
- Hero Lab is still mountable/active through `?heroLab=1`.

Repo diagnosis:
- `HeroBackground.jsx` still has a module-level `labMode` query switch;
- while `labMode` is true, production `HeroAtmosphere` is explicitly NOT imported/mounted;
- normal production arc is additionally gated by `interactive`, which requires Desktop >=1200 + `(hover:hover) and (pointer:fine)`;
- production arc failure/unsupported gates remain silent, so normal Hero can fall back without visible diagnostics;
- idle arc displacement is intentionally zero and particles are count1/speed0.1, so production looks static until interaction is actually active.

08I implementado (6 de octubre):
- retirados query heroLab, import Lab, estado/error/portal/render desde HeroBackground; el Lab permanece como código histórico sin acceso desde el sitio, incluso en DEV;
- HeroAtmosphere es el único efecto importado/montado con preferences.active, con fallback si falla el import;
- eligibility exacta Desktop75rem + matchMedia('(hover: hover) and (pointer: fine)'), sin nuevos requisitos; reduced/hidden/offscreen conservados y Mobile sin interacción mouse;
- DEV console muestra active/interactive y motivo, arc mounted/plume ready y cada fallo de SVG/CTM/ancho/DOMPoint/feDisplacementMap/import/setup con error real; sin panel ni polling;
- export08G, held110/620/1, idle0, haloQuality, plume y partículas intactos. Controller/volumetricWake/settings/CSS/assets/data/dependencias sin cambios.

Archivos: HeroBackground.jsx, ArcDisplacement.jsx, useHeroMotionPreferences.js, docs/HERO_MOTION.md y CURRENT_STATE. npm run check baseline/final y git diff --check PASS; harness efecto/hook con DOM/media simulados PASS, gates/cleanup/config identity; Motion real held/recovery/plume/cleanup PASS. No browser visual PASS declarado. La exclusión por query está comprobada; sin query la causa específica en el browser de Eze requiere los nuevos diagnósticos.

Commit `fix: activate production Hero without Lab switch`; SHA mediante `git log -1 --format=%H --grep='^fix: activate production Hero without Lab switch$'`.

No Block09 until Eze confirms the normal Hero interaction is visible.

---

### BLOCK 08J — Live Filter Ownership Fix

**STATUS: NOT VISUALLY APPROVED — NO EFFECT OBSERVED BY EZE**

Real-browser QA after 08I: HeroLab is gone, but the normal Hero still has no visible held deformation/plume.

Root cause found in repo:
- `HeroLightArc.jsx` renders each visible path with a React-owned static `filter="url(#...)"` prop.
- `createArcDisplacement()` imperatively swaps that same DOM attribute to the live filter.
- `HeroParticles` later calls `onStatus(true)`, which updates `particlesReady` in `HeroBackground`.
- that parent state update re-renders `HeroLightArc`;
- React reconciles the path `filter` prop back to the static filter URL;
- `ArcDisplacement` does not re-run because its effect dependencies did not change;
- result: controller/listeners remain mounted, but the visible arc is again painted through the static filters, so pointer/plume changes happen on filters no longer attached to the visible paths.

This explains why the Lab worked but normal production looked static.

08J implementado:
- HeroLightArc recibe live; React es el único dueño de path.filter para mist/halo/core. Un solo conjunto de paths por variante, sin halo duplicado;
- createArcDisplacement deja de escribir/restaurar path.filter. Motion conserva exclusivamente valores del gráfico vivo y plume;
- callback estable ArcDisplacement → HeroAtmosphere → HeroBackground anuncia variante lista tras setup, y revoca en fallo/cleanup;
- active+interactive y variante lista seleccionan LIVE. Unsupported/fallo/reduced/hidden/offscreen/no pointer fino seleccionan STATIC; Mobile/framing intactos;
- particlesReady se conserva para estrellas, no decide liveArc ni reinicia controlador;
- DEV console informa modo LIVE/STATIC y comprueba en DOM los tres URLs live después de particle readiness mediante console.assert. Sin debug panel ni hacks imperativos.

QA técnico: npm run check y git diff --check PASS. JSX real del padre con estado simulado + React SSR conserva los filtros tras particlesReady, renders adicionales, cambio de variante y fallback; no se presenta como QA browser. Harness gates y Motion real held/recovery/plume/cleanup con DOM simulado PASS. Runtime assertion DEV permite verificar conexión en el browser de Eze.

Sin cambios de settings08G (110/620/1, quality, plume, particles), estilos/layout/assets/data/dependencias. Archivos: HeroBackground, HeroLightArc, HeroAtmosphere, ArcDisplacement, arcDisplacement.js y docs CURRENT_STATE/HERO_MOTION. Commit `fix: give React sole ownership of Hero arc filters`; SHA vía `git log -1 --format=%H --grep='^fix: give React sole ownership of Hero arc filters$'`.

No Block09 until Eze confirms normal Hero held deformation + plume are visible.

---

### BLOCK 08K — Runtime Verification / Rendered Effect

**STATUS: AUTHORIZED — DIAGNOSE FIRST, NO BLIND REWORK**

Eze rechecked normal Hero after 08J and still sees no live interaction. Do not assert another single cause without the real browser chain.

Confirmed code facts (HEAD 82707143716f6686dbaa8f2940c4f1294aa956c2):
- Idle mist/halo/core displacement are zero; particles count1/speed0.1. At rest the Hero is nearly static by configuration.
- HeroBackground now owns declarative STATIC/LIVE filter selection, but DOM mode alone does not prove rendered pixels change.
- ArcDisplacement returns without retry on several transient gates (SVG target, CTM, bounding size, background readiness). It can therefore miss a later-ready target.
- Arc controller requires Desktop>=1200 and fine hover; reduced motion/offscreen disable activation.

Proof order BEFORE changes to effects:
1. confirm branch and asset served;
2. inspect visible SVG variant and data-arc-mode;
3. verify path filters point to live definitions;
4. test synthetic/real pointer on visible curve and log screen-to-SVG distance;
5. observe local filter displacement scale become >0;
6. observe plume slots spawn on a fast pointer crossing;
7. confirm visible pixel change; if values move but pixels do not, diagnose SVG filter/mask/painting;
8. fix only proven failed gate and make transient readiness recoverable.

No new visual tuning, packages, layout changes, or full Lab. A single DEV-only diagnostic is acceptable. Eze owns final visual QA. Do not begin Block 09.

---
### BLOCK 08L — Desktop Fit Production Implementation

**STATUS: DESKTOP FIT IMPLEMENTED / READY FOR EZE VISUAL QA**

8 de octubre de2026. Figma02C (`266:94`), master1440 `266:95`5256high y compact1366 `268:66`5124high inspeccionados mediante metadata/design context/renders. Secciones Hero266:96, Problem266:124, Solution266:147, About266:210, FAQ266:218, Contact266:234, Footer266:254. 02C reemplaza geometría02B únicamente aquí. Projects266:178 FROZEN; Mobile03 FINAL/FROZEN.

Cambios: header CTA160×44; Hero CTA210/196×52, grupo430/gap24 y separación32. Problem intro64/cards320,296×272/banner624×80. Solution feature80/86 local, escalonado174/356/538/rows158. About header96/copy134; FAQ header106/list80/open148/closed76 conservando targets44; Contact left112/right134/divider352. Footer natural224 con divisor2px viewport-wide y contenido64/144.

Alturas derivadas de flujo/padding con contenido actual: Problem768/Solution768/About512/FAQ624/Contact560/Footer224. Sin min100svh Desktop para estos bloques, fixed section heights, escala global o nueva capa de overrides. Contenido/zoom/FAQ puede crecer. Hero/Projects conservan viewport escénico. Contenedores modificados1280, márgenes43/80/128/320 a1366/1440/1536/1920; Projects conserva su gutter original.

Archivos: src/styles/header-hero.css, problem-solution.css, about-faq.css, contact-footer.css; docs/DESKTOP_FIT_IMPLEMENTATION.md y CURRENT_STATE. Reemplazadas reglas Desktop02B y eliminadas excepciones obsoletas, sin duplicación de sistemas. Componentes/hooks/data/assets/dependencias/primitivas/type global sin diff. Mobile/Tablet prefijos idénticos; Hero Motion y todas las reglas de escena/efectos protegidas. Copy About “en cada proyecto”, FAQnull y Projects01/01 preservados.

Validación: baseline limpio4585816; npm run check baseline/final y git diff --check PASS; comparaciones de archivos protegidos/prefijos Mobile-Tablet PASS; SVGs locales no vacíos/XML válidos; React SSR semántica/IDs/content PASS; razonamiento de anchuras en1366×768,1440×900,1536×864,1920×945,1920×1080 y1200 sin colisiones obvias. No browser/overflow/pointer visual PASS declarado. 08K continúa con su estado previo:08L protege el efecto sin reabrirlo ni certificar interacción. Eze hace QA visual final.

Commit único `feat: implement 02C Desktop Fit geometry`; SHA con `git log -1 --format=%H --grep='^feat: implement 02C Desktop Fit geometry$'`. Próximo paso: Eze QA de02C, no Production FINAL ni Block09 autorizado.

---

### BLOCK 08M — Desktop Fit Visual QA Corrections

**STATUS: READY FOR EZE VISUAL QA**

8 de octubre de 2026. Correcciones explícitas de Eze sobre baseline limpio/sincronizado `0c11e18b9d8916bb80ea8e780bbc28c7b19cc582`; prevalecen sobre Figma 02C donde difieren.

- Problema y Solución: `min-height: 100svh` Desktop en wrappers de contenido, flujo flex vertical y crecimiento natural. Problema distribuye aire entre intro/cards/resultado; la lista de Solución crece y distribuye sus tres features. Cards mínimo272, keywords80/86, banner80, rails/iconos/offsets conservados; sin escala artificial.
- About: padding izquierdo32→0 y gap136→168. Título/eyebrow comparten eje con FAQ; copy/divisor y altura natural512 de referencia conservados.
- Footer: variables tipográficas solo locales Desktop, wordmark18/28/tracking.18em, nav15/24, metadata14/22. Targets44, estructura/altura natural224 y divisor full-width intactos.

Archivos: `src/styles/problem-solution.css`, `about-faq.css`, `contact-footer.css`; `docs/DESKTOP_FIT_IMPLEMENTATION.md` y este documento. Sin overrides adicionales, librerías, cambio de copy/assets/components ni comportamiento. Hero/Navbar/Motion, Proyectos, Contacto, FAQ, Mobile/Tablet y tipografía global protegidos.

Validación técnica: npm run check baseline/final (lint/build) PASS; git diff --check PASS; comparación de prefijos Mobile/Tablet y reglas protegidas PASS; matemática de composición/anchura en1366×768,1440×900,1536×864,1920×945 y borde1200. Mínimos de escena respetan viewport y permiten crecimiento de texto. Browser/overflow/alineación visual pendiente de Eze, sin PASS visual fabricado. 08K conserva su estado previo.

Commit: `fix: correct Desktop Fit viewport rhythm and footer type`; SHA con `git log -1 --format=%H --grep='^fix: correct Desktop Fit viewport rhythm and footer type$'`. Próximo paso: Eze revisa estas cuatro correcciones; no Production FINAL ni siguiente fase autorizada.

---

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

Estado vigente:08G aprobado por Eze y export integrado en08H. Motion + SVG held/plume, halo estático de calidad aprobada y particles count1 en flujo oficial React/slim4.4.0. OGL/old controller/hybrid hosts/duplicated path wake retirados. 08I retira el acceso Lab desde el sitio, incluso DEV; diagnósticos solo consola DEV, sin UI/debug en Hero normal. Guía residual body featherizada; QA visual del resultado de producción pendiente de Eze. 08J conecta filtros live/estáticos declarativamente desde React; Motion solo controla valores internos. Detalle actual en docs/HERO_MOTION.md, sección08J.

MagicRings permanece **REJECTED** por su corte/fade histórico y coste; no se volvió a probar en Block08. ShaderGradient/Vanta no ejecutados ni declarados rechazados. No renderer genérico sustituye el horizonte aprobado; no Pro.

---

## 13. Reglas de Hero motion

Desktop:

- respiración lenta del glow;
- variación mínima de luminosidad;
- niebla/halo muy sutil;
- sin grid decorativo;
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

Los hallazgos del QA manual llevaron a una recomposición específica en Figma. `02B — Desktop Production` resuelve ahora la escala, densidad, backgrounds, grid, Footer y alineación de Proyectos y reemplaza la interpretación libre del coherence pass. Dirección autorizó posteriormente Block08 sobre la geometría Production y el framing Mobile; no reabrir layout en el motion pass.

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

### PRODUCTION BLOCK 07 — DESKTOP PRODUCTION REIMPLEMENTATION (historial)

02C Desktop Fit sustituye la geometría 02B de las secciones modificadas en 08L. Las referencias y reglas siguientes describen la entrega histórica de Block 07; el contrato vigente está en Block 08L y `docs/DESKTOP_FIT_IMPLEMENTATION.md`. Proyectos permanece protegido.

Status: **IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA**.

SOURCE OF TRUTH:
- Desktop: Figma `02B — Desktop Production` page `239:10`.
- Canonical master: `Desktop Production Master — 1440`, node `239:11`, 1440×6684.
- Section masters: siete escenas de 1440×900 + Footer 1440×384.
- Mobile: `03 — Mobile` permanece FINAL / FROZEN.
- `02 — Desktop` histórico NO manda en producción.

El coherence pass anterior quedó eliminado del CSS activo. Implementación desde02B completada; detalle en `docs/DESKTOP_PRODUCTION_IMPLEMENTATION.md`. Dirección autorizó Block08 sobre este baseline protegido. La siguiente acción de aquella entrega fue revisar Hero Motion; la acción vigente es el QA visual de 08L, con Hero Motion y Mobile protegidos.

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
08C y08D rechazados visualmente.08E obtuvo baseline real-browser aprobado por Eze: render/repulse/arc runtime/held deformation YES; particle drift NO, viewport1920×945.

**08F: WAKE VISUALLY REJECTED; HALO QUALITY ACCEPTED AS LAB BASELINE.** Commit08F `fa96f2455106ed5fd115144cc1df1b8eb7fbfbbc`. Su wake de fragmentos copiados fue reemplazado, no retocado.

**08G: BASELINE APPROVED BY EZE; INTEGRATED IN 08H.** Export seleccionado supera presets históricos.

**08H: REJECTED BY EZE — PRODUCTION EFFECT NOT VISIBLE.** Calidad aprobada, held110/620/1, idle0, plume1600ms/0.075/threshold1 y partícula mínima integrados. Controladores/particle wrapper compartidos con LabDEV, sin UI/instrumentación en producción. Borde duro del cuerpo featherizado sin cambiar layout/geometry. Detalle de valores/QA/files/commit en Block08H y docs/HERO_MOTION.md.

**08I: REJECTED BY EZE — LIVE FILTER OWNERSHIP BUG.** Switch Lab retirado de todo runtime normal; HeroAtmosphere es único dueño, Desktop/fine-hover exactos, gates y errores explicados solo en consola DEV. Sin cambios de valores aprobados. Validación técnica PASS.

**08J: NOT APPROVED BY EZE — no visible production interaction.** React selecciona STATIC/LIVE; Motion no escribe path.filter. particlesReady conserva estrellas sin desconectar filtros. Aserción DEV de los tres paths; valores aprobados intactos, validación técnica PASS.

**08L: DESKTOP FIT IMPLEMENTED / READY FOR EZE VISUAL QA.** Nueva autoridad02C para geometría de las secciones modificadas; naturales About/FAQ/Contact/Footer, Solution80/86 y cards272. Hero Motion/Projects/Mobile protegidos. Ver docs/DESKTOP_FIT_IMPLEMENTATION.md.

**08M: CORRECCIONES DESKTOP IMPLEMENTADAS / READY FOR EZE VISUAL QA.** Problema/Solución mínimo100svh con escala Fit, eje About/FAQ compartido, Footer tipografía local menor y estructura intacta. Las excepciones de Dirección prevalecen sobre 02C.

Próximo paso autorizado: Eze revisa 08M en1366×768,1440×900,1536×864,1920×945; mantiene pendiente la comprobación runtime del Hero según08K. No iniciar otras fases sin Dirección.

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
