# SYSnergia Editorial

Aplicación editorial estática para construir una versión mejorada de [Server World](https://www.server-world.info/en/): misma ambición enciclopédica y misma profundidad operativa, pero con mejor experiencia de descubrimiento, mejor consistencia editorial y una base técnica más segura y mantenible.

## Objetivo de producto

La referencia revisada muestra una estructura fuerte basada en:

- entrada por sistema operativo
- navegación profunda por dominios técnicos
- guías paso a paso orientadas a administración real

SYSnergia Editorial debe conservar ese valor central y mejorarlo en:

- portada editorial y descubrimiento
- navegación por OS y por categoría
- búsqueda y filtros
- calidad y vigencia del contenido
- robustez del render del lado cliente

La visión detallada y el plan de evolución quedaron en [ROADMAP.md](/var/www/sysnergia-editorial/ROADMAP.md).

## Stack actual

```text
sysnergia-editorial/
├── docs/
│   ├── index.html        ← aplicación estática
│   └── guides/
│       ├── index.json    ← portada, navegación y metadatos globales
│       └── *.json        ← guías editoriales
├── scripts/
│   ├── check-content.mjs ← validador de contenido
│   └── dev.mjs           ← servidor local + watcher
└── package.json          ← comandos del entorno de desarrollo
```

## Flujo de desarrollo

Requisitos:

- `node >= 20`
- `npm >= 9`
- `python3 >= 3.11`

Comandos:

```bash
npm run dev
npm run check
npm run check:watch
npm run serve
```

Qué hace cada uno:

- `npm run dev`: levanta el sitio local en `http://127.0.0.1:4173` y observa cambios en `docs/**/*.json`.
- `npm run serve`: sirve la carpeta `docs/` sin validación.
- `npm run check`: valida estructura, referencias y convenciones editoriales.
- `npm run check:watch`: revalida automáticamente cuando cambia una guía o `index.json`.

## Qué valida el entorno

El validador está pensado para evitar roturas típicas en una app editorial basada en JSON:

- JSON bien formado en `docs/guides/*.json`
- `id` consistente con el nombre del archivo
- campos mínimos presentes en cada guía
- estructura opcional de `prerequisites`, `applies_to`, `verification`, `troubleshooting` y `sources`
- referencias del `sidebar`, `news` y categorías apuntando a guías reales
- contador `site.stats.guides` alineado con las guías existentes
- uso restringido de markup inline a `<code>...</code>`
- aviso si en bloques `bash` aparece `sudo`

## Flujo editorial para una guía nueva

1. Crear el archivo `docs/guides/[id].json`.
2. Registrar la guía en `docs/guides/index.json`.
3. Ejecutar `npm run check`.
4. Levantar `npm run dev` y revisar la experiencia en navegador.

## Flujo IA para alimentar el sitio

La idea recomendada es dividir el trabajo así:

- la IA genera la guía base estructurada
- tú completas `troubleshooting`, validas comandos y añades fuentes confiables

Comando para generar un prompt listo:

```bash
npm run guide:prompt -- --title "Instalación de SQL Server en Ubuntu 24.04" --os "Ubuntu 24.04" --category "Bases de Datos" --difficulty "Intermedio"
```

Ese comando imprime un prompt listo para pegar en la IA. Después:

1. Copia el JSON generado al archivo `docs/guides/[id].json`.
2. Completa o corrige `troubleshooting` con tu experiencia.
3. Añade `sources` oficiales o técnicas.
4. Ejecuta `npm run check`.
5. Registra la guía en `docs/guides/index.json`.

Referencias locales para este flujo:

- plantilla: [docs/guides/_template.json](/var/www/sysnergia-editorial/docs/guides/_template.json)
- prompt maestro: [prompts/guide-json-prompt.md](/var/www/sysnergia-editorial/prompts/guide-json-prompt.md)
- backlog editorial: [docs/topics.json](/var/www/sysnergia-editorial/docs/topics.json)

## Backlog para alimentar con IA

El proyecto ya puede operar con un backlog de temas siguiendo el patrón editorial tipo Server World.
La estructura inicial del backlog fue sembrada usando `hungpt7.github.io` como mapa de categorías y temas por plataforma, no como fuente para copiar texto literal.

Comandos:

```bash
npm run guide:list
npm run guide:next
npm run guide:next-prompt
```

Qué hace cada uno:

- `npm run guide:list`: lista temas pendientes del backlog editorial.
- `npm run guide:next`: muestra el siguiente tema prioritario.
- `npm run guide:next-prompt`: imprime el prompt listo para pegar en la IA usando el siguiente tema pendiente.

También puedes filtrar desde el script base:

```bash
node scripts/guide-backlog.mjs list --os "Ubuntu 24.04"
node scripts/guide-backlog.mjs prompt --id "windows-server-sql-server"
```

Flujo recomendado:

1. Elegir un tema desde `docs/topics.json`.
2. Generar el prompt con `npm run guide:next-prompt` o con `guide:prompt`.
3. Pedir a la IA el JSON base.
4. Completar manualmente `troubleshooting` y `sources`.
5. Guardar la guía en `docs/guides/`.
6. Ejecutar `npm run check`.
7. Registrar la guía en `docs/guides/index.json`.

Formato base sugerido:

```json
{
  "id": "nombre-kebab-case",
  "title": "Título de la guía",
  "subtitle": "Descripción breve de lo que se logra.",
  "category": "Categoría",
  "os": ["Ubuntu 24.04"],
  "status": "draft",
  "reviewed_at": "2026-03-20",
  "prerequisites": [
    "Acceso administrativo al sistema"
  ],
  "applies_to": [
    "Ubuntu 24.04 LTS"
  ],
  "tags": [
    { "label": "Versión del software", "type": "version" },
    { "label": "Básico", "type": "difficulty" }
  ],
  "steps": [
    {
      "num": "01",
      "title": "Título del paso",
      "desc": "Descripción breve. Usa <code>comando</code> para código inline.",
      "blocks": [
        {
          "lang": "bash",
          "code": "# comentario\n# comando\n$ comando-usuario\n# output esperado"
        }
      ],
      "table": null,
      "info": {
        "type": "tip",
        "text": "Texto del aviso. Usa <code>código</code> si necesitas."
      }
    }
  ],
  "verification": {
    "summary": "Cómo comprobar que el procedimiento quedó correcto.",
    "checks": [
      "<code>comando --version</code> devuelve salida válida"
    ]
  },
  "troubleshooting": [
    {
      "symptom": "Síntoma observable",
      "cause": "Causa probable",
      "fix": "Acción correctiva resumida",
      "blocks": [
        {
          "lang": "bash",
          "code": "# comando-de-diagnostico\n# comando-correctivo"
        }
      ],
      "verify": "Cómo validar que el problema quedó resuelto."
    }
  ],
  "sources": [
    {
      "label": "Fuente oficial",
      "url": "https://ejemplo.com/doc",
      "note": "Qué parte de la guía respalda esta referencia."
    }
  ]
}
```

Reglas editoriales:

- Los comandos de root llevan prefijo `# `.
- Los comandos de usuario llevan prefijo `$ `.
- Las líneas de output no llevan prefijo.
- Los comentarios llevan `# ` al inicio.
- `info.type` acepta `tip`, `warn` o `note`.
- En textos enriquecidos solo se permite `<code>...</code>`.
- Evitar `sudo` dentro de bloques `bash`.
- `status` acepta `draft`, `reviewed` o `validated`.
- `troubleshooting` está pensado para aportar experiencia de campo y resolución de fallos.
- `sources` debe usarse para enlazar documentación oficial o referencias técnicas que respalden la guía.

## Publicación

La publicación sigue siendo compatible con GitHub Pages desde `main` apuntando a `/docs`.

```bash
git add docs
git add scripts package.json README.md .editorconfig
git commit -m "chore: preparar entorno de desarrollo"
git push origin main
```

## Próximos frentes recomendados

- Sanitizar el render del cliente para no depender de `innerHTML` con datos editoriales.
- Separar CSS y JavaScript de `docs/index.html`.
- Añadir navegación solo hacia guías existentes o crear placeholders editoriales explícitos.
- Incorporar búsqueda real y filtros por sistema operativo, categoría y dificultad.
