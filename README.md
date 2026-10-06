# 🧠 Prompt Engineer

![Prompt Engineer](./build/social-preview.png)

> A bilingual (Arabic / English) app that helps you build a **perfect, complete AI prompt** in a few clicks, then copy it into any AI tool.

[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-🟢_Live_on_the_web-6c8cff?style=for-the-badge&logo=githubpages&logoColor=white)](https://moopuu.github.io/prompt-engineer/)
[![Download](https://img.shields.io/badge/⬇_Download-EXE_%2B_APK-3ddc97?style=for-the-badge&logo=windows&logoColor=black)](https://github.com/MooPuu/prompt-engineer/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-9b6cff?style=for-the-badge)](./LICENSE)
[![Made by](https://img.shields.io/badge/©_Mahdi_Kareem-Made%20with%20❤️-ff7a85?style=for-the-badge)](#-copyright)

---

## 🔗 Quick links

| Description | Link |
|---|---|
| 🌐 Run it on the web (GitHub Pages) | **https://moopuu.github.io/prompt-engineer/** |
| 📱 **Second site — mobile phone UI** | **https://moopuu.github.io/prompt-engineer/mobile/** |
| 📂 Repository | **https://github.com/MooPuu/prompt-engineer** |
| ⬇ Ready-made installers (EXE / MSI) | **https://github.com/MooPuu/prompt-engineer/releases** |
| 📦 **Android APK** | **https://github.com/MooPuu/prompt-engineer/releases/tag/v1.5.0** |

---

## ✨ Features

### 1) A 9-section prompt builder
- **Task** — exactly what you want the AI to do.
- **Role** — the persona it should adopt (engineer, editor, data analyst…).
- **Context & background** — project/situation details (one bullet per point).
- **Audience** — who the output is for.
- **Tone & style** — **17 tones**: professional, friendly, educational, creative, concise, persuasive, scientific, academic, witty, motivational, literary/poetic, conversational, documentary, optimistic, playful, empathetic, bold.
- **Delivery format** — **14 formats**: Markdown, bullet points, table, JSON, code, paragraphs, **image**, HTML, CSV, SQL, email, script, presentation, formal report + length + answer language.
- **Constraints & requirements** + **Do-not patterns**.
- **Enhancement toggles** and **image generation mode** (below).

### 2) Three themes 🎨
| Theme | Description |
|---|---|
| 🌙 **Midnight** | Calm dark blue/violet — the default. |
| ☀️ **Light** | Bright, high contrast, fully readable. |
| ⚡ **Neon** | Deep black with high-contrast cyan/pink accents. |

Your choice is saved automatically in the browser.

- **Modern dashboard UI** modeled on professional panels: a **sidebar** (fast navigation between sections + shortcuts + an active section indicator that follows the scroll + live quality/word/technique stats + a star button), an **instant search bar** at the top (filters sections, presets and tools with a result counter, Enter jumps to a match), a **welcome card** and **4 action tiles** with colored icons (Auto-fill · Copy · Download · Clear), **rounded section panels** with a colored icon each and a **gradient preview header** — responsive, collapsing into a horizontal bar on small screens, plus a **collapsible top bar**: click the **app logo** to collapse it (search, actions and tagline hide) and click again to expand, with a smooth animation, a rotating chevron, a persisted state and full keyboard support.
- **Polished modern styling**: soft-shadow cards, hover effects and a **custom themed scrollbar** — a translucent track with a round `pill` thumb that changes color per theme and glows on hover, across the whole page and the prompt preview, respecting RTL/LTR (works in Firefox and Chromium).
- **WCAG-checked contrast** — **35 elements × 3 themes** verified (text, fields, badges, sidebar, footer), all at or above **4.5:1**.

### 3) Two full languages 🌍
- **Arabic (RTL)** and **English (LTR)** UI with one click from the top bar.
- Translated: headings, labels, hints, tooltips, presets, scoring criteria, messages, history and footer.
- The **generated prompt itself** is built in Arabic or English according to your “Answer language” choice.

### 4) Advanced prompt-engineering techniques 🛠️
**10 enhancement toggles** (section 8 of the panel) add real prompt-engineering techniques:

| Toggle | Effect |
|---|---|
| 🙋 **Ask before starting** | Stops guessing: the model asks one specific question when information is missing. |
| 🧩 **Step-by-step thinking** | Chain-of-Thought: reason before answering → higher accuracy on complex tasks. |
| ✅ **Self review** | Verifies the requirements were met before the final answer. |
| 🎯 **Few-shot examples** | Input/output examples pin down the style precisely. |
| 🎯 **Direct answer, no fluff** | Drops “Sure!” and leads with the value. |
| 📎 **Cite sources** | Links and references for uncommon facts + assumptions are flagged. |
| 🧪 **2–3 alternatives & comparison** | Pros/cons table per option with a final recommendation. |
| ⚖️ **Balanced viewpoints** | For and against arguments before a neutral conclusion. |
| 🧒 **Simplify (ELI5)** | Beginner-friendly explanation without jargon. |
| 🗓️ **Measurable action plan** | Numbered steps with deadlines and clear success criteria. |

### 5) Live quality score 📈
A percentage ring plus **12 checks** (task, role, context, audience, format, length, tone, constraints, do-not, CoT, self-review, examples).
**Clicking any incomplete item jumps straight to the missing field.**

### 6) Output tools 📤
- One-click copy (auto-saved to history — the last 8 prompts).
- Download as `.txt` or `.md`.
- **✨ Auto-fill** button that fills the missing fields with best practices.
- **16 ready-made presets**: article/content, coding, data analysis, marketing, summarizing, plan & study, translation, image generation, email, social post, video script, ideation, competitor analysis, product descriptions, concept explainer, customer reply.

### 7) Image generation mode 🖼️
Turns your request into a **ready-to-use English image prompt** for Midjourney / DALL·E / Stable Diffusion, with:
- **46 art styles** in 4 groups (📷 Photography · 🖌️ Fine art · 💻 Digital & 3D · 🎨 Graphics & design).
- **28 sizes** in 3 groups (landscape · square/portrait · 📐 common pixel sizes like `1920x1080` and `A4`) **plus a custom size field** that overrides the selection — pixel sizes are converted automatically into a `resolution` line and a computed `--ar` ratio.
- An editable **Negative Prompt** line + a quality line + the mood taken from the chosen tone.

### 8) Recommended tools section 🤖
A section at the bottom of the page lists **8 recommended AI tools** to use your prompt with, each with a **free open-source alternative**. Clicking a card opens **both** links:

| Recommended tool 🔗 | Free open-source alternative 🔓 |
|---|---|
| ChatGPT | [Open WebUI](https://github.com/open-webui/open-webui) |
| Claude | [LibreChat](https://github.com/danny-avila/LibreChat) |
| Gemini | [Jan](https://github.com/janhq/jan) |
| Midjourney | [Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) |
| GitHub Copilot | [Aider](https://github.com/Aider-AI/aider) |
| Perplexity | [Khoj](https://github.com/khoj-ai/khoj) |
| ElevenLabs | [Coqui TTS](https://github.com/coqui-ai/TTS) |
| Sora | [LTX-Video](https://github.com/Lightricks/LTX-Video) |

### 9) Mobile version 📱 (second site + Android APK)
A standalone **mobile phone UI** with a **light indigo dashboard** design: greeting header, gradient quality card, 4 quick-action buttons, collapsible section cards with colored icons, a circular quality ring, presets, image mode, tool cards and a 5-tab bottom navigation bar.

- 🔗 **Second site (mobile UI):** https://moopuu.github.io/prompt-engineer/mobile/
- 📦 **Android app:** `Prompt-Engineer-v1.5.0.apk` on the [v1.5.0 release page](https://github.com/MooPuu/prompt-engineer/releases/tag/v1.5.0)
- 🌍 Arabic/English in one tap · installable PWA · works offline (Service Worker) · exactly the same prompt engine and output as the desktop version.
- The Arabic language button in the UI is the **letter ع inside a white square with black borders** (instead of the 🇸🇦 flag).

---

## 🧩 Structure of the generated prompt

Every prompt leaves the app organized into `##` sections that models handle well:

```
## ROLE
## TASK
## CONTEXT
## AUDIENCE
## OUTPUT REQUIREMENTS
## TONE
## CONSTRAINTS
## DO NOT
## METHOD              ← when CoT / Ask is enabled
## FEW-SHOT            ← when examples are enabled
## SUCCESS CRITERIA
## FINAL INSTRUCTIONS
```

> With Arabic selected as the answer language, the same sections are emitted with Arabic headings (الدور · المهمة · السياق …).

---

## 🚀 How to run it

### 1) Web (no install)
Open: **https://moopuu.github.io/prompt-engineer/**

### 2) Mobile version — Android APK 📱

| Option | Link / steps |
|---|---|
| 🌐 Mobile site | **https://moopuu.github.io/prompt-engineer/mobile/** |
| 📦 Direct APK download | **https://github.com/MooPuu/prompt-engineer/releases/tag/v1.5.0** ← `Prompt-Engineer-v1.5.0.apk` |

1. Download `Prompt-Engineer-v1.5.0.apk` from the release page.
2. Open it on your phone — if you see an “Unknown sources” warning, allow your browser or file manager.
3. Install the app; it appears with the same icon as the desktop version.

> The mobile UI is also a **PWA**: from the phone browser use “Add to Home screen” to run it full-screen as a standalone, offline-capable app.

### 3) Locally from the files
Open `index.html` directly in any browser (works offline except for Google Fonts). For the mobile UI, open `mobile/index.html`.

```bash
# or through a local server
npx serve .
```

### 4) Desktop version (Electron)

```bash
npm install          # install dependencies
npm start            # run in development
npm run build        # build all three installers 🔄
```

| Command | Output |
|---|---|
| `npm run build:portable` | **Portable build** — `Prompt-Engineer-Portable-v1.5.0.exe` (no install, runs from anywhere / USB) |
| `npm run build:nsis` | **Setup installer** — `Prompt-Engineer-Setup-v1.5.0.exe` (custom path + shortcuts) |
| `npm run build:msi` | **MSI installer** — `Prompt-Engineer-Setup-v1.5.0.msi` (official/company Windows installs) |
| `npm run build` | All three at once |

> Artifacts are written to the `dist/` folder.
> The installers are self-signed — Windows may ask you to confirm the run.

---

## 📁 Project structure

```
prompt-engineer/
├── index.html                  # the whole web/desktop app (HTML + CSS + JS)
├── themes.css                  # three-theme layer + modern UI
├── mobile/                     # 📱 mobile phone site (PWA + APK source)
│   ├── index.html              # mobile UI (light dashboard)
│   ├── mobile.css              # mobile design system
│   ├── app.js                  # logic + AR/EN translations + prompt engine
│   ├── data.js                 # data (presets, tones, tools) — extracted from index.html
│   ├── manifest.webmanifest    # PWA manifest (installable from the home screen)
│   ├── sw.js                   # Service Worker for offline use
│   └── icon-192/512.png        # app icons (192 / 512 / maskable)
├── prompt engineer icon.png    # official app icon
├── main.js                     # Electron main process
├── package.json                # package metadata + build configuration
├── build/
│   ├── icon.png                # 256×256 (square) icon
│   └── icon.ico                # Windows icon (multi-size)
├── dist/                       # build output (not committed)
├── README.md
├── LICENSE                     # MIT
└── .gitignore
```

---

## 🛠️ Tech stack

- **HTML5 / CSS3 / Vanilla JavaScript** — no framework, easy to read and extend.
- **CSS Custom Properties** — a full theming system built on variables.
- **localStorage** — saves theme, language and history.
- **Electron + electron-builder** — desktop version and EXE/MSI builds.
- **Bubblewrap (Trusted Web Activity)** — the Android APK wraps the live mobile site.

---

## 📌 Suggested roadmap

- [ ] Save prompts to files (JSON export/import).
- [ ] A comparison mode for outputs from several models.
- [ ] Keyboard shortcuts (Ctrl+C to copy, Ctrl+1..3 for themes).
- [ ] More presets (SEO, workflows, competitor analysis).
- [ ] Start in the system language (Arabic ⇄ English) by default.

---

## 📄 License

This project is licensed under the **MIT** license — see [LICENSE](./LICENSE).

---

## © Copyright

**© 2026 Mahdi Kareem — All rights reserved.**
Crafted with care ❤️

---

> 🇸🇦 **Note:** the application itself remains fully bilingual — Arabic (RTL) and English (LTR) — switchable from the top bar with one click.
