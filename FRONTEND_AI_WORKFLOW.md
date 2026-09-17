# Eze Web Studio V2 — Frontend + IA Workflow

Este documento guarda las decisiones de trabajo tomadas antes de comenzar el desarrollo de **Eze Web Studio V2**. Su objetivo es que, cuando llegue la etapa de implementación con ChatGPT Work / agentes de código, exista una fuente de verdad clara sobre cómo usar Figma, qué rol tienen los efectos visuales y qué herramientas deben priorizarse.

---

## 1. Principio general de trabajo

### Figma = maqueta visual, no motor de efectos

Figma se usa para cerrar:

- composición;
- jerarquía;
- ubicación de elementos;
- medidas y proporciones;
- tipografía;
- spacing;
- responsive desktop/mobile;
- intención visual general;
- una representación aproximada de fondos, glow, glass y motion.

**No hace falta reproducir en Figma con precisión técnica efectos complejos de luz, shaders, partículas o fondos animados.**

Si un efecto ya comunica bien su intención en la maqueta, se considera suficiente para el handoff.

La implementación final de esos recursos ocurre en código utilizando librerías especializadas.

---

## 2. Figma como fuente de verdad para layout

Cuando se pase una sección a Work:

- Figma manda sobre la implementación previa.
- Desktop y mobile deben tratarse como composiciones independientes.
- Work debe inspeccionar los nodos finales de Figma, no interpretar capturas a ojo.
- No rediseñar, simplificar ni "mejorar" la composición aprobada sin autorización.
- Textos, spacing, alineaciones, tamaños, radios y jerarquía deben reproducirse con fidelidad.

### Importante

Los efectos visuales complejos son la excepción: Figma define **cómo deben sentirse y dónde deben existir**, pero la implementación puede utilizar una solución técnica superior a la maqueta.

---

## 3. Regla principal para efectos visuales

### Library-first visual effects

Antes de implementar manualmente:

- fondos animados;
- shaders;
- partículas;
- glow complejo;
- auroras;
- gradients animados;
- noise;
- beams;
- glass avanzado;
- motion ornamental;

Work debe revisar primero las librerías aprobadas del proyecto.

> **No recrear efectos visuales complejos con SVG/CSS artesanal si existe una librería mantenida que permite conseguir un resultado igual o mejor.**

Se busca:

- mejor resultado visual;
- menos código custom;
- menor tiempo de implementación;
- animaciones más fluidas;
- mejor mantenimiento;
- mayor facilidad para iterar.

SVG/CSS manual queda reservado para detalles simples o cuando ninguna herramienta existente resuelve correctamente la intención visual.

---

## 4. Librerías visuales candidatas

Estas librerías deben revisarse cuando comience el desarrollo. No es obligatorio utilizar todas.

### Paper Shaders

Prioridad alta para:

- fondos vivos;
- shaders;
- campos de luz;
- texturas procedurales;
- noise;
- efectos animados configurables.

Repo / referencia:
`paper-design/shaders`

Uso esperado en EWS V2:
**candidato principal para fondos hero y escenas visuales complejas.**

---

### ShaderGradient

Útil para:

- gradients tridimensionales;
- campos de color animados;
- fondos fluidos;
- efectos compatibles con React.

Repo / referencia:
`ruucm/shadergradient`

Puede ser especialmente útil para traducir una intención visual aprobada a un fondo realmente vivo en producción.

---

### React Bits

Biblioteca amplia de efectos y componentes visuales para React.

Revisar principalmente:

- backgrounds;
- animated backgrounds;
- motion;
- decorative effects.

Repo / referencia:
`DavidHDev/react-bits`

Uso esperado:
soluciones rápidas para efectos secundarios o incluso fondos completos cuando encajen con el diseño.

---

### Aceternity UI

Revisar especialmente:

- Aurora backgrounds;
- Background Beams;
- Background Gradient Animation;
- Background Lines;
- Noise Background;
- efectos de luces y motion.

Sitio:
`ui.aceternity.com`

Uso esperado:
recursos visuales listos para adaptar al sistema EWS sin reinventarlos desde cero.

---

### tsParticles

Usar solo cuando haga falta una capa de partículas real.

Repo:
`tsparticles/tsparticles`

No debe convertirse en el protagonista del diseño.

Uso sugerido:

- sparks muy sutiles;
- polvo luminoso;
- pequeñas partículas ambientales.

---

### Magic UI

Puede servir para detalles secundarios:

- grids animados;
- patrones;
- pequeños efectos decorativos.

No es prioridad para el efecto principal del hero.

---

## 5. Dirección actual del Hero

El Hero de EWS V2 sigue esta dirección:

- fondo negro / dark profundo;
- texto principal centrado y dominante;
- eyebrow pequeño cyan;
- subtítulo centrado;
- CTA principal + CTA secundario;
- navegación minimal;
- cyan eléctrico como único acento visual principal;
- gran fuente de luz / horizonte cyan en el fondo;
- sensación clean, tecnológica y sofisticada;
- mucho aire;
- sin cards o dashboards debajo del hero;
- el fondo da vida al Hero, no contenido extra.

### Idea conceptual

No pensar el fondo como "un círculo cyan".

Pensarlo como:

> **una fuente de luz que casualmente describe un horizonte.**

La maqueta de Figma solo necesita representar bien:

- posición del horizonte;
- escala;
- intensidad aproximada;
- composición;
- relación con el texto.

El volumen, bloom, niebla, partículas y animación final se resolverán durante desarrollo con una librería especializada.

---

## 6. Filosofía de animación

Las animaciones deben sentirse, no llamar la atención sobre sí mismas.

### Sí

