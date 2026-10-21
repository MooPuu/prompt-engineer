/* Launches the freshly built desktop app and inspects it over the Chrome DevTools Protocol. */
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const root = 'C:/Users/asus/Documents/Default Project/prompt-engineer/';
const exe = root + 'dist/win-unpacked/Prompt Engineer.exe';
const PORT = 9229;

const child = spawn(exe, ['--remote-debugging-port=' + PORT], {
  cwd: root + 'dist/win-unpacked',
  stdio: 'ignore',
  detached: false
});

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function findTarget() {
  for (let i = 0; i < 40; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch (e) { /* not up yet */ }
    await sleep(500);
  }
  throw new Error('the app never exposed the devtools port');
}

const target = await findTarget();
await sleep(2500);

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0;
const pending = new Map();
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};
const send = (method, params) => new Promise(res => {
  const i = ++id;
  pending.set(i, res);
  ws.send(JSON.stringify({ id: i, method, params }));
});

const evaluate = async expression => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.result && r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails));
  return r.result.result.value;
};

const report = await evaluate(`(() => {
  const q = s => document.querySelector(s);
  const all = s => Array.from(document.querySelectorAll(s));
  const txt = s => (q(s) ? q(s).textContent.trim().replace(/\\s+/g,' ') : 'MISSING');
  const opts = s => all(s + ' option').map(o => o.value + ':' + o.textContent.trim());
  return JSON.stringify({
    title: document.title,
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    theme: document.documentElement.getAttribute('data-theme'),
    presets: all('#presets > *').length,
    presetNames: all('#presets > *').slice(0, 3).map(e => e.textContent.trim().replace(/\s+/g, ' ').slice(0, 26)),
    tones: all('input[id^="t"]').length,
    formats: all('input[id^="f"]').length,
    modelOptions: opts('#targetModel'),
    stageOptions: opts('#phaseCountSel'),
    hasPhaseBar: !!q('#phaseBar'),
    hasPhaseList: !!q('#phaseList'),
    hasGapList: !!q('#gapList'),
    hasVarBar: !!q('#varBar'),
    hasFocus: !!q('#btnFocus'),
    svgs: all('svg.hi').length,
    korean: (document.body.innerText.match(/[\\uAC00-\\uD7AF]/g) || []).length,
    langsInPicker: (q('#langpick') ? q('#langpick').innerText.replace(/\s+/g, ' ').slice(0, 140) : 'MISSING'),
    welcomeH2: (q('.welcome h2') ? 'PRESENT' : 'absent')
  });
})()`);

console.log(report);
ws.close();
child.kill();
await sleep(500);
try { process.kill(child.pid, 'SIGKILL'); } catch (e) { }
console.log('\n-- the app started, rendered and was closed --');
