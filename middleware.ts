import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
	/**
	 * Everything except API routes, Next internals, and files with an extension.
	 * That exclusion is what keeps `/sitemap.xml`, `/robots.txt` and `/og-image.png`
	 * from being rewritten to `/en/sitemap.xml`.
	 */
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
