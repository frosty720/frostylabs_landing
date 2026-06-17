import { describe, it, expect } from 'vitest';
import { countUpValue } from './count-up';

describe('countUpValue', () => {
	it('eases from 0 to target across normalized time', () => {
		expect(countUpValue(0, 1000)).toBe(0);
		expect(countUpValue(1, 1000)).toBe(1000);
		expect(countUpValue(0.5, 1000)).toBeGreaterThan(0);
		expect(countUpValue(0.5, 1000)).toBeLessThan(1000);
	});
	it('respects decimals rounding', () => {
		expect(countUpValue(1, 4.2, 1)).toBe(4.2);
		expect(countUpValue(1, 4, 0)).toBe(4);
	});
});
