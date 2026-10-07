# 🚀 Prompt Engineer v1.5.0 (v1.5) — Release Notes

**© 2026 Mahdi Kareem — All rights reserved.**

**v1.5** of **Prompt Engineer** — a bilingual (Arabic/English) tool for building perfect AI prompts, with a modern dashboard UI, a collapsible top bar and a brand-new mobile phone version.

---

## ⬇ Choose your installer

| File | Type | Description |
|---|---|---|
| `Prompt-Engineer-Portable-v1.5.0.exe` | 🟢 **Portable** | No installation — run it from any folder or USB drive |
| `Prompt-Engineer-Setup-v1.5.0.exe` | 🟦 **Setup (NSIS)** | Windows installer with a custom path + desktop and Start-menu shortcuts |
| `Prompt-Engineer-Setup-v1.5.0.msi` | 🟨 **MSI Installer** | Official Windows MSI, suitable for companies and GPO deployment |
| `Prompt-Engineer-v1.5.0.apk` | 📱 **Android APK** | Android app for the mobile UI (loads the site online) |

> ⚠️ The EXE/MSI files are self-signed — Windows may ask you to click **“More info” → “Run”**.
> 📱 The APK is signed with a self-signed key (`CN=Prompt Engineer`) — enable **“Unknown sources”** before installing it on your phone.

---

## ✨ What's new in v1.5

- 🗂️ **Modern dashboard UI**: a sidebar for jumping between sections with an active-section indicator and live stats, an instant search bar that filters sections, presets and tools with a linguistically-stemmed result counter, a welcome card + 4 action tiles with colored icons, rounded section panels and a gradient preview header — responsive and passing WCAG contrast checks in all three themes.
- 📌 **Collapsible top bar**: click the **app logo** to collapse the bar (search, buttons and tagline disappear) and click it again to expand — smooth animation, rotating chevron, state saved across restarts, full keyboard (Enter/Space) and screen-reader support.
- 🎨 **3 themes**: 🌙 Midnight · ☀️ Light · ⚡ Neon (saved automatically).
- 🌍 **Two full languages**: Arabic (RTL) + English (LTR) with instant switching.
- 📐 **16 presets**, **17 tones** and **14 delivery formats**.
- 🛠️ **10 enhancement toggles** (Chain-of-Thought, ask first, self-review, Few-Shot, sources, alternatives, balance, ELI5, action plan, direct answer).
- 🖼️ **Image generation mode**: **46 art styles** in 4 groups + **28 sizes** in 3 groups (including precise pixel sizes like `1920x1080` and A4) converted automatically into a `resolution` line + a computed `--ar` ratio, plus a custom size field and a Negative Prompt.
- 🧭 **Custom modern scrollbar**: a round thumb that colors itself per theme, across the page and the prompt preview (Chromium + Firefox).
- 📊 **Live quality score** with 12 checks, clicking jumps to the missing field.
- 🤖 **Recommended tools section**: 8 AI tools, each with a **free open-source alternative** — clicking a card opens both links.
- 📤 One-click copy + `.txt` / `.md` download + automatic history + “Auto-fill” button.
- 🖼️ One official app icon used across every UI, the EXE and the MSI.
- 📱 **Mobile UI (second site)**: https://moopuu.github.io/prompt-engineer/mobile/ — a light phone-style dashboard (gradient quality card, 4 quick-action buttons, collapsible section cards, a circular 12-check quality ring, presets, image mode, tool cards and a 5-tab bottom navigation bar) — Arabic/English, installable PWA, works offline.
- 📦 **Android APK**: `Prompt-Engineer-v1.5.0.apk` (Trusted Web Activity over the mobile site, same icon, brand color `#3d63f5`, app version `1.5.0`).
- ✅ **Opens fullscreen like a native app** — no browser address bar: Digital Asset Links are published at `https://moopuu.github.io/.well-known/assetlinks.json` (hosted by the [MooPuu.github.io](https://github.com/MooPuu/MooPuu.github.io) root site), so Chrome verifies the app on launch.
- 🔤 **Arabic language icon**: the 🇸🇦 flag was replaced with the **letter ع inside a white square with black borders** in the language switcher (desktop + mobile).
- 🔗 **Cross-linked builds**: the desktop footer links to the mobile UI, and the mobile drawer links back to the desktop version and the APK.

---

## 🌐 Run without installing

- **Web (GitHub Pages)**: https://moopuu.github.io/prompt-engineer/
- **Mobile UI (second site)**: https://moopuu.github.io/prompt-engineer/mobile/
- **Android app**: `Prompt-Engineer-v1.5.0.apk` from the release page
- **Repository**: https://github.com/MooPuu/prompt-engineer
- **Releases**: https://github.com/MooPuu/prompt-engineer/releases

---

## 🛠️ Building from source

```bash
npm install
npm run build:portable   # portable build
npm run build:nsis       # setup installer
npm run build:msi        # MSI installer
npm run build            # all three
```

---

**MIT License** · © 2026 **Mahdi Kareem**
