'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';

/** Shared hero copy: badge, headline, description, two CTAs. */
function HeroCopy() {
	const t = useTranslations('hero');
	return (
		<div className='mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center'>
			<span className='mono-label'>◆ {t('badge')}</span>
			<h1 className='text-balance text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl'>
				Build AI agents that <span className='aurora-text'>get paid</span>, on-chain
			</h1>
			<p className='max-w-xl text-balance text-lg text-white/70'>{t('description')}</p>
			<div className='flex flex-wrap items-center justify-center gap-4'>
				<Link
					href={SITE.appUrl}
					className='rounded-full bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#22d3ee]/20 transition hover:opacity-90'
				>
					{t('launchApp')} →
				</Link>
				<a
					href='#how'
					className='rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white'
				>
					{t('watchDemo')}
				</a>
			</div>
		</div>
	);
}

/**
 * Hero: headline over a real product clip — the cross-DEX arbitrage scanner
 * running live (nodes cascade green → Telegram alert → on-chain Arbitrage Result).
 * A real screen capture of the running app, not a mockup.
 */
export function ScrubHero() {
	return (
		<section className='aurora-bg grid-overlay relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24'>
			<motion.div
				className='relative z-10'
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<HeroCopy />
			</motion.div>

			{/* Real product clip — the live arbitrage scanner */}
			<motion.div
				className='relative z-10 mt-14 w-full max-w-5xl'
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
			>
				<div className='frosted-glass overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50'>
					<video
						src='/recordings/hero-arb-run.mp4'
						poster='/recordings/hero-arb-run.poster.jpg'
						autoPlay
						loop
						muted
						playsInline
						aria-label='A FrostyFi cross-DEX arbitrage agent running live on the visual canvas — nodes complete green, a Telegram alert fires, and the on-chain arbitrage result appears'
						className='block w-full'
					/>
				</div>
			</motion.div>
		</section>
	);
}
