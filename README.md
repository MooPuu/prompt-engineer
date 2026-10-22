# 🧠 Prompt Engineer

Build a complete, professional AI prompt in a few clicks — in **10 languages**, on desktop, web or phone.

![Prompt Engineer](./build/social-preview.png)

[![Live](https://img.shields.io/badge/Live-🟢-6c8cff?style=flat-square)](https://moopuu.github.io/prompt-engineer/)
[![v3.0.0](https://img.shields.io/badge/release-v3.0.0-3ddc97?style=flat-square)](https://github.com/MooPuu/prompt-engineer/releases/tag/v3.0.0)
[![MIT](https://img.shields.io/badge/license-MIT-9b6cff?style=flat-square)](./LICENSE)

## 🔗 Links

| | |
|---|---|
| 🌐 Web app | **moopuu.github.io/prompt-engineer/** |
| 📱 Mobile UI | **moopuu.github.io/prompt-engineer/mobile/** |
| 📦 Installers + APK | **releases/tag/v3.0.0** |
| 🆕 What's new in v3.0 | **[release notes](https://github.com/MooPuu/prompt-engineer/releases/tag/v3.0.0)** |

## 🧰 What it does

- **9-field builder** — task · role · context · audience · tone · format · constraints · answer language · avoid.
- **62 presets** — grouped under six shelves (Design & UI · Writing & Docs · Marketing & SEO · Images & Video · Planning & Data & Analytics · Productivity).
- **105 skills** — the app suggests the ones that fit your task and moves them to the top.
- **93 slash commands** — `/eli5`, `/deepdive`, `/factcheck`, `/redteam`, `/viralhook`… with the exact string for eight AI programs.
- **16 capability rankings** — the best tool for coding, images, video, research, speed and price, taken from live leaderboards.
- **Phased response** — split the prompt into a chain of 1–6 stages, each one editable.
- **Target model tuning** — ten models (Claude, ChatGPT, Gemini, Perplexity, DeepSeek, Qwen, Llama…) each reshape the prompt in its own way.
- **Live quality score** — 12 checks, every one clickable, plus a one-click fix for each gap.
- **Token & cost estimate** — the input tokens and the predicted output tokens under the prompt.
- **Dynamic variables** — type `[name]` in any field and it becomes a field you fill in.
- **Prompt history** — every prompt you copy is saved, searchable and copyable again.
- **Suggestions** — a skill, a command, an improvement and the best tool for the prompt you are writing.
- **2 themes** — night and day, with a Lottie switch that slides before the theme changes.
- **Mobile PWA** that works offline, plus a **fullscreen Android app**.

## 🌍 10 languages

All **489 UI strings** are translated in all ten languages — section titles, labels, placeholders,
quality messages, all 47 tone names, all 36 formats, all 62 preset names, the whole skills and
commands library, and the best-tools table. Direction switches automatically: **RTL** for العربية and فارسی, **LTR** for the other eight.

| | | | | |
|---|---|---|---|---|
| العربية | English | فارسی | Svenska | Deutsch |
| Русский | 中文 | Türkçe | Français | Español |

> Preset **bodies** (the ready-made task, role, audience and constraint text) stay Arabic + English
> by design, so prompt quality is identical in every language.

## 📥 Install

| File | Use it when |
|---|---|
| `Prompt-Engineer-Portable-v3.0.0.exe` | no install — run from a USB stick |
| `Prompt-Engineer-Setup-v3.0.0.exe` | standard Windows install (custom path, shortcuts) |
| `Prompt-Engineer-Setup-v3.0.0.msi` | managed / company Windows install |
| `Prompt-Engineer-v3.0.0.apk` | Android — installs over any earlier build |

> Windows: the files are self-signed — **More info → Run**.
> Android: allow *Unknown sources* once; the app then opens fullscreen.

## 🖥 Run it

```bash
git clone https://github.com/MooPuu/prompt-engineer.git
cd prompt-engineer
npm install
npm start          # desktop app (Electron)
npm run sync       # copy the shared libraries into mobile/
npm run build      # installers → dist/
npm run verify     # inspect the built package
npm run smoke      # launch the built app and check it
```

The web app needs no build — open `index.html` or serve the folder.

## 📁 Structure

```
index.html        the desktop app (UI, builder, prompt data)
i18n.js           the shared dictionary — 10 languages, 489 keys
themes.css        the two themes
main.js           the Electron entry point
skills.js         the skills library — 105 skills in six shelves
commands.js       the slash-command library — 93 commands for eight programs
bests.js          the capability rankings and their sources
anim.js           the Lottie animations
lottie.min.js     the Lottie player
mobile/           the phone PWA (index.html, app.js, data.js, sw.js, manifest)
build/            the icon, the social preview and the build tools
dist/             the built installers
```

`mobile/` keeps its own copy of the shared libraries so the phone PWA works when the folder is
deployed on its own — run `npm run sync` after changing any of them.

## 🧱 Stack

Vanilla HTML / CSS / JS (no framework) · Electron · GitHub Pages · Bubblewrap TWA (Android).

## 📄 License

MIT — see [LICENSE](./LICENSE).
