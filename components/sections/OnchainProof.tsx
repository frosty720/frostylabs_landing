'use client';
import { motion, type Variants } from 'framer-motion';
import { Coins, KeyRound, Network } from 'lucide-react';
import { useTranslations } from 'next-intl';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CHIP_ICONS = [Network, Coins, KeyRound];

const container: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export function OnchainProof() {
	const t = useTranslations('onchainProof');
	return (
		<section className='aurora-bg relative overflow-hidden border-y border-white/5'>
			<div className='grid-overlay pointer-events-none absolute inset-0' />
			<div className='relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-28 md:grid-cols-2 md:gap-16'>
				{/* LEFT — device frame with the real USDC send demo */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: '-15%' }}
					transition={{ duration: 0.7, ease: 'easeOut' }}
					className='overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl shadow-black/40'
				>
					<div className='flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3'>
						<span className='h-3 w-3 rounded-full bg-[#ff5f57]' />
						<span className='h-3 w-3 rounded-full bg-[#febc2e]' />
						<span className='h-3 w-3 rounded-full bg-[#28c840]' />
						<span className='mono-label ml-3 text-[#aab2c5]'>arb-watcher.agent</span>
					</div>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src='/screenshots/heroV1Findings.png'
						alt={t('imageAlt')}
						className='block w-full'
					/>
				</motion.div>

				{/* RIGHT — copy + capability chips */}
				<motion.div
					variants={container}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-15%' }}
				>
					<motion.span variants={item} className='mono-label block text-[#67e8f9]'>
						{t('eyebrow')}
					</motion.span>
					<motion.h2
						variants={item}
						className='mt-3 text-4xl font-semibold tracking-tight md:text-5xl'
					>
						{t('heading')} <span className='aurora-text'>{t('headingHighlight')}</span>
					</motion.h2>
					<motion.p variants={item} className='mt-4 max-w-md text-[#aab2c5]'>
						{t('body')}
					</motion.p>

					<div className='mt-8 space-y-3'>
						{CHIP_ICONS.map((Icon, index) => {
							return (
								<motion.div
									key={index}
									variants={item}
									className='group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.04]'
								>
									<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#a78bfa] transition-colors duration-200 group-hover:text-[#67e8f9]'>
										<Icon className='h-5 w-5' strokeWidth={1.75} />
									</span>
									<div>
										<h3 className='font-medium text-white'>{t(`items.${index}.title`)}</h3>
										<p className='mt-0.5 text-sm text-[#aab2c5]'>{t(`items.${index}.body`)}</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
