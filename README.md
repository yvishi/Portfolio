# Yash Vishnoi — Portfolio

Personal portfolio built with React 19, Vite, Framer Motion and Lenis. Custom CSS, no UI framework.

## Design: "Obsidian"

A dark studio lit only by the screen. The accent colour is used as light (glow, spotlight, border-light that follows the pointer), never as flat fill. Type is Bricolage Grotesque (display), Geist (body) and Geist Mono (labels).

Signature moments:

- **Hero name** reacts to the pointer through the variable font — letters swell in width and weight as the cursor passes — over a canvas dot field that drifts toward the pointer.
- **Projects** stack as you scroll: each card pins and the previous one recedes.
- **Experience** timeline draws a tracing beam bound to scroll progress.
- **Skills** bento lights up under the pointer with a spotlight and border glow.
- **About** paragraph brightens word by word as it scrolls into view.

Every effect has a static fallback under `prefers-reduced-motion` and on touch devices.

Full design spec: [docs/superpowers/specs/2026-09-13-obsidian-ui-redesign-design.md](docs/superpowers/specs/2026-09-13-obsidian-ui-redesign-design.md)

## Structure

```
src/
  data/            content (profile, projects, experience, education, skills, awards)
  hooks/useMedia   reduced-motion / pointer / width media hooks
  components/
    fx/            reusable effects: DotField, ProximityText, ScrollWords, SpotlightCard,
                   Magnetic, Marquee, CountUp, RotatingText, Cursor, Grain, GradualBlur, Reveal
    *.jsx / *.css  one pair per section
```

## Scripts

```bash
npm run dev       # start Vite dev server
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # ESLint
```

## Contact form

The form posts through EmailJS (credentials in `src/components/Contact.jsx`). `api/contact.js` is an optional SendGrid serverless alternative for Vercel/Netlify.
