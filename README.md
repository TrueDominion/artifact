# artiFACT

A Christian apologetics knowledge platform that equips users with clear, structured arguments supporting Christianity and responding to competing worldviews.

artiFACT functions like a curated museum of ideas — users explore a modern archaeological exhibition about truth, belief, and the history of ideas.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Language | TypeScript |
| Styling | Plain CSS in cascade layers (Evenkeel design system) |
| Animation | CSS scroll-driven animations + a small motion kit, no libraries |
| Routing | React Router v6 |
| Hosting | Cloudflare Pages |
| Content | Local JSON files |

---

## Local Development

### Prerequisites

- Node.js 18+ 
- npm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/artifact.git
cd artifact

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server runs at `http://localhost:5173`.

### Build

```bash
npm run build
```

Output is written to `./dist`. Preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
artifact/
├── public/
│   ├── _headers          Cloudflare security & cache headers
│   ├── _redirects        SPA fallback routing
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/       Nav (full-screen menu), Footer (wordmark), Layout
│   │   └── ui/           PageHead, Entry, Prose, Sources, glyphs
│   ├── lib/
│   │   ├── content.ts    Typed data access; all displayed counts derive from the JSON
│   │   └── motion.ts     Motion kit: measure, track, reveal, smooth wheel
│   ├── pages/            One file per route/section
│   ├── data/             JSON content files
│   ├── types/            TypeScript interfaces
│   └── styles/
│       ├── system.css    Tokens, base, atoms (m-*), layout (l-*), reveal motion
│       ├── chrome.css    Nav, menu, footer, corner ghosts
│       ├── home.css      Home sections and their scroll scenes
│       └── pages.css     Inner-page patterns: pg-*, ex-*, lg-*, st-*, m-chip
├── vite.config.ts
└── tsconfig.json
```

---

## Design system

The site uses the Evenkeel system by 8B (MIT, see `THIRD_PARTY_NOTICES.md`): Swiss black on white, one crimson accent (`--color-6`), Host Grotesk only, and a vertical hairline rule about a third of the way across that the type hangs on. Meta sits right-aligned left of the rule; content sits right of it.

Rules for extending it:

- Every rule lives in a cascade layer (`tokens < base < atoms < layout < sections < scenes`). Never add unlayered CSS: it overrides every layer.
- Colours, fonts and spacing are tokens in `:root` (`system.css`). The rule position is `--space-3`.
- Scroll scenes run only when `index.html` sets `data-live` (scroll-driven animation support, no reduced motion). Without it, every section must read complete.
- Reveal motion is declarative: `data-motion="post|rule|weigh"` plus optional `data-enter="90%"`.
- Deep links open entries: `/bedrock#trinity`, `/faultlines#satanic-verses`. Field Guide and Strata state lives in the URL (`?tradition=islam`, `?module=gods`), and so do Dig filters (`?filter=islam`).

## Content

All content lives in `src/data/`:

| File | Contents |
|------|----------|
| `bedrock.json` | Core Christian doctrines |
| `arguments.json` | Apologetic arguments (Kalam, Moral, etc.) |
| `worldviews.json` | Competing belief systems |
| `debates.json` | Major theological challenges |
| `thinkers.json` | Historical and contemporary apologists |

---

## GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit: artiFACT v1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/artifact.git
git push -u origin main
```

---

## Cloudflare Pages Deployment

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project** → **Connect to Git**
3. Select your GitHub repository
4. Configure the build settings:

| Setting | Value |
|---------|-------|
| Framework preset | None (Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `18` |

5. Click **Save and Deploy**

No environment variables are required. The site is fully static.

---

## Navigation Sections

| Route | Section | Metaphor |
|-------|---------|---------|
| `/` | Home | The excavation site entrance |
| `/bedrock` | Bedrock | The immovable foundation |
| `/the-dig` | The Dig | Arguments uncovered |
| `/the-gallery` | The Gallery | Beliefs in context |
| `/faultlines` | Faultlines | Where the ground breaks |
| `/field-guide` | Field Guide | Quick reference for conversations |
| `/the-strata` | The Strata | The world Scripture was written into |

---

*The excavation continues.*
