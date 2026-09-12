# MindGarden

A calm, gentle activity companion — modeled on the [WonderKids](https://github.com/ealimon/wonderkids)
card layout and build pipeline, adapted for cognitive engagement: no scoring,
no timers, no wrong answers, and a softer color palette.

## Status

**5 of 10 modules are fully working right now**, in-browser, no setup needed:

- ☀️ Today Is... — date/day/season orientation
- 🌷 Virtual Garden — tap to plant/pick flowers
- 🎧 Nature Sounds — play/pause ambient sounds (needs audio files, see below)
- 🃏 Simple Matching — a gentle memory-match game
- 🎨 Coloring & Painting — tap-to-fill flower illustration

**5 modules are scaffolded but need content or a hosting decision:**

- 📷 Memory Lane Photos — needs family photos + a sync method
- 💬 Family Voices — needs recorded voice messages + a sync method
- 🎵 Sing Along — needs a song list (and optionally audio)
- 🧺 Sorting & Categories — needs object images
- 🧩 Puzzle Pieces — needs source photos

## Local development

```bash
npm install
npm run dev
```

## Adding nature sounds

Drop royalty-free `.mp3` files into `public/sounds/`:
- `public/sounds/rain.mp3`
- `public/sounds/ocean.mp3`
- `public/sounds/birds.mp3`
- `public/sounds/fireplace.mp3`

The Nature Sounds module already points at these paths — no code changes needed.

## Deploying to TestFlight

Same pipeline as WonderKids: push to `main`/`master` and
`.github/workflows/deploy-ios.yml` builds and uploads automatically, using
three repo secrets:

- `APP_STORE_CONNECT_KEY_P8`
- `APP_STORE_CONNECT_KEY_ID`
- `APP_STORE_CONNECT_ISSUER_ID`

Bundle ID: `com.limonmedia.mindgarden`. Configured as a **universal app**
(iPhone + iPad) — see `TARGETED_DEVICE_FAMILY` in the workflow if you'd
rather restrict it to iPad-only, like WonderKids.