- movimiento lento;
- glow respirando;
- gradients cambiando muy sutilmente;
- partículas mínimas;
- interacción suave con mouse si suma;
- parallax muy leve;
- transiciones suaves entre secciones;
- motion consistente con una marca premium.

### No

- animaciones rápidas sin función;
- demasiadas partículas;
- mover headline constantemente;
- efectos gamer;
- exceso de scroll effects;
- glows pulsando de forma evidente;
- movimiento que dificulte la lectura.

Regla:

> Si el usuario piensa primero en la animación y después en el mensaje, el efecto es demasiado fuerte.

---

## 7. Glass

Glass puede aparecer en EWS V2 porque forma parte del lenguaje visual contemporáneo elegido, pero de manera selectiva.

Buenos lugares:

- botones secundarios;
- navegación;
- algún panel puntual;
- elementos flotantes;
- determinadas secciones posteriores.

Evitar:

- convertir toda la landing en glass;
- cards glass repetidas sin necesidad;
- blur exagerado;
- look genérico de SaaS / IA.

---

## 8. Skills de frontend para agentes IA

Antes del desarrollo conviene instalar / revisar skills especializadas que mejoren el criterio de Work.

### Anthropic — frontend-design

Repo:
`anthropics/skills`

Skill:
`frontend-design`

Interés principal:

- diseño frontend distintivo;
- evitar estética genérica de IA;
- mayor atención al craft visual.

**Prioridad alta.**

---

### Vercel — web-design-guidelines

Repo:
`vercel-labs/agent-skills`

Skill:
`web-design-guidelines`

Útil para:

- revisión final;
- UX;
- accesibilidad;
- buenas prácticas web;
- QA de interfaz.

Usarla principalmente como auditoría, no como reemplazo del diseño aprobado.

---

### Microsoft — frontend-design-review

Repo:
`microsoft/skills`

Skill:
`frontend-design-review`

Útil para:

- responsive;
- calidad de implementación;
- accesibilidad;
- revisión visual;
- craft.

---

### iuliandita — frontend-design

Repo:
`iuliandita/skills`

Skill:
`frontend-design`

Útil para un workflow más operativo de:

- build;
- refine;
- critique;
- revisión del resultado renderizado.

---

### Nolly Studio — design-md

Repo:
`nolly-studio/agent-skills`

Skill:
`design-md`

Especialmente interesante para este proyecto porque permite mantener un documento `DESIGN.md` que funcione como contrato visual permanente para humanos y agentes.

Evaluar antes de iniciar la implementación completa.

---

## 9. Workflow esperado con ChatGPT Work

Cuando comience el desarrollo:

### Paso 1 — Leer contexto

Work debe leer:

- este documento;
- `DESIGN.md` cuando exista;
- cualquier skill instalada;
- las referencias de Figma;
- la estructura actual del repo.

### Paso 2 — Inspeccionar Figma

Abrir los nodos Desktop y Mobile finales.

Extraer:

- layout;
- dimensiones;
- typography;
- spacing;
- hierarchy;
- responsive intent;
- ubicación aproximada de efectos visuales.

### Paso 3 — Buscar solución de librería

Antes de construir efectos manuales:

1. Paper Shaders;
2. ShaderGradient;
3. React Bits;
4. Aceternity UI;
5. Magic UI;
6. tsParticles cuando corresponda;
7. otras librerías mantenidas si son claramente mejores.

Elegir la herramienta que más se acerque visualmente con menor complejidad innecesaria.

### Paso 4 — Implementar layout

Primero conseguir fidelidad estructural con Figma.

Después agregar:

- background real;
- motion;
- shaders;
- particles;
- interaction;
- polish.

No mezclar ambos problemas en la primera pasada.

### Paso 5 — Visual QA

Comparar screenshots reales con Figma en tamaños de referencia.

Corregir:

- posiciones;
- tamaños;
- spacing;
- typography;
- alignment;
- responsive;
- visual hierarchy.

### Paso 6 — Effects QA

Revisar separadamente:

- intensidad;
- rendimiento;
- suavidad;
- legibilidad;
- motion;
- responsive behavior.

---

## 10. Responsive

Mobile no debe ser una versión desktop encogida.

Cada diseño Mobile de Figma define su propia composición.

Para efectos complejos:

- reducir partículas;
- reducir layers;
- bajar intensidad si hace falta;
- evitar GPU excesiva;
- preservar la idea principal en lugar de copiar todos los detalles desktop.

---

## 11. Performance

La estética no debe perjudicar la experiencia.

Durante implementación revisar:

- FPS;
- peso de bundle;
- WebGL / canvas cost;
- lazy loading donde tenga sentido;
- mobile GPU usage;
- `prefers-reduced-motion`;
- fallback estático si una tecnología no está disponible.

Si dos soluciones producen un resultado visual similar, elegir la más mantenible y eficiente.

---

## 12. Criterio de aprobación de efectos

Un efecto complejo queda aprobado cuando:

1. se acerca a la intención visual del diseño;
2. parece integrado y no agregado encima;
3. no roba protagonismo al contenido;
4. funciona correctamente en responsive;
5. tiene movimiento sutil;
6. no perjudica legibilidad;
7. tiene buen rendimiento;
8. es mantenible;
9. utiliza librería existente cuando es razonable;
10. no parece una demo tecnológica por encima de una landing comercial.

---

## 13. Principio final

Eze Web Studio V2 debe combinar:

**Figma para decidir exactamente qué queremos comunicar y dónde vive cada cosa.**

con

**librerías frontend especializadas para conseguir en producción un acabado visual superior al que tiene sentido reconstruir dentro de Figma.**

El objetivo no es que el código copie las limitaciones de la maqueta.

El objetivo es que el producto final conserve la intención del diseño y la lleve a un nivel superior mediante herramientas técnicas apropiadas.
