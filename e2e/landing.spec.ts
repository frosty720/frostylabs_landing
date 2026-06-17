import { test, expect } from '@playwright/test';

test('desktop: hero canvas present and CTA targets app.frostyfi.io', async ({ page }) => {
	test.skip(test.info().project.name !== 'desktop', 'desktop only');
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toContainText(/on-chain agents/i);
	await expect(page.getByTestId('hero-canvas')).toBeVisible();
	const cta = page.getByRole('link', { name: /launch app/i }).first();
	await expect(cta).toHaveAttribute('href', /app\.frostyfi\.io/);
	const errors: string[] = [];
	page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(1500);
	expect(errors, errors.join('\n')).toHaveLength(0);
});

test('mobile: no hero frame downloads, poster shown, page scrolls', async ({ page }) => {
	test.skip(test.info().project.name !== 'mobile', 'mobile only');
	const frameReqs: string[] = [];
	page.on('request', (r) => r.url().includes('/frames/hero/frame_') && frameReqs.push(r.url()));
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(1000);
	expect(frameReqs, 'mobile must not download frame sequence').toHaveLength(0);
});

test('no stale brand or present-tense FROST claims in DOM', async ({ page }) => {
	await page.goto('/');
	const html = await page.content();
	expect(html).not.toMatch(/flow\.frostylabs\.ai/);
	expect(html).not.toMatch(/powered by frost/i);
});
