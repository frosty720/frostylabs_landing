'use client';
import { motion, type Variants } from 'framer-motion';
import {
	Coins,
	Flame,
	Landmark,
	Lock,
	TrendingUp,
	Vote,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The FROST token — $FROST (liquid token) + PERMA (soulbound lock receipt).
// Revenue engine is LIVE on Base (splitter + POL reserve); the token launches
// later. Full design at docs.frostylabs.ai/docs/tokenomics.
const PILLARS = [Coins, Lock, Landmark, TrendingUp, Flame, Vote];

const container: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 28 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export function FrostyDao() {
	const t = useTranslations('frostyDao');
	return (
		<section
			id='frostydao'
			className='aurora-bg relative overflow-hidden border-y border-white/5'
		>
			<div className='grid-overlay pointer-events-none absolute inset-0' />
			<div className='relative mx-auto max-w-6xl px-6 py-28'>
				<motion.div
					variants={container}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-15%' }}
				>
					<motion.span variants={item} className='mono-label block text-[#c4b5fd]'>
						{t('eyebrow')}
					</motion.span>
					<motion.h2
						variants={item}
						className='mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl'
					>
						{t('headline')}{' '}
						<span className='aurora-text'>{t('headlineAccent')}</span>
					</motion.h2>
					<motion.p variants={item} className='mt-4 max-w-2xl text-[#aab2c5]'>
						{t('subhead')}
					</motion.p>

					{/* Honest status — engine live, token later */}
					<motion.div
						variants={item}
						className='mt-6 inline-flex max-w-2xl items-center gap-2 rounded-full border border-[#a78bfa]/30 bg-[#a78bfa]/[0.06] px-4 py-2 text-sm text-[#c4b5fd]'
					>
						<span className='h-1.5 w-1.5 rounded-full bg-[#67e8f9]' />
						{t('status')}
					</motion.div>

					<motion.div
						variants={container}
						className='mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
					>
						{PILLARS.map((Icon, index) => (
							<motion.div
								key={index}
								variants={item}
								className='group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04]'
							>
								<span className='flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#c4b5fd] transition-colors duration-200 group-hover:text-[#67e8f9]'>
									<Icon className='h-5 w-5' strokeWidth={1.75} />
								</span>
								<h3 className='mt-5 text-lg font-medium text-white'>
									{t(`pillars.${index}.title`)}
								</h3>
								<p className='mt-1.5 text-sm text-[#aab2c5]'>
									{t(`pillars.${index}.body`)}
								</p>
							</motion.div>
						))}
					</motion.div>

					<motion.div
						variants={item}
						className='mt-8 rounded-2xl border border-[#67e8f9]/20 bg-[#67e8f9]/[0.05] p-6 sm:p-7'
					>
						<span className='mono-label block text-[#67e8f9]'>
							{t('callout.label')}
						</span>
						<p className='mt-2 max-w-3xl text-[#aab2c5]'>
							{t('callout.body')}{' '}
							<span className='text-white'>{t('callout.accent')}</span>
							{t('callout.bodyEnd')}
						</p>
					</motion.div>

					<motion.div
						variants={item}
						className='mt-8 flex flex-wrap items-center gap-4'
					>
						<a
							href='https://docs.frostylabs.ai/docs/tokenomics'
							className='inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#05060b] transition-opacity hover:opacity-90'
						>
							{t('cta.tokenomics')} →
						</a>
						<a
							href='https://docs.frostylabs.ai/docs/pol'
							className='inline-flex items-center rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/35'
						>
							{t('cta.pol')}
						</a>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
