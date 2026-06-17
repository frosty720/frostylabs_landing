'use client';
import { motion, type Variants } from 'framer-motion';
import { Coins, Fingerprint, Network } from 'lucide-react';

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
		body: 'Agents trade across Uniswap, SushiSwap, PancakeSwap, Hyperliquid and Jupiter — swaps, perps, even tokenized stocks — run from inside the workflow, signed and settled where the assets live.',
		tag: 'EVM · Solana · Hyperliquid',
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

					{/* PROOF — real on-chain artifacts, click through and verify */}
					<motion.div variants={item} className='mt-20'>
						<div className='flex items-center gap-3'>
							<span className='mono-label whitespace-nowrap text-[#67e8f9]'>
								Proof, on-chain
							</span>
							<span className='h-px flex-1 bg-white/10' />
						</div>
						<h3 className='mt-4 max-w-2xl text-2xl font-medium text-white md:text-3xl'>
							x402 and ERC-8004, <span className='aurora-text'>live on Base.</span>
						</h3>
						<p className='mt-2 max-w-xl text-sm text-[#aab2c5]'>
							A FrostyFi agent registered on the public ERC-8004 identity registry, and a
							real x402 micropayment settled in USDC on Base. Both on-chain right now —
							click through and verify.
						</p>

						<div className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2'>
							{/* ERC-8004 identity + reputation — motion clip */}
							<a
								href='https://8004scan.io/agents/base/54630'
								target='_blank'
								rel='noreferrer'
								className='group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/25'
							>
								<div className='flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3'>
									<span className='h-3 w-3 rounded-full bg-[#ff5f57]' />
									<span className='h-3 w-3 rounded-full bg-[#febc2e]' />
									<span className='h-3 w-3 rounded-full bg-[#28c840]' />
									<span className='mono-label ml-3 truncate text-[#aab2c5]'>
										8004scan.io/agents/base/54630
									</span>
								</div>
								<div className='relative aspect-[4/3] w-full overflow-hidden bg-[#0a0b12]'>
									<video
										src='/recordings/onchain-proof.mp4'
										poster='/recordings/onchain-proof.poster.jpg'
										autoPlay
										loop
										muted
										playsInline
										className='absolute inset-0 h-full w-full object-cover object-top'
									/>
								</div>
								<div className='flex items-center justify-between gap-3 px-5 py-4'>
									<div>
										<p className='text-sm font-medium text-white'>
											ERC-8004 identity &amp; reputation
										</p>
										<p className='mt-0.5 text-xs text-[#aab2c5]'>
											Agent #54630 · ★ 5.0/5.0 · 100/100 on Base
										</p>
									</div>
									<span className='mono-label shrink-0 text-[#67e8f9] transition-colors group-hover:text-white'>
										8004scan ↗
									</span>
								</div>
							</a>

							{/* x402 USDC settlement — Basescan receipt */}
							<a
								href='https://basescan.org/tx/0x56fd9afced94edc5e5dbbc40e6593f39849e2410cabbb72761401b54446c2f98'
								target='_blank'
								rel='noreferrer'
								className='group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/25'
							>
								<div className='flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3'>
									<span className='h-3 w-3 rounded-full bg-[#ff5f57]' />
									<span className='h-3 w-3 rounded-full bg-[#febc2e]' />
									<span className='h-3 w-3 rounded-full bg-[#28c840]' />
									<span className='mono-label ml-3 truncate text-[#aab2c5]'>
										basescan.org/tx/0x56fd9a…2f98
									</span>
								</div>
								<div className='relative aspect-[4/3] w-full overflow-hidden bg-[#0a0b12]'>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src='/screenshots/proof-x402.png'
										alt='A real x402 micropayment settled in USDC on Base mainnet'
										className='absolute inset-0 h-full w-full object-cover object-top'
									/>
								</div>
								<div className='flex items-center justify-between gap-3 px-5 py-4'>
									<div>
										<p className='text-sm font-medium text-white'>
											x402 payment, settled on-chain
										</p>
										<p className='mt-0.5 text-xs text-[#aab2c5]'>
											0.01 USDC · pay-per-call · Base mainnet
										</p>
									</div>
									<span className='mono-label shrink-0 text-[#67e8f9] transition-colors group-hover:text-white'>
										Basescan ↗
									</span>
								</div>
							</a>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
