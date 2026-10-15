# 🧠 Prompt Engineer v2.1.0

**10 languages. One prompt builder. Every platform.**

Build a complete, professional AI prompt in a few clicks — in **any of 10 languages** — on desktop, web or phone.

| | |
|---|---|
| 🌐 Web app | **https://moopuu.github.io/prompt-engineer/** |
| 📱 Mobile UI | **https://moopuu.github.io/prompt-engineer/mobile/** |
| 💻 Desktop | Windows installer, MSI or portable EXE |
| 📲 Android | Fullscreen TWA — installs over v1.5 and v2.0 |

---

## 📥 Downloads

| File | Use it when |
|---|---|
| `Prompt-Engineer-Portable-v2.1.0.exe` | No install — run it straight from a USB stick |
| `Prompt-Engineer-Setup-v2.1.0.exe` | Standard Windows install (custom path, shortcuts) |
| `Prompt-Engineer-Setup-v2.1.0.msi` | Managed / company Windows install |
| `Prompt-Engineer-v2.1.0.apk` | Android — upgrades in place over v1.5 / v2.0 |

> **Windows:** the installers are self-signed, so Windows SmartScreen shows a blue dialog → *More info → Run anyway*.
> **Android:** allow *Unknown sources* once. The app then launches fullscreen with no browser chrome.

---

## 🌍 10 languages

| | | | | |
|---|---|---|---|---|
| العربية | فارسی | Svenska | Deutsch | Русский |
| 中文 | Türkçe | Français | Español | English |

The interface switches direction automatically: **RTL** for العربية · فارسی,
**LTR** for the other eight.
Every one of the **413 UI strings** is translated in all ten languages: section titles, field labels,
placeholders, quality messages, all **47 tone** names, all **36 output formats** and all **60 preset**
names.

**Preset bodies stay Arabic + English by design** — the ready-made task, role, audience and constraint
text is deliberately not machine-translated, so prompt quality is identical in every language.

---

## ✨ Highlights

- **9-field builder** — task · role · context · audience · tone · format · constraints · answer language · avoid.
- **📚 60 presets** · **🧑‍💼 47 tones** · **36 formats** · **11 improvement toggles**.
- **Two one-click pickers** — a ready **task** and a ready **role** fill the builder for you; both
  fields stay free-text and editable afterwards.
- **Live quality score** — 12 checks, each one clickable to jump to the field it complains about.
- **Image mode** — 46 artistic styles × 28 output sizes, generating a ready English prompt for
  Midjourney / DALL·E / Stable Diffusion.
- **16 AI tool cards** — the official tool plus its open-source alternative.
- **3 themes** 🌙 ☀️ ⚡, contrast checked to WCAG ≥ 4.5:1.
- **Works offline** on desktop and mobile.

---

## 🐛 Fixed in v2.1

- **The desktop installers were missing `i18n.js`.** v2.0's packaged build shipped without the
  dictionary file, so the language system could not initialise inside the EXE/MSI. `i18n.js` is now
  part of the packaged app — **this is why you should upgrade even if you never changed language.**
- **The mobile service worker served a stale dictionary forever.** The offline cache name is now
  derived from the dictionary's content hash, so a translation update always invalidates the cache
  instead of pinning users to an old one.

---

## 🔐 Installers

Self-signed. Fingerprint (SHA-256 of the signing certificate):

```
DB:7D:62:10:…:54:29:B
```

The Android APK uses the **same keystore as v1.5 and v2.0**, which is why it upgrades in place and
keeps Digital Asset Links working — Android shows a verified warning on install only because the app
is not on Google Play.

---

## 🧑‍💻 Build it yourself

```bash
git clone https://github.com/MooPuu/prompt-engineer.git
cd prompt-engineer
npm install
npm start        # run the desktop app
npm run build    # build installers into dist/
```

No framework, no build step for the web app — just open `index.html`.

## 📄 License

MIT — see [LICENSE](./LICENSE).