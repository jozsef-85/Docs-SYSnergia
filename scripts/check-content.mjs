import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const guidesDir = path.join(projectRoot, 'docs', 'guides');
const indexPath = path.join(guidesDir, 'index.json');
const watchMode = process.argv.includes('--watch');

const allowedInlineMarkup = /^([^<]|<(\/)?code>)*$/;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

function validateInlineMarkup(value, label, failures) {
  if (typeof value !== 'string') return;
  if (!allowedInlineMarkup.test(value)) {
    failures.push(`${label}: solo se permite markup inline <code>...</code>`);
  }
}

function validateStringList(list, label, failures) {
  assert(Array.isArray(list), `${label}: debe ser un arreglo`, failures);
  for (const [index, item] of (list || []).entries()) {
    assert(typeof item === 'string' && item.trim(), `${label}: entrada #${index + 1} inválida`, failures);
    validateInlineMarkup(item, `${label} #${index + 1}`, failures);
  }
}

function validateGuideFile(filePath, failures) {
  const fileName = path.basename(filePath);
  const guide = readJson(filePath);
  const expectedId = path.basename(filePath, '.json');

  assert(guide.id === expectedId, `${fileName}: el id debe coincidir con el nombre del archivo`, failures);
  assert(typeof guide.title === 'string' && guide.title.trim(), `${fileName}: falta title`, failures);
  assert(typeof guide.subtitle === 'string' && guide.subtitle.trim(), `${fileName}: falta subtitle`, failures);
  assert(typeof guide.category === 'string' && guide.category.trim(), `${fileName}: falta category`, failures);
  assert(Array.isArray(guide.os) && guide.os.length > 0, `${fileName}: os debe tener al menos una entrada`, failures);
  assert(Array.isArray(guide.tags) && guide.tags.length > 0, `${fileName}: tags debe tener al menos una entrada`, failures);
  assert(Array.isArray(guide.steps) && guide.steps.length > 0, `${fileName}: steps debe tener al menos una entrada`, failures);
  if ('status' in guide) assert(['draft', 'reviewed', 'validated'].includes(guide.status), `${fileName}: status inválido`, failures);
  if ('reviewed_at' in guide) assert(typeof guide.reviewed_at === 'string' && guide.reviewed_at.trim(), `${fileName}: reviewed_at inválido`, failures);
  if ('prerequisites' in guide) validateStringList(guide.prerequisites, `${fileName} prerequisites`, failures);
  if ('applies_to' in guide) validateStringList(guide.applies_to, `${fileName} applies_to`, failures);

  validateInlineMarkup(guide.subtitle, `${fileName} subtitle`, failures);

  for (const [tagIndex, tag] of (guide.tags || []).entries()) {
    assert(isObject(tag), `${fileName}: tag #${tagIndex + 1} debe ser un objeto`, failures);
    assert(typeof tag?.label === 'string' && tag.label.trim(), `${fileName}: tag #${tagIndex + 1} sin label`, failures);
    assert(typeof tag?.type === 'string' && tag.type.trim(), `${fileName}: tag #${tagIndex + 1} sin type`, failures);
  }

  for (const [stepIndex, step] of (guide.steps || []).entries()) {
    const prefix = `${fileName} step #${stepIndex + 1}`;

    assert(isObject(step), `${prefix}: el paso debe ser un objeto`, failures);
    assert(typeof step?.num === 'string' && step.num.trim(), `${prefix}: falta num`, failures);
    assert(typeof step?.title === 'string' && step.title.trim(), `${prefix}: falta title`, failures);

    if ('desc' in step) validateInlineMarkup(step.desc, `${prefix} desc`, failures);
    if ('info' in step && step.info !== null) {
      assert(isObject(step.info), `${prefix}: info debe ser un objeto`, failures);
      validateInlineMarkup(step.info?.text, `${prefix} info.text`, failures);
      assert(['tip', 'warn', 'note'].includes(step.info?.type), `${prefix}: info.type inválido`, failures);
    }

    if ('blocks' in step && step.blocks !== null) {
      assert(Array.isArray(step.blocks), `${prefix}: blocks debe ser un arreglo`, failures);
      for (const [blockIndex, block] of (step.blocks || []).entries()) {
        const blockPrefix = `${prefix} block #${blockIndex + 1}`;
        assert(isObject(block), `${blockPrefix}: debe ser un objeto`, failures);
        assert(typeof block?.lang === 'string' && block.lang.trim(), `${blockPrefix}: falta lang`, failures);
        assert(typeof block?.code === 'string', `${blockPrefix}: falta code`, failures);

        if (typeof block?.code === 'string' && block.lang.toLowerCase().includes('bash')) {
          const hasSudo = block.code.split('\n').some((line) => line.includes('sudo '));
          assert(!hasSudo, `${blockPrefix}: evita usar sudo en bloques bash`, failures);
        }
      }
    }

    if ('table' in step && step.table !== null) {
      assert(Array.isArray(step.table) && step.table.length >= 2, `${prefix}: table debe tener cabecera y al menos una fila`, failures);
    }
  }

  if ('verification' in guide) {
    assert(isObject(guide.verification), `${fileName}: verification debe ser un objeto`, failures);
    if (guide.verification?.summary) validateInlineMarkup(guide.verification.summary, `${fileName} verification.summary`, failures);
    if ('checks' in (guide.verification || {})) validateStringList(guide.verification.checks, `${fileName} verification.checks`, failures);
  }

  if ('sources' in guide) {
    assert(Array.isArray(guide.sources), `${fileName}: sources debe ser un arreglo`, failures);
    for (const [sourceIndex, source] of (guide.sources || []).entries()) {
      const prefix = `${fileName} source #${sourceIndex + 1}`;
      assert(isObject(source), `${prefix}: debe ser un objeto`, failures);
      assert(typeof source?.label === 'string' && source.label.trim(), `${prefix}: falta label`, failures);
      assert(typeof source?.url === 'string' && source.url.trim(), `${prefix}: falta url`, failures);
      if (source?.note) validateInlineMarkup(source.note, `${prefix} note`, failures);
    }
  }

  if ('troubleshooting' in guide) {
    assert(Array.isArray(guide.troubleshooting), `${fileName}: troubleshooting debe ser un arreglo`, failures);
    for (const [issueIndex, issue] of (guide.troubleshooting || []).entries()) {
      const prefix = `${fileName} troubleshooting #${issueIndex + 1}`;
      assert(isObject(issue), `${prefix}: debe ser un objeto`, failures);
      assert(typeof issue?.symptom === 'string' && issue.symptom.trim(), `${prefix}: falta symptom`, failures);
      if (issue?.symptom) validateInlineMarkup(issue.symptom, `${prefix} symptom`, failures);
      if (issue?.cause) validateInlineMarkup(issue.cause, `${prefix} cause`, failures);
      if (issue?.fix) validateInlineMarkup(issue.fix, `${prefix} fix`, failures);
      if (issue?.verify) validateInlineMarkup(issue.verify, `${prefix} verify`, failures);
      if ('blocks' in issue && issue.blocks !== null) {
        assert(Array.isArray(issue.blocks), `${prefix}: blocks debe ser un arreglo`, failures);
        for (const [blockIndex, block] of (issue.blocks || []).entries()) {
          const blockPrefix = `${prefix} block #${blockIndex + 1}`;
          assert(isObject(block), `${blockPrefix}: debe ser un objeto`, failures);
          assert(typeof block?.lang === 'string' && block.lang.trim(), `${blockPrefix}: falta lang`, failures);
          assert(typeof block?.code === 'string', `${blockPrefix}: falta code`, failures);
        }
      }
    }
  }

  return guide;
}

