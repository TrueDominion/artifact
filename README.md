# artiFACT

A Christian apologetics knowledge platform that equips users with clear, structured arguments supporting Christianity and responding to competing worldviews.

artiFACT functions like a curated museum of ideas — users explore a modern archaeological exhibition about truth, belief, and the history of ideas.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
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
│   │   ├── layout/       Navbar, Footer, Layout wrapper
│   │   ├── ui/           Reusable design-system components
│   │   └── home/         Hero and homepage-specific components
│   ├── pages/            One file per route/section
│   ├── data/             JSON content files
│   ├── types/            TypeScript interfaces
│   ├── hooks/            Custom React hooks
│   └── styles/           Global CSS
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

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
| `/the-studio` | The Studio | The atelier of reasoning |
| `/faultlines` | Faultlines | Where the ground breaks |
| `/the-collection` | The Collection | Thinkers & intellectual history |

---

*The excavation continues.*
