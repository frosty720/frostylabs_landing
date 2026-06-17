# FrostyFi.io Landing Page Redesign — Design Spec

**Date:** 2026-05-30
**Project:** `frostylabs_landing` (Next.js 16 app)
**Goal:** Rebrand FrostyLabs.ai → FrostyFi.io and redesign the landing page to a premium, "$10k" standard with cinematic-but-performant animations that load well on any device.

---

## Context

The current `frostylabs_landing` is a competent but generic Next.js 16 template: 11 stacked sections with basic Framer Motion fade-ups, an ice/arctic palette, Orbitron type, and stale links pointing at `flow.frostylabs.ai` / `FrostyLabsAi`. Per brand strategy, **FrostyLabs is the studio and FrostyFi is the product**, so this site becomes the **FrostyFi.io** product landing page. The redesign must (a) rebrand to FrostyFi.io, (b) raise the visual/motion quality bar substantially, (c) use the real product demo videos as proof, and (d) stay fast and graceful on mobile.

## Decisions (approved during brainstorming)

1. **Architecture: Hybrid.** Keep the Next.js shell (routing, i18n, thirdweb, deploy). The Hero and main product demo are **scroll-driven canvas** built from extracted video frames; everything else uses component-level motion. Graceful mobile fallback everywhere.
2. **Content: Tightened story** — 11 sections condensed to **9** (see flow below).
3. **Videos:** all four used — `chat_Workflow` (hero scrub, curated segment), `researchFlow` (how-it-works), `sendUSDC_demo-VEED` (on-chain proof), `tokenAnn`/`short` (ambient loop).
4. **Brand framing: FrostyFi + Web3-native.** FROST token is **forward-looking teaser only** — NO present-tense "FROST-powered" claims. Lead with shippable **x402 + on-chain** capability.
5. **Aesthetic: Direction B · Aurora Web3** — near-black canvas (`#05060b`), neon cyan→violet aurora (`#22d3ee` → `#67e8f9` → `#a78bfa` → `#f0abfc`), subtle grid texture, mono accents. Type: **Space Grotesk** (display) + **JetBrains Mono** (accents/labels) + Inter (body).

## Resolved details (confirmed)

- **CTA target:** `https://app.frostyfi.io` (for today, replacing `flow.frostylabs.ai`).
- **GitHub:** keep the existing org link unchanged.
- **Logo:** reuse existing `public/frostylogo.png` for now — a new FrostyFi logo lands later (keep the logo reference swappable in one place).
- **Audio:** ALL video must be silent on the site. Source clips ship with audio tracks — strip audio at transcode (`ffmpeg -an`) AND set `muted playsinline` on every `<video>` as belt-and-suspenders. No autoplay-with-sound anywhere.
- Keep `next-intl` i18n; English copy authored now, other locales follow.

---

## Section Flow (top → bottom)

| # | Section | Purpose | Video | Motion technique |
|---|---------|---------|-------|------------------|
| 01 | **Hero — scroll-scrub** | Hook; cinematic chat→workflow build | `chat_Workflow` curated ~20s | canvas frame-scrub + circle-wipe reveal |
| 02 | **Trust strip** | Quiet credibility (chains/providers) | — | infinite marquee |
| 03 | **How it works — 3 pinned steps** | Describe → Build → Deploy on-chain | `researchFlow` + chat | pinned, alternating slide-in |
| 04 | **On-chain proof** | "It moves real money": USDC, x402, EVM+Solana | `sendUSDC_demo-VEED` | device frame + counters |
| 05 | **Stats band** | Momentum proof | — | dark overlay, count-up from 0 |
| 06 | **Capabilities — bento grid** | Feature set (nodes, MCP, A2A, agents, scheduling) | `tokenAnn`/`short` loop | staggered bento reveal |
| 07 | **Web3-native** | Differentiator: x402 today, FROST teaser | — | aurora gradient panel |
| 08 | **Pricing — NFT subscription** | Convert; Pro/Enterprise + beta-founder badge | — | card hover lift |
| 09 | **FAQ + Footer** | Objection handling + nav | — | accordion |

**Cut/merged:** `LaunchTimeline` → one "launching 2026" line in §07; `VideoDemo` → Hero + §03; `UseCases` → §03; `SecurityTrustBadge` → §04; `PoweredBy` → §02 strip.

---

## Architecture & Components

