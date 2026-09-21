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

### Restricción de tooling — FREE / OPEN SOURCE FIRST

Para Eze Web Studio V2, los efectos visuales deben resolverse por defecto con herramientas **gratuitas y/o open source** que permitan uso legítimo en producción.

Reglas:

- no comprar planes Pro para resolver backgrounds, shaders, partículas, motion o efectos ornamentales;
- no depender de trials, componentes premium ni assets que exijan una suscripción para mantener el resultado;
- verificar licencia y compatibilidad con uso comercial antes de adoptar una librería;
- no instalar todas las alternativas: hacer una prueba aislada, elegir una y agregar únicamente las dependencias realmente usadas;
- si una solución gratuita de calidad resuelve correctamente la intención visual, no introducir una opción paga;
- una herramienta gratuita no se aprueba solo por ser gratis: debe tener calidad visual, personalización suficiente, mantenimiento razonable y coste técnico aceptable.

Regla ejecutiva:

> **Primero agotar soluciones gratuitas/open source de calidad. Pagar solo si una ventaja concreta y difícil de reemplazar justifica la inversión.**

---

## 4. Librerías visuales candidatas

No existe una librería obligatoria para todo el proyecto. Se selecciona según el efecto concreto.

Para el **Hero actual**, el orden de prueba aprobado es:

### 1. React Bits — FREE

Primera prueba por velocidad de integración y catálogo de backgrounds React.

Revisar únicamente componentes y recursos disponibles en su capa gratuita / open source.

Priorizar efectos que permitan aproximar:

- horizonte o arco luminoso;
- glow ambiental;
- light rays / beams suaves;
- aurora o niebla de luz;
- movimiento lento y parametrizable.

Repo / referencia:
`DavidHDev/react-bits`

No utilizar componentes Pro.

---

### 2. ShaderGradient

Fallback principal cuando React Bits no permita reproducir correctamente la silueta curva o la profundidad del fondo.

Útil para:

- gradients tridimensionales;
- superficies curvas;
- campos de color animados;
- fondos fluidos;
- escenas compatibles con React / WebGL.

Repo / referencia:
`ruucm/shadergradient`

---

### 3. Vanta.js

Alternativa gratuita para fondos WebGL listos cuando alguno de sus efectos encaje realmente con la dirección visual.

Repo / referencia:
`tengbao/vanta`

No usarlo si obliga a cambiar la identidad del Hero para adaptarnos al efecto disponible.

---

### Otras opciones gratuitas

Pueden evaluarse cuando aporten una ventaja concreta:

- Paper Shaders;
- componentes free de Aceternity UI;
- Magic UI;
- tsParticles para partículas ambientales puntuales;
- otras librerías mantenidas y con licencia compatible.

No convertir esta lista en dependencias permanentes.

### Regla de selección

Para cada efecto:

1. buscar la solución gratuita que mejor reproduzca la intención aprobada;
2. hacer una prueba técnica aislada;
3. medir fidelidad visual, control, responsive y coste de performance;
4. elegir una sola implementación;
5. recién entonces agregar las dependencias necesarias al proyecto.

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

El Hero es el momento de mayor impacto visual de la landing. Las secciones posteriores deben bajar la intensidad y priorizar lectura, contenido y respiración.

No pensar el fondo como "un círculo cyan".

Pensarlo como:

> **una fuente de luz que casualmente describe un horizonte.**

La maqueta de Figma solo necesita representar bien:

- posición del horizonte;
- escala;
- intensidad aproximada;
- composición;
- relación con el texto.

El volumen, bloom, niebla, partículas y animación final se resolverán durante desarrollo con una librería especializada gratuita/open source.

Movimiento buscado para el Hero:

- respiración muy lenta del glow;
- variaciones suaves de intensidad recorriendo el horizonte;
- halo o niebla cyan con movimiento ambiental;
- muy pocas partículas y con desplazamiento lento;
- reacción al cursor solo si es extremadamente sutil y mejora el resultado;
- grid prácticamente estático.

El efecto debe comunicar que el fondo está vivo sin competir con el headline.

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

Para el Hero actual:

1. React Bits FREE;
2. ShaderGradient;
3. Vanta.js;
4. otras alternativas gratuitas/open source mantenidas si las anteriores no alcanzan.

Para efectos secundarios pueden evaluarse Paper Shaders, componentes free de Aceternity UI, Magic UI o tsParticles cuando corresponda.

No usar componentes Pro, trials ni recursos premium.

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
