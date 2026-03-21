import { spawn } from 'node:child_process';

const children = [];

function start(name, command, args) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    env: process.env
  });

  child.on('exit', (code, signal) => {
    const detail = signal ? `signal ${signal}` : `code ${code ?? 0}`;
    console.log(`[${name}] finalizó con ${detail}`);
    shutdown(code ?? 0);
  });

  children.push(child);
}

let stopping = false;

function shutdown(exitCode = 0) {
  if (stopping) return;
  stopping = true;

  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM');
  }

  setTimeout(() => process.exit(exitCode), 50);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

console.log('SYSnergia Editorial dev');
console.log('- Sitio:   http://127.0.0.1:4173');
console.log('- Checks:  docs/guides/*.json');
console.log('');

start('serve', 'python3', ['-m', 'http.server', '4173', '--directory', 'docs']);
start('check', 'node', ['scripts/check-content.mjs', '--watch']);
