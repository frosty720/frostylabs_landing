'use client';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotionOrTouch } from '@/lib/scroll/use-reduced-motion-or-touch';
import { countUpValue } from '@/lib/anim/count-up';

interface StatDef {
	value: number;
	decimals: number;
	suffix: string;
}

// Capability counts pulled from the product's existing site claims.
// These are NOT live usage metrics — confirm/adjust here when ready.
const STATS: StatDef[] = [
	{ value: 100, decimals: 0, suffix: '+' },
	{ value: 35, decimals: 0, suffix: '+' },
	{ value: 80, decimals: 0, suffix: '+' },
	{ value: 100, decimals: 0, suffix: '%' },
];

const DURATION_MS = 1600;

interface StatNumberProps {
	value: number;
	decimals: number;
	suffix: string;
}

function StatNumber({ value, decimals, suffix }: StatNumberProps) {
	const skip = useReducedMotionOrTouch();
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true });
	const [animated, setAnimated] = useState<number>(0);

	useEffect(() => {
		// When motion is skipped the final value is derived directly (see
		// `displayed` below), so the effect only runs the rAF count-up.
		if (skip || !inView) return;

		let rafId: number;
		let start: number | null = null;

		function tick(now: number) {
			if (start === null) start = now;
			const elapsed = now - start;
			const t = Math.min(elapsed / DURATION_MS, 1);
			setAnimated(countUpValue(t, value, decimals));
			if (t < 1) {
				rafId = requestAnimationFrame(tick);
			}
		}

		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, [skip, inView, value, decimals]);

	// Skip path renders the final value without ever calling setState in the
	// effect body, which keeps the react-hooks/set-state-in-effect rule happy.
	const displayed = skip ? value : animated;
	const formatted =
		decimals > 0 ? displayed.toFixed(decimals) : String(Math.round(displayed));

	return (
		<span ref={ref} className='tabular-nums'>
			{formatted}
			{suffix}
		</span>
	);
}

export function StatsBand() {
	const t = useTranslations('statsBand');
	return (
		<section
			aria-label={t('ariaLabel')}
			className='w-full border-y border-white/5 bg-[#070a10] py-16'
		>
			<div className='mx-auto grid max-w-5xl grid-cols-2 gap-y-12 px-6 md:grid-cols-4'>
				{STATS.map((s, index) => (
					<div key={index} className='flex flex-col items-center text-center'>
						<p className='aurora-text text-5xl font-bold tracking-tight md:text-6xl'>
							<StatNumber value={s.value} decimals={s.decimals} suffix={s.suffix} />
						</p>
						<p className='mono-label mt-3 text-[#aab2c5]'>{t(`items.${index}.label`)}</p>
					</div>
				))}
			</div>
		</section>
	);
}
