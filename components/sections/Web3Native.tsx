'use client';
import { motion, type Variants } from 'framer-motion';
import { Coins, Fingerprint, Network, Snowflake } from 'lucide-react';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Pillar {
	icon: typeof Network;
	title: string;
	body: string;
	tag: string;
}

const PILLARS: Pillar[] = [
	{
		icon: Coins,
		title: 'x402 micropayments',
		body: 'Agents and APIs charge per request in USDC on Base — no seat licenses, no monthly minimums. Settlement happens on-chain at the moment of use.',
		tag: 'USDC on Base',
	},
	{
		icon: Network,
		title: 'On-chain execution',
		body: 'Agents transact across EVM and Solana — swaps, transfers, and contract calls run from inside the workflow, signed and settled where the assets live.',
		tag: 'EVM + Solana',
	},
	{
		icon: Fingerprint,
		title: 'ERC-8004 identity',
		body: 'Every agent gets an on-chain identity through an ERC-8004 registry, so counterparties can verify who they are paying and trusting.',
		tag: 'On-chain registry',
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

export function Web3Native() {
	return (
		<section
			id='web3-native'
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
					<motion.span variants={item} className='mono-label block text-[#67e8f9]'>
						Web3-native
					</motion.span>
					<motion.h2
						variants={item}
						className='mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl'
					>
						Built for the <span className='aurora-text'>on-chain economy</span>
					</motion.h2>
					<motion.p variants={item} className='mt-4 max-w-xl text-[#aab2c5]'>
						This is the part most agent platforms skip. FrostyFi agents pay, get paid, and
						settle on-chain today — without a single seat license.
					</motion.p>

					{/* PRIMARY — shippable today */}
					<motion.div
						variants={container}
						className='mt-14 grid grid-cols-1 gap-5 md:grid-cols-3'
					>
						{PILLARS.map((p) => {
							const Icon = p.icon;
							return (
								<motion.div
									key={p.title}
									variants={item}
									className='group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04]'
								>
									<span className='flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#a78bfa] transition-colors duration-200 group-hover:text-[#67e8f9]'>
										<Icon className='h-5 w-5' strokeWidth={1.75} />
									</span>
									<h3 className='mt-5 text-lg font-medium text-white'>{p.title}</h3>
									<p className='mt-1.5 flex-1 text-sm text-[#aab2c5]'>{p.body}</p>
									<span className='mono-label mt-5 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[#67e8f9]'>
										{p.tag}
									</span>
								</motion.div>
							);
						})}
					</motion.div>
				</motion.div>

				{/* SECONDARY — future FROST teaser, visually distinct */}
				<motion.div
					initial={{ opacity: 0, y: 28 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-15%' }}
					transition={{ duration: 0.6, ease: EASE_OUT }}
					className='relative mt-6 overflow-hidden rounded-2xl border border-dashed border-[#a78bfa]/30 bg-gradient-to-br from-[#a78bfa]/[0.06] to-transparent p-8 md:p-10'
				>
					<div className='flex flex-col gap-6 md:flex-row md:items-start md:justify-between'>
						<div className='max-w-2xl'>
							<div className='flex items-center gap-3'>
								<span className='flex h-10 w-10 items-center justify-center rounded-lg border border-[#a78bfa]/30 bg-[#a78bfa]/[0.08] text-[#a78bfa]'>
									<Snowflake className='h-5 w-5' strokeWidth={1.75} />
								</span>
								<span className='mono-label inline-flex items-center rounded-full border border-[#a78bfa]/40 bg-[#a78bfa]/10 px-3 py-1 text-[#c4b5fd]'>
									Roadmap · Coming
								</span>
							</div>
							<h3 className='mt-5 text-2xl font-semibold text-white'>
								The FROST token — <span className='aurora-text'>launching 2026</span>
							</h3>
							<p className='mt-3 text-[#aab2c5]'>
								FROST is planned for 2026. Once live, it will coordinate the network&apos;s
								economics — aligning agents, builders, and operators around shared
								incentives. It is not live yet, and nothing on FrostyFi requires it today.
							</p>
						</div>
						<span className='mono-label shrink-0 self-start rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[#aab2c5]'>
							Planned · 2026
						</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
