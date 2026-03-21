# Roadmap de Producto

SYSnergia Editorial no busca ser solo un clon visual de Server World. El objetivo es tomar su fortaleza principal, una cobertura amplia y organizada por sistema operativo y dominio técnico, y convertirla en una experiencia más clara, más editorial y más útil para operación real.

Referencia estructural revisada:

- Server World organiza el contenido primero por sistema operativo y luego por áreas técnicas y procedimientos concretos.
- La navegación expone árboles largos de temas como instalación inicial, SSH, DNS, almacenamiento, virtualización, contenedores y cloud.
- El valor central del sitio está en la profundidad temática y en la sensación de "manual operativo" por plataforma.

Fuente: https://www.server-world.info/en/

## Norte de producto

La versión mejorada debe conservar:

- navegación por sistema operativo
- amplitud de cobertura técnica
- guías paso a paso con comandos concretos
- sensación de enciclopedia práctica para administradores

La versión mejorada debe superar a la referencia en:

- descubrimiento de contenido
- legibilidad y diseño editorial
- consistencia entre guías
- búsqueda y filtros
- señal de calidad y vigencia del contenido
- seguridad del render y robustez del dato

## Diferenciadores obligatorios

1. Portada editorial útil

La home debe servir como mapa técnico real, no solo como lista larga. Debe permitir entrar por:

- sistema operativo
- categoría técnica
- tareas frecuentes
- guías destacadas y recientes

2. Navegación dual

El usuario debe poder entrar tanto por OS como por tema:

- Ubuntu 24.04 -> Nginx -> Reverse Proxy
- Contenedores -> Docker -> Debian 12

3. Metadata rica por guía

Cada guía debería declarar como mínimo:

- sistema operativo
- versión del OS
- software o servicio principal
- versión del software
- dificultad
- tiempo estimado
- prerequisitos
- fecha de revisión
- estado editorial: borrador, validada, desactualizada

4. Contenido más confiable

La app debe ayudar a detectar:

- enlaces a guías inexistentes
- contradicciones entre OS soportado y comandos mostrados
- uso inseguro o inconsistente de comandos
- contenido desactualizado o sin revisión reciente

5. UX moderna sin perder densidad

La mejora no es "hacerlo minimalista". Es mantener densidad informativa con:

- mejor jerarquía visual
- breadcrumbs claros
- filtros persistentes
- búsqueda real
- lectura cómoda en móvil y desktop

## Fases sugeridas

## Fase 1. Base editorial sólida

- sanear navegación para apuntar solo a guías existentes
- separar `index.html` en HTML, CSS y JS
- eliminar render inseguro basado en `innerHTML` con datos crudos
- fortalecer el validador de guías

## Fase 2. Arquitectura de descubrimiento

- rediseñar `docs/guides/index.json` para soportar navegación por OS y por dominio
- incorporar índices derivados: `by_os`, `by_category`, `featured`, `recent`
- agregar búsqueda por título, tags, servicio y OS

## Fase 3. Calidad editorial

- agregar estado editorial y fecha de revisión por guía
- introducir placeholders explícitos para contenido planeado
- marcar guías huérfanas, desactualizadas o incompletas

## Fase 4. Experiencia avanzada

- filtros combinables
- deep links por OS/categoría/guía
- comparativas entre distribuciones
- bloques reutilizables para pasos comunes

## Siguiente corte recomendado

El siguiente avance con mejor retorno es convertir el índice actual en una fuente de navegación real y confiable:

1. Limpiar referencias rotas en `docs/guides/index.json`.
2. Diseñar un modelo de datos que soporte entrada por OS y por categoría.
3. Refactorizar el render del cliente para usar construcción segura del DOM.

