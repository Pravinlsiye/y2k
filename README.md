# Y2kSaaS

Marketing site for **Y2kSaaS** — hardware, software, and intelligence for connected systems in the real world.

Built with [SolidJS](https://solidjs.com), [Vite](https://vite.dev), TypeScript, and [GSAP](https://gsap.com) scroll/entrance animations.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve production build locally |

## Routes

| Path | Page |
|---|---|
| `/` | Landing — Hero, About, Services, Philosophy, Vision & Mission, Why We Exist |
| `/signin` | Sign in |
| `/careers` | Careers and open roles |
| `/demo` | Request a demo |
| `/talk` | Talk with an expert |

CTA forms use `mailto:` templates defined in `src/lib/mail.ts`.

## Project structure

```
src/
├── components/   # Landing sections, Navbar, Footer, Logo
├── pages/        # Route-level pages
├── lib/          # GSAP setup, mail templates
└── styles/       # Global CSS and animations
```

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to **GitHub Pages** on push to `main`.

The workflow sets `VITE_BASE` to `/<repo-name>/` so assets resolve correctly on Pages. Local dev uses `/` by default via `vite.config.ts`.

After enabling GitHub Pages (source: GitHub Actions), the site is available at:

```
https://<username>.github.io/<repo-name>/
```
