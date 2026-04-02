# PalHelper

A Palworld companion site with tools to help you while playing.

🌐 **Live site:** https://eyal-hl.github.io/palHelper/

## Features

- **Material Search** — Find which Pals drop or produce any material, grouped by drop / farming / butchering
- **Pal Browser** — Browse all Pals, filter by element or work type, view detailed stats
- **Pal Tracker** — Track which Pals you've caught, with progress bar and filters

## Tech Stack

- React + TypeScript
- CSS Modules
- Vite
- Vitest
- GitHub Pages (auto-deploy on push)

## Running Locally

```bash
npm install
npm run dev
```

## Adding Data

All game data lives in `src/data/`:
- `pals.json` — Pal stats, drops, locations, work suitabilities
- `materials.json` — Material names, categories, descriptions

To add a new Pal, add an entry to `pals.json`. Material sources are derived automatically from pal drop data.
