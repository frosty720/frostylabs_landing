'use client';
import { motion } from 'framer-motion';

interface StepMedia {
	type: 'video' | 'image';
	src: string;
	poster?: string;
}

interface Step {
	n: string;
	title: string;
	body: string;
	media: StepMedia;
}

const STEPS: Step[] = [
	{
		n: '01',
		title: 'Describe it',
		body: "Tell FrostyFi what you want in plain language — like “scan for cross-DEX arbitrage and alert me” — and Frosty Architect drafts the whole workflow.",
		media: { type: 'image', src: '/screenshots/heroV1Describe.png' },
	},
	{
		n: '02',
		title: 'Build visually',
		body: 'Drag, connect, and tune nodes on the canvas: LLMs, DEX swaps, Hyperliquid trades, media, messaging, and conditions.',
		media: {
			type: 'video',
			src: '/recordings/demo-research.mp4',
			poster: '/recordings/demo-research.poster.jpg',
		},
	},
	{
		n: '03',
		title: 'Deploy on-chain',
		body: 'Ship it as an agent. It quotes live on-chain, decides, and acts — alerts, swaps, payments — on a schedule, a webhook, or paid per call with x402.',
		media: {
			type: 'video',
			src: '/recordings/demo-evm.mp4',
			poster: '/recordings/demo-evm.poster.jpg',
		},
	},
];

export function HowItWorks() {
	return (
		<section id='how' className='mx-auto max-w-6xl px-6 py-28'>
			<span className='mono-label text-[#67e8f9]'>How it works</span>
			<h2 className='mt-3 text-4xl font-semibold tracking-tight md:text-5xl'>
				From idea to <span className='aurora-text'>on-chain agent</span>
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
								<h3 className='mt-2 text-2xl font-semibold'>{s.title}</h3>
								<p className='mt-3 max-w-md text-[#aab2c5]'>{s.body}</p>
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
									<img src={s.media.src} alt={s.title} className='w-full' />
								)}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
