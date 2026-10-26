# Design System

Bar to hit: Stripe Dashboard, Linear, Notion, Vercel, Raycast, Arc, Figma,
Framer, Shopify Admin, Clerk Dashboard. Minimal, spacious, confident
typography, restrained color, real motion — not a "POS with rounded
corners." A screen that looks like a generic admin template is not done.

Every nontrivial UI task in this repo should pull from the installed
frontend skills in this order (see global `~/.claude/CLAUDE.md` for full
detail): `frontend-design` for the initial Design Read →
`bencium-controlled-ux-designer`'s ask-first protocol for real
color/typography stakes → `react-best-practices` / `composition-patterns`
while writing components → `web-design-guidelines` + `accesslint` audit
before calling anything done.

## Color tokens (light)

```
--background:      #FFFFFF   /* white base */
--card:             #FFFFFF
--sidebar:          #FCFCFD
--foreground:       #111827   /* primary text */
--muted-foreground: #6B7280   /* secondary text */
--border:           #E6E8EC
--success:          #22C55E
--warning:          #F59E0B
--danger:           #EF4444
--primary:          var(--acc)      /* the chosen accent — see below */
--primary-foreground: var(--acc-fg)
```

Dark mode (own token set, not `background * 0.1` math):

```
--background:       #0B0B0D
--card:              #151517
--sidebar:           #111113
--foreground:        #F4F4F5
--muted-foreground:  #9CA3AF
--border:            #26262A
--success:           #34D399
--warning:           #FBBF24
--danger:            #F87171
--primary:           var(--acc-d)    /* lighter tint of the accent */
--primary-foreground: var(--acc-d-fg)
```

**Accent colours (theme picker).** Hungry Pilot keeps a white, neutral base
and lets each device pick its accent from the palette icon in the top bar:
Royal Blue (default, Blu Studio's brand colour), Crimson Red, Golden Yellow,
Emerald Green, Hot Pink, Royal Purple, Ocean Teal, Tangerine, Burgundy and
Midnight. Each accent is four raw values in `apps/web/app/globals.css`
(`--acc`, `--acc-fg` for light mode; `--acc-d`, `--acc-d-fg` for dark), and
every themed token — primary, ring, sidebar highlight, chart-1, the soft
`--accent` tint, card shadows, the button gradient — is derived from them.
Every pair is checked for WCAG AA (>= 4.5:1) both as button text and as text
on white/dark surfaces, which is why "yellow" is a deep gold in light mode.
To add an accent: add its four values under `:root[data-accent="<id>"]`, add
it to `apps/web/lib/theme/accents.ts`, and check the contrast pairs. The
choice is stored per device in `localStorage` (`hp-accent`) and applied
before first paint by the inline script in `app/layout.tsx`. The customer
kiosk always renders the light palette with the current accent.

## Typography

Font: Geist (or Inter as fallback) — one premium sans, no mixing.

| Role | Size | Weight |
|---|---|---|
| Dashboard title | 32px | semibold |
| Section title | 24px | semibold |
| Card title | 18px | medium |
| Body | 15–16px | regular |
| Small label | 13px | medium, muted |
| Numbers (KPIs) | large, bold, tabular-nums | — |

## Layout

Top nav (workspace switcher, search/command palette, notifications, user
menu) + collapsible icon+label sidebar + content area. Sidebar collapses to
an off-canvas drawer below `lg` (this is a correctness requirement, not
cosmetic — `nodedr-pos` shipped a fixed-256px sidebar that ate 66% of a
phone viewport before it was caught and fixed; do not repeat that here,
verify at ~375px/~768px/desktop with real screenshots before calling any
layout done).

Dashboard uses a bento-grid layout where it fits (mixed card sizes, not a
uniform 3-column grid of identical boxes).

## Components (all in `packages/ui`, one consistent spacing/shadow/radius scale)

Cards: 24px padding, 16px radius, soft shadow, hover elevation.
Tables: TanStack Table wrapper — sticky header, rounded corners, hover
row, inline edit, bulk actions, column visibility, filters, sort, search,
pagination, skeleton loading, real empty states (illustration + helper
text + primary action, never a blank div).
Buttons: rounded, consistent sizing, loading/disabled/success states,
icon support.
Forms: generous spacing, floating labels, inline validation, searchable
selects, date/time pickers.
Charts: Recharts, theme-aware via CSS vars, animated, interactive.
Full primitive list to build: Button, Input, Select, Card, Table/DataGrid,
Chart wrapper, Dialog, Drawer, Toast, Tabs, Breadcrumbs, Avatar, Badge,
Progress, Timeline, Calendar, Command Palette, Search, Empty State,
Skeleton.

## Motion

Fast, natural: fade/slide/scale/spring on hover, press, page transition,
drawer open/close, toast enter/exit. Avoid excessive animation — every
motion should communicate state change, not decorate.

## Accessibility

WCAG AA minimum. Keyboard-navigable everywhere (POS and KDS screens
especially — they're used under time pressure). Visible focus states.
Screen-reader labels on icon-only buttons. Run `accesslint`'s `audit` skill
(live-DOM, not just static code read) before marking any UI surface done.

## Surface-specific notes

- **POS order screen:** built for speed — large touch targets, fast search,
  keyboard shortcuts, instant checkout, minimal clicks. This screen trades
  some of the "spacious" aesthetic for density/speed deliberately; that's a
  considered exception, not an inconsistency.
- **KDS:** large legible tickets, visible timers, color-coded status,
  drag between status columns, full-screen mode, touch-optimized — this
  screen is read from 2-3 meters away in a kitchen, so type size floors are
  higher than the rest of the app.
- **Reservation calendar:** timeline view, drag-to-reschedule, color-coded
  by status/table.
