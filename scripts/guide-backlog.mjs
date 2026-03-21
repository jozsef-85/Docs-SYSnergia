import fs from 'node:fs';
import path from 'node:path';
import { buildGuidePrompt } from './create-guide-prompt.mjs';

const projectRoot = path.resolve(import.meta.dirname, '..');
const backlogPath = path.join(projectRoot, 'docs', 'topics.json');
const args = process.argv.slice(2);
const command = args[0] || 'list';

function getArg(name, fallback = '') {
  const index = args.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return args[index + 1] || fallback;
}

function readBacklog() {
  return JSON.parse(fs.readFileSync(backlogPath, 'utf8'));
}

function printTopic(topic) {
  console.log(`${topic.id} | ${topic.os} | ${topic.category} | ${topic.title} | ${topic.status} | p${topic.priority}`);
}

function matchesFilter(topic) {
  const os = getArg('os');
  const category = getArg('category');
  if (os && topic.os !== os) return false;
  if (category && topic.category !== category) return false;
  return true;
}

function getPendingTopics(data) {
  return data.topics
    .filter((topic) => topic.status === 'todo')
    .filter(matchesFilter)
    .sort((a, b) => a.priority - b.priority || a.os.localeCompare(b.os) || a.title.localeCompare(b.title));
}

if (command === 'list') {
  const data = readBacklog();
  for (const topic of getPendingTopics(data)) printTopic(topic);
  process.exit(0);
}

if (command === 'next') {
  const data = readBacklog();
  const topic = getPendingTopics(data)[0];
  if (!topic) {
    console.log('No hay temas pendientes con ese filtro.');
    process.exit(0);
  }
  printTopic(topic);
  process.exit(0);
}

if (command === 'prompt') {
  const data = readBacklog();
  const id = getArg('id');
  const topic = id
    ? data.topics.find((item) => item.id === id)
    : getPendingTopics(data)[0];

  if (!topic) {
    console.log('No se encontró un tema pendiente para generar prompt.');
    process.exit(1);
  }

  console.log(buildGuidePrompt({
    title: topic.title,
    os: topic.os,
    category: topic.category,
    difficulty: topic.difficulty,
    id: topic.id,
    appliesTo: topic.applies_to || topic.os
  }));
  process.exit(0);
}

console.log('Uso: node scripts/guide-backlog.mjs [list|next|prompt] [--os "..."] [--category "..."] [--id "..."]');
process.exit(1);
