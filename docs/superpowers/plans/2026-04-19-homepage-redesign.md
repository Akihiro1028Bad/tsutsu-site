# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Brutalist Editorial / Mono + Lime redesign of the tsutsu-site homepage (`/`), Header, Footer, and shared design tokens.

**Architecture:** Incrementally replace components section-by-section while preserving existing data layers (microCMS fetching, ContentCard data types). Introduce new design tokens (Mono + Lime palette, Noto Sans JP / Inter / Geist Mono fonts, typography utilities) once, then rebuild each homepage section against those tokens. Keep TDD where logic exists (data rendering, scroll interactions, count-up); use dev-server visual verification for pure layout / CSS.

**Tech Stack:** Next.js 16 (Webpack build, Turbopack dev), React 19, TypeScript, Tailwind CSS 3, Framer Motion, Vitest + Testing Library, next/font.

**Spec:** `docs/superpowers/specs/2026-04-19-homepage-redesign-design.md`

**Non-scope:** `/blog/[slug]`, `/announcements/[slug]`, `/services/mens-esthe/*`, admin / CMS changes, dark mode, i18n.

---

## Conventions for this plan

- **Path root**: all paths are relative to repo root `tsutsu-site/`.
- **Package manager**: `pnpm` (see `packageManager` in `package.json`).
- **Test runner**: `pnpm test` (`vitest run --coverage`). For a single file: `pnpm vitest run tests/unit/<file>`.
- **Dev server**: `pnpm dev` (already running at `http://localhost:3000`). Restart only when `tailwind.config.js` or `next.config.js` changes.
- **Commit style**: follow existing repo style (short Japanese / English prefix like `feat:`, `chore:`, `style:`). No Claude attribution (global `~/.claude/settings.json` disables it).
- **Author**: git `user.name = 堤暁寛`, `user.email = ttmakhr1028@gmail.com` is already set. Leave as-is.
- **Branch**: commit everything to `design/homepage-redesign` (already checked out).
- **Verification after each task**: `pnpm lint` passes 0 warnings, `pnpm test` passes, `pnpm dev` renders without console errors.

---

## Task 1: Install fonts and set up design tokens

**Files:**
- Modify: `app/layout.tsx` (add next/font imports and expose CSS variables on `<html>`)
- Modify: `app/globals.css` (add `--font-*` variables + design token CSS vars + typography utilities)
- Modify: `tailwind.config.js` (add `paper`, `ink`, `lime`, `mono` colors + fontFamily entries)

**Why first:** All subsequent sections depend on these tokens. Shipping them alone causes no visible breakage (existing components still use old classes until updated).

- [ ] **Step 1.1: Install next/font for Inter + Geist Mono (Noto Sans JP already referenced)**

  next/font is bundled with Next.js — no new dependency install needed. Verify:
  ```bash
  grep -q '"next":' package.json && echo "next/font available"
  ```

- [ ] **Step 1.2: Wire fonts in `app/layout.tsx`**

  At the top of `app/layout.tsx`, import fonts:
  ```typescript
  import { Noto_Sans_JP, Inter, Geist_Mono } from 'next/font/google'

  const notoSansJP = Noto_Sans_JP({
    subsets: ['latin'],
    weight: ['400', '500', '700', '900'],
    variable: '--font-noto-sans-jp',
    display: 'swap',
  })

  const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700', '800', '900'],
    variable: '--font-inter',
    display: 'swap',
  })

  const geistMono = Geist_Mono({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-geist-mono',
    display: 'swap',
  })
  ```

  In the `<html>` tag, add the variable classes:
  ```tsx
  <html lang="ja" className={`${notoSansJP.variable} ${inter.variable} ${geistMono.variable}`}>
  ```

  Remove the stale `--font-noto-sans-jp: system-ui;` override from `app/globals.css` (it defeats next/font).

- [ ] **Step 1.3: Add design tokens + typography utilities to `app/globals.css`**

  Inside `@layer base`, add root CSS variables:
  ```css
  :root {
    --color-paper: #fafaf7;
    --color-ink: #0a0a0a;
    --color-lime: #d0ff3a;
    --color-gray-200: #e5e5e5;
    --color-gray-400: #9ca3af;
    --color-gray-500: #6b7280;
  }
  ```

  Change the global `body` rule so it paints paper:
  ```css
  body {
    background: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-noto-sans-jp), 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif;
  }
  ```

  Add typography utility classes inside `@layer components`:
  ```css
  @layer components {
    .h-display {
      font-family: var(--font-noto-sans-jp), 'Hiragino Kaku Gothic ProN', sans-serif;
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 0.95;
    }
    .h-section {
      font-family: var(--font-noto-sans-jp), sans-serif;
      font-weight: 900;
      letter-spacing: -0.02em;
      line-height: 1.0;
    }
    .mono-tag {
      font-family: var(--font-geist-mono), ui-monospace, monospace;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 0.7rem;
    }
    .lime-highlight {
      background: var(--color-lime);
      color: var(--color-ink);
      padding: 0 0.15em;
      display: inline-block;
      transform: rotate(-1deg);
    }
  }
  ```

- [ ] **Step 1.4: Extend `tailwind.config.js` with new palette and font families**

  Inside `theme.extend`:
  ```js
  colors: {
    paper: '#fafaf7',
    ink: '#0a0a0a',
    lime: {
      DEFAULT: '#d0ff3a',
      500: '#d0ff3a',
    },
    // keep existing primary/accent/gold for legacy usage — they can be removed in a later cleanup
  },
  fontFamily: {
    sans: ['var(--font-noto-sans-jp)', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', 'sans-serif'],
    display: ['var(--font-inter)', 'var(--font-noto-sans-jp)', 'sans-serif'],
    mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  },
  ```

- [ ] **Step 1.5: Restart dev server and verify**

  Stop the running `pnpm dev` (or kill the background process) and restart so `tailwind.config.js` and `layout.tsx` changes are picked up:
  ```bash
  curl -s http://localhost:3000/ > /dev/null && echo "still 200"
  ```
  Open in browser. Existing site should render in `#fafaf7` background with Noto Sans JP. No visual breakage of other components.

- [ ] **Step 1.6: Commit**

  ```bash
  git add app/layout.tsx app/globals.css tailwind.config.js
  git commit -m "feat(design): add Mono+Lime tokens and next/font wiring"
  ```

---

## Task 2: Redesign Header

