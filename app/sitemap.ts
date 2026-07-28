import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { posts } from '@/lib/blog/posts';
import { routing } from '@/i18n/routing';

/** `/about` for English, `/es/about` for the rest — mirrors `localePrefix: 'as-needed'`. */
function localized(locale: string, route: string): string {
	const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
	if (route === '/') return `${SITE.domain}${prefix || '/'}`;
	return `${SITE.domain}${prefix}${route}`;
}

/** Every locale of a page points at every other, which is what makes Google
 *  index the translations instead of collapsing them into the English page. */
function alternates(route: string) {
	return {
		languages: {
			...Object.fromEntries(routing.locales.map((l) => [l, localized(l, route)])),
			'x-default': localized(routing.defaultLocale, route),
		},
	};
}

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	// Translated pages — one entry per locale, all cross-linked via hreflang.
	const translated: MetadataRoute.Sitemap = [
		{ route: '/', changeFrequency: 'weekly' as const, priority: 1 },
		{ route: '/about', changeFrequency: 'monthly' as const, priority: 0.6 },
	].flatMap(({ route, changeFrequency, priority }) =>
		routing.locales.map((locale) => ({
			url: localized(locale, route),
			lastModified,
			changeFrequency,
			priority,
			alternates: alternates(route),
		})),
	);

	// The blog is authored in English only (post bodies are hardcoded JSX), so it
	// stays unlocalized — emitting 6 locales of identical English prose would be
	// duplicate content, not reach.
	const blog: MetadataRoute.Sitemap = [
		{
			url: `${SITE.domain}/blog`,
			lastModified,
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		},
		...posts.map((post) => ({
			url: `${SITE.domain}/blog/${post.slug}`,
			lastModified: new Date(post.date),
			changeFrequency: 'monthly' as const,
			priority: 0.7,
		})),
	];

	return [...translated, ...blog];
}
