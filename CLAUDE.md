# tsutsu-site

Tsutsumi Akihiro's personal portfolio site.
Next.js 16 + React 19 + TypeScript + Tailwind CSS v3 + Framer Motion + microCMS
Deployed on Vercel.

## Stack

- **Runtime:** Node 22 (pinned via `.nvmrc`)
- **Package manager:** pnpm 10.24.0 (frozen lockfile in CI)
- **Framework:** Next.js 16 App Router with Cache Components (`"use cache"`)
- **UI:** React 19, Tailwind CSS v3 (JS config), Framer Motion 12
- **Smooth scroll / motion:** Lenis + custom cursor + reduced-motion-aware hooks
- **CMS:** microCMS (blog + announcements) with draftKey-based preview
- **Email:** Nodemailer (contact form)
- **HTML sanitization:** sanitize-html (+ custom microCMS cleanup pipeline)
- **Syntax highlighting:** Shiki
- **Testing:** Vitest + React Testing Library + jsdom
- **CI:** GitHub Actions (typecheck / lint / test / build) + `@claude` assistant action

## Project Structure

```
app/
  (home)/                   # Route group: editorial home + related pages
    page.tsx                # Home (hero, works, services, about, journal, contact)
    layout.tsx              # Home-specific layout
    home.css                # Home-only styles
    announcements/          # お知らせ list + detail + preview
    blog/                   # Blog list + detail + preview
    works/                  # Works index
    design/                 # Design preview / experimentation routes (not prod UX)
    preview/                # microCMS preview route handlers
  (site)/                   # Route group: other site sections
  api/
    contact/                # Contact form endpoint (Nodemailer)
    preview/                # microCMS draftKey → preview redirect
    revalidate/             # Webhook for microCMS cache invalidation
  globals.css
  layout.tsx                # Root layout (fonts, metadata, motion provider)
  robots.ts
  sitemap.ts
components/                 # Shared + feature components
  home/                     # Home sections (Hero, Works, Services, Journal, ...)
  motion/                   # MotionProvider, CustomCursor, GrainOverlay, Parallax, ...
  MensEstheService/         # Prior feature; coverage-excluded (tracked separately)
  ContentDetail.tsx         # Generic article detail (uses Shiki + sanitize-html)
  BlogDetail.tsx            # Blog-specific wrapper (+ JSON-LD)
  AnnouncementDetail.tsx
  ...
lib/
  microcms/                 # microCMS SDK wrappers (client + server)
  home/                     # Home adapters / tokens / works-data
  motion/                   # use-is-desktop, use-reduced-motion hooks
  types/                    # Shared type definitions
  utils/                    # Pure utilities (blog, text, reading-time, html-cleanup)
  constants/
tests/
  unit/                     # Pure function / hook unit tests
  ui/                       # Component render tests (jsdom)
  integration/              # Cross-module tests
  setup.ts                  # Vitest setup
.github/workflows/
  ci.yml                    # CI (typecheck / lint / test / build) — PR-triggered
  claude.yml                # Claude Code Action — @claude mention in PR/Issues
public/
```

Path alias: `@/*` maps to the project root (e.g. `@/lib/utils/blog`).

## Development Process — TDD

Red → Green → Refactor is mandatory.

1. **Red:** Write a failing test first that defines expected behavior.
2. **Green:** Write the minimum implementation to make the test pass.
3. **Refactor:** Clean up while keeping tests green.

Rules:

- New features and bug fixes must start with a test. Never write implementation first.
- Components: write rendering and interaction tests before implementation.
- Hooks: write return value and side-effect tests before implementation.
- Utilities: write input/output tests before implementation.
- PR review verifies test-first discipline via commit history.

## Coding Standards — TypeScript

- `strict: true` is mandatory.
- `any` is forbidden. Use `unknown` + narrowing.
- `React.FC` is forbidden. Use plain function declarations with `ComponentNameProps` interface.
- Always use `import type` for type-only imports.
- No `@ts-ignore`. Use `@ts-expect-error` with explanation as a last resort (e.g. intentional runtime guard tests).
- Boolean props use `is` / `has` / `should` / `can` prefix.
- Event handler props use `on*` (prop) / `handle*` (body) convention.
- Prefer `interface` for object shapes, `type` for unions / mapped / utility types.
- Exported functions have explicit parameter + return types.

