/** Eased value (easeOutCubic) at normalized time t in [0,1] toward target, rounded to `decimals`. */
export function countUpValue(t: number, target: number, decimals = 0): number {
	const clamped = Math.min(1, Math.max(0, t));
	const eased = 1 - (1 - clamped) ** 3;
	const v = eased * target;
	const f = 10 ** decimals;
	return Math.round(v * f) / f;
}
