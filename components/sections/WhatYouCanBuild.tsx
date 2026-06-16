'use client';
import { motion, type Variants } from 'framer-motion';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Agent {
	tag: string;
	name: string;
	body: string;
	img: string;
	/** mono label shown in the browser-frame bar */
	chrome: string;
	/** when set, the whole card links out to this explorer URL */
	href?: string;
}

const AGENTS: Agent[] = [
	{
		tag: 'Trading · DeFi',
		name: 'Cross-DEX Arb Scanner',
		body: 'Quotes Uniswap, SushiSwap and PancakeSwap in parallel, flags the spread the instant it appears, and pings you on Telegram.',
		img: '/screenshots/agent-arb-scanner.jpg',
		chrome: 'arb-scanner.agent',
	},
	{
		tag: 'Research',
		name: 'Daily Alpha Brief',
		body: 'Pulls live market data and has AI write you a sharp, no-fluff daily brief — on a schedule, in your inbox or Telegram.',
		img: '/screenshots/agent-alpha-brief.png',
		chrome: 'alpha-brief.agent',
	},
	{
		tag: 'Payments · Vault',
		name: 'USDC Payout Agent',
		body: 'Moves real USDC on-chain with a Vault-signed transaction — payouts, settlements and treasury runs, automated, with no private key ever exposed.',
		img: '/screenshots/agent-usdc-transfer.png',
		chrome: 'sepolia.basescan.org/tx/0x6cd6…f369',
		href: 'https://sepolia.basescan.org/tx/0x6cd626bbd309d03c6b5c96fee909fe9337e4701f58433ae9e0454a354f3ff369',
	},
	{
		tag: 'Paid API · x402',
		name: 'Gas Oracle',
		body: 'A pay-per-call API, live on-chain: real-time Ethereum gas, monetized with x402, behind a verifiable ERC-8004 identity.',
		img: '/screenshots/agent-gas-oracle.png',
		chrome: 'agent-frstygas · 8004scan',
		href: 'https://8004scan.io/agents/base/54630',
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

export function WhatYouCanBuild() {
	return (
		<section id='what-you-can-build' className='relative mx-auto max-w-6xl px-6 py-28'>
			<motion.div
				variants={container}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-15%' }}
			>
				<motion.span variants={item} className='mono-label block text-[#67e8f9]'>
					What you can build
				</motion.span>
				<motion.h2
					variants={item}
					className='mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl'
				>
					Build almost <span className='aurora-text'>anything.</span>
				</motion.h2>
				<motion.p variants={item} className='mt-4 max-w-2xl text-[#aab2c5]'>
					With MCP servers, 100+ models, and on-chain nodes for every major chain, your
					agents can plug into nearly any tool, API or protocol — and act on it. The only
					real limit is what you can describe. These four are just a taste:
				</motion.p>

				<motion.div
					variants={container}
					className='mt-14 grid grid-cols-1 gap-5 md:grid-cols-2'
				>
					{AGENTS.map((a) => {
						const cls =
							'group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/25';
						const inner = (
							<>
								<div className='flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3'>
									<span className='h-3 w-3 rounded-full bg-[#ff5f57]' />
									<span className='h-3 w-3 rounded-full bg-[#febc2e]' />
									<span className='h-3 w-3 rounded-full bg-[#28c840]' />
									<span className='mono-label ml-3 truncate text-[#aab2c5] transition-colors group-hover:text-white'>
										{a.chrome}
									</span>
									{a.href && (
										<span className='mono-label ml-auto shrink-0 text-[#67e8f9] transition-colors group-hover:text-white'>
											↗
										</span>
									)}
								</div>
								<div className='relative aspect-[16/10] w-full overflow-hidden bg-[#0a0b12]'>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={a.img}
										alt={`${a.name} — a FrostyFi agent`}
										className='absolute inset-0 h-full w-full object-cover object-top'
									/>
								</div>
								<div className='flex flex-1 flex-col p-6'>
									<span className='mono-label w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[#67e8f9]'>
										{a.tag}
									</span>
									<h3 className='mt-4 text-lg font-medium text-white'>{a.name}</h3>
									<p className='mt-1.5 flex-1 text-sm text-[#aab2c5]'>{a.body}</p>
								</div>
							</>
						);
						return a.href ? (
							<motion.a
								key={a.name}
								href={a.href}
								target='_blank'
								rel='noreferrer'
								variants={item}
								className={cls}
							>
								{inner}
							</motion.a>
						) : (
							<motion.div key={a.name} variants={item} className={cls}>
								{inner}
							</motion.div>
						);
					})}
				</motion.div>
			</motion.div>
		</section>
	);
}
