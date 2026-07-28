'use client';
import { useTranslations } from 'next-intl';
import { useReducedMotionOrTouch } from '@/lib/scroll/use-reduced-motion-or-touch';

const ITEM_COUNT = 18;

export function TrustStrip() {
	const t = useTranslations('trustStrip');
	const skip = useReducedMotionOrTouch();
	const items = Array.from({ length: ITEM_COUNT }, (_, index) => t(`items.${index}`));
	const track = (
		<div className='flex shrink-0 items-center gap-12 px-6'>
			{items.map((label, index) => (
				<span key={index} className='mono-label text-[#aab2c5]'>{label}</span>
			))}
		</div>
	);
	return (
		<section aria-label={t('runsOnLabel')} className='overflow-hidden border-y border-white/5 py-5'>
			<div className={skip ? 'flex flex-wrap justify-center gap-y-3' : 'flex w-max animate-[marquee_22s_linear_infinite]'}>
				{track}
				{!skip && track}
			</div>
		</section>
	);
}
