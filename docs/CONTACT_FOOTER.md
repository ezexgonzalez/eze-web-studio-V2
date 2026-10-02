# Block 06 — Contacto + Footer

**STATUS: IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA**

Branch: `feature/ews-v2-production`. Base limpia y sincronizada: `5d888e2c448e87613c7a1cd98c0149fadae79b71`.

Commit de implementación: `e2d09e1510299568396369c00092d8dc21a240db`.

## Fuentes y alcance

Figma: **Eze Web Studio — New Landing 2026**, `aw1k9uSQJhmNGeODZY7BC3`.

| Sección | Desktop FINAL / FROZEN | Mobile FINAL / FROZEN |
| --- | --- | --- |
| Contacto | `95:66`, 1536 × 864 | `191:46`, 390 × 754 |
| Footer | `99:66`, 1536 × 864 | `191:71`, 390 × 470 |

Se inspeccionaron metadata, design context, renders y propiedades internas de los cuatro masters: texto, estilos, fills/tokens, grid, dividers, estados/destinos, geometría de CTA y diferencias Mobile. Figma no fue modificado. Los renders Figma son referencias de diseño; no son evidencia de browser QA.

QA final visual/browser a cargo de Eze según brief y AGENTS. No se intentaron workarounds del browser sandbox ni se fabricaron screenshots. El bloque no está CLOSED / APPROVED; Dirección decide después de la revisión manual.

## Implementación y composición

`ContactSection.jsx` nuevo y `Footer.jsx` existente adaptado a V2, importados explícitamente en App. Contacto queda como último section de `main`; Footer es su sibling, para conservar el landmark de pie de página. Orden: Hero → Problema → Solución → Proyectos → About → FAQ → Contacto → Footer.

Estilos locales en `src/styles/contact-footer.css`, importados desde index.css. No se modificaron componentes/hooks/estilos/assets de Blocks 01–05. Solo se extendieron los módulos compartidos de navegación/siteConfig sin alterar sus exports/valores anteriores. Sin motion, forms, cards, foto, nueva librería ni efectos nuevos.

### Contacto Desktop

Fondo Background Alternate. Grid Default independiente en x62/322/583/844/1105/1366/1473 e y73/737. Split editorial con divider Strong 1 × 455 en x889/y182. Heading XL 68/76, description Body LG 22/34, CTA Display Action 64/72 y detalles Contact Detail 24/32, todos roles existentes.

El layout apunta al eyebrow x131/y231, heading x130/y279, description x131/y477, CTA x966/y265, arrow x1337/y286 y rule 440 × 2 en y367. Detalles en x970: Email y424/453, Instagram y534/562. El centrado vertical de las cajas tipográficas de Figma se conserva con leading y alturas mínimas locales; no hay recorte de texto.

### Contacto Mobile

Gutter 24 y comienzo y88. Heading XL 44/50 con los dos saltos aprobados, description Body LG 18/28 y pausa de 64 hasta la CTA. Label 48/54, arrow slot 34 × 24 y gap 12; rule 342 × 2 a 16 px de la fila. Detalles a 48 px, labels Body MD 16/26 y valores Body LG 18/28 separados por 28 px. Grid Subtle en x24/195/366 e y140/410/680. Altura maestra objetivo 754 px; contenido en flujo expansible.

### Footer Desktop

Se preserva el aire del master de 864 px. Top Rule Strong 1319 × 2 en x109/y372; wordmark en x109/y438, Brand Footer 25/32, tracking aprobado. Navegación horizontal en las posiciones x970/1120/1245/1338 con Navigation Footer 18/28. Copyright/back-to-top usan Footer Meta 19/28 y extremos opuestos; el target de volver arriba sigue ≥44 de alto.

Las pequeñas diferencias entre bounding boxes de texto y regla (nav 6 px y back-to-top 4 px más allá del final de la regla) se conservan con offsets locales. No se normalizan los elementos contra un container genérico. Grid Subtle propio x51/365/635/905/1175/1486 e y123/273/584/720.

### Footer Mobile

Gutter 24 y comienzo y72, Top Rule 342 × 2. Wordmark y106, rol Brand Header 18/24 aprobado para Mobile. Nav vertical y154: cuatro anchors de altura mínima 44, Body MD 16/26. Bottom y362: copyright Body SM 14/22 y Volver arriba con target mínimo 101 × 44. Grid Subtle x24/195/366 e y180/360. Altura maestra objetivo 470 px; no slogans/contacto repetido ni iconos decorativos nuevos.

## Datos y destinos

`src/data/contact.js` mantiene los valores originales y agrega únicamente el copy/labels aprobados. Nada se hardcodea como destino dentro del componente.

| Elemento | Estado actual | Semántica |
| --- | --- | --- |
| Email | `hola@ezewebstudio.com`, `mailto:hola@ezewebstudio.com` | Anchor real |
| Instagram | `@ezewebstudio`, `instagramUrl: null` | Texto, sin enlace |
| HABLEMOS | `externalCtaUrl: null` | Button nativo disabled, sin href |

Cuando Dirección apruebe URLs reales en el módulo, CTA/Instagram se renderizan como anchors con `target="_blank"` y `rel="noopener noreferrer"`. No se agregó href="#", javascript URL ni destino inventado. Los links HABLEMOS de Header/Hero siguen apuntando al section `#contacto`, sin cambiar su comportamiento.

