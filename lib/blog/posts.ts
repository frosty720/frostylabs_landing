import type { ComponentType } from 'react';
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
