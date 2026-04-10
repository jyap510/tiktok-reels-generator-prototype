# Quickstart: Orchestration Dashboard

A Next.js dashboard for viewing pipeline run history, personas, and niches. Read-only — it displays data from TypeScript data files, not a live database.

---

## Prerequisites

Node.js 18+ and npm.

---

## Run

```bash
cd orchestration_layer
npm install      # first time only
npm run dev
```

Open http://localhost:3000.

---

## Routes

| Route | What it shows |
|-------|--------------|
| `/` | Dashboard — run stats (total, products, success/fail) + recent runs table |
| `/runs/[id]` | Detail view for a specific pipeline run |
| `/personas/[id]` | Persona detail |
| `/niches/[id]` | Niche detail |

---

## Data

The dashboard reads from TypeScript data files in `orchestration_layer/src/data/`. These are populated from pipeline `run_log.json` output — currently updated manually or by a sync script.

To add a new run to the dashboard, add its data to the relevant file in `src/data/`.

---

## Stack

- **Next.js 16** (non-standard version — see note below)
- **React 19**
- **Tailwind 4**
- **TypeScript 5**

**Important:** This project uses Next.js 16, which has breaking changes from earlier versions. Before modifying any Next.js-specific code (layouts, routing, config), read the relevant guide in `orchestration_layer/node_modules/next/dist/docs/`. Do not assume Next.js 14/15 patterns apply.

---

## Build

```bash
cd orchestration_layer
npm run build
npm run start    # runs the production build
```

---

## Project Structure

```
orchestration_layer/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Dashboard (/)
│   │   ├── runs/[id]/page.tsx  # Run detail
│   │   ├── personas/[id]/      # Persona detail
│   │   └── niches/[id]/        # Niche detail
│   ├── components/
│   │   └── layout.tsx          # AppShell (sidebar + nav)
│   └── data/                   # TypeScript data files
├── public/                     # Static assets
├── next.config.ts
├── tailwind.config (via postcss.config.mjs)
└── package.json
```

---

## Linting

```bash
cd orchestration_layer
npx eslint .
```
