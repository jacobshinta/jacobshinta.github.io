# jacobshinta.github.io

My portfolio site. Next.js (static export) + Tailwind, hosted on GitHub Pages.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the static site to out/
```

## Where things live

| What | Where |
|---|---|
| Name, email, links, demo reel URL | `src/lib/site.ts` |
| Every game and web project (text, images, links) | `src/lib/projects.ts` |
| Screenshots (generated, don't edit by hand) | `public/images/<slug>/` from `node scripts/images.mjs` |
| Browser-playable game builds | `public/builds/<slug>/` (Godot web export, **threads off**) |
| The first site I built, kept as-is | `public/2021/` |
| Résumé (edit the HTML, then `node scripts/resume.mjs` prints `public/resume.pdf`) | `resume/resume.html` |
| Favicon, link-preview card (`npx tsx scripts/brand.tsx` re-renders the card) | `src/app/icon.svg`, `scripts/brand.tsx` |
| Deploy | `.github/workflows/deploy.yml` (push to `master`) |

## Adding a browser build

Export from Godot with the Web preset's **Thread Support turned off**. GitHub Pages can't send the
cross-origin-isolation headers a threaded build needs. Put the files in `public/builds/<slug>/` and
set `links.play` to `/play/<slug>/` on that project in `projects.ts`.
