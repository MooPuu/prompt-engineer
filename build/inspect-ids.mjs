import fs from 'node:fs';
const h = fs.readFileSync('C:/Users/asus/Documents/Default Project/prompt-engineer/index.html', 'utf8');

console.log('--- containers that mention preset ---');
[...new Set((h.match(/id="[A-Za-z0-9_]*[Pp]reset[A-Za-z0-9_]*"/g) || []))].forEach(s => console.log('   ' + s));
console.log('--- langpick usage ---');
h.split('\n').forEach((l, i) => { if (/langpick/.test(l)) console.log('   ' + (i + 1) + ': ' + l.trim().slice(0, 150)); });
console.log('--- pcard class occurrences ---');
console.log('   count: ' + (h.match(/pcard/g) || []).length);
console.log('--- PRESETS render function ---');
h.split('\n').forEach((l, i) => { if (/PRESETS\.map|PRESETS\.forEach|renderPresets/.test(l)) console.log('   ' + (i + 1) + ': ' + l.trim().slice(0, 150)); });