## Coding Standards — File Naming

- Components: `PascalCase.tsx` (one component per file).
- Hooks: `use-kebab-case.ts` or `useCamelCase.ts` (match the surrounding folder — `lib/motion/use-is-desktop.ts` uses kebab-case; either is acceptable within a folder, be consistent).
- Utilities: `camelCase.ts` or `kebab-case.ts` (again, match folder convention).
- Tests for UI: `ComponentName.test.tsx` in `tests/ui/...`.
- Tests for units: `xxx.spec.ts` in `tests/unit/...`.
- Types (standalone): `types.ts` or `xxx.ts` within feature folder.

## Coding Standards — Import Order

1. React / Next.js
2. Third-party libraries
3. `@/` internal aliases
4. Relative parent imports
5. Relative sibling imports
6. `import type` (grouped at the end of their tier, not separated)
7. Styles / assets last

Blank line between tiers. No circular imports.

## Next.js App Router

- Default to Server Components. Add `"use client"` only when the file needs interactivity, hooks, or browser APIs.
- Push client boundaries to the leaves (smallest possible scope).
- Always use `next/image`, `next/font`, `next/script` — never raw HTML equivalents. Exception: design-preview routes under `app/(home)/design/**` may use `<img>` with an explicit `eslint-disable-next-line @next/next/no-img-element` comment explaining the reason.
- Place `loading.tsx` in every data-fetching segment; `error.tsx` at meaningful boundaries.
- Metadata via the metadata API in `layout.tsx` / `page.tsx`. Use `generateMetadata` for dynamic pages (blog / announcements detail).
- Route groups `(home)` / `(site)` organize without affecting URLs.
- All props crossing server↔client boundaries must be serializable.

### Next.js 16 Cache Components

- Annotate cacheable data-fetching helpers with the `"use cache"` directive at the function body top.
- Use `cacheTag()` for targeted invalidation and `cacheLife()` for TTL.
- Revalidation is triggered by the microCMS webhook hitting `/api/revalidate`.
- Uncached data (user input, draftKey previews) must stay outside the cache boundary — prefer `getDetailNoStore` for `/api/preview` flows.

## microCMS Integration

- Read code splits: `lib/microcms/client.ts` (public read-only client) and `lib/microcms/server-client.ts` (server-only, for draftKey-authenticated requests).
- `getListStatic` / `getDetailNoStore` / etc. wrappers centralize fetch ergonomics — always use them rather than calling the SDK directly.
- Preview flow: microCMS admin → `/api/preview?draftKey=...&contentId=...&endpoint=blog|announcements` → redirect to `/preview/<kind>/<slug>?draftKey=...`.
- `draftKey` is microCMS's per-draft rotating token — **do not compare it against a fixed secret**. Forward it unchanged to microCMS and let the CMS validate.
- Never expose `MICROCMS_API_KEY` to the browser. Server components + API routes only.
- Defensive coding: microCMS fields typed as non-nullable may still arrive as `undefined`. Utility helpers (`estimateReadingTimeMin`, `extractPlainText`, etc.) guard non-string inputs rather than crashing render.

## Framer Motion + Lenis

- Any file using `motion.*`, `AnimatePresence`, `useScroll`, `useTransform`, `useInView` must have `"use client"`.
- Animate transform properties (`x`, `y`, `scale`, `rotate`, `opacity`) — avoid animating `width`, `height`, `top`, `left`.
- Scroll-linked animations: `useScroll` + `useTransform` chain. Never use raw scroll event listeners.
- Scroll-triggered reveals: `whileInView` + `once: true` is the default.
- Page transitions: `AnimatePresence` + `mode="wait"`.
- `MotionProvider` mounts Lenis (smooth scroll) **only** on `pointer: fine` devices and only for non-reduced-motion users. On touch devices and reduced-motion users, native scrolling is preserved.
- `CustomCursor` follows the same desktop + non-reduced-motion gate and adds `.has-custom-cursor` to `<html>` so global CSS can hide the native pointer.
- All motion respects `prefers-reduced-motion` via `useReducedMotion` from `lib/motion`.

## Tailwind CSS v3

