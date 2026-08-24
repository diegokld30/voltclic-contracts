// Marca cada carpeta de salida con su tipo de módulo. Sin esto, Node interpreta ambas
// según el "type" del package.json raíz y la build ESM se rompería al consumirse.
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const targets = [
  ['dist/cjs', { type: 'commonjs' }],
  ['dist/esm', { type: 'module' }],
];

for (const [dir, content] of targets) {
  if (!existsSync(dir)) {
    console.error(`✗ falta ${dir} — ¿corrió tsc?`);
    process.exit(1);
  }
  writeFileSync(join(dir, 'package.json'), JSON.stringify(content, null, 2) + '\n');
  console.log(`✔ ${dir}/package.json -> ${content.type}`);
}
