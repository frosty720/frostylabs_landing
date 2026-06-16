import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const base = SITE.domain;
	const lastModified = new Date();
	return [
		{ url: `${base}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
		{ url: `${base}/features`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
		{ url: `${base}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
	];
}
