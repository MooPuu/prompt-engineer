import asar from '@electron/asar';

const root = 'C:/Users/asus/Documents/Default Project/prompt-engineer/';
const asarPath = root + 'dist/win-unpacked/resources/app.asar';

const html = asar.extractFile(asarPath, 'index.html').toString('utf8');
const i18nRaw = asar.extractFile(asarPath, 'i18n.js').toString('utf8');
const css = asar.extractFile(asarPath, 'themes.css').toString('utf8');
const main = asar.extractFile(asarPath, 'main.js').toString('utf8');

/* ---- the languages ---- */
const langs = ['ar', 'en', 'fa', 'sv', 'de', 'ru', 'zh', 'tr', 'fr', 'es'];
const LANGS = JSON.parse(i18nRaw.slice(i18nRaw.indexOf('['), i18nRaw.lastIndexOf(']') + 1));
const dictOf = l => l.kv || l.dict || l.values || l.d || l.t || l.i18n || l[Object.keys(l).find(k => typeof l[k] === 'object' && l[k] && Object.keys(l[k]).length > 50)];

console.log('=== i18n.js ===');
console.log('  languages :', LANGS.length);
let keyTotal = 0;
for (const l of LANGS) {
  const n = Object.keys(dictOf(l) || {}).length;
  keyTotal = Math.max(keyTotal, n);
  console.log('   ' + String(l.code).padEnd(4) + String(l.native).padEnd(14) + n + ' keys');
}
const codes = LANGS.map(l => l.code);
console.log('  unexpected :', codes.filter(c => !langs.includes(c)).join(', ') || 'none');
console.log('  missing    :', langs.filter(c => !codes.includes(c)).join(', ') || 'none');

/* ---- the features ---- */
const count = (re) => (html.match(re) || []).length;
const modelBlock = (html.match(/const MODEL_TUNE\s*=\s*\{([\s\S]*?)\n\};/g) || [''])[0];
const modelKeys = modelBlock.split('\n')
  .filter(l => /^\s*['"]?[a-z0-9_-]+['"]?\s*:\s*\{/.test(l))
  .map(l => l.trim().replace(/[:{].*$/, '').replace(/['"]/g, ''))
  .filter(k => k !== 'note');

console.log('\n=== features ===');
console.log('  presets              :', count(/\{name:\['/g));
console.log('  target models        :', modelKeys.length, '->', modelKeys.join(' '));
console.log('  tone checkboxes      :', count(/type="checkbox" id="t\d+"/g));
console.log('  format checkboxes    :', count(/type="checkbox" id="f\d+"/g));
console.log('  phased response      :', /id="phaseBar"/.test(html) && /id="phaseCountSel"/.test(html) && /id="phaseList"/.test(html) ? 'yes' : 'NO');
console.log('  stage count options  :', count(/<option value="[1-6]"/g));
console.log('  model select         :', /id="targetModel"/.test(html) ? 'yes' : 'NO');
console.log('  model option values  :', (html.match(/<option value="(perplexity|gemini|qwen|llama|meta|claude|chatgpt|deepseek|auto|universal)"/g) || []).map(s => s.slice(15, -1)).join(' '));
console.log('  gap analyzer         :', /findGaps/.test(html) ? 'yes' : 'NO');
console.log('  token estimator      :', /tokenEstimate/.test(html) ? 'yes' : 'NO');
console.log('  cost estimator       :', /costEstimate/.test(html) ? 'yes' : 'NO');
console.log('  dynamic variables    :', /collectVars/.test(html) ? 'yes' : 'NO');
console.log('  focus mode           :', /toggleFocus/.test(html) ? 'yes' : 'NO');
console.log('  css themes           :', [...new Set((css.match(/data-theme="([a-z]+)"/g) || []))].join(' '));
console.log('  heroicons svgs       :', count(/class="hi"/g));
console.log('  korean characters    :', (html.match(/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/g) || []).length);
console.log('  welcome heading      :', /<h2[^>]*>[^<]*مرحبا/.test(html) ? 'STILL THERE' : 'removed');
console.log('  main.js loads        :', /index\.html/.test(main) ? 'index.html' : 'NO');