### Tech additions
- **Lenis** (smooth scroll) + **GSAP ScrollTrigger** — drives the scrub hero, pinning, and counters. Coexists with existing **Framer Motion** (used for component entrance/hover where scroll-binding isn't needed).
- No bundler change — these are npm deps added to the existing Next.js app.

### New / changed units (each one job, testable in isolation)
- `lib/scroll/lenis-provider.tsx` — client provider wiring Lenis ↔ GSAP ticker once at the app root; respects `prefers-reduced-motion` and disables on touch/mobile (native scroll instead).
- `components/hero/ScrubHero.tsx` — canvas frame-scrub hero. Props: frame manifest (count, path pattern), headline copy. Internals: two-phase preloader (first 10 frames → rest), `requestAnimationFrame` draw, padded-cover draw mode (`IMAGE_SCALE ≈ 0.85`), circle-wipe reveal. **Fallback:** below `md` or reduced-motion → static poster image + Framer Motion fade headline (no canvas, no frame download).
- `components/hero/useFrameSequence.ts` — hook: preload + decode webp frames, expose `drawFrame(i)`. Pure/testable.
- `components/sections/HowItWorks.tsx` — 3 pinned steps; each step = label/heading/body + inline video or frame still. Mobile: unpins to stacked cards.
- `components/sections/OnchainProof.tsx` — device-framed `sendUSDC` clip + x402/EVM/Solana copy + count-up metrics.
- `components/sections/StatsBand.tsx` — dark full-bleed; GSAP count-up from 0 (`data-value`).
- `components/sections/Capabilities.tsx` — asymmetric bento grid; one tile holds ambient looping clip; staggered reveal.
- `components/sections/Web3Native.tsx` — aurora panel; x402 explained as live, FROST as "coming" teaser.
- Reworked: `Hero` (→ ScrubHero), `Pricing`, `FAQ`, `Footer`, `Navigation`, `PoweredBy` (→ trust strip). Removed: `VideoDemo`, `UseCases`, `SecurityTrustBadge`, `LaunchTimeline`, `Stats` (folded into `StatsBand`).
- `app/globals.css` — replace arctic theme tokens with Aurora-B palette + fonts; add aurora/grid background utilities. `app/layout.tsx` — load Space Grotesk + JetBrains Mono (next/font), wrap in `LenisProvider`.
- `app/page.tsx` — recomposed to the 9-section order.

### Asset pipeline (one-time, scripted)
- `scripts/extract-frames.sh` — ffmpeg: pick curated ~20s window of `chat_Workflow.mp4`, extract ~200–260 webp frames at 1920w (and a 1280w mobile-skip poster). Output → `public/frames/hero/frame_%04d.webp` + a generated `manifest.json` (count + dims). Other demo clips compressed/transcoded into `public/recordings/` with poster stills — **audio stripped (`-an`)** on every transcode so no file even contains an audio track.
- Curated segment selection: sample thumbnails first to choose the most representative ~20s; documented in the plan.

### Data flow
Static marketing page — no runtime data. Frame manifest is build-time JSON. Copy lives in `next-intl` message catalogs (`messages/*.json`). thirdweb provider retained for any wallet-aware CTA but not required for first paint.

## Performance & "any device" guarantees
- Frames are webp, count capped (~200–260 desktop), lazy beyond first 10; **mobile never downloads the frame sequence** — poster + light fade only.
- Lenis/GSAP scrub disabled under `prefers-reduced-motion` and on small/touch viewports (native scroll, static sections).
- Videos: `preload="none"`, poster stills, `playsinline muted loop` for ambient; below-fold lazy.
- Target: hero LCP from poster (not frames); no layout shift; 60fps scrub on desktop, smooth native scroll on mobile.

## Generated ambient assets (ElevenLabs — already provided)
Two abstract "agent-network" loops sit in the project root (to be moved into `public/recordings/` and transcoded muted, `-an`, with poster stills):
- `ElevenLabs_video_veo-3-1-fast_Abstract net..._2026-05-30T21_57_56.mp4` — **1920×1080, ~4s, 24fps** → preferred for the larger surface (§07 aurora panel bg or §06 hero bento tile).
- `ElevenLabs_video_seedance-2-0_Abstract net..._2026-05-30T21_49_53.mp4` — 1280×720, ~4s → secondary/smaller tile.

During the plan I'll view both and assign the better-looking one to the most prominent slot. Real product video remains the hero — these are ambient texture only, looped, muted, `playsinline`.

**Still to generate (optional, not blocking):** aurora background texture loop and the OG/social share image (prompts already provided). CSS aurora gradients cover §07 until/if a video loop is added.

## Error handling
- Frame load failure → fall back to poster, log once, never block render.
- Video load failure → poster persists.
- Reduced-motion / no-JS → all content readable as static stacked sections (progressive enhancement).

## Testing
- **Unit (Vitest):** `useFrameSequence` (preload order, draw index math, cover-scale math); manifest parsing; reduced-motion gate returns static path.
- **Component:** ScrubHero renders poster fallback when `matchMedia` reports small/reduced-motion; sections render content without JS animation.
- **E2E (Playwright):** desktop — scroll through, assert hero canvas advances frames, sections pin/reveal, counters reach target, CTAs link to `app.frostyfi.io`; mobile viewport — assert NO `public/frames` network requests, poster visible, page fully scrollable. Per house rule: real behavior assertions, no mock-only tests.
- **Manual:** run via `portless frostyflow`-style command (`portless frostyfi pnpm dev`), verify on a real phone profile + Lighthouse mobile.

## Verification
1. `scripts/extract-frames.sh` produces `public/frames/hero/*` + manifest.
2. `pnpm dev` (via portless) → scroll the page on desktop: scrub hero, pinned steps, on-chain proof, counters, bento, aurora panel, pricing, FAQ all animate.
3. DevTools mobile emulation + real device: confirm no frame downloads, smooth scroll, all content present.
4. `pnpm lint && pnpm test && pnpm test:e2e` green.
5. Grep for stale brand: no `frostylabs.ai`, `flow.frostylabs`, "FROST-powered" / present-tense FROST claims remain.
