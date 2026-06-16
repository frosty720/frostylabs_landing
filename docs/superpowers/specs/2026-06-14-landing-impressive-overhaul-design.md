# FrostyFi Landing — "Impressive" Overhaul (design)

**Date:** 2026-06-14
**Project:** `frostylabs_landing/` (standalone Next 16, Aurora theme, serves `frostylabs.localhost` dev / `frostylabs.ai` prod)
**Status:** approved (spine + 4 agents + structure + phasing); Phase 1 in progress.

## Problem
The page doesn't "click." Root causes (from review):
1. **Same arb-scanner shots reused 5×** → reads as a single-purpose arb bot, not a platform.
   - `heroV1.png` → Hero **and** HowItWorks 02
   - `heroV1Findings.png` → HowItWorks 03 **and** OnchainProof
2. **Hero is a static flowchart** — no motion, no 5-second "aha".
3. **Copy leads with abstraction + jargon** (x402 to a cold visitor); ~5 section headers are variations of "…on-chain…".
4. **"Watch demo" is a broken promise** — scrolls to static images (`#how`).

## The spine (positioning)
> Describe an AI agent in plain English. FrostyFi builds it as a visual workflow and runs it
> autonomously — trading, research, content, payments — with real on-chain execution.

Hero proves *describe → build → run*. Showcase proves *…can be anything*. Proof block proves *…really on-chain*.

## The 4 featured agents (kills "one arb bot")
| # | Agent | Shows off | Status |
|---|-------|-----------|--------|
| 1 | Cross-DEX Arb Scanner (trading) | DEX + Hyperliquid nodes, Vault signing, Telegram | built (wf 11333764) |
| 2 | Daily Alpha Brief (research) | web search → LLM (OpenRouter) → scheduled digest | build |
| 3 | Auto-Poster (content/multimodal) | image-gen + caption + post (new media nodes) | build |
| 4 | Gas Oracle · x402 (paid API) | deploy-as-agent, x402, ERC-8004 identity #54630 | real/live |

## Target page structure
- **Hero** — animated product loop (real clip: prompt → nodes assemble → Run → green → result). "Watch demo" opens the clip (modal or scrolls to a real video), not static images.
- **How it works** — 3 steps, each with its OWN distinct shot (no reuse).
- **NEW "What you can build"** — the 4-agent showcase (clip/still + one-liner each). New centerpiece = "platform".
- **On-chain proof** — keep (today's 8004scan clip + Basescan x402 still); de-arb the copy so it's about any agent.
- **Capabilities / Stats / Web3-native / Roadmap / Pricing / FAQ** — keep; tighten copy; de-monotone headers (kill the "…on-chain…" repeats).

## Media plan (hybrid)
- **Real clips:** hero loop; one short clip or strong still per featured agent; keep `onchain-proof.mp4`.
- **Remotion (polish only):** branded, captioned, speed-ramped hero explainer built FROM the real hero recording; light animated section transitions. Not rebuilding the page in Remotion.
- Capture pipeline: Playwright + ffmpeg (proven today for the proof assets). App driven to clean states.

## Copy
Full rewrite — concrete promise, distinct headers, examples over jargon, defer x402/ERC-8004 to the proof section.
- i18n'd sections (hero, Pricing, FAQ, Roadmap) → update **all 6 locales** (en/es/fr/ja/ko/zh).
- Hardcoded-English sections (Web3Native, OnchainProof, HowItWorks, Capabilities) → edit in-component (existing pattern).

## Build order
- **Phase 1 (now):** copy rewrite + de-dupe images + animated hero clip. Biggest visible lift, contained.
- **Phase 2:** build the 2 new workflows (Alpha Brief, Auto-Poster) + capture each + the "What you can build" showcase section.
- **Phase 3:** Remotion hero explainer + motion polish + final full-page pass.

## Constraints / standing rules
- No git commit/add/push (user commits). Never fake data / seed rows. Verify in running UI before "done".
- New/changed UI strings → all 6 locales (i18n'd sections only). Don't change unrequested things.
- I build/drive; the user funds + fires any real trade (financial-action boundary). Vault funding deferred.
