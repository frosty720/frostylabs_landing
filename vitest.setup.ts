import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Default: not reduced-motion, wide viewport. Tests override via mockMatchMedia().
globalThis.matchMedia ??= (query: string) =>
	({ matches: false, media: query, onchange: null, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn() }) as unknown as MediaQueryList;

export function mockMatchMedia(matches: Record<string, boolean>) {
	globalThis.matchMedia = ((query: string) =>
		({ matches: matches[query] ?? false, media: query, onchange: null, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn() }) as unknown as MediaQueryList) as typeof matchMedia;
}
