'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '@/lib/site';
import { useReducedMotionOrTouch } from '@/lib/scroll/use-reduced-motion-or-touch';
import { useFrameSequence, frameIndexForProgress, type Manifest } from './use-frame-sequence';
import manifestJson from '@/public/frames/hero/manifest.json';

gsap.registerPlugin(ScrollTrigger);
const manifest = manifestJson as Manifest;
const FRAME_SPEED = 2;

/** Shared hero copy: badge, headline, description, two CTAs. */
function HeroCopy() {
	const t = useTranslations('hero');
	return (
		<div className='mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center'>
			<span className='mono-label'>◆ {t('badge')}</span>
			<h1 className='text-balance text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl'>
				Build <span className='aurora-text'>autonomous</span> on-chain agents
			</h1>
			<p className='max-w-xl text-balance text-lg text-white/70'>{t('description')}</p>
			<div className='flex flex-wrap items-center justify-center gap-4'>
				<Link
					href={SITE.appUrl}
					className='aurora-bg rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:opacity-90'
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

/** Static fallback for mobile/touch/reduced-motion. Never loads the frame sequence. */
function HeroStatic() {
	return (
		<section className='aurora-bg grid-overlay relative flex min-h-[100svh] items-center justify-center overflow-hidden'>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src='/frames/hero/poster.webp'
				alt='FrostyFi workflow builder'
				className='pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30'
			/>
			<motion.div
				className='relative z-10'
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<HeroCopy />
			</motion.div>
		</section>
	);
}

/** Desktop scroll-scrub hero: 220-frame canvas sequence over a 320vh sticky section. */
function HeroScrub() {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const copyRef = useRef<HTMLDivElement>(null);
	const { drawFrame } = useFrameSequence(manifest);

	useEffect(() => {
		const wrapper = wrapperRef.current;
		const canvas = canvasRef.current;
		const hero = copyRef.current;
		if (!wrapper || !canvas || !hero) return;

		const sizeCanvas = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = window.innerWidth * dpr;
			canvas.height = window.innerHeight * dpr;
		};
		sizeCanvas();
		window.addEventListener('resize', sizeCanvas);

		let lastFrame = -1;
		const st = ScrollTrigger.create({
			trigger: wrapper,
			start: 'top top',
			end: 'bottom bottom',
			scrub: true,
			onUpdate: (self) => {
				const i = frameIndexForProgress(self.progress, manifest.count, FRAME_SPEED);
				if (i !== lastFrame) {
					lastFrame = i;
					requestAnimationFrame(() => drawFrame(canvas, i));
				}
				hero.style.opacity = String(Math.max(0, 1 - self.progress * 12));
				const wipe = Math.min(1, Math.max(0, (self.progress - 0.01) / 0.06)) * 75;
				canvas.style.clipPath = `circle(${wipe}% at 50% 50%)`;
			},
		});

		return () => {
			window.removeEventListener('resize', sizeCanvas);
			st.kill();
		};
	}, [drawFrame]);

	return (
		<div ref={wrapperRef} style={{ height: '320vh' }}>
			<div className='aurora-bg grid-overlay sticky top-0 h-[100svh] overflow-hidden'>
				<canvas
					ref={canvasRef}
					data-testid='hero-canvas'
					className='absolute inset-0 h-full w-full'
					style={{ clipPath: 'circle(0% at 50% 50%)' }}
				/>
				<div ref={copyRef} className='absolute inset-0 z-10 flex items-center justify-center'>
					<HeroCopy />
				</div>
			</div>
		</div>
	);
}

/** Scroll-scrub hero centerpiece. Renders the static poster fallback on touch/reduced-motion. */
export function ScrubHero() {
	const skip = useReducedMotionOrTouch();
	return skip ? <HeroStatic /> : <HeroScrub />;
}
