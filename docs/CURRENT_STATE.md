# Eze Web Studio V2 — Current Production State

> Documento canónico de continuidad para todos los agentes que trabajen sobre Eze Web Studio V2.
>
> **Leer este archivo antes de iniciar cualquier bloque de producción.**
>
> Última actualización: 29 de septiembre de 2026.

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

Stack confirmado:

- React 19;
- ReactDOM 19;
- Vite 8;
- Tailwind CSS 4;
- ESLint;
- JavaScript / JSX;
- sin TypeScript operativo;
- sin router;
- sin CMS;
- sin page builder;
- sin registry dinámico de secciones;
- sin librería de motion;
- sin librería de carrusel;
- sin icon library;
- sin WebGL / Three.js instalado.

Dependencias runtime actuales:

- `react`;
- `react-dom`.

No se agregaron dependencias en Foundation.

`App.jsx` actualmente conserva únicamente:

- shell de sitio;
- skip link;
- `main#main-content`;
- composición explícita preparada para sumar secciones por bloques.

Todavía NO están montados:

- Header;
- Hero;
- Problema;
- Solución;
- Proyectos;
- About;
- FAQ;
- Contacto;
- Footer.

Por lo tanto, la landing visual todavía no está implementada. Foundation sí está cerrada.

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

`--header-offset` sigue provisional en Foundation y debe definirse en Header + Hero.

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

**STATUS: NEXT / AUTHORIZED**

Es el próximo bloque de implementación.

Scope:

1. Header Desktop
2. Header Mobile
3. Mobile Navigation — Open
4. Hero Desktop
5. Hero Mobile
6. grid
7. fondo estático fiel
8. spike técnico del efecto ambiental
9. responsive del bloque
10. accessibility / performance del bloque

Regla crítica:

**STATIC FIRST, MOTION SECOND.**

Primero reproducir el Hero completo de forma fiel sin WebGL.

La versión estática debe funcionar como:

- baseline visual;
- fallback;
- reduced-motion;
- fallback si WebGL no está disponible.

Solo después de pasar visual QA estático se autoriza el spike.

Static visual gate:

- render 1536;
- render 390;
- comparar con Figma;
- corregir headline position;
- wraps;
- CTA geometry;
- horizon curvature;
- crop;
- rim thickness;
- glow;
- grid;
- spacing.

No avanzar a motion antes de que este gate pase.

### BLOCK 03 — Problema + Solución

**STATUS: PENDING**

Implementar únicamente después del cierre de Header + Hero.

Problema:

- ProcessCards conectadas Desktop;
- secuencia vertical Mobile;
- iconografía exacta;
- resultado final diferenciado.

Solución:

- composición tipográfica expresiva;
- Desktop escalonado;
- Mobile vertical con offsets;
- CLARIDAD / CONFIANZA / ACCIÓN;
- excepción CONFIANZA 56/60 Mobile.

### BLOCK 04 — Proyectos

**STATUS: PENDING**

- carrusel Desktop según Figma;
- Mobile con scroll-snap / swipe / peek;
- estado activo único;
- buttons + pagination sincronizados;
- no autoplay;
- no inventar proyectos o assets;
- previews pueden permanecer vacíos hasta recibir assets aprobados.

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

Integrar únicamente la solución ganadora del spike del Hero.

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

El Hero aprobado contiene:

- horizonte / arco cyan;
- rim light;
- glow;
- profundidad;
- grid;
- movimiento ambiental muy sutil.

La librería nunca define la forma final.

Policy:

**FREE / OPEN SOURCE FIRST**

Orden de exploración vigente:

1. React Bits FREE / MagicRings
2. ShaderGradient
3. Vanta.js
4. otra alternativa free/open-source solo si las anteriores fallan

También puede ganar una solución CSS / SVG / canvas propia y ligera si reproduce mejor Figma.

### MagicRings

Estado:

**SPIKE CANDIDATE, NO APROBADO TODAVÍA**

Fue identificado como primera prueba potencial para aportar movimiento al rim, no para reemplazar toda la geometría del Hero.

Debe probarse:

- un solo horizonte estable;
- cyan;
- noise mínimo o nulo;
- sin followMouse;
- sin burst;
- sin expansión evidente;
- sin apagar el rim;
- 1536 y 390;
- reduced-motion;
- fallback;
- resize;
- visibility pause;
- StrictMode cleanup;
- context lost;
- DPR;
- coste de bundle / GPU.

Si para lograr fidelidad necesita alterar profundamente el shader o cambiar el diseño:

**REJECT.**

No instalar varias candidatas simultáneamente.

Eliminar dependencias de spikes descartados.

Licencia exacta de la versión/componente elegido debe verificarse antes de integrar.

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
- Hero: Figma contiene geometría y referencia de glow/horizonte;
- previews de proyectos: no existen en repo;
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

### PRODUCTION BLOCK 02 — HEADER + HERO

Status:

**AUTHORIZED / NOT YET CLOSED**

Secuencia obligatoria:

1. confirmar Foundation;
2. implementar Header Desktop/Mobile;
3. implementar Mobile Navigation Open;
4. implementar Hero Desktop/Mobile;
5. implementar grid;
6. construir horizonte/glow estático fiel;
7. render 1536 + 390;
8. comparar contra Figma;
9. corregir hasta cerrar static visual gate;
10. recién entonces hacer effect spike;
11. elegir o rechazar solución;
12. validar 390/430/768/1024/1280/1536;
13. accessibility/performance;
14. `npm run check`;
15. commit;
16. actualizar este documento;
17. esperar aprobación de Dirección antes de Block 03.

No implementar Problema + Solución durante este bloque.

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