Footer usa `footerNavigation` en `src/data/navigation.js`, con href derivados del objeto compartido `anchors`; volver arriba usa `anchors.inicio`. Wordmark/copyright/label de volver arriba provienen de siteConfig. No hay router ni scroll JS propio. Smooth scroll/offset/reduced motion pertenecen a Foundation y quedaron intactos.

## Responsive por código

Mobile <768, Transition 768–1199 en stack, Desktop ≥1200 en split/horizontal nav. Gutters/tipografía de Foundation, max-width 848 para contenido Transition. CTA/rule se estrechan progresivamente desde 720 hasta 440 px en Transition para evitar salto 767/768. Footer conserva nav vertical hasta Desktop. Decoración recortada en su propia capa, nunca contenido.

| Ancho | Contact prompt | Contact action | CTA | Footer contenido |
| --- | ---: | ---: | ---: | ---: |
| 390 | 342 | 342 | 342 | 342 |
| 430 | 382 | 382 | 382 | 382 |
| 767 | 719 | 719 | 719 | 719 |
| 768 | 720 | 720 | 720 | 720 |
| 1024 | 848 | 848 | 554.07 | 848 |
| 1199 | 848 | 848 | 440.65 | 848 |
| 1200 | 600.54 | 391.46 | 391.46 | 1072 |
| 1280 | 618.27 | 403.02 | 403.02 | 1130.81 |
| 1536 | 675 | 440 | 440 | 1319 |

Valores en px calculados desde CSS, no medidos en browser. En Desktop estrecho la CTA usa una interpolación local 56 → 64 entre 1200 y 1536; evita colisión con la flecha y recupera exactamente el rol Display Action del master. No cambia el token global. Bajo 390 el label interpola localmente 40 → 48 para soportar el mínimo 320 del body. El análisis basado en el ancho de label Figma deja presupuesto positivo para arrow/gap en todos esos anchos, incluido 320.

Email permite wrapping si es necesario; splits `minmax(0, …)`, alturas mínimas y bottom Footer con flex-wrap conservan contenido con tamaños variables. No se fijaron máximos de altura. El cambio 1199/1200 introduce la composición Desktop aprobada; su ritmo real queda en el QA manual.

## Assets y accesibilidad

Dos SVG exactos locales en `src/assets/contact/`, sin URLs temporales:

- `arrow-right-desktop.svg`: root/viewBox 56 × 48, slot Desktop 56 × 48.
- `arrow-right-mobile.svg`: root/viewBox 38 × 28 por stroke exportado alrededor del vector de 34 × 24. El wrapper conserva el slot 34 × 24, posiciona la imagen a -1.3/-1.8384 y preserva las dimensiones naturales del SVG. No se deforma para forzar 34 × 24.

`picture` selecciona Desktop desde 1200, `aria-hidden` y alt vacío. Ambos XML/dimensiones/non-empty validados; imports resueltos por build. Footer no necesita assets nuevos.

Section `#contacto` asociado con h2; dl/dt/dd para los detalles, mailto descriptivo y CTA disabled no anunciada como link. Footer landmark fuera de main; nav con label, anchors descriptivos y targets ≥44. IDs de sección compartidos y únicos, un solo h1. Focus-visible de Foundation. Grid/decoración aria-hidden; sin motion nuevo.

## Validación técnica

Baseline y final `npm run check`: **PASS**, ESLint + Vite build. `git diff --check`: **PASS**. Protected baseline y package.json/lockfile comprobados sin cambios.

Prueba aislada fuera del repo con React DOM/JSDOM y SSR sobre componentes reales: pending CTA disabled/sin href, click sin navegación, Instagram solo texto, mailto correcto y foco DOM, header asociado, App/landmarks/orden, todos los anchors existentes, IDs únicos, decoración oculta a AT, pending data anterior intacta y cleanup: **PASS**, sin React warnings detectados. Fixture en memoria con dominios reservados `.invalid` probó el cambio a anchors seguros; nunca modifica data de producción ni queda en bundle.

Bundle before/after: JS **232.93 → 238.12 kB**, gzip **69.56 → 70.46**; CSS **62.58 → 70.76 kB**, gzip **12.59 → 13.76**. Delta gzip JS +0.90 kB / CSS +1.17 kB. Inter 352.24 kB sin cambios. Sin dependencia runtime nueva, renderer, listener ni loop.

Continuidad revisada por estructura: Footer después de main, sections cerrados, sin márgenes entre FAQ/Contacto/Footer, mismo Background Alternate y sin solapamientos de contenido absoluto. No se afirma inspección de seams/overflow en browser.

## QA manual y pendientes

Eze debe comparar Contacto y Footer en 1536/390 con los masters indicados, fonts/assets cargados. Revisar alturas, wraps, CTA/arrow/rule, detalles, wordmark/nav/bottom, grids y aire. Revisar 430/768/1024/1280 y bordes 767/768, 1199/1200; zoom/text resizing y overflow. Probar links Header/Mobile Nav/Footer, mailto, Volver arriba, Tab/Shift+Tab y focus-visible; verificar CTA disabled, Instagram no clickable y consola. Revisar FAQ → Contacto → Footer como página continua.

Pendientes reales preservados: externalCtaUrl, instagramUrl, FAQ answers 02–05, Projects 02–03/URLs/previews, favicon y OG. No bloquean el estado de implementación aprobado, pero impiden declarar la landing FINAL completa. Próxima fase propuesta: Block 07 — Responsive Pass, solo después de QA/aprobación y autorización explícita de Dirección. No se inició.
