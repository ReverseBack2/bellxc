# Bellarmine Cross Country

A self-hosted recreation of bellxc.com with four complete visual directions. Content is shared across every version, so team information only needs to be updated once.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the concept gallery.

## Production

```bash
npm run build
npm run start
```

## Home-network preview

The development server is suitable for a quick preview from other devices on the same trusted home network:

```bash
npm run dev:lan
```

Open `http://<this-computer-lan-ip>:3000` from another computer or phone. macOS might ask whether Node may accept incoming connections. This process stops when the terminal closes and should not be exposed through your router.

For a production-like local container on port `32001`:

```bash
docker compose up -d --build --wait
curl http://127.0.0.1:32001/api/health
```

Set `BELLXC_BIND` to a particular private-LAN address if desired; it defaults to `0.0.0.0`. Set `BELLXC_PORT` to change the host port.

## GitHub image and TrueNAS

The deployment layout mirrors `ReverseBack2/truenas-web`:

- `Dockerfile` builds a standalone Next.js image and runs it as the non-root `nextjs` user.
- `.github/workflows/bellxc.yaml` verifies pushes to `main`, then publishes `ghcr.io/reverseback2/bellxc:main` and an immutable commit-SHA tag.
- `infra/compose/bellxc.truenas.yaml` is the Compose YAML for the TrueNAS Apps screen and exposes host port `32001`.
- `/api/health` verifies that the application and Markdown event catalog are readable.

After pushing this project to the GitHub repository, wait for the `Build bellxc` workflow to finish. Ensure the resulting GHCR package is public, or configure TrueNAS with GitHub Container Registry credentials.

On TrueNAS SCALE 24.10 or later:

1. Open **Apps → Discover Apps → Install via YAML**.
2. Use `bellxc` as the app name.
3. Paste the contents of `infra/compose/bellxc.truenas.yaml` and save.
4. Visit `http://<truenas-lan-ip>:32001`.

The YAML uses `pull_policy: always`. After a new `main` image is published, update or recreate the installed app so TrueNAS pulls it. GitHub Actions publishes the image but does not connect to the NAS. For reliable rollbacks, replace `:main` in the TrueNAS YAML with a known commit-SHA tag.

Do not port-forward `32001` through the router. If you later want internet access, place it behind your existing HTTPS reverse proxy instead of exposing the application port directly.

The project uses a deliberately lean, T3-style foundation: Next.js App Router, React, and strict TypeScript. It has no database, authentication, API layer, or other server-side application state.

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

The event loader in `lib/events.ts` validates required fields at build time. No database or admin system is needed—add or edit Markdown, then rebuild the site.

The original Squarespace routes are preserved beneath each design prefix:

- `/original`
- `/heritage`
- `/pace`
- `/night`

Each includes About, Calendar, Meet Info, Meet 101, Meet Types, Useful Links, Photos, 2024 Photos, and 2023 Photos.
