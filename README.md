# Bellarmine Cross Country

A static recreation of bellxc.com with four complete visual directions. Content is shared across every version, so team information only needs to be updated once.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the concept gallery.

## Production build

```bash
npm run build
```

The static site is written to `out/` and can be served by any static web server.

## Home-network preview

The development server is suitable for a quick preview from other devices on the same trusted home network:

```bash
npm run dev:lan
```

Open `http://<this-computer-lan-ip>:3000` from another computer or phone. macOS might ask whether Node may accept incoming connections. This process stops when the terminal closes and should not be exposed through your router.

The project uses a deliberately lean, T3-style foundation: Next.js App Router, React, and strict TypeScript. It has no database, authentication, API layer, or other server-side application state.

## GitHub Pages

Pushes to `main` run `.github/workflows/bellxc.yaml`, which type-checks the app, creates the static export, and deploys `out/` to GitHub Pages.

Repository setup:

1. Open **Settings → Pages** on GitHub.
2. Set **Source** to **GitHub Actions**.
3. Optionally set a custom domain. For a subdomain, point a DNS `CNAME` record at `reverseback2.github.io`.
4. Push to `main` and wait for the Pages deployment to complete.

`next.config.ts` reads the Pages base path supplied by GitHub during the workflow, so the same build works at the repository URL or at a configured custom domain.

## Content map

Team copy, resource links, meet types, and photo galleries live in `lib/content.ts`. Page composition is in `components/pages.tsx`; the four visual systems are in `app/globals.css`.

### Adding calendar events

Add one Markdown file per event to `content/events`. Files are sorted by the `date` field, so a descriptive filename such as `2026-09-12-lowell-invitational.md` works well:

```md
---
title: "Lowell Invitational"
date: 2026-09-12
time: 8:00 AM
location: Golden Gate Park
category: Invitational
example: false
---
Add arrival instructions, race details, transportation notes, or relevant links here.
```

Required fields are `title`, `date`, `time`, `location`, and `category`. Set `example: true` only for demonstration content; those entries receive a prominent “Example only” label. Delete the included example files before publishing the official schedule.

The event loader in `lib/events.ts` validates required fields at build time. No database or admin system is needed—add or edit Markdown, then push to `main` to rebuild the site.

The site uses the Night Pace visual identity throughout. The homepage is served at `/`, with clean top-level routes for About, Calendar, Meet Info, Meet 101, Meet Types, Useful Links, Photos, 2024 Photos, and 2023 Photos.
