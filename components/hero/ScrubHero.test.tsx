import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockMatchMedia } from '../../vitest.setup';

// next-intl: stub useTranslations so the component renders copy without a provider
vi.mock('next-intl', () => ({
	useTranslations: () => (key: string) => key,
}));

import { ScrubHero } from './ScrubHero';

describe('ScrubHero', () => {
	beforeEach(() => mockMatchMedia({ '(max-width: 767px), (pointer: coarse)': true }));
	it('renders the hero clip (with poster) and headline, no canvas', () => {
		render(<ScrubHero />);
		const video = document.querySelector('video');
		expect(video).not.toBeNull();
		expect(video).toHaveAttribute('poster');
		expect(screen.queryByTestId('hero-canvas')).toBeNull();
		expect(screen.getByText(/get paid/i)).toBeInTheDocument();
	});
});
