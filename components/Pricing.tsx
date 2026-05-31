'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/site';

type Tier = {
	key: 'free' | 'pro' | 'enterprise';
	featureCount: number;
	popular?: boolean;
};

const tiers: Tier[] = [
	{ key: 'free', featureCount: 4 },
	{ key: 'pro', featureCount: 7, popular: true },
	{ key: 'enterprise', featureCount: 7 },
];

export function Pricing() {
	const t = useTranslations('pricing');

	return (
		<section id='pricing' className='relative py-24 overflow-hidden'>
			{/* Ambient background blobs */}
			<div className='pointer-events-none absolute inset-0 -z-10'>
				<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-[#a78bfa]/5 to-transparent' />
				<div className='absolute top-32 left-1/4 h-96 w-96 rounded-full bg-[#22d3ee]/6 blur-3xl' />
				<div className='absolute bottom-24 right-1/4 h-80 w-80 rounded-full bg-[#a78bfa]/6 blur-3xl' />
			</div>

			<div className='container mx-auto px-6'>
				{/* Section heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='mb-16 text-center'
				>
					<span className='mono-label mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-[#67e8f9]'>
						<Sparkles className='h-3.5 w-3.5' />
						{t('betaLabel')}
					</span>
					<h2 className='mt-4 text-4xl font-bold tracking-tight md:text-5xl'>
						<span className='aurora-text'>{t('title')}</span>
					</h2>
					<p className='mx-auto mt-4 max-w-2xl text-[#aab2c5]'>{t('subtitle')}</p>
				</motion.div>

				{/* Beta-founder banner */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className='mx-auto mb-12 flex max-w-3xl items-center gap-4 rounded-2xl border border-[#67e8f9]/20 bg-[#22d3ee]/5 px-6 py-4'
				>
					<Image
						src='/frosty_beta_founder_badge.png'
						alt='Beta Founder Badge'
						width={56}
						height={56}
						className='shrink-0 rounded-xl'
					/>
					<div>
						<p className='mono-label text-[#67e8f9]'>{t('founderBadgeLabel')}</p>
						<p className='mt-0.5 text-sm text-[#aab2c5]'>{t('founderBadgeDesc')}</p>
					</div>
				</motion.div>

				{/* Tier cards */}
				<div className='mx-auto grid max-w-5xl gap-6 md:grid-cols-3'>
					{tiers.map((tier, index) => (
						<motion.div
							key={tier.key}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ y: -8 }}
							viewport={{ once: true }}
							transition={{ duration: 0.45, delay: index * 0.1, type: 'spring', stiffness: 280 }}
							className='relative'
						>
							{/* Popular glow ring */}
							{tier.popular && (
								<div className='pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#22d3ee]/40 via-[#a78bfa]/30 to-[#f0abfc]/20 blur-sm' />
							)}

							<div
								className={[
									'relative flex h-full flex-col rounded-2xl border bg-white/[0.03] p-8 backdrop-blur-md transition-shadow duration-300',
									tier.popular
										? 'border-[#67e8f9]/40 shadow-lg shadow-[#22d3ee]/10'
										: 'border-white/10 hover:border-white/20',
								].join(' ')}
							>
								{/* Most popular pill */}
								{tier.popular && (
									<div className='absolute -top-3.5 left-1/2 -translate-x-1/2'>
										<span className='mono-label rounded-full bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] px-5 py-1 text-white shadow-md'>
											{t(`${tier.key}.badge`)}
										</span>
									</div>
								)}

								{/* Tier icon + name */}
								<div className='mb-6 text-center'>
									<span className='text-4xl'>{t(`${tier.key}.emoji`)}</span>
									<h3
										className={[
											'mono-label mt-3 text-base',
											tier.popular ? 'text-[#67e8f9]' : tier.key === 'enterprise' ? 'text-[#c4b5fd]' : 'text-[#aab2c5]',
										].join(' ')}
									>
										{t(`${tier.key}.name`)}
									</h3>
									<div className='mt-2 text-4xl font-bold text-white'>{t(`${tier.key}.price`)}</div>
									<div className='mt-1 text-sm text-[#aab2c5]'>{t(`${tier.key}.description`)}</div>
								</div>

								{/* Feature list */}
								<ul className='mb-8 flex-1 space-y-3'>
									{Array.from({ length: tier.featureCount }).map((_, i) => (
										<li key={i} className='flex items-start gap-3 text-sm text-[#cbd5e1]'>
											<Check
												className={[
													'mt-0.5 h-4 w-4 shrink-0',
													tier.popular
														? 'text-[#67e8f9]'
														: tier.key === 'enterprise'
														? 'text-[#c4b5fd]'
														: 'text-[#aab2c5]',
												].join(' ')}
											/>
											{t(`${tier.key}.features.${i}`)}
										</li>
									))}
								</ul>

								{/* CTA */}
								<Link href={SITE.appUrl} target='_blank' className='w-full'>
									<Button
										className={[
											'w-full rounded-xl py-5 font-semibold transition-all duration-300',
											tier.popular
												? 'bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] text-white shadow-md shadow-[#22d3ee]/20 hover:opacity-90 border-0'
												: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
										].join(' ')}
									>
										{t(`${tier.key}.cta`)}
									</Button>
								</Link>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
