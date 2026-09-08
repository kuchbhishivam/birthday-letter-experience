# Birthday Letter Experience ♥

A polished, responsive React/Vite birthday microsite with a multi-step reveal:

1. Hero / Happy Birthday screen
2. Letter for you → animated envelope
3. Envelope opens → handmade calendar card
4. Calendar opens → handwritten letter image
5. Confetti, floating hearts, responsive layout, reduced-motion support, and QR modal

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy on Render

Create a **Static Site** pointing at this project/repository.

- Build command: `npm install && npm run build`
- Publish directory: `dist`

The QR destination is currently set to:
`https://anwesha-birthday.onrender.com`

If the final deployed URL changes, update `SITE_URL` in `src/main.jsx` and regenerate the QR code you use for sharing.

## Notes

Django/Flutter are intentionally not used here: this is a static, interaction-heavy microsite, so React + Vite gives the simplest and fastest production deployment. A Django API can be added later if you want editable content, visitor analytics, a private message, or an admin panel.
