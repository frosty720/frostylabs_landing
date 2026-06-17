'use client';
import { useReducedMotionOrTouch } from '@/lib/scroll/use-reduced-motion-or-touch';

const ITEMS = ['EVM', 'Base', 'Solana', 'x402', 'MCP', 'A2A', 'OpenRouter', 'Ollama'];

export function TrustStrip() {
	const skip = useReducedMotionOrTouch();
	const track = (
		<div className='flex shrink-0 items-center gap-12 px-6'>
			{ITEMS.map((i) => (
				<span key={i} className='mono-label text-[#aab2c5]'>{i}</span>
			))}
		</div>
	);
	return (
		<section aria-label='Runs on' className='overflow-hidden border-y border-white/5 py-5'>
			<div className={skip ? 'flex flex-wrap justify-center gap-y-3' : 'flex w-max animate-[marquee_28s_linear_infinite]'}>
				{track}
				{!skip && track}
			</div>
		</section>
	);
}
