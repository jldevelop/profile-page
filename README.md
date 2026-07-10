# Josip Lukačević - Profile Site

Personal profile site of [Josip Lukačević](https://www.linkedin.com/in/jlukacevic/) - Engineering Manager (ex-FaZe Clan), full-stack developer, and Co-Founder & CTO of cloaq.ai.

A single-page Vue 3 app: experience timeline, case studies, a tabbed portfolio showcase with lazy-loaded media, and a contact form. No UI framework - a small hand-rolled design system on CSS custom properties.

## Stack

- [Vue 3](https://vuejs.org/) (`<script setup>`) + [Vite](https://vite.dev/)
- Scoped component styles over shared design tokens (`src/assets/main.css`)
- [FormSubmit](https://formsubmit.co/)-backed contact form (static-host friendly, no backend)

## Development

```sh
npm install
npm run dev      # local dev server with HMR
npm run build    # production build into dist/
```

## Content & assets

- **All site copy lives in [`src/content.js`](src/content.js)** - text edits never touch components.
- Portfolio media ships as two WebP tiers with identical filenames:
  `public/images/portfolio-web/` (grid tier, ≤1600 px, q85) and
  `public/images/portfolio-full/` (click-through tier, original resolution, q90).
  Raw originals are kept outside the repository.
- Images and videos are lazy-loaded; videos (`preload="none"`) autoplay muted while
  in the viewport and pause when scrolled out.
