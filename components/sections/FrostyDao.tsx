'use client';
import { motion, type Variants } from 'framer-motion';
import { Flame, Vote, Coins, Landmark, Gift, Lock } from 'lucide-react';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Pillar {
	icon: typeof Flame;
	title: string;
	body: string;
}

// Restored from the original frostylabs.ai roadmap (FrostyDAO & Token Launch),
// kept honest: framed as PLANNED / not live. To hide this whole section, remove
// <FrostyDao /> from app/page.tsx.
const PILLARS: Pillar[] = [
	{
		icon: Flame,
		title: '$PERMA — fair launch',
		body: 'A fair launch on Base — no VC allocation. Beta Founders are auto-whitelisted.',
	},
	{
		icon: Vote,
		title: 'POLAR governance',
		body: 'Earn POLAR by locking $PERMA — that’s your voting weight in the DAO.',
	},
	{
		icon: Landmark,
		title: 'Protocol-Owned Liquidity',
		body: 'The DAO owns up to 95% of subscription revenue, building permanent, treasury-backed liquidity.',
	},
	{
		icon: Coins,
		title: 'Locking rewards',
		body: 'Lock $PERMA for POLAR plus a share of revenue from DAO operations.',
	},
	{
		icon: Lock,
		title: 'On-chain treasury',
		body: 'Vote on treasury allocation and what gets built next; a Beta-Founder multisig stewards the treasury.',
	},
	{
		icon: Gift,
		title: 'DAO-funded grants',
		body: 'Treasury grants for builders shipping standout agents and templates.',
	},
];

const container: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 28 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export function FrostyDao() {
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
						FrostyDAO · $PERMA · Planned
					</motion.span>
					<motion.h2
						variants={item}
						className='mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl'
					>
						A network owned by the <span className='aurora-text'>people who build it</span>
					</motion.h2>
					<motion.p variants={item} className='mt-4 max-w-2xl text-[#aab2c5]'>
						Where FrostyFi is headed: a token and a DAO that route the platform’s economics
						back to its users, builders and operators. Designed so the people creating value
						own the upside.
					</motion.p>

					{/* Honest framing — not live */}
					<motion.div
						variants={item}
						className='mt-6 inline-flex items-center gap-2 rounded-full border border-[#a78bfa]/30 bg-[#a78bfa]/[0.06] px-4 py-2 text-sm text-[#c4b5fd]'
					>
						<span className='h-1.5 w-1.5 rounded-full bg-[#a78bfa]' />
						Planned for 2026 — not live today. FrostyFi runs on simple USDC subscriptions
						on Base right now; no token is needed to use it.
					</motion.div>

					<motion.div
						variants={container}
						className='mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
					>
						{PILLARS.map((p) => {
							const Icon = p.icon;
							return (
								<motion.div
									key={p.title}
									variants={item}
									className='group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04]'
								>
									<span className='flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#c4b5fd] transition-colors duration-200 group-hover:text-[#67e8f9]'>
										<Icon className='h-5 w-5' strokeWidth={1.75} />
									</span>
									<h3 className='mt-5 text-lg font-medium text-white'>{p.title}</h3>
									<p className='mt-1.5 text-sm text-[#aab2c5]'>{p.body}</p>
								</motion.div>
							);
						})}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
