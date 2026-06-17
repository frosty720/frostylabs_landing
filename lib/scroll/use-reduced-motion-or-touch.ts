'use client';
import { useEffect, useState } from 'react';

const QUERIES = ['(prefers-reduced-motion: reduce)', '(max-width: 767px), (pointer: coarse)'];

function readQueries(): boolean {
	if (typeof matchMedia === 'undefined') return false;
	return QUERIES.some((q) => matchMedia(q).matches);
}

/** True when heavy scroll animation should be skipped (mobile, touch, or reduced-motion). */
export function useReducedMotionOrTouch(): boolean {
	const [skip, setSkip] = useState<boolean>(() => readQueries());
	useEffect(() => {
		const mqls = QUERIES.map((q) => matchMedia(q));
		const update = () => setSkip(mqls.some((m) => m.matches));
		update();
		for (const m of mqls) m.addEventListener('change', update);
		return () => {
			for (const m of mqls) m.removeEventListener('change', update);
		};
	}, []);
	return skip;
}
