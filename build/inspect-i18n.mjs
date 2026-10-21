import asar from '@electron/asar';
const root = 'C:/Users/asus/Documents/Default Project/prompt-engineer/';
const raw = asar.extractFile(root + 'dist/win-unpacked/resources/app.asar', 'i18n.js').toString('utf8');

const start = raw.indexOf('const I18N');
const body = raw.slice(raw.indexOf('{', start));
const I18N = JSON.parse(body.slice(0, body.lastIndexOf('}') + 1));

const langs = ['ar', 'en', 'fa', 'sv', 'de', 'ru', 'zh', 'tr', 'fr', 'es'];
console.log('=== the dictionary in the built package ===');
console.log('  languages :', Object.keys(I18N).length);
let min = 1e9, max = 0;
for (const [code, kv] of Object.entries(I18N)) {
  const n = Object.keys(kv).length;
  min = Math.min(min, n); max = Math.max(max, n);
  console.log('   ' + code.padEnd(4) + n + ' keys');
}
console.log('  range     : ' + min + ' .. ' + max);
console.log('  unexpected:', Object.keys(I18N).filter(c => !langs.includes(c)).join(', ') || 'none');
console.log('  missing   :', langs.filter(c => !I18N[c]).join(', ') || 'none');

/* the keys the new features need */
const need = ['mdl.perplexity', 'mdl.claude', 'mdl.deepseek', 'mdl.universal', 'ph.title', 'ph.copy', 'gap.title', 'tok.title', 'cost.title', 'focus.on'];
console.log('\n  new-feature keys present in every language: ' +
  need.every(k => langs.every(l => I18N[l] && I18N[l][k] !== undefined)));
for (const k of need) {
  const missing = langs.filter(l => !I18N[l] || I18N[l][k] === undefined);
  if (missing.length) console.log('    ! ' + k + ' missing in: ' + missing.join(', '));
}
