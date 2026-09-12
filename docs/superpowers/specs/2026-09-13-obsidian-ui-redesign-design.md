# Obsidian UI Redesign — Design Spec

Date: 2026-09-13
Branch: `redesign/obsidian-ui`

## Brief

Full ground-up UI rethink of Yash Vishnoi's portfolio (React 19 + Vite, custom CSS, Framer Motion, Lenis). The current "Instrument Panel" look (cream paper, amber accent, Instrument Serif) was judged unpleasing and its type "not up to the mark". Same content and section set; new identity, new type system, new layout, new motion language with subtle "wow" moments drawn from React Bits / Aceternity / Magic UI patterns.

Non-goals: no new copy beyond micro-labels, no new pages, no Tailwind, no GSAP or three.js. All effects are hand-built with Framer Motion, canvas, and CSS so the bundle stays lean.

## Grounding

Subject: a computer engineering student who ships real products (SIH Buddy, 20k+ users) and trains models (GRPO, QLoRA, RL). Audience: recruiters and engineers deciding in 30 seconds whether to keep scrolling. Page job: get them to the projects and then to contact.

Metaphor: **a dark studio lit only by the screen.** The accent colour is treated as *light*, never as paint. It appears as glow, spotlight, and border-light that follows the pointer, not as flat fills. Surfaces are matte obsidian; text is warm white.

## Concept name: Obsidian

## Design tokens

### Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A0A0C` | Page ground |
| `--bg-2` | `#111114` | Cards, nav glass base |
| `--bg-3` | `#17181C` | Raised / hover surface |
| `--line` | `rgba(255,255,255,0.08)` | Hairlines |
| `--line-2` | `rgba(255,255,255,0.14)` | Hover hairlines, input borders |
| `--fg` | `#F3F2EE` | Primary text (warm white) |
| `--fg-2` | `#A6A7AD` | Secondary text |
| `--fg-3` | `#6E7079` | Tertiary, eyebrows, placeholders |
| `--glow` | `#8FA9FF` | The light. Interactive states, spotlight, links, focus ring |
| `--glow-soft` | `rgba(143,169,255,0.18)` | Spotlight gradients, chip tint |
| `--live` | `#4ADE80` | Only for "Live" / "Available" / current-role indicators |

Rule: `--glow` is the only chromatic accent used for interaction. `--live` is reserved for status dots. Nothing else is coloured.

Contrast: `--fg` on `--bg` 17:1, `--fg-2` 7.5:1, `--fg-3` 3.9:1 (used only at ≥ 14px uppercase mono or as decorative), `--glow` on `--bg` 8.6:1.

### Type

| Role | Face | Notes |
|---|---|---|
| Display | **Bricolage Grotesque** (variable: opsz 12–96, wdth 75–100, wght 200–800) | Hero name, section titles, project titles, big numbers. Width axis is used expressively. |
| Body / UI | **Geist** (300–700) | Paragraphs, buttons, form fields, nav |
| Mono / meta | **Geist Mono** (400–600) | Eyebrows, dates, tags, stats labels, footer clock |

Scale (desktop → mobile via clamp):
- Hero name: `clamp(64px, 13vw, 180px)`, wdth 80, wght 300 at rest, line-height 0.9, tracking -0.03em
- Section title: `clamp(36px, 5vw, 64px)`, wdth 90, wght 500, tracking -0.025em, line-height 1.02
- Card title: 24–28px, wdth 95, wght 500
- Body: 16px / 1.65, Geist 400; lead paragraph 18–20px
- Small: 13–14px
- Mono eyebrow: 11.5px, uppercase, tracking 0.14em, `--fg-3`

Load via Google Fonts in `index.html`:
`Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800` · `Geist:wght@300..700` · `Geist+Mono:wght@400..600`

### Spacing, radius, motion

- Container 1200px, side padding 32px (20px < 768px).
- Section rhythm 140px top/bottom (96px < 768px). Sections separated by a single `--line` hairline, no background changes between sections.
- Radius: 8 (chips/buttons), 16 (cards), 999 (pills). No 2–4px "sharp" radii.
- Easing: expo-out `[0.22, 1, 0.36, 1]` for reveals; spring `{ stiffness: 300, damping: 30 }` for pointer-following.
- Reveal: one shared `<Reveal>` wrapper (opacity 0→1, y 24→0, blur 6→0, 0.7s, once). Stagger children at 0.08s.

