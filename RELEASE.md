# 🚀 Prompt Engineer v2.0.0 (v2.0) — Release Notes

**© 2026 Mahdi Kareem — All rights reserved.**

**v2.0** of **Prompt Engineer** — a bilingual (Arabic/English) tool for building perfect AI prompts.
This is the **preset & template expansion release**: new argument tones, a much bigger template library,
and two brand-new field-level pickers that fill the builder for you.

---

## ⬇ Choose your installer

| File | Type | Description |
|---|---|---|
| `Prompt-Engineer-Portable-v2.0.0.exe` | 🟢 **Portable** | No installation — run it from any folder or USB drive |
| `Prompt-Engineer-Setup-v2.0.0.exe` | 🟦 **Setup (NSIS)** | Windows installer with a custom path + desktop and Start-menu shortcuts |
| `Prompt-Engineer-Setup-v2.0.0.msi` | 🟨 **MSI Installer** | Official Windows MSI, suitable for companies and GPO deployment |
| `Prompt-Engineer-v2.0.0.apk` | 📱 **Android APK** | Android app for the mobile UI (loads the site online) |

> ⚠️ The EXE/MSI files are self-signed — Windows may ask you to click **“More info” → “Run”**.
> 📱 The APK is signed with the same key as v1.5, so it installs as an update over the previous one.
> Enable **“Unknown sources”** the first time you install it.

---

## ✨ What's new in v2.0

### 🗣️ 4 new argument tones (17 → **21**)

Tones for prompts where the AI has to take a **position**, not just a style.

| Tone | Arabic | English |
|---|---|---|
| `support` | 💗 داعم ومشجّع | 💗 Supportive |
| `refuse` | 🚫 رافض حازم | 🚫 Firm refusal |
| `object` | ⚖️ معترض مبرّر | ⚖️ Objecting |
| `endorse` | ✅ مؤيّد ومدافع | ✅ Endorsing |

Each one is available in the builder, is translated in the generated prompt (Arabic **and** English),
and can be combined with every other tone.

### 📚 Ready tasks inside the Task field (new)

A **📚 قوالب جاهزة / Ready tasks** button now sits in the header of the **Task** section.
It opens **30 starter tasks** generated from the presets below — each with bracketed placeholders
(`[topic]`, `[audience]`, `[budget]`…) that you replace with your own details.

- Picking a task fills the **Task** field **and** applies the matching preset (role, audience, tone, format, length, constraints).
- The textarea stays completely free for a custom task.
- Works on the desktop app **and** the mobile UI, in both languages.

### 🧑‍💼 Ready roles inside the Role field (new)

A **🧑‍💼 أدوار جاهزة / Ready roles** button sits in the header of the **Role** section,
listing the **30 personas** used by the presets.

- Picking a role fills the **Role** field **and** auto-completes audience, tone, format, length and constraints.
- It never overwrites the task you already wrote.

### 📋 14 new presets (16 → **30**)

**Writing & analysis**
- 📰 Article writing · 🎓 Postgraduate & academic research · 🖋️ Classical / general poetry
- 📗 Positive analysis · 📕 Negative analysis

**Language & proofreading**
- 🔤 Language auditor · ✅ Spell checker

**Planning**
- 🗂️ Plan preparation · 🗺️ Study plan (existing, reworked)

**Risk, safety & operations**
- 🛡️ Risk management plans · 🚨 Crisis management plans · 🚒 Emergency & evacuation plans
- 🏟️ Mass crowd management plans · 🎪 Event management plans
- 📋 Post-incident assessment reports

### 🧹 Housekeeping

- The mobile greeting line (`مرحبًا بك 👋`) was removed from the phone UI.
- Mobile updates are now reliable: the page shell loads from the network first, assets are
  cache-busted (`?v=2.0`) and the service worker precaches with `cache: reload`, so an installed
  PWA always gets the new version while still working offline.
- Version bumped to **2.0.0** everywhere (app footer, mobile badge, installers, APK, manifests, docs).

---

## 🧰 Everything that was already there

- 🗂️ **Modern dashboard UI**: sidebar navigation with an active-section indicator and live stats,
  instant search across sections/presets/tools, welcome card + 4 action tiles, rounded section panels
  and a gradient preview header.
- 📌 **Collapsible top bar**: click the **app logo** to collapse it, click again to expand (saved automatically).
- 🎨 **3 themes**: 🌙 Midnight · ☀️ Light · ⚡ Neon — all passing WCAG contrast checks.
- 🌍 **Two full languages**: Arabic (RTL) + English (LTR) with instant switching.
- 📐 **30 presets**, **21 tones**, **14 delivery formats**, **12 quality checks**.
- 🛠️ **11 enhancement toggles** (Chain-of-Thought, ask first, self-review, Few-Shot, sources,
  alternatives, balance, ELI5, action plan, direct answer).
- 🖼️ **Image generation mode** (46 styles · 28 sizes · negative prompt).
- 🤖 **16 AI tool cards** (8 official + 8 open-source alternatives).
- 📱 **Android app** that opens **fullscreen** as a Trusted Web Activity — no browser address bar.
- ⌨️ **Keyboard-first**: Tab navigation, Enter/Space activation, visible focus, ARIA labels, screen-reader friendly.

---

## 🌐 Try it online — no install needed

| | |
|---|---|
| 🖥️ **Desktop web app** | https://moopuu.github.io/prompt-engineer/ |
| 📱 **Mobile UI** | https://moopuu.github.io/prompt-engineer/mobile/ |

---

## 🔐 Privacy

Everything runs locally or online as you choose. The app does **not** collect, store or send any data.
History is saved only in your browser's local storage and can be wiped from the app.

---

## 📄 License

**MIT** · © 2026 **Mahdi Kareem** — جميع الحقوق محفوظة