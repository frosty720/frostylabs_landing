'use client';
import { motion, type Variants } from 'framer-motion';
import {
	Activity,
	Boxes,
	CalendarClock,
	Cpu,
	Network,
	Plug,
	Rocket,
	ShieldCheck,
	Sparkles,
	Workflow,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useReducedMotionOrTouch } from '@/lib/scroll/use-reduced-motion-or-touch';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Tile {
	icon: typeof Network;
	/** Tailwind classes for the asymmetric grid span (desktop only). */
	span: string;
}

const TILES: Tile[] = [
	{
		icon: Cpu,
		span: 'md:col-span-2 md:row-span-1',
	},
	{
		icon: Network,
		span: 'md:col-span-2 md:row-span-1',
	},
	{
		icon: Boxes,
		span: 'md:col-span-2 md:row-span-1',
	},
	{
		icon: Rocket,
		span: 'md:col-span-2 md:row-span-1',
	},
	{
		icon: CalendarClock,
		span: 'md:col-span-2 md:row-span-1',
	},
	{
		icon: Plug,
		span: 'md:col-span-2 md:row-span-1',
	},
	{
		icon: Sparkles,
		span: 'md:col-span-2 md:row-span-1',
	},
	{
		icon: ShieldCheck,
		span: 'md:col-span-2 md:row-span-1',
	},
	{
		icon: Activity,
		span: 'md:col-span-2 md:row-span-1',
	},
];

const container: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 28 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export function Capabilities() {
	const t = useTranslations('capabilities');
	const reduceMotion = useReducedMotionOrTouch();

	return (
		<section id='capabilities' className='mx-auto max-w-6xl px-6 py-28'>
			<span className='mono-label text-[#67e8f9]'>{t('eyebrow')}</span>
			<h2 className='mt-3 text-4xl font-semibold tracking-tight md:text-5xl'>
				{t('headingLead')} <span className='aurora-text'>{t('headingEmphasis')}</span>
			</h2>

			<motion.div
				variants={container}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-15%' }}
				className='mt-14 grid grid-cols-1 gap-5 md:auto-rows-[minmax(11rem,auto)] md:grid-cols-6'
			>
				{/* FEATURE TILE — Visual workflows, ambient network video background */}
				<motion.div
					variants={item}
					className='group relative col-span-1 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 md:col-span-6 md:row-span-2'
				>
					{reduceMotion ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src='/recordings/ambient_network.poster.webp'
							alt=''
							aria-hidden='true'
							className='absolute inset-0 h-full w-full object-cover'
						/>
					) : (
						<video
							src='/recordings/ambient_network.mp4'
							poster='/recordings/ambient_network.poster.webp'
							muted
							playsInline
							loop
							autoPlay
							preload='none'
							aria-hidden='true'
							className='absolute inset-0 h-full w-full object-cover'
						/>
					)}
					{/* Dark gradient overlay so text stays readable */}
					<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30' />
					<div className='relative flex h-full min-h-[18rem] flex-col justify-end p-8 md:p-10'>
						<span className='flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-[#67e8f9] backdrop-blur-sm'>
							<Workflow className='h-6 w-6' strokeWidth={1.75} />
						</span>
						<h3 className='mt-5 text-2xl font-semibold text-white md:text-3xl'>
							{t('feature.title')}
						</h3>
						<p className='mt-2 max-w-md text-[#aab2c5]'>
							{t('feature.body')}
						</p>
					</div>
				</motion.div>

				{/* REMAINING TILES */}
				{TILES.map((tile, index) => {
					const Icon = tile.icon;
					return (
						<motion.div
							key={index}
							variants={item}
							className={`group col-span-1 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.05] ${tile.span}`}
						>
							<span className='flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#a78bfa] transition-colors duration-200 group-hover:text-[#67e8f9]'>
								<Icon className='h-5 w-5' strokeWidth={1.75} />
							</span>
							<h3 className='mt-5 text-lg font-medium text-white'>
								{t(`items.${index}.title`)}
							</h3>
							<p className='mt-1.5 text-sm text-[#aab2c5]'>{t(`items.${index}.body`)}</p>
						</motion.div>
					);
				})}
			</motion.div>
		</section>
	);
}
