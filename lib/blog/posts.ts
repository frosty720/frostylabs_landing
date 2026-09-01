import type { ComponentType } from 'react';
import { AgentCustody } from './content/agent-custody';
import { AgentIdentityPortability } from './content/agent-identity-portability';
import { Erc8004SilentFailures } from './content/erc8004-silent-failures';
import { WhatIsErc8004 } from './content/what-is-erc8004';
import { AgentThatEarns } from './content/agent-that-earns';

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
		slug: 'what-is-erc-8004',
		title: 'What is ERC-8004?',
		description:
			'ERC-8004 gives an AI agent a permanent identity, a reputation that follows it, and third-party attestations — three on-chain registries, none of them owned by a platform. What each one does, what the standard deliberately does not solve, and what it looks like running in production on Base.',
		date: '2026-07-29',
		author: 'frostydev',
		authorHandle: '@frosty_onchain',
		tags: ['ERC-8004', 'Explainer', 'AI agents', 'Identity', 'Base'],
		readingTime: '6 min read',
		image: '/blog/og/what-is-erc-8004.png',
		Body: WhatIsErc8004,
	},
	{
		slug: 'erc8004-silent-failures',
		title: 'Four ways ERC-8004 fails silently',
		description:
			"The testnet registry address also exists on mainnet as a live stub. The SDK's giveFeedback ships the wrong ABI. Feedback is permissionless despite an auth flow that suggests otherwise. Four failure modes we hit running agents on Base, none of which throw an error you can search for.",
		date: '2026-07-29',
		author: 'frostydev',
		authorHandle: '@frosty_onchain',
		tags: ['ERC-8004', 'Debugging', 'Base', 'AI agents', 'On-chain'],
		readingTime: '6 min read',
		image: '/blog/og/erc8004-silent-failures.png',
		Body: Erc8004SilentFailures,
	},
	{
		slug: 'agent-identity-portability',
		title: 'Your agents identity belongs to you',
		description:
			"If a platform holds your agent's keys, does it hold your agent's identity too? For ERC-8004 the answer is no — the NFT is minted by your wallet, the metadata lives on IPFS, and reputation is keyed to the agent ID. Here is what actually breaks if you leave, and how to check every claim yourself on-chain.",
		date: '2026-07-29',
		author: 'frostydev',
		authorHandle: '@frosty_onchain',
		tags: ['ERC-8004', 'Identity', 'Portability', 'AI agents', 'Base'],
		readingTime: '5 min read',
		image: '/blog/og/agent-identity-portability.png',
		Body: AgentIdentityPortability,
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
