/* Regenerates build/icon.ico and build/icon.png from the master icon.
   Run by `npm run build` so the Windows installer always ships a fresh icon
   instead of a stale checked-in one. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'prompt-engineer-icon.png');
const OUT_PNG = path.join(root, 'build', 'icon.png');
const OUT_ICO = path.join(root, 'build', 'icon.ico');
/* The master PNG is not square, so the ICO is built from the square master. */
const SQUARE = path.join(root, 'build', 'icon-256.png');

if (!fs.existsSync(SRC)) { console.error('missing ' + SRC); process.exit(1); }

/* PNG dimensions live at byte 16 (width) and byte 20 (height). */
const pngSize = file => {
  const b = fs.readFileSync(file);
  if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null;
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
};

const square = [SQUARE, SRC].find(f => {
  if (!fs.existsSync(f)) return false;
  const s = pngSize(f);
  return s && s.w === s.h;
});

if (!square) { console.error('no square PNG available for the ICO'); process.exit(1); }

/* png-to-ico is an ESM module with a default export.
   Drive it directly: spawning the .cmd shim is blocked on modern Node (EINVAL). */
try {
  const { default: pngToIco } = await import('png-to-ico');
  const buf = await pngToIco(square, { sizes: [16, 24, 32, 48, 64, 128, 256] });
  fs.writeFileSync(OUT_ICO, buf);
  console.log('build/icon.ico written from ' + path.basename(square) +
    ' (' + fs.statSync(OUT_ICO).size + ' bytes)');
} catch (e) {
  console.log('png-to-ico failed: ' + (e && e.message));
}

fs.copyFileSync(SRC, OUT_PNG);
console.log('build/icon.png refreshed (' + fs.statSync(OUT_PNG).size + ' bytes)');
