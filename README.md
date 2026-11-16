# Tastenbelegung

Tastenbelegung von DualShock 4 und DualSense auf Deutsch und Englisch. Teil der inoffiziellen consolecheat-Werkzeuge rund um [consolecheat.com](https://consolecheat.com). German is the primary language, English is the other. Light and dark theme, self-hosted fonts, footer, Impressum, and Datenschutz are included. There is no Webmail link.

No account, no tracking, nothing uploaded. Fonts (Outfit, Source Sans 3) are self-hosted from `@fontsource`, so the page makes no request to Google or any other third party. The Impressum fields are placeholders until the operator fills them in. No name or address was invented.

Site: <https://robfreak.github.io/consolecheat-ex9/>

Inoffiziell. Nicht von Sony.

## What it does

A static reference for the DualShock 4 and DualSense button layout. Switch the two with the tabs (arrow keys move between them). Every control is labeled in German and English. German face-button names are Kreuz, Kreis, Quadrat, and Dreieck. The printed symbols × ○ □ △ are the same on every controller. English names are Cross (often X), Circle (often O), Square, and Triangle. The drawing is an SVG silhouette with focusable controls. A text list under it names the same controls. Short notes cover the real differences: Create instead of Share, the mute button, adaptive triggers, haptic feedback, and the light bar.

Nothing is uploaded. The page does not use the Gamepad API. That lives on the Controller-Tester, a sibling tool at `https://robfreak.github.io/consolecheat-ex3/`. The chosen controller is not stored, not even in `sessionStorage`. Language and appearance reuse `consolecheat-lang` and `consolecheat-theme`.

Open it at `/consolecheat-ex9/`.

## Storage

- `consolecheat-lang` and `consolecheat-theme` (localStorage, shared with the other consolecheat tools on robfreak.github.io)

The Datenschutz page has a button that removes this page's keys. Nothing else is stored.

## Run and test

```bash
npm install
npm test        # node --experimental-strip-types --test src/tasten/*.test.ts
npm run dev     # http://127.0.0.1:5173/consolecheat-ex9/
npm run build   # typecheck, Vite build (base /consolecheat-ex9/), offline check of dist/
npm run preview # http://127.0.0.1:4173/consolecheat-ex9/
```

Node `>=22.6` (`package.json` `engines`).

## Files

- `index.html` — the HTML entry (Vite input)
- `src/tasten/` — React + TypeScript source, styles, and tests
- `src/tasten/tools.ts` + `src/tasten/tool-links.tsx` — the footer list **Weitere Werkzeuge** (keep it identical across the consolecheat repos)
- `public/` — `favicon.svg`, `FONT-OFL.txt`, `.nojekyll`
- `scripts/check-dist.mjs` — offline check of `dist/` (no third-party hosts, no `.woff` fallback, woff2 fonts present)
- `.github/workflows/pages.yml` — test, build, and deploy to `gh-pages`

## Other tools

The footer group **Weitere Werkzeuge** (English: **Other tools**) links to the other consolecheat tools: Title-ID-Finder (ex1), PS-Plus-Archiv (ex2), Controller-Tester (ex3), Save-Info-Leser (ex4), Fehlercode-Nachschlager (ex5), the [Spiele-Merkliste](https://robfreak.github.io/consolecheat-ex6/), and [Bildschirm-Test](https://robfreak.github.io/consolecheat-ex7/), [Download-Zeit-Rechner](https://robfreak.github.io/consolecheat-ex8/), [HDR/Helligkeit](https://robfreak.github.io/consolecheat-ex10/), [Audio-Kanal-Test](https://robfreak.github.io/consolecheat-ex11/), [USB-Stick-Checkliste](https://robfreak.github.io/consolecheat-ex12/), [Combo-Trainer](https://robfreak.github.io/consolecheat-ex13/), [Sprite-Animator](https://robfreak.github.io/consolecheat-ex14/). These are ordinary links. The page does not request those sites.

This tool was moved here from [Robfreak/consolecheat-ex6](https://github.com/Robfreak/consolecheat-ex6).

## GitHub Pages

`.github/workflows/pages.yml` runs install, test, and build on pull requests and on every push. A push to `main` also pushes `dist/` to the orphan branch `gh-pages` (`peaceiris/actions-gh-pages`, Jekyll off). Vite `base` is `/consolecheat-ex9/`, which matches the project site <https://robfreak.github.io/consolecheat-ex9/>.

Enable once in the repository settings:

1. **Settings → Actions → General → Workflow permissions → Read and write permissions.** Save.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch.** Branch: **`gh-pages`**, folder: **`/ (root)`.** Save.

After that, every push to `main` updates the site.

## Credits

Outfit and Source Sans 3 are bundled from `@fontsource` under the SIL Open Font License; see `public/FONT-OFL.txt` and `THIRD_PARTY_NOTICES.md`.

Replace the Impressum placeholders with the operator’s real details before treating that page as a legal notice.