function validateIndex(index, availableGuides, failures) {
  assert(isObject(index.site), 'index.json: falta site', failures);
  assert(isObject(index.site?.stats), 'index.json: falta site.stats', failures);
  assert(index.site?.stats?.guides === availableGuides.size, `index.json: site.stats.guides debe ser ${availableGuides.size}`, failures);

  const seenSidebarIds = new Set();
  for (const [sectionIndex, section] of (index.sidebar || []).entries()) {
    const prefix = `index.json sidebar sección #${sectionIndex + 1}`;
    assert(typeof section?.section === 'string' && section.section.trim(), `${prefix}: falta section`, failures);
    assert(Array.isArray(section?.items), `${prefix}: items debe ser un arreglo`, failures);

    for (const item of section?.items || []) {
      assert(typeof item?.id === 'string' && item.id.trim(), `${prefix}: item sin id`, failures);
      assert(typeof item?.label === 'string' && item.label.trim(), `${prefix}: item sin label`, failures);

      if (item?.id) {
        if (seenSidebarIds.has(item.id)) {
          failures.push(`index.json: id duplicado en sidebar (${item.id})`);
        }
        seenSidebarIds.add(item.id);
        assert(availableGuides.has(item.id), `index.json: sidebar apunta a una guía inexistente (${item.id})`, failures);
      }
    }
  }

  for (const [newsIndex, item] of (index.news || []).entries()) {
    const prefix = `index.json news #${newsIndex + 1}`;
    assert(typeof item?.guide === 'string' && item.guide.trim(), `${prefix}: falta guide`, failures);
    if (item?.guide) {
      assert(availableGuides.has(item.guide), `${prefix}: referencia una guía inexistente (${item.guide})`, failures);
    }
  }

  const categoryTargets = {
    web: 'nginx-install',
    db: 'mariadb',
    containers: 'docker',
    ssh: 'ssh-keygen',
    security: 'firewall-ufw',
    monitoring: 'prometheus',
    init: 'install-initial',
    ssl: 'nginx-ssl'
  };

  for (const category of (index.categories || [])) {
    const target = categoryTargets[category?.id];
    if (target) {
      assert(availableGuides.has(target), `index.json: la categoría ${category.id} apunta a una guía inexistente (${target})`, failures);
    }
  }
}

