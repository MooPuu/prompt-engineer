/* Regenerates build/icon.ico and build/icon.png from the master icon.
   Run by `npm run build` so the Windows installer always ships a fresh icon
   instead of a stale checked-in one. */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'prompt-engineer-icon.png');
const OUT_PNG = path.join(root, 'build', 'icon.png');
const OUT_ICO = path.join(root, 'build', 'icon.ico');

if (!fs.existsSync(SRC)) { console.error('missing ' + SRC); process.exit(1); }

/* png-to-ico ships a CLI; drive that rather than guessing at its API */
const cli = path.join(root, 'node_modules', '.bin', 'png-to-ico.cmd');
if (fs.existsSync(cli)) {
  try {
    execFileSync(cli, [SRC, OUT_ICO, '--sizes', '16,24,32,48,64,128,256'],
      { cwd: root, stdio: 'inherit' });
    console.log('build/icon.ico written (' + fs.statSync(OUT_ICO).size + ' bytes)');
  } catch (e) {
    console.log('png-to-ico failed: ' + (e && e.message));
  }
} else {
  console.log('png-to-ico not installed -- run npm install; leaving build/icon.ico untouched');
}

fs.copyFileSync(SRC, OUT_PNG);
console.log('build/icon.png refreshed (' + fs.statSync(OUT_PNG).size + ' bytes)');