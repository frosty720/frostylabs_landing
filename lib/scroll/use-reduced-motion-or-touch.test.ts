import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { mockMatchMedia } from '../../vitest.setup';
import { useReducedMotionOrTouch } from './use-reduced-motion-or-touch';

describe('useReducedMotionOrTouch', () => {
	it('returns true when reduced-motion is preferred', () => {
		mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });
		const { result } = renderHook(() => useReducedMotionOrTouch());
		expect(result.current).toBe(true);
	});
	it('returns true on small/coarse viewports', () => {
		mockMatchMedia({ '(max-width: 767px), (pointer: coarse)': true });
		const { result } = renderHook(() => useReducedMotionOrTouch());
		expect(result.current).toBe(true);
	});
	it('returns false on a desktop with fine pointer and no preference', () => {
		mockMatchMedia({});
		const { result } = renderHook(() => useReducedMotionOrTouch());
		expect(result.current).toBe(false);
	});
});
