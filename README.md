# 🌿 Leaf Logic

**Leaf Logic** is a Chrome extension built with **React** that renders a right-side panel UI when activated from the Chrome extensions menu.

---

## 🚀 Getting Started (Local Development)

### Run Locally

```bash
npm install
npm run dev
```
---

### Build and Test
1) First you must increase the version by 1 in `manifest.json`.
2) run `git commit` and `git push` all your changed to main
3) run `npm run build`. This would creat a dist folder
4) Go to `chrome://extensions` in Google Chrome and enable **Developer mode**.
5) Then click **Load unpacked** and select the `dist/` folder. The add-on should be ready for testing!
