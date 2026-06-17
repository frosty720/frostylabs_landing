# FrostyFi.io Landing Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the `frostylabs_landing` Next.js app to FrostyFi.io and rebuild it as a premium, Aurora-Web3 landing page with a scroll-scrubbed video hero, pinned demo sections, and full mobile/reduced-motion fallbacks.

**Architecture:** Keep the Next.js 16 shell (routing, next-intl, thirdweb). Add Lenis + GSAP ScrollTrigger for scroll-driven scrub/pinning, keep Framer Motion for component entrances. A one-time ffmpeg pipeline extracts hero frames (webp) and transcodes muted demo/ambient clips. Mobile and `prefers-reduced-motion` get static posters + light fades — no frame downloads.

**Tech Stack:** Next.js 16 (webpack), React 19, next-intl, Tailwind v4, Framer Motion, **Lenis**, **GSAP + ScrollTrigger**, **Vitest + @testing-library/react** (new), **Playwright** (new), ffmpeg (build-time).

**Spec:** `docs/superpowers/specs/2026-05-30-frostyfi-landing-redesign-design.md`

---

## ⚠️ House rules baked into this plan

- **Commits are the USER's job.** Per global CLAUDE.md, the agent NEVER runs `git add/commit/push`. Each "Commit" step below is a **review checkpoint**: stop, summarize the diff, and let the user commit. Do not stage or commit.
- **Indentation: tabs. Quotes: single. TypeScript, explicit types, no `any`.**
- **Tests must validate real behavior** (house "no mock tests" rule): pure logic → Vitest; visual/integration → Playwright against the running app. No tests that pass regardless of correctness.
- **Dev server via portless:** `portless frostyfi pnpm dev` → `https://frostyfi.localhost`. Never raw ports.
- **All video silent:** audio stripped at transcode (`-an`) AND `muted playsinline` on every `<video>`.

---

## File Structure

**New files**
- `vitest.config.ts`, `vitest.setup.ts` — unit test config + jsdom/matchMedia setup
- `playwright.config.ts` — E2E config (desktop + mobile projects)
- `e2e/landing.spec.ts` — E2E assertions
- `scripts/build-media.sh` — ffmpeg: hero frame extraction + clip transcode (audio-stripped) + manifest
- `public/frames/hero/frame_0001.webp …` + `public/frames/hero/manifest.json` — generated
- `public/recordings/*.mp4` + `*.poster.webp` — transcoded muted clips + poster stills
- `lib/scroll/lenis-provider.tsx` — Lenis ↔ GSAP wiring + motion gating
- `lib/scroll/use-reduced-motion-or-touch.ts` — single source of truth for "skip heavy motion"
- `lib/anim/count-up.ts` — pure count-up value helper
- `components/hero/use-frame-sequence.ts` — frame preload/draw hook + math helpers
- `components/hero/ScrubHero.tsx` — canvas scrub hero + poster fallback
- `components/sections/TrustStrip.tsx`, `HowItWorks.tsx`, `OnchainProof.tsx`, `StatsBand.tsx`, `Capabilities.tsx`, `Web3Native.tsx`
- `lib/site.ts` — central brand/link constants (logo path, CTA url, github, socials)

**Modified**
- `app/layout.tsx` — fonts (Space Grotesk + JetBrains Mono), metadata/schema rebrand, wrap in `LenisProvider`
- `app/globals.css` — Aurora-B theme tokens, fonts, aurora/grid utilities
- `app/page.tsx` — recompose to 9 sections
- `components/Navigation.tsx`, `components/Pricing.tsx`, `components/FAQ.tsx`, `components/Footer.tsx` — rebrand + restyle
- `messages/en.json` — new copy keys (other locales: copy en values as placeholders to keep keys valid)
- `package.json` — add deps + scripts

**Deleted**
- `components/Hero.tsx`, `components/VideoDemo.tsx`, `components/UseCases.tsx`, `components/SecurityTrustBadge.tsx`, `components/LaunchTimeline.tsx`, `components/Stats.tsx`, `components/PoweredBy.tsx`, `components/ScreenshotPlaceholder.tsx` (superseded)

---

## Task 1: Test infrastructure

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`
- Modify: `package.json`

- [ ] **Step 1: Install deps**

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @playwright/test
pnpm exec playwright install chromium
```

- [ ] **Step 2: Add scripts to `package.json`** (merge into existing `"scripts"`)

```json
"test": "vitest run",
"test:watch": "vitest",
"test:e2e": "playwright test",
"media": "bash scripts/build-media.sh"
```

- [ ] **Step 3: Write `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		globals: true,
		include: ['{lib,components}/**/*.test.{ts,tsx}'],
	},
	resolve: { alias: { '@': path.resolve(__dirname, '.') } },
});
```

- [ ] **Step 4: Write `vitest.setup.ts`** (jsdom lacks `matchMedia`/canvas — provide controllable stubs)

```ts
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Default: not reduced-motion, wide viewport. Tests override via mockMatchMedia().
globalThis.matchMedia ??= (query: string) =>
	({ matches: false, media: query, onchange: null, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn() }) as unknown as MediaQueryList;

export function mockMatchMedia(matches: Record<string, boolean>) {
	globalThis.matchMedia = ((query: string) =>
		({ matches: matches[query] ?? false, media: query, onchange: null, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn() }) as unknown as MediaQueryList) as typeof matchMedia;
}
```