## Signature element

**The hero name reacts to the pointer through the variable font.** "Yash Vishnoi" is set at 13vw in Bricolage at wdth 80 / wght 300. Each letter interpolates toward wdth 100 / wght 700 based on its distance from the pointer (gaussian falloff, radius ≈ 160px). The letters literally swell with light as the cursor passes. Beneath it, a canvas dot field brightens and drifts toward the pointer and springs back. This is the one place the design is loud; everything after is quiet.

Touch / reduced-motion: the name renders at wdth 90 / wght 400, static; dot field renders static.

## Page structure and flow

```
┌─────────────────────────────────────────────────────────┐
│  [YV]        ( About Education Experience … )   Resume  │  floating pill nav
├─────────────────────────────────────────────────────────┤
│  · · · · · · · · · dot field · · · · · · · · · · · · ·  │
│  COMPUTER ENGINEERING · THAPAR · 2024–2028               │  eyebrow (mono)
│  YASH                                                   │  display, proximity
│  VISHNOI                                                │
│  Building [Full-stack products ⟳ AI systems ⟳ …]        │  rotating word
│  short tagline · [View work] [Get in touch]             │  magnetic buttons
│  9.49 CGPA   96.5% ISC   20k+ users        gh in mail   │  count-up stats
├─────────────────────────────────────────────────────────┤
│ ◂ React · Node · PyTorch · Firebase · Redis · GRPO … ▸  │  marquee strip
├─────────────────────────────────────────────────────────┤
│  About            │ paragraph words light up on scroll   │
│  (sticky title)   │ Location / Institution / Availability│  hairline table
│                   │ interest chips                        │
├─────────────────────────────────────────────────────────┤
│  Education        [ 9.49 ──── B.E. CE ] [ 96.5 ── ISC ]  │  spotlight cards
├─────────────────────────────────────────────────────────┤
│  Experience   ●━━━━━━━ Dakhila AI (current, live dot)    │  tracing beam
│               ○─────── Raise Digital                     │  fills on scroll
├─────────────────────────────────────────────────────────┤
│  Projects   ┌──────────────── SIH Buddy ───────────────┐ │  scroll stack:
│             │┌──────────── Hotel Booking ─────────────┐│ │  cards pin & stack
│             ││┌────────────── RankX ─────────────────┐││ │
├─────────────────────────────────────────────────────────┤
│  Skills   ┌────────┬────┬────┐  bento, spotlight +       │
│           │ Lang   │Web │DB  │  border light follows     │
│           ├────────┴────┴────┤  pointer                  │
├─────────────────────────────────────────────────────────┤
│  Awards   2026  JP Morgan Code For Good      Finalist  → │  editorial rows
│           2026  Meta PyTorch OpenEnv          Finalist  → │
├─────────────────────────────────────────────────────────┤
│  Let's build          │  Name  Email                     │
│  something.           │  Subject                         │
│  email ⧉ copy         │  Message                         │
│  gh · in              │  [Send message] (stateful)       │
├─────────────────────────────────────────────────────────┤
│  © 2026 Yash Vishnoi     Patiala · 14:32 IST     ↑ Top   │  footer
└─────────────────────────────────────────────────────────┘
```

### Section details

**Loading screen** (once per session). Name in Bricolage masked-reveals line by line while a mono counter runs 0→100 bottom-left. Exit: the screen wipes upward with `clip-path: inset(0 0 100% 0)` over 0.8s. Total ≤ 1.8s.

**Nav.** Centered floating pill (glass: `--bg-2` at 70% + 16px backdrop blur + `--line` border), 12px from top. Items are text; active item has a sliding pill background via Framer `layoutId`. Left of the pill: "YV" monogram button (scroll to top). Right: "Resume" ghost pill. Below 900px: monogram + hamburger; menu opens as a full-screen overlay with links staggered in at display size. Nav hides on scroll-down and returns on scroll-up. A 48px gradual-blur strip sits under the nav so content fades as it passes beneath.

**Hero.** Described above. Role rotator cycles "full-stack products", "AI systems", "things people use" every 2.6s with a vertical slide. Stats: 9.49 CGPA, 96.5% ISC, 20k+ users served (count-up on mount). Socials bottom-right, scroll cue bottom-centre (thin line that draws down).

