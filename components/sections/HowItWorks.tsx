'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface StepMedia {
	type: 'video' | 'image';
	src: string;
	poster?: string;
}

interface Step {
	n: string;
	media: StepMedia;
}

const STEPS: Step[] = [
	{
		n: '01',
		media: { type: 'image', src: '/screenshots/heroV1Describe.png' },
	},
	{
		n: '02',
		media: {
			type: 'video',
			src: '/recordings/demo-research.mp4',
			poster: '/recordings/demo-research.poster.jpg',
		},
	},
	{
		n: '03',
		media: {
			type: 'video',
			src: '/recordings/demo-evm.mp4',
			poster: '/recordings/demo-evm.poster.jpg',
		},
	},
];

export function HowItWorks() {
	const t = useTranslations('howItWorks');
	return (
		<section id='how' className='mx-auto max-w-6xl px-6 py-28'>
			<span className='mono-label text-[#67e8f9]'>{t('eyebrow')}</span>
			<h2 className='mt-3 text-4xl font-semibold tracking-tight md:text-5xl'>
				{t('headingPrefix')}{' '}
				<span className='aurora-text'>{t('headingHighlight')}</span>
			</h2>
			<div className='mt-16 space-y-28'>
				{STEPS.map((s, idx) => {
					const reversed = idx % 2 === 1;
					return (
						<div key={s.n} className='grid items-center gap-10 md:grid-cols-2'>
							<motion.div
								initial={{ opacity: 0, x: reversed ? 60 : -60 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, margin: '-15%' }}
								transition={{ duration: 0.7, ease: 'easeOut' }}
								className={reversed ? 'md:order-2' : ''}
							>
								<span className='mono-label text-[#a78bfa]'>{s.n}</span>
								<h3 className='mt-2 text-2xl font-semibold'>
									{t(`steps.${idx}.title`)}
								</h3>
								<p className='mt-3 max-w-md text-[#aab2c5]'>
									{t(`steps.${idx}.body`)}
								</p>
							</motion.div>
							<div
								className={`overflow-hidden rounded-2xl border border-white/10 ${reversed ? 'md:order-1' : ''}`}
							>
								{s.media.type === 'video' ? (
									<video
										src={s.media.src}
										poster={s.media.poster}
										muted
										playsInline
										loop
										autoPlay
										preload='none'
										className='w-full'
									/>
								) : (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={s.media.src}
										alt={t(`steps.${idx}.title`)}
										className='w-full'
									/>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
