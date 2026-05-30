import { describe, it, expect } from 'vitest';
import { frameIndexForProgress, coverDraw } from './use-frame-sequence';

describe('frameIndexForProgress', () => {
	it('maps scroll progress to a frame index, accelerated so it finishes early', () => {
		expect(frameIndexForProgress(0, 220, 2)).toBe(0);
		expect(frameIndexForProgress(0.5, 220, 2)).toBe(219); // 0.5*2=1.0 -> last frame
		expect(frameIndexForProgress(1, 220, 2)).toBe(219);   // clamps
	});
});

describe('coverDraw', () => {
	it('computes padded-cover placement centered in the canvas', () => {
		const r = coverDraw({ cw: 1000, ch: 500, iw: 1920, ih: 1080, scaleFactor: 0.85 });
		expect(r.dw).toBeGreaterThan(1000 * 0.85);
		expect(r.dx).toBeCloseTo((1000 - r.dw) / 2);
		expect(r.dy).toBeCloseTo((500 - r.dh) / 2);
	});
});