**Marquee.** Single row of stack names in Geist Mono, edges fade to `--bg`, pauses on hover. Content: React · Node.js · Express · MongoDB · Firebase · Redis · Python · PyTorch · GRPO · QLoRA · Hugging Face · FastAPI · Stripe · Clerk · Vercel · AWS · MySQL · Laravel.

**About.** Two-column, title sticky on the left. Right: the three existing paragraphs merged into one lead paragraph where each word's colour maps from `--fg-3` to `--fg` by scroll progress (word-by-word, useScroll on the paragraph). Below it a hairline table: Location, Institution, Availability. Then interest chips.

**Education.** Two equal spotlight cards. Big number (9.49 / 96.5) in Bricolage 72px counts up on view; below it degree, school, years, and the two detail rows. Pointer-following radial glow on the card surface, border-light on the nearest edge.

**Experience.** Vertical timeline. A 1px track on the left with a `--glow` fill whose height is bound to the section's scroll progress; each entry has a node that lights when the fill passes it. Current role's node pulses `--live`. Entry layout: left column mono meta (dates, location, type), right column role, company, description, bullets, tags.

**Projects.** Scroll stack. The section is tall; each project card is `position: sticky; top: 96px`. As the next card scrolls up, the previous one scales to 0.94 and dims (opacity 0.6) via useScroll on the section. Card: left screenshot (or generated gradient panel for RankX/SplitSmart) with subtle parallax on hover, right body with title, subtitle, description, highlights, tags, links. "Live" badge uses `--live`. Order: SIH Buddy, Hotel Booking, RankX, SplitSmart.

**Skills.** Bento grid (12-col). Languages (4 cols), Web (5), Databases & Cloud (3), Third-party APIs (4), Tools (8). Each cell: title, mono subtitle, chips. Spotlight glow and border-light follow the pointer across the whole grid (single mousemove listener on the grid, CSS variables per cell).

**Awards.** Editorial list. Each row: year (mono) | title (display 22px) | org (fg-2) | arrow. Hover: row background `--bg-2`, arrow translates 6px, title colour `--glow`. Rows reveal with stagger.

**Contact.** Left: "Let's build something." in display, one-line availability note with `--live` dot, email as a large mono line with a copy button (magnetic; shows "Copied" for 1.5s), GitHub / LinkedIn links. Right: form with floating labels; submit button states: "Send message" → "Sending…" → "Sent" with an SVG check drawn via `pathLength`. Errors are inline and specific. EmailJS wiring unchanged.

**Footer.** Hairline, © year + name, "Patiala · HH:MM IST" live clock, "Back to top".

### Global effects

- **Cursor**: 8px dot + 32px ring, `mix-blend-mode: difference`, ring expands to 56px over `a, button, [data-cursor]`. Only on `(pointer: fine)` and not under reduced motion.
- **Grain**: fixed full-screen SVG turbulence at 3.5% opacity, `pointer-events: none`.
- **Smooth scroll**: Lenis (kept). ScrollSpine and the top progress bar are removed; the nav's active pill is the position indicator.
- **Reduced motion**: all whileInView reveals collapse to opacity; proximity, dot field, marquee, cursor, count-up, scroll stack transforms are disabled; content still fully readable.

## Components

New `src/components/fx/` (reusable effects, each self-contained JSX + CSS):
`Reveal`, `DotField`, `ProximityText`, `RotatingText`, `CountUp`, `Magnetic`, `Marquee`, `ScrollWords`, `SpotlightCard`, `Cursor`, `Grain`, `GradualBlur`.

Rewritten sections: `Navbar`, `Hero`, `About`, `Education`, `Experience`, `Projects`, `Skills`, `Awards`, `Contact`, `LoadingScreen`, `App`. Deleted: `ScrollSpine`. Global: `src/index.css` (tokens + base + utilities), `index.html` (fonts, meta).

Content lives in `src/data/*.js` so section components are presentational.

## Quality floor

- WCAG AA for all text; focus ring `2px solid var(--glow)` with 3px offset, never removed.
- Responsive to 360px. Scroll stack degrades to a plain stacked list under 768px. Bento becomes 1–2 columns.
- `npm run build` and `npm run lint` clean.
- Lighthouse: no layout shift from font loading (`font-display: swap` + size-adjusted fallbacks), canvas capped at devicePixelRatio 2, all listeners passive.
