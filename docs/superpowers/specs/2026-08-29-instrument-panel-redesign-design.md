# Instrument Panel Redesign — Design Spec

Date: 2026-08-29

## Brief

Full visual overhaul of Yash Vishnoi's portfolio (React 19 + Vite, custom CSS, Framer Motion, Lenis smooth scroll). Same sections, same copy/content, same tech stack. New aesthetic entirely — the current navy/teal/gold editorial identity is replaced, not refined.

## Concept: "Instrument Panel"

The site reads like a lab console for an ML/RL engineer: a dark chassis frame holds paper-white instrument-panel readouts for content. The scroll spine becomes a literal convergence curve (loss-curve metaphor) instead of a decorative progress dot-track — the one signature, bold element. Everything else is quiet, precise, editorial.

Grounding: Yash is an ML/RL engineer (Dakhila AI intern, AirX/RankX RL projects). The metaphor — optimization converging as you move through the page toward Contact — is literal to his actual work, not decorative.

## Design tokens

### Color
| Token | Hex | Use |
|---|---|---|
| `--chassis` | `#14161A` | Dark frame: nav, section seams, hero background, footer |
| `--chassis-2` | `#1B1E24` | Elevated dark surface (cards on chassis, hover states) |
| `--panel` | `#F3EFE4` | Warm paper — section content backgrounds |
| `--panel-2` | `#EAE4D4` | Slightly recessed paper (inset cards, table rows) |
| `--ink` | `#1B1B1A` | Body text on paper |
| `--ink-soft` | `#5B584E` | Muted text on paper |
| `--paper-on-dark` | `#F3EFE4` | Text on chassis |
| `--signal` | `#FF9E2C` | The one accent — amber. Active states, the trace, CTAs, links |
| `--signal-dim` | `#B96F14` | Signal at lower emphasis (hover-from state, borders) |
| `--wire` | `#4C5A66` | Cool slate — secondary structural marks, rules on dark |
| `--rule` | `#DAD3C0` | Hairline dividers on paper |
| `--rule-dark` | `#2A2D33` | Hairline dividers on chassis |

Replaces navy/steel/teal/gold tokens 1:1 in `src/index.css`. No component should reference old token names after this change.

### Type
- Display: **Instrument Serif** (regular + italic) — hero name, section numerals/eyebrows at large scale only. Used sparingly — never body copy.
- Body: **IBM Plex Sans** (300/400/500/600) — all paragraph and UI text.
- Mono/data: **IBM Plex Mono** (400/500) — nav, labels, stats, tags, the telemetry strip, trace annotations. Replaces JetBrains Mono.

Load via Google Fonts in `index.html`, replacing the current DM Serif/DM Sans/JetBrains link tag:
```
Instrument+Serif:ital@0;1 | IBM+Plex+Sans:wght@300;400;500;600 | IBM+Plex+Mono:wght@400;500
```

### Layout
- Chassis (dark) is the persistent background/frame. Each section is a "docked panel": paper background, sits inside the chassis with a visible seam — e.g. a `--rule-dark` border-top on the chassis side and a subtle inset shadow on the panel edge, like a bezel.
- Hero stays on chassis (dark), not paper — it's the console's boot screen. It gets a small mono "telemetry strip" (role · focus · location, real info not decorative) above the name.
- Cards/tags/buttons keep their current structural roles (card grids in Projects/Skills/Awards, tag pills for stack chips, btn primary/outline/ghost) but restyle to the new tokens: sharper corners (radius scale drops, e.g. 2-6px not 8-24px — instrument panels aren't rounded-soft), hairline borders over soft shadows, mono labels for eyebrows/section-labels.
- Radius scale shrinks: `--radius-sm: 2px`, `--radius: 4px`, `--radius-md: 6px`, `--radius-lg: 8px` (down from 4/8/12/16/24). Shadows get flatter/harder or removed in favor of hairline borders + occasional amber glow on active/hover.

### Signature element: convergence curve (ScrollSpine rebuild)
Replace `ScrollSpine.jsx`'s straight fill-track + pulsing dots with an SVG path drawn down the left edge:
- The path is jagged/high-amplitude near the top (Hero/About) and progressively smooths and flattens toward a near-flat line by Contact — a literal loss curve.
- Stroke draws in via `pathLength`/`strokeDashoffset` tied to `scrollYProgress` (Framer Motion `useTransform`), same mechanism class as today, new visual.
- Section anchors become small tick marks/nodes on the curve (replacing `spine-node-dot`), active section gets the amber pulse (reuse the existing ripple animation concept, restyled to `--signal`).
- Hidden below 1280px, same as current behavior.

## Motion
Keep the existing motion system's *mechanics* (fadeUp + blur, expo-out easing `[0.22, 1, 0.36, 1]`, Lenis smooth scroll, scroll-progress bar, section IntersectionObserver, sessionStorage-gated LoadingScreen) — only restyle their visual output to the new palette/type. Do not add new animation libraries. The convergence curve is the one new orchestrated moment; don't scatter additional decorative animation beyond current density.

LoadingScreen: restyle to chassis dark background, amber accent line, Instrument Serif name reveal, IBM Plex Mono status text (e.g. a boot-sequence style line) in place of the current navy intro.

## Components in scope

All 8 sections plus shared chrome, each restyled to the tokens above, structure/copy unchanged unless a layout genuinely doesn't fit the new grid (call it out, don't silently rewrite copy):

`Navbar`, `Hero`, `About`, `Education`, `Experience`, `Projects`, `Skills`, `Awards`, `Contact`, `LoadingScreen`, `ScrollSpine` (rebuild, see above), plus `src/index.css` (global tokens/utilities) and `index.html` (font links).

## Accessibility / quality floor
- Maintain WCAG AA contrast for ink-on-panel and paper-on-chassis text (verify amber-on-dark and amber-on-paper for interactive text meet AA; use amber only for large text/icons/borders if small-text contrast fails).
- Respect `prefers-reduced-motion` (already partially handled — verify still honored after restyle).
- Visible keyboard focus states restyled to `--signal` outline, not removed.
- Responsive down to mobile — panel/chassis seam and convergence curve both need mobile-safe fallbacks (curve already hides <1280px).

## Execution plan (subagent-driven)

1. **Foundation pass (sequential, must land first):** rewrite `src/index.css` tokens/utilities, `index.html` font links, and `ScrollSpine` (the shared visual language + signature element). One subagent, since everything else depends on these tokens existing.
2. **Section passes (parallel subagents, one per component/CSS pair):** Navbar, Hero, About, Education, Experience, Projects, Skills, Awards, Contact, LoadingScreen — each restyled to consume the new tokens from step 1. Each subagent only touches its own `.jsx`/`.css` pair.
3. **Integration pass (sequential, after all parallel work lands):** visual QA across the full scroll — check panel seams read consistently section-to-section, run the dev server, screenshot key sections, fix cross-component seams/contrast issues.

Out of scope: content/copy rewrites, restructuring section order, new libraries/dependencies, backend/EmailJS contact logic.
