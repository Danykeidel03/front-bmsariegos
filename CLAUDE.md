# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Dev server (Vite)
npm run build            # Production build (runs optimize-images first via `prebuild`)
npm run lint             # ESLint
npm run preview          # Preview the production build locally
npm run optimize-images  # Convert local PNG/JPG assets to WebP (scripts/optimize-images.js)
```

There is no test suite configured yet (Vitest is planned but not installed — see "Roadmap" below). Don't assume `npm test` exists.

### Required environment

The app will not run without a `.env` (copy from `.env.example`):

```
VITE_API_URL=...
VITE_API_KEY=...
VITE_API_TIMEOUT=5000
```

These are consumed via `import.meta.env.*` in every `src/api/*.js` file.

## Architecture

React 19 + Vite 7 SPA (no SSR). Router: `react-router-dom` v7, all routes defined in `src/App.jsx`.

### Folder layout

- `src/api/` — one file per backend resource (`apiMatch.js`, `apiTeam.js`, `apiNotice.js`, ...). Each file independently creates its own `axios` instance from the same env vars (`VITE_API_URL`, `VITE_API_KEY`, `VITE_API_TIMEOUT`) and exports an object of methods (`getAll...`, `create...`, `update...`, `delete...`). There is **no shared/centralized axios client** — this duplication across the 8+ api files is known and tracked (see Roadmap, Fase 2).
- `src/components/common/` — modal components (`MatchModal`, `TeamModal`, `NewsModal`, `SponsorModal`, `RivalModal`, `HeaderImageModal`, `BirthdayModal`, `AdminPanel`).
- `src/components/layout/` — `Header`, `Footer`, `CookieBanner`, `Login`. Loaded eagerly in `App.jsx` (not lazy).
- `src/components/ui/` — presentational/reusable pieces: the image-optimization components (see below), `Slider`, `BrandSlider`, `SocialLinks`, `SEO`, `SEOLink`.
- `src/features/<domain>/` — feature folders (`matches`, `news`, `teams`, `admin`), each containing its own subcomponents (e.g. `features/matches/{Matches,MatchesBar,MatchesSection}`). These are the route-level feature entry points lazy-loaded from `App.jsx`.
- `src/pages/` — standalone route pages (`Home`, `Contact`, `About`, `Equipaciones`, `Privacy`, `Terms`, `NotFound`), each with a colocated `.css` file. All lazy-loaded from `App.jsx`.
- `src/hooks/` — `useCloudinaryOptimization`, `useSmartImage`, `useSEO`.
- `src/utils/` — `sanitize.js` (DOMPurify wrappers), `lazyLoadCSS.js`, `lazyLoadLibraries.js`, `imageOptimization.js`, `prefetch.js`.
- `src/styles/` — `critical.css` (inlined in `index.html`, above-the-fold only), `non-critical.css` (loaded async post-render), `accessibility.css`, `modals-responsive.css` (lazy-loaded on demand, see below).

### Routing & code splitting

Every page/feature except `Header`, `Footer`, and `CookieBanner` is behind `React.lazy()` in `src/App.jsx`, wrapped in a single top-level `<Suspense>`. When adding a route, follow the existing pattern: lazy-import the component and add a `<Route>` inside `AppRoutes`. The `/adminBalonmano` route intentionally skips `Header`/`Footer` (checked via `location.pathname` in `AppContent`).

`vite.config.js` defines a manual chunking strategy (`manualChunks`) that splits `react-vendor`, `router`, heavy libs (`sweetalert2`, `react-image-crop`, `swiper`), and one chunk per `src/pages/*` folder. Any file added directly under `src/pages/<X>/` is auto-chunked as `page-<X>`; component folders containing `Modal` in the name are bundled into a shared `modals` chunk. Keep this in mind when deciding where a new component lives.

### CSS loading strategy

CSS is intentionally split into three tiers — don't just `import './Foo.css'` at the top of a new modal:

1. **Critical** (`src/styles/critical.css`) — inlined, above-the-fold only.
2. **Non-critical** (`src/styles/non-critical.css`) — loaded async via `requestIdleCallback` (see `loadCSSAsync` in `utils/lazyLoadCSS.js`, called once from `App.jsx`).
3. **Per-modal CSS** — modal components load their own CSS lazily on open via `loadCSS()` from `utils/lazyLoadCSS.js` inside a `useEffect` gated on `isOpen`, not via static import. Follow the existing modal components as the template if you add a new one.

A custom Vite plugin (`async-css` in `vite.config.js`) rewrites emitted `<link rel="stylesheet">` tags at build time to `preload` + `onload` swap, except for `index-`, `react-vendor`, and `critical` bundles which stay render-blocking.

### Image optimization

Multiple purpose-specific components exist — pick the right one, don't reinvent it:

- `CloudinaryImage` — for Cloudinary-hosted URLs (API-provided content: news, matches, sponsors). Applies `f_auto`, `q_auto`/explicit quality, `c_fill`/`c_fit`, `dpr_auto` transforms via URL.
- `OptimizedImage` — general responsive image with srcset + Cloudinary transforms.
- `LocalOptimizedImage` — for static assets in `public/`, renders a `<picture>` with WebP + fallback.
- `SponsorImage` — preconfigured wrapper for sponsor logos.

Local raster assets in `public/` should be paired with a `.webp` version generated by `scripts/optimize-images.js` (runs automatically via the `prebuild` npm hook). Quality/dimension choices across the codebase are deliberately aggressive (often 40–75% quality, exact pixel dimensions matching display size) — this is a known, previously-measured tradeoff (a prior audit cut image payload from ~5.6MB to ~450KB), not an oversight.

### External/tracked links

Use `SEOLink` (`src/components/ui/SEOLink`) instead of a raw `<a>` for sponsor/social/external links: it auto-adds `target="_blank"` + `rel="noopener noreferrer"` when `external` is set, generates an `aria-label` when one isn't passed, and falls back to `href="#"` instead of rendering a hrefless anchor (a past a11y/SEO issue was exactly this — untracked links with no accessible text).

### Prefetching

`src/utils/prefetch.js` provides `warmupCache()` (idle-time preload of common routes, called once from `App.jsx`), `usePrefetchOnInteraction()` (hover/focus-triggered `import()` for links), and an `IntersectionObserver`-based prefetcher. All of it respects `navigator.connection` (skips prefetching on slow connections or when Data Saver is on) — don't add a plain `onMouseEnter={() => import(...)}` next to it; use the existing hook so that check isn't bypassed.

### Sanitization (security-relevant)

Never write `dangerouslySetInnerHTML` with raw API content. Always go through `src/utils/sanitize.js`:

- `sanitizeHTML(html)` — restricted allow-list of tags/attrs.
- `sanitizeWithLineBreaks(text)` — same, plus converts `\n` to `<br>`.
- `stripHTML(html)` — strips all tags.

This exists because of a prior XSS incident (unsanitized `descripcion` fields from the API) — see `SECURITY_IMPROVEMENTS.md`.

The `VITE_API_KEY` is unavoidably visible in the browser Network tab (it's a build-time env var baked into the client bundle). This is a known architectural limitation, not a bug to silently "fix" — a real fix requires a backend proxy/BFF, which is out of scope for this frontend alone. Don't hardcode credentials as a workaround for it either.

### Heavy library lazy-loading

`SweetAlert2` and `react-image-crop` are excluded from `optimizeDeps` and never statically imported in components. Use the wrappers in `src/utils/lazyLoadLibraries.js` (`showAlert`, `showConfirm`, `loadReactImageCrop`) instead of importing `sweetalert2`/`react-image-crop` directly — static imports would pull them back into the initial bundle.

### Build/lint conventions already enforced

- Prettier: single quotes, semicolons, 100 char width, trailing commas (`es5`), LF line endings — enforced as ESLint errors (`prettier/prettier`), not just formatting.
- `no-console: warn` in ESLint, and Terser (`vite.config.js`) strips `console.log/info/debug` in production builds regardless — don't add cleanup passes for this.
- Unused vars/args prefixed with `_` are allowed (`varsIgnorePattern`/`argsIgnorePattern: '^_'`) — used intentionally in a few places (e.g. destructured-but-unused values), not dead code to delete on sight.
- No `import React` needed (React 17+ JSX runtime) — `react/react-in-jsx-scope` is off.

## Roadmap context

`ROADMAP.md` tracks a phased refactor (`feature/fase-N-*` branches). Fase 1 (security: XSS sanitization, env vars, console removal) is done. Pending: Fase 2 (centralize the duplicated axios clients in `src/api/`, dedupe `calculateAge`/`formatDate` helpers), Fase 3 (error boundaries, request cancellation), Fase 4 (a11y — partially underway on `refactor/matches-bar-improvements`), Fase 5 (Vitest setup), Fase 6 (TypeScript migration). If a task lands inside one of these areas, check `ROADMAP.md` first for the intended direction before improvising a different approach.

`SECURITY_IMPROVEMENTS.md` documents the original XSS incident and env-var migration that motivated `src/utils/sanitize.js` — its code snippets reference the old pre-restructure paths (e.g. `src/services/`, `src/components/TeamModal/`), but the rationale still applies to the current `src/api/` and `src/components/common/` layout.
