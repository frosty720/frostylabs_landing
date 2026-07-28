import type { ComponentType } from 'react';
import { AgentCustody } from './content/agent-custody';
import { AgentThatEarns } from './content/agent-that-earns';
import { FrostToken } from './content/frost-token';

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	/** ISO date (YYYY-MM-DD). */
	date: string;
	author: string;
	authorHandle: string;
	tags: string[];
	readingTime: string;
	/** Cover + social image (1200x630), served from /public. */
	image: string;
	Body: ComponentType;
}

export const posts: BlogPost[] = [
	{
		slug: 'frost-token',
		title: '$FROST: the token with a liquidity floor that never sells',
		description:
			'Most AI tokens pay you in more of the token. $FROST does the opposite — a 100M hard cap earned by paying customers, protocol-owned liquidity that only fills, and real yield paid to lockers in USDC. Here is the whole design, live and verifiable on Base.',
		date: '2026-07-27',
		author: 'frostydev',
		authorHandle: '@frosty_onchain',
		tags: ['$FROST', 'Tokenomics', 'POL', 'DAO', 'Base'],
		readingTime: '5 min read',
		image: '/blog/og/frost-token.png',
		Body: FrostToken,
	},
	{
		slug: 'agent-custody',
		title: 'What your agent is allowed to sign',
		description:
			"The moment an agent can spend real money, the question stops being 'can it pay?' and becomes 'how much can it lose?' How FrostyFi gives agents a wallet without giving them the keys: keys held in ThirdWeb Vault, scoped and revocable signing, and a hard cap on every spend.",
		date: '2026-07-26',
		author: 'frostydev',
		authorHandle: '@frosty_onchain',
		tags: ['Vault', 'Custody', 'Security', 'AI agents', 'Base'],
		readingTime: '4 min read',
		image: '/blog/og/agent-custody.png',
		Body: AgentCustody,
	},
	{
		slug: 'agent-that-earns',
		title: 'Deploy an AI agent that earns USDC — no code',
		description:
			"Most AI agents can't get paid. Here's how to build one on a visual canvas, give it a verifiable on-chain identity, and let it earn USDC per request — live on Base mainnet, no code.",
		date: '2026-06-19',
		author: 'frostydev',
		authorHandle: '@frosty_onchain',
		tags: ['x402', 'ERC-8004', 'AI agents', 'Base', 'No-code'],
		readingTime: '4 min read',
		image: '/blog/og/agent-that-earns.png',
		Body: AgentThatEarns,
	},
];

export function getPost(slug: string): BlogPost | undefined {
	return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
	return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	});
}
