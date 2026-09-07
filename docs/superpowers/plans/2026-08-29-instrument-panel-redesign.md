# Instrument Panel Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's navy/teal/gold editorial visual identity with the "Instrument Panel" concept (dark chassis + paper panels, amber signal accent, IBM Plex type family, convergence-curve scroll spine) across every section, with no content/copy/structure changes beyond what the new visual system requires.

**Architecture:** Additive-then-cutover token rollout. Task 1 adds the new design tokens and fonts to `src/index.css`/`index.html` *alongside* the existing ones (nothing is deleted yet, so no section breaks mid-rollout). Task 2 rebuilds `ScrollSpine` as the signature convergence-curve element. Tasks 3-12 restyle each section component to consume the new tokens (parallelizable — each touches only its own `.jsx`/`.css` pair). Task 13 is integration: visual QA pass, then delete the deprecated old tokens from `index.css` now that nothing references them.

**Tech Stack:** React 19, Vite, custom CSS (no framework), Framer Motion v12, Lenis (`lenis/react`), lucide-react icons. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-08-29-instrument-panel-redesign-design.md`

## Global Constraints

- **Color tokens** (add to `:root` in `src/index.css`, do not remove old tokens until Task 13): `--chassis:#14161A` `--chassis-2:#1B1E24` `--panel:#F3EFE4` `--panel-2:#EAE4D4` `--ink:#1B1B1A` `--ink-soft:#5B584E` `--paper-on-dark:#F3EFE4` `--signal:#FF9E2C` `--signal-dim:#B96F14` `--wire:#4C5A66` `--rule:#DAD3C0` `--rule-dark:#2A2D33`
- **Type stack**: display = `'Instrument Serif', Georgia, serif` (headline/numerals only, sparingly), body = `'IBM Plex Sans', -apple-system, system-ui, sans-serif`, mono = `'IBM Plex Mono', 'Fira Mono', monospace`
- **Radius scale** (replace values, keep var names): `--radius-sm:2px` `--radius:4px` `--radius-md:6px` `--radius-lg:8px` `--radius-xl:12px`
- **Shadows**: flatten — prefer hairline borders (`--rule`/`--rule-dark`) over soft box-shadows; where a shadow remains, it's harder-edged (smaller blur, higher opacity) or an amber glow on hover/active only
- **Motion mechanics are unchanged**: keep fadeUp+blur variants, `[0.22, 1, 0.36, 1]` easing, Lenis config, scroll-progress bar, IntersectionObserver active-section logic, sessionStorage-gated LoadingScreen. Only their visual output (colors/fonts/shapes) changes.
- **No new npm dependencies.** No copy/content changes. No section reordering. No changes to EmailJS contact logic (`Contact.jsx` form submission).
- **Accessibility**: text-on-panel and text-on-chassis must hold WCAG AA; use `--signal` for small text only where contrast passes — otherwise reserve it for large text/icons/borders/backgrounds. Keep visible focus outlines (restyle to `--signal`, don't remove). Respect `prefers-reduced-motion` (verify existing handling still applies after restyle).

---

### Task 1: Foundation — tokens and fonts

**Files:**
- Modify: `index.html` (font `<link>` tags, lines 18-21)
- Modify: `src/index.css` (`:root` token block, lines 11-65; typography utilities lines 97-106; button/card/tag components lines 147-247)

**Interfaces:**
- Produces: the full token list in Global Constraints above, available as CSS custom properties to every component task. Also produces `.font-display`/`.font-mono`/`.font-body` utility classes pointing at the new families, and updated `.tag-*`, `.btn-*`, `.card` base rules other tasks' components rely on via existing class names (no class renames — only their internals change).

- [ ] **Step 1: Replace font links in `index.html`**

Replace lines 18-21 with:
```html
<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Add new tokens to `:root` in `src/index.css`**

Insert immediately after the existing `--text: #1A1A2A;` line (do not delete the old navy/teal/gold block yet — Task 13 removes it):
```css
/* Instrument Panel tokens (new system) */
--chassis:      #14161A;
--chassis-2:    #1B1E24;
--panel:        #F3EFE4;
--panel-2:      #EAE4D4;
--ink:          #1B1B1A;
--ink-soft:     #5B584E;
--paper-on-dark:#F3EFE4;
--signal:       #FF9E2C;
--signal-dim:   #B96F14;
--wire:         #4C5A66;
--rule:         #DAD3C0;
--rule-dark:    #2A2D33;
```

- [ ] **Step 3: Update typography variables**

Replace the `--font-display`, `--font-body`, `--font-mono` lines with:
```css
--font-display: 'Instrument Serif', Georgia, serif;
--font-body:    'IBM Plex Sans', -apple-system, system-ui, sans-serif;
--font-mono:    'IBM Plex Mono', 'Fira Mono', monospace;
```

- [ ] **Step 4: Update the radius scale**

Replace the Border Radii block with:
```css
--radius-sm: 2px;
--radius:    4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
```

- [ ] **Step 5: Update body background/text and scrollbar to new tokens**

In the `body` rule (around line 73-81), change `background: var(--off-white);` to `background: var(--panel);` and `color: var(--text);` to `color: var(--ink);`. In `::selection`, change `background: var(--teal);` to `background: var(--signal); color: var(--chassis);`. In the scrollbar rules, change `background: var(--off-white)` (track) to `var(--panel-2)`, and `background: var(--border)` / hover `var(--teal)` (thumb) to `var(--rule)` / hover `var(--signal)`.

- [ ] **Step 6: Update shared components (tags, buttons, card) to new tokens**

- `.tag-teal` → background `rgba(255,158,44,0.12)`, color `var(--signal-dim)`, border `1px solid rgba(255,158,44,0.25)`
- `.tag-navy` → background `rgba(20,22,26,0.06)`, color `var(--ink)`, border `1px solid rgba(20,22,26,0.12)`
- `.tag-gold` → background `var(--panel-2)`, color `var(--wire)`, border `1px solid var(--rule)`
- `.btn-primary` → background `var(--signal)`, color `var(--chassis)`; hover background `var(--signal-dim)`, box-shadow `0 4px 16px rgba(255,158,44,0.35)`
- `.btn-outline` → color `var(--ink)`, border `1.5px solid var(--rule)`; hover border-color `var(--ink)`, background `rgba(20,22,26,0.04)`
- `.btn-ghost-white` (used on dark hero) → border `1.5px solid rgba(243,239,228,0.25)`, color `var(--paper-on-dark)`; hover background `rgba(243,239,228,0.12)`, border-color `rgba(243,239,228,0.45)`
- `.card` → background `white` → `var(--panel)`, border `1px solid var(--border)` → `1px solid var(--rule)`; drop the `:hover` `transform: translateY(-3px)` lift's soft shadow in favor of `box-shadow: 0 2px 0 var(--signal);` (a flat amber underline-style hover, no blur)
- `.section-label` → color `var(--teal)` → `var(--signal-dim)`
- `.section-title` → color `var(--navy)` → `var(--ink)`
- `.section-desc` → color `var(--muted)` → `var(--ink-soft)`
- `.scroll-progress` → background `var(--teal)` → `var(--signal)`; box-shadow → `0 0 8px rgba(255,158,44,0.5)`

- [ ] **Step 7: Verify — run the dev server and check no visual regression from missing tokens**

Run: `npm run dev` (from `F:\College\SEM4\Portfolio`), open the site, confirm it loads without console errors about missing fonts/vars, and that buttons/tags/cards now render in the amber/paper palette instead of teal/navy (other sections will look mismatched until their own tasks land — that's expected at this point).

- [ ] **Step 8: Commit**

```bash
git add index.html src/index.css
git commit -m "feat: add Instrument Panel design tokens and IBM Plex/Instrument Serif fonts"
```

---

### Task 2: ScrollSpine — convergence curve rebuild

**Files:**
- Modify: `src/components/ScrollSpine.jsx`
- Modify: `src/components/ScrollSpine.css`

**Interfaces:**
- Consumes: `--chassis`, `--signal`, `--rule-dark` tokens from Task 1. Same props as today: `activeSection` (string).
- Produces: no exported interface changes — `ScrollSpine` keeps its default export and `activeSection` prop so `App.jsx` (which renders `<ScrollSpine activeSection={activeSection} />` — check current `App.jsx`; if it isn't already rendered there, this task only changes the component, not its usage) is unaffected.

- [ ] **Step 1: Replace the spine markup with an SVG path in `ScrollSpine.jsx`**

```jsx
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './ScrollSpine.css'

const SECTIONS = ['hero', 'about', 'education', 'experience', 'projects', 'skills', 'awards', 'contact']

// A path that's jagged/high-amplitude near the top and flattens toward the
// bottom — literal loss-curve convergence. Coordinates are in a 100 x 1000
// viewBox so it scales to any page height via preserveAspectRatio="none".
const CURVE_PATH = 'M50,0 L38,40 L62,75 L30,115 L58,150 L42,185 L55,215 L46,245 L52,270 L48,295 L51,320 L49,345 L50.5,375 L49.5,410 L50,450 L50,1000'

export default function ScrollSpine({ activeSection }) {
  const { scrollYProgress } = useScroll()
  const [nodes, setNodes] = useState([])
  const pathOffset = useTransform(scrollYProgress, [0, 1], ['100%', '0%'])

  useEffect(() => {
    const calculate = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      if (docH <= 0) return
      setNodes(
        SECTIONS.map(id => {
          const el = document.getElementById(id)
          return el ? Math.min(el.offsetTop / docH, 1) : 0
        })
      )
    }

    const timeout = setTimeout(calculate, 300)
    window.addEventListener('resize', calculate)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', calculate)
    }
  }, [])

  return (
    <div className="scroll-spine" aria-hidden="true">
      <svg className="spine-svg" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path className="spine-track" d={CURVE_PATH} />
        <motion.path
          className="spine-fill"
          d={CURVE_PATH}
          pathLength="1"
          style={{ pathOffset }}
        />
      </svg>

      {nodes.map((pos, i) => (
        <div
          key={SECTIONS[i]}
          className={`spine-node${activeSection === SECTIONS[i] ? ' spine-node--active' : ''}`}
          style={{ top: `${pos * 100}%` }}
        >
          <div className="spine-node-dot" />
          {activeSection === SECTIONS[i] && (
            <motion.div
              className="spine-node-ripple"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Rewrite `ScrollSpine.css` for the new visual**

Read the current `ScrollSpine.css` first to find the existing `.scroll-spine` positioning rules (fixed left offset, width, z-index, `display:none` under 1280px) and carry those layout rules forward unchanged. Replace the track/fill/node coloring with:
```css
.spine-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.spine-track {
  fill: none;
  stroke: var(--rule-dark);
  stroke-width: 1.5;
  vector-effect: non-scaling-stroke;
}

.spine-fill {
  fill: none;
  stroke: var(--signal);
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
  filter: drop-shadow(0 0 4px rgba(255, 158, 44, 0.5));
}

.spine-node-dot {
  background: var(--chassis-2);
  border: 1.5px solid var(--rule-dark);
}

.spine-node--active .spine-node-dot {
  background: var(--signal);
  border-color: var(--signal);
}

.spine-node-ripple {
  background: var(--signal);
}
```
Keep any existing `.spine-node` positioning (`position:absolute`, `top` set inline, transform centering) rules as-is — only recolor.

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`, resize the window above 1280px width, scroll the full page, confirm the amber curve draws downward and the track/nodes render in the new palette with no layout shift versus the old spine's footprint.

- [ ] **Step 4: Commit**

```bash
git add src/components/ScrollSpine.jsx src/components/ScrollSpine.css
git commit -m "feat: rebuild ScrollSpine as a convergence-curve signature element"
```

---

### Task 3: Navbar

**Files:**
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Navbar.css`

**Interfaces:**
- Consumes: tokens from Task 1 (`--chassis`, `--paper-on-dark`, `--signal`, `--rule-dark`, `--font-mono`).
- No prop/export changes.

- [ ] **Step 1: Read `Navbar.jsx` and `Navbar.css` in full before editing**, to find every hardcoded reference to old tokens (`--navy`, `--teal`, `--gold`, `--off-white`, `--border`, `--muted`, `--font-display`) and every literal hex/rgba not using a var.

- [ ] **Step 2: Restyle `Navbar.css`**: background → `var(--chassis)` (with `rgba(20,22,26,0.85)` + existing `backdrop-filter: blur(...)` if present, to keep the frosted-on-scroll behavior); text/logo color → `var(--paper-on-dark)`; nav link font → `var(--font-mono)` at existing size/tracking; active/hover link indicator and underline color → `var(--signal)`; any border/divider → `var(--rule-dark)`.

- [ ] **Step 3: Verify** — `npm run dev`, confirm navbar renders on the dark chassis background with amber active-link state, mobile menu (if present) matches.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx src/components/Navbar.css
git commit -m "style: restyle Navbar to Instrument Panel tokens"
```

---

### Task 4: Hero (with telemetry strip)

**Files:**
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/Hero.css`

**Interfaces:**
- Consumes: Task 1 tokens. Hero stays on `--chassis` background (it's the console boot screen), not `--panel`.
- No changes to `scrollToProjects`/`scrollToContact` behavior or the stats data array.

- [ ] **Step 1: Add a telemetry strip above the name in `Hero.jsx`**

Insert this block between the closing `</motion.div>` of `hero-tag` and the `motion.h1` for `hero-name` (reuse the existing `fadeUp` variant, custom delay `0.02` so it appears first):
```jsx
<motion.div
  className="hero-telemetry"
  variants={fadeUp}
  initial="hidden"
  animate="visible"
  custom={0.02}
>
  <span className="hero-telemetry-dot" aria-hidden="true" />
  role: ai/rl software engineer · focus: applied ml systems · status: available
</motion.div>
```

- [ ] **Step 2: Restyle `Hero.css`**: `.hero` background → `var(--chassis)` (replace the existing gradient/orb colors' hex values with chassis-toned equivalents, e.g. orbs use `rgba(255,158,44,0.08)` instead of the old teal/gold glow); `.hero-name` → `font-family: var(--font-display)`, color `var(--paper-on-dark)`; `.name-accent` → color `var(--signal)`; `.hero-tag`/`.hero-title`/`.hero-tagline` → `var(--font-mono)` or `var(--font-body)` per current usage, color `var(--paper-on-dark)`/`var(--wire)` as appropriate for hierarchy; `.hero-stat-value` → `var(--signal)`; `.hero-stat-label` → `var(--font-mono)`, `var(--wire)`.

- [ ] **Step 3: Add `.hero-telemetry` styling**

```css
.hero-telemetry {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: lowercase;
  color: var(--wire);
  margin-bottom: var(--space-4);
}

.hero-telemetry-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--signal);
  box-shadow: 0 0 6px rgba(255, 158, 44, 0.7);
}
```

- [ ] **Step 4: Verify** — `npm run dev`, confirm the telemetry strip renders above the name, animates in first, and the hero reads as a dark console screen with amber accents.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.css
git commit -m "style: restyle Hero to Instrument Panel, add telemetry strip"
```

---

### Task 5: About

**Files:**
- Modify: `src/components/About.jsx`
- Modify: `src/components/About.css`

**Interfaces:** Consumes Task 1 tokens. `.about` section background → `var(--panel)`. No structural/content changes.

- [ ] **Step 1: Read `About.jsx`/`About.css` fully**, note every old-token/hardcoded-color usage.
- [ ] **Step 2: Restyle**: section background `var(--panel)`; headings `var(--ink)` with `var(--font-display)` where the section title utility applies (inherits from `.section-title` in Task 1); body copy `var(--ink-soft)`; any accent underline/highlight → `var(--signal)`; any card/box inside → follow the `.card` restyle from Task 1 (sharper radius, hairline border).
- [ ] **Step 3: Verify** — `npm run dev`, section renders on paper background, text passes AA contrast against `--panel` (#F3EFE4).
- [ ] **Step 4: Commit**

```bash
git add src/components/About.jsx src/components/About.css
git commit -m "style: restyle About to Instrument Panel"
```

---

### Task 6: Education

**Files:**
- Modify: `src/components/Education.jsx`
- Modify: `src/components/Education.css`

**Interfaces:** Consumes Task 1 tokens. Timeline/entry markers (if any) restyle to `--signal` on `--rule`.

- [ ] **Step 1: Read both files fully.**
- [ ] **Step 2: Restyle**: background `var(--panel)`; timeline line/rule → `var(--rule)`; timeline dot/marker → `var(--signal)`; institution/degree text → `var(--ink)`/`var(--ink-soft)`; any date/label in mono → `var(--font-mono)`, `var(--wire)`.
- [ ] **Step 3: Verify** — `npm run dev`, timeline renders with amber markers on paper.
- [ ] **Step 4: Commit**

```bash
git add src/components/Education.jsx src/components/Education.css
git commit -m "style: restyle Education to Instrument Panel"
```

---

### Task 7: Experience

**Files:**
- Modify: `src/components/Experience.jsx`
- Modify: `src/components/Experience.css`

**Interfaces:** Consumes Task 1 tokens. Per project memory, the current Dakhila AI entry has "accent styling marks it as current" — preserve that current-entry emphasis, just re-expressed in `--signal` instead of its old accent color.

- [ ] **Step 1: Read both files fully**, specifically locate the "current role" accent styling.
- [ ] **Step 2: Restyle**: background `var(--panel)`; cards → `.card`-style restyle (Task 1 base, hairline border on `var(--rule)`); current-role accent border/badge → `var(--signal)`; company/role text → `var(--ink)`; dates/tags → `var(--font-mono)`, tag pill styling per Task 1's `.tag-*` updates.
- [ ] **Step 3: Verify** — `npm run dev`, confirm the Dakhila AI entry still visually stands out (now in amber) from past roles.
- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.jsx src/components/Experience.css
git commit -m "style: restyle Experience to Instrument Panel"
```

---

### Task 8: Projects

**Files:**
- Modify: `src/components/Projects.jsx`
- Modify: `src/components/Projects.css`

**Interfaces:** Consumes Task 1 tokens. Per project memory, layout is 3-tier (full-width featured → mid-card with metrics → 2-col grid) — preserve that tier structure, restyle only.

- [ ] **Step 1: Read both files fully**, identify the 3 tiers and any metric/stat displays (e.g. AirX RL metrics).
- [ ] **Step 2: Restyle**: background `var(--panel)`; all project cards → Task 1 `.card` treatment (flatter, hairline border, amber underline hover); metric numbers → `var(--signal)`, `var(--font-mono)`; stack/tech tag pills → Task 1 `.tag-*`; featured project's emphasis treatment (if it has a distinct background/border) → swap its accent color to `var(--signal)`.
- [ ] **Step 3: Verify** — `npm run dev`, all three project tiers render with consistent card styling and legible metrics.
- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.jsx src/components/Projects.css
git commit -m "style: restyle Projects to Instrument Panel"
```

---

### Task 9: Skills

**Files:**
- Modify: `src/components/Skills.jsx`
- Modify: `src/components/Skills.css`

**Interfaces:** Consumes Task 1 tokens. Per project memory, 7 categories (ML & Deep Learning first) — preserve category grouping and order.

- [ ] **Step 1: Read both files fully.**
- [ ] **Step 2: Restyle**: background `var(--panel)`; category headers → `var(--font-mono)` eyebrow style (matches `.section-label` treatment) in `var(--signal-dim)`; skill chips/pills → Task 1 `.tag-*` styling; any category icon accent → `var(--signal)` or `var(--wire)` depending on current hierarchy (primary category = signal, others = wire, to avoid every chip screaming amber).
- [ ] **Step 3: Verify** — `npm run dev`, all 7 categories render, ML & Deep Learning category doesn't get accidentally reordered or dropped.
- [ ] **Step 4: Commit**

```bash
git add src/components/Skills.jsx src/components/Skills.css
git commit -m "style: restyle Skills to Instrument Panel"
```

---

### Task 10: Awards

**Files:**
- Modify: `src/components/Awards.jsx`
- Modify: `src/components/Awards.css`

**Interfaces:** Consumes Task 1 tokens.

- [ ] **Step 1: Read both files fully.**
- [ ] **Step 2: Restyle**: background `var(--panel)`; award cards → Task 1 `.card` treatment; any medal/trophy icon color → `var(--signal)`; date/issuer text → `var(--font-mono)`, `var(--ink-soft)`.
- [ ] **Step 3: Verify** — `npm run dev`.
- [ ] **Step 4: Commit**

```bash
git add src/components/Awards.jsx src/components/Awards.css
git commit -m "style: restyle Awards to Instrument Panel"
```

---

### Task 11: Contact

**Files:**
- Modify: `src/components/Contact.jsx`
- Modify: `src/components/Contact.css`

**Interfaces:** Consumes Task 1 tokens. Per project memory, form submission uses EmailJS — do not touch the submit handler, field names, or EmailJS config, only visual styling of inputs/labels/button.

- [ ] **Step 1: Read both files fully**, locate the EmailJS submit handler and confirm it's untouched by the restyle.
- [ ] **Step 2: Restyle**: background `var(--panel)`; form inputs → background `var(--panel-2)` (or `white`→`var(--panel-2)`), border `1px solid var(--rule)`, focus state border/outline `var(--signal)`; labels → `var(--font-mono)`, `var(--ink-soft)`; submit button → `.btn-primary` (already restyled in Task 1); success/error message states (if present) → success in `var(--signal)`/checkmark, error in a legible red that still fits the palette (e.g. `#C4432B`, a warm rust — not an arbitrary bright red) since no error color is in the token table; social/contact icons → `var(--wire)` default, `var(--signal)` on hover.
- [ ] **Step 3: Verify** — `npm run dev`, confirm the form still submits successfully (manual test: fill and submit, confirm existing success UI still triggers) and all states are legible on paper.
- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.jsx src/components/Contact.css
git commit -m "style: restyle Contact to Instrument Panel"
```

---

### Task 12: LoadingScreen

**Files:**
- Modify: `src/components/LoadingScreen.jsx`
- Modify: `src/components/LoadingScreen.css`

**Interfaces:** Consumes Task 1 tokens. Keep the sessionStorage-gated, 2.3s timed slide-up behavior in `App.jsx`'s `useLoadingState` untouched — this task only restyles the screen's own visuals.

- [ ] **Step 1: Read both files fully**, find the name-reveal and line-draw animation.
- [ ] **Step 2: Restyle**: background `var(--chassis)`; name text → `var(--font-display)`, `var(--paper-on-dark)`; the reveal line/underline → `var(--signal)` instead of the old teal line; add one line of `var(--font-mono)` status text under/near the name (e.g. `initializing_portfolio…`) styled like a boot log, `font-size: 11px`, `color: var(--wire)`, to match the console metaphor — reuse the existing reveal animation timing, just add this as a small fade-in element, don't introduce a new animation sequence.
- [ ] **Step 3: Verify** — `npm run dev` with `sessionStorage.clear()` in devtools first (so the loading screen actually plays), confirm it shows the new dark/amber treatment and still slides up into the Hero correctly.
- [ ] **Step 4: Commit**

```bash
git add src/components/LoadingScreen.jsx src/components/LoadingScreen.css
git commit -m "style: restyle LoadingScreen to Instrument Panel"
```

---

### Task 13: Integration — QA pass and token cutover

**Files:**
- Modify: `src/index.css` (remove deprecated tokens)
- Potentially modify: any component file where the QA pass finds a cross-section seam/contrast issue

**Interfaces:** None new — this task only removes now-unused tokens and fixes integration bugs found by inspection.

- [ ] **Step 1: Run the dev server and scroll the full page top to bottom**

Run: `npm run dev`. Visually walk through every section in order (Hero → About → Education → Experience → Projects → Skills → Awards → Contact). For each section-to-section transition, confirm the chassis/panel seam reads consistently (no leftover old-token color bleeding through, no jarring inconsistent radius/shadow between adjacent sections).

- [ ] **Step 2: Grep for any remaining old-token references**

Run: `grep -rn "var(--navy\|var(--steel\|var(--teal\|var(--gold\|var(--off-white\|var(--muted\|var(--border)\|var(--text)" src/` (adjust for your shell — on Windows use the Grep tool). Any hit means a component task missed a spot — fix it directly in that component's CSS file.

- [ ] **Step 3: Remove the deprecated token block from `src/index.css`**

Once Step 2 returns no hits, delete the original navy/steel/teal/gold/off-white/muted/border/text token lines from `:root` (the ones Task 1 was told not to touch yet).

- [ ] **Step 4: Check accessibility floor**

Using browser devtools' contrast checker (or axe DevTools if installed), spot-check: body text on `--panel`, `--paper-on-dark` on `--chassis`, and any small `--signal` text. Fix any failure by darkening/lightening the specific usage (don't change the shared token if only one usage fails — use a local override).

- [ ] **Step 5: Check `prefers-reduced-motion` and keyboard focus**

In devtools, emulate `prefers-reduced-motion: reduce` and confirm animations are still suppressed/reduced as before. Tab through the page and confirm every interactive element (nav links, buttons, form fields, social icons) shows a visible `--signal`-colored focus outline.

- [ ] **Step 6: Final build check**

Run: `npm run build`. Confirm it completes with no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove deprecated design tokens, integration QA fixes"
```
