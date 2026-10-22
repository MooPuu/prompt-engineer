/* Copies the libraries that both apps share into mobile/, so the
   phone PWA keeps working when the folder is deployed on its own.
   Run: node build/sync-mobile.mjs */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHARED = ['i18n.js', 'anim.js', 'lottie.min.js', 'skills.js', 'commands.js', 'bests.js', 'icons.js'];

let copied = 0, same = 0;
for (const f of SHARED) {
  const from = path.join(root, f);
  const to = path.join(root, 'mobile', f);
  if (!fs.existsSync(from)) { console.log('  ! missing ' + f); continue; }
  const a = fs.readFileSync(from);
  const b = fs.existsSync(to) ? fs.readFileSync(to) : null;
  if (b && b.equals(a)) { same++; continue; }
  fs.writeFileSync(to, a);
  copied++;
  console.log('  ' + f + ' -> mobile/' + f);
}
console.log('  ' + copied + ' copied, ' + same + ' already in sync');
