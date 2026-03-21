import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);

function getArg(name, fallback = '') {
  const index = args.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return args[index + 1] || fallback;
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const title = getArg('title', 'Instalación de SQL Server en Ubuntu 24.04');
const os = getArg('os', 'Ubuntu 24.04');
const category = getArg('category', 'Bases de Datos');
const difficulty = getArg('difficulty', 'Intermedio');
const id = getArg('id', slugify(title));
const appliesTo = getArg('applies-to', os);

export function buildGuidePrompt({
  title = 'Instalación de SQL Server en Ubuntu 24.04',
  os = 'Ubuntu 24.04',
  category = 'Bases de Datos',
  difficulty = 'Intermedio',
  id = slugify(title),
  appliesTo = os,
  reviewedAt = new Date().toISOString().slice(0, 10)
} = {}) {
  return `Genera un archivo JSON para SYSnergia Editorial con la siguiente guía:

TEMA: ${title}
ID sugerido: ${id}
OS principal: ${os}
APPLIES_TO: ${appliesTo}
DIFICULTAD: ${difficulty}
CATEGORÍA: ${category}

Debes responder SOLO con JSON válido, sin markdown ni explicaciones.

Usa EXACTAMENTE esta estructura:

{
  "id": "${id}",
  "title": "${title}",
  "subtitle": "Descripción breve de lo que se logra.",
  "category": "${category}",
  "os": ["${os}"],
  "status": "draft",
  "reviewed_at": "${reviewedAt}",
  "prerequisites": [
    "Prerequisito 1"
  ],
  "applies_to": [
    "${appliesTo}"
  ],
  "tags": [
    { "label": "Versión del software", "type": "version" },
    { "label": "${difficulty}", "type": "difficulty" }
  ],
  "steps": [
    {
      "num": "01",
      "title": "Título del paso",
      "desc": "Descripción breve. Usa <code>comando</code> para inline code.",
      "blocks": [
        {
          "lang": "bash",
          "code": "# comentario\\n# comando\\n$ comando-usuario\\n# output esperado"
        }
      ],
      "table": null,
      "info": {
        "type": "tip",
        "text": "Aviso breve. Usa <code>código</code> si aplica."
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
          "code": "# comando-de-diagnostico\\n# comando-correctivo"
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

REGLAS:
- Los comandos de root llevan prefijo "# ".
- Los comandos de usuario llevan prefijo "$ ".
- Las líneas de output no llevan prefijo.
- Los comentarios llevan "# " al inicio.
- Usa "type": "tip", "warn" o "note" en info.
- En textos enriquecidos solo se permite <code>...</code>.
- No uses markdown fences.
- No uses sudo dentro de bloques bash.
- Incluye entre 3 y 6 pasos útiles y técnicamente coherentes.
- Añade troubleshooting realista y al menos una fuente oficial o primaria.
- Si la guía aplica a más de un sistema, adapta comandos o aclara el alcance.
`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const prompt = buildGuidePrompt({
    title,
    os,
    category,
    difficulty,
    id,
    appliesTo
  });

  console.log(prompt);
}