**Files:**
- Modify: `components/Header.tsx`
- Modify: `components/HeaderSkeleton.tsx` (keep dimensions matching new header to avoid CLS)
- Test: `tests/unit/components/Header.test.tsx`

**Behavior:**
- `position: sticky; top: 0`, height `h-16` (64px).
- Initial: `bg-paper/70 backdrop-blur`, no border.
- After window scroll > 16px: `bg-white` + `border-b border-gray-200`.
- Logo: `tsutsu.` where `.` is `text-lime-500` with a slow `ping` pulse (2s interval). Clickable → `/`.
- Desktop nav (`md:`+): `Work / Services / About / Blog / Contact`, right-aligned, small size, uppercase mono.
- Mobile: hamburger icon → full-screen black overlay with huge-type menu items.

- [ ] **Step 2.1: Write the failing test for Header scroll state**

  Create `tests/unit/components/Header.test.tsx`:
  ```typescript
  import { render, screen, fireEvent } from '@testing-library/react'
  import { describe, it, expect, beforeEach } from 'vitest'
  import Header from '@/components/Header'

  describe('Header', () => {
    beforeEach(() => {
      window.scrollY = 0
    })

    it('renders logo with lime dot', () => {
      render(<Header />)
      expect(screen.getByRole('link', { name: /tsutsu/i })).toBeInTheDocument()
    })

    it('shows desktop nav links', () => {
      render(<Header />)
      expect(screen.getByRole('link', { name: /Work/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Services/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Blog/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument()
    })

    it('adds scrolled styling after 16px scroll', () => {
      const { container } = render(<Header />)
      const header = container.querySelector('header')
      expect(header).not.toHaveClass('border-b')

      window.scrollY = 32
      fireEvent.scroll(window)
      expect(header).toHaveClass('border-b')
    })

    it('toggles mobile menu', () => {
      render(<Header />)
      const toggle = screen.getByRole('button', { name: /メニュー|menu/i })
      fireEvent.click(toggle)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: /閉じる|close/i }))
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
  ```

- [ ] **Step 2.2: Run test to verify it fails**

  ```bash
  pnpm vitest run tests/unit/components/Header.test.tsx
  ```
  Expected: FAIL (either old Header doesn't expose these links / mobile toggle, or classes don't match).

- [ ] **Step 2.3: Rewrite `components/Header.tsx`**

  ```tsx
  'use client'

  import { useEffect, useState } from 'react'
  import Link from 'next/link'

  const NAV_LINKS = [
    { href: '/#work', label: 'Work' },
    { href: '/#services', label: 'Services' },
    { href: '/#about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/#contact', label: 'Contact' },
  ] as const

  export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 16)
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
      <>
        <header
          className={[
            'sticky top-0 z-50 h-16 transition-colors',
            scrolled
              ? 'bg-white border-b border-gray-200'
              : 'bg-paper/70 backdrop-blur',
          ].join(' ')}
        >
          <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-6 md:px-12">
            <Link
              href="/"
              className="text-lg font-display font-black tracking-tight text-ink"
              aria-label="tsutsu home"
            >
              tsutsu
              <span className="relative ml-0.5 inline-block text-lime-500">
                .
                <span
                  aria-hidden
                  className="absolute inset-0 animate-ping rounded-full bg-lime-500/60"
                />
              </span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mono-tag text-ink/80 transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              aria-label="メニューを開く"
              className="flex h-10 w-10 items-center justify-center md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <span className="block h-0.5 w-6 bg-ink" aria-hidden />
            </button>
          </div>
        </header>

        {menuOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="ナビゲーション"
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-paper"
          >
            <div className="flex h-16 items-center justify-end px-6">
              <button
                type="button"
                aria-label="メニューを閉じる"
                className="text-paper"
                onClick={() => setMenuOpen(false)}
              >
                Close ✕
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-6 px-8 pb-24">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="h-display block text-4xl text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
  ```

- [ ] **Step 2.4: Update `components/HeaderSkeleton.tsx` to match new dimensions**

  Replace its body with a 64px tall div with the same background treatment, so SSR → hydration doesn't shift:
  ```tsx
  export default function HeaderSkeleton() {
    return <div aria-hidden className="sticky top-0 z-50 h-16 bg-paper/70" />
  }
  ```

- [ ] **Step 2.5: Run tests to verify they pass**

  ```bash
  pnpm vitest run tests/unit/components/Header.test.tsx
  ```
  Expected: PASS.

- [ ] **Step 2.6: Visual check**

  Load `http://localhost:3000/` in browser. Confirm:
  - Logo + lime dot ping visible at top-left
  - Nav visible on desktop, hamburger on mobile (use dev tools responsive mode)
  - Scrolling adds white bg + border

- [ ] **Step 2.7: Commit**

  ```bash
  git add components/Header.tsx components/HeaderSkeleton.tsx tests/unit/components/Header.test.tsx
  git commit -m "feat(header): redesign as minimal sticky with lime dot"
  ```

---

## Task 3: Redesign Footer

**Files:**
- Modify: `components/Footer.tsx`
- Modify: `components/FooterSkeleton.tsx`
- Test: `tests/unit/components/Footer.test.tsx`

- [ ] **Step 3.1: Write the failing test**

  ```typescript
  import { render, screen } from '@testing-library/react'
  import { describe, it, expect } from 'vitest'
  import Footer from '@/components/Footer'

  describe('Footer', () => {
    it('shows large tsutsu logo', () => {
      render(<Footer />)
      expect(screen.getByText(/tsutsu/i)).toBeInTheDocument()
    })

    it('shows mini nav links', () => {
      render(<Footer />)
      ;['Work', 'Services', 'About', 'Blog', 'Contact'].forEach((label) => {
        expect(screen.getByRole('link', { name: new RegExp(label, 'i') })).toBeInTheDocument()
      })
    })

    it('shows current year copyright', () => {
      const year = new Date().getFullYear()
      render(<Footer />)
      expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument()
    })

    it('shows open-for-business badge', () => {
      render(<Footer />)
      expect(screen.getByText(/受付中/)).toBeInTheDocument()
    })
  })
  ```

- [ ] **Step 3.2: Run test to verify it fails**

  ```bash
  pnpm vitest run tests/unit/components/Footer.test.tsx
  ```

