# Branding — Hungry Pilot by Blu Studio

Hungry Pilot is Blu Studio's rebrand of Nodedr OrderRestro (AGPL-3.0). This
page lists what the brand is made of, what still has placeholder values, and
what you must keep for the licence.

## Brand at a glance

| Thing | Value | Where it lives |
|---|---|---|
| Product name | Hungry Pilot | everywhere |
| Company | Blu Studio | everywhere |
| Shared constants (names, links, upstream credit) | `BRAND` | `packages/types/src/brand.ts` |
| Logo (vector source) | cloche with pilot wings | `apps/web/public/brand/hungry-pilot-mark.svg` |
| Logo, full-bleed for maskable icons | | `apps/web/public/brand/hungry-pilot-maskable.svg` |
| Logo + wordmark | | `apps/web/public/brand/hungry-pilot-lockup.svg` / `.png` |
| In-app logo (follows the accent colour) | `<Logo />` | `apps/web/components/layout/logo.tsx` |
| Colour themes | white base + 10 accents, Royal Blue default | `apps/web/app/globals.css`, `apps/web/lib/theme/accents.ts` |

Raster icons (favicon, PWA icons, `app/icon.png`, `logo.png`, CasaOS icon and
thumbnail, Windows MSIX tiles and `app.ico`) are all rendered from the SVGs
above in Royal Blue. If you change the logo, re-render them from the SVG
rather than editing the PNGs.

## Colour themes

The base is white with neutral greys; the accent is chosen per device from the
palette icon in the top bar (next to the user menu), together with Light / Dark
/ Match device. Accents: Royal Blue, Crimson Red, Golden Yellow, Emerald Green,
Hot Pink, Royal Purple, Ocean Teal, Tangerine, Burgundy, Midnight. Every accent
passes WCAG AA contrast in both modes. See `DESIGN_SYSTEM.md` for how to add
one.

## Placeholders to fill in before launch

The GitHub repository is set: **strixgc04-svg/Restro-Billing** (default branch
`main`; Docker images publish as `ghcr.io/strixgc04-svg/hungry-pilot-*`).

Until Blu Studio has a domain and support address, these links use
placeholders that can never resolve to someone else's site:

| Placeholder | Meaning |
|---|---|
| `https://hungrypilot.example.com` | product website (support page at `/contact`, docs at `/docs`, Linux installer at `/install-linux.sh`) |
| `support@hungrypilot.example.com` | support / conduct-report email |
| `https://blustudio.example.com` | Blu Studio's company site |

Replace them in one command, then review the diff:

```bash
scripts/set-brand-links.sh --website https://YOUR-SITE --company https://YOUR-COMPANY-SITE --email you@YOUR-DOMAIN
```

## Other things only Blu Studio can supply

- **Docker images.** CasaOS, the Debian package and the in-app updater pull
  `ghcr.io/<owner>/hungry-pilot-{backend,web}`. Push the repo to GitHub and let
  `.github/workflows/docker-publish.yml` publish them (then make the GHCR
  packages public — see `casaos/README.md`). The CasaOS manifest still uses the
  upstream project's generic updater sidecar (`ghcr.io/raktim94/nodedr-pos-updater`);
  publish your own from `./updater` and point `casaos/docker-compose.yml` at it
  if you'd rather not depend on it.
- **Microsoft Store identity.** `windows/msix/AppxManifest.xml` has a placeholder
  publisher (`CN=REPLACE-WITH-YOUR-PARTNER-CENTER-PUBLISHER-ID`). Reserve the
  app in Blu Studio's Partner Center, paste the real Name and Publisher, and
  drop `-AllowPlaceholderPublisher` from `.github/workflows/windows-msix.yml`.
- **Spain VERI\*FACTU.** The software producer is now `BLU STUDIO` with country
  `IN`. Set `VERIFACTU_PRODUCER_NAME`, `VERIFACTU_PRODUCER_COUNTRY` and
  `VERIFACTU_PRODUCER_ID` to Blu Studio's real legal details before anyone
  uses it in Spain (see `docs/verifactu.md`).
- **Screenshots and the PDF manual.** `docs/screenshots/`,
  `apps/web/public/screenshots/` (marketing page), `casaos/screenshot-*.png`
  and both `hungry-pilot-user-manual.pdf` files still show the old
  burgundy OrderRestro UI. Retake them from the running app; the manual's text
  source (`docs/hungry-pilot-manual.html`) is already rebranded.

## Renamed identifiers (for anyone upgrading an old install)

These changed with the rebrand, so an existing OrderRestro deployment is **not**
an in-place upgrade target:

| Before | After |
|---|---|
| npm scope `@nodedr-restaurant/*` | `@hungry-pilot/*` |
| Postgres user / database `nodedr` / `nodedr_restaurant` | `hungrypilot` / `hungry_pilot` |
| Containers `nodedr-restaurant-*` | `hungry-pilot-*` |
| Session cookie `nodedr_session` | `hp_session` (everyone signs in again) |
| Browser storage keys `nodedr_*`, `nodedr-locale` | `hp_*`, `hp-locale` |
| Webhook headers `X-OrderRestro-Event/Delivery/Signature` | `X-HungryPilot-*` |
| Kiosk ticket QR prefix `orderrestro:order:` | `hungrypilot:order:` |
| Debian package / service `nodedr-orderrestro` | `hungry-pilot` |
| Windows exe / data folder `OrderRestro` | `HungryPilot` |

## Licence obligations (AGPL-3.0) — keep these

- Keep `LICENSE` and `NOTICE`, including the original copyright line for
  Nodedr Infotech Private Limited and Raktim Ranjit.
- Keep the "Based on OrderRestro · Source code" credit in the marketing
  footer (`apps/web/components/marketing/marketing-footer.tsx`), and make
  "Source code" point at a public copy of the exact version you run — AGPL
  section 13 requires offering the source to everyone who uses the app over a
  network. The logged-in app (sidebar) no longer shows this line, so staff
  who never see the marketing page have no in-app source link; if you serve
  Hungry Pilot to other businesses, add one back somewhere they can reach
  (for example the user menu or an About page).
- You can sell, host and support Hungry Pilot, but your modified source must
  stay available under AGPL-3.0. This isn't legal advice; check with a lawyer
  for a commercial launch.
