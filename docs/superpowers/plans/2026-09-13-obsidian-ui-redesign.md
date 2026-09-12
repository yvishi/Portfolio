# Obsidian UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's visual identity with the "Obsidian" design: dark matte ground, warm-white Bricolage Grotesque / Geist type, pointer-reactive light effects, scroll-stacked projects.

**Architecture:** Reusable effects live in `src/components/fx/` as small self-contained components (JSX + CSS). Section components become presentational and read their content from `src/data/`. Global tokens live in `src/index.css`. No new animation libraries: Framer Motion, canvas, and CSS only.

**Tech Stack:** React 19, Vite 8, framer-motion 12, lenis, lucide-react, @emailjs/browser.

**Spec:** `docs/superpowers/specs/2026-09-13-obsidian-ui-redesign-design.md`

## Global Constraints

- No Tailwind, no GSAP, no three.js. Effects use framer-motion, canvas, CSS.
- Fonts: `Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800`, `Geist:wght@300..700`, `Geist+Mono:wght@400..600`.
- Colour tokens exactly as in the spec table; `--glow` is the only interaction accent, `--live` only for status.
- Reduced motion: every effect must render a static, readable fallback under `prefers-reduced-motion: reduce`.
- Responsive to 360px. Verified by `npm run build` and `npm run lint` passing with zero warnings.
- Content (copy, links, EmailJS IDs) is preserved verbatim from the current components.

Verification for every task: `npm run lint && npm run build` must pass. Visual checks are done with `npm run dev` in a browser.

---

### Task 1: Foundation — tokens, fonts, data extraction, shell

**Files:**
- Modify: `index.html` (font links, meta)
- Rewrite: `src/index.css` (tokens, base, utilities: `.container`, `.section`, `.eyebrow`, `.section-title`, `.chip`, `.btn`, focus ring, reduced motion)
- Create: `src/data/profile.js`, `src/data/projects.js`, `src/data/experience.js`, `src/data/education.js`, `src/data/skills.js`, `src/data/awards.js`
- Create: `src/hooks/useReducedMotion.js`, `src/hooks/usePointerFine.js`
- Delete: `src/components/ScrollSpine.jsx`, `src/components/ScrollSpine.css`
- Modify: `src/App.jsx` (remove ScrollSpine and progress bar; keep Lenis, MotionConfig, loading gate, active-section observer)

**Interfaces:**
- Produces: `useReducedMotion(): boolean`, `usePointerFine(): boolean`. Data modules export named constants (`PROFILE`, `PROJECTS`, `EXPERIENCE`, `EDUCATION`, `SKILLS`, `AWARDS`).

- [ ] Step 1: Write tokens + base CSS per spec. Step 2: Update `index.html`. Step 3: Move content into `src/data`. Step 4: Update App, delete ScrollSpine. Step 5: `npm run lint && npm run build`. Step 6: Commit `feat(ui): obsidian foundation — tokens, fonts, data modules`.

### Task 2: Effects library `src/components/fx/`

**Files:** Create `Reveal.jsx`, `DotField.jsx`, `ProximityText.jsx`, `RotatingText.jsx`, `CountUp.jsx`, `Magnetic.jsx`, `Marquee.jsx` (+css), `ScrollWords.jsx`, `SpotlightCard.jsx` (+css), `Cursor.jsx` (+css), `Grain.jsx` (+css), `GradualBlur.jsx` (+css), `index.js` barrel.

**Interfaces (Produces):**
- `<Reveal as="div" delay={0} y={24} className>` — whileInView once; opacity-only under reduced motion.
- `<DotField gap={28} radius={160} color="143,169,255" />` — absolute canvas, pointer proximity brightens/pulls dots; static under reduced motion.
- `<ProximityText text radius={160} from="'wdth' 80, 'wght' 300" to="'wdth' 100, 'wght' 700" className />` — spans per letter, rAF loop updates `fontVariationSettings`.
- `<RotatingText words={[]} interval={2600} />` — AnimatePresence vertical slide.
- `<CountUp value={9.49} decimals={2} duration={1.6} suffix="" />` — animates when in view.
- `<Magnetic strength={0.35} radius={80}>{child}</Magnetic>` — spring translate toward pointer.
- `<Marquee items={[]} speed={40} />` — CSS keyframe track, duplicated content, pause on hover.
- `<ScrollWords text className />` — per-word colour via `useScroll` progress.
- `<SpotlightCard className>` — sets `--mx/--my` CSS vars; CSS draws radial glow + border light.
- `<Cursor />` — portal dot + ring, `(pointer: fine)` only.
- `<Grain />`, `<GradualBlur height={48} />`.

- [ ] Step 1: Implement each component. Step 2: `npm run lint && npm run build`. Step 3: Commit `feat(fx): add pointer and scroll effect primitives`.

### Task 3: Navbar + LoadingScreen

**Files:** Rewrite `Navbar.jsx/.css`, `LoadingScreen.jsx/.css`.
- Nav: floating pill, `layoutId="nav-pill"` active indicator, hide-on-scroll-down, overlay mobile menu, `GradualBlur` under nav.
- Loader: masked name reveal + counter, clip-path exit, ≤1.8s (App timer 1800ms).
- [ ] Commit `feat(ui): floating pill nav and masked loading screen`.

### Task 4: Hero + Marquee strip

**Files:** Rewrite `Hero.jsx/.css`; create `StackStrip.jsx/.css` (uses `Marquee`).
- Uses `DotField`, `ProximityText`, `RotatingText`, `Magnetic`, `CountUp`.
- [ ] Commit `feat(ui): obsidian hero with proximity name and dot field`.

### Task 5: About + Education + Experience

**Files:** Rewrite `About`, `Education`, `Experience` jsx/css.
- About: sticky title, `ScrollWords` lead, hairline table, chips.
- Education: two `SpotlightCard`s with `CountUp` numbers.
- Experience: tracing beam via `useScroll({ target: sectionRef, offset: ['start 70%', 'end 60%'] })` → `scaleY`.
- [ ] Commit `feat(ui): about, education, experience sections`.

### Task 6: Projects scroll stack

**Files:** Rewrite `Projects.jsx/.css`.
- Each card wrapper `position: sticky; top: 96px`; per-card `useScroll` on the *next* card's wrapper drives scale 1→0.94 and opacity 1→0.6. Under 768px or reduced motion: static list.
- [ ] Commit `feat(ui): scroll-stacked project cards`.

### Task 7: Skills bento + Awards list

**Files:** Rewrite `Skills.jsx/.css`, `Awards.jsx/.css`.
- Skills: 12-col bento, one mousemove listener on grid sets `--mx/--my` on each cell; CSS radial glow + border light (mask-composite ring).
- Awards: editorial rows with stagger reveal.
- [ ] Commit `feat(ui): skills bento and awards list`.

### Task 8: Contact + Footer + global polish

**Files:** Rewrite `Contact.jsx/.css`; create `Footer.jsx/.css`; mount `Cursor`, `Grain` in App.
- Copy-to-clipboard email, floating labels, stateful submit with `pathLength` check, IST clock.
- [ ] Commit `feat(ui): contact, footer, cursor and grain`.

### Task 9: QA pass

- [ ] Run dev server, screenshot each section at 1440 and 390 widths, fix regressions.
- [ ] Verify reduced-motion mode (DevTools emulation), keyboard focus ring, lint, build.
- [ ] Update `README.md` project description; commit `chore: QA fixes and README`.