- [ ] **Step 3.3: Rewrite `components/Footer.tsx`**

  ```tsx
  import Link from 'next/link'

  const NAV_LINKS = [
    { href: '/#work', label: 'Work' },
    { href: '/#services', label: 'Services' },
    { href: '/#about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/#contact', label: 'Contact' },
  ] as const

  export default function Footer() {
    const year = new Date().getFullYear()
    return (
      <footer className="bg-ink text-paper">
        <div className="mx-auto max-w-screen-2xl px-6 py-20 md:px-12 md:py-28">
          <Link href="/" className="h-display block text-6xl md:text-8xl">
            tsutsu<span className="text-lime-500">.</span>
          </Link>

          <nav
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
            aria-label="Footer navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mono-tag text-paper/70 transition-colors hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-8">
            <p className="mono-tag text-paper/50">© {year} tsutsumi akihiro</p>
            <p className="mono-tag flex items-center gap-2 text-paper/70">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full bg-lime-500"
              />
              受付中
            </p>
          </div>
        </div>
      </footer>
    )
  }
  ```

- [ ] **Step 3.4: Update `components/FooterSkeleton.tsx`**

  ```tsx
  export default function FooterSkeleton() {
    return <div aria-hidden className="h-[360px] bg-ink" />
  }
  ```

- [ ] **Step 3.5: Run tests**

  ```bash
  pnpm vitest run tests/unit/components/Footer.test.tsx
  ```
  Expected: PASS.

- [ ] **Step 3.6: Commit**

  ```bash
  git add components/Footer.tsx components/FooterSkeleton.tsx tests/unit/components/Footer.test.tsx
  git commit -m "feat(footer): redesign with mono+lime palette"
  ```

---

## Task 4: Redesign Hero

**Files:**
- Modify: `components/Hero.tsx`
- Test: `tests/unit/components/Hero.test.tsx`
- Check existing tests in `tests/` for references to old Hero copy/structure; update as needed.

**Behavior:**
- 3-line huge-type headline, 技術 wrapped in `.lime-highlight`
- Eyebrow `INDEPENDENT DEVELOPER — TOKYO`
- Subcopy `一人ひとりのアイデアに寄り添い、最新技術で実現をサポートします。`
- Single CTA `無料で相談 →` linking to `/#contact`
- Bottom-right `↓ SCROLL` + `01–07`
- `min-h-[90vh] md:min-h-screen`
- Fade-in motion via Framer Motion once, no scroll-tied motion

- [ ] **Step 4.1: Write the failing test**

  ```typescript
  import { render, screen } from '@testing-library/react'
  import { describe, it, expect } from 'vitest'
  import Hero from '@/components/Hero'

  describe('Hero', () => {
    it('renders the three-line headline with lime-highlighted 技術', () => {
      render(<Hero />)
      expect(screen.getByText(/想いを/)).toBeInTheDocument()
      expect(screen.getByText(/カタチにします/)).toBeInTheDocument()
      const highlight = screen.getByText(/^技術$/)
      expect(highlight).toHaveClass('lime-highlight')
    })

    it('shows eyebrow tagline', () => {
      render(<Hero />)
      expect(screen.getByText(/INDEPENDENT DEVELOPER/i)).toBeInTheDocument()
    })

    it('shows a single primary CTA linking to #contact', () => {
      render(<Hero />)
      const cta = screen.getByRole('link', { name: /無料で相談/ })
      expect(cta).toHaveAttribute('href', '/#contact')
    })
  })
  ```

- [ ] **Step 4.2: Run test to verify it fails**

  ```bash
  pnpm vitest run tests/unit/components/Hero.test.tsx
  ```

