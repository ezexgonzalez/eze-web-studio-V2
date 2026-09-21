# Eze Web Studio V2 — Project Brief

## Negocio

Eze Web Studio — estudio web enfocado principalmente en landing pages claras, visualmente cuidadas y orientadas a generar consultas.

## Público

Negocios, profesionales y servicios que necesitan una presencia web más clara, profesional y confiable, especialmente cuando hoy dependen demasiado de redes sociales o tienen una web que no comunica bien.

## Objetivo principal

Presentar Eze Web Studio con una landing propia que:

- explique rápidamente qué hacemos;
- demuestre criterio visual y calidad;
- muestre proyectos / demos;
- transmita confianza;
- conduzca naturalmente a una conversación o consulta.

## CTA principal

Contacto directo / “Hablemos”.

CTA secundario del Hero: “Ver proyectos”.

## Restricciones y requisitos

- diseño minimalista, moderno y CLEAN;
- identidad tecnológica sofisticada, no gamer;
- fondo oscuro con blanco y cyan eléctrico como acento principal;
- evitar estética SaaS / IA genérica;
- Hero con más vida e impacto visual;
- secciones posteriores más tranquilas y orientadas a lectura;
- no usar componentes Pro, trials ni recursos premium para motion o efectos visuales;
- priorizar librerías gratuitas/open source de buena calidad;
- Figma define layout y composición; los efectos complejos se resuelven en producción;
- desktop y mobile deben tratarse como composiciones reales;
- accesibilidad básica, performance y `prefers-reduced-motion` son obligatorios.

## Visual Recognition Brief

### Referencias analizadas

Las referencias y mockups aprobados del proyecto funcionan como fuente de verdad visual. No trasladar automáticamente patrones genéricos de librerías o templates.

### Estética buscada

- minimal tech premium;
- dark;
- limpia;
- precisa;
- moderna;
- con mucho control de spacing;
- alto contraste;
- cyan eléctrico;
- Hero atmosférico e inmersivo;
- resto de la landing más sobrio y respirado.

### Elementos a adoptar

- gran jerarquía tipográfica;
- mucho aire;
- navegación minimal;
- fondos oscuros controlados;
- líneas / grid muy sutiles;
- luz cyan como recurso identitario;
- motion ambiental;
- composición clara;
- transiciones suaves.

### Elementos a evitar

- dashboards ficticios;
- cards repetidas sin necesidad;
- bento grids por moda;
- exceso de pills;
- glow agresivo;
- movimiento rápido;
- demasiadas partículas;
- 3D gratuito;
- estética gamer;
- efectos que compitan con el mensaje;
- layouts genéricos de startup / SaaS.

### Elementos que no deben copiarse literalmente

Las librerías de efectos son materia prima técnica, no diseño final. Nunca adoptar el look default de una librería si contradice la composición aprobada.

## Dirección creativa aprobada

La landing combina dos ritmos:

1. **Hero de impacto:** vivo, atmosférico, con gran horizonte/fuente de luz cyan animada.
2. **Contenido posterior:** más tranquilo, limpio y editorial, donde domina la claridad del mensaje.

El Hero no debe llenarse de contenido extra. La vida proviene principalmente del fondo.

### Hero — dirección de motion

Movimiento buscado:

- respiración muy lenta del glow;
- cambios suaves de intensidad en el arco/horizonte;
- halo o niebla cyan moviéndose sutilmente;
- partículas mínimas;
- posible reacción al cursor solo si es muy leve;
- grid prácticamente estático.

El visitante debe percibir que el fondo está vivo sin pensar primero en la animación.

## Tooling visual aprobado

Política: **FREE / OPEN SOURCE FIRST**.

Orden de prueba para el fondo del Hero:

1. React Bits — solo componentes FREE.
2. ShaderGradient.
3. Vanta.js.
4. otras alternativas gratuitas/open source mantenidas si ninguna de las anteriores resuelve correctamente la intención.

No instalar todas las opciones. Hacer un spike técnico, elegir una y conservar únicamente las dependencias usadas.

Antes de adoptar una librería:

- verificar licencia compatible con producción comercial;
- evaluar fidelidad al diseño;
- revisar coste de bundle / WebGL;
- probar desktop y mobile;
- revisar `prefers-reduced-motion`;
- asegurar fallback razonable.

## Secciones y orden aprobados

Estado actual:

1. Hero — aprobado visualmente, pendiente ajuste rápido de navegación y motion real del background.
2. El problema — diseño ya definido.
3. Resto de secciones — continuar según dirección creativa aprobada y Figma.

No inventar secciones únicamente porque “toda landing las tiene”.

## Assets disponibles

Usar Figma, mockups aprobados y assets reales del proyecto como fuente de verdad. No reemplazar assets aprobados por alternativas genéricas sin autorización.

## Notas

La implementación del efecto del Hero corresponde al Web Production Agent.

Primero realizar una prueba aislada del fondo; no reescribir toda la sección antes de validar que la tecnología elegida reproduce correctamente la intención visual.
