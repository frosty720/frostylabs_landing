'use client';
import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotionOrTouch } from './use-reduced-motion-or-touch';

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: ReactNode }) {
	const skip = useReducedMotionOrTouch();
	useEffect(() => {
		if (skip) return; // native scroll on mobile / reduced-motion
		const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)), smoothWheel: true });
		lenis.on('scroll', ScrollTrigger.update);
		const onTick = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(onTick);
		gsap.ticker.lagSmoothing(0);
		return () => {
			gsap.ticker.remove(onTick);
			lenis.destroy();
		};
	}, [skip]);
	return <>{children}</>;
}