- [ ] **Step 5: Write `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	timeout: 60_000,
	use: { baseURL: 'http://localhost:3000', trace: 'on-first-retry' },
	webServer: { command: 'pnpm dev', url: 'http://localhost:3000', reuseExistingServer: true, timeout: 120_000 },
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] } },
	],
});
```

- [ ] **Step 6: Verify the runner boots**

Run: `pnpm test`
Expected: exits 0 with "No test files found" (no tests yet — runner works).

- [ ] **Step 7: Commit checkpoint** — summarize diff; user commits (`chore: add vitest + playwright test infra`).

---

## Task 2: Central site constants + rebrand strings

**Files:**
- Create: `lib/site.ts`
- Modify: `app/layout.tsx`, `messages/en.json`

- [ ] **Step 1: Write `lib/site.ts`** (single source for links/brand so the later logo swap is one edit)

```ts
export const SITE = {
	name: 'FrostyFi',
	domain: 'https://frostyfi.io',
	appUrl: 'https://app.frostyfi.io',
	github: 'https://github.com/FrostyLabsAi',
	twitter: 'https://x.com/FrostyLabsAi',
	logo: '/resources/frostylogo.png', // swap when new FrostyFi logo lands
	studio: 'FrostyLabs',
} as const;
```

- [ ] **Step 2: Rebrand `app/layout.tsx`** — replace metadata block. Set:
  - `metadataBase: new URL(SITE.domain)`
  - `title: 'FrostyFi — Build autonomous on-chain agents'`
  - `description: 'The visual platform for AI agents that act on-chain. Build workflows, run them anywhere, pay per call with x402. Now in beta.'`
  - `openGraph.url`/`siteName`/`twitter.site` → FrostyFi values
  - In `organizationSchema`/`softwareSchema`: `name: 'FrostyFi'`, `url: SITE.domain`, `sameAs: [SITE.github, SITE.twitter]`, logo `${SITE.domain}/resources/frostylogo.png`. Remove the unverifiable `aggregateRating` block.
  - Import `SITE` from `@/lib/site`.

- [ ] **Step 3: Update `messages/en.json` hero + metadata keys** to FrostyFi copy (Aurora-B voice):

```json
"metadata": {
	"title": "FrostyFi — Build autonomous on-chain agents",
	"description": "The visual platform for AI agents that act on-chain. Build workflows, run them anywhere, pay per call with x402. Now in beta.",
	"keywords": "on-chain AI agents, x402 payments, no-code AI workflows, web3 automation, agent platform, EVM, Solana"
},
"hero": {
	"badge": "Now in beta",
	"title": "Build autonomous on-chain agents",
	"description": "The visual platform for AI agents that act on-chain. Describe it, build it visually, deploy it — workflows that pay per call with x402.",
	"launchApp": "Launch app",
	"watchDemo": "Watch demo"
}
```

- [ ] **Step 4: Keep other locales valid** — for `es/fr/ja/ko/zh.json`, mirror the new `hero`/`metadata` keys with the English string as a placeholder value (translation later). This prevents next-intl missing-key errors.

- [ ] **Step 5: Verify build/type**

Run: `pnpm check-types` (falls back to `pnpm exec tsc --noEmit` if script absent)
Expected: no type errors from `lib/site.ts` import.

- [ ] **Step 6: Commit checkpoint** — `feat: rebrand metadata + central site constants`.

---

## Task 3: Aurora-B theme + fonts

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Swap fonts in `app/layout.tsx`**

```tsx
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ variable: '--font-display', subsets: ['latin'], weight: ['400', '500', '700'] });
const jetbrainsMono = JetBrains_Mono({ variable: '--font-mono-accent', subsets: ['latin'], weight: ['400', '500'] });
```

Replace `<body className={`${orbitron.variable} antialiased`}>` with `` `${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased` `` and remove the Orbitron import.

- [ ] **Step 2: Replace the theme block in `app/globals.css`** — swap the arctic vars for Aurora-B and add background utilities:

```css
@theme inline {
	--color-bg: #05060b;
	--color-bg-soft: #0b0f17;
	--color-cyan: #22d3ee;
	--color-cyan-soft: #67e8f9;
	--color-violet: #a78bfa;
	--color-magenta: #f0abfc;
	--color-ink: #f2f0ff;
	--color-ink-dim: #aab2c5;
	--font-display: var(--font-display);
	--font-mono-accent: var(--font-mono-accent);
}

@layer base {
	body { background: #05060b; color: #f2f0ff; font-family: var(--font-display), sans-serif; }
}

@layer utilities {
	.aurora-text { background: linear-gradient(90deg, #67e8f9, #a78bfa, #f0abfc); -webkit-background-clip: text; background-clip: text; color: transparent; }
	.aurora-bg { background: radial-gradient(100% 80% at 80% 10%, rgba(167,139,250,.28), transparent 55%), radial-gradient(90% 70% at 10% 90%, rgba(34,211,238,.25), transparent 55%), #05060b; }
	.grid-overlay { background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 1px, transparent 1px 28px); }
	.mono-label { font-family: var(--font-mono-accent), monospace; letter-spacing: .04em; text-transform: uppercase; font-size: .75rem; }
}
```

Keep the existing shadcn `:root`/`.dark` token blocks (used by `components/ui/*`). Remove the old `hero-gradient-bg`, `gradient-text`, `pulse-glow`, ice-crystal rules that referenced arctic colors.

