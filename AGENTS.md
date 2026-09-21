# Instrucciones para agentes

## Propósito del repositorio

`eze-web-studio-V2` es la implementación activa de la nueva landing oficial de **Eze Web Studio**.

Este repositorio ya no debe tratarse como una plantilla neutral durante la implementación actual. Las decisiones aprobadas de marca, composición, copy y dirección visual de Eze Web Studio sí pueden y deben implementarse aquí.

La base reutilizable que originó el proyecto sigue aportando patrones técnicos, ejemplos y estructura, pero no tiene prioridad sobre el brief actual, Figma aprobado ni las decisiones vigentes del proyecto.

## Principios de trabajo

- Mantener los componentes claros, mantenibles y razonablemente reutilizables cuando exista reutilización real.
- Mantener separados el contenido, la presentación y el comportamiento cuando eso mejore el mantenimiento.
- Limitar `src/data/siteConfig.js` a configuración compartida; el contenido específico de secciones puede vivir en módulos de datos propios.
- Los datos reales de Eze Web Studio pueden formar parte de este proyecto.
- No forzar abstracciones genéricas si destruyen una composición específica aprobada.
- Respetar la estructura existente del proyecto antes de introducir nuevas abstracciones.
- Mantener el código limpio, legible y sencillo de modificar por otra persona o agente.
- No agregar librerías sin una necesidad concreta y una justificación clara.
- Para efectos visuales complejos aplicar **library-first**: antes de recrear shaders, fondos, partículas, auroras, beams o glow complejo manualmente, revisar soluciones gratuitas/open source aprobadas.
- No usar componentes Pro, trials ni recursos premium para efectos visuales.
- No instalar varias librerías candidatas a la vez: hacer un spike, elegir una y dejar solo las dependencias realmente usadas.
- Mantener `npm run build` funcionando después de cada cambio relevante.

## Composición manual y ejemplos

- `src/examples` es material opt-in: demuestra técnicas y no forma parte automática de ningún proyecto.
- Nunca asumir que un ejemplo debe formar parte de una landing nueva.
- Nunca importar todas las secciones por defecto.
- Editar `App.jsx` manualmente para elegir y ordenar las secciones de cada proyecto.
- No crear un registry de secciones, page builder, renderer dinámico ni arrays que compongan la página.
- Antes de diseñar debe existir reconocimiento visual y una dirección creativa aprobada.
- Una landing nueva no hereda automáticamente layout, theme, composición ni secuencia del starter.

## Criterio para nuevas secciones

Antes de crear una sección, definir:

1. Qué función cumple en la narrativa de la landing.
2. Qué duda, necesidad u objeción del visitante resuelve.
3. Qué acción o comprensión debe provocar.
4. Por qué necesita existir como sección independiente.

Cada sección debe tener una intención visual propia, coherente con su función. No repetir automáticamente la misma combinación de título, texto y grupo de cards.

La landing debe construir una secuencia clara: presentar, generar interés, demostrar valor, reducir dudas y facilitar la acción. El orden final puede variar según el rubro y el objetivo comercial, y debe aprobarse para cada proyecto.

## Criterio visual

- Usar `design-guidelines.md` como referencia creativa antes de diseñar o adaptar una demo.
- Evitar una estética genérica o reconocible como generada por IA.
- No abusar de glassmorphism, cards repetidas, gradientes, brillos, sombras o decoraciones sin función.
- No elegir recursos visuales solo porque están de moda.
- Dar a cada decisión visual una relación clara con el rubro, el mensaje o la experiencia del usuario.
- Priorizar jerarquía, legibilidad, ritmo y contenido por encima de la ornamentación.

## Responsive y accesibilidad

- Trabajar con enfoque mobile-first.
- Comprobar que jerarquía, navegación, contenido y llamadas a la acción funcionen primero en pantallas pequeñas.
- Evitar que la versión móvil sea únicamente una reducción de la composición de escritorio.
- Mantener contraste suficiente, estados interactivos visibles y estructura semántica comprensible.
- Optimizar imágenes y evitar recursos que perjudiquen innecesariamente el rendimiento.

## Configuración y contenido

- Centralizar los datos editables de cada sección fuera de sus componentes, en el módulo de configuración o contenido que corresponda.
- Extender la configuración siguiendo patrones simples y explícitos cuando una sección necesite datos editables.
- Mantener separados el contenido, la presentación y el comportamiento.
- Usar contenido de ejemplo neutral en la plantilla madre.
- No introducir información real o ficticia que vincule el starter con un cliente particular.

## Validación antes de finalizar

- Confirmar que el cambio sigue siendo reutilizable para distintos negocios.
- Confirmar que no se hardcodearon datos de cliente.
- Confirmar que las nuevas secciones tienen una función narrativa y una intención visual definidas.
- Revisar la experiencia en mobile y desktop.
- Ejecutar las verificaciones disponibles en el proyecto.
- Usar `npm run check` como validación técnica final y resolver cualquier error antes de dar el trabajo por terminado.
- Documentar cualquier dependencia nueva y explicar por qué era necesaria.


## Política actual de efectos visuales — EWS V2

El Hero aprobado necesita una gran fuente de luz / horizonte cyan animado. Figma define composición e intención; el efecto final se resuelve en producción.

Orden de prueba actual:

1. React Bits — únicamente recursos FREE.
2. ShaderGradient.
3. Vanta.js.
4. otra alternativa gratuita/open source solo si las anteriores no resuelven la intención.

Criterios obligatorios:

- movimiento ambiental, lento y sutil;
- sin estética gamer;
- sin convertir el fondo en protagonista por encima del copy;
- desktop y mobile deben conservar la idea sin exigir el mismo coste gráfico;
- respetar `prefers-reduced-motion`;
- verificar licencia compatible antes de adoptar una dependencia;
- no modificar la composición aprobada solo para adaptarse a una librería.
