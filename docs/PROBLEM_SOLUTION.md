# BLOCK 03 — Problema + Solución

Estado: **CLOSED / APPROVED FOR CONTINUATION**. Dirección aprobó continuar el 30 de septiembre de 2026. Branch `feature/ews-v2-production`. Commit de implementación: `88196db865fc4ec14ec213873f4e6475a787e1f9`.

## Implementación y fuentes

Figma `aw1k9uSQJhmNGeODZY7BC3`, FINAL / FROZEN: Problema Desktop `44:40`, Mobile `169:6`; Solución Desktop `61:42`, Mobile `169:102`. Se inspeccionaron metadata, design context, textos, componentes internos, fills, strokes y effects. No se modificó Figma.

`App.jsx` compone explícitamente Hero → ProblemSection → SolutionSection. Contenido aprobado en `src/data/problem.js` y `solution.js`; presentación en `src/styles/problem-solution.css`. Sin registry, interacción nueva, renderer, motion ni dependencia. Header/Hero, sus assets, estilos y hook permanecen intactos.

Problema: cuatro cards 300×340 en 1536, gaps 43/35/35, connectors de 2 px, icon/ring, badge, título y descripción. Banner 1313×104 separado del proceso. Mobile: lista vertical de 342 px, columna de iconos 56 px y copy 270 px; conclusión 342×116. Se conservaron los saltos aprobados del primer step sin duplicar contenido.

Solución: palabras Display / Feature de Foundation, composición Desktop escalonada, números, rails y accents. Posiciones de keywords 209/190, 564/408 y 1000/635 en 1536. Mobile: offsets 0/8/16, CLARIDAD y ACCIÓN 60/64; CONFIANZA **56/60**, excepción local. Descripciones exactas de Figma.

Glows exclusivamente Desktop: tres elipses por sección con colores, opacity, posiciones y tamaños del master. Blur CSS 85/80 px equivale a stdDeviation exportado de Figma para efectos 170/160. Mobile no incorpora halos ausentes del master. Sin loops decorativos nuevos ni coste JS continuo.

## Assets

Diez exports SVG exactos, locales en `src/assets/problem/`: Eye, Search, Help Circle, Log Out y Trending Down para ambos masters. Mobile incluye sus rings dentro del export. Desktop conserva vectores originales 40/44 px; los círculos y badges se resuelven con CSS usando los strokes/fills inspeccionados. Roots SVG y paths preservados; sin URLs temporales ni librería de iconos. Assets del diseño propio, sin nueva licencia de terceros.

## Responsive y excepciones

- <768: secuencia vertical y Solución escalonada Mobile, gutters 24 px.
- 768–1199: proceso en dos columnas, copy fluido; Solución progresivamente abierta con offsets 0/8%/24% y roles fluidos existentes. Connectors horizontales solo con las cuatro cards Desktop.
- ≥1200: cuatro cards; offsets Desktop conservados. Entre 1200 y 1439 se liberan saltos maestros y se reduce padding horizontal local a 16 px para evitar compresión. Altura crece según texto; no se recorta contenido.
- <390: keywords ajustan su tamaño localmente para mantener lectura en 320; CONFIANZA conserva 56/60 en el master 390 y no cambia el token global.
- Inter óptico fijo local a estas secciones, igual al master Figma. Cajas tipográficas usan leading real: heading Problema 124 px dentro de caja Figma 130; keywords 122 dentro de caja 132; descripciones Solución 72 dentro de caja 74. Posiciones siguientes y alturas maestras permanecen exactas.

## QA

Preview del build en Chrome real, Inter Variable verificada por DevTools, assets decodificados, reduced motion para capturas. Masters comparados visualmente con screenshots Figma, corrigiendo wraps Desktop y el primer step Mobile. Referencias MCP Desktop/Mobile Problema escaladas únicamente para comparación, sin alterar geometría del browser.

| Master | Height | Elementos medidos (relativos a sección) |
|---|---|---|
| Problema 1536 | 1086 | Heading 304/168; descripción 344/333; cards 112,455,790,1125 /440; banner 112/825 |
| Problema 390 | 1188 | Intro 24/64; secuencia 24/450; conclusión 24/1008 |
| Solución 1536 | 941 | Keywords 209/190, 564/408, 1000/635; rails y accents según master |
| Solución 390 | 858 | Features 24/222, 24/430, 24/634; copy offsets 0/8/16 |

390 / 430 / 768 / 1024 / 1280 / 1536 y 767 / 1199 / 1200: sin overflow horizontal, copy cortado ni keywords colisionando. 320 adicional y duplicación real de tamaños/leading de texto en Mobile: contenido completo sin overflow. Las secciones crecen en flujo normal.

Continuidad: secciones consecutivas sin márgenes externos ni overlap. Hero ocupa 844 Mobile / 992 Desktop; Problema y Solución siguen exactamente después. Las capturas del Hero actual coinciden **píxel por píxel** con la evidencia protegida de Block 02 en ambos masters.

Semántica: section con aria-labelledby, un h1 global, dos h2 nuevos y siete h3, listas ordenadas, orden DOM narrativo y texto único. Pictures decorativos aria-hidden, imágenes alt vacío. Skip link y foco en main verificados; contenido no depende solo del cyan.

Evidencia: `docs/qa/block-03/` contiene los cuatro renders de sección y dos capturas continuas Desktop/Mobile. Se capturó la página completa y se recortaron las secciones a coordenadas nativas para evitar artefactos de elementos fixed en screenshots de locator.

`npm run check` y `git diff --check`: PASS. Browser: cero errores JS de aplicación, assets locales cargados. Favicon 404 preexistente en la primera navegación automática; favicon/OG siguen pendientes de aprobación, sin asset inventado. Sin nuevo blocker. QA Mobile en viewport Chrome, sin dispositivo físico.

## Coste y siguiente bloque

Baseline real: JS 206.64 kB / gzip 63.96; CSS 40.44 / gzip 8.63. Final: JS 218.09 / gzip 66.44; CSS 49.59 / gzip 10.29. Delta: JS +11.45 / gzip +2.48; CSS +9.15 / gzip +1.66. Inter 352.24 kB sin cambios. SVG pequeños incluidos por Vite. Sin dependencia, renderer ni loop nuevo; glows CSS estáticos solo Desktop.

Block 04 — Proyectos está **AUTHORIZED / NOT YET CLOSED**. No reabrir Problema + Solución durante ese bloque salvo regresión verificable.