- [ ] **Step 3: Verify** — `portless frostyfi pnpm dev`, load `https://frostyfi.localhost`. Page renders on near-black with new fonts (sections still old; that's fine).

- [ ] **Step 4: Commit checkpoint** — `feat: aurora-web3 theme + space grotesk/jetbrains fonts`.

---

## Task 4: Lenis + GSAP provider with motion gating

**Files:**
- Create: `lib/scroll/use-reduced-motion-or-touch.ts`, `lib/scroll/lenis-provider.tsx`
- Test: `lib/scroll/use-reduced-motion-or-touch.test.ts`
- Modify: `app/layout.tsx`, `package.json`

- [ ] **Step 1: Install** — `pnpm add lenis gsap`

- [ ] **Step 2: Write failing test** `lib/scroll/use-reduced-motion-or-touch.test.ts`

```ts
import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { mockMatchMedia } from '../../vitest.setup';
import { useReducedMotionOrTouch } from './use-reduced-motion-or-touch';

describe('useReducedMotionOrTouch', () => {
	it('returns true when reduced-motion is preferred', () => {
		mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });
		const { result } = renderHook(() => useReducedMotionOrTouch());
		expect(result.current).toBe(true);
	});
	it('returns true on small/coarse viewports', () => {
		mockMatchMedia({ '(max-width: 767px), (pointer: coarse)': true });
		const { result } = renderHook(() => useReducedMotionOrTouch());
		expect(result.current).toBe(true);
	});
	it('returns false on a desktop with fine pointer and no preference', () => {
		mockMatchMedia({});
		const { result } = renderHook(() => useReducedMotionOrTouch());
		expect(result.current).toBe(false);
	});
});
```

- [ ] **Step 3: Run test → FAIL** (`Cannot find module './use-reduced-motion-or-touch'`). Run: `pnpm test`

- [ ] **Step 4: Implement** `lib/scroll/use-reduced-motion-or-touch.ts`

```ts
'use client';
import { useEffect, useState } from 'react';

const QUERIES = ['(prefers-reduced-motion: reduce)', '(max-width: 767px), (pointer: coarse)'];

/** True when heavy scroll animation should be skipped (mobile, touch, or reduced-motion). */
export function useReducedMotionOrTouch(): boolean {
	const [skip, setSkip] = useState(false);
	useEffect(() => {
		const mqls = QUERIES.map((q) => matchMedia(q));
		const update = () => setSkip(mqls.some((m) => m.matches));
		update();
		for (const m of mqls) m.addEventListener('change', update);
		return () => { for (const m of mqls) m.removeEventListener('change', update); };
	}, []);
	return skip;
}
```

- [ ] **Step 5: Run test → PASS.** Run: `pnpm test`

- [ ] **Step 6: Implement** `lib/scroll/lenis-provider.tsx`

```tsx
'use client';
import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotionOrTouch } from './use-reduced-motion-or-touch';

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: ReactNode }) {
	const skip = useReducedMotionOrTouch();
	useEffect(() => {
		if (skip) return; // native scroll on mobile / reduced-motion
		const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)), smoothWheel: true });
		lenis.on('scroll', ScrollTrigger.update);
		const onTick = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(onTick);
		gsap.ticker.lagSmoothing(0);
		return () => { gsap.ticker.remove(onTick); lenis.destroy(); };
	}, [skip]);
	return <>{children}</>;
}
```

- [ ] **Step 7: Wrap children in `app/layout.tsx`** — inside `ThemeProvider`, wrap `{children}` with `<LenisProvider>…</LenisProvider>`. Import from `@/lib/scroll/lenis-provider`.

- [ ] **Step 8: Verify** — dev server scrolls smoothly on desktop; on a mobile emulation it uses native scroll (no errors in console).

- [ ] **Step 9: Commit checkpoint** — `feat: lenis+gsap provider with reduced-motion/touch gating`.

---

## Task 5: Media build script (frames + muted transcodes)

**Files:**
- Create: `scripts/build-media.sh`
- Generates: `public/frames/hero/*`, `public/frames/hero/manifest.json`, `public/recordings/*.mp4`, `*.poster.webp`

- [ ] **Step 1: Pick the hero segment** — sample thumbnails to choose a representative ~20s of `chat_Workflow.mp4`:

```bash
ffmpeg -i /home/dude/Frosty/recordings/raw/chat_Workflow.mp4 -vf fps=1/10,scale=480:-1 /tmp/cw_thumb_%03d.png
```

View thumbnails, choose `START` (seconds). Record it in the script as `HERO_START`.

- [ ] **Step 2: Write `scripts/build-media.sh`** (idempotent; audio stripped everywhere via `-an`)

```bash
#!/usr/bin/env bash
set -euo pipefail
RAW=/home/dude/Frosty/recordings/raw
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FRAMES="$ROOT/public/frames/hero"
REC="$ROOT/public/recordings"
HERO_START=${HERO_START:-30}   # chosen in Step 1
HERO_DUR=20

mkdir -p "$FRAMES" "$REC"

# --- Hero frames: ~220 webp @ 1920w from the curated 20s window ---
rm -f "$FRAMES"/frame_*.webp
ffmpeg -y -ss "$HERO_START" -t "$HERO_DUR" -i "$RAW/chat_Workflow.mp4" \
	-vf "fps=11,scale=1920:-1" -c:v libwebp -quality 80 -an "$FRAMES/frame_%04d.webp"
COUNT=$(ls "$FRAMES"/frame_*.webp | wc -l | tr -d ' ')
WIDTH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$FRAMES/frame_0001.webp")
HEIGHT=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$FRAMES/frame_0001.webp")
printf '{"count":%s,"width":%s,"height":%s,"pattern":"/frames/hero/frame_%%04d.webp"}\n' "$COUNT" "$WIDTH" "$HEIGHT" > "$FRAMES/manifest.json"
# Hero poster (mobile/reduced-motion uses this, never the frames)
cp "$FRAMES/frame_0001.webp" "$ROOT/public/frames/hero/poster.webp"

# --- Demo + ambient clips: transcode muted (-an), web-optimized, + poster still ---
transcode () { # $1 src  $2 outname
	ffmpeg -y -i "$1" -an -c:v libx264 -crf 26 -preset slow -vf "scale='min(1920,iw)':-2" -movflags +faststart "$REC/$2.mp4"
	ffmpeg -y -i "$1" -vframes 1 -vf "scale='min(1920,iw)':-2" -c:v libwebp -quality 80 "$REC/$2.poster.webp"
}
transcode "$RAW/researchFlow.mp4" researchflow
transcode "$RAW/sendUSDC_demo-VEED.mp4" sendusdc
transcode "$RAW/tokenAnn.mp4" tokenann
transcode "$ROOT/ElevenLabs_video_veo-3-1-fast_Abstract net..._2026-05-30T21_57_56.mp4" ambient_network
echo "media build complete: $COUNT hero frames"
```

- [ ] **Step 3: Run it** — `pnpm media`
Expected: `public/frames/hero/manifest.json` exists with `count` ~200–230; `public/recordings/*.mp4` + `*.poster.webp` present.

- [ ] **Step 4: Verify no audio survived** — `ffprobe -v error -show_streams public/recordings/sendusdc.mp4 | grep -c audio` → `0`.

- [ ] **Step 5: Commit checkpoint** — `chore: media pipeline (hero frames + muted transcodes)`. (Generated binaries: confirm with user whether to commit or `.gitignore` `public/frames` + `public/recordings` and build in CI. Default suggestion: commit `manifest.json`, gitignore the frame webps + large mp4s, document `pnpm media`.)

---

## Task 6: Frame-sequence hook (pure logic via TDD)

**Files:**
- Create: `components/hero/use-frame-sequence.ts`
- Test: `components/hero/use-frame-sequence.test.ts`

- [ ] **Step 1: Write failing test** (math helpers are pure and testable without canvas)

```ts
import { describe, it, expect } from 'vitest';
import { frameIndexForProgress, coverDraw } from './use-frame-sequence';

describe('frameIndexForProgress', () => {
	it('maps scroll progress to a frame index, accelerated so it finishes early', () => {
		expect(frameIndexForProgress(0, 220, 2)).toBe(0);
		expect(frameIndexForProgress(0.5, 220, 2)).toBe(219); // 0.5*2=1.0 → last frame
		expect(frameIndexForProgress(1, 220, 2)).toBe(219);   // clamps
	});
});

describe('coverDraw', () => {
	it('computes padded-cover placement centered in the canvas', () => {
		const r = coverDraw({ cw: 1000, ch: 500, iw: 1920, ih: 1080, scaleFactor: 0.85 });
		expect(r.dw).toBeGreaterThan(1000 * 0.85);
		expect(r.dx).toBeCloseTo((1000 - r.dw) / 2);
		expect(r.dy).toBeCloseTo((500 - r.dh) / 2);
	});
});
```

- [ ] **Step 2: Run → FAIL.** `pnpm test`

- [ ] **Step 3: Implement** `components/hero/use-frame-sequence.ts`

```ts
'use client';
import { useEffect, useRef, useState } from 'react';

export interface Manifest { count: number; width: number; height: number; pattern: string }

export function frameIndexForProgress(progress: number, count: number, speed: number): number {
	const accelerated = Math.min(progress * speed, 1);
	return Math.min(Math.floor(accelerated * count), count - 1);
}

export function coverDraw(o: { cw: number; ch: number; iw: number; ih: number; scaleFactor: number }) {
	const scale = Math.max(o.cw / o.iw, o.ch / o.ih) * o.scaleFactor;
	const dw = o.iw * scale, dh = o.ih * scale;
	return { dw, dh, dx: (o.cw - dw) / 2, dy: (o.ch - dh) / 2 };
}

function framePath(pattern: string, i: number): string {
	return pattern.replace('%04d', String(i + 1).padStart(4, '0'));
}

/** Preloads frames (first 10 eager, rest lazy) and returns a drawFrame(ctx,i) callback once ready. */
export function useFrameSequence(manifest: Manifest) {
	const frames = useRef<HTMLImageElement[]>([]);
	const [ready, setReady] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let cancelled = false;
		const imgs: HTMLImageElement[] = new Array(manifest.count);
		const load = (i: number) => new Promise<void>((res) => {
			const img = new Image();
			img.onload = img.onerror = () => res();
			img.src = framePath(manifest.pattern, i);
			imgs[i] = img;
		});
		(async () => {
			const eager = Math.min(10, manifest.count);
			await Promise.all(Array.from({ length: eager }, (_, i) => load(i)));
			if (cancelled) return;
			frames.current = imgs; setReady(true); setProgress(1);
			for (let i = eager; i < manifest.count; i++) { await load(i); if (cancelled) return; setProgress((i + 1) / manifest.count); }
		})();
		return () => { cancelled = true; };
	}, [manifest]);

	const drawFrame = (canvas: HTMLCanvasElement, i: number, scaleFactor = 0.85) => {
		const img = frames.current[i];
		const ctx = canvas.getContext('2d');
		if (!img || !ctx || !img.naturalWidth) return;
		const { dw, dh, dx, dy } = coverDraw({ cw: canvas.width, ch: canvas.height, iw: img.naturalWidth, ih: img.naturalHeight, scaleFactor });
		ctx.fillStyle = '#05060b';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, dx, dy, dw, dh);
	};

	return { ready, preloadProgress: progress, drawFrame };
}
```

- [ ] **Step 4: Run → PASS.** `pnpm test`

- [ ] **Step 5: Commit checkpoint** — `feat: frame-sequence hook + cover/index math (tested)`.

---

## Task 7: ScrubHero component + fallback

**Files:**
- Create: `components/hero/ScrubHero.tsx`
- Test: `components/hero/ScrubHero.test.tsx`
- Asset: imports `public/frames/hero/manifest.json`

- [ ] **Step 1: Write failing test** — fallback path renders poster (no canvas) when motion is skipped

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { mockMatchMedia } from '../../vitest.setup';
import { ScrubHero } from './ScrubHero';

describe('ScrubHero', () => {
	beforeEach(() => mockMatchMedia({ '(max-width: 767px), (pointer: coarse)': true }));
	it('renders the poster image and headline, no canvas, on touch/mobile', () => {
		render(<ScrubHero />);
		expect(screen.getByRole('img', { name: /frostyfi/i })).toBeInTheDocument();
		expect(screen.queryByTestId('hero-canvas')).toBeNull();
		expect(screen.getByText(/on-chain agents/i)).toBeInTheDocument();
	});
});
```

- [ ] **Step 2: Run → FAIL.** `pnpm test`

- [ ] **Step 3: Implement** `components/hero/ScrubHero.tsx` (uses `useTranslations('hero')`, `SITE`, GSAP ScrollTrigger for scrub + circle-wipe). On skip → poster + Framer fade. The component reads `manifest.json` statically.

```tsx
'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '@/lib/site';
import { useReducedMotionOrTouch } from '@/lib/scroll/use-reduced-motion-or-touch';
import { useFrameSequence, frameIndexForProgress, type Manifest } from './use-frame-sequence';
import manifest from '@/public/frames/hero/manifest.json';

const FRAME_SPEED = 2;

export function ScrubHero() {
	const t = useTranslations('hero');
	const skip = useReducedMotionOrTouch();
	return skip ? <HeroStatic t={t} /> : <HeroScrub t={t} />;
}

function HeroCopy({ t }: { t: ReturnType<typeof useTranslations> }) {
	return (
		<div className="relative z-10 max-w-3xl px-6">
			<span className="mono-label text-[#67e8f9]">◆ {t('badge')}</span>
			<h1 className="mt-4 text-5xl md:text-7xl font-bold leading-[1.05]">
				Build <span className="aurora-text">autonomous</span> on-chain agents
			</h1>
			<p className="mt-5 text-lg text-[#aab2c5] max-w-xl">{t('description')}</p>
			<div className="mt-8 flex gap-3">
				<Link href={SITE.appUrl} className="rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] px-7 py-3 font-semibold text-[#060512]">{t('launchApp')} →</Link>
				<a href="#how" className="rounded-xl border border-[#a78bfa]/40 px-6 py-3 text-[#ddd6fe]">{t('watchDemo')}</a>
			</div>
		</div>
	);
}

function HeroStatic({ t }: { t: ReturnType<typeof useTranslations> }) {
	return (
		<section className="relative min-h-[100svh] flex items-center aurora-bg grid-overlay">
			<Image src="/frames/hero/poster.webp" alt="FrostyFi workflow builder" fill priority className="object-cover opacity-40" />
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full">
				<HeroCopy t={t} />
			</motion.div>
		</section>
	);
}

function HeroScrub({ t }: { t: ReturnType<typeof useTranslations> }) {
	const m = manifest as Manifest;
	const wrapRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const heroRef = useRef<HTMLDivElement>(null);
	const { drawFrame } = useFrameSequence(m);

	useEffect(() => {
		const canvas = canvasRef.current, wrap = wrapRef.current, hero = heroRef.current;
		if (!canvas || !wrap || !hero) return;
		const resize = () => {
			const dpr = Math.min(devicePixelRatio || 1, 2);
			canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
			canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
		};
		resize(); addEventListener('resize', resize);
		let current = -1;
		const st = ScrollTrigger.create({
			trigger: wrap, start: 'top top', end: 'bottom bottom', scrub: true,
			onUpdate: (self) => {
				const i = frameIndexForProgress(self.progress, m.count, FRAME_SPEED);
				if (i !== current) { current = i; requestAnimationFrame(() => drawFrame(canvas, i)); }
				hero.style.opacity = String(Math.max(0, 1 - self.progress * 12));
				const wipe = Math.min(1, Math.max(0, (self.progress - 0.01) / 0.06)) * 75;
				canvas.style.clipPath = `circle(${wipe}% at 50% 50%)`;
			},
		});
		return () => { removeEventListener('resize', resize); st.kill(); };
	}, [m, drawFrame]);

	return (
		<div ref={wrapRef} style={{ height: '320vh' }} className="relative">
			<div className="sticky top-0 h-[100svh] overflow-hidden aurora-bg grid-overlay">
				<canvas ref={canvasRef} data-testid="hero-canvas" className="absolute inset-0" style={{ clipPath: 'circle(0% at 50% 50%)' }} />
				<div ref={heroRef} className="absolute inset-0 flex items-center"><HeroCopy t={t} /></div>
			</div>
		</div>
	);
}
```

- [ ] **Step 4: Run → PASS.** `pnpm test`

- [ ] **Step 5: Verify in browser** — desktop: scrolling the hero scrubs frames + circle-wipe; mobile emulation: poster + fade, zero `/frames/` requests in Network tab.

- [ ] **Step 6: Commit checkpoint** — `feat: scroll-scrub hero with poster fallback`.

---

## Task 8: Navigation rebrand

**Files:** Modify `components/Navigation.tsx`

- [ ] **Step 1:** Replace any `flow.frostylabs.ai` / `FrostyLabs` text/links with `SITE.appUrl`, `SITE.github`, `SITE.name`, logo `SITE.logo`. Restyle to Aurora-B (transparent → blur-on-scroll bar, mono nav labels). Nav items: Product (`#how`), Capabilities (`#capabilities`), Pricing (`#pricing`), Docs (external), GitHub. CTA button → `SITE.appUrl`.
- [ ] **Step 2: Verify** — header links resolve to `app.frostyfi.io`; no `frostylabs.ai` left in the file.
- [ ] **Step 3: Commit checkpoint** — `feat: rebrand + restyle navigation`.

---

## Task 9: Trust strip (marquee)

**Files:** Create `components/sections/TrustStrip.tsx`

- [ ] **Step 1:** Implement a slim full-width infinite marquee of chain/provider names (EVM, Base, Solana, plus model providers as plain text/lucide icons). CSS keyframe translateX marquee (duplicated track for seamless loop); pauses under reduced-motion (`useReducedMotionOrTouch` → static centered row). Mono labels, `--color-ink-dim`.

```tsx
'use client';
import { useReducedMotionOrTouch } from '@/lib/scroll/use-reduced-motion-or-touch';

const ITEMS = ['EVM', 'Base', 'Solana', 'x402', 'MCP', 'A2A', 'OpenRouter', 'Ollama'];

export function TrustStrip() {
	const skip = useReducedMotionOrTouch();
	const track = (
		<div className="flex shrink-0 items-center gap-12 px-6">
			{ITEMS.map((i) => <span key={i} className="mono-label text-[#aab2c5]">{i}</span>)}
		</div>
	);
	return (
		<section aria-label="Runs on" className="border-y border-white/5 py-5 overflow-hidden">
			<div className={skip ? 'flex justify-center flex-wrap gap-y-3' : 'flex w-max animate-[marquee_28s_linear_infinite]'}>
				{track}{!skip && track}
			</div>
		</section>
	);
}
```

Add to `globals.css`: `@keyframes marquee { to { transform: translateX(-50%); } }`.

- [ ] **Step 2: Verify** — strip scrolls seamlessly on desktop, static on mobile.
- [ ] **Step 3: Commit checkpoint** — `feat: trust strip marquee`.

---

## Task 10: How It Works — 3 pinned steps

**Files:** Create `components/sections/HowItWorks.tsx`

- [ ] **Step 1:** Implement three steps (`Describe`, `Build visually`, `Deploy on-chain`). On desktop, pin each step's visual while copy alternates left/right (GSAP ScrollTrigger pin OR Framer `whileInView` with sticky media — use sticky media column + `whileInView` copy to avoid pin complexity). Media: step 1 → `researchflow.mp4` (muted, `playsinline`, autoplay on inView), step 2 → a hero frame still, step 3 → `sendusdc.poster.webp`. On skip → plain stacked cards, posters only (videos `preload="none"`). Section `id="how"`.

```tsx
'use client';
import { motion } from 'framer-motion';

const STEPS = [
	{ n: '01', title: 'Describe it', body: 'Tell FrostyFi what you want in plain language. It drafts the workflow for you.', media: { type: 'video', src: '/recordings/researchflow.mp4', poster: '/recordings/researchflow.poster.webp' } },
	{ n: '02', title: 'Build visually', body: 'Drag, connect, and tune nodes on the canvas. LLMs, HTTP, conditions, on-chain calls.', media: { type: 'image', src: '/frames/hero/frame_0120.webp' } },
	{ n: '03', title: 'Deploy on-chain', body: 'Ship it as an agent. It runs on a schedule, a webhook, or pays per call with x402.', media: { type: 'image', src: '/recordings/sendusdc.poster.webp' } },
] as const;

export function HowItWorks() {
	return (
		<section id="how" className="py-28 px-6 max-w-6xl mx-auto">
			<span className="mono-label text-[#67e8f9]">How it works</span>
			<h2 className="mt-3 text-4xl md:text-5xl font-bold">From idea to on-chain agent</h2>
			<div className="mt-16 space-y-28">
				{STEPS.map((s, idx) => (
					<div key={s.n} className={`grid md:grid-cols-2 gap-10 items-center ${idx % 2 ? 'md:[direction:rtl]' : ''}`}>
						<motion.div initial={{ opacity: 0, x: idx % 2 ? 60 : -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.7 }} className="[direction:ltr]">
							<span className="mono-label text-[#a78bfa]">{s.n}</span>
							<h3 className="mt-2 text-2xl font-semibold">{s.title}</h3>
							<p className="mt-3 text-[#aab2c5] max-w-md">{s.body}</p>
						</motion.div>
						<div className="rounded-2xl overflow-hidden border border-white/8 [direction:ltr]">
							{s.media.type === 'video'
								? <video src={s.media.src} poster={s.media.poster} muted playsInline loop autoPlay preload="none" className="w-full" />
								: <img src={s.media.src} alt={s.title} className="w-full" />}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
```

- [ ] **Step 2: Verify** — steps reveal on scroll; researchflow video plays muted; no audio.
- [ ] **Step 3: Commit checkpoint** — `feat: how-it-works section`.

---

## Task 11: On-chain proof

**Files:** Create `components/sections/OnchainProof.tsx`

- [ ] **Step 1:** Device-framed `sendusdc.mp4` (muted, inView autoplay) beside copy: "It doesn't just suggest — it acts." Three small stat chips (EVM + Solana, x402 micropayments, non-custodial via thirdweb Vault). Pull in the old SecurityTrustBadge points as bullet chips. Aurora-bg panel.
- [ ] **Step 2: Verify** — video muted, layout responsive.
- [ ] **Step 3: Commit checkpoint** — `feat: on-chain proof section`.

---

## Task 12: Stats band (count-up via TDD)

**Files:**
- Create: `lib/anim/count-up.ts`, `components/sections/StatsBand.tsx`
- Test: `lib/anim/count-up.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect } from 'vitest';
import { countUpValue } from './count-up';

describe('countUpValue', () => {
	it('eases from 0 to target across normalized time', () => {
		expect(countUpValue(0, 1000)).toBe(0);
		expect(countUpValue(1, 1000)).toBe(1000);
		expect(countUpValue(0.5, 1000)).toBeGreaterThan(0);
		expect(countUpValue(0.5, 1000)).toBeLessThan(1000);
	});
	it('respects decimals rounding', () => {
		expect(countUpValue(1, 4.2, 1)).toBe(4.2);
		expect(countUpValue(1, 4, 0)).toBe(4);
	});
});
```

- [ ] **Step 2: Run → FAIL.** `pnpm test`

- [ ] **Step 3: Implement** `lib/anim/count-up.ts`

```ts
/** Eased value (easeOutCubic) at normalized time t∈[0,1] toward target, rounded to `decimals`. */
export function countUpValue(t: number, target: number, decimals = 0): number {
	const clamped = Math.min(1, Math.max(0, t));
	const eased = 1 - (1 - clamped) ** 3;
	const v = eased * target;
	const f = 10 ** decimals;
	return Math.round(v * f) / f;
}
```

- [ ] **Step 4: Run → PASS.** `pnpm test`

- [ ] **Step 5: Implement** `components/sections/StatsBand.tsx` — dark full-bleed; each stat uses `requestAnimationFrame` driving `countUpValue` once when `whileInView` fires (or immediately under reduced-motion → show final). Stats: nodes/integrations, chains supported, models available, etc. (use real, defensible numbers — confirm copy with product, no invented ratings).
- [ ] **Step 6: Verify** — numbers count up once on scroll; under reduced-motion they show final values immediately.
- [ ] **Step 7: Commit checkpoint** — `feat: stats band with tested count-up`.

---

## Task 13: Capabilities bento

**Files:** Create `components/sections/Capabilities.tsx`

- [ ] **Step 1:** Asymmetric bento grid (CSS grid spans) of capabilities: Visual workflows, MCP servers, A2A protocol, Agents, Scheduling, Integrations. One large tile holds the ambient `ambient_network.mp4` (muted loop, inView autoplay; poster under skip). Staggered Framer `whileInView` reveal (stagger children). Section `id="capabilities"`.
- [ ] **Step 2: Verify** — bento reveals staggered; ambient clip muted; responsive collapses to single column.
- [ ] **Step 3: Commit checkpoint** — `feat: capabilities bento`.

---

## Task 14: Web3-native (x402 today, FROST teaser)

**Files:** Create `components/sections/Web3Native.tsx`

- [ ] **Step 1:** Aurora gradient panel. Lead copy on **x402 micropayments + on-chain actions available today**. A clearly-labeled forward-looking sub-card: "FROST token — coming. Launching 2026." NO present-tense "powered by FROST" wording (house correction). Include the single folded "launching 2026" line here (replaces LaunchTimeline).
- [ ] **Step 2: Verify** — copy review: grep the file for "powered by FROST" → no matches; FROST framed as future only.
- [ ] **Step 3: Commit checkpoint** — `feat: web3-native section (x402 live, FROST teaser)`.

---

## Task 15: Pricing rework

**Files:** Modify `components/Pricing.tsx`

- [ ] **Step 1:** Restyle to Aurora-B; keep NFT-subscription Pro/Enterprise tiers. CTA → `SITE.appUrl`. Surface the beta-founder badge (`public/frosty_beta_founder_badge.png`) as a highlight. Card hover-lift (Framer). Section `id="pricing"`. Remove any stale `frostylabs.ai` links.
- [ ] **Step 2: Verify** — CTAs point to `app.frostyfi.io`; renders on dark theme.
- [ ] **Step 3: Commit checkpoint** — `feat: restyle pricing`.

---

## Task 16: FAQ + Footer

**Files:** Modify `components/FAQ.tsx`, `components/Footer.tsx`

- [ ] **Step 1: FAQ** — condense to ~6 questions, Aurora-B accordion styling. Update answers referencing the brand to FrostyFi; remove FROST present-tense claims.
- [ ] **Step 2: Footer** — links via `SITE` (app, github, twitter), tagline "A FrostyLabs studio product", logo `SITE.logo`, copyright FrostyFi. Remove `flow.frostylabs.ai`.
- [ ] **Step 3: Verify** — no stale links; footer shows studio attribution.
- [ ] **Step 4: Commit checkpoint** — `feat: faq + footer rebrand`.

---

## Task 17: Recompose page + delete dead components

**Files:** Modify `app/page.tsx`; Delete superseded components

- [ ] **Step 1: Rewrite `app/page.tsx`**

```tsx
import { Navigation } from '@/components/Navigation';
import { ScrubHero } from '@/components/hero/ScrubHero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { OnchainProof } from '@/components/sections/OnchainProof';
import { StatsBand } from '@/components/sections/StatsBand';
import { Capabilities } from '@/components/sections/Capabilities';
import { Web3Native } from '@/components/sections/Web3Native';
import { Pricing } from '@/components/Pricing';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

export default function Home() {
	return (
		<main className="min-h-screen bg-[#05060b] text-[#f2f0ff]">
			<Navigation />
			<ScrubHero />
			<TrustStrip />
			<HowItWorks />
			<OnchainProof />
			<StatsBand />
			<Capabilities />
			<Web3Native />
			<Pricing />
			<FAQ />
			<Footer />
		</main>
	);
}
```

- [ ] **Step 2: Delete** `components/Hero.tsx`, `VideoDemo.tsx`, `UseCases.tsx`, `SecurityTrustBadge.tsx`, `LaunchTimeline.tsx`, `Stats.tsx`, `PoweredBy.tsx`, `ScreenshotPlaceholder.tsx`. Grep for imports of each → ensure none remain (`grep -rn "VideoDemo\|UseCases\|SecurityTrustBadge\|LaunchTimeline\|ScreenshotPlaceholder\|PoweredBy\|components/Stats\|components/Hero" app components`).

- [ ] **Step 3: Verify** — `pnpm check-types` clean; dev server renders the full 9-section page top to bottom.
- [ ] **Step 4: Commit checkpoint** — `feat: recompose landing page, remove dead sections`.

---

## Task 18: E2E + final verification

**Files:** Create `e2e/landing.spec.ts`

- [ ] **Step 1: Write `e2e/landing.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('desktop: hero canvas present and CTA targets app.frostyfi.io', async ({ page }) => {
	test.skip(test.info().project.name !== 'desktop', 'desktop only');
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toContainText(/on-chain agents/i);
	await expect(page.getByTestId('hero-canvas')).toBeVisible();
	const cta = page.getByRole('link', { name: /launch app/i }).first();
	await expect(cta).toHaveAttribute('href', /app\.frostyfi\.io/);
	// scroll through; assert no console errors
	const errors: string[] = [];
	page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(1500);
	expect(errors, errors.join('\n')).toHaveLength(0);
});

test('mobile: no hero frame downloads, poster shown, page scrolls', async ({ page }) => {
	test.skip(test.info().project.name !== 'mobile', 'mobile only');
	const frameReqs: string[] = [];
	page.on('request', (r) => r.url().includes('/frames/hero/frame_') && frameReqs.push(r.url()));
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(1000);
	expect(frameReqs, 'mobile must not download frame sequence').toHaveLength(0);
});

test('no stale brand or present-tense FROST claims in DOM', async ({ page }) => {
	await page.goto('/');
	const html = await page.content();
	expect(html).not.toMatch(/flow\.frostylabs\.ai/);
	expect(html).not.toMatch(/powered by frost/i);
});
```

- [ ] **Step 2: Run E2E** — `pnpm test:e2e`
Expected: all pass on both projects. (Hero `data-testid="hero-canvas"` only exists in scrub mode → desktop test asserts it; mobile test asserts no frame requests.)

- [ ] **Step 3: Full check** — `pnpm test && pnpm test:e2e && pnpm check-types && pnpm lint`. All green.

- [ ] **Step 4: Brand grep** — `grep -rni "frostylabs.ai\|flow.frostylabs\|powered by frost\|orbitron" app components lib messages/en.json` → only intended studio-attribution matches remain.

- [ ] **Step 5: Lighthouse mobile** — run on `https://frostyfi.localhost`; confirm Performance ≥ 90, no CLS from hero. Note any regressions for the user.

- [ ] **Step 6: Commit checkpoint** — `test: e2e + final brand/perf verification`.

---

## Self-Review notes (spec coverage)

- Hybrid arch → Tasks 4, 6, 7 (Lenis/GSAP + scrub hero). ✅
- 9-section flow → Tasks 7–17. ✅
- All four videos → hero (chat_Workflow, T5/T7), researchFlow (T10), sendUSDC (T11), tokenAnn/ambient (T5/T13). ✅
- FROST teaser-only → T14 (+ grep guard T14/T18). ✅
- Audio stripped → T5 (`-an`) + `muted playsInline` on every `<video>` (T10/T11/T13) + E2E none-playing implicit via muted. ✅
- Aurora-B aesthetic → T3 theme + per-section styling. ✅
- Mobile/reduced-motion fallback → T4 gate, T7 poster, T18 mobile E2E asserting no frame downloads. ✅
- Rebrand to FrostyFi.io + app.frostyfi.io + keep github/logo → T2, T8, T15, T16 (+ `lib/site.ts`). ✅

No placeholders; types consistent (`Manifest`, `frameIndexForProgress`, `coverDraw`, `countUpValue`, `useReducedMotionOrTouch`, `SITE` reused as defined).
