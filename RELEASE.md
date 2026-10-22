# 🚀 Prompt Engineer v3.0.0

**10 languages. One prompt builder. Every platform.**

Build a complete, professional AI prompt in a few clicks — in **any of 10 languages** — on desktop, web or phone.

| | |
|---|---|
| 🌐 Web app | **https://moopuu.github.io/prompt-engineer/** |
| 📱 Mobile UI | **https://moopuu.github.io/prompt-engineer/mobile/** |
| 🖥 Desktop | Windows installer, MSI or portable EXE |
| 🤖 Android | Fullscreen TWA — upgrades over any earlier build |

---

## 📦 Downloads

| File | Use it when |
|---|---|
| `Prompt-Engineer-Portable-v3.0.0.exe` | No install — run it straight from a USB stick |
| `Prompt-Engineer-Setup-v3.0.0.exe` | Standard Windows install (custom path, shortcuts) |
| `Prompt-Engineer-Setup-v3.0.0.msi` | Managed / company Windows install |
| `Prompt-Engineer-v3.0.0.apk` | Android — upgrades in place over v1.5 / v2.0 / v2.1 / v2.2 |

> **Windows:** the installers are self-signed, so Windows SmartScreen shows a blue dialog — *More info → Run anyway*.
> **Android:** allow *Unknown sources* once. The app then launches fullscreen with no browser chrome.

---

## 🌍 10 languages

| | | | | |
|---|---|---|---|---|
| العربية | English | فارسی | Svenska | Deutsch |
| Русский | 中文 | Türkçe | Français | Español |

All **489 UI strings** are translated in every language — section titles, field labels,
placeholders, quality messages, all **47 tone** names, all **36 output formats**, all **62 preset**
names, the whole skills and commands library and the best-tools table.
Direction switches automatically: **RTL** for العربية and فارسی, **LTR** for the other eight.

> Preset **bodies** (the ready-made task, role, audience and constraint text) stay Arabic + English
> by design, so prompt quality is identical in every language.

---

## ✨ What is new in v3.0.0

### 🌗 A real day/night switch

The theme picker is a Lottie slider now. The handle travels to the **left** for the night theme and
back to the **right** for the day theme, and the theme only changes **once the movement is over** —
so you always see which theme you are going to.

### 🗂 A skills library — 105 skills, six shelves

`🎨 Design & UI` · `✍️ Writing & Docs` · `📈 Marketing & SEO` · `🖼️ Images & Video` ·
`📊 Planning & Data & Analytics` · `⚡️ Productivity`

Every skill is a reusable prompt ingredient. The app scores them against the task you are typing
and **moves the matching ones to the top**, highlighted with a star. One click adds the skill to
the prompt.

### ⌘ A slash-command library — 93 commands

`/eli5` · `/deepdive` · `/factcheck` · `/redteam` · `/viralhook` · `/decisionmatrix`… each one
short, direct and good for exactly one job.

Every command carries the **exact string to paste**, for **eight AI programs** — ChatGPT, Claude,
Gemini, Copilot, Perplexity, DeepSeek, Qwen and Llama. The programs that have no slash commands
get the plain-text equivalent instead, and the app suggests one command for the prompt you are
writing right now.

### 🏆 Which tool is the best for this?

Sixteen capabilities — coding, writing, reasoning, research, math, images, video, web, UI, data,
long context, tool calling, speed, price, open weights, video scripts — each with the live winner
from the public leaderboards, the alternatives, and a link to the ranking it came from.

| Capability | Winner |
|---|---|
| Coding & programming | **Claude Opus 5.5** (Anthropic) |
| Writing & articles | **Qwen3-235B-A22B-Thinking-2507** (Alibaba) |
| Image generation & editing | **GPT Image 2** (OpenAI) |
| Video creation | **Kling v3** (Kuaishou) |
| Research & analysis | **Kimi K3** (Moonshot AI) |
| UI design | **GPT-5.6 Sol** (OpenAI) |
| Data analysis & Excel | **ChatGPT for Excel** (OpenAI) |
| Tool calling & integration | **Claude Sonnet 5.5** (Anthropic) |

### 💡 Suggestions

A panel at the bottom of the builder that reads your prompt and offers four kinds of help: a
**skill** to add, **commands** to copy, **improvements** to apply, and the **tool** that fits best.

### 🔢 A token banner

Under the generated prompt: the **input tokens** and the **predicted output tokens** (≈ 1.8× the
prompt length), so you know what the request will cost before you send it.

### 🕘 A prompt history

A new tab on the phone. Every prompt you copy is saved; you can view it, copy it again, filter it
or delete it.

### 📚 The 62 presets are now categorised

The same six shelves act as buttons, and every preset sits inside the one that matches it.

### ✈️ The paper plane

The mobile hero card carries a Lottie paper plane that flies above the progress bar and follows
the text direction.

---

## 🧹 What was removed

- **The neon theme.** Two themes are enough: night and day.
- **The black (OLED) button.** The night theme *is* the black one now, so the separate button is
  gone — a stored `oled` theme folds into the night theme on the next start.
- **The focus mode.** It could be entered but never left, so the button and the whole feature are
  gone. Anyone who was stuck in it is released on the next start.

---

## 🐛 Fixed

- **The mobile top bar stayed white in the night theme.** A selector clean-up had broken the
  dark-surface overrides, so the header never recoloured.
- **The reset button threw an error on the desktop** — it cleared a field the desktop does not have.
- **The "auto" target model had no note** in any language.
- **The category buttons stayed Arabic** after switching the language.
- **The skills list only showed the matches**, so the shelf felt empty; now every skill is listed
  and the matching ones move to the top.
- **The mobile had no dynamic variables**, so `[name]` placeholders were never filled in.
- The footers still carried a "crafted with care" line that is gone now.

---

## 🔨 Installers

Self-signed. Fingerprint (SHA-256 of the signing certificate):

```
DB:7D:62:10:E7:54:29:B
```

The Android APK uses the **same keystore as every earlier build**, which is why it upgrades in place
and keeps Digital Asset Links working — Android shows a verified warning on install only because the
app is not on Google Play.

---

## 🛠 Build it yourself

```bash
git clone https://github.com/MooPuu/prompt-engineer.git
cd prompt-engineer
npm install
npm start          # run the desktop app
npm run sync       # copy the shared libraries into mobile/
npm run build      # build installers into dist/
npm run verify     # inspect the built package
npm run smoke      # launch the built app and check it
```

No framework, no build step for the web app — just open `index.html`.

## 📄 License

MIT — see [LICENSE](./LICENSE).
