# Nike.com — Style Reference (source of truth for UI)

> monochrome gallery of athletic performance — white walls, product as art, chrome dissolved into the background.

**Theme:** mixed

Nike.com operates as a product-first monochrome gallery: the UI stays nearly invisible so photography can carry every screen. The entire interface is built from black, white, and three tints of gray — no accent color, no decorative gradient, no warm brand chrome. Identity lives in photography, never in the UI chrome. Typography is compact and utilitarian (Helvetica Now / Neue substitutes at 12–20px) with one oversized Futura-style moment at ~76px for hero headlines. Components are minimal: pill buttons at 30px radius, flat tiles, hairline borders, almost zero elevation. Pages alternate pure white product surfaces and full-bleed dark editorial heroes.

## Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Obsidian | `#111111` | `--color-obsidian` | Text, icons, strong contrast. Do not promote as the only CTA color |
| Paper White | `#ffffff` | `--color-paper-white` | Page background, card surface, button text on dark fills |
| Concrete Gray | `#e5e5e5` | `--color-concrete-gray` | Borders, dividers, hairlines |
| Soft Mist | `#f5f5f5` | `--color-soft-mist` | Secondary surfaces, search field, tags |
| Steel | `#707072` | `--color-steel` | Secondary text, muted helpers |
| Faint Gray | `#9e9ea0` | `--color-faint-gray` | Disabled / tertiary |

## Typography

- **UI body:** Helvetica Neue / Helvetica / Arial — weights **400 and 500 only** — 12 / 14 / 16 / 20px
- **Section headings:** medium 20–24px (never bold)
- **Hero display:** Futura substitute, 76px, line-height 1.0, weight 500
- Body text never above 20px or below 12px

## Spacing & shapes

- Base unit 4px · compact density
- Scale: 4, 8, 12, 16, 20, 24, 36, 48
- Radii: buttons/tags **30px**, nav/search **24px**, cards/inputs **0px**
- Page max-width **1440px** (nav + footer content only)
- Section gap 48px · card padding 12px · element gap 8px

## Components (required)

1. **Pill button** — Obsidian fill / white text (or inverse on dark). 30px radius. 6px / 8–16px padding. Opacity hover only. No shadow.
2. **Category hero card** — full-bleed photo, 0 radius, bottom-left white label + 20–24px headline + white pills.
3. **Product card** — white, 0 radius, image full-bleed in tile, small Obsidian pill label, no price/CTA clutter.
4. **Top nav** — two-tier: thin utility row (12px) + main row (logo left, links center 16px medium, search Soft Mist 24px + icons right). Transparent on white. No sticky blur.
5. **Editorial hero** — full-bleed dark media, Futura 76px bottom-left, 16px subcopy, one white pill CTA.
6. **Footer link grid** — 4 columns on white, headers 16–20px medium Obsidian, links Steel 16px, 12px row gap.
7. **Search field** — Soft Mist, 24px radius, no border.
8. **Icons** — stroke only, Obsidian / Steel, 16–20px.

## Elevation

No box-shadows. Depth only via (1) dark ↔ white section alternation, (2) Concrete Gray hairlines, (3) whitespace.

## Imagery rules for this project

- Photography carries brand identity.
- Full-bleed, sharp corners, no framed cards.
- **Only authentic Stan Wawrinka media** (licensed Commons photos now; authorized video later).
- Never pass off generic tennis players as Stan.
- Until licensed video exists, hero uses real Stan stills in a parallax stack + an explicit video slot.

## Do

- Monochrome UI only
- Pill CTAs only (Obsidian↔white)
- Helvetica-style UI at 12–20px; Futura-style only at hero display
- Sharp full-bleed photos
- Hairlines / whitespace instead of shadows

## Don't

- Accent colors in UI
- Weights above 500
- Box-shadows
- Rounded photo cards
- Decorative UI gradients / patterns behind text
- Fake or generic athlete imagery presented as Stan
