# Eze Web Studio V2 — Current Production State

> Documento canónico de continuidad para todos los agentes que trabajen sobre Eze Web Studio V2.
>
> **Leer este archivo antes de iniciar cualquier bloque de producción.**
>
> Última actualización: 1 de octubre de 2026.

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

Runtime dependencies: únicamente `react` y `react-dom`. `package.json` y lockfile sin cambios en Blocks 02, 03 y 04.

`App.jsx` compone explícitamente shell, skip link, `Navbar`, `main#main-content` y `HeroSection` → `ProblemSection` → `SolutionSection` → `ProjectsSection`.

**Header Desktop/Mobile, Mobile Navigation Open y Hero Desktop/Mobile están implementados y validados.**

Problema y Solución están CLOSED / APPROVED FOR CONTINUATION. Proyectos está implementado y montado; el gate browser permanece bloqueado y el bloque NO está cerrado. Todavía NO están montados: About, FAQ, Contacto ni Footer.

Block 02: `bf6db14b11614a8f75d661190b29b5d86c9e2c5e`. CLOSED / APPROVED FOR CONTINUATION; baseline protegido. Detalle: `docs/HEADER_HERO.md`.

---

## 4. Estado de diseño Figma

Archivo:

**Eze Web Studio — New Landing 2026**

File key:

`aw1k9uSQJhmNGeODZY7BC3`

Páginas:

- `01 — Visual System` → FINAL;
- `02 — Desktop` → FINAL / FROZEN;
- `03 — Mobile` → FINAL / FROZEN;
- `04 — Final Handoff` → READY FOR PRODUCTION.

Viewports maestros:

- Desktop: **1536 px**;
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
- líneas y grid finos;
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

Siguiente bloque: Block 04 — Proyectos, **AUTHORIZED / NOT YET CLOSED**.

### BLOCK 04 — Proyectos

**STATUS: IMPLEMENTED / BROWSER QA BLOCKED — NOT CLOSED**

QA Completion Pass 2026-10-01 sobre `5dfccb20507b640d5055b0994c0f05f33de06b56`: npm run check y git diff --check PASS; build preview HTTP 200. Browser cloud sigue rechazando localhost con ERR_BLOCKED_BY_CLIENT; socket Unix local sigue denegado. No existe render evaluable, capturas ni validación de interacción/responsive/console. Sin correcciones de código ni fixture publicado: ningún defecto de diseño confirmado. Se necesita URL de preview accesible al browser remoto o entorno con Chrome local permitido. Detalle LOCATION / OBSERVED ISSUE / EXPECTED / CURRENT RESULT / FIX ATTEMPTED / BLOCKER en docs/PROJECTS.md y docs/qa/block-04/README.md. Estado sigue NOT CLOSED.

Base: `74c85a17836fb28561f5ea01087c20f839c18f16`. SHA de implementación: `b0fc13568dbc7176b982dab68b7b7697780941ea`.

Implementado: ProjectsSection explícito después de Solución, src/styles/projects.css, src/hooks/useProjectCarousel.js, copy aprobado en src/data/projects.js y siete SVG exactos locales en src/assets/projects/. Figma 73:42 / 183:6 inspeccionado con metadata, design context, screenshot y propiedades internas; no modificado.

Desktop mantiene cuatro slots visuales asimétricos; Mobile viewport/peek y controles 44. Dataset real = **1** (fitness); proyectos 2–3, URLs y previews PENDING. Slots vacíos decorativos, aria-hidden, sin falsos articles/imágenes/copy. Pagination real **01 / 01** (desviación intencional de 01 / 03 del master). Anterior/siguiente y VER PROYECTO disabled nativos mientras no existan destinos reales.

Un activeIndex compartido; arquitectura nativa preparada para más registros, scroll-snap Mobile/Transition, scrollend con fallback, botones/teclado, ResizeObserver, reduced-motion y cleanup. Sin autoplay ni dependencia/motion ornamental nuevo. Mobile <768, transición 768–1199, Desktop ≥1200. No se cambiaron componentes/estilos/assets protegidos.

PASS: npm run check, git diff --check y verificación SSR de datos/semántica/disabled/no fake links, más rama multi-registro mediante fixture estructural aislado no publicado. Bundle JS 218.09 → 227.53 kB (gzip 66.44 → 68.35), CSS 49.59 → 57.03 (gzip 10.29 → 11.65), Inter 352.24 sin cambios.

**QA browser NO realizado**: Chrome local no inicia por socket denegado; ejecución ampliada rechazada por sandbox_approval=false. Browser cloud rechaza localhost con ERR_BLOCKED_BY_CLIENT. Pendientes: capturas 1536/390, comparación Figma, seis viewports + bordes, consola, fuentes/assets reales, teclado/swipe y continuidad Solución → Proyectos. No declarar aprobado ni CLOSED hasta completar el gate. No se fabricaron PNG de evidencia.

Documentación: docs/PROJECTS.md. Verificaciones y matriz pendiente: docs/qa/block-04/README.md. Bloque nuevo real: acceso permitido al preview en browser. Siguiente acción autorizada: completar QA de Block 04. Block 05 — About + FAQ sigue PENDING; Dirección debe autorizarlo.

### BLOCK 05 — About + FAQ

**STATUS: PENDING**

About:

- split editorial Desktop;
- stack Mobile;
- no retrato inventado.

FAQ:

- accordion;
- single-open;
- primer item abierto en estado maestro;
- touch targets Mobile;
- respuestas 2–5 siguen pendientes.

### BLOCK 06 — Contact + Footer

**STATUS: PENDING**

Contacto:

- split Desktop;
- stack Mobile;
- HABLEMOS tipográfico;
- mailto real;
- URL externa desacoplada mientras siga pendiente.

Footer:

- cierre silencioso;
- anchors internos;
- Volver arriba;
- no volver a vender.

### BLOCK 07 — Responsive Pass

**STATUS: PENDING**

Revisar toda la landing en:

390 / 430 / 768 / 1024 / 1280 / 1536.

Resolver únicamente problemas de interpolación y continuidad.

No rediseñar frames Figma frozen.

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

Cada bloque sigue:

**IMPLEMENT → RENDER → COMPARE → CORRECT → RESPONSIVE CHECK → CLOSE**

No acumular varias secciones sin validación visual.

Para bloques visuales:

1. ejecutar browser real;
2. esperar fonts/assets;
3. fijar estado de componentes interactivos;
4. detener/fijar motion durante QA geométrico;
5. capturar viewport maestro;
6. comparar con render de Figma;
7. corregir discrepancias materiales;
8. revisar responsive;
9. revisar consola;
10. ejecutar `npm run check`;
11. recién entonces cerrar el bloque.

Diferencias de antialiasing no justifican cambiar geometría.

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

## 22. Próximo trabajo autorizado

Block 03 — Problema + Solución: **CLOSED / APPROVED FOR CONTINUATION**.

### PRODUCTION BLOCK 04 — PROYECTOS

Status: **IMPLEMENTED / BROWSER QA BLOCKED — NOT CLOSED**.

Completar el gate browser de la implementación existente de Proyectos: render/compare/correct en masters, responsive, interacción y continuidad. Preservar slots vacíos y datos incompletos sin inventar contenido. No avanzar a About + FAQ sin nueva aprobación de Dirección.

Header + Hero y Problema + Solución permanecen protegidos. El pulido no esencial del Hero sigue diferido a Block 08 — Motion o QA final. Foundation permanece CLOSED / APPROVED. Figma no se modifica.

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
