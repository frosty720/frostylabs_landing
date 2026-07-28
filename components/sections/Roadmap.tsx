'use client';
import { motion, type Variants } from 'framer-motion';
import { Check, Hammer, Snowflake } from 'lucide-react';
import { useTranslations } from 'next-intl';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Phase {
	icon: typeof Check;
	/** Accent classes for the status pill + icon. */
	accent: string;
	/** Number of bullet items to read from translations. */
	itemCount: number;
	/** Dashed/teaser treatment for forward-looking work. */
	teaser?: boolean;
}

const PHASES: Phase[] = [
	{
		icon: Check,
		accent: 'text-[#67e8f9] border-[#67e8f9]/30 bg-[#67e8f9]/[0.08]',
		itemCount: 6,
	},
	{
		icon: Hammer,
		accent: 'text-[#a78bfa] border-[#a78bfa]/30 bg-[#a78bfa]/[0.08]',
		itemCount: 3,
	},
	{
		icon: Snowflake,
		accent: 'text-[#c4b5fd] border-[#a78bfa]/40 bg-[#a78bfa]/10',
		teaser: true,
		itemCount: 3,
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

export function Roadmap() {
	const t = useTranslations('roadmapSection');
	return (
		<section id='roadmap' className='mx-auto max-w-6xl px-6 py-28'>
			<span className='mono-label text-[#67e8f9]'>{t('eyebrow')}</span>
			<h2 className='mt-3 text-4xl font-semibold tracking-tight md:text-5xl'>
				{t('heading')} <span className='aurora-text'>{t('headingHighlight')}</span>
			</h2>
			<p className='mt-4 max-w-xl text-[#aab2c5]'>{t('description')}</p>

			<motion.div
				variants={container}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-15%' }}
				className='mt-14 grid grid-cols-1 gap-5 md:grid-cols-3'
			>
				{PHASES.map((phase, index) => {
					const Icon = phase.icon;
					return (
						<motion.div
							key={index}
							variants={item}
							className={`flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
								phase.teaser
									? 'border-dashed border-[#a78bfa]/30 bg-gradient-to-br from-[#a78bfa]/[0.06] to-transparent'
									: 'border-white/10 bg-white/[0.02] hover:border-white/25'
							}`}
						>
							<div className='flex items-center gap-3'>
								<span
									className={`flex h-10 w-10 items-center justify-center rounded-lg border ${phase.accent}`}
								>
									<Icon className='h-5 w-5' strokeWidth={1.75} />
								</span>
								<span
									className={`mono-label inline-flex items-center rounded-full border px-3 py-1 ${phase.accent}`}
								>
									{t(`phases.${index}.label`)}
								</span>
							</div>
							<h3 className='mt-5 text-xl font-semibold text-white'>
								{t(`phases.${index}.title`)}
							</h3>
							<ul className='mt-4 space-y-3'>
								{Array.from({ length: phase.itemCount }, (_, itemIndex) => (
									<li
										key={itemIndex}
										className='flex items-start gap-3 text-sm text-[#aab2c5]'
									>
										<span className='mt-2 h-1 w-1 shrink-0 rounded-full bg-[#67e8f9]' />
										<span>{t(`phases.${index}.items.${itemIndex}`)}</span>
									</li>
								))}
							</ul>
						</motion.div>
					);
				})}
			</motion.div>
		</section>
	);
}
