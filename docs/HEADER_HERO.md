# BLOCK 02 — Header + Hero

Estado: **CLOSED / APPROVED FOR CONTINUATION**. Dirección autorizó avanzar a Block 03 el 30 de septiembre de 2026. El pulido adicional no esencial del Hero y sus efectos queda diferido a Block 08 — Motion o al QA final; no reabrir este bloque ahora salvo regresión verificable.

Implementación: `bf6db14b11614a8f75d661190b29b5d86c9e2c5e` en `feature/ews-v2-production`.

## Files changed

- `src/App.jsx`, `src/index.css`: composición explícita de Header + Hero.
- `src/components/layout/Navbar.jsx`: reemplazo del Navbar opt-in anterior por la navegación aprobada.
- `src/components/sections/HeroSection.jsx`, `HeroBackground.jsx`: contenido, capas estáticas y grid independiente.
- `src/components/ui/ArrowUpRight.jsx`, `src/data/hero.js`.
- `src/styles/header-hero.css`, `src/hooks/useHorizonGlow.js`.
- `src/assets/hero/*.svg`: diez exports exactos de Figma, sin URLs temporales.
- `docs/qa/block-02/*.png`, este informe y `docs/CURRENT_STATE.md`.

## Header implementation

Fuente Desktop: `50:35`; Mobile: `1:54`. Containers y roles de Foundation reutilizados. Nav Desktop desde 1200 px; MENÚ tipográfico debajo de 1200 px, también en Tablet. Links usan `navigation.js` sin anchors nuevos.

Header absoluto dentro del inicio de la página, sin sticky/fixed: se desplaza al hacer scroll. Se midieron 110 px de caja en Desktop y 92 px en Mobile/Tablet. **Offset de obstrucción confirmado: 0 px**; scroll-padding lo aplica una sola vez. El handoff `208:34` exige altura real únicamente si el header es sticky/fixed.

## Mobile navigation

Fuente: `154:2`. Diálogo modal nativo con fondo opaco y nav semántica. MENÚ abre; CERRAR recibe foco inicial. CERRAR, Escape, wordmark o selección de destino cierran. Foco vuelve a MENÚ; al cruzar 1200 px el menú cierra y el foco vuelve al wordmark visible. Scroll de fondo bloqueado. El top layer del diálogo hace inerte el contenido detrás y gestiona navegación por teclado. Touch targets 72×44 px. Sin dependencia.

## Static Hero

SVG originales de surface/body, glow, rim, estrellas e icono de Figma. Exports mediante Plugin API de solo lectura porque los endpoints HTTP de assets devolvían HTML “Site Unavailable”. No se modificaron nodos, paths ni estilos del archivo.

Los exports de horizontes incluyen el recorte del frame. Desktop: body a y=172, glow a y=150, rim a y=153, con dimensiones originales. Mobile: body a y=746, glow a y=716 y rim a y=726. CSS/DOM mantiene capas, crop y orden; el grid se genera como líneas DOM sin renderer.

Headline usa Display/Hero. Inter local con `font-optical-sizing:none` solo en este bloque para coincidir con el master óptico usado por Figma; se conserva Foundation. Desktop respeta el salto explícito de la descripción después de “convertir”; Mobile fluye en tres líneas. Texto completo sin cambios. CTAs maestros: Mobile 342×60, Desktop 226×60 y 214×60; Header 176×54.

## Static visual QA

Chrome real, fuentes decodificadas, todos los SVG cargados, motion detenido mediante reduced motion.

| Referencia | Heading x/y/ancho | Description x/y/ancho | CTA principal x/y/tamaño |
|---|---|---|---|
| 1536×992 | 295 / 394 / 946 | 350 / 595 / 836 | 535 / 709 / 226×60 |
| 390×844 | 24 / 154 / 342 | 24 / 389 / 342 | 24 / 548 / 342×60 |

Height del texto Desktop es 168/68 px, dentro de cajas Figma de 170/70 px; esas cajas contienen 2 px de espacio sobrante, no leading adicional. El siguiente bloque conserva exactamente y=595 y y=709. Mobile heading 216 px y descripción 78 px.