function runChecks() {
  const failures = [];
  let parsedIndex;

  try {
    parsedIndex = readJson(indexPath);
  } catch (error) {
    failures.push(`index.json inválido: ${error.message}`);
    return failures;
  }

  const guideFiles = fs.readdirSync(guidesDir)
    .filter((file) => file.endsWith('.json') && file !== 'index.json' && !file.startsWith('_'))
    .sort();

  const availableGuides = new Set();

  for (const file of guideFiles) {
    const filePath = path.join(guidesDir, file);
    try {
      const guide = validateGuideFile(filePath, failures);
      if (guide?.id) availableGuides.add(guide.id);
    } catch (error) {
      failures.push(`${file}: JSON inválido (${error.message})`);
    }
  }

  validateIndex(parsedIndex, availableGuides, failures);
  return failures;
}

function printResult(failures) {
  const stamp = new Date().toLocaleTimeString('es-CL', { hour12: false });

  if (failures.length === 0) {
    console.log(`[${stamp}] contenido OK`);
    return 0;
  }

  console.error(`[${stamp}] se encontraron ${failures.length} problema(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  return 1;
}

function runAndExit() {
  const code = printResult(runChecks());
  if (!watchMode) process.exit(code);
}

if (!watchMode) {
  runAndExit();
} else {
  runAndExit();
  let timer = null;
  const rerun = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('');
      printResult(runChecks());
    }, 150);
  };

  fs.watch(path.join(projectRoot, 'docs'), { recursive: true }, (_eventType, fileName) => {
    if (!fileName || !fileName.endsWith('.json')) return;
    rerun();
  });

  console.log('Observando cambios en docs/**/*.json');
}