- [ ] **Step 4.3: Rewrite `components/Hero.tsx`**

  ```tsx
  'use client'

  import Link from 'next/link'
  import { motion } from 'framer-motion'

  export default function Hero() {
    return (
      <section
        id="top"
        className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-paper px-6 pt-24 pb-16 md:min-h-screen md:px-12"
      >
        {/* subtle grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #0a0a0a 1px, transparent 1px), linear-gradient(to bottom, #0a0a0a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 mx-auto w-full max-w-screen-2xl"
        >
          <p className="mono-tag mb-10 text-ink/50">INDEPENDENT DEVELOPER — TOKYO</p>

          <h1 className="h-display text-[clamp(3rem,10vw,9rem)]">
            <span className="block">想いを</span>
            <span className="block">
              <span className="lime-highlight">技術</span>で
            </span>
            <span className="block">カタチにします。</span>
          </h1>

          <p className="mt-10 max-w-xl text-base text-ink/70 md:text-lg">
            一人ひとりのアイデアに寄り添い、最新技術で実現をサポートします。
          </p>

          <Link
            href="/#contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-lime-500 transition-transform hover:-translate-y-0.5"
          >
            無料で相談 <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <div className="mono-tag absolute bottom-6 right-6 flex flex-col items-end gap-1 text-ink/50 md:bottom-8 md:right-12">
          <span>↓ SCROLL</span>
          <span>01 — 07</span>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 4.4: Find and update any existing tests relying on old Hero copy**

  ```bash
  pnpm grep -l "titleLines\|「想い」\|「技術」" tests/ || true
  ```
  If matches found, update them to use the new copy (no brackets), or delete obsolete tests.

- [ ] **Step 4.5: Run tests**

  ```bash
  pnpm vitest run tests/unit/components/Hero.test.tsx
  ```
  Expected: PASS.

- [ ] **Step 4.6: Visual check**

  Load `/`, confirm:
  - Three-line huge headline with `技術` wrapped in a lime rectangle, slightly rotated
  - Eyebrow visible above, subcopy below
  - CTA visible
  - `↓ SCROLL 01 — 07` in bottom-right

- [ ] **Step 4.7: Commit**

  ```bash
  git add components/Hero.tsx tests/unit/components/Hero.test.tsx
  git commit -m "feat(hero): redesign as brutalist huge-type with lime accent"
  ```

---

## Task 5: Repaint LargeTextMarquee

**Files:**
- Modify: `components/LargeTextMarquee.tsx`

**Behavior:** Change colors only — black background + lime text, repeating `WEB · APP · SYSTEM · CAREER`.

- [ ] **Step 5.1: Read current marquee implementation**

  ```bash
  cat components/LargeTextMarquee.tsx | head -60
  ```

- [ ] **Step 5.2: Update colors and text**

  Change:
  - Outer container background to `bg-ink`
  - Text color to `text-lime-500`
  - Replace content string with `'WEB · APP · SYSTEM · CAREER '` repeated sufficient times to fill
  - Font weight `font-black`, large size `text-4xl md:text-6xl`, tracking tight

  If the component accepts a `text` or `items` prop, pass the new string. Otherwise edit the default text in-component.

- [ ] **Step 5.3: Visual check**

  Reload `/`. Marquee immediately after Hero should render black bar with lime text cycling.

- [ ] **Step 5.4: Commit**

  ```bash
  git add components/LargeTextMarquee.tsx
  git commit -m "style(marquee): switch to ink bg + lime text for new palette"
  ```

---

## Task 6: FeaturedWork component (new)

**Files:**
- Create: `components/FeaturedWork.tsx`
- Create: `lib/works.ts` (typed data module, starts with 1 hardcoded entry)
- Test: `tests/unit/components/FeaturedWork.test.tsx`
- Test: `tests/unit/lib/works.test.ts`

**Behavior:** Renders a single work card with screenshot, meta, title, description, tech chips, and external link CTA. Data comes from `lib/works.ts`.

- [ ] **Step 6.1: Write the failing test for the data module**

  Create `tests/unit/lib/works.test.ts`:
  ```typescript
  import { describe, it, expect } from 'vitest'
  import { works } from '@/lib/works'

  describe('works data', () => {
    it('exports at least one work entry', () => {
      expect(works.length).toBeGreaterThan(0)
    })

    it('each work has required fields', () => {
      for (const work of works) {
        expect(work.id).toBeTruthy()
        expect(work.title).toBeTruthy()
        expect(work.client).toBeTruthy()
        expect(work.year).toBeTruthy()
        expect(work.url).toMatch(/^https?:\/\//)
        expect(work.imageSrc).toBeTruthy()
        expect(Array.isArray(work.stack)).toBe(true)
      }
    })
  })
  ```

- [ ] **Step 6.2: Run test to verify it fails (module doesn't exist yet)**

  ```bash
  pnpm vitest run tests/unit/lib/works.test.ts
  ```

- [ ] **Step 6.3: Create `lib/works.ts`**

  ```typescript
  export interface Work {
    id: string
    title: string
    client: string
    year: string
    description: string
    stack: string[]
    url: string
    imageSrc: string
    imageAlt: string
  }

  /**
   * Featured works shown on the homepage.
   * TODO: populate `imageSrc`/`url`/`client`/`title` with real delivered project
   * once the client provides screenshot and URL (placeholder below to keep build green).
   */
  export const works: Work[] = [
    {
      id: 'work-001',
      title: 'Portfolio Website',
      client: 'TBD client name',
      year: '2026',
      description:
        '事業や想いを丁寧にヒアリングし、ブランドに馴染む一枚を設計・実装・納品しました。',
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      url: 'https://example.com',
      imageSrc: '/works/placeholder-001.svg',
      imageAlt: 'Portfolio Website screenshot',
    },
  ]
  ```

  Then create a placeholder SVG so the image link doesn't 404:
  ```bash
  mkdir -p public/works
  cat > public/works/placeholder-001.svg <<'SVG'
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="placeholder">
    <rect width="1600" height="900" fill="#0a0a0a"/>
    <text x="800" y="470" text-anchor="middle" fill="#d0ff3a" font-family="system-ui" font-size="120" font-weight="900">PLACEHOLDER</text>
  </svg>
  SVG
  ```

- [ ] **Step 6.4: Run data test to verify PASS**

  ```bash
  pnpm vitest run tests/unit/lib/works.test.ts
  ```

- [ ] **Step 6.5: Write the failing test for the component**

  Create `tests/unit/components/FeaturedWork.test.tsx`:
  ```typescript
  import { render, screen } from '@testing-library/react'
  import { describe, it, expect } from 'vitest'
  import FeaturedWork from '@/components/FeaturedWork'
  import { works } from '@/lib/works'

  describe('FeaturedWork', () => {
    it('renders section heading with work counter', () => {
      render(<FeaturedWork />)
      expect(screen.getByText(/FEATURED WORK/)).toBeInTheDocument()
      expect(screen.getByText(new RegExp(`01 / ${works.length.toString().padStart(2, '0')}`))).toBeInTheDocument()
    })

    it('renders the first work with title, year, and stack', () => {
      render(<FeaturedWork />)
      const work = works[0]
      expect(screen.getByText(work.title)).toBeInTheDocument()
      expect(screen.getByText(new RegExp(work.year))).toBeInTheDocument()
      work.stack.forEach((tech) => {
        expect(screen.getByText(tech)).toBeInTheDocument()
      })
    })

    it('links to work external URL with noopener', () => {
      render(<FeaturedWork />)
      const link = screen.getByRole('link', { name: /View Case/i })
      expect(link).toHaveAttribute('href', works[0].url)
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    })
  })
  ```

- [ ] **Step 6.6: Run test to verify it fails**

  ```bash
  pnpm vitest run tests/unit/components/FeaturedWork.test.tsx
  ```

- [ ] **Step 6.7: Create `components/FeaturedWork.tsx`**

  ```tsx
  'use client'

  import Image from 'next/image'
  import { motion } from 'framer-motion'
  import { works } from '@/lib/works'

  export default function FeaturedWork() {
    const total = works.length
    const work = works[0]
    if (!work) return null

    return (
      <section id="work" className="bg-paper px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="h-section text-[clamp(3rem,8vw,7rem)]">
              FEATURED<br />WORK
            </h2>
            <span className="mono-tag text-ink/50">
              01 / {total.toString().padStart(2, '0')}
            </span>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="group"
          >
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label={`${work.title} - View Case`}
            >
              <div className="overflow-hidden border-8 border-ink bg-ink">
                <div className="relative aspect-video w-full">
                  <Image
                    src={work.imageSrc}
                    alt={work.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.01]"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <p className="mono-tag text-ink/50">
                  #{work.id.toUpperCase()} · {work.client} · {work.year}
                </p>
              </div>

              <h3 className="h-section mt-2 text-[clamp(1.75rem,4vw,3rem)]">
                {work.title}
              </h3>

              <div className="mt-4 h-px w-24 bg-ink/20" />

              <p className="mt-4 max-w-2xl text-base text-ink/70 md:text-lg">
                {work.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {work.stack.map((tech) => (
                  <li key={tech} className="mono-tag text-ink/60">
                    {tech}
                  </li>
                ))}
              </ul>

              <span className="mono-tag mt-8 inline-flex items-center gap-1 text-ink after:block after:h-px after:w-0 after:bg-lime-500 after:transition-all group-hover:after:w-12">
                View Case <span aria-hidden>→</span>
              </span>
            </a>
          </motion.article>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 6.8: Run tests**

  ```bash
  pnpm vitest run tests/unit/components/FeaturedWork.test.tsx tests/unit/lib/works.test.ts
  ```
  Expected: PASS.

- [ ] **Step 6.9: Commit**

  ```bash
  git add components/FeaturedWork.tsx lib/works.ts public/works/placeholder-001.svg \
    tests/unit/components/FeaturedWork.test.tsx tests/unit/lib/works.test.ts
  git commit -m "feat(featured-work): add new section with single-card showcase"
  ```

---

## Task 7: Redesign Services

**Files:**
- Modify: `components/Services.tsx`
- Test: `tests/unit/components/Services.test.tsx` (create or update existing)

**Behavior:** Four services rendered as numbered editorial rows, preserving existing titles and descriptions.

- [ ] **Step 7.1: Write the failing test**

  ```typescript
  import { render, screen } from '@testing-library/react'
  import { describe, it, expect } from 'vitest'
  import Services from '@/components/Services'

  describe('Services', () => {
    it('renders section heading with service count', () => {
      render(<Services />)
      expect(screen.getByText(/SERVICES/)).toBeInTheDocument()
      expect(screen.getByText(/4 services/)).toBeInTheDocument()
    })

    it('lists four services with numbers', () => {
      render(<Services />)
      ;['Webサイト制作', 'Webアプリ', '業務改善', '学習支援'].forEach((keyword) => {
        expect(screen.getByText(new RegExp(keyword))).toBeInTheDocument()
      })
      ;['01', '02', '03', '04'].forEach((n) => {
        expect(screen.getByText(n)).toBeInTheDocument()
      })
    })
  })
  ```

- [ ] **Step 7.2: Run test**

  ```bash
  pnpm vitest run tests/unit/components/Services.test.tsx
  ```

- [ ] **Step 7.3: Rewrite `components/Services.tsx`**

  ```tsx
  'use client'

  import Link from 'next/link'
  import { motion } from 'framer-motion'

  interface Service {
    number: string
    title: string
    description: string
    href: string
    ctaLabel: string
  }

  const SERVICES: Service[] = [
    {
      number: '01',
      title: 'Webサイト制作',
      description:
        '事業や想いを丁寧にヒアリングし、目的に合ったWebサイトを制作します。見る人にとってわかりやすく、使う人にとってストレスのない設計を大切にしています。',
      href: '/#contact',
      ctaLabel: 'お問い合わせ →',
    },
    {
      number: '02',
      title: 'Webアプリ / システム開発',
      description:
        '日々の業務やサービス運営で生まれる「手間」や「管理のしづらさ」を、Webアプリや管理画面の開発によって解消します。長く使い続けられる、無理のない設計を心がけています。',
      href: '/#contact',
      ctaLabel: 'お問い合わせ →',
    },
    {
      number: '03',
      title: '業務改善・自動化（AI/ツール活用）',
      description:
        '現場の業務に合わせて、無理なく続けられる改善を設計します。手間を減らし、作業の見える化や標準化を一緒に進めていきます。',
      href: '/#contact',
      ctaLabel: 'お問い合わせ →',
    },
    {
      number: '04',
      title: '学習支援・キャリア支援',
      description:
        '未経験〜初中級エンジニアの方に向けて、学習〜実践〜キャリアの段階を、一緒に並走しながら進めます。「ただ教わる」ではなく、「自分で考えて作れる力」を育てます。',
      href: '/#contact',
      ctaLabel: 'お問い合わせ →',
    },
  ]

  export default function Services() {
    return (
      <section id="services" className="bg-paper px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="h-section text-[clamp(3rem,8vw,7rem)]">SERVICES</h2>
            <span className="mono-tag text-ink/50">{SERVICES.length} services</span>
          </div>

          <ul className="divide-y divide-ink/15 border-t border-ink/15">
            {SERVICES.map((service, i) => (
              <motion.li
                key={service.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[60px_2fr_3fr_auto] md:items-start md:gap-8"
              >
                <div className="flex items-center gap-3 md:block">
                  <span className="mono-tag text-ink">{service.number}</span>
                  <span
                    aria-hidden
                    className="hidden h-px w-10 bg-lime-500 md:mt-4 md:inline-block"
                  />
                </div>
                <h3 className="h-section text-2xl md:text-3xl">
                  {service.title}
                </h3>
                <p className="text-sm text-ink/70 md:text-base">{service.description}</p>
                <Link
                  href={service.href}
                  className="mono-tag inline-flex self-start text-ink hover:text-ink/70 md:self-center"
                >
                  {service.ctaLabel}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 7.4: Run tests**

  ```bash
  pnpm vitest run tests/unit/components/Services.test.tsx
  ```

- [ ] **Step 7.5: Commit**

  ```bash
  git add components/Services.tsx tests/unit/components/Services.test.tsx
  git commit -m "feat(services): editorial row layout with numbered entries"
  ```

---

## Task 8: Redesign About

**Files:**
- Modify: `components/About.tsx`
- Create: `components/CountUp.tsx` (small helper for number animation)
- Test: `tests/unit/components/CountUp.test.tsx`
- Test: `tests/unit/components/About.test.tsx`

**Behavior:** Numbers block + statement + tech stack chips. Numbers count up on viewport entry.

- [ ] **Step 8.1: Write the failing test for CountUp**

  ```typescript
  import { render, screen } from '@testing-library/react'
  import { describe, it, expect } from 'vitest'
  import CountUp from '@/components/CountUp'

  describe('CountUp', () => {
    it('renders the target value immediately when animation disabled', () => {
      render(<CountUp value={42} animate={false} />)
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('renders a static string value as-is', () => {
      render(<CountUp value="2025.08" animate={false} />)
      expect(screen.getByText('2025.08')).toBeInTheDocument()
    })
  })
  ```

- [ ] **Step 8.2: Run test to verify it fails**

  ```bash
  pnpm vitest run tests/unit/components/CountUp.test.tsx
  ```

- [ ] **Step 8.3: Create `components/CountUp.tsx`**

  ```tsx
  'use client'

  import { useEffect, useRef, useState } from 'react'

  interface CountUpProps {
    value: number | string
    duration?: number
    animate?: boolean
  }

  /**
   * Renders a number that counts up from 0 to `value` when the element
   * enters the viewport. If `value` is a string (e.g. "2025.08"), it is
   * rendered as-is — no animation.
   */
  export default function CountUp({
    value,
    duration = 800,
    animate = true,
  }: CountUpProps) {
    const [current, setCurrent] = useState(typeof value === 'number' && animate ? 0 : value)
    const ref = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
      if (typeof value !== 'number' || !animate) {
        setCurrent(value)
        return
      }

      const target = value
      const node = ref.current
      if (!node) return

      if (typeof IntersectionObserver === 'undefined') {
        setCurrent(target)
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return
          observer.disconnect()

          if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            setCurrent(target)
            return
          }

          const start = performance.now()
          let raf = 0
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration)
            setCurrent(Math.round(target * (1 - Math.pow(1 - t, 3))))
            if (t < 1) raf = requestAnimationFrame(tick)
          }
          raf = requestAnimationFrame(tick)
          return () => cancelAnimationFrame(raf)
        },
        { threshold: 0.3 },
      )

      observer.observe(node)
      return () => observer.disconnect()
    }, [value, duration, animate])

    return <span ref={ref}>{current}</span>
  }
  ```

- [ ] **Step 8.4: Write the failing About test**

  ```typescript
  import { render, screen } from '@testing-library/react'
  import { describe, it, expect } from 'vitest'
  import About from '@/components/About'

  describe('About', () => {
    it('renders the section heading and name', () => {
      render(<About />)
      expect(screen.getByText(/ABOUT/)).toBeInTheDocument()
      expect(screen.getByText(/TSUTSUMI AKIHIRO/i)).toBeInTheDocument()
    })

    it('renders career numbers', () => {
      render(<About />)
      expect(screen.getByText(/年間の現場経験/)).toBeInTheDocument()
      expect(screen.getByText(/年前にエンジニア転身/)).toBeInTheDocument()
      expect(screen.getByText(/独立/)).toBeInTheDocument()
      expect(screen.getByText('2025.08')).toBeInTheDocument()
    })

    it('lists tech stack chips', () => {
      render(<About />)
      expect(screen.getByText('USING')).toBeInTheDocument()
      ;['Next.js', 'React', 'TypeScript', 'Tailwind'].forEach((tech) => {
        expect(screen.getByText(tech)).toBeInTheDocument()
      })
    })
  })
  ```

- [ ] **Step 8.5: Run test to verify it fails**

  ```bash
  pnpm vitest run tests/unit/components/About.test.tsx
  ```

- [ ] **Step 8.6: Rewrite `components/About.tsx`**

  ```tsx
  'use client'

  import CountUp from '@/components/CountUp'

  interface Fact {
    value: number | string
    label: string
  }

  const FACTS: Fact[] = [
    { value: 4, label: '年間の現場経験' },
    { value: 3, label: '年前にエンジニア転身' },
    { value: '2025.08', label: '独立 & 個人事業主へ' },
    { value: 1, label: '現在の拠点（Tokyo）' },
  ]

  const STACK = [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind',
    'Supabase',
    'microCMS',
    'Vercel',
    'Figma',
  ]

  export default function About() {
    return (
      <section id="about" className="bg-paper px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="h-section text-[clamp(3rem,8vw,7rem)]">ABOUT</h2>
            <span className="mono-tag text-ink/50">TSUTSUMI AKIHIRO</span>
          </div>

          <ul className="divide-y divide-ink/15 border-t border-ink/15">
            {FACTS.map((fact) => (
              <li
                key={fact.label}
                className="flex items-baseline justify-between gap-6 py-6 md:py-8"
              >
                <span className="h-section text-[clamp(2.5rem,6vw,6rem)] tabular-nums">
                  <CountUp value={fact.value} />
                </span>
                <span className="text-right text-sm text-ink/70 md:text-base">
                  {fact.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-16 max-w-3xl space-y-4 text-base text-ink/80 md:text-lg">
            <p>
              4年の現場経験を経て、独学でプログラミングを学び、3年前にエンジニアへ転身しました。
            </p>
            <p>
              その後、業務システムやWebアプリケーションの設計・実装・運用を担当し、
              2025年8月に独立。現場で鍛えた実装力と、独学で築いた課題解決力を、
              個人事業主として一つにしています。
            </p>
          </div>

          <div className="mt-16">
            <p className="mono-tag text-ink/50">USING</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {STACK.map((tech) => (
                <li
                  key={tech}
                  className="mono-tag text-ink underline decoration-lime-500 decoration-2 underline-offset-4"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 8.7: Run tests**

  ```bash
  pnpm vitest run tests/unit/components/CountUp.test.tsx tests/unit/components/About.test.tsx
  ```
  Expected: PASS.

- [ ] **Step 8.8: Commit**

  ```bash
  git add components/About.tsx components/CountUp.tsx \
    tests/unit/components/About.test.tsx tests/unit/components/CountUp.test.tsx
  git commit -m "feat(about): numbers + statement + tech chips with count-up"
  ```

---

## Task 9: ContentRow + 2-column Announcements + Blog

**Files:**
- Create: `components/ContentRow.tsx`
- Modify: `components/AnnouncementSection.tsx` / `AnnouncementSectionClient.tsx` → use ContentRow
- Modify: `components/BlogSection.tsx` / `BlogSectionClient.tsx` → use ContentRow
- Create: `components/LatestSection.tsx` (wraps both in a 2-column layout for the homepage)
- Test: `tests/unit/components/ContentRow.test.tsx`

**Behavior:** Each item is date + title only. Homepage renders Announcements and Blog side-by-side (stacked on mobile). Each column caps at 3 items + `[+ すべて]` link.

- [ ] **Step 9.1: Write the failing ContentRow test**

  ```typescript
  import { render, screen } from '@testing-library/react'
  import { describe, it, expect } from 'vitest'
  import ContentRow from '@/components/ContentRow'

  describe('ContentRow', () => {
    it('renders date and title linked to href', () => {
      render(
        <ContentRow
          date="2026-04-19"
          title="タイトルです"
          href="/blog/test-slug"
        />,
      )
      const link = screen.getByRole('link', { name: /タイトルです/ })
      expect(link).toHaveAttribute('href', '/blog/test-slug')
      expect(screen.getByText('2026.04.19')).toBeInTheDocument()
    })
  })
  ```

- [ ] **Step 9.2: Run test to verify it fails**

  ```bash
  pnpm vitest run tests/unit/components/ContentRow.test.tsx
  ```

- [ ] **Step 9.3: Create `components/ContentRow.tsx`**

  ```tsx
  import Link from 'next/link'

  interface ContentRowProps {
    date: string
    title: string
    href: string
  }

  export default function ContentRow({ date, title, href }: ContentRowProps) {
    const formatted = date.includes('-') ? date.replace(/-/g, '.') : date
    return (
      <li className="border-t border-ink/15 py-5 first:border-t-0 md:py-6">
        <Link href={href} className="group block">
          <span className="mono-tag block text-ink/50">{formatted}</span>
          <span className="mt-2 block text-base text-ink transition-colors group-hover:underline group-hover:decoration-lime-500 group-hover:decoration-2 group-hover:underline-offset-4 md:text-lg">
            {title}
          </span>
        </Link>
      </li>
    )
  }
  ```

- [ ] **Step 9.4: Update `AnnouncementSection` / `AnnouncementSectionClient` to use ContentRow**

  Read current implementation:
  ```bash
  cat components/AnnouncementSectionClient.tsx
  ```

  Replace card rendering with a `<ul>` of `<ContentRow>` entries. Cap at 3. Remove the old card markup. Preserve data fetching / props shape. Add a `showHeading?: boolean` prop so the homepage wrapper controls headings.

- [ ] **Step 9.5: Update `BlogSection` / `BlogSectionClient` to use ContentRow**

  Same treatment: replace `BlogCard` usage with `<ContentRow>`, cap at 3, accept `showHeading?: boolean`.

- [ ] **Step 9.6: Create `components/LatestSection.tsx`**

  ```tsx
  import AnnouncementSection from '@/components/AnnouncementSection'
  import BlogSection from '@/components/BlogSection'
  import Link from 'next/link'

  export default function LatestSection() {
    return (
      <section className="bg-paper px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-screen-2xl">
          <h2 className="h-section mb-12 text-[clamp(3rem,8vw,7rem)]">LATEST</h2>

          <div className="grid gap-16 md:grid-cols-2 md:gap-12">
            <div>
              <div className="mb-6 flex items-end justify-between">
                <h3 className="h-section text-2xl md:text-3xl">ANNOUNCEMENTS</h3>
                <Link href="/announcements" className="mono-tag text-ink/70 hover:text-ink">
                  + すべて
                </Link>
              </div>
              <AnnouncementSection showHeading={false} />
            </div>
            <div>
              <div className="mb-6 flex items-end justify-between">
                <h3 className="h-section text-2xl md:text-3xl">BLOG</h3>
                <Link href="/blog" className="mono-tag text-ink/70 hover:text-ink">
                  + すべて
                </Link>
              </div>
              <BlogSection showHeading={false} />
            </div>
          </div>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 9.7: Run all related tests**

  ```bash
  pnpm vitest run tests/unit/components/ContentRow.test.tsx
  pnpm test
  ```
  Fix any broken existing tests that referenced the old Announcement/Blog card DOM structure.

- [ ] **Step 9.8: Commit**

  ```bash
  git add components/ContentRow.tsx components/LatestSection.tsx \
    components/AnnouncementSection.tsx components/AnnouncementSectionClient.tsx \
    components/BlogSection.tsx components/BlogSectionClient.tsx \
    tests/unit/components/ContentRow.test.tsx
  git commit -m "feat(latest): 2-column announcements + blog with ContentRow"
  ```

---

## Task 10: Redesign Contact

**Files:**
- Modify: `components/Contact.tsx`
- Test: `tests/unit/components/Contact.test.tsx`

**Behavior:** Huge statement + big mailto Lime button + smaller ghost button to the form. The existing form markup is preserved below, gated behind a `<details>` disclosure so it stays available but doesn't dominate.

- [ ] **Step 10.1: Write the failing test**

  ```typescript
  import { render, screen } from '@testing-library/react'
  import { describe, it, expect } from 'vitest'
  import Contact from '@/components/Contact'

  describe('Contact', () => {
    it('renders the big statement', () => {
      render(<Contact />)
      expect(screen.getByText(/お仕事の/)).toBeInTheDocument()
      expect(screen.getByText(/ご相談はこちら/)).toBeInTheDocument()
    })

    it('shows a primary mailto link', () => {
      render(<Contact />)
      const link = screen.getByRole('link', { name: /@/ })
      expect(link.getAttribute('href')).toMatch(/^mailto:/)
    })

    it('exposes the detailed form behind a disclosure', () => {
      render(<Contact />)
      expect(screen.getByText(/お問い合わせフォーム/)).toBeInTheDocument()
    })
  })
  ```

- [ ] **Step 10.2: Run test to verify it fails**

  ```bash
  pnpm vitest run tests/unit/components/Contact.test.tsx
  ```

- [ ] **Step 10.3: Refactor `components/Contact.tsx`**

  Read the existing file first to preserve form fields / submission handler:
  ```bash
  cat components/Contact.tsx
  ```

  Then restructure the top of the component so the statement + mailto button comes first, and the existing form is wrapped in:
  ```tsx
  <details className="mt-12 border-t border-ink/15 pt-12">
    <summary className="mono-tag cursor-pointer text-ink hover:text-ink/70">
      お問い合わせフォームを開く →
    </summary>
    <div className="mt-8">
      {/* existing <form>…</form> unchanged */}
    </div>
  </details>
  ```

  New top block:
  ```tsx
  <section id="contact" className="bg-paper px-6 py-24 md:px-12 md:py-32">
    <div className="mx-auto max-w-screen-2xl">
      <h2 className="h-display text-[clamp(3rem,8vw,8rem)]">
        お仕事の<br />ご相談はこちら。
      </h2>

      <div className="mt-12 h-px w-24 bg-ink/20" />

      <div className="mt-12 flex flex-col items-start gap-6">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mono-tag inline-flex items-center gap-3 rounded-full bg-lime-500 px-8 py-5 text-lg font-bold text-ink transition-transform hover:-translate-y-0.5"
        >
          {CONTACT_EMAIL} <span aria-hidden>→</span>
        </a>
        <p className="mono-tag text-ink/50">または</p>
        <p className="mono-tag text-ink/70">お問い合わせフォーム ↓</p>
      </div>

      {/* existing <details>-wrapped form goes here */}
    </div>
  </section>
  ```

  At the top of the file:
  ```tsx
  const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@tsutsumi.jp'
  ```

- [ ] **Step 10.4: Run tests**

  ```bash
  pnpm vitest run tests/unit/components/Contact.test.tsx
  pnpm test
  ```

- [ ] **Step 10.5: Commit**

  ```bash
  git add components/Contact.tsx tests/unit/components/Contact.test.tsx
  git commit -m "feat(contact): lead with mailto + keep form under disclosure"
  ```

---

## Task 11: Integrate new layout into `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

**Goal:** Render sections in the new order: Hero → Marquee → FeaturedWork → Services → About → LatestSection → Contact. Replace the old AnnouncementSection + BlogSection pair with a single `<LatestSection />`.

- [ ] **Step 11.1: Update imports and section ordering**

  ```tsx
  import type { Metadata } from 'next'
  import dynamic from 'next/dynamic'
  import Hero from '@/components/Hero'
  import LargeTextMarquee from '@/components/LargeTextMarquee'

  const FeaturedWork = dynamic(() => import('@/components/FeaturedWork'))
  const Services = dynamic(() => import('@/components/Services'))
  const About = dynamic(() => import('@/components/About'))
  const LatestSection = dynamic(() => import('@/components/LatestSection'))
  const Contact = dynamic(() => import('@/components/Contact'))

  // …existing metadata unchanged…

  export default function Home() {
    return (
      <main className="min-h-screen bg-paper">
        <Hero />
        <LargeTextMarquee speed={45} />
        <FeaturedWork />
        <Services />
        <About />
        <LatestSection />
        <Contact />
      </main>
    )
  }
  ```

- [ ] **Step 11.2: Visual verify full page**

  Reload `/`, scroll through. Confirm section order matches spec and nothing renders twice.

- [ ] **Step 11.3: Commit**

  ```bash
  git add app/page.tsx
  git commit -m "feat(home): wire new section order with FeaturedWork + LatestSection"
  ```

---

## Task 12: Responsive + A11y + Lighthouse pass

**Files:** No code files. This is a verification task. Any defects found get fixed with targeted commits.

- [ ] **Step 12.1: Responsive walkthrough**

  In the browser, using dev tools responsive mode, verify at widths 375, 768, 1024, 1440:
  - Header collapses / hamburger appears below 768
  - Hero huge headline scales (uses `vw`)
  - Services rows go from 4-col grid to stacked
  - LATEST becomes 1 column below 768
  - Contact email button stays readable

  Fix anything that breaks with scoped commits, e.g.:
  ```bash
  git commit -am "fix(hero): tighten mobile headline line-height"
  ```

- [ ] **Step 12.2: Keyboard navigation**

  Tab through `/` start-to-finish. Confirm:
  - Skip to Content (if present) works
  - Every interactive element receives a visible focus ring
  - Mobile menu opens via Enter/Space on the hamburger and closes via Esc (if not implemented, add an Esc listener)

- [ ] **Step 12.3: `prefers-reduced-motion`**

  In dev tools, set reduced motion to "reduce". Confirm:
  - Hero doesn't animate in
  - FeaturedWork / Services don't slide
  - CountUp shows final number immediately

  If any violate this, add a `useReducedMotion()` hook from Framer Motion and gate animations.

- [ ] **Step 12.4: Lint + typecheck + tests green**

  ```bash
  pnpm lint
  pnpm test
  ```
  Both must pass before proceeding.

- [ ] **Step 12.5: Lighthouse**

  With dev server running, run Lighthouse (Chrome DevTools → Lighthouse) for `/` in mobile mode. Target scores:
  - Performance: ≥ 85 (new fonts may lower; okay if ≥ 80)
  - Accessibility: ≥ 95
  - Best Practices: ≥ 95
  - SEO: ≥ 95

  Record scores in the commit message for reference.

- [ ] **Step 12.6: Final commit**

  ```bash
  git commit --allow-empty -m "chore(redesign): verified responsive, a11y, and Lighthouse"
  ```

---

## Task 13: Open PR

- [ ] **Step 13.1: Push branch**

  ```bash
  git push -u origin design/homepage-redesign
  ```

- [ ] **Step 13.2: Open PR**

  ```bash
  gh pr create --base main \
    --title "feat: homepage redesign (Brutalist Editorial / Mono + Lime)" \
    --body "$(cat <<'EOF'
  ## Summary
  - Brutalist Editorial redesign of homepage (`/`), Header, Footer, shared design tokens
  - New sections: FeaturedWork, LatestSection (Announcements + Blog 2-column)
  - Rewritten: Hero, Services (editorial rows), About (numbers + count-up), Contact (mailto-first)
  - Palette: Mono + Lime, fonts: Noto Sans JP + Inter + Geist Mono

  Spec: `docs/superpowers/specs/2026-04-19-homepage-redesign-design.md`
  Plan: `docs/superpowers/plans/2026-04-19-homepage-redesign.md`

  Non-scope: detail pages under `/blog/[slug]`, `/announcements/[slug]`, `/services/mens-esthe/*`.

  ## Test plan
  - [ ] Visual regression at widths 375 / 768 / 1024 / 1440
  - [ ] Keyboard navigation (Tab, Esc on mobile menu)
  - [ ] `prefers-reduced-motion` honored
  - [ ] `pnpm lint` passes 0 warnings
  - [ ] `pnpm test` passes
  - [ ] Lighthouse scores noted in follow-up review
  EOF
  )"
  ```

- [ ] **Step 13.3: Monitor Vercel preview deploy**

  ```bash
  gh pr checks --watch
  ```
  Wait for Vercel green check, then share the preview URL with stakeholders.

---

## Follow-up (non-blocking, out of this plan)

- Replace Featured Work placeholder with actual delivered work (client name, URL, screenshot)
- Rotate the exposed secrets (Gmail app password, microCMS API key, REVALIDATE_SECRET)
- Remove legacy `primary` / `accent` / `gold` color palettes from `tailwind.config.js` once confirmed unused
- Redesign detail pages (`/blog/[slug]`, etc.) in a separate plan to match new design system