Comparación visual y overlays browser/Figma revisados. Export de referencia Desktop del MCP llega a 1024×662: se comparó el render browser 1536×992 escalado a esa resolución únicamente para overlay, conservando las coordenadas nativas para geometría. Mobile comparado a 390×844. No se cambiaron layouts para corregir antialiasing.

- [Desktop](qa/block-02/hero-desktop-1536.png)
- [Mobile](qa/block-02/hero-mobile-390.png)
- [Menú abierto](qa/block-02/mobile-navigation-390.png)

## Effect spike

Primero se cerró el static gate. **MagicRings FREE fue la única librería realmente ejecutada**, en proyecto temporal aislado. Fuente: [React Bits](https://github.com/DavidHDev/react-bits/blob/main/src/content/Animations/MagicRings/MagicRings.jsx).

Configuración: un anillo, cyan en ambos colores, speed 0.08, scaleRate 0, noiseAmount 0, followMouse false, hoverScale 1, parallax 0, clickBurst false, attenuation 180, thickness 2, baseRadius 0.5, fadeIn 0.1 y fadeOut 3.2. Render en 1536 y 390 bajo StrictMode. Canvas de 1700×1500 en Desktop y 990×900 en Mobile a DPR 1. Headless usa SwiftShader: no es medición de GPU física.

## Selected solution

**SVG de Figma + Web Animations API nativa exclusivamente sobre la opacidad del glow.** Un ciclo de 16 segundos: Desktop 1 → 0.88 → 1; Mobile 1 → 0.94 → 1. Rim y body nunca se animan. Sin transformación, expansión, apagado del horizonte, mouse, partículas móviles ni modificaciones del copy. Esta alternativa nativa y ligera está permitida explícitamente por el brief del bloque.

Una sola animación activa en el viewport actual. Sin WebGL, canvas, nueva dependencia ni requestAnimationFrame propio. El Hero ambiental mínimo queda integrado en este bloque; Block 08 sigue pendiente para revisar motion de la landing completa, sin reveal global por defecto.

## Rejected options

**MagicRings: REJECTED.** El shader modula el corte angular de su primer anillo mediante `pow(cut*a,3)*r` (ringGap no elimina el corte en i=0); el horizonte superior se apaga y el render Mobile no conserva el arco. También impone fade cíclico. Resolver ambos cambiaría sustancialmente el shader. Se rechazó por fidelidad y coste, sin adaptar Figma.

[Licencia verificada](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md): MIT + Commons Clause, permite uso dentro de webs comerciales y restringe redistribuir/vender los componentes mismos. Three.js usa MIT. No se conserva código ni dependencia de este candidato en producción. ShaderGradient y Vanta **no se ejecutaron ni se declaran rechazados**: la alternativa SVG nativa pasó el contrato sin necesitar nuevos renderers.

## Reduced motion / fallback

JS escucha cambios de prefers-reduced-motion. Con reduce cancela la animación nativa y devuelve opacity 1; cero loops decorativos activos. Visibilitychange y IntersectionObserver cancelan fuera de pantalla o con documento oculto; al volver visible reinician desde la base estática. Cleanup elimina listeners, observer y animación; StrictMode y reload dejan una sola animación activa.

Sin Animation API / IntersectionObserver conserva el fondo estático completo. Se comprobó con Animation API y globals WebGL deshabilitados. No existe context WebGL, así que context-lost y caps de DPR del renderer no aplican. Los SVG se rasterizan a la densidad del navegador; DPR 3 probado.

## Responsive

390 / 430 / 768 / 1024 / 1280 / 1536, más 767 / 1199 / 1200: sin overflow, imágenes válidas y switch de nav correcto. Mobile conserva 24 px de gutters y CTAs apilados. Desde 768 el contenido se centra y los CTAs van en fila; typography y padding interpolan hasta 1200. El horizonte Desktop conserva dimensiones y curva, se centra y recorta horizontalmente a menores anchos para evitar deformación o corte de la superficie. No existe un tercer diseño Tablet.

## Performance

| Build medido | JS kB / gzip | CSS kB / gzip |
|---|---|---|
| Foundation antes de editar | 190.66 / 60.09 | 36.77 / 7.79 |
| Block 02 final | 206.64 / 63.96 | 38.79 / 8.40 |
| Diferencia | +15.98 / +3.87 | +2.02 / +0.61 |

Fuente local: 352.24 kB, sin cambios. SVG pequeños incluidos por Vite en el bundle. MagicRings aislado produjo JS 751.57 kB / gzip 201.87; se descartó sin entrar al package.json del producto. Esta cifra es el spike completo, no un delta atribuido exclusivamente a Three.js.

Muestra de 2 s del build en Chrome headless, Hero Desktop visible: ScriptDuration 0 s, LayoutDuration 0 s, RecalcStyleDuration 0.000033 s y TaskDuration 0.000486 s. Muestra breve de main thread, no benchmark de batería/GPU ni garantía para hardware real. Mobile reduce variación a 6% y anima solo glow de 390×128 en la referencia, sin render continuo JS.

## Validation

- `npm run check`: PASS (lint + build); `git diff --check`: PASS.
- Chrome preview de producción: cero errores JS de aplicación y cero respuestas fallidas observadas por el test.
- Inter Variable realmente usada, verificada por DevTools; todos los assets locales no vacíos y decodificados.
- Skip link, Tab, Escape, focus-visible, foco inicial/retorno, selección, aislamiento del fondo y cambio de breakpoint: PASS.
- Reduced motion dinámico, visibility lifecycle, offscreen suspension/resume, DPR 3, fallback y StrictMode: PASS. Documento oculto se ejercitó mediante evento determinista porque las pestañas headless continuaban reportando visible.
- Pruebas responsive y screenshots de producción con motion detenido: PASS.
- Aviso npm preexistente del entorno `http-proxy`, ajeno al proyecto. Dev browser solicita automáticamente un favicon aún no aprobado y puede registrar 404; no se inventó un favicon para ocultarlo.

## Current State update

`docs/CURRENT_STATE.md` resume implementación, commit, solución nativa, descarte real, costes, QA, fallback y próximo bloque. Este informe mantiene el detalle.

## Issues / blockers

Sin blocker nuevo de Header + Hero. Destinos de secciones posteriores aún no montadas corresponden a los bloques autorizados futuros; no se añadieron anchors vacíos ni contenido ficticio. Validación Mobile por viewport/DPR en Chrome, sin dispositivo físico. Assets favicon/OG siguen pendientes de aprobación según Foundation.

## Status

**HEADER + HERO — CLOSED / APPROVED FOR CONTINUATION**. Block 03 — Problema + Solución está autorizado. No reabrir Header/Hero durante Block 03 salvo regresión verificable.


## Dirección — Block 08 / Living Hero

Fecha: 4 de octubre de 2026.

Dirección reabre explícitamente el Hero para motion avanzado. La implementación actual de SVG + opacity breathing queda preservada como **static fallback / reduced-motion baseline**, pero deja de considerarse el efecto final.

Objetivo:
- incorporar partículas vivas e interactivas;
- mantener las partículas discretas y cyan/blanco;
- crear un highlight luminoso que recorra el rim exacto del horizonte aprobado;
- enriquecer la respiración del glow sin deformar el arco;
- interacción de puntero suave en Desktop;
- Mobile más liviano y sin interacción que interfiera con scroll.

Preferencia técnica:
- React Bits FREE / Particles como primer candidato para el particle field;
- Motion (MIT) como primer candidato para animar el path exacto del rim;
- no particle engine propio;
- no shader/orb/aurora que reemplace la silueta;
- no React Bits Pro;
- MagicRings continúa rechazado.

La geometría, tipografía, copy, CTAs y crop de 02B Desktop Production / 03 Mobile siguen protegidos.