- JS config at `tailwind.config.js` with `content` globs covering `app/`, `components/`, `pages/`.
- Design tokens live under `theme.extend.colors` and related keys.
- Prefer utility-class composition over CSS component abstractions.
- Use `@tailwindcss/typography` for article-body prose styles.
- Any hand-rolled CSS belongs in `globals.css` or a page-local CSS module (`home.css`).
- Mobile-first breakpoints (`sm:`, `md:`, `lg:`). Component-level container queries are not in use.

## Accessibility

- Semantic HTML first. `div + onClick` is forbidden — use `button` / `a`.
- All images have `alt`. Decorative images use `alt=""`.
- All form inputs have an associated `label`.
- Every interactive element is keyboard-reachable and operable.
- Respect `prefers-reduced-motion` for all animations (see Motion hooks).
- Color contrast: WCAG 2.1 AA minimum (4.5:1 normal, 3:1 large text).
- ARIA used sparingly — prefer native HTML semantics.

## Testing Strategy

### Coverage (enforced)

- **Target: 100% on statements / branches / functions / lines.**
- CI fails below 100% (thresholds in `vitest.config.ts`).
- Excluded paths are documented inline in `vitest.config.ts` with a reason comment (pre-existing gaps tracked separately).

### Unit / Integration

- **Vitest + React Testing Library + jsdom.**
- Test behavior, not implementation.
- Query by accessible role/label: `getByRole`, `getByLabelText` (prefer over `getByTestId`).
- Mock `next/image`, `next/script`, and heavyweight module dependencies (e.g. `ContentDetail`) when the unit under test isolates a concern.
- Branch coverage gotcha: `?.` and `??` in test code create V8 branches. Prefer `as HTMLElement` assertions (or explicit null-guards followed by non-optional access) inside tests to avoid coverage-noise.
- State-changing event tests (window events reaching React setState) must be wrapped in `act()` from `@testing-library/react`.
- No snapshot tests — they are brittle and add low value.

### E2E

- Not currently part of the repo. When introduced, Playwright + Page Object Model is the default (see bigban for reference).

## CI / GitHub Actions

- **`.github/workflows/ci.yml`** — PR-triggered, runs `typecheck → lint → test → build` on Node 22 with pnpm cache.
- **`.github/workflows/claude.yml`** — responds to `@claude` mentions in PR / Issue comments, review comments, and issue bodies. Requires:
  - `CLAUDE_CODE_OAUTH_TOKEN` repository secret
  - Claude Code GitHub App installed on the repo
- Build validation also happens on Vercel deploy (real env). CI build is a fast-fail gate only.

## Performance

- Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- Images: `next/image` with lazy loading by default, `priority` for above-fold LCP images.
- Fonts: `next/font` for zero-layout-shift self-hosted fonts.
- Code split at route boundaries; dynamic imports for heavy client-only widgets.
- `React.memo` / `useMemo` / `useCallback` only after profiling confirms need.
- Smooth-scroll (Lenis) is desktop-only and motion-respecting, so mobile CLS / INP is not affected by scroll hijacking.

## Git Conventions

### Branches

- `feature/short-description`
- `fix/short-description`
- `chore/short-description`
- `ci/short-description`
- Design / experimentation work may live on a long-running `Design` branch that is periodically rebased onto `main`.

### Commits

Conventional Commits format:

- `feat:` / `fix:` / `refactor:` / `chore:` / `docs:` / `test:` / `perf:` / `ci:`
- Scope optional: `feat(motion): add critically-damped cursor follow`.
- Imperative mood ("add", not "added").
- Body explains *why*, not *what*.
- Japanese / English both acceptable; match surrounding history.

### Pull Requests

- Under 400 lines of diff when practical.
- Title follows Conventional Commits format.
- Description: summary, test plan (checkboxes), screenshots for UI changes.
- CI must be green before merge.
- Use squash or rebase merge (avoid merge-commit noise).

## Package Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build (`next build --webpack`) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (`--max-warnings=0`) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest with 100% coverage enforcement |

All four of `typecheck` / `lint` / `test` / `build` must pass locally before pushing.

## Environment Variables

See `.env.example` for the full list. Required at build/runtime:

- `MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY` — CMS access
- `REVALIDATE_SECRET` — webhook shared secret for `/api/revalidate`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (or `EMAIL_USER` / `EMAIL_PASSWORD`) — contact form
- `RECIPIENT_EMAIL` — contact form destination

Never commit real values. `.env` is gitignored; Vercel provides production env via the dashboard.
